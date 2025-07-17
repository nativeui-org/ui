import { Drawer } from "@/components/ui/drawer";
import * as React from "react";
import {
    Text,
    View
} from "react-native";

export default function DrawerExampleScreen() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    return (
        <Drawer
            open={drawerOpen}
            onClose={closeBasicDrawer}
            title="Drawer Example"
            size={[0.4, 0.8]}
            initialSnapIndex={0}
        >
            <View className="p-4">
                <Text className="text-base mb-4 text-foreground">
                    This is an example of drawer content. You can drag this
                    drawer up to see more content.
                </Text>

                <View className="h-px bg-border w-full my-4" />

                <Text className="text-sm text-muted-foreground">
                    Try dragging this drawer up and down.
                </Text>
            </View>
        </Drawer>
    );
}
