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
      previewCode={`import { Tabs } from "@nativeui/ui";

export default function TabsDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Tabs>Default Tabs</Tabs>
      <Tabs variant="destructive">Delete</Tabs>
      <Tabs variant="outline">Outline</Tabs>
      <Tabs variant="secondary">Secondary</Tabs>
      <Tabs variant="ghost">Ghost</Tabs>
      <Tabs variant="link">Link</Tabs>
    </div>
  );
}`}
      registryName="tabs"
      packageName="@nativeui/ui"
      dependencies={["react-native"]}
    />
  );
}
