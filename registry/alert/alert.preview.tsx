import {
    Alert,
    AlertDescription,
    AlertTitle
} from "@/components/ui/alert";
import { Feather } from "@expo/vector-icons";
import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AlertExampleScreen() {
    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <ScrollView className="p-4">
                    <View className="mb-6">
                        <Text className="text-2xl font-bold mb-2 text-foreground">
                            Alert
                        </Text>
                        <Text className="text-base mb-6 text-muted-foreground">
                            Displays important messages or notifications to users.
                        </Text>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Default Alert
                        </Text>
                        <Alert>
                            <AlertTitle>Information</AlertTitle>
                            <AlertDescription>
                                This is a default alert with just text content.
                            </AlertDescription>
                        </Alert>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            With Icon
                        </Text>
                        <Alert
                            icon={<Feather name="bell" size={24} className="color-primary" />}
                        >
                            <AlertTitle>Notification Alert</AlertTitle>
                            <AlertDescription>
                                You have new notifications waiting for you.
                            </AlertDescription>
                        </Alert>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Alert Variants
                        </Text>

                        <Alert
                            variant="destructive"
                            icon={<Feather name="alert-circle" size={24} color="#ef4444" />}
                            className="mb-4"
                        >
                            <AlertTitle>Error Alert</AlertTitle>
                            <AlertDescription>
                                There was a problem with your request.
                            </AlertDescription>
                        </Alert>

                        <Alert
                            variant="success"
                            icon={<Feather name="check-circle" size={24} color="#22c55e" />}
                            className="mb-4"
                        >
                            <AlertTitle>Success Alert</AlertTitle>
                            <AlertDescription>
                                Your changes have been saved successfully.
                            </AlertDescription>
                        </Alert>

                        <Alert
                            variant="warning"
                            icon={<Feather name="alert-triangle" size={24} color="#f59e0b" />}
                            className="mb-4"
                        >
                            <AlertTitle>Warning Alert</AlertTitle>
                            <AlertDescription>
                                Your account subscription will expire soon.
                            </AlertDescription>
                        </Alert>

                        <Alert
                            variant="info"
                            icon={<Feather name="info" size={24} color="#3b82f6" />}
                        >
                            <AlertTitle>Information Alert</AlertTitle>
                            <AlertDescription>
                                A new update is available for your application.
                            </AlertDescription>
                        </Alert>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Without Title
                        </Text>
                        <Alert
                            variant="default"
                            className="mb-4"
                        >
                            <AlertDescription>
                                This is an alert without a title, just showing a simple message.
                            </AlertDescription>
                        </Alert>

                        <Alert
                            variant="destructive"
                            icon={<Feather name="alert-circle" size={24} color="#ef4444" />}
                        >
                            <AlertDescription>
                                This is an error alert without a title.
                            </AlertDescription>
                        </Alert>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Custom Styling
                        </Text>
                        <Alert
                            className="border-purple-500/50 bg-purple-500/10 border-l-4"
                            icon={<Feather name="bell" size={24} color="#9333ea" />}
                        >
                            <AlertTitle className="text-purple-700 dark:text-purple-500">
                                Custom Alert
                            </AlertTitle>
                            <AlertDescription className="text-purple-700/90 dark:text-purple-500/90">
                                This alert has custom styling applied.
                            </AlertDescription>
                        </Alert>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
