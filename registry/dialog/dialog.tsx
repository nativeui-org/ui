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
  ScrollView,
} from "react-native";
import { cn } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";

interface DialogProps {
  children: React.ReactNode;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface DialogTriggerProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  asChild?: boolean;
}

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  onInteractOutside?: () => void;
}

interface DialogHeaderProps {
  className?: string;
  children: React.ReactNode;
}

interface DialogFooterProps {
  className?: string;
  children: React.ReactNode;
}

interface DialogTitleProps {
  className?: string;
  children: React.ReactNode;
}

interface DialogDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

interface DialogCloseProps {
  children: React.ReactElement<{ onPress?: (e: any) => void }>;
  className?: string;
}

const DialogContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
  handleClose?: () => void;
}>({
  open: false,
  setOpen: () => { },
});

const Dialog = React.forwardRef<View, DialogProps>(
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
      <DialogContext.Provider value={{ open: isOpen, setOpen }}>
        <View ref={ref} className={cn("", className)} {...props}>
          {children}
        </View>
      </DialogContext.Provider>
    );
  }
);

Dialog.displayName = "Dialog";

const DialogTrigger = React.forwardRef<View, DialogTriggerProps>(
  (
    { children, className, disabled = false, asChild = false, ...props },
    ref
  ) => {
    const { setOpen } = React.useContext(DialogContext);

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

DialogTrigger.displayName = "DialogTrigger";

const DialogContent = React.forwardRef<View, DialogContentProps>(
  (
    {
      children,
      className,
      showCloseButton = true,
      onInteractOutside,
      ...props
    },
    ref
  ) => {
    const { open, setOpen } = React.useContext(DialogContext);
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
      <DialogContext.Provider value={{ open: isVisible, setOpen, handleClose }}>
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
              handleClose();
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
                    <ScrollView bounces={false} className="max-h-[80vh]">
                      {showCloseButton && (
                        <Pressable
                          onPress={handleClose}
                          className="absolute right-4 top-4 z-50 rounded-full p-2 bg-muted/50"
                        >
                          <Ionicons name="close" size={24} color="#666" />
                        </Pressable>
                      )}
                      {children}
                    </ScrollView>
                  </Animated.View>
                </KeyboardAvoidingView>
              </TouchableWithoutFeedback>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Modal>
      </DialogContext.Provider>
    );
  }
);

DialogContent.displayName = "DialogContent";

const DialogHeader = React.forwardRef<View, DialogHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <View ref={ref} className={cn("flex-col gap-2 p-6", className)} {...props}>
      {children}
    </View>
  )
);

DialogHeader.displayName = "DialogHeader";

const DialogFooter = React.forwardRef<View, DialogFooterProps>(
  ({ className, children, ...props }, ref) => (
    <View
      ref={ref}
      className={cn(
        "flex-row justify-end items-center gap-3 p-6 pt-0",
        className
      )}
      {...props}
    >
      {children}
    </View>
  )
);

DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<Text, DialogTitleProps>(
  ({ className, children, ...props }, ref) => (
    <Text
      ref={ref}
      className={cn(
        "text-foreground text-xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </Text>
  )
);

DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<Text, DialogDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <Text
      ref={ref}
      className={cn("text-muted-foreground text-base mt-2", className)}
      {...props}
    >
      {children}
    </Text>
  )
);

DialogDescription.displayName = "DialogDescription";

const DialogClose = React.forwardRef<View, DialogCloseProps>(
  ({ children, ...props }, ref) => {
    const { handleClose } = React.useContext(DialogContext);

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

DialogClose.displayName = "DialogClose";

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
