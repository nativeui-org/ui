import { ComponentPreview } from "@/components/docs/component-preview";

export default function DropdownPage() {
  return (
    <ComponentPreview
      name="Dropdown"
      description="A dropdown component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Dropdown } from \"@nativeui/ui\";\n\nexport default function DropdownDemo() {\n  return (\n    <Dropdown>\n      Click me\n    </Dropdown>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import * as React from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  Animated,
  ScrollView,
  Dimensions,
  LayoutChangeEvent,
  LayoutRectangle,
} from "react-native";
import { cn } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";

interface DropdownProps {
  children: React.ReactNode;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface DropdownTriggerProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  asChild?: boolean;
}

interface DropdownContentProps {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

interface DropdownItemProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  destructive?: boolean;
  onSelect?: () => void;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  shortcut?: string;
}

interface DropdownLabelProps {
  children: React.ReactNode;
  className?: string;
}

interface DropdownSeparatorProps {
  className?: string;
}

interface DropdownGroupProps {
  children: React.ReactNode;
  className?: string;
}

const DropdownContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRect: LayoutRectangle | null;
  setTriggerRect: (rect: LayoutRectangle) => void;
}>({
  open: false,
  setOpen: () => { },
  triggerRect: null,
  setTriggerRect: () => { },
});

const Dropdown = React.forwardRef<View, DropdownProps>(
  ({ children, className, open = false, onOpenChange, ...props }, ref) => {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const [triggerRect, setTriggerRect] =
      React.useState<LayoutRectangle | null>(null);

    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;

    const setOpen = React.useCallback(
      (value: boolean) => {
        if (!isControlled) {
          setInternalOpen(value);
        }
        onOpenChange?.(value);
      },
      [isControlled, onOpenChange]
    );

    return (
      <DropdownContext.Provider
        value={{ open: isOpen, setOpen, triggerRect, setTriggerRect }}
      >
        <View ref={ref} className={cn("", className)} {...props}>
          {children}
        </View>
      </DropdownContext.Provider>
    );
  }
);

Dropdown.displayName = "Dropdown";

const DropdownTrigger = React.forwardRef<View, DropdownTriggerProps>(
  (
    { children, className, disabled = false, asChild = false, ...props },
    ref
  ) => {
    const { setOpen, setTriggerRect } = React.useContext(DropdownContext);
    const triggerRef = React.useRef<View>(null);

    const measureTrigger = () => {
      triggerRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setTriggerRect({
          x: pageX,
          y: pageY,
          width,
          height,
        });
      });
    };

    const handlePress = (e: any) => {
      measureTrigger();
      setOpen(true);
    };

    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement<{
        onPress?: (e: any) => void;
        ref?: React.Ref<any>;
        disabled?: boolean;
      }>;
      return React.cloneElement(child, {
        ...props,
        ref: triggerRef,
        onPress: (e: any) => {
          child.props?.onPress?.(e);
          handlePress(e);
        },
        disabled,
      });
    }

    return (
      <Pressable
        ref={triggerRef}
        className={cn("", className)}
        disabled={disabled}
        onPress={handlePress}
        {...props}
      >
        {children}
      </Pressable>
    );
  }
);

DropdownTrigger.displayName = "DropdownTrigger";

const DropdownContent = React.forwardRef<View, DropdownContentProps>(
  ({ children, className, align = "start", sideOffset = 4, ...props }, ref) => {
    const { open, setOpen, triggerRect } = React.useContext(DropdownContext);
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const scaleAnim = React.useRef(new Animated.Value(0.95)).current;
    const [isVisible, setIsVisible] = React.useState(open);
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
      Dimensions.get("window");
    const [contentSize, setContentSize] = React.useState({
      width: 0,
      height: 0,
    });

    React.useEffect(() => {
      if (open && !isVisible) {
        setIsVisible(true);
      }
    }, [open, isVisible]);

    React.useEffect(() => {
      if (isVisible) {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            damping: 20,
            stiffness: 300,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }, [isVisible, fadeAnim, scaleAnim]);

    const handleClose = React.useCallback(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsVisible(false);
        setOpen(false);
      });
    }, [fadeAnim, scaleAnim, setOpen]);

    const handleLayout = (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      setContentSize({ width, height });
    };

    if (!isVisible || !triggerRect) return null;

    // Calculate position
    let left = triggerRect.x;
    if (align === "end") {
      left = triggerRect.x + triggerRect.width - contentSize.width;
    } else if (align === "center") {
      left = triggerRect.x + (triggerRect.width - contentSize.width) / 2;
    }

    // Ensure the dropdown stays within screen bounds
    left = Math.max(16, Math.min(left, SCREEN_WIDTH - contentSize.width - 16));

    // Position below the trigger by default
    let top = triggerRect.y + triggerRect.height + sideOffset;

    // If there's not enough space below, position above the trigger
    if (top + contentSize.height > SCREEN_HEIGHT - 32) {
      top = triggerRect.y - contentSize.height - sideOffset;
    }

    return (
      <Modal
        visible={isVisible}
        transparent
        statusBarTranslucent
        animationType="none"
      >
        <TouchableWithoutFeedback onPress={handleClose}>
          <Animated.View
            className="flex-1 bg-black/25"
            style={{ opacity: fadeAnim }}
          >
            <TouchableWithoutFeedback>
              <Animated.View
                ref={ref}
                onLayout={handleLayout}
                className={cn(
                  "absolute bg-background rounded-xl overflow-hidden",
                  Platform.OS === "ios"
                    ? "ios:shadow-xl"
                    : "android:elevation-8",
                  className
                )}
                style={{
                  transform: [{ scale: scaleAnim }],
                  top,
                  left,
                  minWidth: Math.max(triggerRect.width, 180),
                  maxWidth: SCREEN_WIDTH - 32,
                  maxHeight: SCREEN_HEIGHT * 0.7,
                }}
                {...props}
              >
                <ScrollView bounces={false} className="py-2">
                  {children}
                </ScrollView>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
);

DropdownContent.displayName = "DropdownContent";

const DropdownItem = React.forwardRef<View, DropdownItemProps>(
  (
    {
      children,
      className,
      disabled = false,
      destructive = false,
      onSelect,
      icon,
      shortcut,
      ...props
    },
    ref
  ) => {
    const { setOpen } = React.useContext(DropdownContext);

    const handlePress = () => {
      onSelect?.();
      setOpen(false);
    };

    return (
      <Pressable
        ref={ref}
        className={cn(
          "flex-row items-center px-4 py-3 active:bg-muted/50",
          disabled && "opacity-50",
          destructive && "text-destructive",
          className
        )}
        disabled={disabled}
        onPress={handlePress}
        {...props}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={22}
            className={cn(
              "text-foreground mr-3",
              destructive && "text-destructive"
            )}
          />
        )}
        <Text
          className={cn(
            "flex-1 text-base text-foreground",
            destructive && "text-destructive"
          )}
        >
          {children}
        </Text>
        {shortcut && (
          <Text className="text-muted-foreground text-sm ml-3">{shortcut}</Text>
        )}
      </Pressable>
    );
  }
);

DropdownItem.displayName = "DropdownItem";

const DropdownLabel = React.forwardRef<View, DropdownLabelProps>(
  ({ children, className, ...props }, ref) => (
    <View ref={ref} className={cn("px-4 py-2", className)} {...props}>
      <Text className="text-sm font-medium text-muted-foreground">
        {children}
      </Text>
    </View>
  )
);

DropdownLabel.displayName = "DropdownLabel";

const DropdownSeparator = React.forwardRef<View, DropdownSeparatorProps>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn("h-[1px] bg-border my-2", className)}
      {...props}
    />
  )
);

DropdownSeparator.displayName = "DropdownSeparator";

const DropdownGroup = React.forwardRef<View, DropdownGroupProps>(
  ({ children, className, ...props }, ref) => (
    <View ref={ref} className={cn("", className)} {...props}>
      {children}
    </View>
  )
);

DropdownGroup.displayName = "DropdownGroup";

export {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownGroup,
};
`}
      previewCode={`import { Button } from "@/components/ui/button";
import {
    Dropdown,
    DropdownContent,
    DropdownGroup,
    DropdownItem,
    DropdownLabel,
    DropdownSeparator,
    DropdownTrigger,
} from "@/components/ui/dropdown";
import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DropdownExample() {
    const [basicOpen, setBasicOpen] = React.useState(false);
    const [profileOpen, setProfileOpen] = React.useState(false);
    const [settingsOpen, setSettingsOpen] = React.useState(false);
    const [moreOpen, setMoreOpen] = React.useState(false);

    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <ScrollView className="flex-1 p-4">
                    <View className="mb-6">
                        <Text className="text-2xl font-bold mb-2 text-foreground">
                            Dropdown
                        </Text>
                        <Text className="text-base text-muted-foreground mb-6">
                            Displays a menu to the user — triggered by a button.
                        </Text>
                    </View>

                    {/* Basic Dropdown */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Basic Dropdown
                        </Text>
                        <Dropdown open={basicOpen} onOpenChange={setBasicOpen}>
                            <DropdownTrigger asChild>
                                <Button variant="outline">
                                    <Text className="text-foreground">Open Menu</Text>
                                </Button>
                            </DropdownTrigger>
                            <DropdownContent>
                                <DropdownItem icon="person-outline" onSelect={() => console.log("Profile")}>
                                    Profile
                                </DropdownItem>
                                <DropdownItem icon="settings-outline" onSelect={() => console.log("Settings")}>
                                    Settings
                                </DropdownItem>
                                <DropdownItem icon="help-circle-outline" onSelect={() => console.log("Help")}>
                                    Help Center
                                </DropdownItem>
                            </DropdownContent>
                        </Dropdown>
                    </View>

                    {/* Profile Dropdown */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Profile Dropdown
                        </Text>
                        <Dropdown open={profileOpen} onOpenChange={setProfileOpen}>
                            <DropdownTrigger asChild>
                                <Button>
                                    <Text className="text-primary-foreground">Account</Text>
                                </Button>
                            </DropdownTrigger>
                            <DropdownContent>
                                <DropdownLabel>My Account</DropdownLabel>
                                <DropdownGroup>
                                    <DropdownItem
                                        icon="person-outline"
                                        onSelect={() => console.log("Profile")}
                                        shortcut="⌘P"
                                    >
                                        Profile
                                    </DropdownItem>
                                    <DropdownItem
                                        icon="card-outline"
                                        onSelect={() => console.log("Billing")}
                                        shortcut="⌘B"
                                    >
                                        Billing
                                    </DropdownItem>
                                    <DropdownItem
                                        icon="settings-outline"
                                        onSelect={() => console.log("Settings")}
                                        shortcut="⌘S"
                                    >
                                        Settings
                                    </DropdownItem>
                                </DropdownGroup>
                                <DropdownSeparator />
                                <DropdownGroup>
                                    <DropdownItem
                                        icon="notifications-outline"
                                        onSelect={() => console.log("Notifications")}
                                    >
                                        Notifications
                                    </DropdownItem>
                                    <DropdownItem
                                        icon="lock-closed-outline"
                                        onSelect={() => console.log("Privacy")}
                                    >
                                        Privacy
                                    </DropdownItem>
                                </DropdownGroup>
                            </DropdownContent>
                        </Dropdown>
                    </View>

                    {/* Settings Dropdown */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Settings Dropdown
                        </Text>
                        <Dropdown open={settingsOpen} onOpenChange={setSettingsOpen}>
                            <DropdownTrigger asChild>
                                <Button variant="outline">
                                    <Text className="text-foreground">Settings</Text>
                                </Button>
                            </DropdownTrigger>
                            <DropdownContent>
                                <DropdownLabel>Appearance</DropdownLabel>
                                <DropdownItem
                                    icon="color-palette-outline"
                                    onSelect={() => console.log("Theme")}
                                >
                                    Theme
                                </DropdownItem>
                                <DropdownItem
                                    icon="text-outline"
                                    onSelect={() => console.log("Font Size")}
                                >
                                    Font Size
                                </DropdownItem>
                                <DropdownSeparator />
                                <DropdownLabel>Privacy</DropdownLabel>
                                <DropdownItem
                                    icon="eye-outline"
                                    onSelect={() => console.log("Visibility")}
                                >
                                    Visibility
                                </DropdownItem>
                                <DropdownItem
                                    icon="notifications-outline"
                                    onSelect={() => console.log("Notifications")}
                                >
                                    Notifications
                                </DropdownItem>
                            </DropdownContent>
                        </Dropdown>
                    </View>

                    {/* More Actions Dropdown */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            More Actions
                        </Text>
                        <Dropdown open={moreOpen} onOpenChange={setMoreOpen}>
                            <DropdownTrigger asChild>
                                <Button variant="outline">
                                    <Text className="text-foreground">More</Text>
                                </Button>
                            </DropdownTrigger>
                            <DropdownContent>
                                <DropdownItem
                                    icon="share-outline"
                                    onSelect={() => console.log("Share")}
                                >
                                    Share
                                </DropdownItem>
                                <DropdownItem
                                    icon="duplicate-outline"
                                    onSelect={() => console.log("Duplicate")}
                                >
                                    Duplicate
                                </DropdownItem>
                                <DropdownSeparator />
                                <DropdownItem
                                    icon="archive-outline"
                                    onSelect={() => console.log("Archive")}
                                >
                                    Archive
                                </DropdownItem>
                                <DropdownItem
                                    icon="trash-outline"
                                    destructive
                                    onSelect={() => console.log("Delete")}
                                >
                                    Delete
                                </DropdownItem>
                            </DropdownContent>
                        </Dropdown>
                    </View>

                    <View className="h-20" />
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
`}
      registryName="dropdown"
      packageName="@nativeui/ui"
      dependencies={["react-native","@expo/vector-icons"]}
      changelog={[]}
    />
  );
}
