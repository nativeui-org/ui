# Badge

A badge component for React Native applications.

## Installation

```bash
npx @nativeui/cli add badge
```

## Manual Installation

```tsx
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
```

## Dependencies

### Package Dependencies

```bash
npm install react-native class-variance-authority
```

## Usage

```tsx
import { Badge } from "@/components/ui/badge";
import React from "react";

export default function BadgeExample() {

    return (
        <Badge variant="default" size="default">
            Default
        </Badge>
    );
}

```

## Preview

```tsx
import { Badge } from "@/components/ui/badge";
import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BadgeExample() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <ScrollView className="px-5 py-5">
                    <View className="mb-6">
                        <Text className="text-2xl font-bold mb-2 text-foreground">
                            Badge
                        </Text>
                        <Text className="text-base mb-4 text-muted-foreground">
                            Displays a status or notification count in a compact format
                        </Text>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Badge Variants
                        </Text>
                        <View className="flex-row flex-wrap gap-4">
                            <Badge variant="default">Default</Badge>
                            <Badge variant="secondary">Secondary</Badge>
                            <Badge variant="destructive">Destructive</Badge>
                            <Badge variant="outline">Outline</Badge>
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Badge Sizes
                        </Text>
                        <View className="flex-row items-center gap-4">
                            <Badge variant="default" size="sm">
                                Small
                            </Badge>
                            <Badge variant="default" size="default">
                                Default
                            </Badge>
                            <Badge variant="default" size="lg">
                                Large
                            </Badge>
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            With Icons
                        </Text>
                        <View className="flex-row items-center gap-4">
                            <Badge variant="default" size="default">
                                <View className="flex-row items-center">
                                    <Feather
                                        name="check"
                                        size={14}
                                        className="color-primary mr-4"
                                    />
                                    <Text className="text-xs font-medium text-primary-foreground">
                                        Verified
                                    </Text>
                                </View>
                            </Badge>
                            <Badge variant="default" size="default">
                                <View className="flex-row items-center">
                                    <Text className="text-xs font-medium text-primary-foreground">
                                        Delete
                                    </Text>
                                    <Feather
                                        name="x"
                                        size={14}
                                        onPress={() => Alert.alert("Badge Clicked", "You clicked the delete badge")}
                                        color={isDark ? "#171717" : "white"}
                                        style={{ marginLeft: 4 }}
                                    />
                                </View>
                            </Badge>
                            <Badge variant="secondary" size="default">
                                <View className="flex-row items-center">
                                    <Feather
                                        name="star"
                                        size={14}
                                        color={isDark ? "white" : "#171717"}
                                        style={{ marginRight: 4 }}
                                    />
                                    <Text className="text-xs font-medium text-secondary-foreground">
                                        Featured
                                    </Text>
                                </View>
                            </Badge>
                            <Badge variant="destructive" size="default">
                                <View className="flex-row items-center">
                                    <Feather
                                        name="alert-circle"
                                        size={14}
                                        color={isDark ? "white" : "#171717"}
                                        style={{ marginRight: 4 }}
                                    />
                                    <Text className="text-xs font-medium text-destructive-foreground">
                                        Alert
                                    </Text>
                                </View>
                            </Badge>
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Interactive Badges
                        </Text>
                        <View className="flex-row flex-wrap gap-4">
                            <Badge
                                variant="default"
                                onPress={() =>
                                    Alert.alert("Badge Clicked", "You clicked the default badge")
                                }
                            >
                                Click me
                            </Badge>
                            <Badge
                                variant="secondary"
                                onPress={() =>
                                    Alert.alert(
                                        "Badge Clicked",
                                        "You clicked the secondary badge"
                                    )
                                }
                            >
                                Tap here
                            </Badge>
                            <Badge
                                variant="destructive"
                                onPress={() =>
                                    Alert.alert(
                                        "Badge Clicked",
                                        "You clicked the destructive badge"
                                    )
                                }
                            >
                                Delete
                            </Badge>
                            <Badge
                                variant="outline"
                                onPress={() =>
                                    Alert.alert("Badge Clicked", "You clicked the outline badge")
                                }
                            >
                                More info
                            </Badge>
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Notification Badges
                        </Text>
                        <View className="flex-row items-center gap-8">
                            <View className="items-center">
                                <Badge variant="destructive" className="h-5 w-5 mb-2">
                                    3
                                </Badge>
                                <Text className="text-sm text-muted-foreground">Messages</Text>
                            </View>
                            <View className="items-center">
                                <Badge variant="default" className="h-5 w-5 mb-2">
                                    12
                                </Badge>
                                <Text className="text-sm text-muted-foreground">
                                    Notifications
                                </Text>
                            </View>
                            <View className="items-center">
                                <Badge variant="secondary" className="h-5 w-5 mb-2">
                                    5+
                                </Badge>
                                <Text className="text-sm text-muted-foreground">Updates</Text>
                            </View>
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Status Badges
                        </Text>
                        <View className="gap-4">
                            <View className="flex-row items-center">
                                <Badge className="bg-green-500 text-white mr-2">Online</Badge>
                                <Text className="text-foreground">User is available</Text>
                            </View>
                            <View className="flex-row items-center">
                                <Badge className="bg-yellow-500 text-white mr-2">Away</Badge>
                                <Text className="text-foreground">User is inactive</Text>
                            </View>
                            <View className="flex-row items-center">
                                <Badge className="bg-gray-400 text-white mr-2">Offline</Badge>
                                <Text className="text-foreground">User is disconnected</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

```

## API Reference

### Props

The Badge component accepts all standard HTML attributes plus:

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
