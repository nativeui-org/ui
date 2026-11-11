import { build, context } from "esbuild";
import { readdir, readFile, mkdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import path from "node:path";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import tailwindConfig from "./tailwind.config.cjs";

const directory = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const root = path.resolve(directory, "..");
const output = path.join(root, "public/previews");
const watch = process.argv.includes("--watch");

if (!watch) await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

const options = {
  absWorkingDir: directory,
  entryPoints: ["src/main.tsx"],
  outdir: output,
  publicPath: "/previews",
  bundle: true,
  splitting: true,
  format: "esm",
  platform: "browser",
  target: ["es2020"],
  minify: !watch,
  jsx: "automatic",
  jsxImportSource: "nativewind",
  // Prefer web implementations before native or generic entry points.
  resolveExtensions: [
    ".web.tsx",
    ".web.ts",
    ".web.js",
    ".tsx",
    ".ts",
    ".jsx",
    ".js",
    ".json",
  ],
  mainFields: ["browser", "module", "main"],
  conditions: ["browser"],
  nodePaths: [
    path.join(directory, "node_modules"),
    path.join(root, "node_modules"),
  ],
  loader: { ".js": "jsx", ".ttf": "file" },
  assetNames: "assets/[name]-[hash]",
  chunkNames: "chunks/[name]-[hash]",
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      watch ? "development" : "production",
    ),
    "process.env.EXPO_OS": '"web"',
    "process.env": "{}",
    __DEV__: JSON.stringify(watch),
    global: "globalThis",
  },
  alias: {
    // Registry sources live outside this package; resolve one React runtime.
    react: path.dirname(require.resolve("react/package.json")),
    "react-dom": path.dirname(require.resolve("react-dom/package.json")),
    nativewind: path.dirname(require.resolve("nativewind/package.json")),
    "react-native": "react-native-web",
    "@react-native-community/datetimepicker": "./src/adapters/time-picker.tsx",
    "expo-router": "./src/adapters/navigation.tsx",
    "@/components/theme-toggle": "./src/adapters/theme-toggle.tsx",
    "@/lib/utils": path.join(root, "lib/utils.ts"),
  },
  plugins: [
    {
      name: "registry-previews",
      setup(builder) {
        builder.onResolve(
          { filter: /^@\/components\/ui\// },
          ({ path: specifier }) => {
            const name = specifier.split("/").pop();
            return { path: path.join(root, "registry", name, `${name}.tsx`) };
          },
        );
        builder.onResolve({ filter: /^virtual:previews$/ }, () => ({
          path: "previews",
          namespace: "registry",
        }));
        builder.onLoad({ filter: /.*/, namespace: "registry" }, async () => {
          const names = (
            await readdir(path.join(root, "registry"), { withFileTypes: true })
          )
            .filter((entry) => entry.isDirectory())
            .map((entry) => entry.name)
            .sort();
          return {
            contents: `export default {${names
              .map(
                (name) =>
                  `${JSON.stringify(name)}: () => import(${JSON.stringify(path.join(root, "registry", name, `${name}.preview.tsx`))})`,
              )
              .join(",")}};`,
            resolveDir: root,
            watchDirs: [path.join(root, "registry")],
            watchFiles: [
              path.join(directory, "src/styles.css"),
              path.join(directory, "tailwind.config.cjs"),
            ],
          };
        });
        builder.onEnd(async (result) => {
          if (result.errors.length) return;
          const from = path.join(directory, "src/styles.css");
          const css = await postcss([tailwindcss(tailwindConfig)]).process(
            await readFile(from, "utf8"),
            { from },
          );
          await writeFile(path.join(output, "styles.css"), css.css);
          await writeFile(
            path.join(output, "index.html"),
            await readFile(path.join(directory, "index.html")),
          );
          console.log("Built interactive registry previews.");
        });
      },
    },
  ],
};

if (watch) {
  const builder = await context(options);
  await builder.watch();
} else {
  await build(options);
}
