import { Separator } from "@/components/ui/separator";
import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SeparatorExample() {
    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <ScrollView className="p-4">
                    <View className="mb-6">
                        <Text className="text-2xl font-bold mb-2 text-foreground">
                            Separator
                        </Text>
                        <Text className="text-base mb-6 text-muted-foreground">
                            A visual divider between content areas.
                        </Text>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Horizontal Separator
                        </Text>
                        <View className="space-y-3">
                            <Text className="text-base text-foreground">
                                Above the separator
                            </Text>
                            <Separator className="my-4" />
                            <Text className="text-base text-foreground">
                                Below the separator
                            </Text>
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Vertical Separator
                        </Text>
                        <View className="flex-row h-16 items-center">
                            <Text className="text-base text-foreground">Blog</Text>
                            <View className="w-8 items-center">
                                <Separator orientation="vertical" />
                            </View>
                            <Text className="text-base text-foreground">Docs</Text>
                            <View className="w-8 items-center">
                                <Separator orientation="vertical" />
                            </View>
                            <Text className="text-base text-foreground">Source</Text>
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            With Custom Styling
                        </Text>
                        <View className="space-y-3">
                            <Text className="text-base text-foreground">
                                Default separator
                            </Text>
                            <Separator className="my-4" />
                            <Text className="text-base text-foreground">
                                Custom color and thickness
                            </Text>
                            <Separator className="my-4 h-0.5 bg-primary" />
                            <Text className="text-base text-foreground">
                                Custom width separator
                            </Text>
                            <Separator className="my-4 w-1/2" />
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            In Card Layout
                        </Text>
                        <View className="border border-border rounded-lg p-4">
                            <Text className="text-lg font-medium text-foreground">
                                Card Title
                            </Text>
                            <Separator className="my-4" />
                            <Text className="text-base text-muted-foreground">
                                Card content goes here with a separator to visually divide
                                sections.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
