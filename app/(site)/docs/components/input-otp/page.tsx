import { ComponentPreview } from "@/components/docs/component-preview";

export default function InputOtpPage() {
  return (
    <ComponentPreview
      name="InputOtp"
      description="A input-otp component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { InputOtp } from \"@nativeui/ui\";\n\nexport default function InputOtpDemo() {\n  return (\n    <InputOtp>\n      Click me\n    </InputOtp>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import * as React from "react"
import { View, Text, Pressable, TextInput, Platform } from "react-native"
import { cn } from "@/lib/utils"

interface OTPContextType {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  maxLength: number
  onFocus: (index: number) => void
  focusedIndex: number | null
  otpCodeRef: React.MutableRefObject<string[]>
  inputRef: React.RefObject<TextInput>
}

const OTPContext = React.createContext<OTPContextType | undefined>(undefined)

export interface InputOTPProps {
  value: string
  onChange: (value: string) => void
  maxLength: number
  containerClassName?: string
  className?: string
  children: React.ReactNode
}

export const InputOTP = React.forwardRef<View, InputOTPProps>(
  ({ maxLength, value, onChange, containerClassName, className, children }, ref) => {
    const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null)
    const otpCodeRef = React.useRef<string[]>(value.split(""))
    const inputRef = React.useRef<TextInput>(null)

    React.useEffect(() => {
      otpCodeRef.current = value.split("")
    }, [value])

    const setValue = React.useCallback((newValue: React.SetStateAction<string>) => {
      const updatedValue = typeof newValue === "function" ? newValue(value) : newValue
      onChange(updatedValue.slice(0, maxLength))
    }, [value, onChange, maxLength])

    const onFocus = React.useCallback((index: number) => {
      setFocusedIndex(index)
      // Focus the hidden input to trigger keyboard
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, [])

    const handleKeyPress = (text: string) => {
      if (!text) return

      if (focusedIndex !== null && focusedIndex < maxLength) {
        const newValue = [...otpCodeRef.current]

        if (text.length === 1) {
          newValue[focusedIndex] = text
          setValue(newValue.join(""))

          if (focusedIndex < maxLength - 1) {
            setFocusedIndex(focusedIndex + 1)
          }
        }
        // If pasting multiple characters, fill in slots starting from focused index
        else {
          const chars = text.split("")
          for (let i = 0; i < chars.length && focusedIndex + i < maxLength; i++) {
            newValue[focusedIndex + i] = chars[i]
          }
          setValue(newValue.join(""))

          // Move focus to last filled position or end
          const newFocusIndex = Math.min(focusedIndex + chars.length, maxLength - 1)
          setFocusedIndex(newFocusIndex)
        }
      }
    }

    const handleBackspace = () => {
      if (focusedIndex !== null) {
        const newValue = [...otpCodeRef.current]

        // If current slot is empty, move focus back and clear that slot
        if (!newValue[focusedIndex] && focusedIndex > 0) {
          setFocusedIndex(focusedIndex - 1)
          newValue[focusedIndex - 1] = ""
        } else {
          // Otherwise clear current slot
          newValue[focusedIndex] = ""
        }

        setValue(newValue.join(""))
      }
    }

    return (
      <OTPContext.Provider
        value={{
          value,
          setValue,
          maxLength,
          onFocus,
          focusedIndex,
          otpCodeRef,
          inputRef
        }}
      >
        <View
          ref={ref}
          className={cn(
            "flex flex-row items-center justify-center relative",
            containerClassName
          )}
        >
          {children}
          <TextInput
            ref={inputRef}
            className="absolute opacity-0 h-px w-px"
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            value=""
            onChangeText={handleKeyPress}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                handleBackspace()
              }
            }}
            maxLength={maxLength}
            caretHidden
            selectTextOnFocus={false}
            contextMenuHidden={true}
          />
        </View>
      </OTPContext.Provider>
    )
  }
)

InputOTP.displayName = "InputOTP"

export interface InputOTPGroupProps {
  className?: string
  children: React.ReactNode
}

export const InputOTPGroup = React.forwardRef<View, InputOTPGroupProps>(
  ({ className, children }, ref) => (
    <View
      ref={ref}
      className={cn("flex flex-row items-center", className)}
    >
      {children}
    </View>
  )
)

InputOTPGroup.displayName = "InputOTPGroup"

export interface InputOTPSlotProps {
  index: number
  className?: string
}

export const InputOTPSlot = React.forwardRef<View, InputOTPSlotProps>(
  ({ index, className }, ref) => {
    const context = React.useContext(OTPContext)

    if (!context) {
      throw new Error("InputOTPSlot must be used within an InputOTP")
    }

    const { value, onFocus, focusedIndex, inputRef } = context

    const char = value[index] || ""
    const isActive = focusedIndex === index

    const handlePress = () => {
      onFocus(index)
    }

    return (
      <Pressable onPress={handlePress}>
        <View
          ref={ref}
          className={cn(
            "relative flex h-14 w-14 items-center justify-center border border-input rounded-md bg-background text-lg",
            "shadow-sm mx-1",
            isActive ? "border-primary z-10" : "",
            Platform.OS === "ios" ? "ios:shadow-sm ios:shadow-foreground/10" : "android:elevation-1",
            className
          )}
        >
          <Text className="text-center text-foreground text-xl font-medium">
            {char}
          </Text>
          {isActive && !char && (
            <View className="absolute h-6 w-0.5 bg-foreground animate-pulse" />
          )}
        </View>
      </Pressable>
    )
  }
)

InputOTPSlot.displayName = "InputOTPSlot"

export interface InputOTPSeparatorProps {
  className?: string
}

export const InputOTPSeparator = React.forwardRef<View, InputOTPSeparatorProps>(
  ({ className }, ref) => (
    <View ref={ref} className={cn("px-2", className)}>
      <View className="h-0.5 w-4 bg-muted-foreground" />
    </View>
  )
)

InputOTPSeparator.displayName = "InputOTPSeparator"

export function useOTPInput(maxLength: number) {
  const [otp, setOtp] = React.useState("")

  const handleChange = React.useCallback((value: string) => {
    // Only accept numbers
    const cleaned = value.replace(/[^0-9]/g, "")
    // Limit to maxLength
    const limited = cleaned.slice(0, maxLength)
    setOtp(limited)
  }, [maxLength])

  return {
    value: otp,
    setValue: handleChange,
    isComplete: otp.length === maxLength,
    isValid: otp.length === maxLength,
    clear: () => setOtp("")
  }
}
`}
      previewCode={`import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, useOTPInput } from "@/components/ui/input-otp";
import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InputOTPExample() {
    // Basic OTP
    const basicOtp = useOTPInput(4);

    // Verification OTP
    const verificationOtp = useOTPInput(6);

    // PIN code OTP
    const pinOtp = useOTPInput(4);

    // Phone verification OTP
    const phoneOtp = useOTPInput(4);

    // Handle verify button press
    const handleVerify = () => {
        if (verificationOtp.isComplete) {
            Alert.alert("Success", \`Code verified: \${verificationOtp.value}\`);
        } else {
            Alert.alert("Error", "Please enter the complete code");
        }
    };

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
                                OTP Input
                            </Text>
                            <Text className="text-base mb-6 text-muted-foreground">
                                Input component for one-time passwords and verification codes.
                            </Text>
                            <Text className="text-sm mb-2 text-muted-foreground">
                                Tap on any slot to focus and bring up the numeric keyboard.
                            </Text>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Basic OTP Input
                            </Text>
                            <InputOTP
                                value={basicOtp.value}
                                onChange={basicOtp.setValue}
                                maxLength={4}
                                containerClassName="justify-center"
                            >
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                </InputOTPGroup>
                            </InputOTP>
                            <View className="flex-row justify-between items-center mt-2">
                                <Text className="text-sm text-muted-foreground">
                                    {basicOtp.isComplete ? "Complete!" : "Tap to enter code"}
                                </Text>
                                {basicOtp.value.length > 0 && (
                                    <TouchableOpacity onPress={basicOtp.clear}>
                                        <Text className="text-sm text-primary">Clear</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Verification Code
                            </Text>
                            <View className="mb-4">
                                <Text className="text-sm font-medium mb-2 text-foreground text-center">
                                    Enter the 6-digit code sent to your phone
                                </Text>
                                <InputOTP
                                    value={verificationOtp.value}
                                    onChange={verificationOtp.setValue}
                                    maxLength={6}
                                    containerClassName="justify-center"
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </View>
                            <View className="flex-row justify-center items-center">
                                <Button
                                    onPress={handleVerify}
                                    className={!verificationOtp.isComplete ? "opacity-50 mr-2" : "mr-2"}
                                    disabled={!verificationOtp.isComplete}
                                >
                                    <Text className="font-bold text-primary-foreground">
                                        Verify Code
                                    </Text>
                                </Button>
                                {verificationOtp.value.length > 0 && (
                                    <Button
                                        variant="outline"
                                        onPress={verificationOtp.clear}
                                    >
                                        <Text className="font-medium text-foreground">Clear</Text>
                                    </Button>
                                )}
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                PIN Code
                            </Text>
                            <View>
                                <Text className="text-sm font-medium mb-2 text-foreground text-center">
                                    Enter your PIN
                                </Text>
                                <InputOTP
                                    value={pinOtp.value}
                                    onChange={pinOtp.setValue}
                                    maxLength={4}
                                    containerClassName="justify-center"
                                >
                                    <InputOTPGroup>
                                        {[0, 1, 2, 3].map((index) => (
                                            <InputOTPSlot
                                                key={index}
                                                index={index}
                                                className="rounded-full h-16 w-16 mx-1"
                                            />
                                        ))}
                                    </InputOTPGroup>
                                </InputOTP>
                                <View className="flex-row justify-center items-center mt-4">
                                    <Text className="text-sm text-muted-foreground mr-2">
                                        {pinOtp.isComplete ? "PIN complete" : "Tap to enter PIN"}
                                    </Text>
                                    {pinOtp.value.length > 0 && (
                                        <TouchableOpacity onPress={pinOtp.clear}>
                                            <Text className="text-sm text-primary">Reset</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Phone Verification with Icon
                            </Text>
                            <View>
                                <View className="flex-row items-center justify-center mb-4">
                                    <Ionicons name="phone-portrait-outline" size={24} color="gray" className="mr-2" />
                                    <Text className="text-sm font-medium text-foreground">
                                        Enter the code sent to +1 (555) 123-4567
                                    </Text>
                                </View>
                                <InputOTP
                                    value={phoneOtp.value}
                                    onChange={phoneOtp.setValue}
                                    maxLength={4}
                                    containerClassName="justify-center"
                                >
                                    <InputOTPGroup>
                                        {[0, 1, 2, 3].map((index) => (
                                            <InputOTPSlot
                                                key={index}
                                                index={index}
                                                className="h-14 w-14 mx-2 rounded-lg"
                                            />
                                        ))}
                                    </InputOTPGroup>
                                </InputOTP>
                                <View className="items-center mt-4">
                                    <Button
                                        className={phoneOtp.isComplete ? "bg-primary" : "bg-primary/50"}
                                        disabled={!phoneOtp.isComplete}
                                    >
                                        <Text className="font-bold text-primary-foreground">
                                            Submit
                                        </Text>
                                    </Button>
                                    <TouchableOpacity className="mt-2">
                                        <Text className="text-sm text-primary">Resend Code</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}
`}
      registryName="input-otp"
      packageName="@nativeui/ui"
      dependencies={["react-native"]}
      changelog={[]}
    />
  );
}
