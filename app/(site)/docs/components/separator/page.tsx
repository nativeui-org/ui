import { ComponentPreview } from "@/components/docs/component-preview";

export default function SeparatorPage() {
  return (
    <ComponentPreview
      name="Separator"
      description="A separator component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Separator } from \"@nativeui/ui\";\n\nexport default function SeparatorDemo() {\n  return (\n    <Separator>\n      Click me\n    </Separator>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import React from "react";
import { View } from "react-native";
import { cn } from "@/lib/utils";

interface SeparatorProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

function Separator({
  className,
  orientation = "horizontal",
}: SeparatorProps) {
  return (
    <View
      className={cn(
        "bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
    />
  );
}

export { Separator };
`}
      previewCode={`import { Separator } from "@nativeui/ui";

export default function SeparatorDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Separator>Default Separator</Separator>
      <Separator variant="destructive">Delete</Separator>
      <Separator variant="outline">Outline</Separator>
      <Separator variant="secondary">Secondary</Separator>
      <Separator variant="ghost">Ghost</Separator>
      <Separator variant="link">Link</Separator>
    </div>
  );
}`}
      registryName="separator"
      packageName="@nativeui/ui"
      dependencies={["react-native"]}
      changelog={[]}
    />
  );
}
