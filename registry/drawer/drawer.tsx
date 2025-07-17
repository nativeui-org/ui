import { cn } from "@/lib/utils";
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
