"use client";

import React from "react";
import Link from "next/link";
import { InstallationTabs } from "@/components/docs/installation-tabs";
import { ArrowRight } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="container max-w-3xl py-10">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">NativeUI</h1>
        <p className="text-muted-foreground text-lg">
          Beautifully designed components for React Native applications.
        </p>
      </div>

      <div className="mt-12 space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Introduction</h2>
          <p className="text-muted-foreground leading-7">
            NativeUI is an open-source UI component library for React Native applications inspired by shadcn/ui's design principles. Our goal is to provide developers with a set of customizable, accessible, and platform-adaptive components to build beautiful mobile applications.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Philosophy</h2>
          <p className="text-muted-foreground leading-7">
            Like shadcn/ui, NativeUI is not a component library you install from npm. Instead, we provide a collection of reusable components that you can copy and customize for your React Native applications.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4 ml-4">
            <li>Copy and paste - Take the components you need</li>
            <li>Style with NativeWind - Easy theming and customization</li>
            <li>Accessible components - Following best practices</li>
            <li>Platform-adaptive - Works on iOS, Android, and Web</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
          <p className="text-muted-foreground leading-7">
            Get started by installing the CLI to add components to your project:
          </p>
          <div className="mt-4">
            <InstallationTabs command="init" />
          </div>
        </div>

        <div className="mt-12 space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Getting Started</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/docs/installation"
              className="group relative overflow-hidden rounded-lg border p-6 hover:border-foreground/10 transition-colors"
            >
              <div className="flex flex-col justify-between space-y-2">
                <div className="space-y-2">
                  <h3 className="font-bold">Installation</h3>
                  <p className="text-muted-foreground text-sm">
                    How to install and set up NativeUI in your project.
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
            <Link
              href="/docs/components/button"
              className="group relative overflow-hidden rounded-lg border p-6 hover:border-foreground/10 transition-colors"
            >
              <div className="flex flex-col justify-between space-y-2">
                <div className="space-y-2">
                  <h3 className="font-bold">Components</h3>
                  <p className="text-muted-foreground text-sm">
                    Explore the available components and learn how to use them.
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 