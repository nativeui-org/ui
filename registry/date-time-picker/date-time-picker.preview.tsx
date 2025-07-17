import { Button } from "@/components/ui/button";
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
        let message = `${label}:\n`;

        if (!value) {
            message += "No date selected";
        } else if (value instanceof Date) {
            message += format(value, "PPP 'at' HH:mm");
        } else if (value.from && value.to) {
            message += `From: ${format(value.from, "PPP")}\nTo: ${format(
                value.to,
                "PPP"
            )}`;
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
