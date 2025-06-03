import React from "react";
import { CodeBlock } from "@/components/ui/code-block";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleCodeBlockProps {
  code: string;
  language: string;
  maxVisibleLines?: number;
  className?: string;
  title?: string;
  showHeader?: boolean;
  tabs?: {
    title: string;
    value: string;
    content: string;
    language: string;
  }[];
  activeTab?: string;
}

export function CollapsibleCodeBlock({
  code,
  language,
  maxVisibleLines = 10,
  className,
  title,
  showHeader = true,
  tabs,
  activeTab,
}: CollapsibleCodeBlockProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const codeLines = code.split("\n");
  const shouldCollapse = codeLines.length > maxVisibleLines;
  const displayedCode = shouldCollapse && !isExpanded 
    ? codeLines.slice(0, maxVisibleLines).join("\n")
    : code;

  // Always keep the full code in a hidden textarea for copying
  const fullCodeRef = React.useRef<HTMLTextAreaElement>(null);
  
  const handleCopy = () => {
    if (fullCodeRef.current) {
      fullCodeRef.current.select();
      document.execCommand('copy');
    }
  };

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
            <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m0 2v14h14V5H5m2 2h2v2H7V7m3 0h2v2h-2V7m3 0h2v2h-2V7m3 0h2v2h-2V7M7 10h2v2H7v-2m3 0h2v2h-2v-2m3 0h2v2h-2v-2m3 0h2v2h-2v-2M7 13h2v2H7v-2m3 0h2v2h-2v-2m3 0h2v2h-2v-2m3 0h2v2h-2v-2M7 16h2v2H7v-2m3 0h2v2h-2v-2m3 0h2v2h-2v-2m3 0h2v2h-2v-2" />
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

  return (
    <div className={cn("relative group", className)}>
      <div className="absolute right-4 top-4 z-20 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 bg-background/50 backdrop-blur-sm"
          onClick={handleCopy}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      
      <CodeBlock
        language={language}
        code={displayedCode}
        showHeader={showHeader}
        title={title}
        tabs={tabs}
        activeTab={activeTab}
        headerPrefix={getLanguageIcon(language)}
      />
      
      {shouldCollapse && (
        <div className="relative -mt-8 flex justify-center">
          <div className="absolute inset-x-0 h-12 bg-gradient-to-t from-background to-transparent" />
          <Button
            variant="ghost"
            size="sm"
            className="relative"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Show More
              </>
            )}
          </Button>
        </div>
      )}

      {/* Hidden textarea for copying full code */}
      <textarea
        ref={fullCodeRef}
        value={code}
        readOnly
        className="sr-only"
      />
    </div>
  );
} 