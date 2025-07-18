import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import * as React from "react";
import { Text } from "react-native";

export default function ToggleGroupExampleScreen() {
    const [singleValue, setSingleValue] = React.useState<string>("center");

    const handleSingleValueChange = (value: string) => {
        setSingleValue(value);
    };

    return (
        <ToggleGroup
            type="single"
            value={singleValue}
            onValueChange={handleSingleValueChange}
            className="flex-wrap"
        >
            <ToggleGroupItem value="left">
                <Text className="text-foreground font-medium">Left</Text>
            </ToggleGroupItem>
            <ToggleGroupItem value="center">
                <Text className="text-foreground font-medium">Center</Text>
            </ToggleGroupItem>
            <ToggleGroupItem value="right">
                <Text className="text-foreground font-medium">Right</Text>
            </ToggleGroupItem>
        </ToggleGroup>
    );
}
