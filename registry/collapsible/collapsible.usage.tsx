import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import * as React from "react";
import { Text } from "react-native";

export default function CollapsibleExample() {

    return (
        <Collapsible>
            <CollapsibleTrigger className="bg-card">
                <Text className="text-foreground font-medium">
                    What is a collapsible component?
                </Text>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 bg-muted/30">
                <Text className="text-muted-foreground">
                    A collapsible component lets you hide and show content
                    with a smooth animation. It's commonly used for FAQs,
                    accordion menus, and other expandable sections.
                </Text>
            </CollapsibleContent>
        </Collapsible>
    );
}
