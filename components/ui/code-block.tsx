"use client";

import * as React from "react";
import { Highlight, themes } from "prism-react-renderer";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Check, Copy } from "lucide-react";

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
}: CodeBlockProps) {
  const { theme: applicationTheme } = useTheme();
  const [copied, setCopied] = React.useState(false);
  const [localActiveTab, setLocalActiveTab] = React.useState<string | undefined>(activeTab || (tabs && tabs.length > 0 ? tabs[0].value : undefined));

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

  const theme = applicationTheme === "dark" ? customDarkTheme : themes.github;

  return (
    <div className={cn("relative group rounded-md overflow-hidden border border-border", className)}>
      {showHeader && (
        <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
          <div className="flex items-center gap-2">
            {headerPrefix}
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
      
      {/* Special handling for Preview tab */}
      {localActiveTab === "preview" && (
        <div className="p-6 border-b">
          <div className="h-[250px] w-full flex items-center justify-center bg-slate-100 dark:bg-slate-900 rounded-md">
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-muted-foreground">
                Expo Snack or video preview will load here
              </p>
            </div>
          </div>
        </div>
      )}
      
      {children}
      
      {localActiveTab !== "preview" && (
        <Highlight
          theme={theme}
          code={activeContent.trim()}
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
                backgroundColor: applicationTheme === "dark" ? "#1a1a1a" : style.backgroundColor,
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
      )}
    </div>
  );
} 