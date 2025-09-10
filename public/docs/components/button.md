# Button

A button component for React Native applications.

## Installation

```bash
npx @nativeui/cli add button
```

## Manual Installation

```tsx
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import {
  Pressable,
  type PressableStateCallbackType,
  type PressableProps as RNPressableProps,
  View,
  type ViewStyle,
} from "react-native";

export const buttonVariants = cva(
	"flex-row items-center justify-center rounded-lg",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground shadow-sm",
				destructive: "bg-destructive text-destructive-foreground shadow-sm",
				outline: "border-2 border-border bg-background text-foreground",
				secondary: "bg-secondary text-secondary-foreground shadow-sm",
				ghost: "text-foreground",
				link: "text-primary underline",
				selection: "border-2 border-border bg-background",
			},
			size: {
				default: "h-12 px-4",
				sm: "h-10 px-3",
				lg: "h-14 px-6",
				icon: "h-12 w-12",
			},
			selected: {
				true: "",
				false: "",
			},
		},
		compoundVariants: [
			{
				variant: "selection",
				selected: true,
				className: "border-primary bg-primary/5",
			},
			{
				variant: "outline",
				selected: true,
				className: "border-primary ring-1 ring-primary/20",
			},
		],
		defaultVariants: {
			variant: "default",
			size: "default",
			selected: false,
		},
	},
);

export interface ButtonProps
	extends Omit<RNPressableProps, "style">,
		VariantProps<typeof buttonVariants> {
	className?: string;
	style?: ViewStyle;
	asChild?: boolean;
	selected?: boolean;
}

const Button = React.forwardRef<View, ButtonProps>(
	(
		{ className, variant, size, selected, asChild = false, children, ...props },
		ref,
	) => {
		const [isPressed, setIsPressed] = React.useState(false);

		return (
			<Pressable
				className={cn(buttonVariants({ variant, size, selected, className }))}
				ref={ref}
				onPressIn={() => setIsPressed(true)}
				onPressOut={() => setIsPressed(false)}
				{...props}
			>
				{(state: PressableStateCallbackType) => (
					<View
						className={`flex-row items-center justify-center gap-2 ${
							state.pressed || isPressed ? "opacity-80" : ""
						}`}
					>
						{typeof children === "function" ? children(state) : children}
					</View>
				)}
			</Pressable>
		);
	},
);

Button.displayName = "Button";

export { Button };

```

## Dependencies

### Package Dependencies

```bash
npm install react-native class-variance-authority
```

## Usage

```tsx
import { Text, View } from "react-native";
import { Button } from "@/components/ui/button";

export default function ButtonScreen() {
  return (
    <View>
      <Button
        onPress={() => console.log("pressed!")}
      >
        <Text className="text-secondary-foreground dark:text-secondary-foreground">Press me</Text>
      </Button>
    </View>
  );
}

```

## Preview

```tsx
import { Button } from "@/components/ui/button";
import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ButtonScreen() {
  const [counter, setCounter] = useState(0);

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <>
      <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
        <ScrollView className="px-5 py-5">
          <View className="mb-6">
            <Text className="text-2xl font-bold mb-2 text-foreground">
              Button
            </Text>
            <Text className="text-base mb-4 text-muted-foreground">
              A flexible button component with different variants and sizes
            </Text>
            <Text className="text-base mb-4 text-foreground">
              Current mode: {isDark ? 'dark' : 'light'}
            </Text>
          </View>

          <Text className="text-base font-semibold text-foreground">
            Counter: {counter}
          </Text>

          <View className="mb-6 mt-6">
            <Text className="text-xl font-semibold mb-4 text-foreground">
              Button Variants
            </Text>

            <View className="gap-4">
              <View className="flex-row gap-3 flex-wrap">
                <Button
                  variant="default"
                  onPress={() => setCounter(counter + 1)}
                >
                  <Text className="text-primary-foreground dark:text-primary-foreground">Default</Text>
                </Button>

                <Button
                  variant="destructive"
                  onPress={() => setCounter(counter + 1)}
                >
                  <Text className="text-destructive-foreground dark:text-destructive-foreground">
                    Destructive
                  </Text>
                </Button>

                <Button
                  variant="outline"
                  onPress={() => setCounter(counter + 1)}
                >
                  <Text className="text-foreground dark:text-foreground">Outline</Text>
                </Button>
              </View>

              <View className="flex-row gap-3 flex-wrap">
                <Button
                  variant="secondary"
                  onPress={() => setCounter(counter + 1)}
                >
                  <Text className="text-secondary-foreground dark:text-secondary-foreground">Secondary</Text>
                </Button>

                <Button variant="ghost" onPress={() => setCounter(counter + 1)}>
                  <Text className="text-foreground dark:text-foreground">Ghost</Text>
                </Button>

                <Button variant="link" onPress={() => setCounter(counter + 1)}>
                  <Text className="text-primary dark:text-primary">Link</Text>
                </Button>
              </View>
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-xl font-semibold mb-4 text-foreground">
              Button Sizes
            </Text>

            <View className="gap-4">
              <View className="flex-row gap-3 items-center flex-wrap">
                <Button size="sm" onPress={() => setCounter(counter + 1)}>
                  <Text className="text-primary-foreground dark:text-primary-foreground">Small</Text>
                </Button>

                <Button size="default" onPress={() => setCounter(counter + 1)}>
                  <Text className="text-primary-foreground dark:text-primary-foreground">Default</Text>
                </Button>

                <Button size="lg" onPress={() => setCounter(counter + 1)}>
                  <Text className="text-primary-foreground dark:text-primary-foreground">Large</Text>
                </Button>

                <Button
                  size="icon"
                  onPress={() => setCounter(counter + 1)}
                >
                  <Feather name="plus" size={16} />
                </Button>
              </View>
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-xl font-semibold mb-4 text-foreground">
              Button States
            </Text>

            <View className="gap-4">
              <View className="flex-row gap-3 flex-wrap">
                <Button disabled onPress={() => setCounter(counter + 1)}>
                  <Text className="text-primary-foreground dark:text-primary-foreground">Disabled</Text>
                </Button>
                <Button onPress={() => setCounter(counter + 1)}>
                  <ActivityIndicator size="small" color={isDark ? "#111827" : "white"} />
                  <Text className="text-primary-foreground dark:text-primary-foreground ml-2">Loading</Text>
                </Button>
              </View>
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-xl font-semibold mb-4 text-foreground">
              Button with Icon
            </Text>

            <View className="gap-4">
              <View className="flex-row gap-3 flex-wrap">
                <Button onPress={() => setCounter(counter + 1)}>
                  <Feather name="plus" size={16} color={isDark ? "#111827" : "white"} />
                  <Text className="text-primary-foreground dark:text-primary-foreground ml-2">
                    With Icon
                  </Text>
                </Button>

                <Button
                  variant="outline"
                  onPress={() => setCounter(counter + 1)}
                >
                  <Feather name="settings" size={16} color={isDark ? "white" : "#111827"} />
                  <Text className="text-foreground dark:text-foreground ml-2">Settings</Text>
                </Button>
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

The Button component accepts all standard HTML attributes plus:

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
