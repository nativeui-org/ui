import { ComponentPreview } from "@/components/docs/component-preview";

export default function TogglePage() {
  return (
    <ComponentPreview
      name="Toggle"
      description="A toggle component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Toggle } from \"@nativeui/ui\";\n\nexport default function ToggleDemo() {\n  return (\n    <Toggle>\n      Click me\n    </Toggle>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import { cn } from "@/lib/utils";
import * as React from "react";
import { Platform, Pressable, View } from "react-native";

interface ToggleProps {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

const Toggle = React.forwardRef<View, ToggleProps>(
  (
    {
      pressed,
      onPressedChange,
      disabled,
      children,
      className,
      variant = "default",
      size = "default",
      ...props
    },
    ref
  ) => {
    const [isPressed, setIsPressed] = React.useState(pressed);

    React.useEffect(() => {
      setIsPressed(pressed);
    }, [pressed]);

    const handlePress = () => {
      if (disabled) return;
      const newValue = !isPressed;
      setIsPressed(newValue);
      onPressedChange?.(newValue);
    };

    const getSizeStyles = () => {
      switch (size) {
        case "sm":
          return Platform.OS === "ios" ? "h-10 px-3" : "h-12 px-3";
        case "lg":
          return Platform.OS === "ios" ? "h-12 px-4" : "h-14 px-4";
        default:
          return Platform.OS === "ios" ? "h-11 px-3.5" : "h-13 px-3.5";
      }
    };

    const getVariantStyles = () => {
      switch (variant) {
        case "outline":
          return isPressed
            ? "border border-toggle-border bg-toggle-active/20"
            : "border border-toggle-border bg-background/10";
        default:
          return isPressed
            ? "bg-toggle-active/20"
            : "bg-background/10";
      }
    };

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        disabled={disabled}
        className={cn(
          "flex-row items-center justify-center rounded-lg",
          getSizeStyles(),
          getVariantStyles(),
          isPressed
            ? "text-toggle-active-foreground"
            : "text-foreground",
          disabled && "opacity-50 bg-muted text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
      </Pressable>
    );
  }
);

Toggle.displayName = "Toggle";

export { Toggle };
`}
      previewCode={`import { Toggle } from "@nativeui/ui";

export default function ToggleDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Toggle>Default Toggle</Toggle>
      <Toggle variant="destructive">Delete</Toggle>
      <Toggle variant="outline">Outline</Toggle>
      <Toggle variant="secondary">Secondary</Toggle>
      <Toggle variant="ghost">Ghost</Toggle>
      <Toggle variant="link">Link</Toggle>
    </div>
  );
}`}
      registryName="toggle"
      packageName="@nativeui/ui"
      dependencies={["react-native"]}
    />
  );
}
