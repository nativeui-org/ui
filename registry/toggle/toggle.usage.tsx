import { Toggle } from "@/components/ui/toggle";
import * as React from "react";
import { Text } from "react-native";

export default function ToggleExampleScreen() {
    const [basicToggle, setBasicToggle] = React.useState(false);

    return (
        <Toggle pressed={basicToggle} onPressedChange={setBasicToggle}>
            <Text className="text-foreground font-medium">Toggle 1</Text>
        </Toggle>
    );
}
