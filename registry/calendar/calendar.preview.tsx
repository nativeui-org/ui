import { Calendar } from "@/components/ui/calendar";
import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CalendarExample() {
    const [singleDate, setSingleDate] = React.useState<Date>();
    const [dateRange, setDateRange] = React.useState<{
        from: Date;
        to: Date;
    }>();
    const [dateTime, setDateTime] = React.useState<Date>();
    const [dateTime5min, setDateTime5min] = React.useState<Date>();
    const [disabledDate, setDisabledDate] = React.useState<Date>();
    const [quickPickerDate, setQuickPickerDate] = React.useState<Date>();

    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <ScrollView className="flex-1 p-4">
                    <View className="mb-6">
                        <Text className="text-2xl font-bold mb-2 text-foreground">
                            Calendar
                        </Text>
                        <Text className="text-base text-muted-foreground mb-6">
                            A date picker component with single date, date range, and
                            date-time selection modes.
                        </Text>
                    </View>

                    {/* Quick Month/Year Selection - English */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Quick Month/Year Selection (English)
                        </Text>
                        <Calendar
                            mode="single"
                            selected={quickPickerDate}
                            onSelect={(date) => setQuickPickerDate(date as Date)}
                            className="border border-border"
                            enableQuickMonthYear={true}
                            fromDate={new Date(2020, 0, 1)}
                            toDate={new Date(2050, 11, 31)}
                        />
                        <Text className="mt-2 text-sm text-muted-foreground">
                            Tap on the month/year to open native month/year picker
                        </Text>
                        <Text className="mt-1 text-sm text-muted-foreground">
                            Selected date: {quickPickerDate?.toLocaleDateString("fr")}
                        </Text>
                    </View>

                    {/* Single Date Selection */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Single Date (Sunday First)
                        </Text>
                        <Calendar
                            mode="single"
                            selected={singleDate}
                            onSelect={(date) => setSingleDate(date as Date)}
                            className="border border-border"
                            firstDayOfWeek={0}
                        />
                        <Text className="mt-2 text-sm text-muted-foreground">
                            Selected date: {singleDate?.toLocaleDateString()}
                        </Text>
                    </View>

                    {/* Date Range Selection */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Date Range
                        </Text>
                        <Calendar
                            mode="range"
                            selected={dateRange}
                            onSelect={(range) =>
                                setDateRange(range as { from: Date; to: Date })
                            }
                            className="border border-border"
                        />
                        <Text className="mt-2 text-sm text-muted-foreground">
                            Selected range:{" "}
                            {dateRange
                                ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
                                : "No range selected"}
                        </Text>
                    </View>

                    {/* Date Time Selection */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Date & Time (Default)
                        </Text>
                        <Calendar
                            mode="datetime"
                            selected={dateTime}
                            onSelect={(date) => setDateTime(date as Date)}
                            showTime
                            className="border border-border"
                        />
                        <Text className="mt-2 text-sm text-muted-foreground">
                            Selected date & time:{" "}
                            {dateTime
                                ? `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`
                                : "No date/time selected"}
                        </Text>
                    </View>

                    {/* Date Time with 5min intervals */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Date & Time (5min intervals)
                        </Text>
                        <Calendar
                            mode="datetime"
                            selected={dateTime5min}
                            onSelect={(date) => setDateTime5min(date as Date)}
                            showTime
                            timeConfig={{
                                minuteInterval: 5,
                            }}
                            className="border border-border"
                        />
                        <Text className="mt-2 text-sm text-muted-foreground">
                            Selected date & time:{" "}
                            {dateTime5min
                                ? `${dateTime5min.toLocaleDateString()} ${dateTime5min.toLocaleTimeString()}`
                                : "No date/time selected"}
                        </Text>
                    </View>

                    {/* Disabled Dates Example */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            With Disabled Dates
                        </Text>
                        <Calendar
                            mode="single"
                            selected={disabledDate}
                            onSelect={(date) => setDisabledDate(date as Date)}
                            fromDate={new Date()}
                            disabled={
                                (date) => date.getDay() === 0 || date.getDay() === 6 // Disable weekends
                            }
                            className="border border-border"
                        />
                        <Text className="mt-2 text-sm text-muted-foreground">
                            Selected date:{" "}
                            {disabledDate?.toLocaleDateString() || "No date selected"}
                        </Text>
                    </View>

                    <View className="h-20" />
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
