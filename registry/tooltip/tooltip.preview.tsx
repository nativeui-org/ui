import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tootlip";
import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TooltipExample() {
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
                                Tooltip
                            </Text>
                            <Text className="text-base mb-6 text-muted-foreground">
                                A popup that displays information related to an element when the element receives keyboard focus or when the mouse hovers over it.
                            </Text>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Basic Tooltip
                            </Text>
                            <View className="items-center">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className="bg-primary py-3 px-4 rounded-md">
                                            <Text className="text-primary-foreground font-medium">
                                                Press me
                                            </Text>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <Text className="text-primary-foreground font-medium">
                                                This is a basic tooltip
                                            </Text>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Different Sides
                            </Text>

                            <View className="mb-6 items-center">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className="bg-secondary py-3 px-4 rounded-md">
                                            <Text className="text-secondary-foreground font-medium">
                                                Tooltip Top
                                            </Text>
                                        </TooltipTrigger>
                                        <TooltipContent side="top">
                                            <Text className="text-primary-foreground">
                                                This tooltip appears on top
                                            </Text>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </View>

                            <View className="mb-6 items-center">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className="bg-secondary py-3 px-4 rounded-md">
                                            <Text className="text-secondary-foreground font-medium">
                                                Tooltip Right
                                            </Text>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            <Text className="text-primary-foreground">
                                                This tooltip appears on the right
                                            </Text>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </View>

                            <View className="mb-6 items-center">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className="bg-secondary py-3 px-4 rounded-md">
                                            <Text className="text-secondary-foreground font-medium">
                                                Tooltip Left
                                            </Text>
                                        </TooltipTrigger>
                                        <TooltipContent side="left">
                                            <Text className="text-primary-foreground">
                                                This tooltip appears on the left
                                            </Text>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                With Different Alignments
                            </Text>

                            <View className="flex-row justify-between mb-4">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className="bg-accent py-3 px-4 rounded-md">
                                            <Text className="text-accent-foreground font-medium">
                                                Start Aligned
                                            </Text>
                                        </TooltipTrigger>
                                        <TooltipContent align="start">
                                            <Text className="text-primary-foreground">
                                                This tooltip is aligned to the start
                                            </Text>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className="bg-accent py-3 px-4 rounded-md">
                                            <Text className="text-accent-foreground font-medium">
                                                End Aligned
                                            </Text>
                                        </TooltipTrigger>
                                        <TooltipContent align="end">
                                            <Text className="text-primary-foreground">
                                                This tooltip is aligned to the end
                                            </Text>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                With Icons
                            </Text>
                            <View className="flex-row justify-around">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className="w-12 h-12 bg-muted rounded-full items-center justify-center">
                                            <Ionicons name="help-outline" size={24} color="#666" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <Text className="text-primary-foreground">
                                                Need help? Contact support
                                            </Text>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className="w-12 h-12 bg-muted rounded-full items-center justify-center">
                                            <Ionicons name="information-circle-outline" size={24} color="#666" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <Text className="text-primary-foreground">
                                                Important information
                                            </Text>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className="w-12 h-12 bg-muted rounded-full items-center justify-center">
                                            <Ionicons name="notifications-outline" size={24} color="#666" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <Text className="text-primary-foreground">
                                                You have 3 new notifications
                                            </Text>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                With Custom Content
                            </Text>
                            <View className="items-center">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className="bg-primary py-3 px-4 rounded-md">
                                            <Text className="text-primary-foreground font-medium">
                                                User Profile
                                            </Text>
                                        </TooltipTrigger>
                                        <TooltipContent className="p-0">
                                            <View className="p-4">
                                                <View className="flex-row items-center mb-3">
                                                    <View className="w-10 h-10 rounded-full bg-muted items-center justify-center mr-3">
                                                        <Text className="text-muted-foreground font-bold">JD</Text>
                                                    </View>
                                                    <View>
                                                        <Text className="text-primary-foreground font-bold">John Doe</Text>
                                                        <Text className="text-primary-foreground opacity-70 text-xs">
                                                            john.doe@example.com
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View className="h-px bg-primary-foreground opacity-20 my-2" />
                                                <Text className="text-primary-foreground text-sm">
                                                    Online since 2 hours ago
                                                </Text>
                                            </View>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Interactive Elements in Tooltip
                            </Text>
                            <View className="items-center">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className="bg-destructive py-3 px-4 rounded-md">
                                            <Text className="text-destructive-foreground font-medium">
                                                Delete Item
                                            </Text>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <View>
                                                <Text className="text-primary-foreground font-medium mb-3">
                                                    Are you sure you want to delete?
                                                </Text>
                                                <Text className="text-primary-foreground opacity-70 text-sm mb-3">
                                                    This action cannot be undone.
                                                </Text>
                                                <View className="flex-row justify-end">
                                                    <Pressable
                                                        className="bg-primary-foreground py-1 px-3 rounded-md mr-2"
                                                        onPress={() => console.log("Cancelled delete")}
                                                    >
                                                        <Text className="text-primary text-sm font-medium">Cancel</Text>
                                                    </Pressable>
                                                    <Pressable
                                                        className="bg-destructive py-1 px-3 rounded-md"
                                                        onPress={() => console.log("Confirmed delete")}
                                                    >
                                                        <Text className="text-destructive-foreground text-sm font-medium">Delete</Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Feature Highlight Tooltip
                            </Text>
                            <View className="items-center bg-card p-6 rounded-md border border-border">
                                <Text className="text-foreground mb-4">Dashboard Overview</Text>

                                <View className="flex-row justify-around w-full mb-4">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger className="items-center">
                                                <View className="w-16 h-16 rounded-md bg-primary/20 items-center justify-center mb-2">
                                                    <Ionicons name="analytics-outline" size={24} color="#666" />
                                                </View>
                                                <Text className="text-foreground text-xs">Analytics</Text>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <Text className="text-primary-foreground">
                                                    View detailed analytics and reports
                                                </Text>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger className="items-center">
                                                <View className="w-16 h-16 rounded-md bg-primary/20 items-center justify-center mb-2">
                                                    <Ionicons name="people-outline" size={24} color="#666" />
                                                </View>
                                                <Text className="text-foreground text-xs">Users</Text>
                                            </TooltipTrigger>
                                            <TooltipContent side="top">
                                                <Text className="text-primary-foreground">
                                                    Manage your team members and permissions
                                                </Text>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger className="items-center">
                                                <View className="w-16 h-16 rounded-md bg-primary/20 items-center justify-center mb-2">
                                                    <Ionicons name="settings-outline" size={24} color="#666" />
                                                </View>
                                                <Text className="text-foreground text-xs">Settings</Text>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <Text className="text-primary-foreground">
                                                    Configure account settings and preferences
                                                </Text>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </View>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Form Field Tooltip Help
                            </Text>
                            <View className="bg-card p-4 rounded-md border border-border">
                                <View className="mb-4">
                                    <View className="flex-row items-center mb-2">
                                        <Text className="text-foreground font-medium mr-2">Password</Text>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Ionicons name="help-circle-outline" size={16} color="#666" />
                                                </TooltipTrigger>
                                                <TooltipContent side="top">
                                                    <View>
                                                        <Text className="text-primary-foreground font-medium mb-2">Password Requirements:</Text>
                                                        <Text className="text-primary-foreground text-sm">• At least 8 characters</Text>
                                                        <Text className="text-primary-foreground text-sm">• Include one uppercase letter</Text>
                                                        <Text className="text-primary-foreground text-sm">• Include one number</Text>
                                                        <Text className="text-primary-foreground text-sm">• Include one special character</Text>
                                                    </View>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </View>

                                    <View className="h-10 bg-input rounded-md border border-input px-3 mb-1" />

                                    <Text className="text-muted-foreground text-xs">
                                        Your password must be at least 8 characters
                                    </Text>
                                </View>

                                <Pressable className="bg-primary py-2 rounded-md items-center">
                                    <Text className="text-primary-foreground font-medium">Create Account</Text>
                                </Pressable>
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
