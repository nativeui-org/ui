import { ComponentPreview } from "@/components/docs/component-preview";

export default function CollapsiblePage() {
  return (
    <ComponentPreview
      name="Collapsible"
      description="A collapsible component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Collapsible } from \"@nativeui/ui\";\n\nexport default function CollapsibleDemo() {\n  return (\n    <Collapsible>\n      Click me\n    </Collapsible>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import * as React from "react";
import {
  View,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { cn } from "@/lib/utils";
import { Feather } from "@expo/vector-icons";

// Enable layout animation for Android
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface CollapsibleContextValue {
  open: boolean;
  toggle: () => void;
}

const CollapsibleContext = React.createContext<CollapsibleContextValue | null>(
  null
);

interface CollapsibleProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  className?: string;
  disabled?: boolean;
}

const Collapsible = React.forwardRef<View, CollapsibleProps>(
  (
    {
      children,
      className,
      open,
      onOpenChange,
      defaultOpen = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(
      open !== undefined ? open : defaultOpen
    );

    const isControlled = open !== undefined;
    const currentOpen = isControlled ? open : isOpen;

    const toggle = React.useCallback(() => {
      if (!disabled) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        if (!isControlled) {
          setIsOpen(!currentOpen);
        }

        if (onOpenChange) {
          onOpenChange(!currentOpen);
        }
      }
    }, [currentOpen, isControlled, onOpenChange, disabled]);

    React.useEffect(() => {
      if (isControlled) {
        setIsOpen(open || false);
      }
    }, [open, isControlled]);

    return (
      <CollapsibleContext.Provider value={{ open: currentOpen, toggle }}>
        <View
          ref={ref}
          className={cn("overflow-hidden", disabled && "opacity-50", className)}
          {...props}
        >
          {children}
        </View>
      </CollapsibleContext.Provider>
    );
  }
);

Collapsible.displayName = "Collapsible";

interface CollapsibleTriggerProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  icon?: boolean;
}

const CollapsibleTrigger = React.forwardRef<View, CollapsibleTriggerProps>(
  ({ children, className, asChild, icon = true, ...props }, ref) => {
    const context = React.useContext(CollapsibleContext);

    if (!context) {
      throw new Error("CollapsibleTrigger must be used within a Collapsible");
    }

    const { open, toggle } = context;

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        onPress: toggle,
        accessibilityRole: "button",
        accessibilityState: { expanded: open },
      } as any);
    }

    return (
      <Pressable
        ref={ref as any}
        className={cn(
          "flex-row items-center justify-between p-4 active:opacity-70",
          className
        )}
        onPress={toggle}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        accessibilityHint="Toggle collapsible section"
        {...props}
      >
        <View className="flex-row items-center flex-1">{children}</View>
        {icon && (
          <View style={{ transform: [{ rotate: open ? "180deg" : "0deg" }] }}>
            <Feather name="chevron-down" size={20} color="#888" />
          </View>
        )}
      </Pressable>
    );
  }
);

CollapsibleTrigger.displayName = "CollapsibleTrigger";

interface CollapsibleContentProps {
  children: React.ReactNode;
  className?: string;
}

const CollapsibleContent = React.forwardRef<View, CollapsibleContentProps>(
  ({ children, className, ...props }, ref) => {
    const context = React.useContext(CollapsibleContext);

    if (!context) {
      throw new Error("CollapsibleContent must be used within a Collapsible");
    }

    const { open } = context;

    if (!open) {
      return null;
    }

    return (
      <View ref={ref} className={cn("overflow-hidden", className)} {...props}>
        {children}
      </View>
    );
  }
);

CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
`}
      previewCode={`import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Feather } from "@expo/vector-icons";
import * as React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CollapsibleExample() {
    const [accordionOne, setAccordionOne] = React.useState(false);
    const [accordionTwo, setAccordionTwo] = React.useState(false);

    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={100}
                >
                    <ScrollView className="p-4">
                        <View className="mb-6">
                            <Text className="text-2xl font-bold mb-2 text-foreground">
                                Collapsible
                            </Text>
                            <Text className="text-base mb-6 text-muted-foreground">
                                A vertically stacked set of interactive headings that can
                                collapse and expand content sections.
                            </Text>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Basic Collapsible
                            </Text>
                            <View className="border border-border rounded-lg overflow-hidden">
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
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Controlled Collapsible
                            </Text>
                            <View className="border border-border rounded-lg overflow-hidden mb-2">
                                <Collapsible open={accordionOne} onOpenChange={setAccordionOne}>
                                    <CollapsibleTrigger className="bg-card">
                                        <Text className="text-foreground font-medium">
                                            Item One
                                        </Text>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="p-4 bg-muted/30">
                                        <Text className="text-muted-foreground mb-2">
                                            This is a controlled collapsible component. Its open state
                                            is managed externally.
                                        </Text>
                                        <Text className="text-muted-foreground">
                                            Opening this one will not automatically close others
                                            because they're independently controlled.
                                        </Text>
                                    </CollapsibleContent>
                                </Collapsible>
                            </View>

                            <View className="border border-border rounded-lg overflow-hidden">
                                <Collapsible open={accordionTwo} onOpenChange={setAccordionTwo}>
                                    <CollapsibleTrigger className="bg-card">
                                        <Text className="text-foreground font-medium">
                                            Item Two
                                        </Text>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="p-4 bg-muted/30">
                                        <Text className="text-muted-foreground">
                                            This is the content for item two. You can create an
                                            accordion effect by managing the state of multiple
                                            collapsible components and ensuring only one is open at a
                                            time.
                                        </Text>
                                    </CollapsibleContent>
                                </Collapsible>
                            </View>

                            <View className="flex-row justify-center mt-4">
                                <Pressable
                                    className="bg-primary py-2 px-4 rounded-md mr-2"
                                    onPress={() => {
                                        setAccordionOne(true);
                                        setAccordionTwo(false);
                                    }}
                                >
                                    <Text className="text-primary-foreground">Open First</Text>
                                </Pressable>
                                <Pressable
                                    className="bg-primary py-2 px-4 rounded-md"
                                    onPress={() => {
                                        setAccordionOne(false);
                                        setAccordionTwo(true);
                                    }}
                                >
                                    <Text className="text-primary-foreground">Open Second</Text>
                                </Pressable>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Default Open Example
                            </Text>
                            <View className="border border-border rounded-lg overflow-hidden">
                                <Collapsible defaultOpen>
                                    <CollapsibleTrigger className="bg-card">
                                        <Text className="text-foreground font-medium">
                                            This section is open by default
                                        </Text>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="p-4 bg-muted/30">
                                        <Text className="text-muted-foreground">
                                            This collapsible uses the defaultOpen prop to start in the
                                            open state, but can still be toggled by the user.
                                        </Text>
                                    </CollapsibleContent>
                                </Collapsible>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                FAQ Style
                            </Text>
                            <View className="divide-y divide-border border border-border rounded-lg overflow-hidden">
                                <Collapsible>
                                    <CollapsibleTrigger className="bg-card py-4">
                                        <Text className="text-foreground font-medium">
                                            How do I create a Collapsible?
                                        </Text>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="p-4 bg-muted/30">
                                        <Text className="text-muted-foreground">
                                            Import the Collapsible components and use them in your
                                            React Native app. You need the Collapsible wrapper, a
                                            CollapsibleTrigger for the header, and CollapsibleContent
                                            for the expandable content.
                                        </Text>
                                    </CollapsibleContent>
                                </Collapsible>

                                <Collapsible>
                                    <CollapsibleTrigger className="bg-card py-4">
                                        <Text className="text-foreground font-medium">
                                            Can I customize the animation?
                                        </Text>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="p-4 bg-muted/30">
                                        <Text className="text-muted-foreground">
                                            Yes, the animation is handled through React Native's
                                            LayoutAnimation API. You can customize it by modifying the
                                            animation preset in the Collapsible component.
                                        </Text>
                                    </CollapsibleContent>
                                </Collapsible>

                                <Collapsible>
                                    <CollapsibleTrigger className="bg-card py-4">
                                        <Text className="text-foreground font-medium">
                                            Is it accessible?
                                        </Text>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="p-4 bg-muted/30">
                                        <Text className="text-muted-foreground">
                                            Yes, the component includes proper accessibility
                                            attributes like accessibilityRole and accessibilityState
                                            to ensure it works well with screen readers and other
                                            assistive technologies.
                                        </Text>
                                    </CollapsibleContent>
                                </Collapsible>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Custom Styling
                            </Text>
                            <View className="mb-4">
                                <Collapsible className="border border-primary rounded-lg overflow-hidden">
                                    <CollapsibleTrigger className="bg-primary">
                                        <Text className="text-primary-foreground font-medium">
                                            Branded Collapsible
                                        </Text>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="p-4 bg-primary/10">
                                        <Text className="text-foreground">
                                            This collapsible uses your brand colors for a more
                                            customized look.
                                        </Text>
                                    </CollapsibleContent>
                                </Collapsible>
                            </View>

                            <View>
                                <Collapsible className="border border-border rounded-lg overflow-hidden">
                                    <CollapsibleTrigger className="bg-card" icon={false}>
                                        <View className="flex-row items-center">
                                            <Feather
                                                name="info"
                                                size={20}
                                                color="#888"
                                                className="mr-2"
                                            />
                                            <Text className="text-foreground font-medium ml-2">
                                                Custom Icon Collapsible
                                            </Text>
                                        </View>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="p-4 bg-muted/30">
                                        <Text className="text-muted-foreground">
                                            This example uses a custom icon instead of the default
                                            chevron and has icon={"{false}"} to hide the default icon.
                                        </Text>
                                    </CollapsibleContent>
                                </Collapsible>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Disabled Example
                            </Text>
                            <View className="border border-border rounded-lg overflow-hidden">
                                <Collapsible disabled>
                                    <CollapsibleTrigger className="bg-card">
                                        <Text className="text-foreground font-medium">
                                            This collapsible is disabled
                                        </Text>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="p-4 bg-muted/30">
                                        <Text className="text-muted-foreground">
                                            This content won't be visible because the collapsible is
                                            disabled.
                                        </Text>
                                    </CollapsibleContent>
                                </Collapsible>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Nested Example
                            </Text>
                            <View className="border border-border rounded-lg overflow-hidden">
                                <Collapsible>
                                    <CollapsibleTrigger className="bg-card">
                                        <Text className="text-foreground font-medium">
                                            Settings
                                        </Text>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="bg-muted/30">
                                        <View className="px-4 pt-4">
                                            <Text className="text-muted-foreground mb-2">
                                                Configure your application settings
                                            </Text>
                                        </View>

                                        <View className="pl-4">
                                            <Collapsible className="border-l border-border">
                                                <CollapsibleTrigger className="bg-transparent">
                                                    <Text className="text-foreground">Appearance</Text>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent className="p-4">
                                                    <View className="flex-row items-center justify-between mb-2">
                                                        <Text className="text-foreground">Dark Mode</Text>
                                                        <View className="w-12 h-6 bg-primary rounded-full" />
                                                    </View>
                                                    <View className="flex-row items-center justify-between">
                                                        <Text className="text-foreground">Font Size</Text>
                                                        <Text className="text-muted-foreground">
                                                            Medium
                                                        </Text>
                                                    </View>
                                                </CollapsibleContent>
                                            </Collapsible>

                                            <Collapsible className="border-l border-border">
                                                <CollapsibleTrigger className="bg-transparent">
                                                    <Text className="text-foreground">Notifications</Text>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent className="p-4">
                                                    <View className="flex-row items-center justify-between mb-2">
                                                        <Text className="text-foreground">
                                                            Push Notifications
                                                        </Text>
                                                        <View className="w-12 h-6 bg-muted rounded-full" />
                                                    </View>
                                                    <View className="flex-row items-center justify-between">
                                                        <Text className="text-foreground">
                                                            Email Alerts
                                                        </Text>
                                                        <View className="w-12 h-6 bg-primary rounded-full" />
                                                    </View>
                                                </CollapsibleContent>
                                            </Collapsible>
                                        </View>

                                        <View className="p-4">
                                            <Pressable className="bg-primary py-2 rounded-md items-center">
                                                <Text className="text-primary-foreground">
                                                    Save Settings
                                                </Text>
                                            </Pressable>
                                        </View>
                                    </CollapsibleContent>
                                </Collapsible>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Card with Collapsible Details
                            </Text>
                            <View className="border border-border rounded-lg overflow-hidden">
                                <View className="p-4 bg-card">
                                    <View className="flex-row items-center mb-2">
                                        <View className="w-12 h-12 bg-primary rounded-full items-center justify-center mr-3">
                                            <Text className="text-primary-foreground font-bold text-lg">
                                                JS
                                            </Text>
                                        </View>
                                        <View>
                                            <Text className="text-foreground font-bold text-lg">
                                                JavaScript Basics
                                            </Text>
                                            <Text className="text-muted-foreground">
                                                Programming Course
                                            </Text>
                                        </View>
                                    </View>

                                    <Text className="text-muted-foreground mb-4">
                                        Learn the fundamentals of JavaScript programming language.
                                    </Text>

                                    <Collapsible>
                                        <CollapsibleTrigger className="bg-muted/30 rounded-md py-2 px-3">
                                            <Text className="text-foreground text-center">
                                                View Course Details
                                            </Text>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent className="mt-4 pt-4 border-t border-border">
                                            <View className="mb-3">
                                                <Text className="text-foreground font-medium mb-1">
                                                    Course Modules:
                                                </Text>
                                                <View className="ml-4">
                                                    <Text className="text-muted-foreground">
                                                        • Variables and Data Types
                                                    </Text>
                                                    <Text className="text-muted-foreground">
                                                        • Functions and Scope
                                                    </Text>
                                                    <Text className="text-muted-foreground">
                                                        • Arrays and Objects
                                                    </Text>
                                                    <Text className="text-muted-foreground">
                                                        • DOM Manipulation
                                                    </Text>
                                                </View>
                                            </View>

                                            <View className="mb-3">
                                                <Text className="text-foreground font-medium mb-1">
                                                    Duration:
                                                </Text>
                                                <Text className="text-muted-foreground">
                                                    4 weeks, 2 hours per week
                                                </Text>
                                            </View>

                                            <View>
                                                <Pressable className="bg-primary py-3 rounded-md items-center">
                                                    <Text className="text-primary-foreground font-medium">
                                                        Enroll Now
                                                    </Text>
                                                </Pressable>
                                            </View>
                                        </CollapsibleContent>
                                    </Collapsible>
                                </View>
                            </View>
                        </View>

                        {/* Extra padding to ensure good scroll */}
                        <View className="h-20" />
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}
`}
      registryName="collapsible"
      packageName="@nativeui/ui"
      dependencies={["react-native","@expo/vector-icons"]}
      changelog={[]}
    />
  );
}
