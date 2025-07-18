import { ComponentPreview } from "@/components/docs/component-preview";

export default function InputPage() {
  return (
    <ComponentPreview
      name="Input"
      description="A input component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Input } from \"@nativeui/ui\";\n\nexport default function InputDemo() {\n  return (\n    <Input>\n      Click me\n    </Input>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import * as React from "react"
import { TextInput, Platform } from "react-native"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<TextInput, React.ComponentProps<typeof TextInput>>(
  ({ className, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)

    return (
      <TextInput
        className={cn(
          "h-12 w-full rounded-md border border-input bg-transparent px-3 text-primary shadow-sm",
          "placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          isFocused ? "border-ring ring-1 ring-ring" : "",
          Platform.OS === "ios" ? "ios:shadow-sm ios:shadow-foreground/10" : "android:elevation-1",
          className
        )}
        ref={ref}
        textAlignVertical="center"
        underlineColorAndroid="transparent"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
`}
      previewCode={`import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InputExample() {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={100}
                >
                    <ScrollView
                        className="p-4"
                        keyboardShouldPersistTaps="handled"
                        keyboardDismissMode="on-drag"
                    >
                        <View className="mb-6">
                            <Text className="text-2xl font-bold mb-2 text-foreground">
                                Input
                            </Text>
                            <Text className="text-base mb-6 text-muted-foreground">
                                Displays a form input field or a component that looks like an
                                input field.
                            </Text>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Default Input
                            </Text>
                            <Input
                                placeholder="Enter some text"
                                keyboardType="default"
                                returnKeyType="done"
                            />
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Password Input With Icon
                            </Text>
                            <View className="relative">
                                <Input
                                    secureTextEntry={!showPassword}
                                    placeholder="Enter your password"
                                    keyboardType="default"
                                    returnKeyType="done"
                                    textContentType="password"
                                />
                                <View className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onPress={() => setShowPassword(!showPassword)}
                                    >
                                        <Text className="text-muted-foreground">
                                            <Ionicons
                                                name={showPassword ? "eye-off" : "eye"}
                                                size={24}
                                                color="gray"
                                            />
                                        </Text>
                                    </Button>
                                </View>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Email Input
                            </Text>
                            <Input
                                keyboardType="email-address"
                                autoCapitalize="none"
                                placeholder="name@example.com"
                                textContentType="emailAddress"
                                returnKeyType="next"
                                autoCorrect={false}
                            />
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Number Input
                            </Text>
                            <Input
                                keyboardType="number-pad"
                                placeholder="Enter a number"
                                returnKeyType="done"
                            />
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Disabled Input
                            </Text>
                            <Input
                                editable={false}
                                placeholder="This input is disabled"
                                className="opacity-50"
                            />
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                With Label
                            </Text>
                            <View>
                                <Text className="text-sm font-medium mb-2 text-foreground">
                                    Email
                                </Text>
                                <Input
                                    placeholder="Enter your email"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    textContentType="emailAddress"
                                    returnKeyType="next"
                                    autoCorrect={false}
                                />
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                With Button
                            </Text>
                            <View className="flex-row">
                                <Input
                                    className="flex-1 mr-2"
                                    placeholder="Search..."
                                    keyboardType="web-search"
                                    returnKeyType="search"
                                    autoCapitalize="none"
                                />
                                <Button>
                                    <Text className="font-bold text-primary-foreground">
                                        Search
                                    </Text>
                                </Button>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}
`}
      registryName="input"
      packageName="@nativeui/ui"
      dependencies={["react-native"]}
      changelog={[]}
    />
  );
}
