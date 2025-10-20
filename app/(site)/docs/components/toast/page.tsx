import { ComponentPreview } from "@/components/docs/component-preview";

export default function ToastPage() {
  return (
    <ComponentPreview
      name="Toast"
      description="A toast component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Toast } from \"@nativeui/ui\";\n\nexport default function ToastDemo() {\n  return (\n    <Toast>\n      Click me\n    </Toast>\n  );\n}",
    "language": "tsx"
  },
  {
    "title": "Variants",
    "value": "variants",
    "content": "import { Toast } from \"@nativeui/ui\";\n\nexport default function ToastVariants() {\n  return (\n    <div className=\"flex flex-col gap-4\">\n      <Toast variant=\"default\">Default</Toast>\n      <Toast variant=\"success\">Success</Toast>\n      <Toast variant=\"error\">Error</Toast>\n      <Toast variant=\"warning\">Warning</Toast>\n      <Toast variant=\"info\">Info</Toast>\n    </div>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import * as React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

type ToastType = "default" | "success" | "error" | "warning" | "info";

interface ToastContextValue {
	show: (message: string, type?: ToastType) => void;
}

const ToastContext = React.createContext<ToastContextValue | undefined>(
	undefined,
);

export const useToast = () => {
	const context = React.useContext(ToastContext);
	if (!context) {
		throw new Error("useToast must be used within a ToastProvider");
	}
	return context;
};

const toastVariants = cva("px-5 py-4 rounded-2xl border", {
	variants: {
		variant: {
			default: "bg-background border-border backdrop-blur-sm",
			success:
				"bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800 backdrop-blur-sm",
			error:
				"bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800 backdrop-blur-sm",
			warning:
				"bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800 backdrop-blur-sm",
			info: "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800 backdrop-blur-sm",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

const toastTextVariants = cva("text-sm font-medium", {
	variants: {
		variant: {
			default: "text-foreground",
			success: "text-green-900 dark:text-green-100",
			error: "text-red-900 dark:text-red-100",
			warning: "text-yellow-900 dark:text-yellow-100",
			info: "text-blue-900 dark:text-blue-100",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

interface ToastProviderProps {
	children: React.ReactNode;
	duration?: number;
	position?: "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export function ToastProvider({
	children,
	duration = 3000,
	position = "bottom",
}: ToastProviderProps) {
	const [toast, setToast] = React.useState<{
		message: string;
		type: ToastType;
	} | null>(null);
	const fadeAnim = React.useRef(new Animated.Value(0)).current;
	const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(
		undefined,
	);

	const show = React.useCallback(
		(message: string, type: ToastType = "default") => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			setToast({ message, type });

			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 200,
				useNativeDriver: true,
			}).start(() => {
				timeoutRef.current = setTimeout(() => {
					Animated.timing(fadeAnim, {
						toValue: 0,
						duration: 200,
						useNativeDriver: true,
					}).start(() => setToast(null));
				}, duration);
			});
		},
		[fadeAnim, duration],
	);

	React.useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const getPositionStyle = () => {
		const sideMargin = 16;

		switch (position) {
			case "top":
				return { top: 50, alignSelf: "center" as const };
			case "bottom":
				return { bottom: 50, alignSelf: "center" as const };
			case "top-left":
				return { top: 50, left: sideMargin, alignSelf: "flex-start" as const };
			case "top-right":
				return { top: 50, right: sideMargin, alignSelf: "flex-end" as const };
			case "bottom-left":
				return { bottom: 50, left: sideMargin, alignSelf: "flex-start" as const };
			case "bottom-right":
				return { bottom: 50, right: sideMargin, alignSelf: "flex-end" as const };
			default:
				return { bottom: 50, alignSelf: "center" as const };
		}
	};

	return (
		<ToastContext.Provider value={{ show }}>
			{children}
			{toast && (
				<Animated.View
					style={[
						styles.container,
						getPositionStyle(),
						{
							opacity: fadeAnim,
							transform: [
								{
									translateY: fadeAnim.interpolate({
										inputRange: [0, 1],
										outputRange: position.includes("top") ? [-40, 0] : [40, 0],
									}),
								},
							],
						},
					]}
				>
					<View className={cn(toastVariants({ variant: toast.type }))}>
						<Text className={cn(toastTextVariants({ variant: toast.type }))}>
							{toast.message}
						</Text>
					</View>
				</Animated.View>
			)}
		</ToastContext.Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		alignItems: "center",
		zIndex: 9999,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.15,
		shadowRadius: 12,
		elevation: 8,
	},
});

export { toastTextVariants, toastVariants };
export type { ToastProviderProps, ToastType };

`}
      previewCode={`import { Button } from "@/components/ui/button";
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
}`}
      registryName="toast"
      packageName="@nativeui/ui"
      dependencies={["react-native"]}
      changelog={[]}
    />
  );
}
