import * as React from "react";
import { Text, Pressable } from "react-native";
import { cn } from "@/lib/utils";

interface LabelProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  nativeID?: string;
  onPress?: () => void;
}

const Label = React.forwardRef<Text, LabelProps>(
  (
    { className, disabled, required, children, nativeID, onPress, ...props },
    ref
  ) => {
    const content = (
      <>
        {children}
        {required && <Text className="text-destructive ml-1">*</Text>}
      </>
    );

    if (onPress) {
      return (
        <Pressable
          disabled={disabled}
          onPress={onPress}
          className={cn("group", disabled && "opacity-50")}
        >
          <Text
            ref={ref}
            nativeID={nativeID}
            className={cn(
              "text-base font-medium text-foreground select-none",
              "ios:text-[17px] android:text-[16px]",
              "group-disabled:opacity-50",
              className
            )}
            {...props}
          >
            {content}
          </Text>
        </Pressable>
      );
    }

    return (
      <Text
        ref={ref}
        nativeID={nativeID}
        className={cn(
          "text-base font-medium text-foreground select-none",
          "ios:text-[17px] android:text-[16px]",
          disabled && "opacity-50",
          className
        )}
        {...props}
      >
        {content}
      </Text>
    );
  }
);

Label.displayName = "Label";

export { Label };
