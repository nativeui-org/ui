import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import * as React from "react";
import { Text } from "react-native";

export default function AccordionExample() {
    return (
        <Accordion type="single" defaultValue={["item-1"]} collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                    <Text className="text-base text-muted-foreground">
                        Yes. It adheres to mobile accessibility guidelines with proper touch
                        target sizes, semantic markup, and smooth animations optimized for
                        React Native.
                    </Text>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
                <AccordionTrigger>Is it responsive?</AccordionTrigger>
                <AccordionContent>
                    <Text className="text-base text-muted-foreground">
                        Yes. It's optimized for both iOS and Android experiences and
                        follows native platform conventions while maintaining a consistent
                        appearance.
                    </Text>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
                <AccordionTrigger>Is it customizable?</AccordionTrigger>
                <AccordionContent>
                    <Text className="text-base text-muted-foreground">
                        Yes. You can customize the styling using NativeWind classes or
                        provide your own components for triggers and content. The
                        animation is also customizable.
                    </Text>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
