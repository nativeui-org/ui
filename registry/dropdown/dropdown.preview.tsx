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
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DropdownExample() {
    const [basicOpen, setBasicOpen] = React.useState(false);
    const [profileOpen, setProfileOpen] = React.useState(false);
    const [settingsOpen, setSettingsOpen] = React.useState(false);
    const [moreOpen, setMoreOpen] = React.useState(false);

    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <ScrollView className="flex-1 p-4">
                    <View className="mb-6">
                        <Text className="text-2xl font-bold mb-2 text-foreground">
                            Dropdown
                        </Text>
                        <Text className="text-base text-muted-foreground mb-6">
                            Displays a menu to the user — triggered by a button.
                        </Text>
                    </View>

                    {/* Basic Dropdown */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Basic Dropdown
                        </Text>
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
                    </View>

                    {/* Profile Dropdown */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Profile Dropdown
                        </Text>
                        <Dropdown open={profileOpen} onOpenChange={setProfileOpen}>
                            <DropdownTrigger asChild>
                                <Button>
                                    <Text className="text-primary-foreground">Account</Text>
                                </Button>
                            </DropdownTrigger>
                            <DropdownContent>
                                <DropdownLabel>My Account</DropdownLabel>
                                <DropdownGroup>
                                    <DropdownItem
                                        icon="person-outline"
                                        onSelect={() => console.log("Profile")}
                                        shortcut="⌘P"
                                    >
                                        Profile
                                    </DropdownItem>
                                    <DropdownItem
                                        icon="card-outline"
                                        onSelect={() => console.log("Billing")}
                                        shortcut="⌘B"
                                    >
                                        Billing
                                    </DropdownItem>
                                    <DropdownItem
                                        icon="settings-outline"
                                        onSelect={() => console.log("Settings")}
                                        shortcut="⌘S"
                                    >
                                        Settings
                                    </DropdownItem>
                                </DropdownGroup>
                                <DropdownSeparator />
                                <DropdownGroup>
                                    <DropdownItem
                                        icon="notifications-outline"
                                        onSelect={() => console.log("Notifications")}
                                    >
                                        Notifications
                                    </DropdownItem>
                                    <DropdownItem
                                        icon="lock-closed-outline"
                                        onSelect={() => console.log("Privacy")}
                                    >
                                        Privacy
                                    </DropdownItem>
                                </DropdownGroup>
                            </DropdownContent>
                        </Dropdown>
                    </View>

                    {/* Settings Dropdown */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Settings Dropdown
                        </Text>
                        <Dropdown open={settingsOpen} onOpenChange={setSettingsOpen}>
                            <DropdownTrigger asChild>
                                <Button variant="outline">
                                    <Text className="text-foreground">Settings</Text>
                                </Button>
                            </DropdownTrigger>
                            <DropdownContent>
                                <DropdownLabel>Appearance</DropdownLabel>
                                <DropdownItem
                                    icon="color-palette-outline"
                                    onSelect={() => console.log("Theme")}
                                >
                                    Theme
                                </DropdownItem>
                                <DropdownItem
                                    icon="text-outline"
                                    onSelect={() => console.log("Font Size")}
                                >
                                    Font Size
                                </DropdownItem>
                                <DropdownSeparator />
                                <DropdownLabel>Privacy</DropdownLabel>
                                <DropdownItem
                                    icon="eye-outline"
                                    onSelect={() => console.log("Visibility")}
                                >
                                    Visibility
                                </DropdownItem>
                                <DropdownItem
                                    icon="notifications-outline"
                                    onSelect={() => console.log("Notifications")}
                                >
                                    Notifications
                                </DropdownItem>
                            </DropdownContent>
                        </Dropdown>
                    </View>

                    {/* More Actions Dropdown */}
                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            More Actions
                        </Text>
                        <Dropdown open={moreOpen} onOpenChange={setMoreOpen}>
                            <DropdownTrigger asChild>
                                <Button variant="outline">
                                    <Text className="text-foreground">More</Text>
                                </Button>
                            </DropdownTrigger>
                            <DropdownContent>
                                <DropdownItem
                                    icon="share-outline"
                                    onSelect={() => console.log("Share")}
                                >
                                    Share
                                </DropdownItem>
                                <DropdownItem
                                    icon="duplicate-outline"
                                    onSelect={() => console.log("Duplicate")}
                                >
                                    Duplicate
                                </DropdownItem>
                                <DropdownSeparator />
                                <DropdownItem
                                    icon="archive-outline"
                                    onSelect={() => console.log("Archive")}
                                >
                                    Archive
                                </DropdownItem>
                                <DropdownItem
                                    icon="trash-outline"
                                    destructive
                                    onSelect={() => console.log("Delete")}
                                >
                                    Delete
                                </DropdownItem>
                            </DropdownContent>
                        </Dropdown>
                    </View>

                    <View className="h-20" />
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
