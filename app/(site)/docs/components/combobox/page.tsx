import { ComponentPreview } from "@/components/docs/component-preview";

export default function ComboboxPage() {
  return (
    <ComponentPreview
      name="Combobox"
      description="A combobox component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Combobox } from \"@nativeui/ui\";\n\nexport default function ComboboxDemo() {\n  return (\n    <Combobox>\n      Click me\n    </Combobox>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import * as React from "react";
import {
  View,
  Text,
  Pressable,
  Platform,
  FlatList,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cn } from "@/lib/utils";
import { Drawer, useDrawer } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";

interface ComboboxProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  items: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
  filter?: (value: string, search: string) => boolean;
  emptyText?: string;
}

interface ComboboxItemProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onSelect?: (value: string, label: React.ReactNode) => void;
  selectedValue?: string;
}

interface ComboboxLabelProps {
  children: React.ReactNode;
  className?: string;
}

interface ComboboxGroupProps {
  children: React.ReactNode;
  className?: string;
}

interface ComboboxSeparatorProps {
  className?: string;
}

const searchState = {
  value: "",
  listeners: new Set<() => void>(),

  setValue(newValue: string) {
    this.value = newValue;
    this.notifyListeners();
  },

  addListener(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  },

  notifyListeners() {
    this.listeners.forEach((listener) => listener());
  },
};

const ComboboxSearchInput = () => {
  const [localValue, setLocalValue] = React.useState(searchState.value);
  const inputRef = React.useRef<TextInput>(null);

  React.useEffect(() => {
    const unsubscribe = searchState.addListener(() => {
      setLocalValue(searchState.value);
    });
    return unsubscribe;
  }, []);

  const handleChangeText = (text: string) => {
    setLocalValue(text);
    searchState.setValue(text);
  };

  const handleClear = () => {
    setLocalValue("");
    searchState.setValue("");
    inputRef.current?.clear();
  };

  return (
    <View className="px-4 py-2">
      <View className="relative mb-2">
        <Input
          ref={inputRef}
          placeholder="Search..."
          placeholderTextColor="#9CA3AF"
          className="pl-10"
          value={localValue}
          onChangeText={handleChangeText}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />
        <View className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Ionicons name="search" size={20} color="#9CA3AF" a />
        </View>
        {localValue.length > 0 && (
          <View className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Pressable onPress={handleClear} hitSlop={8}>
              <Ionicons name="close-circle" size={18} color="#9CA3AF" />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

const ComboboxItemsList = ({
  items,
  selectedValue,
  onSelect,
  filter,
  emptyText,
}: {
  items: ComboboxProps["items"];
  selectedValue?: string;
  onSelect: (value: string) => void;
  filter: (value: string, search: string) => boolean;
  emptyText: string;
}) => {
  const [filteredItems, setFilteredItems] = React.useState(items);

  React.useEffect(() => {
    const updateFilter = () => {
      if (!searchState.value) {
        setFilteredItems(items);
      } else {
        setFilteredItems(
          items.filter((item) => filter(item.value, searchState.value))
        );
      }
    };

    updateFilter();

    const unsubscribe = searchState.addListener(updateFilter);
    return unsubscribe;
  }, [items, filter]);

  if (filteredItems.length === 0) {
    return (
      <View className="p-4 items-center justify-center">
        <Text className="text-muted-foreground text-base">{emptyText}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={filteredItems}
      keyExtractor={(item) => item.value}
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled={true}
      renderItem={({ item }) => (
        <ComboboxItem
          value={item.value}
          disabled={item.disabled}
          selectedValue={selectedValue}
          onSelect={onSelect}
        >
          {item.label}
        </ComboboxItem>
      )}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

const Combobox = React.forwardRef<View, ComboboxProps>(
  (
    {
      value,
      onValueChange,
      placeholder = "Select an option",
      searchPlaceholder = "Search...",
      disabled = false,
      className,
      triggerClassName,
      contentClassName,
      items = [],
      filter,
      emptyText = "No results found.",
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(value);

    React.useEffect(() => {
      if (!isOpen) {
        setTimeout(() => {
          searchState.setValue("");
        }, 100);
      }
    }, [isOpen]);

    React.useEffect(() => {
      setSelectedValue(value);
    }, [value]);

    const defaultFilter = React.useCallback(
      (itemValue: string, search: string) => {
        const label =
          items.find((item) => item.value === itemValue)?.label || "";
        return label.toLowerCase().includes(search.toLowerCase());
      },
      [items]
    );

    const filterFn = filter || defaultFilter;

    const selectedLabel = React.useMemo(() => {
      if (!selectedValue) return "";
      return items.find((item) => item.value === selectedValue)?.label || "";
    }, [selectedValue, items]);

    const handleSelect = React.useCallback(
      (itemValue: string) => {
        setSelectedValue(itemValue);
        if (onValueChange) {
          onValueChange(itemValue);
        }
      },
      [onValueChange]
    );

    return (
      <View ref={ref} className={cn("w-full", className)}>
        <Pressable
          disabled={disabled}
          onPress={() => setIsOpen(true)}
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
            {selectedValue ? selectedLabel : placeholder}
          </Text>

          <Ionicons
            name="chevron-down"
            size={16}
            color="#9CA3AF"
            style={{ marginLeft: 8, opacity: 0.7 }}
          />
        </Pressable>

        <Drawer
          open={isOpen}
          onClose={() => setIsOpen(false)}
          title={placeholder}
          snapPoints={[0.5, 0.8]}
          initialSnapIndex={0}
          contentClassName={contentClassName}
        >
          <ComboboxSearchInput />
          <ComboboxItemsList
            items={items}
            selectedValue={selectedValue}
            onSelect={handleSelect}
            filter={filterFn}
            emptyText={emptyText}
          />
        </Drawer>
      </View>
    );
  }
);

Combobox.displayName = "Combobox";

const ComboboxGroup = React.forwardRef<View, ComboboxGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <View ref={ref} className={cn("", className)} {...props}>
        {children}
      </View>
    );
  }
);

ComboboxGroup.displayName = "ComboboxGroup";

const ComboboxItem = React.forwardRef<typeof Pressable, ComboboxItemProps>(
  (
    { className, children, value, disabled, onSelect, selectedValue, ...props },
    ref
  ) => {
    const isSelected = selectedValue === value;
    const drawer = useDrawer();

    return (
      <Pressable
        ref={ref as any}
        disabled={disabled}
        onPress={() => {
          if (onSelect) {
            onSelect(value, children);
          }
          drawer.animateClose();
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

ComboboxItem.displayName = "ComboboxItem";

const ComboboxLabel = React.forwardRef<Text, ComboboxLabelProps>(
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

ComboboxLabel.displayName = "ComboboxLabel";

const ComboboxSeparator = React.forwardRef<View, ComboboxSeparatorProps>(
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

ComboboxSeparator.displayName = "ComboboxSeparator";

export {
  Combobox,
  ComboboxGroup,
  ComboboxItem,
  ComboboxLabel,
  ComboboxSeparator,
};
`}
      previewCode={`import { Combobox } from "@nativeui/ui";

export default function ComboboxDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Combobox>Default Combobox</Combobox>
      <Combobox variant="destructive">Delete</Combobox>
      <Combobox variant="outline">Outline</Combobox>
      <Combobox variant="secondary">Secondary</Combobox>
      <Combobox variant="ghost">Ghost</Combobox>
      <Combobox variant="link">Link</Combobox>
    </div>
  );
}`}
      registryName="combobox"
      packageName="@nativeui/ui"
    />
  );
}
