import { ComponentPreview } from "@/components/docs/component-preview";

export default function ProgressPage() {
  return (
    <ComponentPreview
      name="Progress"
      description="A progress component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Progress } from \"@nativeui/ui\";\n\nexport default function ProgressDemo() {\n  return (\n    <Progress>\n      Click me\n    </Progress>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import * as React from "react";
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
`}
      previewCode={`import { Progress } from "@nativeui/ui";

export default function ProgressDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Progress>Default Progress</Progress>
      <Progress variant="destructive">Delete</Progress>
      <Progress variant="outline">Outline</Progress>
      <Progress variant="secondary">Secondary</Progress>
      <Progress variant="ghost">Ghost</Progress>
      <Progress variant="link">Link</Progress>
    </div>
  );
}`}
      registryName="progress"
      packageName="@nativeui/ui"
    />
  );
}
