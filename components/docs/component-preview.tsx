"use client";

import React, { useState } from "react";
import { CodeBlock } from "@/components/ui/code-block";
import { InstallationTabs } from "@/components/docs/installation-tabs";

export interface ComponentExample {
  title: string;
  value: string;
  content: string;
  language: string;
}

export interface ComponentPreviewProps {
  name: string;
  description: string;
  examples: ComponentExample[];
  componentCode: string;
  previewCode: string;
  registryName: string;
  packageName: string;
  dependencies?: string[];
}

export function ComponentPreview({
  name,
  description,
  examples,
  componentCode,
  previewCode,
  registryName,
  packageName,
  dependencies = [],
}: ComponentPreviewProps) {
  const [showLineNumbers,] = useState(false); 
  const [activeInstallTab, setActiveInstallTab] = useState("cli");

  const previews = [
    {
      title: "Preview",
      value: "preview",
      content: "// This is a placeholder for the Expo Snack preview",
      language: "tsx",
    },
    {
      title: "Code",
      value: "code",
      content: previewCode,
      language: "tsx",
    },
  ];

  return (
    <div className="container max-w-3xl py-10">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
        <p className="text-muted-foreground text-lg">{description}</p>
      </div>

      <div className="mt-12">
        <CodeBlock
          language="tsx"
          code=""
          title={name}
          tabs={previews}
          activeTab="preview"
        />
      </div>

      <div className="mt-12 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
        <p className="text-muted-foreground">
          Install the {name.toLowerCase()} component using the NativeUI CLI or
          install it manually.
        </p>

        {dependencies.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Dependencies</h3>
            <div className="bg-muted rounded-md p-4">
              <p className="text-sm text-muted-foreground mb-2">
                This component requires the following dependencies:
              </p>
              <div className="space-y-4">
                {/* Package Dependencies */}
                {dependencies.filter(dep => !dep.startsWith('@nativeui/ui/')).length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Package Dependencies:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {dependencies
                        .filter(dep => !dep.startsWith('@nativeui/ui/'))
                        .map((dep) => (
                          <li key={dep} className="text-sm">
                            <a
                              href={`https://www.npmjs.com/package/${dep.split('@')[0]}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center hover:text-primary"
                            >
                              <code className="text-sm font-mono bg-background px-1 py-0.5 rounded">{dep}</code>
                              <svg
                                className="w-4 h-4 ml-1 opacity-70"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            </a>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
                
                {/* Registry Dependencies */}
                {dependencies.filter(dep => dep.startsWith('@nativeui/ui/')).length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Required Components:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {dependencies
                        .filter(dep => dep.startsWith('@nativeui/ui/'))
                        .map((dep) => {
                          const componentName = dep.replace('@nativeui/ui/', '');
                          return (
                            <li key={dep} className="text-sm">
                              <a
                                href={`/docs/components/${componentName}`}
                                className="inline-flex items-center hover:text-primary"
                              >
                                <code className="text-sm font-mono bg-background px-1 py-0.5 rounded">
                                  {componentName}
                                </code>
                                <svg
                                  className="w-4 h-4 ml-1 opacity-70"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </a>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-6">
          <div className="flex items-center border-b">
            <button
              onClick={() => setActiveInstallTab("cli")}
              className={`px-4 py-2 text-sm font-medium ${
                activeInstallTab === "cli"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              CLI
            </button>
            <button
              onClick={() => setActiveInstallTab("manual")}
              className={`px-4 py-2 text-sm font-medium ${
                activeInstallTab === "manual"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Manual
            </button>
          </div>

          <div className="p-6 border border-t-0 rounded-b-md">
            {activeInstallTab === "cli" ? (
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Install the {name.toLowerCase()} component using the NativeUI
                  CLI.
                </p>
                <InstallationTabs
                  command={`add ${registryName}`}
                  packageName={packageName}
                />
              </div>
            ) : (
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Copy and paste the following code into your project.
                </p>
                <CodeBlock
                  language="tsx"
                  code={componentCode}
                  title={`${registryName}.tsx`}
                  showLineNumbers={showLineNumbers}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <p className="text-muted-foreground mb-6">
          The {name} component can be used in various ways with different
          variants and sizes.
        </p>

        <CodeBlock
          language="tsx"
          code=""
          title="Examples"
          tabs={examples}
          activeTab={examples[0]?.value}
        />
      </div>
    </div>
  );
}
