import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DialogExample() {
    const [name, setName] = React.useState("John Doe");
    const [email, setEmail] = React.useState("john@example.com");

    const [basicOpen, setBasicOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [successOpen, setSuccessOpen] = React.useState(false);
    const [loadingOpen, setLoadingOpen] = React.useState(false);

    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={100}
                >
                    <ScrollView className="flex-1 p-4">
                        <View className="mb-6">
                            <Text className="text-2xl font-bold mb-2 text-foreground">
                                Dialog
                            </Text>
                            <Text className="text-foregroundtext-base text-muted-foreground mb-6">
                                A modal dialog that interrupts the user with important content
                                and expects a response.
                            </Text>
                        </View>

                        {/* Basic Dialog */}
                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Basic Dialog
                            </Text>
                            <Dialog open={basicOpen} onOpenChange={setBasicOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="w-auto">
                                        <Text className="text-foreground">Open Dialog</Text>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Basic Dialog</DialogTitle>
                                        <DialogDescription>
                                            This is a basic dialog example with a title and
                                            description.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <View className="p-6 pt-0">
                                        <Text className="text-foreground">
                                            Dialogs are used to show important information that
                                            requires user attention or interaction.
                                        </Text>
                                    </View>
                                    <DialogFooter>
                                        <DialogClose>
                                            <Button variant="outline">
                                                <Text>Close</Text>
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </View>

                        {/* Edit Profile Dialog */}
                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Edit Profile Dialog
                            </Text>
                            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                                <DialogTrigger asChild>
                                    <Button>
                                        <Text className="text-primary-foreground">Edit Profile</Text>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edit Profile</DialogTitle>
                                        <DialogDescription>
                                            Make changes to your profile information.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <View className="p-6 pt-0 space-y-4">
                                        <View className="space-y-2">
                                            <Label nativeID="name">Name</Label>
                                            <Input
                                                id="name"
                                                value={name}
                                                onChangeText={setName}
                                                placeholder="Enter your name"
                                            />
                                        </View>
                                        <View className="space-y-2">
                                            <Label nativeID="email">Email</Label>
                                            <Input
                                                id="email"
                                                value={email}
                                                onChangeText={setEmail}
                                                placeholder="Enter your email"
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                            />
                                        </View>
                                    </View>
                                    <DialogFooter>
                                        <DialogClose>
                                            <Button variant="outline">
                                                <Text className="text-foreground">Cancel</Text>
                                            </Button>
                                        </DialogClose>
                                        <DialogClose>
                                            <Button>
                                                <Text className="text-primary-foreground">Save Changes</Text>
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </View>

                        {/* Destructive Action Dialog */}
                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Destructive Action Dialog
                            </Text>
                            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="destructive" className="w-auto">
                                        <Text>Delete Account</Text>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Delete Account</DialogTitle>
                                        <DialogDescription>
                                            Are you sure you want to delete your account? This action
                                            cannot be undone.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <View className="p-6 pt-0">
                                        <View className="bg-muted p-4 rounded-lg mb-4">
                                            <Text className="text-destructive font-medium mb-2">
                                                Warning
                                            </Text>
                                            <View className="space-y-2">
                                                <Text className="text-muted-foreground">
                                                    • All your data will be permanently deleted
                                                </Text>
                                                <Text className="text-muted-foreground">
                                                    • You will lose access to all your content
                                                </Text>
                                                <Text className="text-muted-foreground">
                                                    • Your username will become available for others
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <DialogFooter>
                                        <DialogClose>
                                            <Button variant="outline" className="mr-2">
                                                <Text>Cancel</Text>
                                            </Button>
                                        </DialogClose>
                                        <DialogClose>
                                            <Button variant="destructive">
                                                <Text>Delete Account</Text>
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </View>

                        {/* Success Dialog */}
                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Success Dialog
                            </Text>
                            <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        <Text className="text-foreground">Show Success</Text>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <View className="items-center">
                                            <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-4">
                                                <Ionicons name="checkmark" size={32} color="green" />
                                            </View>
                                            <DialogTitle>Payment Successful</DialogTitle>
                                            <DialogDescription>
                                                Your payment has been processed successfully.
                                            </DialogDescription>
                                        </View>
                                    </DialogHeader>
                                    <View className="p-6 pt-0">
                                        <View className="bg-muted p-4 rounded-lg">
                                            <Text className="text-muted-foreground text-center">
                                                Transaction ID: #123456789
                                            </Text>
                                        </View>
                                    </View>
                                    <DialogFooter>
                                        <DialogClose>
                                            <Button className="flex-1">
                                                <Text className="text-primary-foreground">View Receipt</Text>
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </View>

                        {/* Loading Dialog */}
                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Loading Dialog
                            </Text>
                            <Dialog open={loadingOpen} onOpenChange={setLoadingOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        <Text className="text-foreground">Show Loading</Text>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent showCloseButton={false}>
                                    <View className="p-6 items-center">
                                        <View className="w-12 h-12 mb-4">
                                            <Ionicons name="reload" size={48} color="#666" />
                                        </View>
                                        <Text className="text-lg font-semibold text-foreground mb-2">
                                            Processing
                                        </Text>
                                        <Text className="text-muted-foreground text-center">
                                            Please wait while we process your request...
                                        </Text>
                                    </View>
                                </DialogContent>
                            </Dialog>
                        </View>

                        <View className="h-20" />
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}
