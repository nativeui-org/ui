"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";
import { CollapsibleCodeBlock } from "@/components/ui/collapsible-code-block";
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
              <div className="h-16 w-16 relative bg-gray-100 rounded-lg" />
              <div className="text-center">
                <h3 className="font-bold text-xl">Loading...</h3>
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
            className={`relative overflow-hidden rounded-lg border p-6 transition-all hover:border-foreground/10 ${
              selectedPlatform === "expo" ? "border-primary bg-primary/5" : ""
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
            className={`relative overflow-hidden rounded-lg border p-6 transition-all ${
              selectedPlatform === "react-native" ? "border-primary bg-primary/5" : "opacity-50 cursor-not-allowed"
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
                  <CollapsibleCodeBlock
                    language="javascript"
                    title="tailwind.config.js"
                    code={`/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx}',
    ],
    presets: [require('nativewind/preset')],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: "hsl(var(--primary))",
            light: "hsl(var(--primary-light))",
            dark: "hsl(var(--primary-dark))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            light: "hsl(var(--secondary-light))",
            dark: "hsl(var(--secondary-dark))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          card: "hsl(var(--card))",
          "card-foreground": "hsl(var(--card-foreground))",
          popover: "hsl(var(--popover))",
          "popover-foreground": "hsl(var(--popover-foreground))",
          
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          success: {
            DEFAULT: "hsl(var(--success))",
            foreground: "hsl(var(--success-foreground))",
          },
          warning: {
            DEFAULT: "hsl(var(--warning))",
            foreground: "hsl(var(--warning-foreground))",
          },
          info: {
            DEFAULT: "hsl(var(--info))",
            foreground: "hsl(var(--info-foreground))",
          },
          
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 0.2rem)",
          sm: "calc(var(--radius) - 0.4rem)",
          xl: "calc(var(--radius) + 0.2rem)",
          '2xl': "calc(var(--radius) + 0.4rem)",
          full: "9999px",
        },
      },
    },
    plugins: [],
    safelist: [
      {
        pattern: /^(bg|text|border)-/,
        variants: ['dark'],
      },
    ],
};`}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mt-8">4. Create CSS File</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create global.css in your project root:
                  </p>
                  <CollapsibleCodeBlock
                    language="css"
                    title="global.css"
                    code={`@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --radius: 0.75rem;
    
    --primary: 222.2 84% 4.9%;
    --primary-light: 222.2 47.4% 20%;
    --primary-dark: 222.2 47.4% 8%;
    --primary-foreground: 0 0% 100%;
    
    --secondary: 210 40% 96.1%;
    --secondary-light: 210 40% 98.1%;
    --secondary-dark: 210 40% 92.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    
    --success: 142 76% 36%;
    --success-foreground: 210 40% 98%;
    
    --warning: 38 92% 50%;
    --warning-foreground: 210 40% 98%;
    
    --info: 204 94% 94%;
    --info-foreground: 199 89% 48%;
    
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
  }

  .dark {
    --primary: 0 0% 100%;
    --primary-light: 210 40% 90%;
    --primary-dark: 210 40% 95%;
    --primary-foreground: 222.2 84% 4.9%;
    
    --secondary: 217.2 32.6% 17.5%;
    --secondary-light: 217.2 32.6% 22.5%;
    --secondary-dark: 217.2 32.6% 12.5%;
    --secondary-foreground: 210 40% 98%;

    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    
    --success: 142 72% 29%;
    --success-foreground: 210 40% 98%;
    
    --warning: 38 92% 40%;
    --warning-foreground: 210 40% 98%;
    
    --info: 199 89% 48%;
    --info-foreground: 210 40% 98%;
    
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, border-radius 0.3s ease;
}`}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mt-8">5. Configure TypeScript</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create a new declaration file for NativeWind types:
                  </p>
                  <CollapsibleCodeBlock
                    language="typescript"
                    title="nativewind-env.d.ts"
                    code={`/// <reference types="nativewind/types" />`}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mt-8">6. Configure TypeScript Paths</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Update your tsconfig.json:
                  </p>
                  <CollapsibleCodeBlock
                    language="json"
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
                  <h3 className="text-xl font-semibold mt-8">7. Configure Babel</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Update or create babel.config.js:
                  </p>
                  <CollapsibleCodeBlock
                    language="javascript"
                    title="babel.config.js"
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
                  <h3 className="text-xl font-semibold mt-8">8. Configure Metro</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create metro.config.js:
                  </p>
                  <CollapsibleCodeBlock
                    language="javascript"
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
                  <h3 className="text-xl font-semibold mt-8">9. Update App Entry</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Update _layout.tsx:
                  </p>
                  <CollapsibleCodeBlock
                    language="typescript"
                    title="app/_layout.tsx"
                    code={`import '../global.css';

export default function RootLayout() {
  return (
    // Your App
  );
}`}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mt-8">10. Configure app.json</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Update app.json:
                  </p>
                  <CollapsibleCodeBlock
                    language="json"
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
                  <h3 className="text-xl font-semibold mt-8">11. Create Utility Functions</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    First, create the lib directory at the root of your project:
                  </p>
                  <p className="text-sm text-muted-foreground mt-4 mb-4">
                    Then create lib/utils.ts with the following content:
                  </p>
                  <CollapsibleCodeBlock
                    language="typescript"
                    title="lib/utils.ts"
                    code={`import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mt-8">12. Configure shadcn</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create components.json in your project root:
                  </p>
                  <CollapsibleCodeBlock
                    language="json"
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
                  <CollapsibleCodeBlock
                    language="typescript"
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