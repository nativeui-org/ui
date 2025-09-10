"use client";

import React, { useState, useEffect } from "react";
import { CodeBlock } from "@/components/ui/code-block";
import { InstallationTabs } from "@/components/docs/installation-tabs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  // Fonctions helper pour LLM et navigation
  const copyPageContent = async () => {
    const content = `# ${name}\n\n${description}\n\n## Installation\n\n\`\`\`bash\nnpx @nativeui/cli add ${registryName}\n\`\`\`\n\n## Code\n\n\`\`\`tsx\n${componentCode}\n\`\`\`\n\n## Usage\n\n\`\`\`tsx\n${previewCode}\n\`\`\``;
    await navigator.clipboard.writeText(content);
  };

  const openInLLM = (llm: string) => {
    const prompt = `I'm looking at this NativeUI documentation: https://nativeui.io/docs/components/${registryName}.md
Help me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.`;

    const urls = {
      chatgpt: `https://chat.openai.com/?q=${encodeURIComponent(prompt)}`,
      claude: `https://claude.ai/new?q=${encodeURIComponent(prompt)}`
    };

    window.open(urls[llm as keyof typeof urls], '_blank');
  };

  const viewAsMarkdown = () => {
    window.open(`/docs/components/${registryName}.md`, '_blank');
  };

  const navigateToComponent = (direction: 'next' | 'prev') => {
    // Liste des composants (à adapter selon votre structure)
    const components = ['accordion', 'alert', 'alert-dialog', 'avatar', 'badge', 'breadcrumb', 'button', 'calendar', 'card', 'carousel', 'checkbox', 'collapsible', 'combobox', 'date-time-picker', 'dialog', 'drawer', 'dropdown', 'input', 'input-otp', 'label', 'pagination', 'popover', 'progress', 'radio-group', 'select', 'separator', 'sheet', 'skeleton', 'slider', 'switch', 'table', 'tabs', 'textarea', 'toggle', 'toggle-group', 'tooltip'];

    const currentIndex = components.indexOf(registryName);
    if (currentIndex === -1) return;

    let targetIndex;
    if (direction === 'next') {
      targetIndex = currentIndex + 1;
      if (targetIndex >= components.length) targetIndex = 0;
    } else {
      targetIndex = currentIndex - 1;
      if (targetIndex < 0) targetIndex = components.length - 1;
    }

    const targetComponent = components[targetIndex];
    window.location.href = `/docs/components/${targetComponent}`;
  };

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
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateToComponent('prev')}
              className="text-muted-foreground hover:text-foreground"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateToComponent('next')}
              className="text-muted-foreground hover:text-foreground"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Page
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={copyPageContent}>
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy as Markdown
                </DropdownMenuItem>
                <DropdownMenuItem onClick={viewAsMarkdown}>
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View as Markdown
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openInLLM('chatgpt')}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5Z" fill="currentColor"></path></svg>
                  Open in ChatGPT
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openInLLM('claude')}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m4.714 15.956 4.718-2.648.079-.23-.08-.128h-.23l-.79-.048-2.695-.073-2.337-.097-2.265-.122-.57-.121-.535-.704.055-.353.48-.321.685.06 1.518.104 2.277.157 1.651.098 2.447.255h.389l.054-.158-.133-.097-.103-.098-2.356-1.596-2.55-1.688-1.336-.972-.722-.491L2 6.223l-.158-1.008.655-.722.88.06.225.061.893.686 1.906 1.476 2.49 1.833.364.304.146-.104.018-.072-.164-.274-1.354-2.446-1.445-2.49-.644-1.032-.17-.619a2.972 2.972 0 0 1-.103-.729L6.287.133 6.7 0l.995.134.42.364.619 1.415L9.735 4.14l1.555 3.03.455.898.243.832.09.255h.159V9.01l.127-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.583.28.48.685-.067.444-.286 1.851-.558 2.903-.365 1.942h.213l.243-.242.983-1.306 1.652-2.064.728-.82.85-.904.547-.431h1.032l.759 1.129-.34 1.166-1.063 1.347-.88 1.142-1.263 1.7-.79 1.36.074.11.188-.02 2.853-.606 1.542-.28 1.84-.315.832.388.09.395-.327.807-1.967.486-2.307.462-3.436.813-.043.03.049.061 1.548.146.662.036h1.62l3.018.225.79.522.473.638-.08.485-1.213.62-1.64-.389-3.825-.91-1.31-.329h-.183v.11l1.093 1.068 2.003 1.81 2.508 2.33.127.578-.321.455-.34-.049-2.204-1.657-.85-.747-1.925-1.62h-.127v.17l.443.649 2.343 3.521.122 1.08-.17.353-.607.213-.668-.122-1.372-1.924-1.415-2.168-1.141-1.943-.14.08-.674 7.254-.316.37-.728.28-.607-.461-.322-.747.322-1.476.388-1.924.316-1.53.285-1.9.17-.632-.012-.042-.14.018-1.432 1.967-2.18 2.945-1.724 1.845-.413.164-.716-.37.066-.662.401-.589 2.386-3.036 1.439-1.882.929-1.086-.006-.158h-.055L4.138 18.56l-1.13.146-.485-.456.06-.746.231-.243 1.907-1.312Z" fill="currentColor"></path></svg>
                  Open in Claude
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
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
                  command={`shadcn@latest add @nativeui/${registryName}`}
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
