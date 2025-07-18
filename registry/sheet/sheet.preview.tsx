import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, useSheet } from "@/components/ui/sheet";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import * as React from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

const FeedbackForm = () => {
    const [selectedRating, setSelectedRating] = React.useState<number | null>(
        null
    );
    const [feedbackText, setFeedbackText] = React.useState("");
    const { close } = useSheet();

    const handleSubmit = () => {
        console.log({ rating: selectedRating, feedback: feedbackText });
        close();
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ScrollView className="p-4">
                <Text className="text-base mb-4 text-foreground">
                    We'd love to hear your thoughts on our application.
                </Text>

                <View className="mb-4">
                    <Text className="text-sm font-medium mb-2 text-foreground">
                        How would you rate your experience?
                    </Text>
                    <View className="flex-row justify-between">
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <Button
                                key={rating}
                                variant={selectedRating === rating ? "default" : "outline"}
                                size="icon"
                                className="w-10 h-10 rounded-full"
                                onPress={() => setSelectedRating(rating)}
                            >
                                <Text
                                    className={
                                        selectedRating === rating
                                            ? "text-primary-foreground"
                                            : "text-foreground"
                                    }
                                >
                                    {rating}
                                </Text>
                            </Button>
                        ))}
                    </View>
                </View>

                <View className="mb-4">
                    <Text className="text-sm font-medium mb-2 text-foreground">
                        Your comments
                    </Text>
                    <Input
                        multiline
                        textAlignVertical="top"
                        numberOfLines={4}
                        className="h-24 py-2"
                        placeholder="Type your feedback here..."
                        value={feedbackText}
                        onChangeText={setFeedbackText}
                    />
                </View>

                <Button onPress={handleSubmit}>
                    <Text className="text-primary-foreground">Submit</Text>
                </Button>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

const SettingsList = () => {
    return (
        <ScrollView>
            {[
                { icon: "person-outline" as IoniconName, label: "My Account" },
                {
                    icon: "notifications-outline" as IoniconName,
                    label: "Notifications",
                },
                { icon: "lock-closed-outline" as IoniconName, label: "Privacy" },
                { icon: "moon-outline" as IoniconName, label: "Theme" },
                {
                    icon: "globe-outline" as IoniconName,
                    label: "Language",
                },
                { icon: "help-circle-outline" as IoniconName, label: "Help & Support" },
                { icon: "information-circle-outline" as IoniconName, label: "About" },
                { icon: "log-out-outline" as IoniconName, label: "Logout" },
            ].map((item, index) => (
                <View key={index}>
                    <Button
                        variant="ghost"
                        className="flex-row h-14 items-center px-4 py-2 border-b border-border rounded-none justify-start"
                    >
                        <Ionicons
                            name={item.icon}
                            size={22}
                            color="#6B7280"
                            style={{ marginRight: 12 }}
                        />
                        <Text className="text-base text-foreground">{item.label}</Text>
                        <Ionicons
                            name="chevron-forward"
                            size={16}
                            color="#6B7280"
                            style={{ marginLeft: "auto" }}
                        />
                    </Button>
                </View>
            ))}
        </ScrollView>
    );
};

const LargeSheetContent = () => {
    const { close } = useSheet();

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
            <View className="p-4">
                <Text className="text-xl font-bold mb-4 text-foreground">
                    Section Title
                </Text>

                <Text className="text-base mb-4 text-foreground">
                    This sheet can be opened from different sides and with different sizes.
                    Try the various examples below to see how it adapts to different use
                    cases.
                </Text>

                <View className="bg-accent/20 rounded-lg p-4 mb-4">
                    <Text className="text-sm font-medium text-foreground mb-2">Tip</Text>
                    <Text className="text-sm text-muted-foreground">
                        The sheet component follows platform-specific guidelines for animations
                        and interactions, providing a native feel on both iOS and Android.
                    </Text>
                </View>

                <View className="h-px bg-border w-full my-4" />

                <Text className="text-base font-bold mb-2 text-foreground">
                    Features:
                </Text>

                {[
                    "Multiple side options (left, right, top, bottom)",
                    "Customizable sizes",
                    "Smooth animations",
                    "Keyboard aware",
                    "Backdrop press to close",
                    "Platform-specific styling",
                ].map((feature, index) => (
                    <View key={index} className="flex-row items-center py-2">
                        <View className="w-2 h-2 rounded-full bg-primary mr-2" />
                        <Text className="text-base text-foreground">{feature}</Text>
                    </View>
                ))}

                <View className="h-px bg-border w-full my-4" />

                <Text className="text-base font-bold mb-2 text-foreground">
                    Demo Content:
                </Text>

                {Array(10)
                    .fill(0)
                    .map((_, i) => (
                        <View key={i} className="py-3 border-b border-border">
                            <Text className="text-base text-foreground">
                                Content item {i + 1}
                            </Text>
                            <Text className="text-sm text-muted-foreground">
                                Additional description for this content item
                            </Text>
                        </View>
                    ))}

                <Button variant="outline" className="mt-6 mb-10" onPress={close}>
                    <Text className="text-foreground">Close Sheet</Text>
                </Button>
            </View>
        </ScrollView>
    );
};

export default function SheetExampleScreen() {
    const [rightSheetOpen, setRightSheetOpen] = React.useState(false);
    const [leftSheetOpen, setLeftSheetOpen] = React.useState(false);
    const [topSheetOpen, setTopSheetOpen] = React.useState(false);
    const [bottomSheetOpen, setBottomSheetOpen] = React.useState(false);
    const [feedbackSheetOpen, setFeedbackSheetOpen] = React.useState(false);
    const [settingsSheetOpen, setSettingsSheetOpen] = React.useState(false);
    const [largeSheetOpen, setLargeSheetOpen] = React.useState(false);

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Sheet",
                    headerRight: () => <ThemeToggle />,
                }}
            />

            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={100}
                >
                    <ScrollView className="p-4">
                        <View className="mb-6">
                            <Text className="text-2xl font-bold mb-2 text-foreground">
                                Sheet
                            </Text>
                            <Text className="text-base mb-6 text-muted-foreground">
                                A versatile sheet component that can slide in from any side of the
                                screen.
                            </Text>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Side Variations
                            </Text>
                            <View className="flex-row flex-wrap gap-2">
                                <Button onPress={() => setRightSheetOpen(true)}>
                                    <Text className="text-primary-foreground">Right Sheet</Text>
                                </Button>
                                <Button onPress={() => setLeftSheetOpen(true)}>
                                    <Text className="text-primary-foreground">Left Sheet</Text>
                                </Button>
                                <Button onPress={() => setTopSheetOpen(true)}>
                                    <Text className="text-primary-foreground">Top Sheet</Text>
                                </Button>
                                <Button onPress={() => setBottomSheetOpen(true)}>
                                    <Text className="text-primary-foreground">Bottom Sheet</Text>
                                </Button>
                            </View>

                            <Sheet
                                open={rightSheetOpen}
                                onClose={() => setRightSheetOpen(false)}
                                title="Right Sheet"
                                description="This sheet slides in from the right"
                                side="right"
                                size="medium"
                            >
                                <View className="p-4">
                                    <Text className="text-base text-foreground">
                                        This is a right sheet example. It slides in from the right
                                        side of the screen.
                                    </Text>
                                </View>
                            </Sheet>

                            <Sheet
                                open={leftSheetOpen}
                                onClose={() => setLeftSheetOpen(false)}
                                title="Left Sheet"
                                description="This sheet slides in from the left"
                                side="left"
                                size="medium"
                            >
                                <View className="p-4">
                                    <Text className="text-base text-foreground">
                                        This is a left sheet example. It slides in from the left side
                                        of the screen.
                                    </Text>
                                </View>
                            </Sheet>

                            <Sheet
                                open={topSheetOpen}
                                onClose={() => setTopSheetOpen(false)}
                                title="Top Sheet"
                                description="This sheet slides in from the top"
                                side="top"
                                size="medium"
                            >
                                <View className="p-4">
                                    <Text className="text-base text-foreground">
                                        This is a top sheet example. It slides in from the top of the
                                        screen.
                                    </Text>
                                </View>
                            </Sheet>

                            <Sheet
                                open={bottomSheetOpen}
                                onClose={() => setBottomSheetOpen(false)}
                                title="Bottom Sheet"
                                description="This sheet slides in from the bottom"
                                side="bottom"
                                size="medium"
                            >
                                <View className="p-4">
                                    <Text className="text-base text-foreground">
                                        This is a bottom sheet example. It slides in from the bottom
                                        of the screen.
                                    </Text>
                                </View>
                            </Sheet>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Sheet with Form
                            </Text>
                            <Button
                                variant="outline"
                                onPress={() => setFeedbackSheetOpen(true)}
                                className="bg-primary/10"
                            >
                                <Ionicons
                                    name="chatbubble-outline"
                                    size={20}
                                    color="#4F46E5"
                                    style={{ marginRight: 8 }}
                                />
                                <Text className="text-base font-medium text-primary">
                                    Leave Feedback
                                </Text>
                            </Button>

                            <Sheet
                                open={feedbackSheetOpen}
                                onClose={() => setFeedbackSheetOpen(false)}
                                title="Feedback"
                                description="Share your thoughts with us"
                                side="bottom"
                                size="large"
                            >
                                <FeedbackForm />
                            </Sheet>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Sheet with List
                            </Text>
                            <Button
                                variant="outline"
                                onPress={() => setSettingsSheetOpen(true)}
                                className="justify-between"
                            >
                                <View className="flex-row items-center">
                                    <Ionicons
                                        name="settings-outline"
                                        size={20}
                                        color="#6B7280"
                                        style={{ marginRight: 8 }}
                                    />
                                    <Text className="text-base text-foreground">Settings</Text>
                                </View>
                                <Ionicons name="chevron-up" size={16} color="#6B7280" />
                            </Button>

                            <Sheet
                                open={settingsSheetOpen}
                                onClose={() => setSettingsSheetOpen(false)}
                                title="Settings"
                                description="Manage your preferences"
                                side="right"
                                size="medium"
                            >
                                <SettingsList />
                            </Sheet>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Large Sheet with Complex Content
                            </Text>
                            <Button variant="secondary" onPress={() => setLargeSheetOpen(true)}>
                                <Text className="text-accent-foreground">
                                    View More Information
                                </Text>
                            </Button>

                            <Sheet
                                open={largeSheetOpen}
                                onClose={() => setLargeSheetOpen(false)}
                                title="Detailed Information"
                                description="Learn more about our features"
                                side="right"
                                size="large"
                            >
                                <LargeSheetContent />
                            </Sheet>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}
