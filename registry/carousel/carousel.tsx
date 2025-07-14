import * as React from "react";
import {
  View,
  Text,
  Pressable,
  Dimensions,
  ScrollView,
  AccessibilityInfo,
} from "react-native";
import { cn } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";

type CarouselContextProps = {
  scrollViewRef: React.RefObject<ScrollView | null>;
  currentIndex: number;
  scrollTo: (index: number) => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  itemsCount: number;
  orientation?: "horizontal" | "vertical";
};

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  orientation?: "horizontal" | "vertical";
  showControls?: boolean;
  showIndicators?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  loop?: boolean;
  indicatorStyle?: "dots" | "lines" | "numbers";
  onIndexChange?: (index: number) => void;
}

const Carousel = React.forwardRef<View, CarouselProps>(
  (
    {
      children,
      className,
      orientation = "horizontal",
      showControls = true,
      showIndicators = true,
      autoPlay = false,
      autoPlayInterval = 3000,
      loop = true,
      indicatorStyle = "dots",
      onIndexChange,
      ...props
    },
    ref
  ) => {
    const scrollViewRef = React.useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [itemsCount, setItemsCount] = React.useState(0);
    const dimensions = {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
    };

    const canScrollPrev = currentIndex > 0 || loop;
    const canScrollNext = currentIndex < itemsCount - 1 || loop;

    const scrollTo = React.useCallback(
      (index: number) => {
        if (!scrollViewRef.current) return;

        let targetIndex = index;
        if (index < 0) {
          targetIndex = loop ? itemsCount - 1 : 0;
        } else if (index >= itemsCount) {
          targetIndex = loop ? 0 : itemsCount - 1;
        }

        const offset =
          orientation === "horizontal"
            ? targetIndex * dimensions.width
            : targetIndex * dimensions.height;

        scrollViewRef.current.scrollTo({
          [orientation === "horizontal" ? "x" : "y"]: offset,
          animated: true,
        });

        setCurrentIndex(targetIndex);
        onIndexChange?.(targetIndex);
        AccessibilityInfo.announceForAccessibility(
          `Image ${targetIndex + 1} of ${itemsCount}`
        );
      },
      [orientation, dimensions, itemsCount, onIndexChange, loop]
    );

    const handleScroll = React.useCallback(
      (event: any) => {
        const {
          nativeEvent: { contentOffset, layoutMeasurement },
        } = event;
        const offset =
          orientation === "horizontal" ? contentOffset.x : contentOffset.y;
        const size =
          orientation === "horizontal"
            ? layoutMeasurement.width
            : layoutMeasurement.height;
        const index = Math.round(offset / size);

        if (index !== currentIndex) {
          setCurrentIndex(index);
          onIndexChange?.(index);
        }
      },
      [orientation, currentIndex, onIndexChange]
    );

    React.useEffect(() => {
      if (autoPlay && canScrollNext) {
        const interval = setInterval(() => {
          if (currentIndex < itemsCount - 1) {
            scrollTo(currentIndex + 1);
          } else if (loop) {
            scrollTo(0);
          }
        }, autoPlayInterval);

        return () => clearInterval(interval);
      }
    }, [currentIndex, autoPlay, autoPlayInterval, loop, itemsCount, scrollTo]);

    const renderIndicator = () => {
      switch (indicatorStyle) {
        case "lines":
          return (
            <View
              className={cn(
                "absolute flex-row justify-center items-center gap-1.5 z-10",
                orientation === "horizontal"
                  ? "bottom-4 left-0 right-0"
                  : "right-4 top-1/2 -translate-y-1/2 flex-col"
              )}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              {Array.from({ length: itemsCount }).map((_, index) => (
                <Pressable
                  key={index}
                  onPress={() => scrollTo(index)}
                  accessibilityRole="button"
                  accessibilityLabel={`Go to image ${index + 1}`}
                  accessibilityState={{ selected: currentIndex === index }}
                  style={[
                    {
                      height: orientation === "horizontal" ? 2 : 16,
                      width:
                        orientation === "horizontal"
                          ? currentIndex === index
                            ? 16
                            : 8
                          : 2,
                      borderRadius: 2,
                      backgroundColor:
                        currentIndex === index
                          ? "#3b82f6"
                          : "rgba(255, 255, 255, 0.5)",
                    },
                  ]}
                />
              ))}
            </View>
          );
        case "numbers":
          return (
            <View
              className={cn(
                "absolute bg-black/50 px-2.5 py-1.5 rounded-full z-10",
                orientation === "horizontal"
                  ? "bottom-4 right-4"
                  : "right-4 top-4"
              )}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <Text className="text-white text-sm font-medium">
                {currentIndex + 1} / {itemsCount}
              </Text>
            </View>
          );
        default:
          return (
            <View
              className={cn(
                "absolute flex-row justify-center items-center gap-2 z-10",
                orientation === "horizontal"
                  ? "bottom-4 left-0 right-0"
                  : "right-4 top-1/2 -translate-y-1/2 flex-col"
              )}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              {Array.from({ length: itemsCount }).map((_, index) => (
                <Pressable
                  key={index}
                  onPress={() => scrollTo(index)}
                  accessibilityRole="button"
                  accessibilityLabel={`Go to image ${index + 1}`}
                  accessibilityState={{ selected: currentIndex === index }}
                  style={[
                    {
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      transform: [{ scale: currentIndex === index ? 1.25 : 1 }],
                      backgroundColor:
                        currentIndex === index
                          ? "#3b82f6"
                          : "rgba(255, 255, 255, 0.5)",
                    },
                  ]}
                />
              ))}
            </View>
          );
      }
    };

    return (
      <CarouselContext.Provider
        value={{
          scrollViewRef,
          currentIndex,
          scrollTo,
          canScrollPrev,
          canScrollNext,
          itemsCount,
          orientation,
        }}
      >
        <View
          ref={ref}
          className={cn("relative", className)}
          {...props}
          style={{ width: dimensions.width }}
          accessibilityRole="tablist"
          accessibilityLabel="Image carousel"
        >
          <ScrollView
            ref={scrollViewRef}
            horizontal={orientation === "horizontal"}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            pagingEnabled
            onScroll={handleScroll}
            scrollEventThrottle={16}
            onContentSizeChange={(w, h) => {
              setItemsCount(
                Math.ceil(
                  (orientation === "horizontal" ? w : h) /
                  (orientation === "horizontal"
                    ? dimensions.width
                    : dimensions.height)
                )
              );
            }}
          >
            {children}
          </ScrollView>

          {showControls && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}

          {showIndicators && renderIndicator()}
        </View>
      </CarouselContext.Provider>
    );
  }
);

Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  View,
  React.ComponentProps<typeof View>
>(({ className, children, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <View
      ref={ref}
      className={cn(
        "flex",
        orientation === "horizontal" ? "flex-row" : "flex-col",
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
});

CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<View, React.ComponentProps<typeof View>>(
  ({ className, children, ...props }, ref) => {
    const { orientation } = useCarousel();
    const dimensions = Dimensions.get("window");

    return (
      <View
        ref={ref}
        className={cn("flex-1", className)}
        style={{
          width: orientation === "horizontal" ? dimensions.width : "100%",
          height: orientation === "vertical" ? dimensions.height : "100%",
        }}
        accessibilityRole="tab"
        {...props}
      >
        {children}
      </View>
    );
  }
);

CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
  View,
  React.ComponentProps<typeof View>
>(({ className, ...props }, ref) => {
  const { scrollTo, currentIndex, canScrollPrev, orientation } = useCarousel();

  if (!canScrollPrev) return null;

  return (
    <Pressable
      onPress={() => scrollTo(currentIndex - 1)}
      className={cn(
        "absolute z-10 p-3 rounded-full bg-background/50 backdrop-blur-sm",
        orientation === "horizontal"
          ? "left-4 top-1/2 -translate-y-1/2"
          : "left-1/2 -translate-x-1/2 top-4",
        className
      )}
      accessibilityRole="button"
      accessibilityLabel="Previous image"
      {...props}
    >
      <Ionicons
        name={orientation === "horizontal" ? "chevron-back" : "chevron-up"}
        size={28}
        color="#000"
      />
    </Pressable>
  );
});

CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<View, React.ComponentProps<typeof View>>(
  ({ className, ...props }, ref) => {
    const { scrollTo, currentIndex, canScrollNext, orientation } =
      useCarousel();

    if (!canScrollNext) return null;

    return (
      <Pressable
        onPress={() => scrollTo(currentIndex + 1)}
        className={cn(
          "absolute z-10 p-3 rounded-full bg-background/50 backdrop-blur-sm",
          orientation === "horizontal"
            ? "right-4 top-1/2 -translate-y-1/2"
            : "left-1/2 -translate-x-1/2 bottom-4",
          className
        )}
        accessibilityRole="button"
        accessibilityLabel="Next image"
        {...props}
      >
        <Ionicons
          name={
            orientation === "horizontal" ? "chevron-forward" : "chevron-down"
          }
          size={28}
          color="#000"
        />
      </Pressable>
    );
  }
);

CarouselNext.displayName = "CarouselNext";

export {
  type CarouselProps,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
