# Breadcrumb

A breadcrumb component for React Native applications.

## Installation

```bash
npx @nativeui/cli add breadcrumb
```

## Manual Installation

```tsx
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

```

## Dependencies

### Package Dependencies

```bash
npm install react-native @expo/vector-icons
```

## Usage

```tsx
import * as React from "react";
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BreadcrumbExample() {

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/home">
                        Home
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href="/components">
                        Components
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}

```

## Preview

```tsx
import * as React from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BreadcrumbExample() {
    // Simple custom navigation function that you could replace with your actual navigation logic
    const handleNavigation = (path: string) => {
        Alert.alert("Navigation", `Navigating to: ${path}`);
        // Your navigation code here, for example:
        // router.push(path);
    };

    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={100}
                >
                    <ScrollView className="p-4">
                        <View className="mb-6">
                            <Text className="text-2xl font-bold mb-2 text-foreground">
                                Breadcrumb
                            </Text>
                            <Text className="text-base mb-6 text-muted-foreground">
                                A breadcrumb navigation pattern to help users navigate hierarchical paths.
                            </Text>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Basic Breadcrumb
                            </Text>
                            <View className="px-1">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/home">
                                                Home
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/components">
                                                Components
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                With Custom Navigation
                            </Text>
                            <View className="px-1">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink
                                                href="/dashboard"
                                                onPress={() => handleNavigation("/dashboard")}
                                            >
                                                Dashboard
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink
                                                href="/settings"
                                                onPress={() => handleNavigation("/settings")}
                                            >
                                                Settings
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>Profile</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                With Ellipsis
                            </Text>
                            <View className="px-1">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/home">
                                                Home
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbEllipsis />
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/components/breadcrumb">
                                                Breadcrumb
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>Example</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Custom Separator
                            </Text>
                            <View className="px-1">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/dashboard">
                                                Dashboard
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator>
                                            <Text className="text-muted-foreground mx-1">/</Text>
                                        </BreadcrumbSeparator>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/settings">
                                                Settings
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator>
                                            <Text className="text-muted-foreground mx-1">/</Text>
                                        </BreadcrumbSeparator>
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>Profile</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Interactive Breadcrumb
                            </Text>
                            <View className="px-1">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink
                                                href="/shop"
                                                onPress={() => console.log("Shop pressed")}
                                            >
                                                Shop
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink
                                                href="/shop/clothing"
                                                onPress={() => console.log("Clothing pressed")}
                                            >
                                                Clothing
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink
                                                href="/shop/clothing/t-shirts"
                                                onPress={() => console.log("T-Shirts pressed")}
                                            >
                                                T-Shirts
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>Summer Collection</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Responsive Breadcrumb
                            </Text>
                            <View className="px-1">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem className="md:flex hidden">
                                            <BreadcrumbLink href="/app">
                                                App
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator className="md:flex hidden" />
                                        <BreadcrumbItem className="md:flex hidden">
                                            <BreadcrumbLink href="/app/projects">
                                                Projects
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator className="md:flex hidden" />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/app/projects/website">
                                                Website
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>Design</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Custom Styled Breadcrumb
                            </Text>
                            <View className="px-1 py-3 bg-muted rounded-lg">
                                <Breadcrumb>
                                    <BreadcrumbList className="gap-1">
                                        <BreadcrumbItem>
                                            <BreadcrumbLink
                                                className="bg-primary/10 px-3 py-1 rounded-md"
                                                href="/files"
                                            >
                                                Files
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink
                                                className="bg-primary/10 px-3 py-1 rounded-md"
                                                href="/files/documents"
                                            >
                                                Documents
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage className="bg-primary/20 px-3 py-1 rounded-md">
                                                Report.pdf
                                            </BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </View>
                        </View>

                        {/* Extra padding to ensure good scroll */}
                        <View className="h-20" />
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}

```

## API Reference

### Props

The Breadcrumb component accepts all standard HTML attributes plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | string | "default" | The visual style variant |
| size | string | "default" | The size of the component |

### Variants

- `default` - Standard appearance
- `outline` - Outlined style
- `ghost` - Minimal style

### Sizes

- `sm` - Small size
- `default` - Default size
- `lg` - Large size
