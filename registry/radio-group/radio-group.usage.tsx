import {
    RadioGroup,
    RadioGroupItem,
    RadioGroupLabel,
} from "@/components/ui/radio-group";
import * as React from "react";
import { View } from "react-native";

export default function RadioGroupExample() {
    const [layoutPreference, setLayoutPreference] = React.useState("comfortable");

    return (
        <RadioGroup
            value={layoutPreference}
            onValueChange={setLayoutPreference}
            className="space-y-0"
        >
            <View className="flex-row items-center">
                <RadioGroupItem value="default" id="r1" />
                <RadioGroupLabel htmlFor="r1">Default</RadioGroupLabel>
            </View>
            <View className="flex-row items-center mt-2">
                <RadioGroupItem value="comfortable" id="r2" />
                <RadioGroupLabel htmlFor="r2">Comfortable</RadioGroupLabel>
            </View>
            <View className="flex-row items-center mt-2">
                <RadioGroupItem value="compact" id="r3" />
                <RadioGroupLabel htmlFor="r3">Compact</RadioGroupLabel>
            </View>
        </RadioGroup>
    );
}
