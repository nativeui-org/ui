import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as React from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CardExample() {
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
                                Card
                            </Text>
                            <Text className="text-base text-muted-foreground mb-6">
                                Displays content in a clean and organized card format.
                            </Text>
                        </View>

                        {/* Basic Card */}
                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Basic Card
                            </Text>
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        <Text className="text-xl font-semibold text-foreground">
                                            Card Title
                                        </Text>
                                    </CardTitle>
                                    <CardDescription>
                                        <Text className="text-base text-muted-foreground">
                                            Card Description
                                        </Text>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Text className="text-foreground">
                                        This is a basic card with a title, description, and content.
                                    </Text>
                                </CardContent>
                            </Card>
                        </View>

                        {/* Profile Card */}
                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Profile Card
                            </Text>
                            <Card>
                                <CardHeader>
                                    <View className="flex-row items-center gap-4">
                                        <Image
                                            source={{
                                                uri: "https://avatars.githubusercontent.com/u/204157942?s=200&v=4",
                                            }}
                                            className="w-16 h-16 rounded-full"
                                        />
                                        <View>
                                            <CardTitle>
                                                <Text className="text-xl font-semibold text-foreground">
                                                    John Doe
                                                </Text>
                                            </CardTitle>
                                            <CardDescription>
                                                <Text className="text-base text-muted-foreground">
                                                    Software Developer
                                                </Text>
                                            </CardDescription>
                                        </View>
                                    </View>
                                </CardHeader>
                                <CardContent>
                                    <Text className="text-foreground">
                                        Passionate about creating beautiful and functional user
                                        interfaces.
                                    </Text>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="flex-1">
                                        <Text className="text-foreground">Message</Text>
                                    </Button>
                                    <Button className="flex-1">
                                        <Text className="text-primary-foreground">Follow</Text>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </View>

                        {/* Login Card */}
                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Login Card
                            </Text>
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        <Text className="text-xl font-semibold text-foreground">
                                            Login
                                        </Text>
                                    </CardTitle>
                                    <CardDescription>
                                        <Text className="text-base text-muted-foreground">
                                            Enter your credentials to access your account
                                        </Text>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <View className="space-y-6">
                                        <View className="space-y-2 mb-4">
                                            <Label nativeID="email">Email</Label>
                                            <Input
                                                id="email"
                                                placeholder="Enter your email"
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                            />
                                        </View>
                                        <View className="space-y-2">
                                            <Label nativeID="password">Password</Label>
                                            <Input
                                                id="password"
                                                placeholder="Enter your password"
                                                secureTextEntry
                                            />
                                        </View>
                                    </View>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full">
                                        <Text className="text-primary-foreground">Login</Text>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </View>

                        {/* Feature Card */}
                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Feature Card
                            </Text>
                            <Card className="bg-primary">
                                <CardHeader>
                                    <CardTitle>
                                        <Text className="text-xl font-semibold text-primary-foreground">
                                            Premium Features
                                        </Text>
                                    </CardTitle>
                                    <CardDescription>
                                        <Text className="text-base text-primary-foreground/80">
                                            Unlock all premium features
                                        </Text>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <View className="space-y-2">
                                        <Text className="text-primary-foreground">
                                            • Unlimited access to all content
                                        </Text>
                                        <Text className="text-primary-foreground">
                                            • Priority customer support
                                        </Text>
                                        <Text className="text-primary-foreground">
                                            • Ad-free experience
                                        </Text>
                                    </View>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        variant="secondary"
                                        className="w-full bg-primary-foreground"
                                    >
                                        <Text className="text-foreground">Upgrade Now</Text>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </View>

                        <View className="h-20" />
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}
