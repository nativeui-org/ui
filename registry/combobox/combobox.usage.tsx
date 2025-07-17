import { Combobox } from "@/components/ui/combobox";
import * as React from "react";

export default function ComboboxExample() {
    const [fruit, setFruit] = React.useState<string>("");

    const fruits = [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "orange", label: "Orange" },
        { value: "strawberry", label: "Strawberry" },
        { value: "grape", label: "Grape" },
        { value: "pineapple", label: "Pineapple" },
        { value: "mango", label: "Mango" },
        { value: "kiwi", label: "Kiwi" },
        { value: "peach", label: "Peach" },
        { value: "plum", label: "Plum" },
    ];

    return (
        <Combobox
            placeholder="Select a fruit"
            searchPlaceholder="Search fruits..."
            value={fruit}
            onValueChange={(value) => setFruit(value as string)}
            items={fruits}
        />
    );
}