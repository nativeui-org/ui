"use client";

import * as React from "react";
import { Highlight, themes } from "prism-react-renderer";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Check, Copy, ChevronDown, ChevronUp } from "lucide-react";

interface CodeBlockProps {
  language: string;
  code: string;
  className?: string;
  showLineNumbers?: boolean;
  title?: string;
  showHeader?: boolean;
  headerPrefix?: React.ReactNode;
  tabs?: Array<{
    title: string;
    value: string;
    content: string;
    language?: string;
  }>;
  activeTab?: string;
  onTabChange?: (value: string) => void;
  children?: React.ReactNode;
  componentName?: string;
  collapsible?: boolean;
  maxVisibleLines?: number;
  defaultExpanded?: boolean;
}

export function CodeBlock({
  language,
  code,
  className,
  showLineNumbers = false,
  title,
  showHeader = true,
  headerPrefix,
  tabs,
  activeTab,
  onTabChange,
  children,
  componentName,
  collapsible = false,
  maxVisibleLines = 10,
  defaultExpanded = false,
}: CodeBlockProps) {
  const { resolvedTheme } = useTheme();
  const [copied, setCopied] = React.useState(false);
  const [localActiveTab, setLocalActiveTab] = React.useState<string | undefined>(activeTab || (tabs && tabs.length > 0 ? tabs[0].value : undefined));
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);
  const [mounted, setMounted] = React.useState(false);

  // Fix hydration issues with next-themes
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = () => {
    const textToCopy = tabs && localActiveTab
      ? tabs.find(tab => tab.value === localActiveTab)?.content || code
      : code;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTabChange = (value: string) => {
    setLocalActiveTab(value);
    if (onTabChange) {
      onTabChange(value);
    }
  };

  // Determine the content and language based on active tab
  const activeContent = tabs && localActiveTab
    ? tabs.find(tab => tab.value === localActiveTab)?.content || code
    : code;

  const activeLanguage = tabs && localActiveTab
    ? tabs.find(tab => tab.value === localActiveTab)?.language || language
    : language;

  const codeLines = activeContent.split("\n");
  const shouldCollapse = collapsible && codeLines.length > maxVisibleLines;
  const displayedCode = shouldCollapse && !isExpanded
    ? codeLines.slice(0, maxVisibleLines).join("\n")
    : activeContent;

  // Get language icon based on file extension
  const getLanguageIcon = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'typescript':
      case 'tsx':
        return (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
          </svg>
        );
      case 'javascript':
      case 'js':
        return (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
          </svg>
        );
      case 'json':
        return (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.89 3l1.96.4L11.11 21l-1.96-.4L12.89 3zm6.7 9.16l-3.78 3.78 3.78 3.78-1.06 1.06-4.85-4.84 4.85-4.84 1.06 1.06zm-12.12 0l1.06-1.06 4.85 4.84-4.85 4.84-1.06-1.06 3.78-3.78-3.78-3.78z" />
          </svg>
        );
      case 'bash':
      case 'shell':
        return (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m0 2v14h14V5H5m2 2h2v2H7V7m3 0h2v2h-2V7m3 0h2v2h-2V7m3 0h2v2h-2V7m3 0h2v2h-2V7m3 0h2v2h-2V7m3 0h2v2h-2V7m3 0h2v2h-2V7M7 10h2v2H7v-2m3 0h2v2h-2v-2m3 0h2v2h-2v-2m3 0h2v2h-2v-2m3 0h2v2h-2v-2m3 0h2v2h-2v-2m3 0h2v2h-2v-2m3 0h2v2h-2v-2m3 0h2v2h-2v-2m3 0h2v2h-2v-2M7 16h2v2H7v-2m3 0h2v2h-2v-2m3 0h2v2h-2v-2m3 0h2v2h-2v-2m3 0h2v2h-2v-2m3 0h2v2h-2v-2m3 0h2v2h-2v-2m3 0h2v2h-2v-2m3 0h2v2h-2v-2" />
          </svg>
        );
      case 'css':
        return (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const customDarkTheme: typeof themes.nightOwl = {
    plain: {
      color: "#d4d4d4",
      backgroundColor: "#1a1a1a",
    },
    styles: [
      {
        types: ["comment", "prolog", "doctype", "cdata"],
        style: {
          color: "#6A9955",
          fontStyle: "italic",
        },
      },
      {
        types: ["namespace"],
        style: {
          opacity: 0.7,
        },
      },
      {
        types: ["string", "attr-value"],
        style: {
          color: "#ce9178",
        },
      },
      {
        types: ["punctuation", "operator"],
        style: {
          color: "#d4d4d4",
        },
      },
      {
        types: ["entity", "url", "symbol", "number", "boolean", "variable", "constant", "property", "regex", "inserted"],
        style: {
          color: "#9CDCFE",
        },
      },
      {
        types: ["atrule", "keyword", "attr-name"],
        style: {
          color: "#569CD6",
        },
      },
      {
        types: ["function"],
        style: {
          color: "#DCDCAA",
        },
      },
      {
        types: ["deleted", "tag"],
        style: {
          color: "#569CD6",
        },
      },
      {
        types: ["selector"],
        style: {
          color: "#d7ba7d",
        },
      },
      {
        types: ["important", "bold"],
        style: {
          fontWeight: "bold",
        },
      },
      {
        types: ["italic"],
        style: {
          fontStyle: "italic",
        },
      },
      {
        types: ["class-name", "maybe-class-name"],
        style: {
          color: "#4EC9B0",
        },
      },
      {
        types: ["parameter"],
        style: {
          color: "#9CDCFE",
        },
      }
    ]
  };

  const theme = resolvedTheme === "dark" ? customDarkTheme : themes.github;

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className={cn("relative group rounded-md overflow-hidden border border-border", className)}>
        {showHeader && (
          <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
            <div className="flex items-center gap-2">
              {headerPrefix}
              {getLanguageIcon(activeLanguage)}
              {title && <div className="text-sm font-medium">{title}</div>}
            </div>
            <div className="rounded-md p-1">
              <Copy className="h-4 w-4" />
            </div>
          </div>
        )}
        <div className="relative">
          <pre className="text-sm p-4 overflow-x-auto bg-muted">
            <code>{displayedCode.trim()}</code>
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative group rounded-md overflow-hidden border border-border", className)}>
      {showHeader && (
        <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
          <div className="flex items-center gap-2">
            {headerPrefix}
            {getLanguageIcon(activeLanguage)}
            {title && <div className="text-sm font-medium">{title}</div>}
            {tabs && tabs.length > 0 && (
              <div className="flex items-center">
                {title && <div className="mx-2 h-4 w-px bg-border"></div>}
                <div className="flex gap-1">
                  {tabs.map(tab => (
                    <button
                      key={tab.value}
                      onClick={() => handleTabChange(tab.value)}
                      className={cn(
                        "rounded-sm px-2 py-1 text-xs font-medium transition-colors",
                        localActiveTab === tab.value
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            className="rounded-md p-1 hover:bg-muted/80 transition-colors"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      )}

      <div className={cn("relative group rounded-md overflow-hidden border border-border", className)}>
        {localActiveTab === "preview" && (
          <div className="p-6 border-b">
            {componentName ? (
              <div className="flex items-center justify-center">
                <div className="w-[350px] h-[700px] bg-slate-100 dark:bg-slate-900 rounded-[40px] overflow-hidden border-8 border-slate-300 dark:border-slate-700 shadow-xl relative">
                  <div className="relative w-full h-[calc(100%-24px)]">
                    <video
                      className="w-full h-full object-cover"
                      src={`https://xbu6gsnzqpqao6cm.public.blob.vercel-storage.com/ui/${componentName}.mp4`}
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                      controlsList="nodownload"
                      preload="auto"
                      style={{ objectFit: 'cover' }}
                    >
                      Your browser does not support video playback.
                    </video>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[250px] w-full flex items-center justify-center bg-slate-100 dark:bg-slate-900 rounded-md">
                <div className="flex flex-col items-center gap-2">
                  <p className="text-sm text-muted-foreground">
                    Video preview will load here
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {children}

        {localActiveTab !== "preview" && (
          <div className="relative">
            <Highlight
              theme={theme}
              code={displayedCode.trim()}
              language={activeLanguage}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={cn(
                    "text-sm p-4 overflow-x-auto",
                    className
                  )}
                  style={{
                    ...style,
                    // Remove hardcoded background, let CSS variables handle it
                    backgroundColor: undefined,
                  }}
                >
                  {tokens.map((line, i) => {
                    const lineProps = getLineProps({ line });
                    return (
                      <div key={i} {...lineProps}>
                        {showLineNumbers && (
                          <span className="mr-4 inline-block w-6 text-right text-muted-foreground">
                            {i + 1}
                          </span>
                        )}
                        {line.map((token, key) => {
                          const tokenProps = getTokenProps({ token });
                          return <span key={key} {...tokenProps} />;
                        })}
                      </div>
                    );
                  })}
                </pre>
              )}
            </Highlight>

            {shouldCollapse && !isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            )}
          </div>
        )}

        {shouldCollapse && localActiveTab !== "preview" && (
          <div className="relative flex justify-center border-t border-border bg-muted/30">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Show More ({codeLines.length - maxVisibleLines} more lines)
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
