import { Toggle } from "@/components/ui/toggle";
import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ToggleWithIcon = ({ pressed, onPressedChange }: { pressed?: boolean; onPressedChange?: (pressed: boolean) => void }) => (
    <Toggle pressed={pressed} onPressedChange={onPressedChange} className="gap-2">
        <Text className="text-foreground font-medium">Toggle with icon</Text>
        <Text className="text-foreground">🔔</Text>
    </Toggle>
);

const ToggleWithMultipleIcons = ({ pressed, onPressedChange }: { pressed?: boolean; onPressedChange?: (pressed: boolean) => void }) => (
    <Toggle pressed={pressed} onPressedChange={onPressedChange} className="gap-2">
        <Text className="text-foreground">🔔</Text>
        <Text className="text-foreground font-medium">Notifications</Text>
        <Text className="text-foreground">🔕</Text>
    </Toggle>
);

export default function ToggleExampleScreen() {
    // Basic toggles
    const [basicToggle, setBasicToggle] = React.useState(false);
    const [basicToggle2, setBasicToggle2] = React.useState(false);

    // Outline toggles
    const [outlineToggle, setOutlineToggle] = React.useState(false);
    const [outlineToggle2, setOutlineToggle2] = React.useState(false);

    // Icon toggles
    const [iconToggle, setIconToggle] = React.useState(false);
    const [multiIconToggle, setMultiIconToggle] = React.useState(false);

    // Size toggles
    const [smallToggle, setSmallToggle] = React.useState(false);
    const [defaultToggle, setDefaultToggle] = React.useState(false);
    const [largeToggle, setLargeToggle] = React.useState(false);

    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <ScrollView className="p-4">
                    <View className="mb-6">
                        <Text className="text-2xl font-bold mb-2 text-foreground">
                            Toggle
                        </Text>
                        <Text className="text-foreground mb-6 text-muted-foreground">
                            A two-state button that can be either on or off.
                        </Text>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Basic Toggle
                        </Text>
                        <View className="flex-row gap-4 flex-wrap">
                            <Toggle pressed={basicToggle} onPressedChange={setBasicToggle}>
                                <Text className="text-foreground font-medium">Toggle 1</Text>
                            </Toggle>
                            <Toggle pressed={basicToggle2} onPressedChange={setBasicToggle2}>
                                <Text className="text-foreground font-medium">Toggle 2</Text>
                            </Toggle>
                            <Toggle disabled>
                                <Text className="text-foreground font-medium">Disabled</Text>
                            </Toggle>
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Outline Variant
                        </Text>
                        <View className="flex-row gap-4 flex-wrap">
                            <Toggle
                                variant="outline"
                                pressed={outlineToggle}
                                onPressedChange={setOutlineToggle}
                            >
                                <Text className="text-foreground font-medium">Outline 1</Text>
                            </Toggle>
                            <Toggle
                                variant="outline"
                                pressed={outlineToggle2}
                                onPressedChange={setOutlineToggle2}
                            >
                                <Text className="text-foreground font-medium">Outline 2</Text>
                            </Toggle>
                            <Toggle
                                variant="outline"
                                disabled
                            >
                                <Text className="text-foreground font-medium">Disabled</Text>
                            </Toggle>
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Different Sizes
                        </Text>
                        <View className="flex-col gap-4">
                            <Toggle size="sm" pressed={smallToggle} onPressedChange={setSmallToggle}>
                                <Text className="text-sm text-foreground font-medium">Small Toggle</Text>
                            </Toggle>
                            <Toggle size="default" pressed={defaultToggle} onPressedChange={setDefaultToggle}>
                                <Text className="text-foreground font-medium">Default Toggle</Text>
                            </Toggle>
                            <Toggle size="lg" pressed={largeToggle} onPressedChange={setLargeToggle}>
                                <Text className="text-lg text-foreground font-medium">Large Toggle</Text>
                            </Toggle>
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            With Icons
                        </Text>
                        <View className="flex-col gap-4">
                            <ToggleWithIcon
                                pressed={iconToggle}
                                onPressedChange={setIconToggle}
                            />
                            <ToggleWithMultipleIcons
                                pressed={multiIconToggle}
                                onPressedChange={setMultiIconToggle}
                            />
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Combined Examples
                        </Text>
                        <View className="flex-col gap-4">
                            <Toggle
                                variant="outline"
                                size="lg"
                                pressed={outlineToggle}
                                onPressedChange={setOutlineToggle}
                                className="gap-2"
                            >
                                <Text className="text-foreground">🔔</Text>
                                <Text className="text-foreground text-lg font-medium">Large Outline with Icon</Text>
                            </Toggle>

                            <Toggle
                                size="sm"
                                pressed={smallToggle}
                                onPressedChange={setSmallToggle}
                                className="gap-2"
                            >
                                <Text className="text-foreground text-sm font-medium">Small with Icon</Text>
                                <Text className="text-sm">🔕</Text>
                            </Toggle>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
