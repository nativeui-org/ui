import { Combobox } from "@/components/ui/combobox";
import * as React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ComboboxExample() {
    const [fruit, setFruit] = React.useState<string>("");
    const [pet, setPet] = React.useState<string>("");
    const [country, setCountry] = React.useState<string>("fr");
    const [framework, setFramework] = React.useState<string>("");
    const [selectedLanguages, setSelectedLanguages] = React.useState<string[]>([]);
    const [selectedColors, setSelectedColors] = React.useState<string[]>(["red", "blue"]);

    // Sample data for comboboxes
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

    const pets = [
        { value: "dog", label: "Dog" },
        { value: "cat", label: "Cat" },
        { value: "rabbit", label: "Rabbit" },
        { value: "hamster", label: "Hamster" },
        { value: "turtle", label: "Turtle" },
        { value: "bird", label: "Bird" },
        { value: "fish", label: "Fish" },
    ];

    const countries = [
        { value: "us", label: "United States" },
        { value: "ca", label: "Canada" },
        { value: "uk", label: "United Kingdom" },
        { value: "fr", label: "France" },
        { value: "de", label: "Germany" },
        { value: "jp", label: "Japan" },
        { value: "au", label: "Australia" },
        { value: "br", label: "Brazil" },
        { value: "in", label: "India" },
        { value: "cn", label: "China" },
    ];

    const frontendFrameworks = [
        { value: "react", label: "React" },
        { value: "vue", label: "Vue" },
        { value: "angular", label: "Angular" },
        { value: "svelte", label: "Svelte" },
        { value: "solid", label: "SolidJS" },
    ];

    const backendFrameworks = [
        { value: "node", label: "Node.js" },
        { value: "django", label: "Django" },
        { value: "laravel", label: "Laravel" },
        { value: "spring", label: "Spring Boot" },
        { value: "rails", label: "Ruby on Rails" },
    ];

    // Combined frameworks
    const allFrameworks = [...frontendFrameworks, ...backendFrameworks];

    // Programming languages for multiple selection
    const programmingLanguages = [
        { value: "javascript", label: "JavaScript" },
        { value: "typescript", label: "TypeScript" },
        { value: "python", label: "Python" },
        { value: "java", label: "Java" },
        { value: "csharp", label: "C#" },
        { value: "cpp", label: "C++" },
        { value: "rust", label: "Rust" },
        { value: "go", label: "Go" },
        { value: "ruby", label: "Ruby" },
        { value: "php", label: "PHP" },
        { value: "swift", label: "Swift" },
        { value: "kotlin", label: "Kotlin" },
    ];

    // Colors for multiple selection with default values
    const colors = [
        { value: "red", label: "Red" },
        { value: "blue", label: "Blue" },
        { value: "green", label: "Green" },
        { value: "yellow", label: "Yellow" },
        { value: "purple", label: "Purple" },
        { value: "orange", label: "Orange" },
        { value: "pink", label: "Pink" },
        { value: "brown", label: "Brown" },
        { value: "black", label: "Black" },
        { value: "white", label: "White" },
    ];

    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={100}
                >
                    <ScrollView
                        className="p-4"
                        keyboardShouldPersistTaps="handled"
                        nestedScrollEnabled={true}
                    >
                        <View className="mb-6">
                            <Text className="text-2xl font-bold mb-2 text-foreground">
                                Combobox
                            </Text>
                            <Text className="text-base mb-6 text-muted-foreground">
                                Displays a searchable dropdown menu for selecting a value from a list of options.
                            </Text>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Basic Combobox
                            </Text>
                            <Combobox
                                placeholder="Select a fruit"
                                searchPlaceholder="Search fruits..."
                                value={fruit}
                                onValueChange={(value) => setFruit(value as string)}
                                items={fruits}
                            />
                            <Text className="text-sm mt-2 text-muted-foreground">
                                {fruit ? `You selected: ${fruit}` : "No fruit selected"}
                            </Text>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Multiple Selection
                            </Text>
                            <Combobox
                                placeholder="Select programming languages"
                                searchPlaceholder="Search languages..."
                                value={selectedLanguages}
                                onValueChange={(value) => setSelectedLanguages(value as string[])}
                                items={programmingLanguages}
                                multiple={true}
                            />
                            <Text className="text-sm mt-2 text-muted-foreground">
                                {selectedLanguages.length > 0
                                    ? `Selected: ${selectedLanguages.map(lang =>
                                        programmingLanguages.find(l => l.value === lang)?.label).join(', ')}`
                                    : "No languages selected"}
                            </Text>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Multiple Selection with Default Values
                            </Text>
                            <Combobox
                                placeholder="Select colors"
                                searchPlaceholder="Search colors..."
                                value={selectedColors}
                                onValueChange={(value) => setSelectedColors(value as string[])}
                                items={colors}
                                multiple={true}
                            />
                            <Text className="text-sm mt-2 text-muted-foreground">
                                {selectedColors.length > 0
                                    ? `Selected: ${selectedColors.map(color =>
                                        colors.find(c => c.value === color)?.label).join(', ')}`
                                    : "No colors selected"}
                            </Text>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                With Label
                            </Text>
                            <View>
                                <Text className="text-sm font-medium mb-2 text-foreground">
                                    Select a pet
                                </Text>
                                <Combobox
                                    placeholder="Select a pet"
                                    searchPlaceholder="Search pets..."
                                    value={pet}
                                    onValueChange={(value) => setPet(value as string)}
                                    items={pets}
                                />
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                With Default Value
                            </Text>
                            <Combobox
                                placeholder="Select a country"
                                searchPlaceholder="Search countries..."
                                value={country}
                                onValueChange={(value) => setCountry(value as string)}
                                items={countries}
                            />
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                With Custom Filter
                            </Text>
                            <Combobox
                                placeholder="Select a framework"
                                searchPlaceholder="Search frameworks..."
                                value={framework}
                                onValueChange={(value) => setFramework(value as string)}
                                items={allFrameworks}
                                filter={(item, search) => {
                                    // Check if search term is in the label or value
                                    return (
                                        item.label.toLowerCase().includes(search.toLowerCase()) ||
                                        item.value.toLowerCase().includes(search.toLowerCase())
                                    );
                                }}
                            />
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Disabled Combobox
                            </Text>
                            <Combobox
                                placeholder="Select an option"
                                disabled={true}
                                items={fruits}
                            />
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                With Disabled Items
                            </Text>
                            <Combobox
                                placeholder="Select a day"
                                searchPlaceholder="Search days..."
                                items={[
                                    { value: "monday", label: "Monday" },
                                    { value: "tuesday", label: "Tuesday" },
                                    { value: "wednesday", label: "Wednesday", disabled: true },
                                    { value: "thursday", label: "Thursday" },
                                    { value: "friday", label: "Friday" },
                                    { value: "saturday", label: "Saturday", disabled: true },
                                    { value: "sunday", label: "Sunday", disabled: true },
                                ]}
                                onValueChange={(value) => console.log(value)}
                            />
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                With Many Items
                            </Text>
                            <Combobox
                                placeholder="Select a number"
                                searchPlaceholder="Search numbers..."
                                items={Array.from({ length: 100 }, (_, i) => ({
                                    value: `num-${i + 1}`,
                                    label: `Number ${i + 1}`
                                }))}
                                emptyText="No numbers found"
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}