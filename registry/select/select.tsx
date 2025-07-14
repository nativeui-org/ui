import * as React from "react";
import { View, Text, Pressable, ScrollView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cn } from "@/lib/utils";
import { Drawer, useDrawer } from "@/components/ui/drawer";

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  size?: "small" | "medium" | "large" | "full" | number[];
  initialSnapIndex?: number;
  avoidKeyboard?: boolean;
  children: React.ReactNode;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
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

interface SelectContextValue {
  selectedValue?: string;
  onSelect: (value: string, label: React.ReactNode) => void;
}

const SelectContext = React.createContext<SelectContextValue>({
  selectedValue: undefined,
  onSelect: () => { },
});

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
      size = "medium",
      initialSnapIndex = 0,
      avoidKeyboard = true,
      children,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(value);
    const [selectedLabel, setSelectedLabel] =
      React.useState<React.ReactNode>("");

    React.useEffect(() => {
      if (value !== selectedValue) {
        setSelectedValue(value);
      }
    }, [value, selectedValue]);
    React.useEffect(() => {
      if (selectedValue === undefined) return;

      let found = false;

      const findLabel = (child: React.ReactNode) => {
        if (!React.isValidElement(child)) return;

        const childElement = child as React.ReactElement<any>;

        if (
          childElement.type === SelectItem &&
          childElement.props.value === selectedValue
        ) {
          setSelectedLabel(childElement.props.children);
          found = true;
          return;
        }

        if (childElement.type === SelectGroup) {
          React.Children.forEach(childElement.props.children, findLabel);
        }
      };

      React.Children.forEach(children, findLabel);

      if (!found) {
        setSelectedLabel("");
      }
    }, [selectedValue, children]);

    const handleSelect = React.useCallback(
      (value: string, label: React.ReactNode) => {
        setSelectedValue(value);
        setSelectedLabel(label);

        if (onValueChange) {
          onValueChange(value);
        }

        setOpen(false);
      },
      [onValueChange]
    );

    const contextValue = React.useMemo(
      () => ({
        selectedValue,
        onSelect: handleSelect,
      }),
      [selectedValue, handleSelect]
    );

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
            {selectedValue && selectedLabel
              ? selectedLabel
              : placeholder || "Select an option"}
          </Text>

          <Ionicons
            name="chevron-down"
            size={16}
            color="#9CA3AF"
            style={{ marginLeft: 8, opacity: 0.7 }}
          />
        </Pressable>

        <SelectContext.Provider value={contextValue}>
          <Drawer
            open={open}
            onClose={() => setOpen(false)}
            title={placeholder || "Select an option"}
            size={size}
            initialSnapIndex={initialSnapIndex}
            contentClassName={contentClassName}
            avoidKeyboard={avoidKeyboard}
            closeOnBackdropPress={true}
          >
            <ScrollView
              className="px-1 pt-2 pb-6"
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled={true}
            >
              {children}
            </ScrollView>
          </Drawer>
        </SelectContext.Provider>
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
  ({ className, children, value, disabled, ...props }, ref) => {
    const { selectedValue, onSelect } = React.useContext(SelectContext);
    const isSelected = selectedValue === value;
    const drawer = useDrawer();

    const handlePress = React.useCallback(() => {
      if (disabled) return;

      onSelect(value, children);

      setTimeout(() => {
        if (drawer && typeof drawer.close === "function") {
          drawer.close();
        }
      }, 50);
    }, [onSelect, value, children, disabled, drawer]);

    return (
      <Pressable
        ref={ref as any}
        disabled={disabled}
        onPress={handlePress}
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
