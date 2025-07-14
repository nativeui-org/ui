import * as React from 'react';
import { Pressable, View, Text, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { cn } from '@/lib/utils';

// Enable layout animation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface AccordionContextValue {
  value: string[];
  onValueChange: (itemValue: string) => void;
  type: 'single' | 'multiple';
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

export interface AccordionProps {
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  value?: string[];
  onValueChange?: (value: string[]) => void;
  defaultValue?: string[];
  className?: string;
  children: React.ReactNode;
}

const Accordion = ({
  type = 'single',
  collapsible = false,
  value,
  onValueChange,
  defaultValue,
  className,
  children,
}: AccordionProps) => {
  const [state, setState] = React.useState<string[]>(value || defaultValue || []);

  const isControlled = value !== undefined;
  const accordionValue = isControlled ? value : state;

  const handleValueChange = React.useCallback((itemValue: string) => {
    const isSelected = accordionValue.includes(itemValue);

    let newValue: string[] = [];

    if (type === 'single') {
      if (isSelected) {
        newValue = collapsible ? [] : [itemValue];
      } else {
        newValue = [itemValue];
      }
    } else {
      if (isSelected) {
        newValue = accordionValue.filter((v) => v !== itemValue);
      } else {
        newValue = [...accordionValue, itemValue];
      }
    }

    if (!isControlled) {
      setState(newValue);
    }

    onValueChange?.(newValue);
  }, [accordionValue, collapsible, isControlled, onValueChange, type]);

  return (
    <AccordionContext.Provider value={{ value: accordionValue, onValueChange: handleValueChange, type }}>
      <View className={cn("w-full", className)}>
        {children}
      </View>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

const AccordionItem = ({ value, className, children }: AccordionItemProps) => {
  const context = React.useContext(AccordionContext);

  if (!context) {
    throw new Error('AccordionItem must be used within an Accordion');
  }

  const isExpanded = context.value.includes(value);

  return (
    <View className={cn("border-b border-border", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            value,
            isExpanded,
          });
        }
        return child;
      })}
    </View>
  );
};

interface AccordionTriggerProps {
  className?: string;
  children: React.ReactNode;
  value?: string;
  isExpanded?: boolean;
}

const AccordionTrigger = ({
  className,
  children,
  value,
  isExpanded,
}: AccordionTriggerProps) => {
  const context = React.useContext(AccordionContext);

  if (!context || value === undefined) {
    return null;
  }

  const iconRotation = isExpanded ? 180 : 0;

  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    context.onValueChange(value);
  };

  return (
    <Pressable
      onPress={handlePress}
      className={cn(
        "flex-row items-center justify-between py-4",
        className
      )}
      accessibilityRole="button"
      accessibilityState={{ expanded: isExpanded }}
      accessibilityHint="Toggle accordion section"
    >
      <View className="flex-1">
        {typeof children === 'string' ? (
          <Text className="text-base font-medium text-foreground">{children}</Text>
        ) : (
          children
        )}
      </View>
      <View style={{ transform: [{ rotate: `${iconRotation}deg` }] }}>
        <Feather name="chevron-down" size={20} color="#888" />
      </View>
    </Pressable>
  );
};

interface AccordionContentProps {
  className?: string;
  children: React.ReactNode;
  value?: string;
  isExpanded?: boolean;
}

const AccordionContent = ({
  className,
  children,
  value,
  isExpanded,
}: AccordionContentProps) => {
  if (!isExpanded) {
    return null;
  }

  return (
    <View
      className={cn("pb-4 pt-0", className)}
    >
      {typeof children === 'string' ? (
        <Text className="text-base text-muted-foreground">{children}</Text>
      ) : (
        children
      )}
    </View>
  );
};

Accordion.displayName = 'Accordion';
AccordionItem.displayName = 'AccordionItem';
AccordionTrigger.displayName = 'AccordionTrigger';
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }; 