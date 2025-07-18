import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import * as React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LabelExample() {
    const [switchValue, setSwitchValue] = React.useState(false);
    const [textValue, setTextValue] = React.useState("");

    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={100}
                >
                    <ScrollView className="p-4">
                        <View className="mb-6">
                            <Text className="text-2xl font-bold mb-2 text-foreground">
                                Label
                            </Text>
                            <Text className="text-base mb-6 text-muted-foreground">
                                Renders an accessible label associated with controls.
                            </Text>
                        </View>

                        {/* Basic Label with Input */}
                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Basic Label with Input
                            </Text>
                            <View className="space-y-4">
                                <View>
                                    <Label nativeID="input1" className="mb-2">
                                        Your name
                                    </Label>
                                    <Input
                                        aria-labelledby="input1"
                                        placeholder="Enter your name"
                                        value={textValue}
                                        onChangeText={setTextValue}
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Required Label */}
                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Required Label
                            </Text>
                            <View className="space-y-4">
                                <View>
                                    <Label nativeID="input2" required className="mb-2">
                                        Email address
                                    </Label>
                                    <Input
                                        aria-labelledby="input2"
                                        placeholder="Enter your email"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Disabled Label */}
                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Disabled Label
                            </Text>
                            <View className="space-y-4">
                                <View>
                                    <Label nativeID="input3" disabled className="mb-2">
                                        Disabled field
                                    </Label>
                                    <Input
                                        aria-labelledby="input3"
                                        placeholder="This field is disabled"
                                        editable={false}
                                        className="bg-muted"
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Label with Switch */}
                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Label with Switch
                            </Text>
                            <View className="space-y-4">
                                {/* Basic Switch */}
                                <View className="flex-row items-center justify-between">
                                    <Label nativeID="switch1">Airplane Mode</Label>
                                    <Switch
                                        aria-labelledby="switch1"
                                        checked={switchValue}
                                        onCheckedChange={setSwitchValue}
                                    />
                                </View>

                                {/* Disabled Switch */}
                                <View className="flex-row items-center justify-between">
                                    <Label nativeID="switch2" disabled>
                                        Bluetooth (Disabled)
                                    </Label>
                                    <Switch aria-labelledby="switch2" checked={false} disabled />
                                </View>
                            </View>
                        </View>

                        {/* Clickable Label */}
                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Clickable Label
                            </Text>
                            <View className="space-y-4">
                                <Label
                                    onPress={() => console.log("Label pressed")}
                                    className="text-primary"
                                >
                                    Click me to trigger an action
                                </Label>
                            </View>
                        </View>

                        {/* Different Text Styles */}
                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Text Styles
                            </Text>
                            <View className="space-y-4">
                                <Label className="text-lg font-bold text-primary">
                                    Large Primary Label
                                </Label>
                                <Label className="text-sm text-muted-foreground">
                                    Small Muted Label
                                </Label>
                                <Label className="text-base text-destructive">
                                    Destructive Label
                                </Label>
                            </View>
                        </View>

                        {/* Form Group Example */}
                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Form Group Example
                            </Text>
                            <View className="space-y-4">
                                <View>
                                    <Label nativeID="username" required className="mb-2">
                                        Username
                                    </Label>
                                    <Input
                                        aria-labelledby="username"
                                        placeholder="Enter username"
                                        autoCapitalize="none"
                                    />
                                    <Text className="text-sm text-muted-foreground mt-1">
                                        This will be your public display name.
                                    </Text>
                                </View>
                                <View className="flex-row items-center justify-between mt-4">
                                    <Label nativeID="notifications" className="flex-1 mr-4">
                                        Enable notifications
                                    </Label>
                                    <Switch
                                        aria-labelledby="notifications"
                                        checked={switchValue}
                                        onCheckedChange={setSwitchValue}
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Extra padding to ensure good scroll */}
                        <View className="h-20" />
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}
