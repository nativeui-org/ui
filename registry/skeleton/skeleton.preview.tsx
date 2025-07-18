import { Skeleton } from "@/components/ui/skeleton";
import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SkeletonExample() {
    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <ScrollView className="p-4">
                    <View className="mb-6">
                        <Text className="text-2xl font-bold mb-2 text-foreground">
                            Skeleton
                        </Text>
                        <Text className="text-base mb-6 text-muted-foreground">
                            A skeleton placeholder used to indicate content is loading.
                        </Text>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Basic Usage
                        </Text>
                        <View className="flex-row items-center gap-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <View className="gap-3">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </View>
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Card Skeleton
                        </Text>
                        <View className="p-4 border border-border rounded-lg">
                            <Skeleton className="h-40 w-full rounded-md mb-4" />
                            <Skeleton className="h-5 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-1/2" />
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            List Skeleton
                        </Text>
                        {[1, 2, 3].map((i) => (
                            <View key={i} className="flex-row items-center gap-4 mb-6">
                                <Skeleton className="h-14 w-14 rounded-lg" />
                                <View className="flex-1 gap-3">
                                    <Skeleton className="h-5 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </View>
                            </View>
                        ))}
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Profile Skeleton
                        </Text>
                        <View className="items-center">
                            <Skeleton className="h-24 w-24 rounded-full mb-6" />
                            <Skeleton className="h-6 w-40 mb-4" />
                            <Skeleton className="h-4 w-60 mb-6" />
                            <View className="flex-row gap-6 mt-2">
                                <Skeleton className="h-10 w-20 rounded-md" />
                                <Skeleton className="h-10 w-20 rounded-md" />
                                <Skeleton className="h-10 w-20 rounded-md" />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

export function SkeletonDemo() {
    return (
        <View className="flex-row items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <View className="gap-3">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </View>
        </View>
    );
}
