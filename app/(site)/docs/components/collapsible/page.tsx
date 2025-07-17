import { ComponentPreview } from "@/components/docs/component-preview";

export default function CollapsiblePage() {
  return (
    <ComponentPreview
      name="Collapsible"
      description="A collapsible component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Collapsible } from \"@nativeui/ui\";\n\nexport default function CollapsibleDemo() {\n  return (\n    <Collapsible>\n      Click me\n    </Collapsible>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import * as React from "react";
import {
  View,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { cn } from "@/lib/utils";
import { Feather } from "@expo/vector-icons";

// Enable layout animation for Android
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface CollapsibleContextValue {
  open: boolean;
  toggle: () => void;
}

const CollapsibleContext = React.createContext<CollapsibleContextValue | null>(
  null
);

interface CollapsibleProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  className?: string;
  disabled?: boolean;
}

const Collapsible = React.forwardRef<View, CollapsibleProps>(
  (
    {
      children,
      className,
      open,
      onOpenChange,
      defaultOpen = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(
      open !== undefined ? open : defaultOpen
    );

    const isControlled = open !== undefined;
    const currentOpen = isControlled ? open : isOpen;

    const toggle = React.useCallback(() => {
      if (!disabled) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        if (!isControlled) {
          setIsOpen(!currentOpen);
        }

        if (onOpenChange) {
          onOpenChange(!currentOpen);
        }
      }
    }, [currentOpen, isControlled, onOpenChange, disabled]);

    React.useEffect(() => {
      if (isControlled) {
        setIsOpen(open || false);
      }
    }, [open, isControlled]);

    return (
      <CollapsibleContext.Provider value={{ open: currentOpen, toggle }}>
        <View
          ref={ref}
          className={cn("overflow-hidden", disabled && "opacity-50", className)}
          {...props}
        >
          {children}
        </View>
      </CollapsibleContext.Provider>
    );
  }
);

Collapsible.displayName = "Collapsible";

interface CollapsibleTriggerProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  icon?: boolean;
}

const CollapsibleTrigger = React.forwardRef<View, CollapsibleTriggerProps>(
  ({ children, className, asChild, icon = true, ...props }, ref) => {
    const context = React.useContext(CollapsibleContext);

    if (!context) {
      throw new Error("CollapsibleTrigger must be used within a Collapsible");
    }

    const { open, toggle } = context;

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        onPress: toggle,
        accessibilityRole: "button",
        accessibilityState: { expanded: open },
      } as any);
    }

    return (
      <Pressable
        ref={ref as any}
        className={cn(
          "flex-row items-center justify-between p-4 active:opacity-70",
          className
        )}
        onPress={toggle}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        accessibilityHint="Toggle collapsible section"
        {...props}
      >
        <View className="flex-row items-center flex-1">{children}</View>
        {icon && (
          <View style={{ transform: [{ rotate: open ? "180deg" : "0deg" }] }}>
            <Feather name="chevron-down" size={20} color="#888" />
          </View>
        )}
      </Pressable>
    );
  }
);

CollapsibleTrigger.displayName = "CollapsibleTrigger";

interface CollapsibleContentProps {
  children: React.ReactNode;
  className?: string;
}

const CollapsibleContent = React.forwardRef<View, CollapsibleContentProps>(
  ({ children, className, ...props }, ref) => {
    const context = React.useContext(CollapsibleContext);

    if (!context) {
      throw new Error("CollapsibleContent must be used within a Collapsible");
    }

    const { open } = context;

    if (!open) {
      return null;
    }

    return (
      <View ref={ref} className={cn("overflow-hidden", className)} {...props}>
        {children}
      </View>
    );
  }
);

CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
`}
      previewCode={`import { Collapsible } from "@nativeui/ui";

export default function CollapsibleDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Collapsible>Default Collapsible</Collapsible>
      <Collapsible variant="destructive">Delete</Collapsible>
      <Collapsible variant="outline">Outline</Collapsible>
      <Collapsible variant="secondary">Secondary</Collapsible>
      <Collapsible variant="ghost">Ghost</Collapsible>
      <Collapsible variant="link">Link</Collapsible>
    </div>
  );
}`}
      registryName="collapsible"
      packageName="@nativeui/ui"
      dependencies={["react-native","@expo/vector-icons"]}
      changelog={[]}
      customUsage={``}
    />
  );
}
