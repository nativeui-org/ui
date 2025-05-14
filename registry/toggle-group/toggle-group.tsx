import * as React from "react";
import { View, Pressable, Platform } from "react-native";
import { cn } from "@/lib/utils";

interface ToggleGroupProps {
  type?: "single" | "multiple";
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

interface ToggleGroupItemProps {
  value: string;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

const ToggleGroupContext = React.createContext<{
  type: "single" | "multiple";
  value: string | string[];
  onValueChange?: (value: string | string[]) => void;
  disabled?: boolean;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}>({
  type: "single",
  value: "",
});

const ToggleGroup = React.forwardRef<View, ToggleGroupProps>(
  (
    {
      type = "single",
      value,
      onValueChange,
      disabled,
      children,
      className,
      variant = "default",
      size = "default",
      ...props
    },
    ref
  ) => {
    return (
      <ToggleGroupContext.Provider
        value={{
          type,
          value: value || (type === "single" ? "" : []),
          onValueChange,
          disabled,
          variant,
          size,
        }}
      >
        <View
          ref={ref}
          className={cn(
            "flex-row items-center justify-center",
            Platform.OS === "ios" ? "gap-2" : "gap-1",
            className
          )}
          {...props}
        >
          {children}
        </View>
      </ToggleGroupContext.Provider>
    );
  }
);

ToggleGroup.displayName = "ToggleGroup";

const ToggleGroupItem = React.forwardRef<View, ToggleGroupItemProps>(
  ({ value, disabled, children, className, variant, size, ...props }, ref) => {
    const context = React.useContext(ToggleGroupContext);
    const isSelected =
      context.type === "single"
        ? context.value === value
        : (context.value as string[]).includes(value);

    const handlePress = () => {
      if (disabled || context.disabled) return;

      if (context.type === "single") {
        context.onValueChange?.(value);
      } else {
        const currentValue = context.value as string[];
        const newValue = currentValue.includes(value)
          ? currentValue.filter((v) => v !== value)
          : [...currentValue, value];
        context.onValueChange?.(newValue);
      }
    };

    const getSizeStyles = () => {
      const sizeToUse = context.size || size;
      switch (sizeToUse) {
        case "sm":
          return Platform.OS === "ios" ? "h-10 px-3" : "h-12 px-3";
        case "lg":
          return Platform.OS === "ios" ? "h-12 px-4" : "h-14 px-4";
        default:
          return Platform.OS === "ios" ? "h-11 px-3.5" : "h-13 px-3.5";
      }
    };

    const getVariantStyles = () => {
      const variantToUse = context.variant || variant;
      switch (variantToUse) {
        case "outline":
          return "border border-input bg-transparent";
        default:
          return "bg-transparent";
      }
    };

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        disabled={disabled || context.disabled}
        className={cn(
          "flex-row items-center justify-center rounded-lg",
          getSizeStyles(),
          getVariantStyles(),
          isSelected ? "bg-accent" : "bg-transparent",
          isSelected ? "text-accent-foreground" : "text-foreground",
          (disabled || context.disabled) && "opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </Pressable>
    );
  }
);

ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
