import { ComponentPreview } from "@/components/docs/component-preview";

export default function DateTimePickerPage() {
  return (
    <ComponentPreview
      name="DateTimePicker"
      description="A date-time-picker component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { DateTimePicker } from \"@nativeui/ui\";\n\nexport default function DateTimePickerDemo() {\n  return (\n    <DateTimePicker>\n      Click me\n    </DateTimePicker>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import * as React from "react";
import { Animated, Modal, Pressable, Text, View } from "react-native";

interface DateRange {
  from: Date;
  to: Date;
}

interface TimeConfig {
  minuteInterval?: 1 | 5 | 10 | 15 | 30;
  minTime?: string;
  maxTime?: string;
  disabledTimes?: string[];
}

interface DateTimePickerProps {
  mode?: "single" | "range" | "datetime";
  value?: Date | Date[] | DateRange;
  onValueChange?: (value: Date | Date[] | DateRange | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  showOutsideDays?: boolean;
  disabledDates?: (date: Date) => boolean;
  disableWeekends?: boolean;
  fromDate?: Date;
  toDate?: Date;
  timeConfig?: TimeConfig;
  firstDayOfWeek?: 0 | 1;
  enableQuickMonthYear?: boolean;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
}

const isDateRange = (value: any): value is DateRange => {
  return value && typeof value === "object" && "from" in value && "to" in value;
};

const formatDisplayValue = (
  value: Date | Date[] | DateRange | undefined,
  mode: "single" | "range" | "datetime",
  placeholder: string
): string => {
  if (!value) return placeholder;

  switch (mode) {
    case "single":
      if (value instanceof Date) {
        return format(value, "PPP", { locale: enUS });
      }
      break;
    case "datetime":
      if (value instanceof Date) {
        return format(value, "PPP 'at' HH:mm", { locale: enUS });
      }
      break;
    case "range":
      if (isDateRange(value)) {
        const fromFormatted = format(value.from, "PP", { locale: enUS });
        const toFormatted = format(value.to, "PP", { locale: enUS });
        return \`\${fromFormatted} - \${toFormatted}\`;
      }
      break;
  }
  return placeholder;
};

const getInputIcon = (mode: "single" | "range" | "datetime") => {
  switch (mode) {
    case "datetime":
      return "calendar-outline";
    case "range":
      return "calendar-outline";
    default:
      return "calendar-outline";
  }
};

const DateTimePicker = React.forwardRef<View, DateTimePickerProps>(
  (
    {
      mode = "single",
      value,
      onValueChange,
      placeholder = "Select date",
      disabled = false,
      className,
      showOutsideDays = true,
      disabledDates,
      disableWeekends = false,
      fromDate,
      toDate,
      timeConfig,
      firstDayOfWeek = 1,
      enableQuickMonthYear = false,
      variant = "default",
      size = "md",
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const scaleAnim = React.useRef(new Animated.Value(0.95)).current;

    const displayValue = formatDisplayValue(value, mode, placeholder);
    const iconName = getInputIcon(mode);

    const sizeClasses = {
      sm: "h-10 px-3 text-sm",
      md: "h-12 px-3 text-base",
      lg: "h-14 px-4 text-lg",
    };

    const iconSizes = {
      sm: 18,
      md: 20,
      lg: 22,
    };

    const openPicker = React.useCallback(() => {
      if (disabled) return;
      setIsOpen(true);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }, [disabled, fadeAnim, scaleAnim]);

    const closePicker = React.useCallback(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsOpen(false);
        setIsFocused(false);
      });
    }, [fadeAnim, scaleAnim]);

    const handleSelect = React.useCallback(
      (selectedValue: Date | Date[] | DateRange | undefined) => {
        onValueChange?.(selectedValue);
        if (
          mode === "single" ||
          (mode === "range" &&
            isDateRange(selectedValue) &&
            selectedValue.from !== selectedValue.to)
        ) {
          closePicker();
        }
      },
      [onValueChange, mode, closePicker]
    );

    return (
      <>
        <Pressable
          ref={ref}
          onPress={openPicker}
          disabled={disabled}
          className={cn(
            "w-full rounded-md border border-input bg-transparent flex-row items-center justify-between",
            sizeClasses[size],
            isFocused ? "border-ring ring-1 ring-ring" : "",
            value ? "border-primary" : "",
            disabled ? "opacity-50 cursor-not-allowed" : "active:bg-accent/5",
            className
          )}
          {...props}
        >
          <View className="ml-3 mr-2">
            <Ionicons
              name={iconName as any}
              size={iconSizes[size]}
              color={disabled ? "#999" : "#666"}
            />
          </View>
          <Text
            className={cn(
              "flex-1",
              value ? "text-primary" : "text-muted-foreground"
            )}
            numberOfLines={1}
          >
            {displayValue}
          </Text>
        </Pressable>

        <Modal
          visible={isOpen}
          transparent
          animationType="none"
          onRequestClose={closePicker}
          statusBarTranslucent
        >
          <Animated.View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              padding: 16,
              opacity: fadeAnim,
            }}
          >
            <Pressable
              style={{ flex: 1, width: "100%" }}
              onPress={closePicker}
            />

            <Animated.View
              style={{
                width: "100%",
                maxWidth: 400,
                transform: [{ scale: scaleAnim }],
              }}
            >
              <View className="bg-background rounded-t-2xl border-b border-border">
                <View className="flex-row justify-between items-center px-4 py-3">
                  <Pressable
                    onPress={closePicker}
                    className="opacity-60 active:opacity-100 py-1"
                  >
                    <Text className="text-primary text-base">Cancel</Text>
                  </Pressable>

                  <Text className="text-lg font-semibold text-foreground">
                    {mode === "range"
                      ? "Select dates"
                      : mode === "datetime"
                        ? "Select date & time"
                        : "Select date"}
                  </Text>

                  <Pressable
                    onPress={closePicker}
                    className="opacity-60 active:opacity-100 py-1"
                  >
                    <Text className="text-primary font-semibold text-base">
                      Done
                    </Text>
                  </Pressable>
                </View>
              </View>

              <Calendar
                mode={mode}
                selected={value}
                onSelect={handleSelect}
                showOutsideDays={showOutsideDays}
                disabled={disabledDates}
                disableWeekends={disableWeekends}
                fromDate={fromDate}
                toDate={toDate}
                timeConfig={timeConfig}
                firstDayOfWeek={firstDayOfWeek}
                enableQuickMonthYear={enableQuickMonthYear}
                showTime={mode === "datetime"}
                className="rounded-none rounded-b-2xl"
              />
            </Animated.View>

            <Pressable
              style={{ flex: 1, width: "100%" }}
              onPress={closePicker}
            />
          </Animated.View>
        </Modal>
      </>
    );
  }
);

DateTimePicker.displayName = "DateTimePicker";

export { DateTimePicker, type DateTimePickerProps };
`}
      previewCode={`import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { addDays, format } from "date-fns";
import * as React from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface DateRange {
    from: Date;
    to: Date;
}

export default function DateTimePickerExample() {
    const [singleDate, setSingleDate] = React.useState<Date | undefined>(
        undefined
    );

    const [dateTimeValue, setDateTimeValue] = React.useState<Date | undefined>(
        new Date()
    );

    const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
        undefined
    );

    const [restrictedDate, setRestrictedDate] = React.useState<Date | undefined>(
        undefined
    );

    const [businessDate, setBusinessDate] = React.useState<Date | undefined>(
        undefined
    );

    const [smallDate, setSmallDate] = React.useState<Date | undefined>(undefined);
    const [mediumDate, setMediumDate] = React.useState<Date | undefined>(undefined);
    const [largeDate, setLargeDate] = React.useState<Date | undefined>(undefined);
    const [customTimeDate, setCustomTimeDate] = React.useState<Date | undefined>(undefined);

    const isWeekend = (date: Date) => {
        const day = date.getDay();
        return day === 0 || day === 6;
    };

    const isPastDate = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const showSelectedValue = (label: string, value: any) => {
        let message = \`\${label}:\\n\`;

        if (!value) {
            message += "No date selected";
        } else if (value instanceof Date) {
            message += format(value, "PPP 'at' HH:mm");
        } else if (value.from && value.to) {
            message += \`From: \${format(value.from, "PPP")}\\nTo: \${format(
                value.to,
                "PPP"
            )}\`;
        }

        Alert.alert("Selected Value", message);
    };

    const handleSingleDateChange = (
        value: Date | Date[] | DateRange | undefined
    ) => {
        if (value instanceof Date || value === undefined) {
            setSingleDate(value);
        }
    };

    const handleDateTimeChange = (
        value: Date | Date[] | DateRange | undefined
    ) => {
        if (value instanceof Date || value === undefined) {
            setDateTimeValue(value);
        }
    };

    const handleDateRangeChange = (
        value: Date | Date[] | DateRange | undefined
    ) => {
        if (
            value &&
            typeof value === "object" &&
            "from" in value &&
            "to" in value
        ) {
            setDateRange(value as DateRange);
        } else if (value === undefined) {
            setDateRange(undefined);
        }
    };

    const handleRestrictedDateChange = (
        value: Date | Date[] | DateRange | undefined
    ) => {
        if (value instanceof Date || value === undefined) {
            setRestrictedDate(value);
        }
    };

    const handleBusinessDateChange = (
        value: Date | Date[] | DateRange | undefined
    ) => {
        if (value instanceof Date || value === undefined) {
            setBusinessDate(value);
        }
    };

    const handleSmallDateChange = (value: Date | Date[] | DateRange | undefined) => {
        if (value instanceof Date || value === undefined) {
            setSmallDate(value);
        }
    };

    const handleMediumDateChange = (value: Date | Date[] | DateRange | undefined) => {
        if (value instanceof Date || value === undefined) {
            setMediumDate(value);
        }
    };

    const handleLargeDateChange = (value: Date | Date[] | DateRange | undefined) => {
        if (value instanceof Date || value === undefined) {
            setLargeDate(value);
        }
    };

    const handleCustomTimeChange = (value: Date | Date[] | DateRange | undefined) => {
        if (value instanceof Date || value === undefined) {
            setCustomTimeDate(value);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={100}
            >
                <ScrollView
                    className="p-4"
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                >
                    <View className="mb-6">
                        <Text className="text-2xl font-bold mb-2 text-foreground">
                            Date Time Picker
                        </Text>
                        <Text className="text-base mb-6 text-muted-foreground">
                            A combination of Input and Calendar components for selecting
                            dates and times with an input-like interface.
                        </Text>
                    </View>

                    {/* Single Date Picker */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-2 text-foreground">
                            Single Date
                        </Text>
                        <Text className="text-sm mb-4 text-muted-foreground">
                            Select a single date with a clean input interface.
                        </Text>
                        <DateTimePicker
                            mode="single"
                            value={singleDate}
                            onValueChange={handleSingleDateChange}
                            placeholder="Select a date"
                            enableQuickMonthYear={true}
                        />
                        <Button
                            variant="outline"
                            className="mt-2"
                            onPress={() => showSelectedValue("Single Date", singleDate)}
                        >
                            <Text className="text-foreground">Show Selected Value</Text>
                        </Button>
                    </View>

                    {/* Date Time Picker */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-2 text-foreground">
                            Date & Time
                        </Text>
                        <Text className="text-sm mb-4 text-muted-foreground">
                            Select both date and time in one picker.
                        </Text>
                        <DateTimePicker
                            mode="datetime"
                            value={dateTimeValue}
                            onValueChange={handleDateTimeChange}
                            placeholder="Select date and time"
                            enableQuickMonthYear={true}
                            timeConfig={{
                                minuteInterval: 15,
                            }}
                        />
                        <Button
                            variant="outline"
                            className="mt-2"
                            onPress={() => showSelectedValue("Date & Time", dateTimeValue)}
                        >
                            <Text className="text-foreground">Show Selected Value</Text>
                        </Button>
                    </View>

                    {/* Date Range Picker */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-2 text-foreground">
                            Date Range
                        </Text>
                        <Text className="text-sm mb-4 text-muted-foreground">
                            Select a range of dates for bookings, events, etc.
                        </Text>
                        <DateTimePicker
                            mode="range"
                            value={dateRange}
                            onValueChange={handleDateRangeChange}
                            placeholder="Select date range"
                            enableQuickMonthYear={true}
                        />
                        <Button
                            variant="outline"
                            className="mt-2"
                            onPress={() => showSelectedValue("Date Range", dateRange)}
                        >
                            <Text className="text-foreground">Show Selected Value</Text>
                        </Button>
                    </View>

                    {/* Restricted Date Picker */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-2 text-foreground">
                            Restricted Dates
                        </Text>
                        <Text className="text-sm mb-4 text-muted-foreground">
                            Only future dates allowed (no past dates).
                        </Text>
                        <DateTimePicker
                            mode="single"
                            value={restrictedDate}
                            onValueChange={handleRestrictedDateChange}
                            placeholder="Select future date"
                            fromDate={new Date()}
                            disabledDates={isPastDate}
                            enableQuickMonthYear={true}
                        />
                        <Button
                            variant="outline"
                            className="mt-2"
                            onPress={() =>
                                showSelectedValue("Restricted Date", restrictedDate)
                            }
                        >
                            <Text className="text-foreground">Show Selected Value</Text>
                        </Button>
                    </View>

                    {/* Business Days Only */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-2 text-foreground">
                            Business Days Only
                        </Text>
                        <Text className="text-sm mb-4 text-muted-foreground">
                            Weekends are disabled for business appointments.
                        </Text>
                        <DateTimePicker
                            mode="single"
                            value={businessDate}
                            onValueChange={handleBusinessDateChange}
                            placeholder="Select business day"
                            disableWeekends={true}
                            disabledDates={isWeekend}
                            enableQuickMonthYear={true}
                        />
                        <Button
                            variant="outline"
                            className="mt-2"
                            onPress={() => showSelectedValue("Business Date", businessDate)}
                        >
                            <Text className="text-foreground">Show Selected Value</Text>
                        </Button>
                    </View>

                    {/* Different Sizes */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Different Sizes
                        </Text>

                        <View className="mb-4">
                            <Text className="text-sm font-medium mb-2 text-foreground">
                                Small Size
                            </Text>
                            <DateTimePicker
                                mode="single"
                                size="sm"
                                value={smallDate}
                                onValueChange={handleSmallDateChange}
                                placeholder="Small date picker"
                            />
                        </View>

                        <View className="mb-4">
                            <Text className="text-sm font-medium mb-2 text-foreground">
                                Medium Size (Default)
                            </Text>
                            <DateTimePicker
                                mode="single"
                                size="md"
                                value={mediumDate}
                                onValueChange={handleMediumDateChange}
                                placeholder="Medium date picker"
                            />
                        </View>

                        <View className="mb-4">
                            <Text className="text-sm font-medium mb-2 text-foreground">
                                Large Size
                            </Text>
                            <DateTimePicker
                                mode="single"
                                size="lg"
                                value={largeDate}
                                onValueChange={handleLargeDateChange}
                                placeholder="Large date picker"
                            />
                        </View>
                    </View>

                    {/* Disabled State */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-2 text-foreground">
                            Disabled State
                        </Text>
                        <Text className="text-sm mb-4 text-muted-foreground">
                            Disabled picker that cannot be interacted with.
                        </Text>
                        <DateTimePicker
                            mode="single"
                            disabled={true}
                            placeholder="This picker is disabled"
                            value={new Date()}
                        />
                    </View>

                    {/* Custom Time Config */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-2 text-foreground">
                            Custom Time Configuration
                        </Text>
                        <Text className="text-sm mb-4 text-muted-foreground">
                            DateTime picker with 30-minute intervals.
                        </Text>
                        <DateTimePicker
                            mode="datetime"
                            value={customTimeDate}
                            onValueChange={handleCustomTimeChange}
                            placeholder="Select with 30min intervals"
                            timeConfig={{
                                minuteInterval: 30,
                            }}
                            enableQuickMonthYear={true}
                        />
                    </View>

                    {/* Action Buttons */}
                    <View className="mb-8 pt-4 border-t border-border">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Quick Actions
                        </Text>

                        <View className="flex-row flex-wrap gap-2">
                            <Button
                                variant="outline"
                                onPress={() => {
                                    const today = new Date();
                                    setSingleDate(today);
                                    setSmallDate(today);
                                    setMediumDate(today);
                                    setLargeDate(today);
                                }}
                                className="mb-2"
                            >
                                <Text className="text-foreground">Set Today</Text>
                            </Button>

                            <Button
                                variant="outline"
                                onPress={() => {
                                    const nextWeek = addDays(new Date(), 7);
                                    setSingleDate(nextWeek);
                                    setSmallDate(nextWeek);
                                    setMediumDate(nextWeek);
                                    setLargeDate(nextWeek);
                                }}
                                className="mb-2"
                            >
                                <Text className="text-foreground">Set Next Week</Text>
                            </Button>

                            <Button
                                variant="outline"
                                onPress={() => {
                                    const today = new Date();
                                    setDateRange({
                                        from: today,
                                        to: addDays(today, 7),
                                    });
                                }}
                                className="mb-2"
                            >
                                <Text className="text-foreground">Set Week Range</Text>
                            </Button>

                            <Button
                                variant="destructive"
                                onPress={() => {
                                    setSingleDate(undefined);
                                    setDateTimeValue(undefined);
                                    setDateRange(undefined);
                                    setRestrictedDate(undefined);
                                    setBusinessDate(undefined);
                                    setSmallDate(undefined);
                                    setMediumDate(undefined);
                                    setLargeDate(undefined);
                                    setCustomTimeDate(undefined);
                                }}
                                className="mb-2"
                            >
                                <Text className="text-primary-foreground">Clear All</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
`}
      registryName="date-time-picker"
      packageName="@nativeui/ui"
      dependencies={["react-native","date-fns","@expo/vector-icons","@nativeui/ui/calendar"]}
      changelog={[]}
    />
  );
}
