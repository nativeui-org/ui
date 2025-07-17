import { Text, View } from "react-native";
import { Button } from "@/components/ui/button";

export default function ButtonScreen() {
  return (
    <View>
      <Button
        onPress={() => console.log("pressed!")}
      >
        <Text className="text-secondary-foreground dark:text-secondary-foreground">Press me</Text>
      </Button>
    </View>
  );
}
