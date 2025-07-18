import { ComponentPreview } from "@/components/docs/component-preview";

export default function TabsPage() {
  return (
    <ComponentPreview
      name="Tabs"
      description="A tabs component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Tabs } from \"@nativeui/ui\";\n\nexport default function TabsDemo() {\n  return (\n    <Tabs>\n      Click me\n    </Tabs>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import * as React from "react";
import { View, Text, Pressable, Platform } from "react-native";
import { cn } from "@/lib/utils";

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabsContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
}>({
  value: "",
  onValueChange: () => { },
});

const Tabs = React.forwardRef<View, TabsProps>(
  ({ defaultValue, value, onValueChange, children, className }, ref) => {
    const [selectedValue, setSelectedValue] = React.useState(
      value || defaultValue || ""
    );

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        setSelectedValue(newValue);
        onValueChange?.(newValue);
      },
      [onValueChange]
    );

    return (
      <TabsContext.Provider
        value={{
          value: selectedValue,
          onValueChange: handleValueChange,
        }}
      >
        <View ref={ref} className={cn("w-full", className)}>
          {children}
        </View>
      </TabsContext.Provider>
    );
  }
);

const TabsList = React.forwardRef<View, TabsListProps>(
  ({ children, className }, ref) => {
    return (
      <View
        ref={ref}
        className={cn(
          "flex-row items-center justify-center rounded-xl bg-muted p-1",
          Platform.OS === "ios" ? "h-12" : "h-14",
          className
        )}
      >
        {children}
      </View>
    );
  }
);

const TabsTrigger = React.forwardRef<View, TabsTriggerProps>(
  ({ value, children, className }, ref) => {
    const { value: selectedValue, onValueChange } =
      React.useContext(TabsContext);
    const isSelected = selectedValue === value;

    return (
      <Pressable
        ref={ref}
        onPress={() => onValueChange(value)}
        className={cn(
          "flex-1 items-center justify-center rounded-lg px-4 py-2",
          Platform.OS === "ios" ? "h-10" : "h-12",
          isSelected ? "bg-background" : "bg-transparent",
          className
        )}
      >
        <Text
          className={cn(
            "text-base font-medium",
            isSelected ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {children}
        </Text>
      </Pressable>
    );
  }
);

const TabsContent = React.forwardRef<View, TabsContentProps>(
  ({ value, children, className }, ref) => {
    const { value: selectedValue } = React.useContext(TabsContext);
    const isSelected = selectedValue === value;

    if (!isSelected) return null;

    return (
      <View ref={ref} className={cn("mt-4", className)}>
        {children}
      </View>
    );
  }
);

Tabs.displayName = "Tabs";
TabsList.displayName = "TabsList";
TabsTrigger.displayName = "TabsTrigger";
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
`}
      previewCode={`import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileContent = () => (
    <View className="p-4">
        <Text className="text-lg font-semibold mb-4 text-foreground">Profile</Text>
        <Text className="text-base text-muted-foreground">
            This is your profile information. You can edit your details here.
        </Text>
    </View>
);

const SettingsContent = () => (
    <View className="p-4">
        <Text className="text-lg font-semibold mb-4 text-foreground">Settings</Text>
        <Text className="text-base text-muted-foreground">
            Configure your application settings and preferences here.
        </Text>
    </View>
);

const NotificationsContent = () => (
    <View className="p-4">
        <Text className="text-lg font-semibold mb-4 text-foreground">Notifications</Text>
        <Text className="text-base text-muted-foreground">
            Manage your notification preferences and settings.
        </Text>
    </View>
);

export default function TabsExampleScreen() {
    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <ScrollView className="p-4">
                    <View className="mb-6">
                        <Text className="text-2xl font-bold mb-2 text-foreground">
                            Tabs
                        </Text>
                        <Text className="text-base mb-6 text-muted-foreground">
                            A set of layered sections of content—known as tab panels—that are displayed one at a time.
                        </Text>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Basic Tabs
                        </Text>
                        <Tabs defaultValue="profile" className="w-full">
                            <TabsList>
                                <TabsTrigger value="profile">Profile</TabsTrigger>
                                <TabsTrigger value="settings">Settings</TabsTrigger>
                                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                            </TabsList>
                            <TabsContent value="profile">
                                <ProfileContent />
                            </TabsContent>
                            <TabsContent value="settings">
                                <SettingsContent />
                            </TabsContent>
                            <TabsContent value="notifications">
                                <NotificationsContent />
                            </TabsContent>
                        </Tabs>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Custom Styled Tabs
                        </Text>
                        <Tabs defaultValue="profile" className="w-full">
                            <TabsList className="bg-primary/10">
                                <TabsTrigger
                                    value="profile"
                                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                >
                                    Profile
                                </TabsTrigger>
                                <TabsTrigger
                                    value="settings"
                                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                >
                                    Settings
                                </TabsTrigger>
                                <TabsTrigger
                                    value="notifications"
                                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                >
                                    Notifications
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="profile">
                                <ProfileContent />
                            </TabsContent>
                            <TabsContent value="settings">
                                <SettingsContent />
                            </TabsContent>
                            <TabsContent value="notifications">
                                <NotificationsContent />
                            </TabsContent>
                        </Tabs>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
`}
      registryName="tabs"
      packageName="@nativeui/ui"
      dependencies={["react-native"]}
      changelog={[]}
    />
  );
}
