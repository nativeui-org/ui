import { useColorScheme } from "nativewind";
import { Pressable, Text } from "react-native";

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <Pressable
      accessibilityLabel="Toggle preview theme"
      onPress={toggleColorScheme}
    >
      <Text>{colorScheme === "dark" ? "Light mode" : "Dark mode"}</Text>
    </Pressable>
  );
}
