import { ComponentPreview } from "@/components/docs/component-preview";

export default function SelectPage() {
  return (
    <ComponentPreview
      name="Select"
      description="A select component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Select } from \"@nativeui/ui\";\n\nexport default function SelectDemo() {\n  return (\n    <Select>\n      Click me\n    </Select>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import * as React from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cn } from "@/lib/utils";

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onSelect?: (value: string, label: React.ReactNode) => void;
  selectedValue?: string;
}

interface SelectLabelProps {
  children: React.ReactNode;
  className?: string;
}

interface SelectGroupProps {
  children: React.ReactNode;
  className?: string;
}

interface SelectSeparatorProps {
  className?: string;
}

// To help TypeScript with React.Children
type ChildType = {
  type: React.JSXElementConstructor<any>;
  props: any;
};

const Select = React.forwardRef<View, SelectProps>(
  (
    {
      value,
      onValueChange,
      placeholder,
      disabled = false,
      className,
      triggerClassName,
      contentClassName,
      children,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(value);
    const [selectedLabel, setSelectedLabel] =
      React.useState<React.ReactNode>("");

    // Find the label from children for the current value
    React.useEffect(() => {
      if (value === undefined) return;

      React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return;

        const childElement = child as React.ReactElement<any>;

        // Handle SelectItem direct child
        if (
          childElement.type === SelectItem &&
          childElement.props.value === value
        ) {
          setSelectedLabel(childElement.props.children);
          setSelectedValue(value);
          return;
        }

        // Handle SelectGroup > SelectItem
        if (childElement.type === SelectGroup) {
          React.Children.forEach(childElement.props.children, (groupChild) => {
            if (
              React.isValidElement(groupChild) &&
              (groupChild as React.ReactElement<any>).type === SelectItem &&
              (groupChild as React.ReactElement<any>).props.value === value
            ) {
              setSelectedLabel(
                (groupChild as React.ReactElement<any>).props.children
              );
              setSelectedValue(value);
            }
          });
        }
      });
    }, [value, children]);

    const handleSelect = (value: string, label: React.ReactNode) => {
      setSelectedValue(value);
      setSelectedLabel(label);
      if (onValueChange) {
        onValueChange(value);
      }
      setOpen(false);
    };

    // Clone children to inject the handleSelect
    const enhancedChildren = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;

      const childElement = child as React.ReactElement<any>;

      if (childElement.type === SelectItem) {
        return React.cloneElement(childElement, {
          onSelect: handleSelect,
          selectedValue,
        });
      }

      if (childElement.type === SelectGroup) {
        const groupChildren = React.Children.map(
          childElement.props.children,
          (groupChild) => {
            if (
              React.isValidElement(groupChild) &&
              (groupChild as React.ReactElement<any>).type === SelectItem
            ) {
              return React.cloneElement(groupChild as React.ReactElement<any>, {
                onSelect: handleSelect,
                selectedValue,
              });
            }
            return groupChild;
          }
        );
        return React.cloneElement(childElement, {}, groupChildren);
      }

      return child;
    });

    return (
      <View ref={ref} className={cn("w-full", className)}>
        <Pressable
          disabled={disabled}
          onPress={() => setOpen(true)}
          className={cn(
            "flex-row h-12 items-center justify-between rounded-md border border-input bg-transparent px-3 py-2",
            "shadow-sm",
            "active:opacity-70",
            disabled && "opacity-50",
            Platform.OS === "ios"
              ? "ios:shadow-sm ios:shadow-foreground/10"
              : "android:elevation-1",
            triggerClassName
          )}
        >
          <Text
            className={cn(
              "text-base flex-1",
              !selectedValue && "text-muted-foreground",
              "text-foreground"
            )}
            numberOfLines={1}
          >
            {selectedValue ? selectedLabel : placeholder || "Select an option"}
          </Text>

          <Ionicons
            name="chevron-down"
            size={16}
            color="#9CA3AF"
            style={{ marginLeft: 8, opacity: 0.7 }}
          />
        </Pressable>

        <Modal
          visible={open}
          transparent
          animationType="fade"
          onRequestClose={() => setOpen(false)}
        >
          <TouchableWithoutFeedback onPress={() => setOpen(false)}>
            <View className="flex-1 bg-black/25 justify-center items-center p-4">
              <TouchableWithoutFeedback>
                <View
                  className={cn(
                    "bg-popover rounded-lg overflow-hidden w-full max-w-[90%] max-h-[70%] shadow-xl",
                    Platform.OS === "ios"
                      ? "ios:shadow-xl"
                      : "android:elevation-8",
                    contentClassName
                  )}
                >
                  <View className="p-1 border-b border-border">
                    <Text className="text-xl font-medium text-center py-2 text-foreground">
                      {placeholder || "Select an option"}
                    </Text>
                  </View>

                  <ScrollView className="p-1 max-h-[300px]">
                    {enhancedChildren}
                  </ScrollView>

                  <Pressable
                    onPress={() => setOpen(false)}
                    className="border-t border-border p-3"
                  >
                    <Text className="text-center text-primary font-medium">
                      Cancel
                    </Text>
                  </Pressable>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
);

Select.displayName = "Select";

const SelectGroup = React.forwardRef<View, SelectGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <View ref={ref} className={cn("", className)} {...props}>
        {children}
      </View>
    );
  }
);

SelectGroup.displayName = "SelectGroup";

const SelectItem = React.forwardRef<typeof Pressable, SelectItemProps>(
  (
    { className, children, value, disabled, onSelect, selectedValue, ...props },
    ref
  ) => {
    const isSelected = selectedValue === value;

    return (
      <Pressable
        ref={ref as any}
        disabled={disabled}
        onPress={() => {
          if (onSelect) {
            onSelect(value, children);
          }
        }}
        className={cn(
          "flex-row h-14 items-center justify-between px-4 py-2 active:bg-accent/50",
          isSelected ? "bg-accent" : "",
          disabled && "opacity-50",
          className
        )}
        {...props}
      >
        <Text
          className={cn(
            "text-base",
            isSelected
              ? "text-accent-foreground font-medium"
              : "text-foreground"
          )}
        >
          {children}
        </Text>

        {isSelected && <Ionicons name="checkmark" size={20} color="#4F46E5" />}
      </Pressable>
    );
  }
);

SelectItem.displayName = "SelectItem";

const SelectLabel = React.forwardRef<Text, SelectLabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn(
          "px-3 py-2 text-sm font-semibold text-foreground",
          className
        )}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

SelectLabel.displayName = "SelectLabel";

const SelectSeparator = React.forwardRef<View, SelectSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn("h-px bg-muted mx-2 my-1", className)}
        {...props}
      />
    );
  }
);

SelectSeparator.displayName = "SelectSeparator";

export { Select, SelectGroup, SelectItem, SelectLabel, SelectSeparator };
`}
      previewCode={`import { Select } from "@nativeui/ui";

export default function SelectDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Select>Default Select</Select>
      <Select variant="destructive">Delete</Select>
      <Select variant="outline">Outline</Select>
      <Select variant="secondary">Secondary</Select>
      <Select variant="ghost">Ghost</Select>
      <Select variant="link">Link</Select>
    </div>
  );
}`}
      registryName="select"
      packageName="@nativeui/ui"
    />
  );
}
