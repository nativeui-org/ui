import * as React from "react"
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
