import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/textarea";
import * as React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TextAreaExample() {
    const [text, setText] = React.useState("");
    const characterLimit = 200;

    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={100}
                >
                    <ScrollView
                        className="p-4"
                        keyboardShouldPersistTaps="handled"
                        keyboardDismissMode="on-drag"
                    >
                        <View className="mb-6">
                            <Text className="text-2xl font-bold mb-2 text-foreground">
                                TextArea
                            </Text>
                            <Text className="text-base mb-6 text-muted-foreground">
                                Displays a multi-line text input field for longer form content.
                            </Text>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Default TextArea
                            </Text>
                            <TextArea
                                placeholder="Type your message here..."
                                numberOfLines={4}
                            />
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                With Character Limit
                            </Text>
                            <View>
                                <TextArea
                                    placeholder="Write your bio (max 200 characters)..."
                                    value={text}
                                    onChangeText={setText}
                                    numberOfLines={4}
                                    maxLength={characterLimit}
                                />
                                <Text className="text-sm text-muted-foreground text-right mt-1">
                                    {text.length}/{characterLimit}
                                </Text>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                With Label
                            </Text>
                            <View>
                                <Text className="text-sm font-medium mb-2 text-foreground">
                                    Feedback
                                </Text>
                                <TextArea
                                    placeholder="Tell us what you think..."
                                    numberOfLines={4}
                                />
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Taller TextArea
                            </Text>
                            <TextArea
                                placeholder="For longer content..."
                                numberOfLines={8}
                                className="min-h-[200px]"
                            />
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Disabled TextArea
                            </Text>
                            <TextArea
                                editable={false}
                                placeholder="This textarea is disabled"
                                className="opacity-50"
                                numberOfLines={4}
                            />
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                With Submit Button
                            </Text>
                            <View>
                                <TextArea
                                    placeholder="Type your comment here..."
                                    numberOfLines={4}
                                    className="mb-3"
                                />
                                <Button>
                                    <Text className="font-bold text-primary-foreground">
                                        Submit
                                    </Text>
                                </Button>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}
