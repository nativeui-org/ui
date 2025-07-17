import { ComponentPreview } from "@/components/docs/component-preview";

export default function LabelPage() {
  return (
    <ComponentPreview
      name="Label"
      description="A label component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Label } from \"@nativeui/ui\";\n\nexport default function LabelDemo() {\n  return (\n    <Label>\n      Click me\n    </Label>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import * as React from "react";
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
`}
      previewCode={`import { Label } from "@nativeui/ui";

export default function LabelDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Label>Default Label</Label>
      <Label variant="destructive">Delete</Label>
      <Label variant="outline">Outline</Label>
      <Label variant="secondary">Secondary</Label>
      <Label variant="ghost">Ghost</Label>
      <Label variant="link">Link</Label>
    </div>
  );
}`}
      registryName="label"
      packageName="@nativeui/ui"
      dependencies={["react-native"]}
      changelog={[]}
      customUsage={``}
    />
  );
}
