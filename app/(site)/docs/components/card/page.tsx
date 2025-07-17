import { ComponentPreview } from "@/components/docs/component-preview";

export default function CardPage() {
  return (
    <ComponentPreview
      name="Card"
      description="A card component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Card } from \"@nativeui/ui\";\n\nexport default function CardDemo() {\n  return (\n    <Card>\n      Click me\n    </Card>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import * as React from "react";
import { View, ViewProps } from "react-native";
import { cn } from "@/lib/utils";

interface CardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

function Card({ className, children, ...props }: CardProps) {
  return (
    <View
      className={cn(
        "bg-card rounded-2xl border border-border p-4 shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}

function CardHeader({ className, children, ...props }: CardProps) {
  return (
    <View
      className={cn(
        "flex-row justify-between items-start gap-4 mb-4",
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}

function CardTitle({ className, children, ...props }: CardProps) {
  return (
    <View className={cn("flex-shrink", className)} {...props}>
      {children}
    </View>
  );
}

function CardDescription({ className, children, ...props }: CardProps) {
  return (
    <View className={cn("text-muted-foreground", className)} {...props}>
      {children}
    </View>
  );
}

function CardContent({ className, children, ...props }: CardProps) {
  return (
    <View className={cn("", className)} {...props}>
      {children}
    </View>
  );
}

function CardFooter({ className, children, ...props }: CardProps) {
  return (
    <View
      className={cn("mt-4 flex-row items-center justify-end gap-4", className)}
      {...props}
    >
      {children}
    </View>
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
`}
      previewCode={`import { Card } from "@nativeui/ui";

export default function CardDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Card>Default Card</Card>
      <Card variant="destructive">Delete</Card>
      <Card variant="outline">Outline</Card>
      <Card variant="secondary">Secondary</Card>
      <Card variant="ghost">Ghost</Card>
      <Card variant="link">Link</Card>
    </div>
  );
}`}
      registryName="card"
      packageName="@nativeui/ui"
      dependencies={["react-native"]}
      changelog={[]}
      customUsage={``}
    />
  );
}
