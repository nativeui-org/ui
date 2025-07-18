import { ComponentPreview } from "@/components/docs/component-preview";

export default function CarouselPage() {
  return (
    <ComponentPreview
      name="Carousel"
      description="A carousel component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Carousel } from \"@nativeui/ui\";\n\nexport default function CarouselDemo() {\n  return (\n    <Carousel>\n      Click me\n    </Carousel>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import * as React from "react";
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
          \`Image \${targetIndex + 1} of \${itemsCount}\`
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
                  accessibilityLabel={\`Go to image \${index + 1}\`}
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
                  accessibilityLabel={\`Go to image \${index + 1}\`}
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
`}
      previewCode={`import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const images = [
    {
        id: 1,
        title: "Mountain Landscape",
        description: "Beautiful mountain landscape with snow peaks",
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    },
    {
        id: 2,
        title: "Beach Sunset",
        description: "Stunning sunset view at the beach",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    {
        id: 3,
        title: "City Lights",
        description: "Night city view with bright lights",
        url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390",
    },
    {
        id: 4,
        title: "Forest Path",
        description: "Peaceful path through a green forest",
        url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    },
];

const InstagramPost = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const carouselRef = React.useRef<View>(null);

    const handleIndexChange = React.useCallback((index: number) => {
        setCurrentIndex(index);
    }, []);

    return (
        <View className="bg-card rounded-xl overflow-hidden">
            <View className="flex-row items-center p-3">
                <Image
                    source={{ uri: "https://avatars.githubusercontent.com/u/204157942?s=200&v=4" }}
                    className="w-8 h-8 rounded-full"
                />
                <Text className="ml-3 font-semibold text-foreground">shadcn</Text>
                <Pressable className="ml-auto">
                    <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
                </Pressable>
            </View>

            <View className="-mx-4">
                <Carousel
                    ref={carouselRef}
                    showControls={false}
                    showIndicators={false}
                    onIndexChange={handleIndexChange}
                    className="aspect-square"
                    loop={false}
                >
                    <CarouselContent>
                        {images.map((image) => (
                            <CarouselItem key={image.id} className="px-4">
                                <Image
                                    source={{ uri: image.url }}
                                    className="w-full h-full"
                                    resizeMode="cover"
                                />
                                {images.length > 1 && (
                                    <View
                                        className="absolute top-4 right-4 bg-black/50 px-2.5 py-1.5 rounded-full"
                                        style={{
                                            shadowColor: "#000",
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 3.84,
                                            elevation: 5
                                        }}
                                    >
                                        <Text className="text-white text-xs font-medium">
                                            {currentIndex + 1} / {images.length}
                                        </Text>
                                    </View>
                                )}
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </View>

            <View className="p-4">
                <View className="flex-row items-center gap-4 mb-3">
                    <Pressable>
                        <Ionicons name="heart-outline" size={24} color="#666" />
                    </Pressable>
                    <Pressable>
                        <Ionicons name="chatbubble-outline" size={24} color="#666" />
                    </Pressable>
                    <Pressable>
                        <Ionicons name="paper-plane-outline" size={24} color="#666" />
                    </Pressable>
                    {images.length > 1 && (
                        <View className="flex-row gap-1.5 flex-1 justify-center">
                            {images.map((_, idx) => (
                                <Pressable
                                    key={idx}
                                    onPress={() => {
                                        const carousel = carouselRef.current as any;
                                        if (carousel?.scrollTo) {
                                            carousel.scrollTo(idx);
                                        }
                                    }}
                                    className="rounded-full"
                                    style={{
                                        width: 6,
                                        height: 6,
                                        backgroundColor: currentIndex === idx ? "#000" : "#d1d5db"
                                    }}
                                />
                            ))}
                        </View>
                    )}
                    <Pressable>
                        <Ionicons name="bookmark-outline" size={24} color="#666" />
                    </Pressable>
                </View>

                <Text className="font-semibold text-foreground mb-1">
                    {images[currentIndex].title}
                </Text>
                <Text className="text-muted-foreground">
                    {images[currentIndex].description}
                </Text>
            </View>
        </View>
    );
};

export default function CarouselExample() {
    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
    const [customSlideIndex, setCustomSlideIndex] = React.useState(0);

    const handleCustomIndexChange = React.useCallback((index: number) => {
        setCustomSlideIndex(index);
    }, []);

    return (
        <SafeAreaView edges={["left", "right"]} className="flex-1 bg-background">
            <ScrollView className="flex-1">
                <View className="p-4">
                    <View className="mb-6">
                        <Text className="text-2xl font-bold mb-2 text-foreground">
                            Carousel
                        </Text>
                        <Text className="text-base text-muted-foreground mb-6">
                            A carousel component for cycling through elements like a slideshow.
                        </Text>
                    </View>

                    {/* Instagram-style Post */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Instagram-style Post
                        </Text>
                        <InstagramPost />
                    </View>

                    {/* Basic Carousel */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Basic Carousel
                        </Text>
                        <View className="-mx-4">
                            <Carousel indicatorStyle="dots">
                                <CarouselContent>
                                    {images.map((image) => (
                                        <CarouselItem key={image.id} className="px-4">
                                            <View className="relative">
                                                <Image
                                                    source={{ uri: image.url }}
                                                    className="w-full h-64 rounded-lg"
                                                    resizeMode="cover"
                                                />
                                                <View className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 rounded-b-lg">
                                                    <Text className="text-white text-lg font-semibold mb-1">
                                                        {image.title}
                                                    </Text>
                                                    <Text className="text-white/80 text-sm">
                                                        {image.description}
                                                    </Text>
                                                </View>
                                            </View>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        </View>
                    </View>

                    {/* Autoplay Carousel */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Autoplay Carousel
                        </Text>
                        <View className="-mx-4">
                            <Carousel
                                autoPlay
                                autoPlayInterval={5000}
                                indicatorStyle="numbers"
                                onIndexChange={setCurrentSlideIndex}
                            >
                                <CarouselContent>
                                    {images.map((image) => (
                                        <CarouselItem key={image.id} className="px-4">
                                            <Image
                                                source={{ uri: image.url }}
                                                className="w-full h-48 rounded-lg"
                                                resizeMode="cover"
                                            />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        </View>
                    </View>

                    {/* Vertical Carousel */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Vertical Carousel
                        </Text>
                        <View className="-mx-4">
                            <Carousel
                                className="h-96"
                                orientation="vertical"
                                indicatorStyle="lines"
                                onIndexChange={setCurrentSlideIndex}
                            >
                                <CarouselContent>
                                    {images.map((image) => (
                                        <CarouselItem key={image.id} className="px-4">
                                            <Image
                                                source={{ uri: image.url }}
                                                className="w-full h-full rounded-lg"
                                                resizeMode="cover"
                                            />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        </View>
                    </View>

                    {/* Custom Carousel */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Custom Carousel
                        </Text>
                        <View className="-mx-4">
                            <Carousel
                                className="bg-muted py-4"
                                showControls={false}
                                showIndicators={false}
                                onIndexChange={handleCustomIndexChange}
                                loop={false}
                            >
                                <CarouselContent>
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <CarouselItem key={index} className="px-4">
                                            <View className="items-center justify-center p-6 bg-card rounded-lg">
                                                <Text className="text-4xl font-semibold text-foreground">
                                                    {index + 1}
                                                </Text>
                                                <Text className="text-muted-foreground mt-2">
                                                    Slide {index + 1}
                                                </Text>
                                            </View>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>

                            {/* Custom Indicators */}
                            <View className="flex-row justify-center mt-4 gap-2">
                                {Array.from({ length: 5 }).map((_, idx) => (
                                    <Pressable
                                        key={idx}
                                        onPress={() => handleCustomIndexChange(idx)}
                                        className="rounded-full"
                                        style={{
                                            width: customSlideIndex === idx ? 24 : 8,
                                            height: 8,
                                            backgroundColor: customSlideIndex === idx ? "#000" : "#d1d5db"
                                        }}
                                    />
                                ))}
                            </View>
                        </View>
                    </View>

                    <View className="h-20" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
`}
      registryName="carousel"
      packageName="@nativeui/ui"
      dependencies={["react-native","@expo/vector-icons"]}
      changelog={[]}
    />
  );
}
