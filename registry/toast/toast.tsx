import { cn } from "@/lib/utils";
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

