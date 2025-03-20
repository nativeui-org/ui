import { ComponentPreview } from "@/components/docs/component-preview";

export default function ButtonPage() {
  return (
    <ComponentPreview
      name="Button"
      description="A button component that can be used to trigger actions or navigate to different pages."
      examples={[
        {
          title: "Default",
          value: "default",
          content: `import { Button } from "@nativeui/ui";

export default function ButtonDemo() {
  return (
    <Button>
      Click me
    </Button>
  );
}`,
          language: "tsx",
        },
        {
          title: "Variants",
          value: "variants",
          content: `import { Button } from "@nativeui/ui";

export default function ButtonVariants() {
  return (
    <div className="flex flex-col gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}`,
          language: "tsx",
        },
        {
          title: "Sizes",
          value: "sizes",
          content: `import { Button } from "@nativeui/ui";

export default function ButtonSizes() {
  return (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">👋</Button>
    </div>
  );
}`,
          language: "tsx",
        },
      ]}
      componentCode={`import * as React from "react";
import { Pressable, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-primary",
        destructive: "bg-destructive",
        outline: "border border-input bg-background",
        secondary: "bg-secondary",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  return (
    <Pressable
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };`}
      previewCode={`import { Button } from "@nativeui/ui";

export default function ButtonDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Button>Default Button</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}`}
      registryName="button"
      packageName="@nativeui/ui"
    />
  );
}
