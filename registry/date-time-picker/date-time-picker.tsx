import { Calendar } from "@/components/ui/calendar";
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
        return `${fromFormatted} - ${toFormatted}`;
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
