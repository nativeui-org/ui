import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileContent = () => (
    <View className="p-4">
        <Text className="text-lg font-semibold mb-4 text-foreground">Profile</Text>
        <Text className="text-base text-muted-foreground">
            This is your profile information. You can edit your details here.
        </Text>
    </View>
);

const SettingsContent = () => (
    <View className="p-4">
        <Text className="text-lg font-semibold mb-4 text-foreground">Settings</Text>
        <Text className="text-base text-muted-foreground">
            Configure your application settings and preferences here.
        </Text>
    </View>
);

const NotificationsContent = () => (
    <View className="p-4">
        <Text className="text-lg font-semibold mb-4 text-foreground">Notifications</Text>
        <Text className="text-base text-muted-foreground">
            Manage your notification preferences and settings.
        </Text>
    </View>
);

export default function TabsExampleScreen() {
    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <ScrollView className="p-4">
                    <View className="mb-6">
                        <Text className="text-2xl font-bold mb-2 text-foreground">
                            Tabs
                        </Text>
                        <Text className="text-base mb-6 text-muted-foreground">
                            A set of layered sections of content—known as tab panels—that are displayed one at a time.
                        </Text>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Basic Tabs
                        </Text>
                        <Tabs defaultValue="profile" className="w-full">
                            <TabsList>
                                <TabsTrigger value="profile">Profile</TabsTrigger>
                                <TabsTrigger value="settings">Settings</TabsTrigger>
                                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                            </TabsList>
                            <TabsContent value="profile">
                                <ProfileContent />
                            </TabsContent>
                            <TabsContent value="settings">
                                <SettingsContent />
                            </TabsContent>
                            <TabsContent value="notifications">
                                <NotificationsContent />
                            </TabsContent>
                        </Tabs>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Custom Styled Tabs
                        </Text>
                        <Tabs defaultValue="profile" className="w-full">
                            <TabsList className="bg-primary/10">
                                <TabsTrigger
                                    value="profile"
                                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                >
                                    Profile
                                </TabsTrigger>
                                <TabsTrigger
                                    value="settings"
                                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                >
                                    Settings
                                </TabsTrigger>
                                <TabsTrigger
                                    value="notifications"
                                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                >
                                    Notifications
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="profile">
                                <ProfileContent />
                            </TabsContent>
                            <TabsContent value="settings">
                                <SettingsContent />
                            </TabsContent>
                            <TabsContent value="notifications">
                                <NotificationsContent />
                            </TabsContent>
                        </Tabs>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
