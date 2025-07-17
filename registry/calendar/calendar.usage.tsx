import { Calendar } from "@/components/ui/calendar";
import * as React from "react";

export default function CalendarExample() {
    const [quickPickerDate, setQuickPickerDate] = React.useState<Date>();

    return (
        <Calendar
            mode="single"
            selected={quickPickerDate}
            onSelect={(date) => setQuickPickerDate(date as Date)}
            className="border border-border"
            enableQuickMonthYear={true}
            fromDate={new Date(2020, 0, 1)}
            toDate={new Date(2050, 11, 31)}
        />
    );
}
