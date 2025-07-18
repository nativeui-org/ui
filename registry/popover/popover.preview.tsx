import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PopoverExample() {
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
                                Popover
                            </Text>
                            <Text className="text-base mb-6 text-muted-foreground">
                                Displays floating content in relation to a trigger element when activated.
                            </Text>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Basic Popover
                            </Text>
                            <View className="items-center">
                                <Popover>
                                    <PopoverTrigger className="bg-primary py-2 px-4 rounded-md">
                                        <Text className="text-primary-foreground font-medium">
                                            Click me
                                        </Text>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <Text className="text-foreground font-medium mb-1">
                                            Popover Content
                                        </Text>
                                        <Text className="text-muted-foreground text-sm">
                                            This is the popover content that appears when you click the trigger.
                                        </Text>
                                    </PopoverContent>
                                </Popover>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                With Different Alignments
                            </Text>

                            <View className="flex-row justify-between mb-4">
                                <Popover>
                                    <PopoverTrigger className="bg-secondary py-2 px-4 rounded-md">
                                        <Text className="text-secondary-foreground font-medium">
                                            Start Aligned
                                        </Text>
                                    </PopoverTrigger>
                                    <PopoverContent align="start">
                                        <Text className="text-foreground font-medium mb-1">
                                            Start Aligned
                                        </Text>
                                        <Text className="text-muted-foreground text-sm">
                                            This popover is aligned to the start of the trigger.
                                        </Text>
                                    </PopoverContent>
                                </Popover>

                                <Popover>
                                    <PopoverTrigger className="bg-secondary py-2 px-4 rounded-md">
                                        <Text className="text-secondary-foreground font-medium">
                                            End Aligned
                                        </Text>
                                    </PopoverTrigger>
                                    <PopoverContent align="end">
                                        <Text className="text-foreground font-medium mb-1">
                                            End Aligned
                                        </Text>
                                        <Text className="text-muted-foreground text-sm">
                                            This popover is aligned to the end of the trigger.
                                        </Text>
                                    </PopoverContent>
                                </Popover>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Different Positions
                            </Text>

                            <View className="items-center mb-6">
                                <Popover>
                                    <PopoverTrigger className="bg-accent py-2 px-4 rounded-md">
                                        <Text className="text-accent-foreground font-medium">
                                            Top Side
                                        </Text>
                                    </PopoverTrigger>
                                    <PopoverContent side="top">
                                        <Text className="text-foreground font-medium mb-1">
                                            Top Popover
                                        </Text>
                                        <Text className="text-muted-foreground text-sm">
                                            This popover appears above the trigger.
                                        </Text>
                                    </PopoverContent>
                                </Popover>
                            </View>

                            <View className="items-center mb-6">
                                <Popover>
                                    <PopoverTrigger className="bg-accent py-2 px-4 rounded-md">
                                        <Text className="text-accent-foreground font-medium">
                                            Bottom with Offset
                                        </Text>
                                    </PopoverTrigger>
                                    <PopoverContent side="bottom" sideOffset={16}>
                                        <Text className="text-foreground font-medium mb-1">
                                            Bottom Popover with Extra Offset
                                        </Text>
                                        <Text className="text-muted-foreground text-sm">
                                            This popover appears below with extra spacing.
                                        </Text>
                                    </PopoverContent>
                                </Popover>
                            </View>

                            <View className="flex-row justify-center">
                                <View>
                                    <Popover>
                                        <PopoverTrigger className="bg-muted py-2 px-4 rounded-md">
                                            <Text className="text-muted-foreground font-medium">
                                                Right Side
                                            </Text>
                                        </PopoverTrigger>
                                        <PopoverContent side="right" align="center">
                                            <Text className="text-foreground font-medium mb-1">
                                                Right Popover
                                            </Text>
                                            <Text className="text-muted-foreground text-sm">
                                                This popover appears to the right of the trigger.
                                            </Text>
                                        </PopoverContent>
                                    </Popover>
                                </View>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                With Icon and Styling
                            </Text>
                            <View className="items-center">
                                <Popover>
                                    <PopoverTrigger className="bg-primary flex-row items-center py-2 px-4 rounded-md">
                                        <Text className="text-primary-foreground font-medium mr-2">
                                            Settings
                                        </Text>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-56">
                                        <View className="mb-4">
                                            <Text className="text-foreground font-bold mb-2">
                                                Settings Menu
                                            </Text>
                                            <View className="h-px bg-border mb-2" />
                                        </View>

                                        <Pressable
                                            className="flex-row items-center py-2 mb-2 active:bg-muted rounded-sm px-1"
                                            onPress={() => console.log("Profile pressed")}
                                        >
                                            <Ionicons name="person-outline" size={20} color="#555" className="mr-2" />
                                            <Text className="text-foreground ml-2">Profile</Text>
                                        </Pressable>

                                        <Pressable
                                            className="flex-row items-center py-2 mb-2 active:bg-muted rounded-sm px-1"
                                            onPress={() => console.log("Preferences pressed")}
                                        >
                                            <Ionicons name="options-outline" size={20} color="#555" className="mr-2" />
                                            <Text className="text-foreground ml-2">Preferences</Text>
                                        </Pressable>

                                        <Pressable
                                            className="flex-row items-center py-2 active:bg-muted rounded-sm px-1"
                                            onPress={() => console.log("Logout pressed")}
                                        >
                                            <Ionicons name="log-out-outline" size={20} color="#555" className="mr-2" />
                                            <Text className="text-foreground ml-2">Logout</Text>
                                        </Pressable>
                                    </PopoverContent>
                                </Popover>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Custom Styling
                            </Text>
                            <View className="items-center">
                                <Popover>
                                    <PopoverTrigger className="bg-destructive py-2 px-4 rounded-md">
                                        <Text className="text-destructive-foreground font-medium">
                                            Delete Item
                                        </Text>
                                    </PopoverTrigger>
                                    <PopoverContent className="bg-destructive text-destructive-foreground border-destructive">
                                        <Text className="text-destructive-foreground font-medium mb-2">
                                            Confirm Deletion
                                        </Text>
                                        <Text className="text-destructive-foreground opacity-90 text-sm mb-4">
                                            Are you sure you want to delete this item? This action cannot be undone.
                                        </Text>
                                        <View className="flex-row justify-between">
                                            <Pressable
                                                className="bg-destructive-foreground py-2 px-3 rounded-md"
                                                onPress={() => console.log("Cancel pressed")}
                                            >
                                                <Text className="text-destructive font-medium">Cancel</Text>
                                            </Pressable>
                                            <Pressable
                                                className="bg-destructive-foreground/20 py-2 px-3 rounded-md border border-destructive-foreground"
                                                onPress={() => console.log("Delete pressed")}
                                            >
                                                <Text className="text-destructive-foreground font-medium">Delete</Text>
                                            </Pressable>
                                        </View>
                                    </PopoverContent>
                                </Popover>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Interactive Example
                            </Text>
                            <View className="items-center">
                                <Popover>
                                    <PopoverTrigger className="bg-primary py-2 px-4 rounded-md">
                                        <Text className="text-primary-foreground font-medium">
                                            Show Notification
                                        </Text>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-72">
                                        <View className="flex-row items-center mb-3">
                                            <View className="w-10 h-10 rounded-full bg-primary items-center justify-center mr-3">
                                                <Ionicons name="notifications" size={20} color="white" />
                                            </View>
                                            <View className="flex-1">
                                                <Text className="text-foreground font-bold">New Message</Text>
                                                <Text className="text-muted-foreground text-sm">From: Alice Smith</Text>
                                            </View>
                                            <Text className="text-muted-foreground text-xs">2m ago</Text>
                                        </View>

                                        <View className="bg-muted p-3 rounded-md mb-3">
                                            <Text className="text-foreground">
                                                Hi there! Just checking in about our meeting tomorrow.
                                            </Text>
                                        </View>

                                        <View className="flex-row">
                                            <Pressable
                                                className="flex-1 bg-muted mr-2 py-2 rounded-md items-center"
                                                onPress={() => console.log("Dismiss pressed")}
                                            >
                                                <Text className="text-muted-foreground font-medium">Dismiss</Text>
                                            </Pressable>
                                            <Pressable
                                                className="flex-1 bg-primary py-2 rounded-md items-center"
                                                onPress={() => console.log("Reply pressed")}
                                            >
                                                <Text className="text-primary-foreground font-medium">Reply</Text>
                                            </Pressable>
                                        </View>
                                    </PopoverContent>
                                </Popover>
                            </View>
                        </View>

                        <View className="mb-24">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Card Preview Example
                            </Text>
                            <View className="items-center">
                                <Popover>
                                    <PopoverTrigger>
                                        <View className="flex-row items-center bg-card p-3 rounded-lg border border-border">
                                            <View className="w-12 h-12 bg-primary rounded-full mr-3 items-center justify-center">
                                                <Text className="text-primary-foreground text-lg font-bold">JD</Text>
                                            </View>
                                            <View>
                                                <Text className="text-foreground font-medium">John Doe</Text>
                                                <Text className="text-muted-foreground text-sm">View Profile</Text>
                                            </View>
                                        </View>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <View className="items-center mb-3">
                                            <View className="w-16 h-16 bg-primary rounded-full mb-2 items-center justify-center">
                                                <Text className="text-primary-foreground text-xl font-bold">JD</Text>
                                            </View>
                                            <Text className="text-foreground font-bold">John Doe</Text>
                                            <Text className="text-muted-foreground text-sm">john.doe@example.com</Text>
                                        </View>
                                        <View className="flex-row justify-around">
                                            <Pressable className="bg-primary px-3 py-2 rounded-md">
                                                <Text className="text-primary-foreground">View Profile</Text>
                                            </Pressable>
                                            <Pressable className="bg-secondary px-3 py-2 rounded-md">
                                                <Text className="text-secondary-foreground">Message</Text>
                                            </Pressable>
                                        </View>
                                    </PopoverContent>
                                </Popover>
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
