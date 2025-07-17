import { Button } from "@/components/ui/button";
import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ButtonScreen() {
  const [counter, setCounter] = useState(0);

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <>
      <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
        <ScrollView className="px-5 py-5">
          <View className="mb-6">
            <Text className="text-2xl font-bold mb-2 text-foreground">
              Button
            </Text>
            <Text className="text-base mb-4 text-muted-foreground">
              A flexible button component with different variants and sizes
            </Text>
            <Text className="text-base mb-4 text-foreground">
              Current mode: {isDark ? 'dark' : 'light'}
            </Text>
          </View>

          <Text className="text-base font-semibold text-foreground">
            Counter: {counter}
          </Text>

          <View className="mb-6 mt-6">
            <Text className="text-xl font-semibold mb-4 text-foreground">
              Button Variants
            </Text>

            <View className="gap-4">
              <View className="flex-row gap-3 flex-wrap">
                <Button
                  variant="default"
                  onPress={() => setCounter(counter + 1)}
                >
                  <Text className="text-primary-foreground dark:text-primary-foreground">Default</Text>
                </Button>

                <Button
                  variant="destructive"
                  onPress={() => setCounter(counter + 1)}
                >
                  <Text className="text-destructive-foreground dark:text-destructive-foreground">
                    Destructive
                  </Text>
                </Button>

                <Button
                  variant="outline"
                  onPress={() => setCounter(counter + 1)}
                >
                  <Text className="text-foreground dark:text-foreground">Outline</Text>
                </Button>
              </View>

              <View className="flex-row gap-3 flex-wrap">
                <Button
                  variant="secondary"
                  onPress={() => setCounter(counter + 1)}
                >
                  <Text className="text-secondary-foreground dark:text-secondary-foreground">Secondary</Text>
                </Button>

                <Button variant="ghost" onPress={() => setCounter(counter + 1)}>
                  <Text className="text-foreground dark:text-foreground">Ghost</Text>
                </Button>

                <Button variant="link" onPress={() => setCounter(counter + 1)}>
                  <Text className="text-primary dark:text-primary">Link</Text>
                </Button>
              </View>
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-xl font-semibold mb-4 text-foreground">
              Button Sizes
            </Text>

            <View className="gap-4">
              <View className="flex-row gap-3 items-center flex-wrap">
                <Button size="sm" onPress={() => setCounter(counter + 1)}>
                  <Text className="text-primary-foreground dark:text-primary-foreground">Small</Text>
                </Button>

                <Button size="default" onPress={() => setCounter(counter + 1)}>
                  <Text className="text-primary-foreground dark:text-primary-foreground">Default</Text>
                </Button>

                <Button size="lg" onPress={() => setCounter(counter + 1)}>
                  <Text className="text-primary-foreground dark:text-primary-foreground">Large</Text>
                </Button>

                <Button
                  size="icon"
                  onPress={() => setCounter(counter + 1)}
                >
                  <Feather name="plus" size={16} />
                </Button>
              </View>
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-xl font-semibold mb-4 text-foreground">
              Button States
            </Text>

            <View className="gap-4">
              <View className="flex-row gap-3 flex-wrap">
                <Button disabled onPress={() => setCounter(counter + 1)}>
                  <Text className="text-primary-foreground dark:text-primary-foreground">Disabled</Text>
                </Button>
                <Button onPress={() => setCounter(counter + 1)}>
                  <ActivityIndicator size="small" color={isDark ? "#111827" : "white"} />
                  <Text className="text-primary-foreground dark:text-primary-foreground ml-2">Loading</Text>
                </Button>
              </View>
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-xl font-semibold mb-4 text-foreground">
              Button with Icon
            </Text>

            <View className="gap-4">
              <View className="flex-row gap-3 flex-wrap">
                <Button onPress={() => setCounter(counter + 1)}>
                  <Feather name="plus" size={16} color={isDark ? "#111827" : "white"} />
                  <Text className="text-primary-foreground dark:text-primary-foreground ml-2">
                    With Icon
                  </Text>
                </Button>

                <Button
                  variant="outline"
                  onPress={() => setCounter(counter + 1)}
                >
                  <Feather name="settings" size={16} color={isDark ? "white" : "#111827"} />
                  <Text className="text-foreground dark:text-foreground ml-2">Settings</Text>
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
