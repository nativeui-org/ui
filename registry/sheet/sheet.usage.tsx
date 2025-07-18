import { Sheet, useSheet } from "@/components/ui/sheet";
import * as React from "react";
import { Text, View } from "react-native";


export default function SheetExampleScreen() {
    const [rightSheetOpen, setRightSheetOpen] = React.useState(false);

    return (
        <Sheet
            open={rightSheetOpen}
            onClose={() => setRightSheetOpen(false)}
            title="Right Sheet"
            description="This sheet slides in from the right"
            side="right"
            size="medium"
        >
            <View className="p-4">
                <Text className="text-base text-foreground">
                    This is a right sheet example. It slides in from the right
                    side of the screen.
                </Text>
            </View>
        </Sheet>
    );
}
