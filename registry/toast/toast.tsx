import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
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

const toastVariants = cva("px-4 py-3 rounded-lg shadow-lg border", {
	variants: {
		variant: {
			default: "bg-background border-border",
			success:
				"bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800",
			error:
				"bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800",
			warning:
				"bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800",
			info: "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800",
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
	position?: "top" | "bottom";
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

	const positionStyle = position === "top" ? { top: 50 } : { bottom: 50 };

	return (
		<ToastContext.Provider value={{ show }}>
			{children}
			{toast && (
				<Animated.View
					style={[
						styles.container,
						positionStyle,
						{
							opacity: fadeAnim,
							transform: [
								{
									translateY: fadeAnim.interpolate({
										inputRange: [0, 1],
										outputRange: position === "top" ? [-40, 0] : [40, 0],
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
		alignSelf: "center",
		left: 0,
		right: 0,
		alignItems: "center",
		paddingHorizontal: 16,
		zIndex: 9999,
	},
});

export { toastVariants, toastTextVariants };
export type { ToastType, ToastProviderProps };