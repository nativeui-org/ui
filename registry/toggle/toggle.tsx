import * as React from "react";
import { Pressable, Platform, View } from "react-native";
import { cn } from "@/lib/utils";

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
          return "border border-input bg-transparent";
        default:
          return "bg-transparent";
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
          isPressed ? "bg-accent" : "bg-transparent",
          isPressed ? "text-accent-foreground" : "text-foreground",
          disabled && "opacity-50",
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
