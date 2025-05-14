import * as React from "react";
import { View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { cn } from "@/lib/utils";

const Pagination = ({
  className,
  ...props
}: React.ComponentProps<typeof View>) => (
  <View
    accessibilityRole="none"
    accessibilityLabel="pagination"
    className={cn("w-full justify-center items-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  View,
  React.ComponentProps<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("flex-row items-center justify-center gap-2", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  View,
  React.ComponentProps<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
  onPress?: () => void;
  disabled?: boolean;
} & React.ComponentProps<typeof Pressable>;

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  onPress,
  disabled = false,
  children,
  ...props
}: PaginationLinkProps) => {
  // Different size variants for better touch targets on mobile
  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "h-8 min-w-8 px-2";
      case "lg":
        return "h-12 min-w-12 px-3";
      case "icon":
        return "h-10 w-10";
      default:
        return "h-10 min-w-10 px-2.5";
    }
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{
        selected: isActive,
        disabled: disabled,
      }}
      className={cn(
        "items-center justify-center rounded-md",
        getSizeStyles(),
        isActive
          ? "bg-primary text-primary-foreground"
          : "bg-background text-foreground",
        isActive && "font-medium",
        disabled && "opacity-50",
        className
      )}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      {...props}
    >
      {children}
    </Pressable>
  );
};
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink size="default" className={cn("gap-1", className)} {...props}>
    <View className="flex-row items-center">
      <Feather name="chevron-left" size={16} className="text-foreground" />
      <Text className="ml-0.5 text-sm text-foreground">Prev</Text>
    </View>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink size="default" className={cn("gap-1", className)} {...props}>
    <View className="flex-row items-center">
      <Text className="mr-0.5 text-sm text-foreground">Next</Text>
      <Feather name="chevron-right" size={16} className="text-foreground" />
    </View>
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<typeof View>) => (
  <View
    className={cn("flex h-10 w-10 items-center justify-center", className)}
    {...props}
  >
    <Feather name="more-horizontal" size={16} className="text-foreground" />
    <Text className="sr-only">More pages</Text>
  </View>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
