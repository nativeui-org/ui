# Textarea

A textarea component for React Native applications.

## Installation

```bash
npx @nativeui/cli add textarea
```

## Manual Installation

```tsx
import * as React from "react"
import { TextInput, Platform } from "react-native"
import { cn } from "@/lib/utils"

const TextArea = React.forwardRef<TextInput, React.ComponentProps<typeof TextInput>>(
  ({ className, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)

    return (
      <TextInput
        className={cn(
          "min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-3 text-primary shadow-sm",
          "placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          "text-base multiline",
          isFocused ? "border-ring ring-1 ring-ring" : "",
          Platform.OS === "ios" ? "ios:shadow-sm ios:shadow-foreground/10" : "android:elevation-1",
          className
        )}
        ref={ref}
        multiline={true}
        textAlignVertical="top"
        underlineColorAndroid="transparent"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    )
  }
)

TextArea.displayName = "TextArea"

export { TextArea }

```

## Dependencies

### Package Dependencies

```bash
npm install react-native
```

## Usage

```tsx
import { TextArea } from "@/components/ui/textarea";
import * as React from "react";

export default function TextAreaExample() {

    return (
        <TextArea
            placeholder="Type your message here..."
            numberOfLines={4}
        />
    );
}

```

## Preview

```tsx
import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/textarea";
import * as React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TextAreaExample() {
    const [text, setText] = React.useState("");
    const characterLimit = 200;

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
                                TextArea
                            </Text>
                            <Text className="text-base mb-6 text-muted-foreground">
                                Displays a multi-line text input field for longer form content.
                            </Text>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Default TextArea
                            </Text>
                            <TextArea
                                placeholder="Type your message here..."
                                numberOfLines={4}
                            />
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                With Character Limit
                            </Text>
                            <View>
                                <TextArea
                                    placeholder="Write your bio (max 200 characters)..."
                                    value={text}
                                    onChangeText={setText}
                                    numberOfLines={4}
                                    maxLength={characterLimit}
                                />
                                <Text className="text-sm text-muted-foreground text-right mt-1">
                                    {text.length}/{characterLimit}
                                </Text>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                With Label
                            </Text>
                            <View>
                                <Text className="text-sm font-medium mb-2 text-foreground">
                                    Feedback
                                </Text>
                                <TextArea
                                    placeholder="Tell us what you think..."
                                    numberOfLines={4}
                                />
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Taller TextArea
                            </Text>
                            <TextArea
                                placeholder="For longer content..."
                                numberOfLines={8}
                                className="min-h-[200px]"
                            />
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Disabled TextArea
                            </Text>
                            <TextArea
                                editable={false}
                                placeholder="This textarea is disabled"
                                className="opacity-50"
                                numberOfLines={4}
                            />
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                With Submit Button
                            </Text>
                            <View>
                                <TextArea
                                    placeholder="Type your comment here..."
                                    numberOfLines={4}
                                    className="mb-3"
                                />
                                <Button>
                                    <Text className="font-bold text-primary-foreground">
                                        Submit
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

```

## API Reference

### Props

The Textarea component accepts all standard HTML attributes plus:

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
