import { cn } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  addMonths,
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  format,
  getMonth,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  isWithinInterval,
  setHours,
  setMinutes,
  startOfDay,
  startOfMonth,
  subMonths,
} from "date-fns";
import { enUS } from "date-fns/locale";
import * as React from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface DateRange {
  from: Date;
  to: Date;
}

interface TimeConfig {
  minuteInterval?: 1 | 5 | 10 | 15 | 30;
  minTime?: string; // format "HH:mm"
  maxTime?: string; // format "HH:mm"
  disabledTimes?: string[]; // format ["HH:mm"]
}

interface CalendarProps {
  mode?: "single" | "range" | "datetime";
  selected?: Date | Date[] | DateRange;
  onSelect?: (date: Date | Date[] | DateRange | undefined) => void;
  className?: string;
  showOutsideDays?: boolean;
  showTime?: boolean;
  disabled?: (date: Date) => boolean;
  disableWeekends?: boolean;
  fromDate?: Date;
  toDate?: Date;
  timeConfig?: TimeConfig;
  firstDayOfWeek?: 0 | 1; // 0 for Sunday, 1 for Monday
  enableQuickMonthYear?: boolean;
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const DAY_SIZE = Math.min(Math.floor((SCREEN_WIDTH - 48) / 7), 50);

const isDateRange = (value: any): value is DateRange => {
  return value && typeof value === "object" && "from" in value && "to" in value;
};

const isInRange = (date: Date, range: DateRange) => {
  return isWithinInterval(date, { start: range.from, end: range.to });
};

const isRangeStart = (date: Date, range: DateRange) => {
  return isSameDay(date, range.from);
};

const isRangeEnd = (date: Date, range: DateRange) => {
  return isSameDay(date, range.to);
};

const CalendarHeader = React.memo(({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onHeaderPress,
  enableQuickMonthYear,
}: {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onHeaderPress?: () => void;
  enableQuickMonthYear?: boolean;
}) => (
  <View className="flex-row items-center justify-between mb-4">
    <Pressable
      onPress={onPrevMonth}
      className="p-2 rounded-full bg-muted active:scale-90 transition-transform"
    >
      <Ionicons name="chevron-back" size={24} className="color-primary" />
    </Pressable>

    {enableQuickMonthYear ? (
      <Pressable
        onPress={onHeaderPress}
        className="flex-row items-center space-x-1 px-3 py-2 rounded-lg active:bg-muted"
      >
        <Text className="text-xl font-semibold text-foreground">
          {format(currentDate, "MMMM yyyy", { locale: enUS })}
        </Text>
        <Ionicons name="chevron-down" size={20} className="color-primary" />
      </Pressable>
    ) : (
      <Text className="text-xl font-semibold text-foreground">
        {format(currentDate, "MMMM yyyy", { locale: enUS })}
      </Text>
    )}

    <Pressable
      onPress={onNextMonth}
      className="p-2 rounded-full bg-muted active:scale-90 transition-transform"
    >
      <Ionicons name="chevron-forward" size={24} className="color-primary" />
    </Pressable>
  </View>
));

const WeekdaysRow = React.memo(({ orderedWeekdays }: { orderedWeekdays: string[] }) => (
  <View className="flex-row justify-between mb-2">
    {orderedWeekdays.map((day) => (
      <View
        key={day}
        style={{ width: DAY_SIZE }}
        className="items-center justify-center"
      >
        <Text className="text-sm font-medium text-muted-foreground">
          {day}
        </Text>
      </View>
    ))}
  </View>
));

const CalendarDay = React.memo(({
  date,
  currentDate,
  mode,
  selected,
  isSelected,
  isDisabled,
  onPress,
}: {
  date: Date;
  currentDate: Date;
  mode: "single" | "range" | "datetime";
  selected: Date | Date[] | DateRange | undefined;
  isSelected: boolean;
  isDisabled: boolean;
  onPress: () => void;
}) => {
  const isCurrentMonth = isSameMonth(date, currentDate);
  const isTodayDate = isToday(date);

  let rangeStyles = "";
  if (mode === "range" && selected && isDateRange(selected)) {
    const isInCurrentRange = isInRange(date, selected);
    const isStart = isRangeStart(date, selected);
    const isEnd = isRangeEnd(date, selected);

    if (isInCurrentRange) {
      rangeStyles = "bg-primary/20";
    }
    if (isStart) {
      rangeStyles += " rounded-l-lg";
    }
    if (isEnd) {
      rangeStyles += " rounded-r-lg";
    }
    if (isStart || isEnd) {
      rangeStyles += " bg-primary";
    }
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      className={cn(
        "items-center justify-center",
        mode !== "range" && isSelected && "bg-primary rounded-lg",
        mode !== "range" && isTodayDate && isSelected && "bg-accent rounded-lg",
        isDisabled && "opacity-50",
        rangeStyles
      )}
    >
      <Text
        className={cn(
          "text-base",
          (isSelected &&
            mode === "range" &&
            isDateRange(selected) &&
            (isRangeStart(date, selected) || isRangeEnd(date, selected))) ||
            (isSelected && mode !== "range")
            ? "text-primary-foreground"
            : !isCurrentMonth
              ? "text-muted-foreground"
              : "text-foreground",
          isDisabled && "opacity-50"
        )}
      >
        {format(date, "d")}
      </Text>
    </Pressable>
  );
});

const TimeSelector = React.memo(({
  selectedDate,
  showTimePicker,
  onToggleTimePicker,
}: {
  selectedDate: Date;
  showTimePicker: boolean;
  onToggleTimePicker: () => void;
}) => (
  <View className="px-4 pb-4">
    <Pressable
      onPress={onToggleTimePicker}
      className="flex-row items-center justify-between bg-muted/50 rounded-xl p-4"
    >
      <View className="flex-row items-center">
        <View className="bg-primary/10 p-2 rounded-full mr-4">
          <Ionicons name="time-outline" size={22} className="text-foreground" />
        </View>
        <Text className="text-base font-medium text-foreground">
          {format(selectedDate, "HH:mm")}
        </Text>
      </View>
      <View className="flex-row items-center space-x-2">
        <Text className="text-sm text-muted-foreground">
          {showTimePicker ? "Tap to close" : "Tap to change"}
        </Text>
        <Ionicons
          name={showTimePicker ? "chevron-down" : "chevron-forward"}
          size={16}
          className="text-muted-foreground"
        />
      </View>
    </Pressable>
  </View>
));

const MonthYearPickerHeader = React.memo(({
  activeTab,
  onClose,
}: {
  activeTab: "month" | "year";
  setActiveTab: (tab: "month" | "year") => void;
  onClose: () => void;
}) => (
  <View className="border-b border-border">
    <View className="flex-row justify-between items-center px-4 py-3">
      <Pressable onPress={onClose} className="opacity-60 active:opacity-100">
        <Text className="text-grey">Cancel</Text>
      </Pressable>
      <Text className="text-lg font-semibold text-black">
        {activeTab === "month" ? "Select month" : "Select year"}
      </Text>
      <Pressable onPress={onClose} className="opacity-60 active:opacity-100">
        <Text className="text-grey font-semibold">Done</Text>
      </Pressable>
    </View>
  </View>
));

const MonthPicker = React.memo(({
  currentDate,
  onMonthSelect,
  onYearChange,
  onTabChange,
  fromDate,
  toDate,
}: {
  currentDate: Date;
  onMonthSelect: (month: number) => void;
  onYearChange: (year: number) => void;
  onTabChange: () => void;
  fromDate?: Date;
  toDate?: Date;
}) => {
  const currentYear = currentDate.getFullYear();
  const isPrevYearDisabled = fromDate && currentYear <= fromDate.getFullYear();
  const isNextYearDisabled = toDate && currentYear >= toDate.getFullYear();

  return (
    <View className="py-4">
      <View className="px-4 mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <Pressable
            onPress={() => onYearChange(currentYear - 1)}
            disabled={isPrevYearDisabled}
            className={cn(
              "p-2 rounded-full active:scale-90 transition-transform",
              isPrevYearDisabled && "opacity-50"
            )}
          >
            <Ionicons name="chevron-back" size={24} className="text-black" />
          </Pressable>

          <Pressable
            onPress={onTabChange}
            className="flex-row items-center px-4 py-2 rounded-lg active:opacity-60"
          >
            <Text className="text-xl font-semibold text-black">
              {currentYear}
            </Text>
            <View className="ml-2">
              <Ionicons name="chevron-forward" size={20} className="text-black" />
            </View>
          </Pressable>

          <Pressable
            onPress={() => onYearChange(currentYear + 1)}
            disabled={isNextYearDisabled}
            className={cn(
              "p-2 rounded-full active:scale-90 transition-transform",
              isNextYearDisabled && "opacity-50"
            )}
          >
            <Ionicons name="chevron-forward" size={24} className="text-black" />
          </Pressable>
        </View>
        <View className="flex-row flex-wrap justify-between">
          {MONTHS.map((month, index) => {
            const isDisabled =
              (fromDate && (
                currentYear === fromDate.getFullYear() &&
                index < fromDate.getMonth()
              )) ||
              (toDate && (
                currentYear === toDate.getFullYear() &&
                index > toDate.getMonth()
              ));

            return (
              <Pressable
                key={month}
                onPress={() => onMonthSelect(index)}
                disabled={isDisabled}
                className={cn(
                  "w-[30%] py-3 rounded-lg mb-3 active:scale-95 transition-transform",
                  getMonth(currentDate) === index ? "bg-black" : "bg-grey",
                  isDisabled && "opacity-50"
                )}
              >
                <Text
                  className={cn(
                    "text-base text-center",
                    getMonth(currentDate) === index
                      ? "text-white font-medium"
                      : "text-black",
                    isDisabled && "opacity-50"
                  )}
                >
                  {month}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
});

const YearPicker = React.memo(({
  currentDate,
  onYearSelect,
  onYearNavigate,
  fromDate,
  toDate,
}: {
  currentDate: Date;
  onYearSelect: (year: number) => void;
  onYearNavigate: (year: number) => void;
  fromDate?: Date;
  toDate?: Date;
}) => {
  const startYear = currentDate.getFullYear() - 10;
  const years = Array.from({ length: 20 }, (_, i) => startYear + i);

  const minYear = fromDate ? fromDate.getFullYear() : undefined;
  const maxYear = toDate ? toDate.getFullYear() : undefined;
  const isPrevDisabled = minYear !== undefined && startYear - 20 < minYear;
  const isNextDisabled = maxYear !== undefined && startYear + 20 > maxYear;

  return (
    <View className="py-4">
      <View className="px-4">
        <View className="flex-row justify-between items-center mb-4">
          <Pressable
            onPress={() => onYearNavigate(startYear - 20)}
            disabled={isPrevDisabled}
            className={cn(
              "p-2 rounded-full active:scale-90 transition-transform",
              isPrevDisabled && "opacity-50"
            )}
          >
            <Ionicons name="chevron-back" size={24} className="text-black" />
          </Pressable>
          <Text className="text-xl font-semibold text-black">
            {`${startYear} - ${startYear + 19}`}
          </Text>
          <Pressable
            onPress={() => onYearNavigate(startYear + 20)}
            disabled={isNextDisabled}
            className={cn(
              "p-2 rounded-full active:scale-90 transition-transform",
              isNextDisabled && "opacity-50"
            )}
          >
            <Ionicons name="chevron-forward" size={24} className="text-black" />
          </Pressable>
        </View>

        <View className="flex-row flex-wrap justify-between">
          {years.map((year) => {
            const isDisabled =
              (minYear !== undefined && year < minYear) ||
              (maxYear !== undefined && year > maxYear);

            return (
              <Pressable
                key={year}
                onPress={() => onYearSelect(year)}
                disabled={isDisabled}
                className={cn(
                  "w-[23%] py-3 rounded-lg mb-3 active:scale-95 transition-transform",
                  currentDate.getFullYear() === year ? "bg-black" : "bg-grey",
                  isDisabled && "opacity-50"
                )}
              >
                <Text
                  className={cn(
                    "text-base text-center",
                    currentDate.getFullYear() === year
                      ? "text-white font-medium"
                      : "text-black",
                    isDisabled && "opacity-50"
                  )}
                >
                  {year}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
});

export function Calendar({
  mode = "single",
  selected,
  onSelect,
  className,
  showOutsideDays = true,
  disabled,
  fromDate,
  toDate,
  timeConfig,
  firstDayOfWeek = 1,
  enableQuickMonthYear = false,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(() => {
    if (selected instanceof Date) {
      return selected;
    }
    return new Date();
  });
  const [showTimePicker, setShowTimePicker] = React.useState(false);
  const [showMonthYearPicker, setShowMonthYearPicker] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"month" | "year">("month");
  const [tempSelectedDate, setTempSelectedDate] = React.useState<Date | null>(null);

  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const orderedWeekdays = React.useMemo(() => {
    const days = [...WEEKDAYS];
    const firstDays = days.splice(0, firstDayOfWeek);
    return [...days, ...firstDays];
  }, [firstDayOfWeek]);

  const getDaysInMonth = React.useCallback((date: Date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const days = eachDayOfInterval({ start, end });

    // Add days from previous month to fill the first week
    const firstDayOfMonth = (start.getDay() - firstDayOfWeek + 7) % 7;
    if (showOutsideDays && firstDayOfMonth > 0) {
      const prevMonthDays = eachDayOfInterval({
        start: subMonths(start, 1),
        end: subMonths(end, 1),
      }).slice(-firstDayOfMonth);
      days.unshift(...prevMonthDays);
    }

    // Add days from next month to fill the last week
    if (showOutsideDays && days.length < 42) {
      const remainingDays = 42 - days.length;
      const nextMonthDays = eachDayOfInterval({
        start: addMonths(start, 1),
        end: addMonths(end, 1),
      }).slice(0, remainingDays);
      days.push(...nextMonthDays);
    }

    return days;
  }, [firstDayOfWeek, showOutsideDays]);

  const isSelected = React.useCallback((date: Date) => {
    if (!selected) return false;
    if (selected instanceof Date) {
      return isSameDay(selected, date);
    }
    if (Array.isArray(selected)) {
      return selected.some((s) => isSameDay(s, date));
    }
    if (isDateRange(selected)) {
      return (
        isSameDay(selected.from, date) ||
        isSameDay(selected.to, date) ||
        isWithinInterval(date, { start: selected.from, end: selected.to })
      );
    }
    return false;
  }, [selected]);

  const isDisabled = React.useCallback((date: Date) => {
    if (fromDate && isBefore(date, startOfDay(fromDate))) return true;
    if (toDate && isAfter(date, endOfDay(toDate))) return true;
    if (typeof disabled === "function") return disabled(date);
    return false;
  }, [fromDate, toDate, disabled]);

  const showPicker = React.useCallback(() => {
    setShowMonthYearPicker(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const hidePicker = React.useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowMonthYearPicker(false);
    });
  }, [fadeAnim]);

  const handleMonthSelect = React.useCallback((month: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(month);
    setCurrentDate(newDate);
    setShowMonthYearPicker(false);
  }, [currentDate]);

  const handleYearChange = React.useCallback((year: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
  }, [currentDate]);

  const handleYearSelect = React.useCallback((year: number) => {
    handleYearChange(year);
    setActiveTab("month");
  }, [handleYearChange]);

  const handleYearNavigate = React.useCallback((year: number) => {
    handleYearChange(year);
    // Ne pas changer d'onglet, rester en mode année
  }, [handleYearChange]);

  const handleDateSelect = React.useCallback((date: Date) => {
    if (isDisabled(date)) return;

    let newSelected: Date | Date[] | DateRange | undefined;

    switch (mode) {
      case "single":
        newSelected = date;
        break;
      case "range":
        if (!selected || !isDateRange(selected)) {
          newSelected = { from: date, to: date };
        } else {
          if (isSameDay(selected.from, selected.to)) {
            if (isBefore(date, selected.from)) {
              newSelected = { from: date, to: selected.from };
            } else {
              newSelected = { from: selected.from, to: date };
            }
          } else {
            newSelected = { from: date, to: date };
          }
        }
        break;
      case "datetime":
        setTempSelectedDate(date);
        if (selected instanceof Date) {
          const newDate = setMinutes(
            setHours(date, selected.getHours()),
            selected.getMinutes()
          );
          onSelect?.(newDate);
        } else {
          onSelect?.(date);
        }
        return;
      default:
        newSelected = date;
    }

    onSelect?.(newSelected);
  }, [mode, selected, onSelect, isDisabled]);

  const handleTimeChange = React.useCallback((event: any, selectedTime?: Date) => {
    if (Platform.OS === "android") {
      setShowTimePicker(false);
      if (event.type === "dismissed") return;
    }

    if (selectedTime && selected instanceof Date) {
      const newDate = setMinutes(
        setHours(selected, selectedTime.getHours()),
        selectedTime.getMinutes()
      );
      onSelect?.(newDate);
    }
  }, [selected, onSelect]);

  const handlePrevMonth = React.useCallback(() => {
    setCurrentDate(subMonths(currentDate, 1));
  }, [currentDate]);

  const handleNextMonth = React.useCallback(() => {
    setCurrentDate(addMonths(currentDate, 1));
  }, [currentDate]);

  const handleToggleTimePicker = React.useCallback(() => {
    setShowTimePicker(!showTimePicker);
  }, [showTimePicker]);

  return (
    <View className={cn("bg-background rounded-2xl", className)}>
      <View className="p-4">
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onHeaderPress={showPicker}
          enableQuickMonthYear={enableQuickMonthYear}
        />

        <Modal
          visible={showMonthYearPicker && enableQuickMonthYear}
          transparent
          animationType="none"
          onRequestClose={hidePicker}
        >
          <Animated.View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.25)",
              padding: 16,
              opacity: fadeAnim,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 24,
                overflow: "hidden",
                width: "90%",
                maxWidth: 400,
              }}
            >
              <MonthYearPickerHeader
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onClose={hidePicker}
              />

              {activeTab === "month" ? (
                <MonthPicker
                  currentDate={currentDate}
                  onMonthSelect={handleMonthSelect}
                  onYearChange={handleYearChange}
                  onTabChange={() => setActiveTab("year")}
                  fromDate={fromDate}
                  toDate={toDate}
                />
              ) : (
                <YearPicker
                  currentDate={currentDate}
                  onYearSelect={handleYearSelect}
                  onYearNavigate={handleYearNavigate}
                  fromDate={fromDate}
                  toDate={toDate}
                />
              )}
            </View>
          </Animated.View>
        </Modal>

        <WeekdaysRow orderedWeekdays={orderedWeekdays} />

        <View className="flex-row flex-wrap">
          {getDaysInMonth(currentDate).map((date, index) => (
            <CalendarDay
              key={index}
              date={date}
              currentDate={currentDate}
              mode={mode}
              selected={selected}
              isSelected={isSelected(date)}
              isDisabled={isDisabled(date)}
              onPress={() => handleDateSelect(date)}
            />
          ))}
        </View>
      </View>

      {mode === "datetime" && selected instanceof Date && (
        <TimeSelector
          selectedDate={selected}
          showTimePicker={showTimePicker}
          onToggleTimePicker={handleToggleTimePicker}
        />
      )}

      {showTimePicker &&
        selected instanceof Date &&
        (Platform.OS === "ios" ? (
          <View className="px-4 pb-4">
            <View className="bg-muted rounded-xl overflow-hidden">
              <DateTimePicker
                value={selected}
                mode="time"
                is24Hour={true}
                display="spinner"
                onChange={handleTimeChange}
                textColor={undefined}
                minuteInterval={timeConfig?.minuteInterval}
                locale="en"
              />
            </View>
          </View>
        ) : (
          <DateTimePicker
            value={selected}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleTimeChange}
            minuteInterval={timeConfig?.minuteInterval}
            locale="en"
          />
        ))}
    </View>
  );
}
