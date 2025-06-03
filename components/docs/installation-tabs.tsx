"use client";

import * as React from "react";
import { CodeBlock } from "@/components/ui/code-block";

interface InstallationTabsProps {
  command?: string;
  packageName?: string;
}

export function InstallationTabs({ command, packageName }: InstallationTabsProps) {
  const getNativeUICommand = (packageManager: string) => {
    if (!command) return "";
    return `${packageManager} ${command}`;
  };

  const getDirectInstallCommand = (packageManager: string) => {
    if (!packageName) return "";
    
    switch (packageManager) {
      case "npm":
        return `npm install ${packageName}`;
      case "pnpm":
        return `pnpm add ${packageName}`;
      case "yarn":
        return `yarn add ${packageName}`;
      case "bun":
        return `bun add ${packageName}`;
      default:
        return `npm install ${packageName}`;
    }
  };

  
  const tabs = [
    {
      title: "npm",
      value: "npm",
      content: packageName ? getDirectInstallCommand("npm") : getNativeUICommand("npx"),
      language: "bash"
    },
    {
      title: "pnpm",
      value: "pnpm",
      content: packageName ? getDirectInstallCommand("pnpm") : getNativeUICommand("pnpm dlx"),
      language: "bash"
    },
    {
      title: "yarn",
      value: "yarn",
      content: packageName ? getDirectInstallCommand("yarn") : getNativeUICommand("yarn dlx"),
      language: "bash"
    },
    {
      title: "bun",
      value: "bun",
      content: packageName ? getDirectInstallCommand("bun") : getNativeUICommand("bunx"),
      language: "bash"
    }
  ];

  return (
    <CodeBlock
      language="bash"
      code=""
      showHeader={true}
      tabs={tabs}
      activeTab="npm"
      title="Terminal"
    />
  );
} 