import * as React from "react";
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
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  multiple?: boolean;
  items: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
  filter?: (item: ComboboxProps["items"][0], search: string) => boolean;
  emptyText?: string;
}

interface ComboboxItemProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onSelect?: (value: string) => void;
  selectedValue?: string | string[];
  multiple?: boolean;
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

const ComboboxSearchInput = ({
  placeholder = "Search...",
  value,
  onChangeText,
}: {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
}) => {
  const inputRef = React.useRef<TextInput>(null);

  const handleClear = () => {
    onChangeText("");
    inputRef.current?.clear();
  };

  return (
    <View className="px-4 py-2">
      <View className="relative mb-2">
        <Input
          ref={inputRef}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          className="pl-10"
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />
        <View className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Ionicons name="search" size={20} color="#9CA3AF" />
        </View>
        {value.length > 0 && (
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

const SelectedItemsBadge = ({ count }: { count: number }) => {
  if (count === 0) return null;

  return (
    <View className="flex-row items-center">
      <View className="bg-primary py-0.5 px-2 rounded-full">
        <Text className="text-primary-foreground text-xs font-medium">
          {count}
        </Text>
      </View>
    </View>
  );
};

const SelectedValuesList = ({
  values,
  labels,
  onRemove,
}: {
  values: string[];
  labels: string[];
  onRemove: (value: string) => void;
}) => {
  if (values.length === 0) return null;

  return (
    <View className="mt-4 px-2">
      <Text className="text-sm font-medium text-foreground mb-2">
        Selected items:
      </Text>
      <View className="flex-row flex-wrap">
        {values.map((value, index) => (
          <View
            key={value}
            className="flex-row items-center bg-secondary/20 mr-2 mb-2 py-1 px-2 rounded-md"
          >
            <Text className="text-foreground mr-1">{labels[index]}</Text>
            <Pressable
              onPress={() => onRemove(value)}
              hitSlop={8}
              className="p-1"
            >
              <Ionicons name="close-circle" size={16} color="#71717a" />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
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
      multiple = false,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [selectedValues, setSelectedValues] = React.useState<string[]>(
      multiple && Array.isArray(value) ? value : value ? [value as string] : []
    );
    const previousMultipleRef = React.useRef(multiple);

    const filteredItems = React.useMemo(() => {
      if (!searchQuery) return items;

      const defaultFilter = (item: ComboboxProps["items"][0], query: string) =>
        item.label.toLowerCase().includes(query.toLowerCase());

      const filterFn = filter || defaultFilter;

      return items.filter((item) => filterFn(item, searchQuery));
    }, [items, searchQuery, filter]);

    React.useEffect(() => {
      if (!isOpen) {
        setSearchQuery("");
      }
    }, [isOpen]);

    React.useEffect(() => {
      if (previousMultipleRef.current !== multiple) {
        setIsOpen(false);
        setSearchQuery("");
        previousMultipleRef.current = multiple;
      }
    }, [multiple]);

    React.useEffect(() => {
      if (multiple && Array.isArray(value)) {
        setSelectedValues(value);
      } else if (!multiple && typeof value === "string") {
        setSelectedValues(value ? [value] : []);
      }
    }, [value, multiple]);

    const selectedLabels = React.useMemo(() => {
      return selectedValues.map(
        (val) => items.find((item) => item.value === val)?.label || ""
      );
    }, [selectedValues, items]);

    const displayText = React.useMemo(() => {
      if (selectedValues.length === 0) return placeholder;

      if (multiple) {
        if (selectedValues.length === 1) {
          return selectedLabels[0];
        }
        return `${selectedValues.length} items selected`;
      }

      return selectedLabels[0];
    }, [selectedValues, selectedLabels, multiple, placeholder]);

    const handleSelect = React.useCallback(
      (itemValue: string) => {
        if (multiple) {
          setSelectedValues((prev) => {
            const valueExists = prev.includes(itemValue);
            const newValues = valueExists
              ? prev.filter((v) => v !== itemValue)
              : [...prev, itemValue];

            if (onValueChange) {
              onValueChange(newValues);
            }
            return newValues;
          });
        } else {
          setSelectedValues([itemValue]);
          if (onValueChange) {
            onValueChange(itemValue);
          }
        }
      },
      [onValueChange, multiple]
    );

    const handleRemoveValue = React.useCallback(
      (valueToRemove: string) => {
        setSelectedValues((prev) => {
          const newValues = prev.filter((v) => v !== valueToRemove);
          if (onValueChange) {
            onValueChange(multiple ? newValues : newValues[0] || "");
          }
          return newValues;
        });
      },
      [onValueChange, multiple]
    );

    const handleClose = React.useCallback(() => {
      setIsOpen(false);
    }, []);

    return (
      <View ref={ref} className={cn("w-full", className)}>
        <Pressable
          disabled={disabled}
          onPress={() => setIsOpen(true)}
          className={cn(
            "flex-row min-h-12 items-center justify-between rounded-md border border-input bg-transparent px-3 py-2",
            "shadow-sm",
            "active:opacity-70",
            disabled && "opacity-50",
            Platform.OS === "ios"
              ? "ios:shadow-sm ios:shadow-foreground/10"
              : "android:elevation-1",
            triggerClassName
          )}
        >
          <View className="flex-1 flex-row items-center justify-between">
            <Text
              className={cn(
                "text-base flex-1",
                selectedValues.length === 0 && "text-muted-foreground",
                "text-foreground"
              )}
              numberOfLines={1}
            >
              {displayText}
            </Text>

            {multiple && selectedValues.length > 0 && (
              <SelectedItemsBadge count={selectedValues.length} />
            )}
          </View>

          <Ionicons
            name="chevron-down"
            size={16}
            color="#9CA3AF"
            style={{ marginLeft: 8, opacity: 0.7 }}
          />
        </Pressable>

        <Drawer
          open={isOpen}
          onClose={handleClose}
          title={placeholder}
          snapPoints={[0.5, 0.8]}
          initialSnapIndex={0}
          contentClassName={contentClassName}
        >
          <ComboboxSearchInput
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {filteredItems.length === 0 ? (
            <View className="p-4 items-center justify-center">
              <Text className="text-muted-foreground text-base">
                {emptyText}
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredItems}
              keyExtractor={(item) => item.value}
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled={true}
              renderItem={({ item }) => (
                <ComboboxItem
                  value={item.value}
                  disabled={item.disabled}
                  selectedValue={
                    multiple ? selectedValues : selectedValues[0] || ""
                  }
                  onSelect={handleSelect}
                  multiple={multiple}
                >
                  {item.label}
                </ComboboxItem>
              )}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          )}

          {multiple && selectedValues.length > 0 && (
            <SelectedValuesList
              values={selectedValues}
              labels={selectedLabels}
              onRemove={handleRemoveValue}
            />
          )}
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
    {
      className,
      children,
      value,
      disabled,
      onSelect,
      selectedValue,
      multiple,
      ...props
    },
    ref
  ) => {
    const isSelected =
      multiple && Array.isArray(selectedValue)
        ? selectedValue.includes(value)
        : selectedValue === value;

    const drawer = useDrawer();

    const handlePress = React.useCallback(() => {
      if (disabled) return;

      if (onSelect) {
        onSelect(value);
      }

      if (!multiple && drawer && typeof drawer.close === 'function') {
        requestAnimationFrame(() => {
          drawer.close();
        });
      }
    }, [disabled, drawer, multiple, onSelect, value]);

    return (
      <Pressable
        ref={ref as any}
        disabled={disabled}
        onPress={handlePress}
        className={cn(
          "flex-row h-14 items-center justify-between px-4 py-2 active:bg-accent/50",
          isSelected ? "bg-primary/10" : "",
          disabled && "opacity-50",
          className
        )}
        {...props}
      >
        <Text
          className={cn(
            "text-base",
            isSelected ? "text-primary font-medium" : "text-foreground"
          )}
        >
          {children}
        </Text>

        {isSelected && (
          <Ionicons
            name={multiple ? "checkmark-circle" : "checkmark"}
            size={20}
            color="#3b82f6"
          />
        )}
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