import { ComponentPreview } from "@/components/docs/component-preview";

export default function DialogPage() {
  return (
    <ComponentPreview
      name="Dialog"
      description="A dialog component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Dialog } from \"@nativeui/ui\";\n\nexport default function DialogDemo() {\n  return (\n    <Dialog>\n      Click me\n    </Dialog>\n  );\n}",
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
`}
      previewCode={`import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DialogExample() {
    const [name, setName] = React.useState("John Doe");
    const [email, setEmail] = React.useState("john@example.com");

    const [basicOpen, setBasicOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [successOpen, setSuccessOpen] = React.useState(false);
    const [loadingOpen, setLoadingOpen] = React.useState(false);

    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={100}
                >
                    <ScrollView className="flex-1 p-4">
                        <View className="mb-6">
                            <Text className="text-2xl font-bold mb-2 text-foreground">
                                Dialog
                            </Text>
                            <Text className="text-foregroundtext-base text-muted-foreground mb-6">
                                A modal dialog that interrupts the user with important content
                                and expects a response.
                            </Text>
                        </View>

                        {/* Basic Dialog */}
                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Basic Dialog
                            </Text>
                            <Dialog open={basicOpen} onOpenChange={setBasicOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="w-auto">
                                        <Text className="text-foreground">Open Dialog</Text>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Basic Dialog</DialogTitle>
                                        <DialogDescription>
                                            This is a basic dialog example with a title and
                                            description.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <View className="p-6 pt-0">
                                        <Text className="text-foreground">
                                            Dialogs are used to show important information that
                                            requires user attention or interaction.
                                        </Text>
                                    </View>
                                    <DialogFooter>
                                        <DialogClose>
                                            <Button variant="outline">
                                                <Text>Close</Text>
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </View>

                        {/* Edit Profile Dialog */}
                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Edit Profile Dialog
                            </Text>
                            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                                <DialogTrigger asChild>
                                    <Button>
                                        <Text className="text-primary-foreground">Edit Profile</Text>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edit Profile</DialogTitle>
                                        <DialogDescription>
                                            Make changes to your profile information.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <View className="p-6 pt-0 space-y-4">
                                        <View className="space-y-2">
                                            <Label nativeID="name">Name</Label>
                                            <Input
                                                id="name"
                                                value={name}
                                                onChangeText={setName}
                                                placeholder="Enter your name"
                                            />
                                        </View>
                                        <View className="space-y-2">
                                            <Label nativeID="email">Email</Label>
                                            <Input
                                                id="email"
                                                value={email}
                                                onChangeText={setEmail}
                                                placeholder="Enter your email"
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                            />
                                        </View>
                                    </View>
                                    <DialogFooter>
                                        <DialogClose>
                                            <Button variant="outline">
                                                <Text className="text-foreground">Cancel</Text>
                                            </Button>
                                        </DialogClose>
                                        <DialogClose>
                                            <Button>
                                                <Text className="text-primary-foreground">Save Changes</Text>
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </View>

                        {/* Destructive Action Dialog */}
                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Destructive Action Dialog
                            </Text>
                            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="destructive" className="w-auto">
                                        <Text>Delete Account</Text>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Delete Account</DialogTitle>
                                        <DialogDescription>
                                            Are you sure you want to delete your account? This action
                                            cannot be undone.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <View className="p-6 pt-0">
                                        <View className="bg-muted p-4 rounded-lg mb-4">
                                            <Text className="text-destructive font-medium mb-2">
                                                Warning
                                            </Text>
                                            <View className="space-y-2">
                                                <Text className="text-muted-foreground">
                                                    • All your data will be permanently deleted
                                                </Text>
                                                <Text className="text-muted-foreground">
                                                    • You will lose access to all your content
                                                </Text>
                                                <Text className="text-muted-foreground">
                                                    • Your username will become available for others
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <DialogFooter>
                                        <DialogClose>
                                            <Button variant="outline" className="mr-2">
                                                <Text>Cancel</Text>
                                            </Button>
                                        </DialogClose>
                                        <DialogClose>
                                            <Button variant="destructive">
                                                <Text>Delete Account</Text>
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </View>

                        {/* Success Dialog */}
                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Success Dialog
                            </Text>
                            <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        <Text className="text-foreground">Show Success</Text>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <View className="items-center">
                                            <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-4">
                                                <Ionicons name="checkmark" size={32} color="green" />
                                            </View>
                                            <DialogTitle>Payment Successful</DialogTitle>
                                            <DialogDescription>
                                                Your payment has been processed successfully.
                                            </DialogDescription>
                                        </View>
                                    </DialogHeader>
                                    <View className="p-6 pt-0">
                                        <View className="bg-muted p-4 rounded-lg">
                                            <Text className="text-muted-foreground text-center">
                                                Transaction ID: #123456789
                                            </Text>
                                        </View>
                                    </View>
                                    <DialogFooter>
                                        <DialogClose>
                                            <Button className="flex-1">
                                                <Text className="text-primary-foreground">View Receipt</Text>
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </View>

                        {/* Loading Dialog */}
                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Loading Dialog
                            </Text>
                            <Dialog open={loadingOpen} onOpenChange={setLoadingOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        <Text className="text-foreground">Show Loading</Text>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent showCloseButton={false}>
                                    <View className="p-6 items-center">
                                        <View className="w-12 h-12 mb-4">
                                            <Ionicons name="reload" size={48} color="#666" />
                                        </View>
                                        <Text className="text-lg font-semibold text-foreground mb-2">
                                            Processing
                                        </Text>
                                        <Text className="text-muted-foreground text-center">
                                            Please wait while we process your request...
                                        </Text>
                                    </View>
                                </DialogContent>
                            </Dialog>
                        </View>

                        <View className="h-20" />
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}
`}
      registryName="dialog"
      packageName="@nativeui/ui"
      dependencies={["react-native","@expo/vector-icons"]}
      changelog={[]}
    />
  );
}
