import { ComponentPreview } from "@/components/docs/component-preview";

export default function ButtonPage() {
  return (
    <ComponentPreview
      name="Button"
      description="A button component with multiple variants for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Button } from \"@nativeui/ui\";\n\nexport default function ButtonDemo() {\n  return (\n    <Button>\n      Click me\n    </Button>\n  );\n}",
    "language": "tsx"
  },
  {
    "title": "Variants",
    "value": "variants",
    "content": "import { Button } from \"@nativeui/ui\";\n\nexport default function ButtonVariants() {\n  return (\n    <div className=\"flex flex-col gap-4\">\n      <Button variant=\"default\">Default</Button>\n      <Button variant=\"destructive\">Destructive</Button>\n      <Button variant=\"outline\">Outline</Button>\n      <Button variant=\"secondary\">Secondary</Button>\n      <Button variant=\"ghost\">Ghost</Button>\n      <Button variant=\"link\">Link</Button>\n    </div>\n  );\n}",
    "language": "tsx"
  },
  {
    "title": "Sizes",
    "value": "sizes",
    "content": "import { Button } from \"@nativeui/ui\";\n\nexport default function ButtonSizes() {\n  return (\n    <div className=\"flex items-center gap-4\">\n      <Button size=\"default\">Default</Button>\n      <Button size=\"sm\">Sm</Button>\n      <Button size=\"lg\">Lg</Button>\n      <Button size=\"icon\">👋</Button>\n    </div>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import * as React from "react";
import {
  Pressable,
  PressableProps as RNPressableProps,
  View,
  ViewStyle,
  PressableStateCallbackType,
} from "react-native";
import { cn } from "@/lib/utils";

import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "flex-row items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground shadow",
        destructive:
          "bg-destructive text-destructive-foreground dark:bg-destructive dark:text-destructive-foreground shadow-sm",
        outline:
          "border border-input bg-background text-foreground dark:border-input dark:bg-background dark:text-foreground shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground dark:bg-secondary dark:text-secondary-foreground shadow-sm",
        ghost: "text-foreground dark:text-foreground",
        link: "text-primary dark:text-primary underline",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-10 px-4",
        lg: "h-14 px-8",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends Omit<RNPressableProps, "style">,
    VariantProps<typeof buttonVariants> {
  className?: string;
  style?: ViewStyle;
  asChild?: boolean;
}

const Button = React.forwardRef<View, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    return (
      <Pressable
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {(state: PressableStateCallbackType) => (
          <View
            className={\`flex-row items-center justify-center gap-2 ""\`}
          >
            {typeof children === "function" ? children(state) : children}
          </View>
        )}
      </Pressable>
    );
  }
);

Button.displayName = "Button";

export { Button };
`}
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
      dependencies={["react-native","class-variance-authority"]}
    />
  );
}
