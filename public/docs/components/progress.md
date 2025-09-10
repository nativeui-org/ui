# Progress

A progress component for React Native applications.

## Installation

```bash
npx @nativeui/cli add progress
```

## Manual Installation

```tsx
import * as React from "react";
import { View, Animated, Easing } from "react-native";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value?: number;
  max?: number;
  className?: string;
  indicatorClassName?: string;
}

const Progress = React.forwardRef<View, ProgressProps>(
  ({ value = 0, max = 100, className, indicatorClassName, ...props }, ref) => {
    const animatedValue = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
      Animated.timing(animatedValue, {
        toValue: value,
        duration: 500,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    }, [value, animatedValue]);

    const width = animatedValue.interpolate({
      inputRange: [0, max],
      outputRange: ["0%", "100%"],
      extrapolate: "clamp",
    });

    return (
      <View
        ref={ref}
        className={cn(
          "relative h-3 w-full overflow-hidden rounded-full bg-primary/20",
          className
        )}
        {...props}
      >
        <Animated.View
          className={cn(
            "absolute left-0 top-0 h-full bg-primary",
            indicatorClassName
          )}
          style={{ width }}
        />
      </View>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };

```

## Dependencies

### Package Dependencies

```bash
npm install react-native
```

## Usage

```tsx
import { Progress } from "@/components/ui/progress";
import * as React from "react";

export default function ProgressExampleScreen() {

    return (
        <Progress value={50} className="w-[60%]" />
    );
}

```

## Preview

```tsx
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProgressExampleScreen() {
    const [demoProgress, setDemoProgress] = React.useState(13);

    const [autoCycleProgress, setAutoCycleProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setTimeout(() => setDemoProgress(66), 1500);
        return () => clearTimeout(timer);
    }, []);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setAutoCycleProgress((prev) => {
                if (prev >= 100) return 0;
                return prev + 20;
            });
        }, 2000);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <ScrollView className="p-4">
                    <View className="mb-6">
                        <Text className="text-2xl font-bold mb-2 text-foreground">
                            Progress
                        </Text>
                        <Text className="text-base mb-6 text-muted-foreground">
                            Displays an indicator showing the completion progress of a task.
                        </Text>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Demo Example
                        </Text>
                        <View className="space-y-4">
                            <Text className="text-sm text-muted-foreground">
                                Changes from 13% to 66% after 1.5 seconds
                            </Text>
                            <Progress value={demoProgress} className="w-[60%]" />
                            <Button
                                className="mt-4"
                                onPress={() => {
                                    setDemoProgress(13);
                                    setTimeout(() => setDemoProgress(66), 1500);
                                }}
                            >
                                <Text className="text-primary-foreground">Restart Demo</Text>
                            </Button>
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Auto-Cycling Progress
                        </Text>
                        <View className="space-y-2">
                            <Text className="text-sm text-muted-foreground">
                                {autoCycleProgress}%
                            </Text>
                            <Progress value={autoCycleProgress} />
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Basic Progress
                        </Text>
                        <View className="space-y-6">
                            <View className="space-y-2">
                                <Text className="text-sm text-muted-foreground">25%</Text>
                                <Progress value={25} />
                            </View>
                            <View className="space-y-2">
                                <Text className="text-sm text-muted-foreground">50%</Text>
                                <Progress value={50} />
                            </View>
                            <View className="space-y-2">
                                <Text className="text-sm text-muted-foreground">75%</Text>
                                <Progress value={75} />
                            </View>
                            <View className="space-y-2">
                                <Text className="text-sm text-muted-foreground">100%</Text>
                                <Progress value={100} />
                            </View>
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Different Sizes
                        </Text>
                        <View className="space-y-6">
                            <View className="space-y-2">
                                <Text className="text-sm text-muted-foreground">
                                    Small (h-2)
                                </Text>
                                <Progress value={50} className="h-2" />
                            </View>
                            <View className="space-y-2">
                                <Text className="text-sm text-muted-foreground">
                                    Medium (h-3) - Default
                                </Text>
                                <Progress value={50} />
                            </View>
                            <View className="space-y-2">
                                <Text className="text-sm text-muted-foreground">
                                    Large (h-4)
                                </Text>
                                <Progress value={50} className="h-4" />
                            </View>
                            <View className="space-y-2">
                                <Text className="text-sm text-muted-foreground">
                                    Extra Large (h-5)
                                </Text>
                                <Progress value={50} className="h-5" />
                            </View>
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Custom Colors
                        </Text>
                        <View className="space-y-6">
                            <View className="space-y-2">
                                <Text className="text-sm text-muted-foreground">Success</Text>
                                <Progress
                                    value={75}
                                    className="bg-green-200"
                                    indicatorClassName="bg-green-600"
                                />
                            </View>
                            <View className="space-y-2">
                                <Text className="text-sm text-muted-foreground">Warning</Text>
                                <Progress
                                    value={50}
                                    className="bg-yellow-200"
                                    indicatorClassName="bg-yellow-500"
                                />
                            </View>
                            <View className="space-y-2">
                                <Text className="text-sm text-muted-foreground">Error</Text>
                                <Progress
                                    value={25}
                                    className="bg-red-200"
                                    indicatorClassName="bg-red-600"
                                />
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

The Progress component accepts all standard HTML attributes plus:

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
