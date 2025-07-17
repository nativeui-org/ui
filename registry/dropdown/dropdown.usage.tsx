import { Button } from "@/components/ui/button";
import {
    Dropdown,
    DropdownContent,
    DropdownGroup,
    DropdownItem,
    DropdownLabel,
    DropdownSeparator,
    DropdownTrigger,
} from "@/components/ui/dropdown";
import * as React from "react";
import { Text } from "react-native";
export default function DropdownExample() {
    const [basicOpen, setBasicOpen] = React.useState(false);

    return (
        <Dropdown open={basicOpen} onOpenChange={setBasicOpen}>
            <DropdownTrigger asChild>
                <Button variant="outline">
                    <Text className="text-foreground">Open Menu</Text>
                </Button>
            </DropdownTrigger>
            <DropdownContent>
                <DropdownItem icon="person-outline" onSelect={() => console.log("Profile")}>
                    Profile
                </DropdownItem>
                <DropdownItem icon="settings-outline" onSelect={() => console.log("Settings")}>
                    Settings
                </DropdownItem>
                <DropdownItem icon="help-circle-outline" onSelect={() => console.log("Help")}>
                    Help Center
                </DropdownItem>
            </DropdownContent>
        </Dropdown>
    );
}
