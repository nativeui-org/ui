import { DateTimePicker } from "@/components/ui/date-time-picker";
import * as React from "react";

interface DateRange {
    from: Date;
    to: Date;
}

export default function DateTimePickerExample() {
    const [singleDate, setSingleDate] = React.useState<Date | undefined>(
        undefined
    );

    const handleSingleDateChange = (
        value: Date | Date[] | DateRange | undefined
    ) => {
        if (value instanceof Date || value === undefined) {
            setSingleDate(value);
        }
    };

    return (
        <DateTimePicker
            mode="single"
            value={singleDate}
            onValueChange={handleSingleDateChange}
            placeholder="Select a date"
            enableQuickMonthYear={true}
        />
    );
}
