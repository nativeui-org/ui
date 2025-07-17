import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import * as React from "react";
import { Image, Text, View } from "react-native";

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
];

export const CarousselExample = () => {

    return (
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
    );
}
