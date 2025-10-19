import { Button } from "@/components/ui/button";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { Text, View } from "react-native";

export default function ToastUsageExample() {
	return (
		<ToastProvider duration={3000} position="bottom">
			<View>
				<BasicToast />
			</View>
		</ToastProvider>
	);
}

function BasicToast() {
	const { show } = useToast();

	return (
		<View>
			<Button onPress={() => show("Your changes have been saved")}>
				<Text className="text-primary-foreground dark:text-primary-foreground">
					Show Toast
				</Text>
			</Button>
		</View>
	);
}