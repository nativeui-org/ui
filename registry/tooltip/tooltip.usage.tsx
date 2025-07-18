import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tootlip";
import * as React from "react";
import { Text } from "react-native";

export default function TooltipExample() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className="bg-primary py-3 px-4 rounded-md">
                    <Text className="text-primary-foreground font-medium">
                        Press me
                    </Text>
                </TooltipTrigger>
                <TooltipContent>
                    <Text className="text-primary-foreground font-medium">
                        This is a basic tooltip
                    </Text>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
