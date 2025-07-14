import * as React from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  Animated,
  StyleSheet,
  Dimensions,
  LayoutChangeEvent,
} from "react-native";
import { cn } from "@/lib/utils";

interface TooltipProps {
  children: React.ReactNode;
  className?: string;
}

interface TooltipTriggerProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  asChild?: boolean;
}

interface TooltipContentProps {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
}

interface TooltipProviderProps {
  children: React.ReactNode;
}

const TooltipContext = React.createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<View | null>;
  triggerLayout: { x: number; y: number; width: number; height: number } | null;
  setTriggerLayout: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
      width: number;
      height: number;
    } | null>
  >;
}>({
  open: false,
  setOpen: () => { },
  triggerRef: { current: null },
  triggerLayout: null,
  setTriggerLayout: () => { },
});

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const TooltipProvider = React.forwardRef<View, TooltipProviderProps>(
  ({ children }, ref) => {
    return <View ref={ref}>{children}</View>;
  }
);

TooltipProvider.displayName = "TooltipProvider";

const Tooltip = React.forwardRef<View, TooltipProps>(
  ({ children, className, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    const triggerRef = React.useRef<View | null>(null);
    const [triggerLayout, setTriggerLayout] = React.useState<{
      x: number;
      y: number;
      width: number;
      height: number;
    } | null>(null);

    return (
      <TooltipContext.Provider
        value={{
          open,
          setOpen,
          triggerRef,
          triggerLayout,
          setTriggerLayout,
        }}
      >
        <View ref={ref} className={cn("", className)} {...props}>
          {children}
        </View>
      </TooltipContext.Provider>
    );
  }
);

Tooltip.displayName = "Tooltip";

const TooltipTrigger = React.forwardRef<View, TooltipTriggerProps>(
  ({ children, className, disabled = false, ...props }, ref) => {
    const { setOpen, open, triggerRef, setTriggerLayout } =
      React.useContext(TooltipContext);

    const measureTrigger = () => {
      if (triggerRef.current) {
        triggerRef.current.measureInWindow((x, y, width, height) => {
          setTriggerLayout({ x, y, width, height });
        });
      }
    };

    const handlePress = () => {
      if (disabled) return;
      measureTrigger();
      setOpen(!open);
    };

    return (
      <Pressable
        ref={(node) => {
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          triggerRef.current = node;
        }}
        className={cn("", className)}
        disabled={disabled}
        onPress={handlePress}
        accessibilityRole="button"
        {...props}
      >
        {children}
      </Pressable>
    );
  }
);

TooltipTrigger.displayName = "TooltipTrigger";

const TooltipContent = React.forwardRef<View, TooltipContentProps>(
  (
    {
      children,
      className,
      align = "center",
      side = "bottom",
      sideOffset = 8,
      ...props
    },
    ref
  ) => {
    const { open, setOpen, triggerLayout } = React.useContext(TooltipContext);
    const opacityAnim = React.useRef(new Animated.Value(0)).current;
    const offsetAnim = React.useRef(new Animated.Value(0)).current;
    const scaleAnim = React.useRef(new Animated.Value(0.92)).current;
    const [contentSize, setContentSize] = React.useState<{
      width: number;
      height: number;
    }>({
      width:
        side === "left" || side === "right"
          ? Math.min(150, WINDOW_WIDTH / 3)
          : 200,
      height: 60,
    });

    const handleContentLayout = (e: LayoutChangeEvent) => {
      const { width, height } = e.nativeEvent.layout;
      if (width > 0 && height > 0) {
        if (side === "left" || side === "right") {
          setContentSize({
            width: Math.min(width, WINDOW_WIDTH / 3),
            height,
          });
        } else {
          setContentSize({ width, height });
        }
      }
    };

    React.useEffect(() => {
      if (open) {
        opacityAnim.setValue(0);
        scaleAnim.setValue(0.92);

        switch (side) {
          case "top":
            offsetAnim.setValue(8);
            break;
          case "bottom":
            offsetAnim.setValue(-8);
            break;
          case "left":
            offsetAnim.setValue(8);
            break;
          case "right":
            offsetAnim.setValue(-8);
            break;
        }

        Animated.parallel([
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 220,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 220,
            useNativeDriver: true,
          }),
          Animated.timing(offsetAnim, {
            toValue: 0,
            duration: 220,
            useNativeDriver: true,
          }),
        ]).start();

        const timer = setTimeout(() => handleClose(), 4000);
        return () => clearTimeout(timer);
      }
    }, [open, side]);

    const handleClose = () => {
      let targetOffset = 0;

      switch (side) {
        case "top":
          targetOffset = -8;
          break;
        case "bottom":
          targetOffset = 8;
          break;
        case "left":
          targetOffset = -8;
          break;
        case "right":
          targetOffset = 8;
          break;
      }

      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.92,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(offsetAnim, {
          toValue: targetOffset,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setOpen(false);
      });
    };

    if (!open) return null;

    const getPosition = () => {
      if (!triggerLayout) {
        return {
          left: WINDOW_WIDTH / 2 - contentSize.width / 2,
          top: WINDOW_HEIGHT / 2 - contentSize.height / 2,
        };
      }

      let left = 0;
      let top = 0;

      if (side === "top" || side === "bottom") {
        if (align === "start") {
          left = triggerLayout.x;
        } else if (align === "center") {
          left =
            triggerLayout.x + triggerLayout.width / 2 - contentSize.width / 2;
        } else if (align === "end") {
          left = triggerLayout.x + triggerLayout.width - contentSize.width;
        }
      }

      if (side === "left" || side === "right") {
        if (align === "start") {
          top = triggerLayout.y;
        } else if (align === "center") {
          top =
            triggerLayout.y + triggerLayout.height / 2 - contentSize.height / 2;
        } else if (align === "end") {
          top = triggerLayout.y + triggerLayout.height - contentSize.height;
        }
      }

      if (side === "top") {
        top = triggerLayout.y - contentSize.height - sideOffset;
      } else if (side === "bottom") {
        top = triggerLayout.y + triggerLayout.height + sideOffset;
      } else if (side === "left") {
        left = triggerLayout.x - contentSize.width - sideOffset;
      } else if (side === "right") {
        left = triggerLayout.x + triggerLayout.width + sideOffset;
      }

      left = Math.max(
        16,
        Math.min(left, WINDOW_WIDTH - contentSize.width - 16)
      );
      top = Math.max(
        50,
        Math.min(top, WINDOW_HEIGHT - contentSize.height - 16)
      );

      return { left, top };
    };

    const getTransform = () => {
      const scale = { scale: scaleAnim };

      if (side === "top" || side === "bottom") {
        return [scale, { translateY: offsetAnim }];
      } else {
        return [scale, { translateX: offsetAnim }];
      }
    };

    return (
      <Modal
        visible={open}
        transparent
        animationType="none"
        statusBarTranslucent={true}
        onRequestClose={handleClose}
      >
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={StyleSheet.absoluteFill}>
            <Animated.View
              onLayout={handleContentLayout}
              style={[
                styles.tooltipContent,
                getPosition(),
                {
                  maxWidth:
                    side === "left" || side === "right"
                      ? WINDOW_WIDTH / 3
                      : WINDOW_WIDTH - 32,
                  opacity: opacityAnim,
                  transform: getTransform(),
                },
              ]}
              className={cn(
                "rounded-md bg-primary px-4 py-2",
                "min-w-[150px]",
                Platform.OS === "ios" ? "ios:shadow-md" : "android:elevation-3",
                className
              )}
              {...props}
            >
              <View>
                {typeof children === "string" ? (
                  <Text className="text-primary-foreground text-sm font-medium">
                    {children}
                  </Text>
                ) : (
                  children
                )}
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
);

TooltipContent.displayName = "TooltipContent";

const styles = StyleSheet.create({
  tooltipContent: {
    position: "absolute",
    zIndex: 1000,
  },
});

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
