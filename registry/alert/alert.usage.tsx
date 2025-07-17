import {
    Alert,
    AlertDescription,
    AlertTitle
} from "@/components/ui/alert";
import * as React from "react";
import { View } from "react-native";

export default function AlertExampleScreen() {
    return (
        <View className="mb-8">
            <Alert>
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                    This is a default alert with just text content.
                </AlertDescription>
            </Alert>
        </View>
    );
}
