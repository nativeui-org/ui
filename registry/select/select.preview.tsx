import { Select, SelectGroup, SelectItem, SelectLabel, SelectSeparator } from "@/components/ui/select";
import * as React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SelectExample() {
    const [fruit, setFruit] = React.useState<string>("");
    const [pet, setPet] = React.useState<string>("");
    const [country, setCountry] = React.useState<string>("fr");
    const [framework, setFramework] = React.useState<string>("");

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
                                Select
                            </Text>
                            <Text className="text-base mb-6 text-muted-foreground">
                                Displays a dropdown menu for selecting a value from a list of options.
                            </Text>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Default Select
                            </Text>
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
                            <Text className="text-sm mt-2 text-muted-foreground">
                                {fruit ? `You selected: ${fruit}` : "No fruit selected"}
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
                                <Select
                                    placeholder="Select a pet"
                                    value={pet}
                                    onValueChange={setPet}
                                    size="medium"
                                >
                                    <SelectItem value="dog">Dog</SelectItem>
                                    <SelectItem value="cat">Cat</SelectItem>
                                    <SelectItem value="rabbit">Rabbit</SelectItem>
                                    <SelectItem value="hamster">Hamster</SelectItem>
                                    <SelectItem value="turtle">Turtle</SelectItem>
                                </Select>
                                <Text className="text-sm mt-2 text-muted-foreground">
                                    {pet ? `Selected pet: ${pet}` : "No pet selected"}
                                </Text>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                With Groups and Separator
                            </Text>
                            <Select
                                placeholder="Select a framework"
                                value={framework}
                                onValueChange={setFramework}
                                size="large"
                            >
                                <SelectLabel>Frontend</SelectLabel>
                                <SelectGroup>
                                    <SelectItem value="react">React</SelectItem>
                                    <SelectItem value="vue">Vue</SelectItem>
                                    <SelectItem value="angular">Angular</SelectItem>
                                </SelectGroup>
                                <SelectSeparator />
                                <SelectLabel>Backend</SelectLabel>
                                <SelectGroup>
                                    <SelectItem value="node">Node.js</SelectItem>
                                    <SelectItem value="django">Django</SelectItem>
                                    <SelectItem value="laravel">Laravel</SelectItem>
                                </SelectGroup>
                            </Select>
                            <Text className="text-sm mt-2 text-muted-foreground">
                                {framework ? `Selected framework: ${framework}` : "No framework selected"}
                            </Text>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                With Default Value
                            </Text>
                            <Select
                                placeholder="Select a country"
                                value={country}
                                onValueChange={setCountry}
                                size="medium"
                            >
                                <SelectItem value="us">United States</SelectItem>
                                <SelectItem value="ca">Canada</SelectItem>
                                <SelectItem value="uk">United Kingdom</SelectItem>
                                <SelectItem value="fr">France</SelectItem>
                                <SelectItem value="de">Germany</SelectItem>
                                <SelectItem value="jp">Japan</SelectItem>
                            </Select>
                            <Text className="text-sm mt-2 text-muted-foreground">
                                {`Selected country: ${country}`}
                            </Text>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                Disabled Select
                            </Text>
                            <Select
                                placeholder="Select an option"
                                disabled={true}
                                size="medium"
                            >
                                <SelectItem value="option1">Option 1</SelectItem>
                                <SelectItem value="option2">Option 2</SelectItem>
                                <SelectItem value="option3">Option 3</SelectItem>
                            </Select>
                        </View>

                        <View className="mb-8">
                            <Text className="text-xl font-semibold mb-4 text-foreground">
                                With Disabled Items
                            </Text>
                            <Select
                                placeholder="Select a day"
                                onValueChange={(value) => console.log(value)}
                                size="medium"
                            >
                                <SelectItem value="monday">Monday</SelectItem>
                                <SelectItem value="tuesday">Tuesday</SelectItem>
                                <SelectItem value="wednesday" disabled>Wednesday (Disabled)</SelectItem>
                                <SelectItem value="thursday">Thursday</SelectItem>
                                <SelectItem value="friday">Friday</SelectItem>
                                <SelectItem value="saturday" disabled>Saturday (Disabled)</SelectItem>
                                <SelectItem value="sunday" disabled>Sunday (Disabled)</SelectItem>
                            </Select>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}
