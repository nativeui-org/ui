import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import * as React from "react";
import { Text } from "react-native";

export default function PopoverExample() {

    return (
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
    );
}
