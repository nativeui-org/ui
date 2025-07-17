import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccordionExample() {
    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <ScrollView className="p-4">
                    <View className="mb-6">
                        <Text className="text-2xl font-bold mb-2 text-foreground">
                            Accordion
                        </Text>
                        <Text className="text-base mb-6 text-muted-foreground">
                            A vertically stacked set of interactive headings that each reveal a section of content.
                        </Text>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Default Accordion
                        </Text>
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
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Multiple Expanded Items
                        </Text>
                        <Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Native Mobile Design</AccordionTrigger>
                                <AccordionContent>
                                    <Text className="text-base text-muted-foreground">
                                        This accordion follows native mobile design patterns with appropriate
                                        touch target sizes (at least 44×44 points on iOS, 48×48dp on Android)
                                        and sufficient spacing between interactive elements.
                                    </Text>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2">
                                <AccordionTrigger>Smooth Animations</AccordionTrigger>
                                <AccordionContent>
                                    <Text className="text-base text-muted-foreground">
                                        The animations are optimized for mobile with proper timing
                                        and easing functions that match platform conventions. The component
                                        uses React Native Reanimated for hardware-accelerated animations.
                                    </Text>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3">
                                <AccordionTrigger>Accessibility Support</AccordionTrigger>
                                <AccordionContent>
                                    <Text className="text-base text-muted-foreground">
                                        Built with accessibility in mind, this component includes proper
                                        accessibility roles, states, and hints for screen readers on both
                                        iOS (VoiceOver) and Android (TalkBack).
                                    </Text>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
