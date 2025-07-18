import { Separator } from "@/components/ui/separator";
import * as React from "react";
import { Text, View } from "react-native";

export function SeparatorDemo() {
    return (
        <View className="w-full">
            <Text className="text-base font-medium text-foreground">Section 1</Text>
            <Separator className="my-4" />
            <Text className="text-base text-foreground">Section 2</Text>
        </View>
    );
}
