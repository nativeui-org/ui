import { ComponentPreview } from "@/components/docs/component-preview";

export default function SwitchPage() {
  return (
    <ComponentPreview
      name="Switch"
      description="A switch component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Switch } from \"@nativeui/ui\";\n\nexport default function SwitchDemo() {\n  return (\n    <Switch>\n      Click me\n    </Switch>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import * as React from "react";
import { TouchableOpacity, Animated } from "react-native";
import { cn } from "@/lib/utils";

interface SwitchProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
    "onPress"
  > {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof TouchableOpacity>,
  SwitchProps
>(({ className, checked, onCheckedChange, disabled, ...props }, ref) => {
  const [innerChecked, setInnerChecked] = React.useState(checked ?? false);
  const isChecked = checked !== undefined ? checked : innerChecked;
  const [animatedValue] = React.useState(new Animated.Value(isChecked ? 1 : 0));

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isChecked ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [isChecked, animatedValue]);

  const handlePress = React.useCallback(() => {
    if (disabled) return;

    const newChecked = !isChecked;

    if (checked === undefined) {
      setInnerChecked(newChecked);
    }

    onCheckedChange?.(newChecked);
  }, [isChecked, onCheckedChange, disabled, checked]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 21],
  });

  return (
    <TouchableOpacity
      ref={ref}
      activeOpacity={0.8}
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ checked: isChecked, disabled }}
      data-state={isChecked ? "checked" : "unchecked"}
      className={cn(
        "relative h-7 w-12 rounded-full border-2 border-transparent overflow-hidden",
        isChecked ? "bg-primary" : "bg-gray-300 dark:bg-gray-600 border-border",
        disabled && "opacity-50",
        className
      )}
      {...props}
    >
      <Animated.View
        className="absolute h-5 w-5 rounded-full bg-background shadow-md"
        style={{
          transform: [{ translateX }],
          top: "50%",
          marginTop: -9,
        }}
      />
    </TouchableOpacity>
  );
});

Switch.displayName = "Switch";

export { Switch };
`}
      previewCode={`import { Switch } from "@nativeui/ui";

export default function SwitchDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Switch>Default Switch</Switch>
      <Switch variant="destructive">Delete</Switch>
      <Switch variant="outline">Outline</Switch>
      <Switch variant="secondary">Secondary</Switch>
      <Switch variant="ghost">Ghost</Switch>
      <Switch variant="link">Link</Switch>
    </div>
  );
}`}
      registryName="switch"
      packageName="@nativeui/ui"
      dependencies={["react-native"]}
    />
  );
}
