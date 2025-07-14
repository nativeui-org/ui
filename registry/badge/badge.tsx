import * as React from "react";
import { View, Text, Pressable, ViewStyle } from "react-native";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "flex-row items-center justify-center rounded-full px-2.5 py-1",
  {
    variants: {
      variant: {
        default: "bg-primary",
        secondary: "bg-secondary",
        destructive: "bg-destructive",
        outline: "border border-input bg-transparent",
      },
      size: {
        default: "h-8 px-3",
        sm: "h-6 px-2.5",
        lg: "h-10 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends VariantProps<typeof badgeVariants> {
  className?: string;
  style?: ViewStyle;
  children: React.ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
}

function Badge({
  className,
  variant,
  size,
  style,
  children,
  onPress,
  accessibilityLabel,
}: BadgeProps) {
  const getTextStyle = () => {
    let textStyle = "font-medium";

    // Adjust text size based on badge size
    if (size === "lg") {
      textStyle = cn(textStyle, "text-sm");
    } else if (size === "sm") {
      textStyle = cn(textStyle, "text-xs");
    } else {
      textStyle = cn(textStyle, "text-xs");
    }

    // Adjust text color based on variant
    if (variant === "default") {
      textStyle = cn(textStyle, "text-primary-foreground");
    } else if (variant === "secondary") {
      textStyle = cn(textStyle, "text-secondary-foreground");
    } else if (variant === "destructive") {
      textStyle = cn(textStyle, "text-destructive-foreground");
    } else if (variant === "outline") {
      textStyle = cn(textStyle, "text-foreground");
    }

    return textStyle;
  };

  const content = (
    <View className={cn(badgeVariants({ variant, size, className }))} style={style}>
      {typeof children === 'string' ? (
        <Text
          className={getTextStyle()}
          numberOfLines={1}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || (typeof children === 'string' ? children : undefined)}
      >
        {({ pressed }) => (
          <View style={{ opacity: pressed ? 0.7 : 1 }}>
            {content}
          </View>
        )}
      </Pressable>
    );
  }

  return content;
}

Badge.displayName = "Badge";

export { Badge, badgeVariants }; 