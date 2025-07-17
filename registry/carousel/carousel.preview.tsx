import {
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
