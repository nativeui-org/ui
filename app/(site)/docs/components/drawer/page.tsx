import { ComponentPreview } from "@/components/docs/component-preview";

export default function DrawerPage() {
  return (
    <ComponentPreview
      name="Drawer"
      description="A drawer component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Drawer } from \"@nativeui/ui\";\n\nexport default function DrawerDemo() {\n  return (\n    <Drawer>\n      Click me\n    </Drawer>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import { cn } from "@/lib/utils";
import * as React from "react";
import {
  Animated,
  Dimensions,
  Easing,
  KeyboardAvoidingView,
  Modal,
  PanResponder,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
  SNAP: {
    SPRING_TENSION: 120,
    SPRING_FRICTION: 22,
  },
};

// Drag behavior constants
const DRAG = {
  THRESHOLD: 5,
  CLOSE_DISTANCE: 100,
  VELOCITY_THRESHOLD: {
    UP: 0.3,
    DOWN: 0.5,
  },
  RESISTANCE: 0.1,
};

// Drawer sizes - Definition of preset snap points
const DRAWER_SIZES = {
  SMALL: [0.3, 0.5], // Small drawer that can be extended to 50%
  MEDIUM: [0.5, 0.8], // Medium drawer that can be extended to 80%
  LARGE: [0.6, 0.8, 0.95], // Large drawer with size options
  FULL: [0.8, 0.95], // Full screen with reduced option
};

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export type DrawerSize = "small" | "medium" | "large" | "full" | number[];

const resolveSnapPoints = (size: DrawerSize): number[] => {
  if (Array.isArray(size)) return size;

  switch (size) {
    case "small":
      return DRAWER_SIZES.SMALL;
    case "medium":
      return DRAWER_SIZES.MEDIUM;
    case "large":
      return DRAWER_SIZES.LARGE;
    case "full":
      return DRAWER_SIZES.FULL;
    default:
      return DRAWER_SIZES.MEDIUM;
  }
};

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: DrawerSize;
  initialSnapIndex?: number;
  snapPoints?: number[];
  contentClassName?: string;
  avoidKeyboard?: boolean;
  closeOnBackdropPress?: boolean;
  disableBackHandler?: boolean;
}

interface DrawerContextValue {
  close: () => void;
  snapTo: (index: number) => void;
  currentSnapIndex: number;
  snapPoints: number[];
  isClosing: boolean;
  isAnimating: boolean;
  position: Animated.Value;
}

export const DrawerContext = React.createContext<DrawerContextValue>({
  close: () => { },
  snapTo: () => { },
  currentSnapIndex: 0,
  snapPoints: DRAWER_SIZES.MEDIUM,
  isClosing: false,
  isAnimating: false,
  position: new Animated.Value(0),
});

export const useDrawer = () => React.useContext(DrawerContext);

const Drawer = React.forwardRef<View, DrawerProps>(
  (
    {
      open,
      onClose,
      children,
      title,
      size = "medium",
      initialSnapIndex = 0,
      snapPoints: providedSnapPoints,
      contentClassName,
      avoidKeyboard = true,
      closeOnBackdropPress = true,
      disableBackHandler = false,
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const snapPoints = React.useMemo(
      () => providedSnapPoints || resolveSnapPoints(size),
      [size, providedSnapPoints]
    );
    const snapPointsPixels = React.useMemo(
      () => snapPoints.map((point) => SCREEN_HEIGHT - SCREEN_HEIGHT * point),
      [snapPoints]
    );

    const activeSnapIndex = React.useRef(initialSnapIndex);
    const translateY = React.useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const backdropOpacity = React.useRef(new Animated.Value(0)).current;
    const isClosing = React.useRef(false);
    const isAnimating = React.useRef(false);
    const hasInitializedOpen = React.useRef(false);

    const animateOpen = React.useCallback(() => {
      if (isAnimating.current) {
        translateY.stopAnimation();
        backdropOpacity.stopAnimation();
      }

      isAnimating.current = true;
      translateY.setValue(SCREEN_HEIGHT);
      backdropOpacity.setValue(0);
      isClosing.current = false;

      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: ANIMATION.OPEN.BACKDROP_DURATION,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start();

      Animated.spring(translateY, {
        toValue: snapPointsPixels[initialSnapIndex],
        useNativeDriver: true,
        velocity: ANIMATION.OPEN.SPRING_VELOCITY,
        tension: ANIMATION.OPEN.SPRING_TENSION,
        friction: ANIMATION.OPEN.SPRING_FRICTION,
      }).start(() => {
        isAnimating.current = false;
        activeSnapIndex.current = initialSnapIndex;
      });
    }, [backdropOpacity, translateY, snapPointsPixels, initialSnapIndex]);

    const animateClose = React.useCallback(() => {
      if (isClosing.current) return;

      isClosing.current = true;

      if (isAnimating.current) {
        translateY.stopAnimation();
        backdropOpacity.stopAnimation();
      }

      isAnimating.current = true;

      Animated.spring(translateY, {
        toValue: SCREEN_HEIGHT,
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
    }, [backdropOpacity, translateY, onClose]);

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
        isClosing.current = true;
        isAnimating.current = true;

        Animated.spring(translateY, {
          toValue: SCREEN_HEIGHT,
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
      }
    }, [backdropOpacity, translateY, onClose, closeOnBackdropPress]);

    const animateToSnapPoint = React.useCallback(
      (index: number, velocity = 0) => {
        if (
          index < 0 ||
          index >= snapPointsPixels.length ||
          isAnimating.current
        )
          return;

        isAnimating.current = true;
        activeSnapIndex.current = index;

        Animated.spring(translateY, {
          toValue: snapPointsPixels[index],
          useNativeDriver: true,
          velocity: velocity,
          tension: ANIMATION.SNAP.SPRING_TENSION,
          friction: ANIMATION.SNAP.SPRING_FRICTION,
        }).start(() => {
          isAnimating.current = false;
        });
      },
      [snapPointsPixels]
    );

    const getTargetSnapIndex = React.useCallback(
      (currentY: number, velocity: number, dragDirection: "up" | "down") => {
        const isDraggingDown = dragDirection === "down";

        if (
          activeSnapIndex.current === snapPointsPixels.length - 1 &&
          isDraggingDown
        ) {
          return snapPointsPixels.length - 2 >= 0
            ? snapPointsPixels.length - 2
            : 0;
        }

        if (
          activeSnapIndex.current === 1 &&
          isDraggingDown &&
          velocity > DRAG.VELOCITY_THRESHOLD.UP
        ) {
          return 0;
        }

        if (
          activeSnapIndex.current === 0 &&
          isDraggingDown &&
          velocity > DRAG.VELOCITY_THRESHOLD.DOWN
        ) {
          return -1;
        }

        if (currentY > snapPointsPixels[0] + DRAG.CLOSE_DISTANCE) {
          return -1;
        }

        if (dragDirection === "up" && velocity > DRAG.VELOCITY_THRESHOLD.UP) {
          const nextIndex = Math.min(
            activeSnapIndex.current + 1,
            snapPointsPixels.length - 1
          );
          return nextIndex;
        }

        let closestIndex = 0;
        let minDistance = Math.abs(currentY - snapPointsPixels[0]);

        for (let i = 1; i < snapPointsPixels.length; i++) {
          const distance = Math.abs(currentY - snapPointsPixels[i]);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = i;
          }
        }

        return closestIndex;
      },
      [snapPointsPixels]
    );

    const panResponder = React.useMemo(() => {
      let startY = 0;
      const maxDragPoint = snapPointsPixels.length
        ? snapPointsPixels[snapPointsPixels.length - 1]
        : 0;

      return PanResponder.create({
        onStartShouldSetPanResponder: () =>
          !isClosing.current && !isAnimating.current,
        onMoveShouldSetPanResponder: (_, { dy }) =>
          !isClosing.current &&
          !isAnimating.current &&
          Math.abs(dy) > DRAG.THRESHOLD,

        onPanResponderGrant: (_, { y0 }) => {
          startY = y0;
          translateY.stopAnimation();
          isAnimating.current = false;
        },

        onPanResponderMove: (_, { dy }) => {
          if (isClosing.current) return;

          const currentSnapY = snapPointsPixels[activeSnapIndex.current];
          let newY = currentSnapY + dy;

          if (newY < maxDragPoint) {
            const overscroll = maxDragPoint - newY;
            const resistedOverscroll =
              -Math.log10(1 + overscroll * DRAG.RESISTANCE) * 10;
            newY = maxDragPoint + resistedOverscroll;
          }

          translateY.setValue(newY);
        },

        onPanResponderRelease: (_, { dy, vy }) => {
          if (isClosing.current) return;

          const dragDirection = dy > 0 ? "down" : "up";
          const currentY = snapPointsPixels[activeSnapIndex.current] + dy;
          const absVelocity = Math.abs(vy);

          const targetIndex = getTargetSnapIndex(
            currentY,
            absVelocity,
            dragDirection
          );

          if (targetIndex === -1) {
            animateClose();
          } else {
            animateToSnapPoint(targetIndex, vy);
          }
        },
      });
    }, [
      snapPointsPixels,
      animateClose,
      animateToSnapPoint,
      getTargetSnapIndex,
    ]);

    const contextValue = React.useMemo(
      () => ({
        close: animateClose,
        snapTo: animateToSnapPoint,
        currentSnapIndex: activeSnapIndex.current,
        snapPoints,
        isClosing: isClosing.current,
        isAnimating: isAnimating.current,
        position: translateY,
      }),
      [animateClose, animateToSnapPoint, snapPoints, translateY]
    );

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
            style={[styles.drawerContainer, { transform: [{ translateY }] }]}
            className={cn(
              "absolute bottom-0 left-0 right-0 bg-popover rounded-t-xl overflow-hidden",
              Platform.OS === "ios" ? "ios:shadow-xl" : "android:elevation-24",
              contentClassName
            )}
          >

            <View {...panResponder.panHandlers}>
              <View className="w-full items-center py-2">
                <View className="w-10 h-1 rounded-full bg-muted-foreground/30" />
              </View>

              {title && (
                <View className="px-4 pt-1 pb-3 border-b border-border">
                  <Text className="text-xl font-medium text-center text-foreground">
                    {title}
                  </Text>
                </View>
              )}
            </View>

            <SafeAreaView className="flex-1" edges={["bottom"]}>
              <View ref={ref} className="flex-1">
                {children}
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
        panResponder.panHandlers,
        title,
        translateY,
        children,
        ref,
      ]
    );

    if (!isVisible) return null;

    return (
      <DrawerContext.Provider value={contextValue}>
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
      </DrawerContext.Provider>
    );
  }
);

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  drawerContainer: {
    height: SCREEN_HEIGHT,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 24,
  },
});

Drawer.displayName = "Drawer";

export { Drawer };
`}
      previewCode={`import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Drawer, useDrawer } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
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
    const { close } = useDrawer();

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
    const [language, setLanguage] = React.useState("");

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
                    hasSelect: true,
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

// Composant pour le grand drawer avec contenu complexe
const LargeDrawerContent = () => {
    const { close } = useDrawer();

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
            <View className="p-4">
                <Text className="text-xl font-bold mb-4 text-foreground">
                    Section Title
                </Text>

                <Text className="text-base mb-4 text-foreground">
                    This drawer has three snap points and opens initially at the middle
                    point. Drag it up to see all content, or down for a reduced view.
                </Text>

                <View className="bg-accent/20 rounded-lg p-4 mb-4">
                    <Text className="text-sm font-medium text-foreground mb-2">Tip</Text>
                    <Text className="text-sm text-muted-foreground">
                        For a better user experience, the drawer uses fluid animations and
                        progressive resistance when you try to drag beyond the limits.
                    </Text>
                </View>

                <View className="h-px bg-border w-full my-4" />

                <Text className="text-base font-bold mb-2 text-foreground">
                    Features:
                </Text>

                {[
                    "Multiple configurable snap points",
                    "Fluid spring animations",
                    "Responsive drag behavior",
                    "Close by dragging down or touching the backdrop",
                    "Support for complex scrollable content",
                    "Easy customization via classes",
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

                {Array(15)
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
                    <Text className="text-foreground">Close Drawer</Text>
                </Button>
            </View>
        </ScrollView>
    );
};

export default function DrawerExampleScreen() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [feedbackDrawerOpen, setFeedbackDrawerOpen] = React.useState(false);
    const [settingsDrawerOpen, setSettingsDrawerOpen] = React.useState(false);
    const [largeDrawerOpen, setLargeDrawerOpen] = React.useState(false);

    // Simplifier l'implémentation pour éviter le double-tap
    const openBasicDrawer = React.useCallback(() => setDrawerOpen(true), []);
    const closeBasicDrawer = React.useCallback(() => setDrawerOpen(false), []);

    const openFeedbackDrawer = React.useCallback(
        () => setFeedbackDrawerOpen(true),
        []
    );
    const closeFeedbackDrawer = React.useCallback(
        () => setFeedbackDrawerOpen(false),
        []
    );

    const openSettingsDrawer = React.useCallback(
        () => setSettingsDrawerOpen(true),
        []
    );
    const closeSettingsDrawer = React.useCallback(
        () => setSettingsDrawerOpen(false),
        []
    );

    const openLargeDrawer = React.useCallback(() => setLargeDrawerOpen(true), []);
    const closeLargeDrawer = React.useCallback(
        () => setLargeDrawerOpen(false),
        []
    );

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Drawer",
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
                                Drawer
                            </Text>
                            <Text className="text-base mb-6 text-muted-foreground">
                                A bottom sheet component that can be dragged up and down with
                                snap points.
                            </Text>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Basic Drawer
                            </Text>
                            <Button onPress={openBasicDrawer}>
                                <Text className="text-primary-foreground">Open Drawer</Text>
                            </Button>

                            <Drawer
                                open={drawerOpen}
                                onClose={closeBasicDrawer}
                                title="Drawer Example"
                                size={[0.4, 0.8]}
                                initialSnapIndex={0}
                            >
                                <View className="p-4">
                                    <Text className="text-base mb-4 text-foreground">
                                        This is an example of drawer content. You can drag this
                                        drawer up to see more content.
                                    </Text>

                                    <View className="h-px bg-border w-full my-4" />

                                    <Text className="text-sm text-muted-foreground">
                                        Try dragging this drawer up and down.
                                    </Text>
                                </View>
                            </Drawer>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Drawer with Form
                            </Text>
                            <Button
                                variant="outline"
                                onPress={openFeedbackDrawer}
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

                            <Drawer
                                open={feedbackDrawerOpen}
                                onClose={closeFeedbackDrawer}
                                title="Feedback"
                                size="medium"
                                initialSnapIndex={0}
                            >
                                <FeedbackForm />
                            </Drawer>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Drawer with List
                            </Text>
                            <Button
                                variant="outline"
                                onPress={openSettingsDrawer}
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

                            <Drawer
                                open={settingsDrawerOpen}
                                onClose={closeSettingsDrawer}
                                title="Settings"
                                size="large"
                                initialSnapIndex={0}
                            >
                                <SettingsList />
                            </Drawer>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Large Drawer with Complex Content
                            </Text>
                            <Button variant="secondary" onPress={openLargeDrawer}>
                                <Text className="text-accent-foreground">
                                    View More Information
                                </Text>
                            </Button>

                            <Drawer
                                open={largeDrawerOpen}
                                onClose={closeLargeDrawer}
                                title="Detailed Information"
                                size={[0.3, 0.7, 0.95]}
                                initialSnapIndex={1}
                            >
                                <LargeDrawerContent />
                            </Drawer>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}
`}
      registryName="drawer"
      packageName="@nativeui/ui"
      dependencies={["react-native","react-native-safe-area-context"]}
      changelog={[]}
    />
  );
}
