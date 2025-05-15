import * as React from "react";
import { View, Text, Pressable, GestureResponderEvent } from "react-native";
import { Feather } from "@expo/vector-icons";
import { cn } from "@/lib/utils";

const Breadcrumb = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    separator?: React.ReactNode;
  }
>(({ style, separator, ...props }, ref) => (
  <View
    ref={ref}
    accessibilityRole="header"
    accessibilityLabel="breadcrumb"
    style={style}
    {...props}
  />
));

Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, style, ...props }, ref) => (
  <View
    ref={ref}
    style={style}
    className={cn("flex-row flex-wrap items-center gap-2 md:gap-3", className)}
    {...props}
  />
));

BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, style, ...props }, ref) => (
  <View
    ref={ref}
    style={style}
    className={cn("flex-row items-center gap-2", className)}
    {...props}
  />
));

BreadcrumbItem.displayName = "BreadcrumbItem";

interface BreadcrumbLinkProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  asChild?: boolean;
  href?: string;
  active?: boolean;
}

const BreadcrumbLink = React.forwardRef<View, BreadcrumbLinkProps>(
  (
    { asChild, className, style, href, active, onPress, children, ...props },
    ref
  ) => {
    const handlePress = (e: GestureResponderEvent) => {
      if (href) {
        console.log(`Navigation to: ${href}`);
      }
      if (onPress) {
        onPress(e);
      }
    };

    return (
      <Pressable
        ref={ref}
        style={style}
        className={cn(
          "py-2 active:opacity-70",
          active ? "text-foreground font-medium" : "text-muted-foreground",
          className
        )}
        onPress={handlePress}
        {...props}
      >
        {typeof children === "string" ? (
          <Text
            className={cn(
              active ? "text-foreground font-medium" : "text-muted-foreground",
              "text-base"
            )}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </Pressable>
    );
  }
);

BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, style, ...props }, ref) => (
  <Text
    ref={ref}
    style={style}
    accessibilityRole="text"
    accessibilityState={{ disabled: true }}
    className={cn("font-medium text-foreground text-base", className)}
    {...props}
  />
));

BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({
  children,
  className,
  style,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
  <View
    accessibilityRole="none"
    accessibilityLabel="separator"
    style={style}
    className={cn("mx-0.5", className)}
    {...props}
  >
    {children ?? <Feather name="chevron-right" size={20} color="#888" />}
  </View>
);

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({
  className,
  style,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
  <View
    accessibilityRole="none"
    accessibilityLabel="more"
    style={style}
    className={cn("flex items-center justify-center py-1", className)}
    {...props}
  >
    <Feather name="more-horizontal" size={20} color="#888" />
    <Text className="sr-only">More</Text>
  </View>
);

BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
