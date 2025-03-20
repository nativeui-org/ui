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
}

export function ComponentPreview({
  name,
  description,
  examples,
  componentCode,
  previewCode,
  registryName,
  packageName,
}: ComponentPreviewProps) {
  const [showLineNumbers, setShowLineNumbers] = useState(false);
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
