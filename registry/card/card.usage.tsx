import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import * as React from "react";
import { Text } from "react-native";

export default function CardExample() {

    return (
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
    );
}
