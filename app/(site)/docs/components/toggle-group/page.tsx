import { ComponentPreview } from "@/components/docs/component-preview";

export default function ToggleGroupPage() {
  return (
    <ComponentPreview
      name="ToggleGroup"
      description="A toggle-group component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { ToggleGroup } from \"@nativeui/ui\";\n\nexport default function ToggleGroupDemo() {\n  return (\n    <ToggleGroup>\n      Click me\n    </ToggleGroup>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import * as React from "react";
import { View, Pressable, Platform } from "react-native";
import { cn } from "@/lib/utils";

interface ToggleGroupProps {
  type?: "single" | "multiple";
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

interface ToggleGroupItemProps {
  value: string;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

const ToggleGroupContext = React.createContext<{
  type: "single" | "multiple";
  value: string | string[];
  onValueChange?: (value: string | string[]) => void;
  disabled?: boolean;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}>({
  type: "single",
  value: "",
});

const ToggleGroup = React.forwardRef<View, ToggleGroupProps>(
  (
    {
      type = "single",
      value,
      onValueChange,
      disabled,
      children,
      className,
      variant = "default",
      size = "default",
      ...props
    },
    ref
  ) => {
    return (
      <ToggleGroupContext.Provider
        value={{
          type,
          value: value || (type === "single" ? "" : []),
          onValueChange,
          disabled,
          variant,
          size,
        }}
      >
        <View
          ref={ref}
          className={cn(
            "flex-row items-center justify-center",
            Platform.OS === "ios" ? "gap-2" : "gap-1",
            className
          )}
          {...props}
        >
          {children}
        </View>
      </ToggleGroupContext.Provider>
    );
  }
);

ToggleGroup.displayName = "ToggleGroup";

const ToggleGroupItem = React.forwardRef<View, ToggleGroupItemProps>(
  ({ value, disabled, children, className, variant, size, ...props }, ref) => {
    const context = React.useContext(ToggleGroupContext);
    const isSelected =
      context.type === "single"
        ? context.value === value
        : (context.value as string[]).includes(value);

    const handlePress = () => {
      if (disabled || context.disabled) return;

      if (context.type === "single") {
        context.onValueChange?.(value);
      } else {
        const currentValue = context.value as string[];
        const newValue = currentValue.includes(value)
          ? currentValue.filter((v) => v !== value)
          : [...currentValue, value];
        context.onValueChange?.(newValue);
      }
    };

    const getSizeStyles = () => {
      const sizeToUse = context.size || size;
      switch (sizeToUse) {
        case "sm":
          return Platform.OS === "ios" ? "h-10 px-3" : "h-12 px-3";
        case "lg":
          return Platform.OS === "ios" ? "h-12 px-4" : "h-14 px-4";
        default:
          return Platform.OS === "ios" ? "h-11 px-3.5" : "h-13 px-3.5";
      }
    };

    const getVariantStyles = () => {
      const variantToUse = context.variant || variant;
      switch (variantToUse) {
        case "outline":
          return "border border-input bg-transparent";
        default:
          return "bg-transparent";
      }
    };

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        disabled={disabled || context.disabled}
        className={cn(
          "flex-row items-center justify-center rounded-lg",
          getSizeStyles(),
          getVariantStyles(),
          isSelected ? "bg-accent" : "bg-transparent",
          isSelected ? "text-accent-foreground" : "text-foreground",
          (disabled || context.disabled) && "opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </Pressable>
    );
  }
);

ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
`}
      previewCode={`import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ToggleGroupExampleScreen() {
    // Single selection examples
    const [singleValue, setSingleValue] = React.useState<string>("center");
    const [outlineSingleValue, setOutlineSingleValue] = React.useState<string>("center");

    // Multiple selection examples
    const [multipleValue, setMultipleValue] = React.useState<string[]>([]);
    const [outlineMultipleValue, setOutlineMultipleValue] = React.useState<string[]>([]);

    // Size examples
    const [smallValue, setSmallValue] = React.useState<string>("center");
    const [defaultValue, setDefaultValue] = React.useState<string>("center");
    const [largeValue, setLargeValue] = React.useState<string>("center");

    const handleSingleValueChange = React.useCallback((value: string | string[]) => {
        if (typeof value === "string") {
            setSingleValue(value);
        }
    }, []);

    const handleOutlineSingleValueChange = React.useCallback((value: string | string[]) => {
        if (typeof value === "string") {
            setOutlineSingleValue(value);
        }
    }, []);

    const handleMultipleValueChange = React.useCallback((value: string | string[]) => {
        if (Array.isArray(value)) {
            setMultipleValue(value);
        }
    }, []);

    const handleOutlineMultipleValueChange = React.useCallback((value: string | string[]) => {
        if (Array.isArray(value)) {
            setOutlineMultipleValue(value);
        }
    }, []);

    const handleSmallValueChange = React.useCallback((value: string | string[]) => {
        if (typeof value === "string") {
            setSmallValue(value);
        }
    }, []);

    const handleDefaultValueChange = React.useCallback((value: string | string[]) => {
        if (typeof value === "string") {
            setDefaultValue(value);
        }
    }, []);

    const handleLargeValueChange = React.useCallback((value: string | string[]) => {
        if (typeof value === "string") {
            setLargeValue(value);
        }
    }, []);

    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <ScrollView className="p-4">
                    <View className="mb-6">
                        <Text className="text-2xl font-bold mb-2 text-foreground">
                            Toggle Group
                        </Text>
                        <Text className="text-foreground mb-6 text-muted-foreground">
                            A set of two-state buttons that can be toggled on or off.
                        </Text>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Single Selection
                        </Text>
                        <ToggleGroup
                            type="single"
                            value={singleValue}
                            onValueChange={handleSingleValueChange}
                            className="flex-wrap"
                        >
                            <ToggleGroupItem value="left">
                                <Text className="text-foreground font-medium">Left</Text>
                            </ToggleGroupItem>
                            <ToggleGroupItem value="center">
                                <Text className="text-foreground font-medium">Center</Text>
                            </ToggleGroupItem>
                            <ToggleGroupItem value="right">
                                <Text className="text-foreground font-medium">Right</Text>
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Multiple Selection
                        </Text>
                        <ToggleGroup
                            type="multiple"
                            value={multipleValue}
                            onValueChange={handleMultipleValueChange}
                            className="flex-wrap"
                        >
                            <ToggleGroupItem value="bold">
                                <Text className="text-foreground font-medium">Bold</Text>
                            </ToggleGroupItem>
                            <ToggleGroupItem value="italic">
                                <Text className="text-foreground font-medium">Italic</Text>
                            </ToggleGroupItem>
                            <ToggleGroupItem value="underline">
                                <Text className="text-foreground font-medium">Underline</Text>
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Outline Variant
                        </Text>
                        <View className="space-y-4">
                            <ToggleGroup
                                type="single"
                                variant="outline"
                                value={outlineSingleValue}
                                onValueChange={handleOutlineSingleValueChange}
                                className="flex-wrap"
                            >
                                <ToggleGroupItem value="left">
                                    <Text className="text-foreground font-medium">Left</Text>
                                </ToggleGroupItem>
                                <ToggleGroupItem value="center">
                                    <Text className="text-foreground font-medium">Center</Text>
                                </ToggleGroupItem>
                                <ToggleGroupItem value="right">
                                    <Text className="text-foreground font-medium">Right</Text>
                                </ToggleGroupItem>
                            </ToggleGroup>

                            <ToggleGroup
                                type="multiple"
                                variant="outline"
                                value={outlineMultipleValue}
                                onValueChange={handleOutlineMultipleValueChange}
                                className="flex-wrap"
                            >
                                <ToggleGroupItem value="bold">
                                    <Text className="text-foreground font-medium">Bold</Text>
                                </ToggleGroupItem>
                                <ToggleGroupItem value="italic">
                                    <Text className="text-foreground font-medium">Italic</Text>
                                </ToggleGroupItem>
                                <ToggleGroupItem value="underline">
                                    <Text className="text-foreground font-medium">Underline</Text>
                                </ToggleGroupItem>
                            </ToggleGroup>
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Different Sizes
                        </Text>
                        <View className="space-y-4">
                            <ToggleGroup
                                type="single"
                                size="sm"
                                value={smallValue}
                                onValueChange={handleSmallValueChange}
                                className="flex-wrap"
                            >
                                <ToggleGroupItem value="left">
                                    <Text className="text-foreground text-sm font-medium">Left</Text>
                                </ToggleGroupItem>
                                <ToggleGroupItem value="center">
                                    <Text className="text-foreground text-sm font-medium">Center</Text>
                                </ToggleGroupItem>
                                <ToggleGroupItem value="right">
                                    <Text className="text-foreground text-sm font-medium">Right</Text>
                                </ToggleGroupItem>
                            </ToggleGroup>

                            <ToggleGroup
                                type="single"
                                size="default"
                                value={defaultValue}
                                onValueChange={handleDefaultValueChange}
                                className="flex-wrap"
                            >
                                <ToggleGroupItem value="left">
                                    <Text className="text-foreground font-medium">Left</Text>
                                </ToggleGroupItem>
                                <ToggleGroupItem value="center">
                                    <Text className="text-foreground font-medium">Center</Text>
                                </ToggleGroupItem>
                                <ToggleGroupItem value="right">
                                    <Text className="text-foreground font-medium">Right</Text>
                                </ToggleGroupItem>
                            </ToggleGroup>

                            <ToggleGroup
                                type="single"
                                size="lg"
                                value={largeValue}
                                onValueChange={handleLargeValueChange}
                                className="flex-wrap"
                            >
                                <ToggleGroupItem value="left">
                                    <Text className="text-foreground text-lg font-medium">Left</Text>
                                </ToggleGroupItem>
                                <ToggleGroupItem value="center">
                                    <Text className="text-foreground text-lg font-medium">Center</Text>
                                </ToggleGroupItem>
                                <ToggleGroupItem value="right">
                                    <Text className="text-foreground text-lg font-medium">Right</Text>
                                </ToggleGroupItem>
                            </ToggleGroup>
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            With Icons
                        </Text>
                        <ToggleGroup
                            type="multiple"
                            value={multipleValue}
                            onValueChange={handleMultipleValueChange}
                            className="flex-wrap"
                        >
                            <ToggleGroupItem value="bold" className="gap-2">
                                <Text className="text-foreground">🔤</Text>
                                <Text className="text-foreground font-medium">Bold</Text>
                            </ToggleGroupItem>
                            <ToggleGroupItem value="italic" className="gap-2">
                                <Text className="text-foreground">📝</Text>
                                <Text className="text-foreground font-medium">Italic</Text>
                            </ToggleGroupItem>
                            <ToggleGroupItem value="underline" className="gap-2">
                                <Text className="text-foreground">📏</Text>
                                <Text className="text-foreground font-medium">Underline</Text>
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Disabled State
                        </Text>
                        <ToggleGroup
                            type="single"
                            value={singleValue}
                            onValueChange={handleSingleValueChange}
                            disabled
                            className="flex-wrap"
                        >
                            <ToggleGroupItem value="left">
                                <Text className="text-foreground font-medium">Left</Text>
                            </ToggleGroupItem>
                            <ToggleGroupItem value="center">
                                <Text className="text-foreground font-medium">Center</Text>
                            </ToggleGroupItem>
                            <ToggleGroupItem value="right">
                                <Text className="text-foreground font-medium">Right</Text>
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
`}
      registryName="toggle-group"
      packageName="@nativeui/ui"
      dependencies={["react-native"]}
      changelog={[]}
    />
  );
}
