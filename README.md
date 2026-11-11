<div align="center">
  <img src="https://github.com/nativeui-org/ui/blob/master/public/logo-wout-bg.png?raw=true" alt="NativeUI Logo" width="120" height="120" />
  
  # NativeUI
  
  **Beautifully designed React Native components that you can copy and paste into your apps. Accessible. Customizable. Open Source.**
  
  [![GitHub stars](https://img.shields.io/github/stars/nativeui-org/ui?style=social)](https://github.com/nativeui-org/ui/stargazers)
  [![GitHub forks](https://img.shields.io/github/forks/nativeui-org/ui?style=social)](https://github.com/nativeui-org/ui/network/members)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  [Documentation](https://nativeui.io) • [Components](https://nativeui.io/components) • [Playground](https://github.com/nativeui-org/playground)
</div>

---

## Installation

Visit [nativeui.io](https://nativeui.io/docs) to get started.

## Usage

Check out the [documentation](https://nativeui.io/docs/usage) for detailed usage instructions and examples.


## Why NativeUI?

- **Copy and paste**: No package to install. Copy the code and paste it into your project.
- **Customizable**: Components are built using Tailwind CSS. Customize them to match your design.
- **Accessible**: Built with accessibility in mind. Keyboard navigation, screen readers, and more.
- **Mobile-first**: Optimized for iOS and Android with React Native.
- **Open Source**: Free to use. MIT licensed.

## FAQ

<details>
<summary><strong>Why copy and paste and not a package?</strong></summary>

The idea behind this is to give you ownership and control over the code, allowing you to decide how the components are built and styled.

Start with some sensible defaults, then customize the components to your needs.

One of the drawbacks of packaging the components in an npm package is that the style is coupled with the implementation. The design of your components should be separate from their implementation.

</details>

<details>
<summary><strong>Do you plan to publish it as an npm package?</strong></summary>

No. We have no plans to publish it as an npm package.

</details>

<details>
<summary><strong>What's the difference with NativeBase, Tamagui, etc?</strong></summary>

NativeUI is not a component library. It's a collection of re-usable components that you can copy and paste into your apps.

What do we mean by not a component library?

We mean you do not install it as a dependency. It is not available or distributed via npm.

Pick the components you need. Copy and paste the code into your project and customize to your needs. The code is yours.

_Use this as a reference to build your own component libraries._

</details>

## Contributing

Please read our [contributing guide](./registry/CONTRIBUTING.md).

### Local development and interactive previews

Use Node.js 20.19 or newer and run `npm install`, then `npm run dev`.
Installation also installs the locked dependencies in `preview/`. Both `dev`
and `build` compile the previews automatically; no Expo server or external
playground is needed. `npm run build` produces the deployable Next.js site.

Component documentation renders the actual `registry/*/*.preview.tsx` demos
inside a 375 × 812 iPhone viewport. The preview toolbar switches between light
and dark themes without losing demo state, and resets the demo on demand.
The phone scales down on narrow screens; scrolling, modals, and styles stay
inside its iframe.

The separate `preview/` package uses React Native Web, NativeWind 4, and
Tailwind 3, while the documentation keeps Tailwind 4. Its esbuild configuration
resolves demo component imports to `registry/`, loads each demo on demand, and
writes the generated assets to `public/previews/` (not committed). Preview-only
adapters omit Expo navigation headers and supply a browser time input for the
native date/time picker. Native alerts display inside the preview.

When editing registry demos, run `npm run dev:previews` in a second terminal
and reload the preview after changes. Restart that command after changing its
build or Tailwind configuration. New `registry/<name>/<name>.preview.tsx` files
are discovered automatically. To update preview dependencies, run
`npm --prefix preview install <package>` and commit its package and lock files.

Run the checks with:

```bash
npm run lint
npx tsc --noEmit
npm --prefix preview run typecheck
npx playwright install chromium
npm run test:previews
npm run build
```

Browser tests cover every registry demo in both themes, local font loading,
state changes, modal isolation, date/time selection, reset, recovery from failed
loads, and the phone's mobile layout. Tests start a local server on port 3199.

## License

Licensed under the [MIT license](https://github.com/nativeui-org/ui/blob/main/LICENSE).
