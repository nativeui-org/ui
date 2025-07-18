import {
    RadioGroup,
    RadioGroupItem,
    RadioGroupLabel,
} from "@/components/ui/radio-group";
import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RadioGroupExample() {
    const [layoutPreference, setLayoutPreference] = React.useState("comfortable");
    const [notification, setNotification] = React.useState("all");
    const [theme, setTheme] = React.useState("system");

    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <ScrollView className="p-4">
                    <View className="mb-8">
                        <Text className="text-2xl font-bold mb-2 text-foreground">
                            Radio Group
                        </Text>
                        <Text className="text-base mb-6 text-muted-foreground">
                            A set of checkable buttons where only one can be checked at a
                            time.
                        </Text>
                    </View>

                    <View className="mb-10">
                        <Text className="text-xl font-semibold mb-5 text-foreground">
                            Basic Example
                        </Text>
                        <View className="rounded-lg">
                            <RadioGroup
                                value={layoutPreference}
                                onValueChange={setLayoutPreference}
                                className="space-y-0"
                            >
                                <View className="flex-row items-center">
                                    <RadioGroupItem value="default" id="r1" />
                                    <RadioGroupLabel htmlFor="r1">Default</RadioGroupLabel>
                                </View>
                                <View className="flex-row items-center mt-2">
                                    <RadioGroupItem value="comfortable" id="r2" />
                                    <RadioGroupLabel htmlFor="r2">Comfortable</RadioGroupLabel>
                                </View>
                                <View className="flex-row items-center mt-2">
                                    <RadioGroupItem value="compact" id="r3" />
                                    <RadioGroupLabel htmlFor="r3">Compact</RadioGroupLabel>
                                </View>
                            </RadioGroup>
                        </View>
                    </View>

                    <View className="mb-10">
                        <Text className="text-xl font-semibold mb-5 text-foreground">
                            Notifications Settings
                        </Text>
                        <View className="rounded-lg">
                            <Text className="text-base font-medium mb-4 text-foreground">
                                Notification Preferences
                            </Text>
                            <RadioGroup
                                value={notification}
                                onValueChange={setNotification}
                                className="space-y-0"
                            >
                                <View className="flex-row items-start">
                                    <RadioGroupItem value="all" id="n1" />
                                    <View className="">
                                        <RadioGroupLabel htmlFor="n1" className="font-medium">
                                            All Notifications
                                        </RadioGroupLabel>
                                        <Text className="text-sm text-muted-foreground mt-1 ml-3">
                                            Receive notifications for all activities and updates.
                                        </Text>
                                    </View>
                                </View>
                                <View className="flex-row items-start mt-4">
                                    <RadioGroupItem value="important" id="n2" />
                                    <View className="">
                                        <RadioGroupLabel htmlFor="n2" className="font-medium">
                                            Important Only
                                        </RadioGroupLabel>
                                        <Text className="text-sm text-muted-foreground mt-1 ml-3">
                                            Only receive notifications for important updates.
                                        </Text>
                                    </View>
                                </View>
                                <View className="flex-row items-start mt-4">
                                    <RadioGroupItem value="none" id="n3" />
                                    <View className="">
                                        <RadioGroupLabel htmlFor="n3" className="font-medium">
                                            None
                                        </RadioGroupLabel>
                                        <Text className="text-sm text-muted-foreground mt-1 ml-3">
                                            Turn off all notifications.
                                        </Text>
                                    </View>
                                </View>
                            </RadioGroup>
                        </View>
                    </View>

                    <View className="mb-10">
                        <Text className="text-xl font-semibold mb-5 text-foreground">
                            Disabled State
                        </Text>
                        <View className="rounded-lg">
                            <RadioGroup disabled value="light" className="space-y-0">
                                <View className="flex-row items-center">
                                    <RadioGroupItem value="light" id="t1" />
                                    <RadioGroupLabel htmlFor="t1" disabled>
                                        Light
                                    </RadioGroupLabel>
                                </View>
                                <View className="flex-row items-center mt-2">
                                    <RadioGroupItem value="dark" id="t2" />
                                    <RadioGroupLabel htmlFor="t2" disabled>
                                        Dark
                                    </RadioGroupLabel>
                                </View>
                                <View className="flex-row items-center mt-2">
                                    <RadioGroupItem value="system" id="t3" />
                                    <RadioGroupLabel htmlFor="t3" disabled>
                                        System
                                    </RadioGroupLabel>
                                </View>
                            </RadioGroup>
                        </View>
                    </View>

                    <View className="mb-10">
                        <Text className="text-xl font-semibold mb-5 text-foreground">
                            Theme Selection
                        </Text>
                        <View className="rounded-lg">
                            <RadioGroup
                                value={theme}
                                onValueChange={setTheme}
                                className="space-y-0"
                            >
                                <View className="flex-row items-center">
                                    <RadioGroupItem value="light" id="th1" />
                                    <RadioGroupLabel htmlFor="th1">Light</RadioGroupLabel>
                                </View>
                                <View className="flex-row items-center mt-2">
                                    <RadioGroupItem value="dark" id="th2" />
                                    <RadioGroupLabel htmlFor="th2">Dark</RadioGroupLabel>
                                </View>
                                <View className="flex-row items-center mt-2">
                                    <RadioGroupItem value="system" id="th3" />
                                    <RadioGroupLabel htmlFor="th3">System</RadioGroupLabel>
                                </View>
                            </RadioGroup>
                            <Text className="text-sm text-muted-foreground mt-4">
                                Current selection: {theme}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
