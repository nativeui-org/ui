"use client";

import React from "react";
import { CodeBlock } from "@/components/ui/code-block";
import { InstallationTabs } from "@/components/docs/installation-tabs";
import Image from "next/image";
import { useTheme } from "next-themes";

const InstallationPageSkeleton = () => {
  return (
    <div className="container max-w-3xl py-10 animate-pulse">
      {/* Header skeleton */}
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="h-10 bg-muted rounded-md w-1/2"></div>
          <div className="h-6 bg-muted rounded-md w-full"></div>
          <div className="h-6 bg-muted rounded-md w-4/5"></div>
        </div>

        {/* Info banner skeleton */}
        <div className="rounded-lg border-2 p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-muted p-2 w-9 h-9"></div>
            <div className="h-5 bg-muted rounded-md flex-1"></div>
          </div>
        </div>
      </div>

      {/* Platform selection skeleton */}
      <div className="mt-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg border p-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="h-16 w-16 bg-muted rounded"></div>
              <div className="text-center space-y-2">
                <div className="h-6 bg-muted rounded-md w-32"></div>
                <div className="h-4 bg-muted rounded-md w-40"></div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border p-6 opacity-50">
            <div className="flex flex-col items-center space-y-4">
              <div className="h-16 w-16 bg-muted rounded"></div>
              <div className="text-center space-y-2">
                <div className="h-6 bg-muted rounded-md w-32"></div>
                <div className="h-4 bg-muted rounded-md w-40"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Installation steps skeleton */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded-md w-1/3"></div>
            <div className="h-5 bg-muted rounded-md w-full"></div>
            <div className="h-5 bg-muted rounded-md w-3/4"></div>
          </div>

          {/* Multiple step skeletons */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-6 bg-muted rounded-md w-1/4"></div>
              <div className="h-4 bg-muted rounded-md w-full"></div>
              <div className="h-32 bg-muted rounded-md"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function InstallationPage() {
  const [selectedPlatform, setSelectedPlatform] = React.useState("expo");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadResources = async () => {
      setIsLoading(true);
      
      // Simulate loading time for theme and resources
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setMounted(true);
      setIsLoading(false);
    };

    loadResources();
  }, []);

  if (isLoading || !mounted) {
    return <InstallationPageSkeleton />;
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
                  <InstallationTabs command="create-expo-app my-app" />
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
                  <h3 className="text-xl font-semibold mt-8">4. Create Theme File</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create /lib directory and create theme.ts in it:
                  </p>
                  <CodeBlock
                    language="typescript"
                    collapsible
                    title="lib/theme.ts"
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
                  <h3 className="text-xl font-semibold mt-8">5. Create Theme Provider</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create the theme provider in lib/theme-context.tsx:
                  </p>
                  <CodeBlock
                    language="typescript"
                    collapsible
                    title="lib/theme-context.tsx"
                    code={`import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme as useNativeColorScheme } from 'react-native';
import { themes } from './theme';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
    activeTheme: any;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ 
  children, 
  defaultTheme = 'system' 
}: { 
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';
}) {
    const systemColorScheme = useNativeColorScheme() as ThemeType || 'light';
    const [theme, setTheme] = useState<ThemeType>(
      defaultTheme === 'system' ? systemColorScheme : defaultTheme as ThemeType
    );
    const { setColorScheme } = useNativewindColorScheme();

    useEffect(() => {
        setColorScheme(theme);
    }, [theme, setColorScheme]);

    const activeTheme = themes[theme];

    return (
        <ThemeContext.Provider value={{ theme, setTheme, activeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}`}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mt-8">6. Create Utility Functions</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create utils.ts in /lib directory for class merging utilities:
                  </p>
                  <CodeBlock
                    language="typescript"
                    collapsible
                    title="lib/utils.ts"
                    code={`import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mt-8">7. Create global.css</h3>
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
                  <h3 className="text-xl font-semibold mt-8">8. Configure TypeScript</h3>
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
                  <h3 className="text-xl font-semibold mt-8">9. Configure TypeScript Paths</h3>
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
        "./*"
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
                  <h3 className="text-xl font-semibold mt-8">10. Configure Babel</h3>
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
                  <h3 className="text-xl font-semibold mt-8">11. Configure Metro</h3>
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
  input: './app/global.css',
});`}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mt-8">12. Update App Entry</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Update _layout.tsx:
                  </p>
                  <CodeBlock
                    language="typescript"
                    collapsible
                    title="app/_layout.tsx"
                    code={`import { View } from 'react-native';
import { ThemeProvider, useTheme } from '@/lib/theme-context';
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
                  <h3 className="text-xl font-semibold mt-8">13. Configure app.json</h3>
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
                  <h3 className="text-xl font-semibold mt-8">14. Configure components.json</h3>
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
                  <h3 className="text-xl font-semibold mt-8">14. Start Development</h3>
                  <InstallationTabs command="expo start" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mt-8">15. Test Your Setup</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add this code in any of your components to test that everything is working:
                  </p>
                  <CodeBlock
                    language="tsx"
                    collapsible
                    title="Test Component"
                    code={`import { View, Text } from 'react-native';

export default function TestComponent() {
  return (
    <View className="flex-1 justify-center items-center bg-background">
      <Text className="text-2xl font-bold text-foreground">
        NativeUI is working! 🎉
      </Text>
    </View>
  );
}`}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">React Native CLI</h3>
            <p className="text-muted-foreground">
              Support for React Native CLI is coming soon. Stay tuned!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}