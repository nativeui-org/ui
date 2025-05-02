import * as React from "react";
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
  Easing,
} from "react-native";
import { cn } from "@/lib/utils";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  snapPoints?: number[];
  initialSnapIndex?: number;
  className?: string;
  contentClassName?: string;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const DEFAULT_SNAP_POINTS = [0.5, 0.9]; // 0.5 = 50% of screen height, 0.9 = 90% of screen height

export const DrawerContext = React.createContext<{ animateClose: () => void }>({
  animateClose: () => {},
});

export const useDrawer = () => React.useContext(DrawerContext);

const Drawer = React.forwardRef<View, DrawerProps>(
  (
    {
      open,
      onClose,
      children,
      title,
      snapPoints = DEFAULT_SNAP_POINTS,
      initialSnapIndex = 0,
      className,
      contentClassName,
    },
    ref
  ) => {
    const snapPointsPixels = snapPoints.map(
      (point) => SCREEN_HEIGHT - SCREEN_HEIGHT * point
    );

    const activeSnapIndex = React.useRef(initialSnapIndex);
    const translateY = React.useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const backdropOpacity = React.useRef(new Animated.Value(0)).current;
    const isClosing = React.useRef(false);

    const animateOpen = React.useCallback(() => {
      translateY.setValue(SCREEN_HEIGHT);
      backdropOpacity.setValue(0);
      isClosing.current = false;

      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start();

      Animated.spring(translateY, {
        toValue: snapPointsPixels[initialSnapIndex],
        useNativeDriver: true,
        velocity: 3,
        tension: 120,
        friction: 22,
      }).start();

      activeSnapIndex.current = initialSnapIndex;
    }, [backdropOpacity, translateY, snapPointsPixels, initialSnapIndex]);

    const animateClose = React.useCallback(() => {
      if (isClosing.current) return;

      isClosing.current = true;

      Animated.spring(translateY, {
        toValue: SCREEN_HEIGHT,
        useNativeDriver: true,
        friction: 26,
        tension: 100,
        velocity: 0.5,
      }).start();

      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 280,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
        delay: 100,
      }).start(() => {
        onClose();
        isClosing.current = false;
      });
    }, [backdropOpacity, translateY, onClose]);

    React.useEffect(() => {
      if (open && !isClosing.current) {
        animateOpen();
      }
    }, [open, animateOpen]);

    // Ensure drawer animates close when open becomes false
    React.useEffect(() => {
      if (!open && !isClosing.current) {
        animateClose();
      }
    }, [open, animateClose]);

    const animateToSnapPoint = (index: number, velocity = 0) => {
      if (index < 0 || index >= snapPointsPixels.length) return;

      activeSnapIndex.current = index;

      Animated.spring(translateY, {
        toValue: snapPointsPixels[index],
        useNativeDriver: true,
        velocity: velocity,
        tension: 120,
        friction: 22,
      }).start();
    };

    const getTargetSnapIndex = (
      currentY: number,
      velocity: number,
      dragDirection: "up" | "down"
    ) => {
      const isDraggingDown = dragDirection === "down";

      if (
        activeSnapIndex.current === snapPointsPixels.length - 1 &&
        isDraggingDown
      ) {
        return snapPointsPixels.length - 2;
      }

      if (activeSnapIndex.current === 1 && isDraggingDown && velocity > 0.3) {
        return 0;
      }

      if (activeSnapIndex.current === 0 && isDraggingDown && velocity > 0.5) {
        return -1;
      }

      if (currentY > snapPointsPixels[0] + 100) {
        return -1;
      }

      if (dragDirection === "up" && velocity > 0.3) {
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
    };

    const panResponder = React.useMemo(() => {
      let startY = 0;
      const maxDragPoint = snapPointsPixels[snapPointsPixels.length - 1];

      return PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, { dy }) => Math.abs(dy) > 5,

        onPanResponderGrant: (_, { y0 }) => {
          startY = y0;
          translateY.stopAnimation();
        },

        onPanResponderMove: (_, { dy }) => {
          if (isClosing.current) return;

          const currentSnapY = snapPointsPixels[activeSnapIndex.current];
          let newY = currentSnapY + dy;

          if (newY < maxDragPoint) {
            const overscroll = maxDragPoint - newY;
            const resistedOverscroll = -Math.log10(1 + overscroll * 0.1) * 10;
            newY = maxDragPoint + resistedOverscroll;
          }

          translateY.setValue(newY);
        },

        onPanResponderRelease: (_, { dy, vy, moveY }) => {
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
    }, [snapPointsPixels, onClose, translateY, animateClose]);

    if (!open) return null;

    return (
      <DrawerContext.Provider value={{ animateClose }}>
        <Modal
          visible={open}
          transparent
          animationType="none"
          statusBarTranslucent
          onRequestClose={animateClose}
        >
          <View className="flex-1">
            <Animated.View
              style={[styles.backdrop, { opacity: backdropOpacity }]}
            >
              <TouchableWithoutFeedback onPress={animateClose}>
                <View style={StyleSheet.absoluteFillObject} />
              </TouchableWithoutFeedback>
            </Animated.View>

            <Animated.View
              style={[styles.drawerContainer, { transform: [{ translateY }] }]}
              className={cn(
                "absolute bottom-0 left-0 right-0 bg-popover rounded-t-xl overflow-hidden",
                Platform.OS === "ios"
                  ? "ios:shadow-xl"
                  : "android:elevation-24",
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

              <View ref={ref} className="flex-1">
                {children}
              </View>
            </Animated.View>
          </View>
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
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 24,
  },
});

Drawer.displayName = "Drawer";

export { Drawer };
