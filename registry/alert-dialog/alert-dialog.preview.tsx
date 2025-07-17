import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AlertDialogExample() {
    const [basicOpen, setBasicOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [criticalOpen, setCriticalOpen] = React.useState(false);
    const [customOpen, setCustomOpen] = React.useState(false);

    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <ScrollView className="flex-1 p-4">
                    <View className="mb-6">
                        <Text className="text-2xl font-bold mb-2 text-foreground">
                            Alert Dialog
                        </Text>
                        <Text className="text-base text-muted-foreground mb-6">
                            A modal dialog that interrupts the user with important content and
                            expects a response. Used for critical actions that require user
                            confirmation.
                        </Text>
                    </View>

                    {/* Basic Alert Dialog */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Basic Alert
                        </Text>
                        <AlertDialog open={basicOpen} onOpenChange={setBasicOpen}>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline">
                                    <Text className="text-foreground">Show Alert</Text>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. Please confirm that you want
                                        to proceed.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        <Button variant="outline">
                                            <Text className="text-foreground">Cancel</Text>
                                        </Button>
                                    </AlertDialogCancel>
                                    <AlertDialogAction>
                                        <Button>
                                            <Text className="text-primary-foreground">Continue</Text>
                                        </Button>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </View>

                    {/* Delete Alert Dialog */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Delete Confirmation
                        </Text>
                        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">
                                    <Ionicons name="trash-outline" size={20} className="color-primary" />
                                    <Text className="text-white ml-2">Delete Account</Text>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <View className="items-center mb-4">
                                        <View className="w-12 h-12 bg-destructive/10 rounded-full items-center justify-center">
                                            <Ionicons
                                                name="warning-outline"
                                                size={32}
                                                className="color-primary"
                                            />
                                        </View>
                                    </View>
                                    <AlertDialogTitle>Delete Account</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you absolutely sure you want to delete your account?
                                        This action cannot be undone and all your data will be
                                        permanently removed from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        <Button variant="outline">
                                            <Text className="text-foreground">Cancel</Text>
                                        </Button>
                                    </AlertDialogCancel>
                                    <AlertDialogAction>
                                        <Button variant="destructive">
                                            <Text className="text-foreground">Delete Account</Text>
                                        </Button>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </View>

                    {/* Critical Action Alert Dialog */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Critical Action
                        </Text>
                        <AlertDialog open={criticalOpen} onOpenChange={setCriticalOpen}>
                            <AlertDialogTrigger asChild>
                                <Button>
                                    <Text className="text-primary-foreground ml-2">Shutdown Server</Text>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <View className="items-center mb-4">
                                        <View className="w-12 h-12 bg-orange-100 rounded-full items-center justify-center">
                                            <Ionicons
                                                name="alert-circle-outline"
                                                size={32}
                                                className="color-primary"
                                            />
                                        </View>
                                    </View>
                                    <AlertDialogTitle>Critical Action</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        You are about to shutdown the production server. This will
                                        disconnect all active users and stop all running processes.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <View className="p-6 pt-2">
                                    <View className="bg-muted p-4 rounded-lg">
                                        <Text className="text-orange-600 font-medium mb-2">
                                            Impact of this action:
                                        </Text>
                                        <View className="space-y-2">
                                            <Text className="text-muted-foreground">
                                                • All user sessions will be terminated
                                            </Text>
                                            <Text className="text-muted-foreground">
                                                • Running processes will be stopped
                                            </Text>
                                            <Text className="text-muted-foreground">
                                                • Data not saved will be lost
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        <Button variant="outline">
                                            <Text className="text-foreground">Cancel</Text>
                                        </Button>
                                    </AlertDialogCancel>
                                    <AlertDialogAction>
                                        <Button variant="destructive">
                                            <Text className="text-foreground">Yes, Shutdown</Text>
                                        </Button>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </View>

                    {/* Custom Styled Alert Dialog */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Custom Styled
                        </Text>
                        <AlertDialog open={customOpen} onOpenChange={setCustomOpen}>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" className="bg-purple-100">
                                    <Ionicons name="star" size={20} className="color-primary" />
                                    <Text className="text-purple-600 ml-2">Premium Feature</Text>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <View className="items-center mb-4">
                                        <View className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center">
                                            <Ionicons name="star" size={32} className="color-primary" />
                                        </View>
                                    </View>
                                    <AlertDialogTitle>Upgrade to Premium</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This feature is only available for premium users. Upgrade
                                        your account to access exclusive features and benefits.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <View className="p-6 pt-2">
                                    <View className="bg-purple-50 p-4 rounded-lg">
                                        <Text className="text-purple-600 font-medium mb-2">
                                            Premium Benefits:
                                        </Text>
                                        <View className="space-y-2">
                                            <Text className="text-purple-600">
                                                • Unlimited access to all features
                                            </Text>
                                            <Text className="text-purple-600">
                                                • Priority customer support
                                            </Text>
                                            <Text className="text-purple-600">
                                                • Early access to new features
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        <Button variant="outline">
                                            <Text className="text-foreground">Maybe Later</Text>
                                        </Button>
                                    </AlertDialogCancel>
                                    <AlertDialogAction>
                                        <Button className="bg-purple-600">
                                            <Text className="text-primary-foreground">Upgrade Now</Text>
                                        </Button>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </View>

                    <View className="h-20" />
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
