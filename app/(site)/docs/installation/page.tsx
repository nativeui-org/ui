"use client";

import React from "react";
import { CodeBlock } from "@/components/ui/code-block";
import { InstallationTabs } from "@/components/docs/installation-tabs";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function InstallationPage() {
  const [selectedPlatform, setSelectedPlatform] = React.useState("expo");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Installation</h1>
          <p className="text-muted-foreground text-lg mt-2">
            How to install dependencies and structure your app.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative overflow-hidden rounded-lg border p-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="h-16 w-16 relative">
                <Image
                  src={resolvedTheme === 'dark' ? "/images/expo-logo-dark.svg" : "/images/expo-logo.svg"}
                  alt="Expo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-xl">Expo (Recommended)</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Quick setup with better developer experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl py-10">
      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Installation</h1>
          <p className="text-xl text-muted-foreground leading-7">
            Get started with NativeUI in your React Native project. We recommend using Expo for the best development experience.
          </p>
        </div>

        <div className="rounded-lg border-2 border-primary/10 bg-primary/5 p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2">
              <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="font-medium text-primary">
              We strongly recommend using Expo for new projects. It provides a smoother development experience and better tooling.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => setSelectedPlatform("expo")}
            className={`relative overflow-hidden rounded-lg border p-6 transition-all hover:border-foreground/10 ${selectedPlatform === "expo" ? "border-primary bg-primary/5" : ""
              }`}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="h-16 w-16 relative">
                <Image
                  src={resolvedTheme === 'dark' ? "/images/expo-logo-dark.svg" : "/images/expo-logo.svg"}
                  alt="Expo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-xl">Expo (Recommended)</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Quick setup with better developer experience
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setSelectedPlatform("react-native")}
            className={`relative overflow-hidden rounded-lg border p-6 transition-all ${selectedPlatform === "react-native" ? "border-primary bg-primary/5" : "opacity-50 cursor-not-allowed"
              }`}
            disabled
          >
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <span className="text-sm font-medium">Coming Soon</span>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="h-16 w-16 relative">
                <Image
                  src="/images/react-native-logo.svg"
                  alt="React Native"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-xl">React Native CLI</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  For more control and native module access
                </p>
              </div>
            </div>
          </button>
        </div>

        {selectedPlatform === "expo" ? (
          <div className="space-y-8">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Installation with Expo</h2>
              <p className="text-muted-foreground text-lg leading-7">
                Follow these steps to create a new Expo project with NativeUI. Each step is essential for proper setup.
              </p>

              <div className="mt-8 space-y-12">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">1. Create Expo Project</h3>
                  <InstallationTabs command="create-expo-app my-app --template default" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mt-8">2. Install Dependencies</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Install NativeWind and its peer dependencies:
                  </p>
                  <InstallationTabs command="expo install nativewind tailwindcss react-native-reanimated react-native-safe-area-context class-variance-authority tailwind-merge clsx" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mt-8">3. Configure Tailwind CSS</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    First, initialize Tailwind configuration:
                  </p>
                  <InstallationTabs command="tailwindcss init" />
                  <p className="text-sm text-muted-foreground mt-4 mb-4">
                    Then, replace the entire content of tailwind.config.js with:
                  </p>
                  <CodeBlock
                    language="javascript"
                    collapsible
                    title="tailwind.config.js"
                    code={`/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
          foreground: "rgb(var(--color-primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--color-secondary) / <alpha-value>)",
          foreground: "rgb(var(--color-secondary-foreground) / <alpha-value>)",
        },
        background: {
          DEFAULT: "rgb(var(--color-background) / <alpha-value>)",
          foreground: "rgb(var(--color-background-foreground) / <alpha-value>)",
        },
        foreground: {
          DEFAULT: "rgb(var(--color-foreground) / <alpha-value>)",
          muted: "rgb(var(--color-foreground-muted) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "rgb(var(--color-destructive) / <alpha-value>)",
          foreground: "rgb(var(--color-destructive-foreground) / <alpha-value>)",
        },
        success: {
          DEFAULT: "rgb(var(--color-success) / <alpha-value>)",
          foreground: "rgb(var(--color-success-foreground) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "rgb(var(--color-warning) / <alpha-value>)",
          foreground: "rgb(var(--color-warning-foreground) / <alpha-value>)",
        },
        info: {
          DEFAULT: "rgb(var(--color-info) / <alpha-value>)",
          foreground: "rgb(var(--color-info-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--card-rgb) / <alpha-value>)",
          foreground: "rgb(var(--card-foreground-rgb) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "rgb(var(--popover-rgb) / <alpha-value>)",
          foreground: "rgb(var(--popover-foreground-rgb) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent-rgb) / <alpha-value>)",
          foreground: "rgb(var(--accent-foreground-rgb) / <alpha-value>)",
        },
        border: {
          DEFAULT: "rgb(var(--border-rgb) / <alpha-value>)",
          foreground: "rgb(var(--border-foreground-rgb) / <alpha-value>)",
        },
        input: {
          DEFAULT: "rgb(var(--input-rgb) / <alpha-value>)",
          foreground: "rgb(var(--input-foreground-rgb) / <alpha-value>)",
        },
        ring: "rgb(var(--ring-rgb) / <alpha-value>)",
        radius: "var(--radius)",
      },
    },
  },
  plugins: [
    ({ addBase }) => {
      addBase({
        ":root": {
          "--color-primary": "0 0 0",
          "--color-secondary": "45 45 45",
          "--color-background": "255 255 255",
          "--color-primary-foreground": "255 255 255",
          "--color-foreground": "0 0 0",
          "--color-destructive": "239 68 68",
          "--color-success": "34 197 94",
          "--color-warning": "234 179 8",
          "--color-info": "59 130 246",
          "--color-muted": "115 115 115",
        },
      });
    },
  ],
};
`}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mt-8">4. Create theme File</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create theme.ts in /lib directory:
                  </p>
                  <CodeBlock
                    language="css"
                    collapsible
                    title="theme.ts"
                    code={`import { vars } from "nativewind";

export const themes = {
    light: vars({
      // Primary colors
      "--color-primary":      "0 0 0",
      "--color-primary-foreground": "255 255 255",
      "--color-foreground":   "13 13 13",

      // General context (background) and cards / popovers
      "--color-background":   "255 255 255",
      "--color-background-foreground": "13 13 13",
      "--color-card":         "255 255 255",
      "--color-card-foreground": "13 13 13",
      "--color-popover":      "255 255 255",
      "--color-popover-foreground": "13 13 13",

      // Secondary colors
      "--color-secondary":    "45 45 45",
      "--color-secondary-foreground": "255 255 255",
      "--color-foreground-muted": "115 115 115",

      // Accent colors
      "--color-accent":       "45 45 45",
      "--color-accent-foreground": "255 255 255",

      // Status colors
      "--color-destructive":  "239 68 68",
      "--color-destructive-foreground": "250 250 250",

      "--color-success":      "34 197 94",
      "--color-success-foreground": "250 250 250",

      "--color-warning":      "234 179  8",
      "--color-warning-foreground": "13 13 13",

      "--color-info":         "59 130 246",
      "--color-info-foreground": "250 250 250",

      // Borders, inputs and "rings"
      "--border":             "229 231 235",
      "--border-foreground": "13 13 13",
      "--input":              "229 231 235",
      "--input-foreground": "13 13 13",
      "--ring":               "13 13 13",
    }),

    dark: vars({
      // Primary colors
      "--color-primary":      "255 255 255",
      "--color-primary-foreground": "13 13 13",
      "--color-foreground":   "250 250 250",

      // General context (background) and cards / popovers
      "--color-background":   "23 23 28",
      "--color-background-foreground": "250 250 250",
      "--color-card":         "32 32 36",
      "--color-card-foreground": "250 250 250",
      "--color-popover":      "32 32 36",
      "--color-popover-foreground": "250 250 250",

      // Secondary colors
      "--color-secondary":    "58 58 58",
      "--color-muted":        "163 163 163",

      // Accent colors
      "--color-accent":       "58  58  58",
      "--color-accent-foreground": "250 250 250",

      // Status colors
      "--color-destructive":  "153  27  27",
      "--color-destructive-foreground": "250 250 250",

      "--color-success":      "22 163  74",
      "--color-success-foreground": "250 250 250",

      "--color-warning":      "161  98   7",
      "--color-warning-foreground": "250 250 250",

      "--color-info":         " 37  99 235",
      "--color-info-foreground": "250 250 250",

      // Borders, inputs and "rings"
      "--border":             " 38  38  38",
      "--border-foreground": "250 250 250",
      "--input":              " 38  38  38",
      "--input-foreground": "250 250 250",
      "--ring":               "212 212 212",
    }),
} as const;
`}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mt-8">5. Create global.css</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create global.css in /app directory:
                  </p>
                  <CodeBlock
                    language="css"
                    collapsible
                    title="app/global.css"
                    code={`@tailwind base;
@tailwind components;
@tailwind utilities;`}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mt-8">6. Configure TypeScript</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create a new declaration file for NativeWind types:
                  </p>
                  <CodeBlock
                    language="typescript"
                    collapsible
                    title="nativewind-env.d.ts"
                    code={`/// <reference types="nativewind/types" />`}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mt-8">7. Configure TypeScript Paths</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Update your tsconfig.json:
                  </p>
                  <CodeBlock
                    language="json"
                    collapsible
                    title="tsconfig.json"
                    code={`{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": [
        "./"
      ]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts",
    "nativewind-env.d.ts",
    "types/**/*.d.ts"
  ]
}`}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mt-8">8. Configure Babel</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Update or create babel.config.js:
                  </p>
                  <CodeBlock
                    language="javascript"
                    title="babel.config.js"
                    collapsible
                    code={`module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      'react-native-reanimated/plugin',
    ],
  };
};`}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mt-8">9. Configure Metro</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create metro.config.js:
                  </p>
                  <CodeBlock
                    language="javascript"
                    collapsible
                    title="metro.config.js"
                    code={`// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, {
  input: './global.css',
});`}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mt-8">10. Update App Entry</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Update _layout.tsx:
                  </p>
                  <CodeBlock
                    language="typescript"
                    collapsible
                    title="app/_layout.tsx"
                    code={`import { View } from 'react-native';
import { useState } from 'react';
import { themes } from "@/lib/theme";
import { ThemeProvider, useTheme } from '@/lib/ThemeProvider';
import './global.css';

export default function RootLayout() {
  return (
    <ThemeProvider defaultTheme="system">
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { activeTheme } = useTheme();
  return (
    <View style={activeTheme} className="flex-1 bg-background">
      {/* Your App */}
    </View>
  );
}`}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mt-8">11. Configure app.json</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Update app.json:
                  </p>
                  <CodeBlock
                    language="json"
                    collapsible
                    title="app.json"
                    code={`{
  "expo": {
    "web": {
      "bundler": "metro"
    }
  }
}`}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mt-8">12. Configure shadcn</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create components.json in your project root:
                  </p>
                  <CodeBlock
                    language="json"
                    collapsible
                    title="components.json"
                    code={`{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "./app/global.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}`}
                  />
                  <p className="text-sm text-muted-foreground mt-4 mb-4">
                    Then, you can install components from the registry. For example:
                  </p>
                  <InstallationTabs command="shadcn@latest add https://nativeui.io/registry/button" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mt-8">13. Start Development</h3>
                  <InstallationTabs command="expo start" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mt-8">14. Test Your Setup</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add this code in any of your components to test that everything is working:
                  </p>
                  <CodeBlock
                    language="typescript"
                    collapsible
                    title="app/components/TestComponent.tsx"
                    code={`import { Button } from '@/components/ui/button';
import { Text } from 'react-native';

// ... rest of your imports ...

return (
  <Button>
    <Text className="text-primary-foreground">Click me</Text>
  </Button>
);`}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border-2 border-muted p-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight mb-4">React Native CLI Support</h2>
            <p className="text-muted-foreground text-lg leading-7">
              Support for React Native CLI is coming soon. We recommend using Expo for now.
            </p>
          </div>
        )}
      </div>

      <div className="mt-12 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Next Steps</h2>
        <p className="text-muted-foreground leading-7">
          Now that you have set up your project, you can start adding components from our collection.
          Visit the components section to explore available components and learn how to use them.
        </p>
      </div>
    </div>
  );
}