import { Switch } from "@/components/ui/switch";
import * as React from "react";

export default function SwitchExample() {
    const [wifi, setWifi] = React.useState(true);

    return (
        <Switch
            checked={wifi}
            onCheckedChange={setWifi}
        />
    );
}
