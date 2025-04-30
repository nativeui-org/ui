import { ComponentPreview } from "@/components/docs/component-preview";

export default function Radio-groupPage() {
  return (
    <ComponentPreview
      name="Radio-group"
      description="A radio group component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Radio-group } from \"@nativeui/ui\";\n\nexport default function Radio-groupDemo() {\n  return (\n    <Radio-group>\n      Click me\n    </Radio-group>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import * as React from "react";
import { View, Text, Pressable } from "react-native";
import { cn } from "@/lib/utils";

interface RadioGroupRootProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

interface RadioGroupItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Pressable>, "children"> {
  value: string;
  disabled?: boolean;
  id?: string;
}

interface RadioGroupLabelProps
  extends React.ComponentPropsWithoutRef<typeof Text> {
  disabled?: boolean;
  htmlFor?: string;
}

const RadioGroupContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}>({});

function RadioGroup({
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  className,
  children,
  ...props
}: RadioGroupRootProps) {
  const [innerValue, setInnerValue] = React.useState<string | undefined>(
    value ?? defaultValue
  );
  const currentValue = value !== undefined ? value : innerValue;

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (disabled) return;

      if (value === undefined) {
        setInnerValue(newValue);
      }

      onValueChange?.(newValue);
    },
    [value, onValueChange, disabled]
  );

  return (
    <RadioGroupContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        disabled,
      }}
    >
      <View
        className={cn("space-y-4", className)}
        accessibilityRole="radiogroup"
        {...props}
      >
        {children}
      </View>
    </RadioGroupContext.Provider>
  );
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  RadioGroupItemProps
>(({ className, value, disabled, id, ...props }, ref) => {
  const {
    value: groupValue,
    onValueChange,
    disabled: groupDisabled,
  } = React.useContext(RadioGroupContext);
  const isDisabled = disabled || groupDisabled;
  const isChecked = value === groupValue;

  const handlePress = () => {
    if (!isDisabled) {
      onValueChange?.(value);
    }
  };

  return (
    <Pressable
      ref={ref}
      accessibilityRole="radio"
      accessibilityState={{ checked: isChecked, disabled: isDisabled }}
      onPress={handlePress}
      disabled={isDisabled}
      className={cn(
        "h-6 w-6 rounded-full border-2 justify-center items-center",
        isChecked
          ? "border-primary bg-primary/10"
          : "border-border bg-transparent",
        isDisabled && "opacity-50",
        className
      )}
      accessibilityLabel={id}
      {...props}
    >
      {isChecked && <View className="h-3 w-3 rounded-full bg-primary" />}
    </Pressable>
  );
});

const RadioGroupLabel = React.forwardRef<
  React.ElementRef<typeof Text>,
  RadioGroupLabelProps
>(({ className, disabled, htmlFor, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      className={cn(
        "text-base text-foreground ml-3",
        disabled && "text-muted-foreground",
        className
      )}
      {...props}
    />
  );
});

RadioGroupItem.displayName = "RadioGroupItem";
RadioGroupLabel.displayName = "RadioGroupLabel";

export { RadioGroup, RadioGroupItem, RadioGroupLabel };
`}
      previewCode={`import { Radio-group } from "@nativeui/ui";

export default function Radio-groupDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Radio-group>Default Radio-group</Radio-group>
      <Radio-group variant="destructive">Delete</Radio-group>
      <Radio-group variant="outline">Outline</Radio-group>
      <Radio-group variant="secondary">Secondary</Radio-group>
      <Radio-group variant="ghost">Ghost</Radio-group>
      <Radio-group variant="link">Link</Radio-group>
    </div>
  );
}`}
      registryName="radio-group"
      packageName="@nativeui/ui"
    />
  );
}
