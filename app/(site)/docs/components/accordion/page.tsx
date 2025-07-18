import { ComponentPreview } from "@/components/docs/component-preview";

export default function AccordionPage() {
  return (
    <ComponentPreview
      name="Accordion"
      description="A accordion component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Accordion } from \"@nativeui/ui\";\n\nexport default function AccordionDemo() {\n  return (\n    <Accordion>\n      Click me\n    </Accordion>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import * as React from 'react';
import { Pressable, View, Text, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { cn } from '@/lib/utils';

// Enable layout animation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface AccordionContextValue {
  value: string[];
  onValueChange: (itemValue: string) => void;
  type: 'single' | 'multiple';
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

export interface AccordionProps {
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  value?: string[];
  onValueChange?: (value: string[]) => void;
  defaultValue?: string[];
  className?: string;
  children: React.ReactNode;
}

const Accordion = ({
  type = 'single',
  collapsible = false,
  value,
  onValueChange,
  defaultValue,
  className,
  children,
}: AccordionProps) => {
  const [state, setState] = React.useState<string[]>(value || defaultValue || []);

  const isControlled = value !== undefined;
  const accordionValue = isControlled ? value : state;

  const handleValueChange = React.useCallback((itemValue: string) => {
    const isSelected = accordionValue.includes(itemValue);

    let newValue: string[] = [];

    if (type === 'single') {
      if (isSelected) {
        newValue = collapsible ? [] : [itemValue];
      } else {
        newValue = [itemValue];
      }
    } else {
      if (isSelected) {
        newValue = accordionValue.filter((v) => v !== itemValue);
      } else {
        newValue = [...accordionValue, itemValue];
      }
    }

    if (!isControlled) {
      setState(newValue);
    }

    onValueChange?.(newValue);
  }, [accordionValue, collapsible, isControlled, onValueChange, type]);

  return (
    <AccordionContext.Provider value={{ value: accordionValue, onValueChange: handleValueChange, type }}>
      <View className={cn("w-full", className)}>
        {children}
      </View>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

const AccordionItem = ({ value, className, children }: AccordionItemProps) => {
  const context = React.useContext(AccordionContext);

  if (!context) {
    throw new Error('AccordionItem must be used within an Accordion');
  }

  const isExpanded = context.value.includes(value);

  return (
    <View className={cn("border-b border-border", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            value,
            isExpanded,
          });
        }
        return child;
      })}
    </View>
  );
};

interface AccordionTriggerProps {
  className?: string;
  children: React.ReactNode;
  value?: string;
  isExpanded?: boolean;
}

const AccordionTrigger = ({
  className,
  children,
  value,
  isExpanded,
}: AccordionTriggerProps) => {
  const context = React.useContext(AccordionContext);

  if (!context || value === undefined) {
    return null;
  }

  const iconRotation = isExpanded ? 180 : 0;

  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    context.onValueChange(value);
  };

  return (
    <Pressable
      onPress={handlePress}
      className={cn(
        "flex-row items-center justify-between py-4",
        className
      )}
      accessibilityRole="button"
      accessibilityState={{ expanded: isExpanded }}
      accessibilityHint="Toggle accordion section"
    >
      <View className="flex-1">
        {typeof children === 'string' ? (
          <Text className="text-base font-medium text-foreground">{children}</Text>
        ) : (
          children
        )}
      </View>
      <View style={{ transform: [{ rotate: \`\${iconRotation}deg\` }] }}>
        <Feather name="chevron-down" size={20} color="#888" />
      </View>
    </Pressable>
  );
};

interface AccordionContentProps {
  className?: string;
  children: React.ReactNode;
  value?: string;
  isExpanded?: boolean;
}

const AccordionContent = ({
  className,
  children,
  value,
  isExpanded,
}: AccordionContentProps) => {
  if (!isExpanded) {
    return null;
  }

  return (
    <View
      className={cn("pb-4 pt-0", className)}
    >
      {typeof children === 'string' ? (
        <Text className="text-base text-muted-foreground">{children}</Text>
      ) : (
        children
      )}
    </View>
  );
};

Accordion.displayName = 'Accordion';
AccordionItem.displayName = 'AccordionItem';
AccordionTrigger.displayName = 'AccordionTrigger';
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }; `}
      previewCode={`import {
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
`}
      registryName="accordion"
      packageName="@nativeui/ui"
      dependencies={["react-native","@expo/vector-icons"]}
      changelog={[]}
    />
  );
}
