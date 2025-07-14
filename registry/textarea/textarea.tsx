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
