import * as React from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { cn } from "@/lib/utils";

interface AlertDialogProps {
  children: React.ReactNode;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface AlertDialogTriggerProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  asChild?: boolean;
}

interface AlertDialogContentProps {
  children: React.ReactNode;
  className?: string;
  onInteractOutside?: () => void;
}

interface AlertDialogHeaderProps {
  className?: string;
  children: React.ReactNode;
}

interface AlertDialogFooterProps {
  className?: string;
  children: React.ReactNode;
}

interface AlertDialogTitleProps {
  className?: string;
  children: React.ReactNode;
}

interface AlertDialogDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

interface AlertDialogActionProps {
  children: React.ReactElement<{ onPress?: (e: any) => void }>;
  className?: string;
}

interface AlertDialogCancelProps {
  children: React.ReactElement<{ onPress?: (e: any) => void }>;
  className?: string;
}

const AlertDialogContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
  handleClose?: () => void;
}>({
  open: false,
  setOpen: () => { },
});

const AlertDialog = React.forwardRef<View, AlertDialogProps>(
  ({ children, className, open = false, onOpenChange, ...props }, ref) => {
    const [internalOpen, setInternalOpen] = React.useState(false);

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
      <AlertDialogContext.Provider value={{ open: isOpen, setOpen }}>
        <View ref={ref} className={cn("", className)} {...props}>
          {children}
        </View>
      </AlertDialogContext.Provider>
    );
  }
);

AlertDialog.displayName = "AlertDialog";

const AlertDialogTrigger = React.forwardRef<View, AlertDialogTriggerProps>(
  (
    { children, className, disabled = false, asChild = false, ...props },
    ref
  ) => {
    const { setOpen } = React.useContext(AlertDialogContext);

    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement<{
        onPress?: (e: any) => void;
        ref?: React.Ref<any>;
        disabled?: boolean;
      }>;
      return React.cloneElement(child, {
        ...props,
        ref,
        onPress: (e: any) => {
          child.props?.onPress?.(e);
          setOpen(true);
        },
        disabled,
      });
    }

    return (
      <Pressable
        ref={ref}
        className={cn("", className)}
        disabled={disabled}
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        {...props}
      >
        {children}
      </Pressable>
    );
  }
);

AlertDialogTrigger.displayName = "AlertDialogTrigger";

const AlertDialogContent = React.forwardRef<View, AlertDialogContentProps>(
  ({ children, className, onInteractOutside, ...props }, ref) => {
    const { open, setOpen } = React.useContext(AlertDialogContext);
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const scaleAnim = React.useRef(new Animated.Value(0.95)).current;
    const { height: SCREEN_HEIGHT } = Dimensions.get("window");
    const [isVisible, setIsVisible] = React.useState(open);

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

    if (!isVisible) return null;

    return (
      <AlertDialogContext.Provider
        value={{ open: isVisible, setOpen, handleClose }}
      >
        <Modal
          visible={isVisible}
          transparent
          statusBarTranslucent
          animationType="none"
          onRequestClose={handleClose}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              onInteractOutside?.();
            }}
          >
            <Animated.View
              className="flex-1 justify-center items-center bg-black/50"
              style={{ opacity: fadeAnim }}
            >
              <TouchableWithoutFeedback>
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : undefined}
                  keyboardVerticalOffset={
                    Platform.OS === "ios" ? -SCREEN_HEIGHT * 0.2 : 0
                  }
                >
                  <Animated.View
                    ref={ref}
                    className={cn(
                      "bg-background m-6 rounded-2xl",
                      "w-[85%] max-w-sm",
                      Platform.OS === "ios"
                        ? "ios:shadow-xl"
                        : "android:elevation-8",
                      className
                    )}
                    style={{
                      transform: [{ scale: scaleAnim }],
                    }}
                    {...props}
                  >
                    {children}
                  </Animated.View>
                </KeyboardAvoidingView>
              </TouchableWithoutFeedback>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Modal>
      </AlertDialogContext.Provider>
    );
  }
);

AlertDialogContent.displayName = "AlertDialogContent";

const AlertDialogHeader = React.forwardRef<View, AlertDialogHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <View
      ref={ref}
      className={cn("flex-col gap-2 p-6 pb-0", className)}
      {...props}
    >
      {children}
    </View>
  )
);

AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = React.forwardRef<View, AlertDialogFooterProps>(
  ({ className, children, ...props }, ref) => (
    <View
      ref={ref}
      className={cn(
        "flex-row justify-end items-center gap-3 p-6 pt-4",
        className
      )}
      {...props}
    >
      {children}
    </View>
  )
);

AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<Text, AlertDialogTitleProps>(
  ({ className, children, ...props }, ref) => (
    <Text
      ref={ref}
      className={cn(
        "text-foreground text-xl font-semibold leading-none tracking-tight text-center",
        className
      )}
      {...props}
    >
      {children}
    </Text>
  )
);

AlertDialogTitle.displayName = "AlertDialogTitle";

const AlertDialogDescription = React.forwardRef<
  Text,
  AlertDialogDescriptionProps
>(({ className, children, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn(
      "text-muted-foreground text-base mt-2 text-center",
      className
    )}
    {...props}
  >
    {children}
  </Text>
));

AlertDialogDescription.displayName = "AlertDialogDescription";

const AlertDialogAction = React.forwardRef<View, AlertDialogActionProps>(
  ({ children, ...props }, ref) => {
    const { handleClose } = React.useContext(AlertDialogContext);

    return React.cloneElement(children, {
      ...children.props,
      ...props,
      onPress: (e: any) => {
        children.props?.onPress?.(e);
        handleClose?.();
      },
    });
  }
);

AlertDialogAction.displayName = "AlertDialogAction";

const AlertDialogCancel = React.forwardRef<View, AlertDialogCancelProps>(
  ({ children, ...props }, ref) => {
    const { handleClose } = React.useContext(AlertDialogContext);

    return React.cloneElement(children, {
      ...children.props,
      ...props,
      onPress: (e: any) => {
        children.props?.onPress?.(e);
        handleClose?.();
      },
    });
  }
);

AlertDialogCancel.displayName = "AlertDialogCancel";

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
