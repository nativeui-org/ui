import { ComponentPreview } from "@/components/docs/component-preview";

export default function PopoverPage() {
  return (
    <ComponentPreview
      name="Popover"
      description="A popover component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Popover } from \"@nativeui/ui\";\n\nexport default function PopoverDemo() {\n  return (\n    <Popover>\n      Click me\n    </Popover>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import * as React from "react"
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
`}
      previewCode={`import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PopoverExample() {
    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={100}
                >
                    <ScrollView className="p-4">
                        <View className="mb-6">
                            <Text className="text-2xl font-bold mb-2 text-foreground">
                                Popover
                            </Text>
                            <Text className="text-base mb-6 text-muted-foreground">
                                Displays floating content in relation to a trigger element when activated.
                            </Text>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Basic Popover
                            </Text>
                            <View className="items-center">
                                <Popover>
                                    <PopoverTrigger className="bg-primary py-2 px-4 rounded-md">
                                        <Text className="text-primary-foreground font-medium">
                                            Click me
                                        </Text>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <Text className="text-foreground font-medium mb-1">
                                            Popover Content
                                        </Text>
                                        <Text className="text-muted-foreground text-sm">
                                            This is the popover content that appears when you click the trigger.
                                        </Text>
                                    </PopoverContent>
                                </Popover>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                With Different Alignments
                            </Text>

                            <View className="flex-row justify-between mb-4">
                                <Popover>
                                    <PopoverTrigger className="bg-secondary py-2 px-4 rounded-md">
                                        <Text className="text-secondary-foreground font-medium">
                                            Start Aligned
                                        </Text>
                                    </PopoverTrigger>
                                    <PopoverContent align="start">
                                        <Text className="text-foreground font-medium mb-1">
                                            Start Aligned
                                        </Text>
                                        <Text className="text-muted-foreground text-sm">
                                            This popover is aligned to the start of the trigger.
                                        </Text>
                                    </PopoverContent>
                                </Popover>

                                <Popover>
                                    <PopoverTrigger className="bg-secondary py-2 px-4 rounded-md">
                                        <Text className="text-secondary-foreground font-medium">
                                            End Aligned
                                        </Text>
                                    </PopoverTrigger>
                                    <PopoverContent align="end">
                                        <Text className="text-foreground font-medium mb-1">
                                            End Aligned
                                        </Text>
                                        <Text className="text-muted-foreground text-sm">
                                            This popover is aligned to the end of the trigger.
                                        </Text>
                                    </PopoverContent>
                                </Popover>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Different Positions
                            </Text>

                            <View className="items-center mb-6">
                                <Popover>
                                    <PopoverTrigger className="bg-accent py-2 px-4 rounded-md">
                                        <Text className="text-accent-foreground font-medium">
                                            Top Side
                                        </Text>
                                    </PopoverTrigger>
                                    <PopoverContent side="top">
                                        <Text className="text-foreground font-medium mb-1">
                                            Top Popover
                                        </Text>
                                        <Text className="text-muted-foreground text-sm">
                                            This popover appears above the trigger.
                                        </Text>
                                    </PopoverContent>
                                </Popover>
                            </View>

                            <View className="items-center mb-6">
                                <Popover>
                                    <PopoverTrigger className="bg-accent py-2 px-4 rounded-md">
                                        <Text className="text-accent-foreground font-medium">
                                            Bottom with Offset
                                        </Text>
                                    </PopoverTrigger>
                                    <PopoverContent side="bottom" sideOffset={16}>
                                        <Text className="text-foreground font-medium mb-1">
                                            Bottom Popover with Extra Offset
                                        </Text>
                                        <Text className="text-muted-foreground text-sm">
                                            This popover appears below with extra spacing.
                                        </Text>
                                    </PopoverContent>
                                </Popover>
                            </View>

                            <View className="flex-row justify-center">
                                <View>
                                    <Popover>
                                        <PopoverTrigger className="bg-muted py-2 px-4 rounded-md">
                                            <Text className="text-muted-foreground font-medium">
                                                Right Side
                                            </Text>
                                        </PopoverTrigger>
                                        <PopoverContent side="right" align="center">
                                            <Text className="text-foreground font-medium mb-1">
                                                Right Popover
                                            </Text>
                                            <Text className="text-muted-foreground text-sm">
                                                This popover appears to the right of the trigger.
                                            </Text>
                                        </PopoverContent>
                                    </Popover>
                                </View>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                With Icon and Styling
                            </Text>
                            <View className="items-center">
                                <Popover>
                                    <PopoverTrigger className="bg-primary flex-row items-center py-2 px-4 rounded-md">
                                        <Text className="text-primary-foreground font-medium mr-2">
                                            Settings
                                        </Text>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-56">
                                        <View className="mb-4">
                                            <Text className="text-foreground font-bold mb-2">
                                                Settings Menu
                                            </Text>
                                            <View className="h-px bg-border mb-2" />
                                        </View>

                                        <Pressable
                                            className="flex-row items-center py-2 mb-2 active:bg-muted rounded-sm px-1"
                                            onPress={() => console.log("Profile pressed")}
                                        >
                                            <Ionicons name="person-outline" size={20} color="#555" className="mr-2" />
                                            <Text className="text-foreground ml-2">Profile</Text>
                                        </Pressable>

                                        <Pressable
                                            className="flex-row items-center py-2 mb-2 active:bg-muted rounded-sm px-1"
                                            onPress={() => console.log("Preferences pressed")}
                                        >
                                            <Ionicons name="options-outline" size={20} color="#555" className="mr-2" />
                                            <Text className="text-foreground ml-2">Preferences</Text>
                                        </Pressable>

                                        <Pressable
                                            className="flex-row items-center py-2 active:bg-muted rounded-sm px-1"
                                            onPress={() => console.log("Logout pressed")}
                                        >
                                            <Ionicons name="log-out-outline" size={20} color="#555" className="mr-2" />
                                            <Text className="text-foreground ml-2">Logout</Text>
                                        </Pressable>
                                    </PopoverContent>
                                </Popover>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Custom Styling
                            </Text>
                            <View className="items-center">
                                <Popover>
                                    <PopoverTrigger className="bg-destructive py-2 px-4 rounded-md">
                                        <Text className="text-destructive-foreground font-medium">
                                            Delete Item
                                        </Text>
                                    </PopoverTrigger>
                                    <PopoverContent className="bg-destructive text-destructive-foreground border-destructive">
                                        <Text className="text-destructive-foreground font-medium mb-2">
                                            Confirm Deletion
                                        </Text>
                                        <Text className="text-destructive-foreground opacity-90 text-sm mb-4">
                                            Are you sure you want to delete this item? This action cannot be undone.
                                        </Text>
                                        <View className="flex-row justify-between">
                                            <Pressable
                                                className="bg-destructive-foreground py-2 px-3 rounded-md"
                                                onPress={() => console.log("Cancel pressed")}
                                            >
                                                <Text className="text-destructive font-medium">Cancel</Text>
                                            </Pressable>
                                            <Pressable
                                                className="bg-destructive-foreground/20 py-2 px-3 rounded-md border border-destructive-foreground"
                                                onPress={() => console.log("Delete pressed")}
                                            >
                                                <Text className="text-destructive-foreground font-medium">Delete</Text>
                                            </Pressable>
                                        </View>
                                    </PopoverContent>
                                </Popover>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Interactive Example
                            </Text>
                            <View className="items-center">
                                <Popover>
                                    <PopoverTrigger className="bg-primary py-2 px-4 rounded-md">
                                        <Text className="text-primary-foreground font-medium">
                                            Show Notification
                                        </Text>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-72">
                                        <View className="flex-row items-center mb-3">
                                            <View className="w-10 h-10 rounded-full bg-primary items-center justify-center mr-3">
                                                <Ionicons name="notifications" size={20} color="white" />
                                            </View>
                                            <View className="flex-1">
                                                <Text className="text-foreground font-bold">New Message</Text>
                                                <Text className="text-muted-foreground text-sm">From: Alice Smith</Text>
                                            </View>
                                            <Text className="text-muted-foreground text-xs">2m ago</Text>
                                        </View>

                                        <View className="bg-muted p-3 rounded-md mb-3">
                                            <Text className="text-foreground">
                                                Hi there! Just checking in about our meeting tomorrow.
                                            </Text>
                                        </View>

                                        <View className="flex-row">
                                            <Pressable
                                                className="flex-1 bg-muted mr-2 py-2 rounded-md items-center"
                                                onPress={() => console.log("Dismiss pressed")}
                                            >
                                                <Text className="text-muted-foreground font-medium">Dismiss</Text>
                                            </Pressable>
                                            <Pressable
                                                className="flex-1 bg-primary py-2 rounded-md items-center"
                                                onPress={() => console.log("Reply pressed")}
                                            >
                                                <Text className="text-primary-foreground font-medium">Reply</Text>
                                            </Pressable>
                                        </View>
                                    </PopoverContent>
                                </Popover>
                            </View>
                        </View>

                        <View className="mb-24">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Card Preview Example
                            </Text>
                            <View className="items-center">
                                <Popover>
                                    <PopoverTrigger>
                                        <View className="flex-row items-center bg-card p-3 rounded-lg border border-border">
                                            <View className="w-12 h-12 bg-primary rounded-full mr-3 items-center justify-center">
                                                <Text className="text-primary-foreground text-lg font-bold">JD</Text>
                                            </View>
                                            <View>
                                                <Text className="text-foreground font-medium">John Doe</Text>
                                                <Text className="text-muted-foreground text-sm">View Profile</Text>
                                            </View>
                                        </View>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <View className="items-center mb-3">
                                            <View className="w-16 h-16 bg-primary rounded-full mb-2 items-center justify-center">
                                                <Text className="text-primary-foreground text-xl font-bold">JD</Text>
                                            </View>
                                            <Text className="text-foreground font-bold">John Doe</Text>
                                            <Text className="text-muted-foreground text-sm">john.doe@example.com</Text>
                                        </View>
                                        <View className="flex-row justify-around">
                                            <Pressable className="bg-primary px-3 py-2 rounded-md">
                                                <Text className="text-primary-foreground">View Profile</Text>
                                            </Pressable>
                                            <Pressable className="bg-secondary px-3 py-2 rounded-md">
                                                <Text className="text-secondary-foreground">Message</Text>
                                            </Pressable>
                                        </View>
                                    </PopoverContent>
                                </Popover>
                            </View>
                        </View>

                        {/* Extra padding to ensure good scroll */}
                        <View className="h-20" />
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}
`}
      registryName="popover"
      packageName="@nativeui/ui"
      dependencies={["react-native"]}
      changelog={[]}
    />
  );
}
