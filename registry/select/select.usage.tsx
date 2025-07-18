import { Select, SelectItem } from "@/components/ui/select";
import * as React from "react";

export default function SelectExample() {
    const [fruit, setFruit] = React.useState<string>("");

    return (
        <Select
            placeholder="Select a fruit"
            value={fruit}
            onValueChange={setFruit}
            size="medium"
        >
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
            <SelectItem value="strawberry">Strawberry</SelectItem>
            <SelectItem value="grape">Grape</SelectItem>
        </Select>
    );
}
