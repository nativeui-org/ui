import { Checkbox, CheckboxLabel } from "@/components/ui/checkbox";
import * as React from "react";
import { View } from "react-native";

export default function CheckboxExample() {
    const [termsAccepted, setTermsAccepted] = React.useState(false);

    return (
        <View className="flex-row items-center">
            <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={setTermsAccepted}
            />
            <CheckboxLabel htmlFor="terms">
                Accept terms and conditions
            </CheckboxLabel>
        </View>
    );
}
