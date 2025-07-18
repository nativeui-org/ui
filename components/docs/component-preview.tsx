"use client";

import React, { useState, useEffect } from "react";
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
  changelog?: Array<{
    version: string;
    date: string;
    changes: string[];
  }>;
}

const ComponentPreviewSkeleton = () => {
  return (
    <div className="container max-w-3xl py-10 animate-pulse">
      {/* Header skeleton */}
      <div className="space-y-4">
        <div className="h-9 bg-muted rounded-md w-2/3"></div>
        <div className="h-6 bg-muted rounded-md w-full"></div>
        <div className="h-6 bg-muted rounded-md w-4/5"></div>
      </div>

      {/* Preview section skeleton */}
      <div className="mt-12">
        <div className="border rounded-lg overflow-hidden">
          <div className="flex border-b">
            <div className="h-10 bg-muted w-20 border-r"></div>
            <div className="h-10 bg-muted w-16"></div>
          </div>
          <div className="h-64 bg-muted/50"></div>
        </div>
      </div>

      {/* Installation section skeleton */}
      <div className="mt-12 space-y-4">
        <div className="h-8 bg-muted rounded-md w-1/3"></div>
        <div className="h-5 bg-muted rounded-md w-full"></div>
        <div className="h-5 bg-muted rounded-md w-3/4"></div>

        <div className="mt-6">
          <div className="flex border-b">
            <div className="h-10 bg-muted w-16 border-r"></div>
            <div className="h-10 bg-muted w-20"></div>
          </div>
          <div className="p-6 border border-t-0 rounded-b-md">
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-32 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage section skeleton */}
      <div className="mt-12 space-y-4">
        <div className="h-8 bg-muted rounded-md w-1/4"></div>
        <div className="h-5 bg-muted rounded-md w-full"></div>
        <div className="h-5 bg-muted rounded-md w-2/3"></div>
        <div className="h-40 bg-muted rounded-md"></div>
      </div>
    </div>
  );
};

export function ComponentPreview({
  name,
  description,
  examples,
  componentCode,
  previewCode,
  registryName,
  dependencies = [],
  changelog = [],
}: ComponentPreviewProps) {
  const [showLineNumbers,] = useState(false);
  const [activeInstallTab, setActiveInstallTab] = useState("cli");
  const [customUsage, setCustomUsage] = useState<string | null>(null);

  // États de chargement
  const [isLoading, setIsLoading] = useState(true);
  const [, setLoadingStates] = useState({
    componentJson: false,
    theme: false,
    codeBlocks: false,
    dependencies: false,
  });

  useEffect(() => {
    const loadAllResources = async () => {
      setIsLoading(true);

      try {
        setLoadingStates(prev => ({ ...prev, theme: true }));
        await new Promise(resolve => setTimeout(resolve, 300));

        setLoadingStates(prev => ({ ...prev, componentJson: true }));
        const loadComponentJson = async () => {
          try {
            const response = await fetch(`/r/${registryName}.json`);
            const data = await response.json();
            if (data.customUsage) {
              setCustomUsage(data.customUsage);
            }
          } catch (error) {
            console.error("Erreur lors du chargement du fichier JSON du composant", error);
          }
        };
        await loadComponentJson();

        setLoadingStates(prev => ({ ...prev, codeBlocks: true }));
        await new Promise(resolve => setTimeout(resolve, 400));

        setLoadingStates(prev => ({ ...prev, dependencies: true }));
        await new Promise(resolve => setTimeout(resolve, 200));

        await new Promise(resolve => setTimeout(resolve, 300));

      } finally {
        setIsLoading(false);
      }
    };

    loadAllResources();
  }, [registryName]);

  if (isLoading) {
    return <ComponentPreviewSkeleton />;
  }

  const previews = [
    {
      title: "Preview",
      value: "preview",
      content: "Thanks to support NativeUI :)",
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
          collapsible
          componentName={registryName}
        />
      </div>

      <div className="mt-12 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
        <p className="text-muted-foreground">
          Install the {name.toLowerCase()} component using the shadcn/UI CLI or
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
              className={`px-4 py-2 text-sm font-medium ${activeInstallTab === "cli"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              CLI
            </button>
            <button
              onClick={() => setActiveInstallTab("manual")}
              className={`px-4 py-2 text-sm font-medium ${activeInstallTab === "manual"
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
                  Install the {name.toLowerCase()} component using the shadcn
                  CLI.
                </p>
                <InstallationTabs
                  command={`shadcn@latest add https://nativeui.io/registry/${registryName}`}
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

        {customUsage ? (
          <div className="relative">
            <CodeBlock
              language="tsx"
              code={customUsage}
              title="Usage Examples"
              showLineNumbers={showLineNumbers}
            />
          </div>
        ) : (
          <CodeBlock
            language="tsx"
            code=""
            title="Examples"
            tabs={examples}
            activeTab={examples[0]?.value}
          />
        )}
      </div>

      {changelog.length > 0 && (
        <div className="mt-12 space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Changelog</h2>
          <p className="text-muted-foreground mb-6">
            Historique des modifications du composant {name}.
          </p>

          <div className="space-y-6">
            {changelog.map((entry) => (
              <div key={entry.version} className="border-b pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">Version {entry.version}</h3>
                  {entry.date && (
                    <span className="text-sm text-muted-foreground">
                      {entry.date}
                    </span>
                  )}
                </div>
                <ul className="list-disc list-inside space-y-1">
                  {entry.changes.map((change, i) => (
                    <li key={i} className="text-sm">{change}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
