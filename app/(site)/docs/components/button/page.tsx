import { ComponentPreview } from "@/components/docs/component-preview";

export default function ButtonPage() {
  return (
    <ComponentPreview
      name="Button"
      description="A button component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Button } from \"@nativeui/ui\";\n\nexport default function ButtonDemo() {\n  return (\n    <Button>\n      Click me\n    </Button>\n  );\n}",
    "language": "tsx"
  },
  {
    "title": "Variants",
    "value": "variants",
    "content": "import { Button } from \"@nativeui/ui\";\n\nexport default function ButtonVariants() {\n  return (\n    <div className=\"flex flex-col gap-4\">\n      <Button variant=\"default\">Default</Button>\n      <Button variant=\"destructive\">Destructive</Button>\n      <Button variant=\"outline\">Outline</Button>\n      <Button variant=\"secondary\">Secondary</Button>\n      <Button variant=\"ghost\">Ghost</Button>\n      <Button variant=\"link\">Link</Button>\n    </div>\n  );\n}",
    "language": "tsx"
  },
  {
    "title": "Sizes",
    "value": "sizes",
    "content": "import { Button } from \"@components/ui\";\n\nexport default function ButtonSizes() {\n  return (\n    <div className=\"flex items-center gap-4\">\n      <Button size=\"default\">Default</Button>\n      <Button size=\"sm\">Sm</Button>\n      <Button size=\"lg\">Lg</Button>\n      <Button size=\"icon\">👋</Button>\n    </div>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import * as React from "react";
import {
  Pressable,
  PressableProps as RNPressableProps,
  View,
  ViewStyle,
  PressableStateCallbackType,
} from "react-native";
import { cn } from "@/lib/utils";

import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "flex-row items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground shadow",
        destructive:
          "bg-destructive text-destructive-foreground dark:bg-destructive dark:text-destructive-foreground shadow-sm",
        outline:
          "border border-input bg-background text-foreground dark:border-input dark:bg-background dark:text-foreground shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground dark:bg-secondary dark:text-secondary-foreground shadow-sm",
        ghost: "text-foreground dark:text-foreground",
        link: "text-primary dark:text-primary underline",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-10 px-4",
        lg: "h-14 px-8",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends Omit<RNPressableProps, "style">,
  VariantProps<typeof buttonVariants> {
  className?: string;
  style?: ViewStyle;
  asChild?: boolean;
}

const Button = React.forwardRef<View, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    return (
      <Pressable
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {(state: PressableStateCallbackType) => (
          <View
            className={\`flex-row items-center justify-center gap-2 \${state.pressed ? "opacity-80" : ""
              }\`}
          >
            {typeof children === "function" ? children(state) : children}
          </View>
        )}
      </Pressable>
    );
  }
);

Button.displayName = "Button";

export { Button };
`}
      previewCode={`import { Button } from "@/components/ui/button";
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
`}
      registryName="button"
      packageName="@nativeui/ui"
      dependencies={["react-native","class-variance-authority"]}
      changelog={[]}
    />
  );
}
