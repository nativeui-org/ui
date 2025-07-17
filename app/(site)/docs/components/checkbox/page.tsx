import { ComponentPreview } from "@/components/docs/component-preview";

export default function CheckboxPage() {
  return (
    <ComponentPreview
      name="Checkbox"
      description="A checkbox component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Checkbox } from \"@nativeui/ui\";\n\nexport default function CheckboxDemo() {\n  return (\n    <Checkbox>\n      Click me\n    </Checkbox>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import { cn } from "@/lib/utils"
import { Ionicons } from "@expo/vector-icons"
import { useColorScheme } from "nativewind"
import * as React from "react"
import { Pressable, Text } from "react-native"

interface CheckboxProps extends Omit<React.ComponentPropsWithoutRef<typeof Pressable>, 'children'> {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  id?: string
}

interface CheckboxLabelProps extends React.ComponentPropsWithoutRef<typeof Text> {
  disabled?: boolean
  htmlFor?: string
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  CheckboxProps
>(({
  className,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  id,
  ...props
}, ref) => {
  const { colorScheme } = useColorScheme()
  const [innerChecked, setInnerChecked] = React.useState<boolean>(
    checked !== undefined ? checked : defaultChecked || false
  )
  const isChecked = checked !== undefined ? checked : innerChecked

  const handlePress = React.useCallback(() => {
    if (disabled) return

    const newValue = !isChecked

    if (checked === undefined) {
      setInnerChecked(newValue)
    }

    onCheckedChange?.(newValue)
  }, [checked, isChecked, onCheckedChange, disabled])

  React.useEffect(() => {
    if (checked !== undefined) {
      setInnerChecked(checked)
    }
  }, [checked])

  return (
    <Pressable
      ref={ref}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isChecked, disabled }}
      onPress={handlePress}
      disabled={disabled}
      className={cn(
        "h-6 w-6 rounded-md border-2 justify-center items-center",
        isChecked
          ? "border-primary bg-primary"
          : "border-border bg-transparent",
        disabled && "opacity-50",
        className
      )}
      accessibilityLabel={id}
      {...props}
    >
      {isChecked && (
        <Ionicons
          name="checkmark-sharp"
          size={18}
          className="color-primary-foreground"
        />
      )}
    </Pressable>
  )
})

const CheckboxLabel = React.forwardRef<
  React.ElementRef<typeof Text>,
  CheckboxLabelProps
>(({ className, disabled, htmlFor, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      className={cn(
        "text-base text-foreground ml-3",
        disabled && "text-muted-foreground",
        className
      )}
      {...props}
    />
  )
})

Checkbox.displayName = "Checkbox"
CheckboxLabel.displayName = "CheckboxLabel"

export { Checkbox, CheckboxLabel }
`}
      previewCode={`import { Checkbox, CheckboxLabel } from "@/components/ui/checkbox";
import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CheckboxExample() {
    const [termsAccepted, setTermsAccepted] = React.useState(false);
    const [notifications, setNotifications] = React.useState({
        email: true,
        push: false,
        sms: false,
    });
    const [selectedOptions, setSelectedOptions] = React.useState<string[]>([
        "option1",
    ]);

    const toggleOption = (option: string) => {
        setSelectedOptions((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
        );
    };

    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <ScrollView className="p-4">
                    <View className="mb-8">
                        <Text className="text-2xl font-bold mb-2 text-foreground">
                            Checkbox
                        </Text>
                        <Text className="text-base mb-6 text-muted-foreground">
                            A control that allows the user to toggle between checked and not
                            checked.
                        </Text>
                    </View>

                    <View className="mb-10">
                        <Text className="text-xl font-semibold mb-5 text-foreground">
                            Basic Example
                        </Text>
                        <View className="rounded-lg">
                            <View className="flex-row items-center">
                                <Checkbox
                                    id="terms"
                                    checked={termsAccepted}
                                    onCheckedChange={setTermsAccepted}
                                />
                                <CheckboxLabel htmlFor="terms">
                                    Accept terms and conditions
                                </CheckboxLabel>
                            </View>
                            <Text className="text-sm text-muted-foreground mt-4">
                                Current status: {termsAccepted ? "Accepted" : "Not accepted"}
                            </Text>
                        </View>
                    </View>

                    <View className="mb-10">
                        <Text className="text-xl font-semibold mb-5 text-foreground">
                            Notification Preferences
                        </Text>
                        <View className="rounded-lg">
                            <Text className="text-base font-medium mb-4 text-foreground">
                                How would you like to be notified?
                            </Text>
                            <View className="space-y-3">
                                <View className="flex-row items-center">
                                    <Checkbox
                                        id="email"
                                        checked={notifications.email}
                                        onCheckedChange={(checked) =>
                                            setNotifications((prev) => ({ ...prev, email: checked }))
                                        }
                                    />
                                    <CheckboxLabel htmlFor="email">Email</CheckboxLabel>
                                </View>
                                <View className="flex-row items-center mt-2">
                                    <Checkbox
                                        id="push"
                                        checked={notifications.push}
                                        onCheckedChange={(checked) =>
                                            setNotifications((prev) => ({ ...prev, push: checked }))
                                        }
                                    />
                                    <CheckboxLabel htmlFor="push">Push Notifications</CheckboxLabel>
                                </View>
                                <View className="flex-row items-center mt-2">
                                    <Checkbox
                                        id="sms"
                                        checked={notifications.sms}
                                        onCheckedChange={(checked) =>
                                            setNotifications((prev) => ({ ...prev, sms: checked }))
                                        }
                                    />
                                    <CheckboxLabel htmlFor="sms">SMS</CheckboxLabel>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View className="mb-10">
                        <Text className="text-xl font-semibold mb-5 text-foreground">
                            Disabled State
                        </Text>
                        <View className="rounded-lg">
                            <View className="flex-row items-center mb-3">
                                <Checkbox id="disabled-unchecked" disabled />
                                <CheckboxLabel htmlFor="disabled-unchecked" disabled>
                                    Disabled unchecked
                                </CheckboxLabel>
                            </View>
                            <View className="flex-row items-center">
                                <Checkbox id="disabled-checked" disabled checked />
                                <CheckboxLabel htmlFor="disabled-checked" disabled>
                                    Disabled checked
                                </CheckboxLabel>
                            </View>
                        </View>
                    </View>

                    <View className="mb-10">
                        <Text className="text-xl font-semibold mb-5 text-foreground">
                            Multiple Selection
                        </Text>
                        <View className="rounded-lg">
                            <Text className="text-base font-medium mb-4 text-foreground">
                                Select your interests:
                            </Text>
                            <View className="space-y-3">
                                <View className="flex-row items-center">
                                    <Checkbox
                                        id="option1"
                                        checked={selectedOptions.includes("option1")}
                                        onCheckedChange={() => toggleOption("option1")}
                                    />
                                    <CheckboxLabel htmlFor="option1">Technology</CheckboxLabel>
                                </View>
                                <View className="flex-row items-center mt-2">
                                    <Checkbox
                                        id="option2"
                                        checked={selectedOptions.includes("option2")}
                                        onCheckedChange={() => toggleOption("option2")}
                                    />
                                    <CheckboxLabel htmlFor="option2">Sports</CheckboxLabel>
                                </View>
                                <View className="flex-row items-center mt-2">
                                    <Checkbox
                                        id="option3"
                                        checked={selectedOptions.includes("option3")}
                                        onCheckedChange={() => toggleOption("option3")}
                                    />
                                    <CheckboxLabel htmlFor="option3">Art & Design</CheckboxLabel>
                                </View>
                                <View className="flex-row items-center mt-2">
                                    <Checkbox
                                        id="option4"
                                        checked={selectedOptions.includes("option4")}
                                        onCheckedChange={() => toggleOption("option4")}
                                    />
                                    <CheckboxLabel htmlFor="option4">Music</CheckboxLabel>
                                </View>
                            </View>
                            <Text className="text-sm text-muted-foreground mt-4">
                                Selected: {selectedOptions.join(", ") || "None"}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
`}
      registryName="checkbox"
      packageName="@nativeui/ui"
      dependencies={["react-native","@expo/vector-icons"]}
      changelog={[]}
    />
  );
}
