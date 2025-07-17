import * as React from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BreadcrumbExample() {
    // Simple custom navigation function that you could replace with your actual navigation logic
    const handleNavigation = (path: string) => {
        Alert.alert("Navigation", `Navigating to: ${path}`);
        // Your navigation code here, for example:
        // router.push(path);
    };

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
                                Breadcrumb
                            </Text>
                            <Text className="text-base mb-6 text-muted-foreground">
                                A breadcrumb navigation pattern to help users navigate hierarchical paths.
                            </Text>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Basic Breadcrumb
                            </Text>
                            <View className="px-1">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/home">
                                                Home
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/components">
                                                Components
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                With Custom Navigation
                            </Text>
                            <View className="px-1">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink
                                                href="/dashboard"
                                                onPress={() => handleNavigation("/dashboard")}
                                            >
                                                Dashboard
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink
                                                href="/settings"
                                                onPress={() => handleNavigation("/settings")}
                                            >
                                                Settings
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>Profile</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                With Ellipsis
                            </Text>
                            <View className="px-1">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/home">
                                                Home
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbEllipsis />
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/components/breadcrumb">
                                                Breadcrumb
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>Example</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Custom Separator
                            </Text>
                            <View className="px-1">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/dashboard">
                                                Dashboard
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator>
                                            <Text className="text-muted-foreground mx-1">/</Text>
                                        </BreadcrumbSeparator>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/settings">
                                                Settings
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator>
                                            <Text className="text-muted-foreground mx-1">/</Text>
                                        </BreadcrumbSeparator>
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>Profile</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Interactive Breadcrumb
                            </Text>
                            <View className="px-1">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink
                                                href="/shop"
                                                onPress={() => console.log("Shop pressed")}
                                            >
                                                Shop
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink
                                                href="/shop/clothing"
                                                onPress={() => console.log("Clothing pressed")}
                                            >
                                                Clothing
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink
                                                href="/shop/clothing/t-shirts"
                                                onPress={() => console.log("T-Shirts pressed")}
                                            >
                                                T-Shirts
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>Summer Collection</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Responsive Breadcrumb
                            </Text>
                            <View className="px-1">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem className="md:flex hidden">
                                            <BreadcrumbLink href="/app">
                                                App
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator className="md:flex hidden" />
                                        <BreadcrumbItem className="md:flex hidden">
                                            <BreadcrumbLink href="/app/projects">
                                                Projects
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator className="md:flex hidden" />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/app/projects/website">
                                                Website
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>Design</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Custom Styled Breadcrumb
                            </Text>
                            <View className="px-1 py-3 bg-muted rounded-lg">
                                <Breadcrumb>
                                    <BreadcrumbList className="gap-1">
                                        <BreadcrumbItem>
                                            <BreadcrumbLink
                                                className="bg-primary/10 px-3 py-1 rounded-md"
                                                href="/files"
                                            >
                                                Files
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink
                                                className="bg-primary/10 px-3 py-1 rounded-md"
                                                href="/files/documents"
                                            >
                                                Documents
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage className="bg-primary/20 px-3 py-1 rounded-md">
                                                Report.pdf
                                            </BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
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
