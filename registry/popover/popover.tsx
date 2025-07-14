import * as React from "react"
import {
  View,
  Text,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  Animated,
} from "react-native"
import { cn } from "@/lib/utils"

interface PopoverProps {
  children: React.ReactNode
  className?: string
}

interface PopoverTriggerProps {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  asChild?: boolean
}

interface PopoverAnchorProps {
  children: React.ReactNode
  className?: string
}

interface PopoverContentProps {
  children: React.ReactNode
  className?: string
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
}

const PopoverContext = React.createContext<{
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  triggerRef: React.RefObject<View>
  triggerLayout: { x: number; y: number; width: number; height: number } | null
  setTriggerLayout: React.Dispatch<React.SetStateAction<{ x: number; y: number; width: number; height: number } | null>>
  contentLayout: { width: number; height: number } | null
  setContentLayout: React.Dispatch<React.SetStateAction<{ width: number; height: number } | null>>
  isAnimating: boolean
  setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>
}>({
  open: false,
  setOpen: () => { },
  triggerRef: { current: null },
  triggerLayout: null,
  setTriggerLayout: () => { },
  contentLayout: null,
  setContentLayout: () => { },
  isAnimating: false,
  setIsAnimating: () => { },
})

const Popover = React.forwardRef<View, PopoverProps>(
  ({ children, className, ...props }, ref) => {
    const [open, setOpen] = React.useState(false)
    const triggerRef = React.useRef<View>(null)
    const [triggerLayout, setTriggerLayout] = React.useState<{ x: number; y: number; width: number; height: number } | null>(null)
    const [contentLayout, setContentLayout] = React.useState<{ width: number; height: number } | null>(null)
    const [isAnimating, setIsAnimating] = React.useState(false)

    return (
      <PopoverContext.Provider
        value={{
          open,
          setOpen,
          triggerRef,
          triggerLayout,
          setTriggerLayout,
          contentLayout,
          setContentLayout,
          isAnimating,
          setIsAnimating,
        }}
      >
        <View ref={ref} className={cn("", className)} {...props}>
          {children}
        </View>
      </PopoverContext.Provider>
    )
  }
)

Popover.displayName = "Popover"

const PopoverTrigger = React.forwardRef<View, PopoverTriggerProps>(
  ({ children, className, disabled = false, ...props }, ref) => {
    const { setOpen, open, triggerRef, setTriggerLayout, isAnimating } = React.useContext(PopoverContext)

    const measureTrigger = () => {
      if (triggerRef.current) {
        triggerRef.current.measureInWindow((x, y, width, height) => {
          setTriggerLayout({ x, y, width, height })
        })
      }
    }

    return (
      <Pressable
        ref={triggerRef as any}
        className={cn("", className)}
        disabled={disabled || isAnimating}
        onPress={() => {
          if (open) {
            setOpen(false)
          } else {
            measureTrigger()
            setOpen(true)
          }
        }}
        accessibilityRole="button"
        {...props}
      >
        {children}
      </Pressable>
    )
  }
)

PopoverTrigger.displayName = "PopoverTrigger"

const PopoverAnchor = React.forwardRef<View, PopoverAnchorProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <View ref={ref} className={cn("", className)} {...props}>
        {children}
      </View>
    )
  }
)

PopoverAnchor.displayName = "PopoverAnchor"

const PopoverContent = React.forwardRef<View, PopoverContentProps>(
  ({ children, className, align = "center", side = "bottom", sideOffset = 8, ...props }, ref) => {
    const {
      open,
      setOpen,
      triggerLayout,
      contentLayout,
      setContentLayout,
      setIsAnimating,
    } = React.useContext(PopoverContext)

    const contentRef = React.useRef<View>(null)
    const fadeAnim = React.useRef(new Animated.Value(0)).current

    React.useEffect(() => {
      if (open) {
        setIsAnimating(true)
        if (contentRef.current) {
          setTimeout(() => {
            contentRef.current?.measure((_x, _y, width, height) => {
              setContentLayout({ width, height })
              Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 150, // Animation duration
                useNativeDriver: true,
              }).start(() => {
                setIsAnimating(false)
              })
            })
          }, 10)
        }
      } else {
        // Reset fadeAnim when closed
        fadeAnim.setValue(0)
      }

      // Cleanup animation when component unmounts
      return () => {
        fadeAnim.setValue(0)
      }
    }, [open, setContentLayout, fadeAnim, setIsAnimating])

    const closePopover = React.useCallback(() => {
      setIsAnimating(true)
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {
        setOpen(false)
        setIsAnimating(false)
      })
    }, [fadeAnim, setOpen, setIsAnimating])

    if (!open) return null

    const getPosition = () => {
      if (!triggerLayout || !contentLayout) return {}

      let left = 0
      let top = 0

      // Handle horizontal alignment
      if (align === "start") {
        left = triggerLayout.x
      } else if (align === "center") {
        left = triggerLayout.x + (triggerLayout.width / 2) - (contentLayout.width / 2)
      } else if (align === "end") {
        left = triggerLayout.x + triggerLayout.width - contentLayout.width
      }

      // Handle vertical positioning
      if (side === "top") {
        top = triggerLayout.y - contentLayout.height - sideOffset
      } else if (side === "bottom") {
        top = triggerLayout.y + triggerLayout.height + sideOffset
      } else if (side === "left") {
        left = triggerLayout.x - contentLayout.width - sideOffset
        top = triggerLayout.y + (triggerLayout.height / 2) - (contentLayout.height / 2)
      } else if (side === "right") {
        left = triggerLayout.x + triggerLayout.width + sideOffset
        top = triggerLayout.y + (triggerLayout.height / 2) - (contentLayout.height / 2)
      }

      // Ensure the popover stays within screen bounds
      left = Math.max(16, left)
      top = Math.max(50, top)

      return { left, top }
    }

    return (
      <Modal
        visible={open}
        transparent
        animationType="none"
        onRequestClose={closePopover}
      >
        <TouchableWithoutFeedback onPress={closePopover}>
          <View className="flex-1">
            <TouchableWithoutFeedback>
              <Animated.View
                ref={contentRef}
                style={[
                  getPosition(),
                  { opacity: fadeAnim }
                ]}
                className={cn(
                  "absolute rounded-md border border-border bg-popover p-4",
                  "shadow-lg min-w-[200px] max-w-[90%]",
                  Platform.OS === "ios" ? "ios:shadow-lg" : "android:elevation-4",
                  className
                )}
                {...props}
              >
                {children}
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
)

PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
