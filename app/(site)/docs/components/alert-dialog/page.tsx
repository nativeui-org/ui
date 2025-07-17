import { ComponentPreview } from "@/components/docs/component-preview";

export default function AlertDialogPage() {
  return (
    <ComponentPreview
      name="AlertDialog"
      description="A alert-dialog component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { AlertDialog } from \"@nativeui/ui\";\n\nexport default function AlertDialogDemo() {\n  return (\n    <AlertDialog>\n      Click me\n    </AlertDialog>\n  );\n}",
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
`}
      previewCode={`import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AlertDialogExample() {
    const [basicOpen, setBasicOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [criticalOpen, setCriticalOpen] = React.useState(false);
    const [customOpen, setCustomOpen] = React.useState(false);

    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <ScrollView className="flex-1 p-4">
                    <View className="mb-6">
                        <Text className="text-2xl font-bold mb-2 text-foreground">
                            Alert Dialog
                        </Text>
                        <Text className="text-base text-muted-foreground mb-6">
                            A modal dialog that interrupts the user with important content and
                            expects a response. Used for critical actions that require user
                            confirmation.
                        </Text>
                    </View>

                    {/* Basic Alert Dialog */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Basic Alert
                        </Text>
                        <AlertDialog open={basicOpen} onOpenChange={setBasicOpen}>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline">
                                    <Text className="text-foreground">Show Alert</Text>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. Please confirm that you want
                                        to proceed.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        <Button variant="outline">
                                            <Text className="text-foreground">Cancel</Text>
                                        </Button>
                                    </AlertDialogCancel>
                                    <AlertDialogAction>
                                        <Button>
                                            <Text className="text-primary-foreground">Continue</Text>
                                        </Button>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </View>

                    {/* Delete Alert Dialog */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Delete Confirmation
                        </Text>
                        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">
                                    <Ionicons name="trash-outline" size={20} className="color-primary" />
                                    <Text className="text-white ml-2">Delete Account</Text>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <View className="items-center mb-4">
                                        <View className="w-12 h-12 bg-destructive/10 rounded-full items-center justify-center">
                                            <Ionicons
                                                name="warning-outline"
                                                size={32}
                                                className="color-primary"
                                            />
                                        </View>
                                    </View>
                                    <AlertDialogTitle>Delete Account</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you absolutely sure you want to delete your account?
                                        This action cannot be undone and all your data will be
                                        permanently removed from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        <Button variant="outline">
                                            <Text className="text-foreground">Cancel</Text>
                                        </Button>
                                    </AlertDialogCancel>
                                    <AlertDialogAction>
                                        <Button variant="destructive">
                                            <Text className="text-foreground">Delete Account</Text>
                                        </Button>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </View>

                    {/* Critical Action Alert Dialog */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Critical Action
                        </Text>
                        <AlertDialog open={criticalOpen} onOpenChange={setCriticalOpen}>
                            <AlertDialogTrigger asChild>
                                <Button>
                                    <Text className="text-primary-foreground ml-2">Shutdown Server</Text>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <View className="items-center mb-4">
                                        <View className="w-12 h-12 bg-orange-100 rounded-full items-center justify-center">
                                            <Ionicons
                                                name="alert-circle-outline"
                                                size={32}
                                                className="color-primary"
                                            />
                                        </View>
                                    </View>
                                    <AlertDialogTitle>Critical Action</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        You are about to shutdown the production server. This will
                                        disconnect all active users and stop all running processes.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <View className="p-6 pt-2">
                                    <View className="bg-muted p-4 rounded-lg">
                                        <Text className="text-orange-600 font-medium mb-2">
                                            Impact of this action:
                                        </Text>
                                        <View className="space-y-2">
                                            <Text className="text-muted-foreground">
                                                • All user sessions will be terminated
                                            </Text>
                                            <Text className="text-muted-foreground">
                                                • Running processes will be stopped
                                            </Text>
                                            <Text className="text-muted-foreground">
                                                • Data not saved will be lost
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        <Button variant="outline">
                                            <Text className="text-foreground">Cancel</Text>
                                        </Button>
                                    </AlertDialogCancel>
                                    <AlertDialogAction>
                                        <Button variant="destructive">
                                            <Text className="text-foreground">Yes, Shutdown</Text>
                                        </Button>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </View>

                    {/* Custom Styled Alert Dialog */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Custom Styled
                        </Text>
                        <AlertDialog open={customOpen} onOpenChange={setCustomOpen}>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" className="bg-purple-100">
                                    <Ionicons name="star" size={20} className="color-primary" />
                                    <Text className="text-purple-600 ml-2">Premium Feature</Text>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <View className="items-center mb-4">
                                        <View className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center">
                                            <Ionicons name="star" size={32} className="color-primary" />
                                        </View>
                                    </View>
                                    <AlertDialogTitle>Upgrade to Premium</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This feature is only available for premium users. Upgrade
                                        your account to access exclusive features and benefits.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <View className="p-6 pt-2">
                                    <View className="bg-purple-50 p-4 rounded-lg">
                                        <Text className="text-purple-600 font-medium mb-2">
                                            Premium Benefits:
                                        </Text>
                                        <View className="space-y-2">
                                            <Text className="text-purple-600">
                                                • Unlimited access to all features
                                            </Text>
                                            <Text className="text-purple-600">
                                                • Priority customer support
                                            </Text>
                                            <Text className="text-purple-600">
                                                • Early access to new features
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        <Button variant="outline">
                                            <Text className="text-foreground">Maybe Later</Text>
                                        </Button>
                                    </AlertDialogCancel>
                                    <AlertDialogAction>
                                        <Button className="bg-purple-600">
                                            <Text className="text-primary-foreground">Upgrade Now</Text>
                                        </Button>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </View>

                    <View className="h-20" />
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
`}
      registryName="alert-dialog"
      packageName="@nativeui/ui"
      dependencies={["react-native"]}
      changelog={[]}
    />
  );
}
