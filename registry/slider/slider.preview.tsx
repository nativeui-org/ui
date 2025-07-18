import { Slider } from "@/components/ui/slider";
import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SliderExample() {
    const [volume, setVolume] = React.useState([50]);
    const [brightness, setBrightness] = React.useState([75]);
    const [temperature, setTemperature] = React.useState([22]);
    const [range, setRange] = React.useState([30, 70]);

    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <ScrollView className="p-4">
                    <View className="mb-8">
                        <Text className="text-2xl font-bold mb-2 text-foreground">
                            Slider
                        </Text>
                        <Text className="text-base mb-6 text-muted-foreground">
                            An input component for selecting a value or range from a given range.
                        </Text>
                    </View>

                    <View className="mb-10">
                        <Text className="text-xl font-semibold mb-5 text-foreground">
                            Basic Example
                        </Text>
                        <View className="rounded-lg p-4">
                            <Text className="text-foreground mb-2">Volume: {volume[0]}%</Text>
                            <Slider
                                value={volume}
                                onValueChange={setVolume}
                                className="mt-2"
                            />
                        </View>
                    </View>

                    <View className="mb-10">
                        <Text className="text-xl font-semibold mb-5 text-foreground">
                            Custom Min/Max
                        </Text>
                        <View className="rounded-lg p-4">
                            <Text className="text-foreground mb-2">Temperature: {temperature[0]}°C</Text>
                            <Slider
                                value={temperature}
                                onValueChange={setTemperature}
                                min={16}
                                max={30}
                                step={0.5}
                                className="mt-2"
                            />
                            <Text className="text-sm text-muted-foreground mt-2">
                                Range: 16°C - 30°C, Step: 0.5°C
                            </Text>
                        </View>
                    </View>

                    <View className="mb-10">
                        <Text className="text-xl font-semibold mb-5 text-foreground">
                            Range Slider
                        </Text>
                        <View className="rounded-lg p-4">
                            <Text className="text-foreground mb-2">
                                Price Range: ${range[0]} - ${range[1]}
                            </Text>
                            <Slider
                                value={range}
                                onValueChange={setRange}
                                min={0}
                                max={100}
                                className="mt-2"
                            />
                            <Text className="text-sm text-muted-foreground mt-2">
                                A slider with two thumbs for selecting a range of values
                            </Text>
                        </View>
                    </View>

                    <View className="mb-10">
                        <Text className="text-xl font-semibold mb-5 text-foreground">
                            Disabled State
                        </Text>
                        <View className="rounded-lg p-4">
                            <Text className="text-foreground mb-2">
                                Brightness: 75%
                            </Text>
                            <Slider
                                value={[75]}
                                disabled={true}
                                className="mt-2"
                            />
                            <Text className="text-sm text-muted-foreground mt-2">
                                A disabled slider is non-interactive
                            </Text>
                        </View>
                    </View>

                    <View className="mb-10">
                        <Text className="text-xl font-semibold mb-5 text-foreground">
                            Custom Styling
                        </Text>
                        <View className="rounded-lg p-4">
                            <Text className="text-foreground mb-2">
                                Brightness: {brightness[0]}%
                            </Text>
                            <Slider
                                value={brightness}
                                onValueChange={setBrightness}
                                className="mt-2"
                                trackClassName="bg-yellow-200"
                                rangeClassName="bg-yellow-500"
                                thumbClassName="border-yellow-500 bg-yellow-50"
                            />
                            <Text className="text-sm text-muted-foreground mt-2">
                                Custom styling applied to track, range and thumb
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
