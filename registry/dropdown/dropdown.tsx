import * as React from "react";
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
