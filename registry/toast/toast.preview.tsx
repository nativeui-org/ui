import { Button } from "@/components/ui/button";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function ToastScreen() {
	const { show } = useToast();
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === "dark";

	React.useEffect(() => {
		const timer = setTimeout(() => {
			show("Toast component loaded successfully!", "success");
		}, 500);
		return () => clearTimeout(timer);
	}, [show]);

	return (
		<>
			<SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
				<ScrollView className="px-5 py-5">
					<View className="mb-6">
						<Text className="text-2xl font-bold mb-2 text-foreground">
							Toast
						</Text>
						<Text className="text-base mb-4 text-muted-foreground">
							Display temporary notification messages
						</Text>
						<Text className="text-base mb-4 text-foreground">
							Current mode: {isDark ? "dark" : "light"}
						</Text>
					</View>

					<View className="mb-6">
						<Text className="text-xl font-semibold mb-4 text-foreground">
							Toast Variants
						</Text>

						<View className="gap-4">
							<View className="flex-row gap-3 flex-wrap">
								<Button onPress={() => show("This is a default toast")}>
									<Text className="text-primary-foreground dark:text-primary-foreground">
										Default
									</Text>
								</Button>

								<Button
									variant="outline"
									onPress={() => show("Operation successful!", "success")}
								>
									<Feather
										name="check-circle"
										size={16}
										color={isDark ? "white" : "#111827"}
									/>
									<Text className="text-foreground dark:text-foreground ml-2">
										Success
									</Text>
								</Button>

								<Button
									variant="destructive"
									onPress={() => show("Something went wrong", "error")}
								>
									<Feather
										name="alert-circle"
										size={16}
										color={isDark ? "#111827" : "white"}
									/>
									<Text className="text-destructive-foreground dark:text-destructive-foreground ml-2">
										Error
									</Text>
								</Button>
							</View>

							<View className="flex-row gap-3 flex-wrap">
								<Button
									variant="secondary"
									onPress={() => show("Please review your changes", "warning")}
								>
									<Feather
										name="alert-triangle"
										size={16}
										color={isDark ? "white" : "#111827"}
									/>
									<Text className="text-secondary-foreground dark:text-secondary-foreground ml-2">
										Warning
									</Text>
								</Button>

								<Button
									variant="ghost"
									onPress={() => show("Here's some information", "info")}
								>
									<Feather
										name="info"
										size={16}
										color={isDark ? "white" : "#111827"}
									/>
									<Text className="text-foreground dark:text-foreground ml-2">
										Info
									</Text>
								</Button>
							</View>
						</View>
					</View>

					<View className="mb-6">
						<Text className="text-xl font-semibold mb-4 text-foreground">
							Toast with Actions
						</Text>

						<View className="gap-4">
							<View className="flex-row gap-3 flex-wrap">
								<Button
									onPress={async () => {
										show("Processing...", "info");
										await new Promise((resolve) => setTimeout(resolve, 1500));
										show("Changes saved successfully!", "success");
									}}
								>
									<Feather
										name="save"
										size={16}
										color={isDark ? "#111827" : "white"}
									/>
									<Text className="text-primary-foreground dark:text-primary-foreground ml-2">
										Save Changes
									</Text>
								</Button>

								<Button
									variant="outline"
									onPress={async () => {
										show("Uploading file...", "info");
										await new Promise((resolve) => setTimeout(resolve, 2000));
										show("File uploaded!", "success");
									}}
								>
									<Feather
										name="upload"
										size={16}
										color={isDark ? "white" : "#111827"}
									/>
									<Text className="text-foreground dark:text-foreground ml-2">
										Upload File
									</Text>
								</Button>
							</View>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		</>
	);
}

export default function ToastPreview() {
	return (
		<ToastProvider duration={3000} position="bottom">
			<ToastScreen />
		</ToastProvider>
	);
}