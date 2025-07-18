import { ComponentPreview } from "@/components/docs/component-preview";

export default function SheetPage() {
  return (
    <ComponentPreview
      name="Sheet"
      description="A sheet component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Sheet } from \"@nativeui/ui\";\n\nexport default function SheetDemo() {\n  return (\n    <Sheet>\n      Click me\n    </Sheet>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import * as React from "react";
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  Animated,
  Dimensions,
  StyleSheet,
  Easing,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView, Edge } from "react-native-safe-area-context";
import { cn } from "@/lib/utils";
import { Feather } from "@expo/vector-icons";

// Animation config constants
const ANIMATION = {
  OPEN: {
    BACKDROP_DURATION: 180,
    SPRING_VELOCITY: 3,
    SPRING_TENSION: 120,
    SPRING_FRICTION: 22,
  },
  CLOSE: {
    SPRING_FRICTION: 26,
    SPRING_TENSION: 100,
    SPRING_VELOCITY: 0.5,
    BACKDROP_DURATION: 280,
    BACKDROP_DELAY: 100,
  },
};

// Sheet sizes based on platform guidelines
const SHEET_SIZES = {
  SMALL: 0.3, // 30% of screen height
  MEDIUM: 0.5, // 50% of screen height
  LARGE: 0.7, // 70% of screen height
  FULL: 0.9, // 90% of screen height
};

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export type SheetSize = "small" | "medium" | "large" | "full" | number;

const resolveSheetSize = (size: SheetSize): number => {
  if (typeof size === "number") return size;

  switch (size) {
    case "small":
      return SHEET_SIZES.SMALL;
    case "medium":
      return SHEET_SIZES.MEDIUM;
    case "large":
      return SHEET_SIZES.LARGE;
    case "full":
      return SHEET_SIZES.FULL;
    default:
      return SHEET_SIZES.MEDIUM;
  }
};

interface SheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  size?: SheetSize;
  side?: "left" | "right" | "top" | "bottom";
  contentClassName?: string;
  avoidKeyboard?: boolean;
  closeOnBackdropPress?: boolean;
  disableBackHandler?: boolean;
}

interface SheetContextValue {
  close: () => void;
  isClosing: boolean;
  isAnimating: boolean;
  position: Animated.Value;
}

export const SheetContext = React.createContext<SheetContextValue>({
  close: () => { },
  isClosing: false,
  isAnimating: false,
  position: new Animated.Value(0),
});

export const useSheet = () => React.useContext(SheetContext);

const Sheet = React.forwardRef<View, SheetProps>(
  (
    {
      open,
      onClose,
      children,
      title,
      description,
      size = "medium",
      side = "right",
      contentClassName,
      avoidKeyboard = true,
      closeOnBackdropPress = true,
      disableBackHandler = false,
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const sheetSize = React.useMemo(() => resolveSheetSize(size), [size]);

    const translateValue = React.useRef(new Animated.Value(0)).current;
    const backdropOpacity = React.useRef(new Animated.Value(0)).current;
    const isClosing = React.useRef(false);
    const isAnimating = React.useRef(false);
    const hasInitializedOpen = React.useRef(false);

    const getInitialPosition = () => {
      switch (side) {
        case "left":
          return -SCREEN_WIDTH;
        case "right":
          return SCREEN_WIDTH;
        case "top":
          return -SCREEN_HEIGHT;
        case "bottom":
          return SCREEN_HEIGHT;
        default:
          return SCREEN_WIDTH;
      }
    };

    const getTargetPosition = () => {
      switch (side) {
        case "left":
        case "right":
          return 0;
        case "top":
        case "bottom":
          return 0;
        default:
          return 0;
      }
    };

    const getSheetDimensions = () => {
      switch (side) {
        case "left":
        case "right":
          return {
            width: SCREEN_WIDTH * sheetSize,
            height: SCREEN_HEIGHT,
          };
        case "top":
        case "bottom":
          return {
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT * sheetSize,
          };
        default:
          return {
            width: SCREEN_WIDTH * sheetSize,
            height: SCREEN_HEIGHT,
          };
      }
    };

    const animateOpen = React.useCallback(() => {
      if (isAnimating.current) {
        translateValue.stopAnimation();
        backdropOpacity.stopAnimation();
      }

      isAnimating.current = true;
      translateValue.setValue(getInitialPosition());
      backdropOpacity.setValue(0);
      isClosing.current = false;

      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: ANIMATION.OPEN.BACKDROP_DURATION,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start();

      Animated.spring(translateValue, {
        toValue: getTargetPosition(),
        useNativeDriver: true,
        velocity: ANIMATION.OPEN.SPRING_VELOCITY,
        tension: ANIMATION.OPEN.SPRING_TENSION,
        friction: ANIMATION.OPEN.SPRING_FRICTION,
      }).start(() => {
        isAnimating.current = false;
      });
    }, [backdropOpacity, translateValue]);

    const animateClose = React.useCallback(() => {
      if (isClosing.current) return;

      isClosing.current = true;

      if (isAnimating.current) {
        translateValue.stopAnimation();
        backdropOpacity.stopAnimation();
      }

      isAnimating.current = true;

      Animated.spring(translateValue, {
        toValue: getInitialPosition(),
        useNativeDriver: true,
        friction: ANIMATION.CLOSE.SPRING_FRICTION,
        tension: ANIMATION.CLOSE.SPRING_TENSION,
        velocity: ANIMATION.CLOSE.SPRING_VELOCITY,
      }).start();

      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: ANIMATION.CLOSE.BACKDROP_DURATION,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
        delay: ANIMATION.CLOSE.BACKDROP_DELAY,
      }).start(() => {
        requestAnimationFrame(() => {
          setIsVisible(false);
          isClosing.current = false;
          isAnimating.current = false;
          hasInitializedOpen.current = false;
          onClose();
        });
      });
    }, [backdropOpacity, translateValue, onClose]);

    React.useEffect(() => {
      if (open && !isVisible) {
        setIsVisible(true);
        return;
      }

      if (
        open &&
        isVisible &&
        !hasInitializedOpen.current &&
        !isClosing.current
      ) {
        animateOpen();
        hasInitializedOpen.current = true;
        return;
      }

      if (!open && isVisible && !isClosing.current) {
        animateClose();
      }
    }, [open, isVisible, animateOpen, animateClose]);

    const handleBackdropPress = React.useCallback(() => {
      if (closeOnBackdropPress && !isClosing.current) {
        animateClose();
      }
    }, [animateClose, closeOnBackdropPress]);

    const contextValue = React.useMemo(
      () => ({
        close: animateClose,
        isClosing: isClosing.current,
        isAnimating: isAnimating.current,
        position: translateValue,
      }),
      [animateClose, translateValue]
    );

    const getTransformStyle = () => {
      switch (side) {
        case "left":
        case "right":
          return { transform: [{ translateX: translateValue }] };
        case "top":
        case "bottom":
          return { transform: [{ translateY: translateValue }] };
        default:
          return { transform: [{ translateX: translateValue }] };
      }
    };

    const getSheetPosition = () => {
      switch (side) {
        case "left":
          return "left-0 top-0 bottom-0";
        case "right":
          return "right-0 top-0 bottom-0";
        case "top":
          return "top-0 left-0 right-0";
        case "bottom":
          return "bottom-0 left-0 right-0";
        default:
          return "right-0 top-0 bottom-0";
      }
    };

    const getSafeAreaEdges = (): Edge[] => {
      switch (side) {
        case "left":
        case "right":
          return ["top", "bottom"];
        case "top":
          return ["top", "left", "right"];
        case "bottom":
          return ["bottom", "left", "right"];
        default:
          return ["top", "bottom"];
      }
    };

    const renderContent = React.useCallback(
      () => (
        <View className="flex-1">
          <Animated.View
            style={[styles.backdrop, { opacity: backdropOpacity }]}
          >
            {closeOnBackdropPress && (
              <TouchableWithoutFeedback onPress={handleBackdropPress}>
                <View style={StyleSheet.absoluteFillObject} />
              </TouchableWithoutFeedback>
            )}
          </Animated.View>

          <Animated.View
            style={[
              styles.sheetContainer,
              getTransformStyle(),
              getSheetDimensions(),
            ]}
            className={cn(
              "absolute bg-popover",
              Platform.OS === "ios" ? "ios:shadow-xl" : "android:elevation-24",
              getSheetPosition(),
              contentClassName
            )}
          >
            <SafeAreaView edges={getSafeAreaEdges()} className="flex-1">
              <View className="flex-1">
                <View className="flex-row items-center justify-between p-4 border-b border-border">
                  <View className="flex-1">
                    {title && (
                      <Text className="text-lg font-semibold text-foreground">
                        {title}
                      </Text>
                    )}
                    {description && (
                      <Text className="text-sm text-muted-foreground mt-1">
                        {description}
                      </Text>
                    )}
                  </View>
                  <TouchableWithoutFeedback onPress={animateClose}>
                    <View className="p-2 rounded-full bg-muted/50">
                      <Feather name="x" size={20} color="#6B7280" />
                    </View>
                  </TouchableWithoutFeedback>
                </View>

                <View ref={ref} className="flex-1">
                  {children}
                </View>
              </View>
            </SafeAreaView>
          </Animated.View>
        </View>
      ),
      [
        animateClose,
        backdropOpacity,
        closeOnBackdropPress,
        contentClassName,
        description,
        title,
        translateValue,
        children,
        ref,
      ]
    );

    if (!isVisible) return null;

    return (
      <SheetContext.Provider value={contextValue}>
        <Modal
          visible={isVisible}
          transparent
          animationType="none"
          statusBarTranslucent
          onRequestClose={disableBackHandler ? undefined : animateClose}
        >
          {avoidKeyboard && Platform.OS === "ios" ? (
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1 }}
              keyboardVerticalOffset={10}
            >
              {renderContent()}
            </KeyboardAvoidingView>
          ) : (
            renderContent()
          )}
        </Modal>
      </SheetContext.Provider>
    );
  }
);

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  sheetContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 24,
  },
});

Sheet.displayName = "Sheet";

export { Sheet };
`}
      previewCode={`import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, useSheet } from "@/components/ui/sheet";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import * as React from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

const FeedbackForm = () => {
    const [selectedRating, setSelectedRating] = React.useState<number | null>(
        null
    );
    const [feedbackText, setFeedbackText] = React.useState("");
    const { close } = useSheet();

    const handleSubmit = () => {
        console.log({ rating: selectedRating, feedback: feedbackText });
        close();
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ScrollView className="p-4">
                <Text className="text-base mb-4 text-foreground">
                    We'd love to hear your thoughts on our application.
                </Text>

                <View className="mb-4">
                    <Text className="text-sm font-medium mb-2 text-foreground">
                        How would you rate your experience?
                    </Text>
                    <View className="flex-row justify-between">
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <Button
                                key={rating}
                                variant={selectedRating === rating ? "default" : "outline"}
                                size="icon"
                                className="w-10 h-10 rounded-full"
                                onPress={() => setSelectedRating(rating)}
                            >
                                <Text
                                    className={
                                        selectedRating === rating
                                            ? "text-primary-foreground"
                                            : "text-foreground"
                                    }
                                >
                                    {rating}
                                </Text>
                            </Button>
                        ))}
                    </View>
                </View>

                <View className="mb-4">
                    <Text className="text-sm font-medium mb-2 text-foreground">
                        Your comments
                    </Text>
                    <Input
                        multiline
                        textAlignVertical="top"
                        numberOfLines={4}
                        className="h-24 py-2"
                        placeholder="Type your feedback here..."
                        value={feedbackText}
                        onChangeText={setFeedbackText}
                    />
                </View>

                <Button onPress={handleSubmit}>
                    <Text className="text-primary-foreground">Submit</Text>
                </Button>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

const SettingsList = () => {
    return (
        <ScrollView>
            {[
                { icon: "person-outline" as IoniconName, label: "My Account" },
                {
                    icon: "notifications-outline" as IoniconName,
                    label: "Notifications",
                },
                { icon: "lock-closed-outline" as IoniconName, label: "Privacy" },
                { icon: "moon-outline" as IoniconName, label: "Theme" },
                {
                    icon: "globe-outline" as IoniconName,
                    label: "Language",
                },
                { icon: "help-circle-outline" as IoniconName, label: "Help & Support" },
                { icon: "information-circle-outline" as IoniconName, label: "About" },
                { icon: "log-out-outline" as IoniconName, label: "Logout" },
            ].map((item, index) => (
                <View key={index}>
                    <Button
                        variant="ghost"
                        className="flex-row h-14 items-center px-4 py-2 border-b border-border rounded-none justify-start"
                    >
                        <Ionicons
                            name={item.icon}
                            size={22}
                            color="#6B7280"
                            style={{ marginRight: 12 }}
                        />
                        <Text className="text-base text-foreground">{item.label}</Text>
                        <Ionicons
                            name="chevron-forward"
                            size={16}
                            color="#6B7280"
                            style={{ marginLeft: "auto" }}
                        />
                    </Button>
                </View>
            ))}
        </ScrollView>
    );
};

const LargeSheetContent = () => {
    const { close } = useSheet();

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
            <View className="p-4">
                <Text className="text-xl font-bold mb-4 text-foreground">
                    Section Title
                </Text>

                <Text className="text-base mb-4 text-foreground">
                    This sheet can be opened from different sides and with different sizes.
                    Try the various examples below to see how it adapts to different use
                    cases.
                </Text>

                <View className="bg-accent/20 rounded-lg p-4 mb-4">
                    <Text className="text-sm font-medium text-foreground mb-2">Tip</Text>
                    <Text className="text-sm text-muted-foreground">
                        The sheet component follows platform-specific guidelines for animations
                        and interactions, providing a native feel on both iOS and Android.
                    </Text>
                </View>

                <View className="h-px bg-border w-full my-4" />

                <Text className="text-base font-bold mb-2 text-foreground">
                    Features:
                </Text>

                {[
                    "Multiple side options (left, right, top, bottom)",
                    "Customizable sizes",
                    "Smooth animations",
                    "Keyboard aware",
                    "Backdrop press to close",
                    "Platform-specific styling",
                ].map((feature, index) => (
                    <View key={index} className="flex-row items-center py-2">
                        <View className="w-2 h-2 rounded-full bg-primary mr-2" />
                        <Text className="text-base text-foreground">{feature}</Text>
                    </View>
                ))}

                <View className="h-px bg-border w-full my-4" />

                <Text className="text-base font-bold mb-2 text-foreground">
                    Demo Content:
                </Text>

                {Array(10)
                    .fill(0)
                    .map((_, i) => (
                        <View key={i} className="py-3 border-b border-border">
                            <Text className="text-base text-foreground">
                                Content item {i + 1}
                            </Text>
                            <Text className="text-sm text-muted-foreground">
                                Additional description for this content item
                            </Text>
                        </View>
                    ))}

                <Button variant="outline" className="mt-6 mb-10" onPress={close}>
                    <Text className="text-foreground">Close Sheet</Text>
                </Button>
            </View>
        </ScrollView>
    );
};

export default function SheetExampleScreen() {
    const [rightSheetOpen, setRightSheetOpen] = React.useState(false);
    const [leftSheetOpen, setLeftSheetOpen] = React.useState(false);
    const [topSheetOpen, setTopSheetOpen] = React.useState(false);
    const [bottomSheetOpen, setBottomSheetOpen] = React.useState(false);
    const [feedbackSheetOpen, setFeedbackSheetOpen] = React.useState(false);
    const [settingsSheetOpen, setSettingsSheetOpen] = React.useState(false);
    const [largeSheetOpen, setLargeSheetOpen] = React.useState(false);

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Sheet",
                    headerRight: () => <ThemeToggle />,
                }}
            />

            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={100}
                >
                    <ScrollView className="p-4">
                        <View className="mb-6">
                            <Text className="text-2xl font-bold mb-2 text-foreground">
                                Sheet
                            </Text>
                            <Text className="text-base mb-6 text-muted-foreground">
                                A versatile sheet component that can slide in from any side of the
                                screen.
                            </Text>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Side Variations
                            </Text>
                            <View className="flex-row flex-wrap gap-2">
                                <Button onPress={() => setRightSheetOpen(true)}>
                                    <Text className="text-primary-foreground">Right Sheet</Text>
                                </Button>
                                <Button onPress={() => setLeftSheetOpen(true)}>
                                    <Text className="text-primary-foreground">Left Sheet</Text>
                                </Button>
                                <Button onPress={() => setTopSheetOpen(true)}>
                                    <Text className="text-primary-foreground">Top Sheet</Text>
                                </Button>
                                <Button onPress={() => setBottomSheetOpen(true)}>
                                    <Text className="text-primary-foreground">Bottom Sheet</Text>
                                </Button>
                            </View>

                            <Sheet
                                open={rightSheetOpen}
                                onClose={() => setRightSheetOpen(false)}
                                title="Right Sheet"
                                description="This sheet slides in from the right"
                                side="right"
                                size="medium"
                            >
                                <View className="p-4">
                                    <Text className="text-base text-foreground">
                                        This is a right sheet example. It slides in from the right
                                        side of the screen.
                                    </Text>
                                </View>
                            </Sheet>

                            <Sheet
                                open={leftSheetOpen}
                                onClose={() => setLeftSheetOpen(false)}
                                title="Left Sheet"
                                description="This sheet slides in from the left"
                                side="left"
                                size="medium"
                            >
                                <View className="p-4">
                                    <Text className="text-base text-foreground">
                                        This is a left sheet example. It slides in from the left side
                                        of the screen.
                                    </Text>
                                </View>
                            </Sheet>

                            <Sheet
                                open={topSheetOpen}
                                onClose={() => setTopSheetOpen(false)}
                                title="Top Sheet"
                                description="This sheet slides in from the top"
                                side="top"
                                size="medium"
                            >
                                <View className="p-4">
                                    <Text className="text-base text-foreground">
                                        This is a top sheet example. It slides in from the top of the
                                        screen.
                                    </Text>
                                </View>
                            </Sheet>

                            <Sheet
                                open={bottomSheetOpen}
                                onClose={() => setBottomSheetOpen(false)}
                                title="Bottom Sheet"
                                description="This sheet slides in from the bottom"
                                side="bottom"
                                size="medium"
                            >
                                <View className="p-4">
                                    <Text className="text-base text-foreground">
                                        This is a bottom sheet example. It slides in from the bottom
                                        of the screen.
                                    </Text>
                                </View>
                            </Sheet>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Sheet with Form
                            </Text>
                            <Button
                                variant="outline"
                                onPress={() => setFeedbackSheetOpen(true)}
                                className="bg-primary/10"
                            >
                                <Ionicons
                                    name="chatbubble-outline"
                                    size={20}
                                    color="#4F46E5"
                                    style={{ marginRight: 8 }}
                                />
                                <Text className="text-base font-medium text-primary">
                                    Leave Feedback
                                </Text>
                            </Button>

                            <Sheet
                                open={feedbackSheetOpen}
                                onClose={() => setFeedbackSheetOpen(false)}
                                title="Feedback"
                                description="Share your thoughts with us"
                                side="bottom"
                                size="large"
                            >
                                <FeedbackForm />
                            </Sheet>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Sheet with List
                            </Text>
                            <Button
                                variant="outline"
                                onPress={() => setSettingsSheetOpen(true)}
                                className="justify-between"
                            >
                                <View className="flex-row items-center">
                                    <Ionicons
                                        name="settings-outline"
                                        size={20}
                                        color="#6B7280"
                                        style={{ marginRight: 8 }}
                                    />
                                    <Text className="text-base text-foreground">Settings</Text>
                                </View>
                                <Ionicons name="chevron-up" size={16} color="#6B7280" />
                            </Button>

                            <Sheet
                                open={settingsSheetOpen}
                                onClose={() => setSettingsSheetOpen(false)}
                                title="Settings"
                                description="Manage your preferences"
                                side="right"
                                size="medium"
                            >
                                <SettingsList />
                            </Sheet>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Large Sheet with Complex Content
                            </Text>
                            <Button variant="secondary" onPress={() => setLargeSheetOpen(true)}>
                                <Text className="text-accent-foreground">
                                    View More Information
                                </Text>
                            </Button>

                            <Sheet
                                open={largeSheetOpen}
                                onClose={() => setLargeSheetOpen(false)}
                                title="Detailed Information"
                                description="Learn more about our features"
                                side="right"
                                size="large"
                            >
                                <LargeSheetContent />
                            </Sheet>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}
`}
      registryName="sheet"
      packageName="@nativeui/ui"
      dependencies={["react-native","react-native-safe-area-context","@expo/vector-icons"]}
      changelog={[]}
    />
  );
}
