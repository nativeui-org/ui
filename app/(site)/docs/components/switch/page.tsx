import { ComponentPreview } from "@/components/docs/component-preview";

export default function SwitchPage() {
  return (
    <ComponentPreview
      name="Switch"
      description="A switch component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Switch } from \"@nativeui/ui\";\n\nexport default function SwitchDemo() {\n  return (\n    <Switch>\n      Click me\n    </Switch>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import * as React from "react"
import { TouchableOpacity, Animated } from "react-native"
import { cn } from "@/lib/utils"

interface SwitchProps extends Omit<React.ComponentPropsWithoutRef<typeof TouchableOpacity>, "onPress"> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
}

const Switch = React.forwardRef<
  React.ElementRef<typeof TouchableOpacity>,
  SwitchProps
>(({ className, checked, onCheckedChange, disabled, ...props }, ref) => {
  const [innerChecked, setInnerChecked] = React.useState(checked ?? false)
  const isChecked = checked !== undefined ? checked : innerChecked
  const [animatedValue] = React.useState(new Animated.Value(isChecked ? 1 : 0))

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isChecked ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start()
  }, [isChecked, animatedValue])

  const handlePress = React.useCallback(() => {
    if (disabled) return

    const newChecked = !isChecked

    if (checked === undefined) {
      setInnerChecked(newChecked)
    }

    onCheckedChange?.(newChecked)
  }, [isChecked, onCheckedChange, disabled, checked])

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 21]
  })

  return (
    <TouchableOpacity
      ref={ref}
      activeOpacity={0.8}
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ checked: isChecked, disabled }}
      data-state={isChecked ? "checked" : "unchecked"}
      className={cn(
        "relative h-7 w-12 rounded-full border-2 border-transparent overflow-hidden",
        isChecked
          ? "bg-primary"
          : "bg-gray-300 dark:bg-gray-600 border-border",
        disabled && "opacity-50",
        className
      )}
      {...props}
    >
      <Animated.View
        className="absolute h-5 w-5 rounded-full bg-background shadow-md"
        style={{
          transform: [{ translateX }],
          top: "50%",
          marginTop: -9,
        }}
      />
    </TouchableOpacity>
  )
})

Switch.displayName = "Switch"

export { Switch }
`}
      previewCode={`import { Switch } from "@/components/ui/switch";
import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SwitchExample() {
    const [notifications, setNotifications] = React.useState(true);
    const [wifi, setWifi] = React.useState(true);
    const [bluetooth, setBluetooth] = React.useState(false);
    const [blueSwitch, setBlueSwitch] = React.useState(false);

    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <ScrollView className="p-4">
                    <View className="mb-8">
                        <Text className="text-2xl font-bold mb-2 text-foreground">
                            Switch
                        </Text>
                        <Text className="text-base mb-6 text-muted-foreground">
                            A control that allows a user to toggle between checked and not checked.
                        </Text>
                    </View>

                    <View className="mb-10">
                        <Text className="text-xl font-semibold mb-5 text-foreground">
                            Default Switch
                        </Text>
                        <View className="flex-row items-center justify-between p-4 bg-card rounded-lg">
                            <Text className="text-foreground text-base">Enable feature</Text>
                            <Switch />
                        </View>
                    </View>

                    <View className="mb-10">
                        <Text className="text-xl font-semibold mb-5 text-foreground">
                            Settings List
                        </Text>
                        <View className="bg-card rounded-lg overflow-hidden">
                            {/* Connectivity Section */}
                            <View className="px-4 py-3 bg-muted/20">
                                <Text className="text-sm font-medium text-muted-foreground">CONNECTIVITY</Text>
                            </View>
                            <View className="p-4 space-y-6 border-b border-border">
                                <View className="flex-row items-center justify-between">
                                    <Text className="text-foreground text-base">Wi-Fi</Text>
                                    <Switch
                                        checked={wifi}
                                        onCheckedChange={setWifi}
                                    />
                                </View>

                                <View className="flex-row items-center justify-between mt-2">
                                    <Text className="text-foreground text-base">Bluetooth</Text>
                                    <Switch
                                        checked={bluetooth}
                                        onCheckedChange={setBluetooth}
                                    />
                                </View>
                            </View>

                            {/* Notifications Section */}
                            <View className="px-4 py-3 bg-muted/20">
                                <Text className="text-sm font-medium text-muted-foreground">NOTIFICATIONS</Text>
                            </View>
                            <View className="p-4">
                                <View className="flex-row items-center justify-between">
                                    <Text className="text-foreground text-base">Enable Notifications</Text>
                                    <Switch
                                        checked={notifications}
                                        onCheckedChange={setNotifications}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View className="mb-10">
                        <Text className="text-xl font-semibold mb-5 text-foreground">
                            Disabled State
                        </Text>
                        <View className="space-y-6 bg-card rounded-lg p-4">
                            <View className="flex-row items-center justify-between">
                                <Text className="text-muted-foreground text-base">Disabled (on)</Text>
                                <Switch checked={true} disabled />
                            </View>

                            <View className="flex-row items-center justify-between mt-2">
                                <Text className="text-muted-foreground text-base">Disabled (off)</Text>
                                <Switch checked={false} disabled />
                            </View>
                        </View>
                    </View>

                    <View className="mb-10">
                        <Text className="text-xl font-semibold mb-5 text-foreground">
                            With Description
                        </Text>
                        <View className="bg-card rounded-lg p-4">
                            <View className="flex-row items-start justify-between">
                                <View className="flex-1 mr-4">
                                    <Text className="text-foreground text-base mb-2">Allow Notifications</Text>
                                    <Text className="text-sm text-muted-foreground">
                                        Receive notifications about updates and new features.
                                    </Text>
                                </View>
                                <Switch checked={notifications} onCheckedChange={setNotifications} />
                            </View>
                        </View>
                    </View>

                    <View className="mb-10">
                        <Text className="text-xl font-semibold mb-5 text-foreground">
                            Custom Colors
                        </Text>
                        <View className="bg-card rounded-lg p-4">
                            <View className="flex-row items-center justify-between">
                                <Text className="text-foreground text-base">Blue Switch</Text>
                                <Switch
                                    checked={blueSwitch}
                                    onCheckedChange={setBlueSwitch}
                                    className={blueSwitch ? "bg-blue-600" : "bg-muted border-muted"}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
`}
      registryName="switch"
      packageName="@nativeui/ui"
      dependencies={["react-native"]}
      changelog={[]}
    />
  );
}
