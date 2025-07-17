import { ComponentPreview } from "@/components/docs/component-preview";

export default function SkeletonPage() {
  return (
    <ComponentPreview
      name="Skeleton"
      description="A skeleton component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Skeleton } from \"@nativeui/ui\";\n\nexport default function SkeletonDemo() {\n  return (\n    <Skeleton>\n      Click me\n    </Skeleton>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import React from "react";
import { View } from "react-native";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <View
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  );
}

export { Skeleton };
`}
      previewCode={`import { Skeleton } from "@nativeui/ui";

export default function SkeletonDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton>Default Skeleton</Skeleton>
      <Skeleton variant="destructive">Delete</Skeleton>
      <Skeleton variant="outline">Outline</Skeleton>
      <Skeleton variant="secondary">Secondary</Skeleton>
      <Skeleton variant="ghost">Ghost</Skeleton>
      <Skeleton variant="link">Link</Skeleton>
    </div>
  );
}`}
      registryName="skeleton"
      packageName="@nativeui/ui"
      dependencies={[]}
      changelog={[]}
    />
  );
}
