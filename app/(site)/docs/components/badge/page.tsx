import { ComponentPreview } from "@/components/docs/component-preview";

export default function BadgePage() {
  return (
    <ComponentPreview
      name="Badge"
      description="A badge component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Badge } from \"@nativeui/ui\";\n\nexport default function BadgeDemo() {\n  return (\n    <Badge>\n      Click me\n    </Badge>\n  );\n}",
    "language": "tsx"
  },
  {
    "title": "Variants",
    "value": "variants",
    "content": "import { Badge } from \"@nativeui/ui\";\n\nexport default function BadgeVariants() {\n  return (\n    <div className=\"flex flex-col gap-4\">\n      <Badge variant=\"default\">Default</Badge>\n      <Badge variant=\"secondary\">Secondary</Badge>\n      <Badge variant=\"destructive\">Destructive</Badge>\n      <Badge variant=\"outline\">Outline</Badge>\n    </div>\n  );\n}",
    "language": "tsx"
  },
  {
    "title": "Sizes",
    "value": "sizes",
    "content": "import { Badge } from \"@nativeui/ui\";\n\nexport default function BadgeSizes() {\n  return (\n    <div className=\"flex items-center gap-4\">\n      <Badge size=\"default\">Default</Badge>\n      <Badge size=\"sm\">Sm</Badge>\n      <Badge size=\"lg\">Lg</Badge>\n    </div>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import * as React from "react";
import { View, Text, Pressable, ViewStyle } from "react-native";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "flex-row items-center justify-center rounded-full px-2.5 py-1",
  {
    variants: {
      variant: {
        default: "bg-primary",
        secondary: "bg-secondary",
        destructive: "bg-destructive",
        outline: "border border-input bg-transparent",
      },
      size: {
        default: "h-8 px-3",
        sm: "h-6 px-2.5",
        lg: "h-10 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends VariantProps<typeof badgeVariants> {
  className?: string;
  style?: ViewStyle;
  children: React.ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
}

function Badge({
  className,
  variant,
  size,
  style,
  children,
  onPress,
  accessibilityLabel,
}: BadgeProps) {
  const getTextStyle = () => {
    let textStyle = "font-medium";

    // Adjust text size based on badge size
    if (size === "lg") {
      textStyle = cn(textStyle, "text-sm");
    } else if (size === "sm") {
      textStyle = cn(textStyle, "text-xs");
    } else {
      textStyle = cn(textStyle, "text-xs");
    }

    // Adjust text color based on variant
    if (variant === "default") {
      textStyle = cn(textStyle, "text-primary-foreground");
    } else if (variant === "secondary") {
      textStyle = cn(textStyle, "text-secondary-foreground");
    } else if (variant === "destructive") {
      textStyle = cn(textStyle, "text-destructive-foreground");
    } else if (variant === "outline") {
      textStyle = cn(textStyle, "text-foreground");
    }

    return textStyle;
  };

  const content = (
    <View className={cn(badgeVariants({ variant, size, className }))} style={style}>
      {typeof children === 'string' ? (
        <Text
          className={getTextStyle()}
          numberOfLines={1}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || (typeof children === 'string' ? children : undefined)}
      >
        {({ pressed }) => (
          <View style={{ opacity: pressed ? 0.7 : 1 }}>
            {content}
          </View>
        )}
      </Pressable>
    );
  }

  return content;
}

Badge.displayName = "Badge";

export { Badge, badgeVariants }; `}
      previewCode={`import { Badge } from "@nativeui/ui";

export default function BadgeDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Badge>Default Badge</Badge>
      <Badge variant="destructive">Delete</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
    </div>
  );
}`}
      registryName="badge"
      packageName="@nativeui/ui"
      dependencies={["react-native","class-variance-authority"]}
      changelog={[]}
    />
  );
}
