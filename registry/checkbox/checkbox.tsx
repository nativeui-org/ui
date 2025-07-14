import { cn } from "@/lib/utils"
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
