import * as React from "react";
import { View, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva("w-full rounded-xl border p-4 mb-4", {
  variants: {
    variant: {
      default: "bg-background border-input",
      destructive:
        "border-destructive/50 bg-destructive/10 text-destructive dark:border-destructive",
      success:
        "border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-500 dark:border-green-500",
      warning:
        "border-yellow-500/50 bg-yellow-500/10 text-yellow-700 dark:text-yellow-500 dark:border-yellow-500",
      info: "border-blue-500/50 bg-blue-500/10 text-blue-700 dark:text-blue-500 dark:border-blue-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface AlertProps
  extends React.ComponentPropsWithoutRef<typeof View>,
  VariantProps<typeof alertVariants> {
  icon?: React.ReactNode;
}

function Alert({ className, variant, icon, children, ...props }: AlertProps) {
  return (
    <View
      className={cn(alertVariants({ variant }), className)}
      accessibilityRole="alert"
      {...props}
    >
      {icon && <View className="mb-2">{icon}</View>}
      <View className={cn(icon ? "pl-0" : "pl-0")}>{children}</View>
    </View>
  );
}

interface AlertTitleProps extends React.ComponentPropsWithoutRef<typeof Text> { }

function AlertTitle({ className, ...props }: AlertTitleProps) {
  return (
    <Text
      className={cn(
        "text-lg font-semibold leading-none tracking-tight text-foreground mb-2",
        className
      )}
      {...props}
    />
  );
}

interface AlertDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof Text> { }

function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return (
    <Text
      className={cn("text-base text-foreground opacity-90", className)}
      {...props}
    />
  );
}

export {
  Alert,
  AlertTitle,
  AlertDescription,
  type AlertProps,
  type AlertTitleProps,
  type AlertDescriptionProps,
};
