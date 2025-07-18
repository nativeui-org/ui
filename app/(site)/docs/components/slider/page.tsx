import { ComponentPreview } from "@/components/docs/component-preview";

export default function SliderPage() {
  return (
    <ComponentPreview
      name="Slider"
      description="A slider component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Slider } from \"@nativeui/ui\";\n\nexport default function SliderDemo() {\n  return (\n    <Slider>\n      Click me\n    </Slider>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import { cn } from "@/lib/utils";
import * as React from "react";
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  PanResponder,
  PanResponderGestureState,
  Pressable,
  View,
} from "react-native";

export interface SliderProps {
  defaultValue?: number[];
  value?: number[];
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  trackClassName?: string;
  rangeClassName?: string;
  thumbClassName?: string;
  onValueChange?: (value: number[]) => void;
}

export const Slider = React.forwardRef<View, SliderProps>(
  (
    {
      defaultValue = [0],
      value,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      className,
      trackClassName,
      rangeClassName,
      thumbClassName,
      onValueChange,
    },
    ref
  ) => {
    const trackRef = React.useRef<View>(null);
    const [trackLayout, setTrackLayout] = React.useState({ width: 0, x: 0 });
    const [localValues, setLocalValues] = React.useState(
      value !== undefined ? [...value] : [...defaultValue]
    );
    const activeThumbIndex = React.useRef<number | null>(null);

    React.useEffect(() => {
      if (value !== undefined) {
        setLocalValues([...value]);
      }
    }, [value]);

    const values = value !== undefined ? value : localValues;

    const handleTrackLayout = (event: LayoutChangeEvent) => {
      const { width, x } = event.nativeEvent.layout;
      setTrackLayout({ width, x });
    };

    const getValueFromPosition = (position: number): number => {
      const trackWidth = trackLayout.width;
      if (trackWidth <= 0) return min;

      const relativePosition = Math.max(0, Math.min(1, position / trackWidth));
      const exactValue = min + relativePosition * (max - min);

      if (step > 0) {
        const steppedValue = Math.round(exactValue / step) * step;
        return Math.max(min, Math.min(max, steppedValue));
      }

      return Math.max(min, Math.min(max, exactValue));
    };

    const getPositionFromValue = (value: number): number => {
      const trackWidth = trackLayout.width;
      if (trackWidth <= 0) return 0;

      const relativePosition = (value - min) / (max - min);
      return relativePosition * trackWidth;
    };

    const updateValue = (newPositions: number[], activeIndex: number) => {
      const newValue = [...values];
      newValue[activeIndex] = getValueFromPosition(newPositions[activeIndex]);

      if (value === undefined) {
        setLocalValues(newValue);
      }

      onValueChange?.(newValue);
    };

    const panResponders = values.map((_, index) => {
      return PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onMoveShouldSetPanResponder: () => !disabled,
        onPanResponderGrant: () => {
          activeThumbIndex.current = index;
        },
        onPanResponderMove: (_, gestureState: PanResponderGestureState) => {
          if (disabled) return;

          const newPositions = [...values.map(v => getPositionFromValue(v))];
          newPositions[index] = Math.max(
            0,
            Math.min(trackLayout.width, gestureState.dx + getPositionFromValue(values[index]))
          );

          updateValue(newPositions, index);
        },
        onPanResponderRelease: () => {
          activeThumbIndex.current = null;
        },
      });
    });

    const handleTrackPress = (event: GestureResponderEvent) => {
      if (disabled) return;

      const trackX = trackLayout.x;
      const pressX = event.nativeEvent.pageX - trackX;

      const thumbPositions = values.map(v => getPositionFromValue(v));
      let closestThumbIndex = 0;
      let minDistance = Math.abs(thumbPositions[0] - pressX);

      for (let i = 1; i < thumbPositions.length; i++) {
        const distance = Math.abs(thumbPositions[i] - pressX);
        if (distance < minDistance) {
          minDistance = distance;
          closestThumbIndex = i;
        }
      }

      const newPositions = [...thumbPositions];
      newPositions[closestThumbIndex] = pressX;
      updateValue(newPositions, closestThumbIndex);
    };

    const isSingleValue = values.length === 1;

    return (
      <View
        ref={ref}
        className={cn(
          "relative w-full items-center justify-center my-3",
          className
        )}
      >
        <Pressable
          ref={trackRef}
          onLayout={handleTrackLayout}
          onPress={handleTrackPress}
          className="w-full"
        >
          <View
            className={cn(
              "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
              disabled && "bg-muted",
              trackClassName
            )}
          >
            <View
              className={cn(
                "absolute h-full bg-primary",
                disabled && "bg-muted-foreground",
                rangeClassName
              )}
              style={
                isSingleValue
                  ? {
                    left: 0,
                    width: getPositionFromValue(values[0]),
                  }
                  : {
                    left: getPositionFromValue(Math.min(...values)),
                    width: Math.max(
                      getPositionFromValue(Math.max(...values)) - getPositionFromValue(Math.min(...values)),
                      4
                    ),
                  }
              }
            />
          </View>
        </Pressable>

        {values.map((value, index) => (
          <View
            key={index}
            style={{
              position: 'absolute',
              transform: [{ translateX: getPositionFromValue(value) }],
              top: -8,
              left: 0,
              zIndex: 10,
            }}
            {...panResponders[index].panHandlers}
            className={cn(
              "h-6 w-6 rounded-full border-2 border-primary bg-background shadow-md",
              disabled && "border-muted-foreground bg-muted",
              thumbClassName
            )}
          />
        ))}
      </View>
    );
  }
);

Slider.displayName = "Slider";
`}
      previewCode={`import { Slider } from "@/components/ui/slider";
import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SliderExample() {
    const [volume, setVolume] = React.useState([50]);
    const [brightness, setBrightness] = React.useState([75]);
    const [temperature, setTemperature] = React.useState([22]);
    const [range, setRange] = React.useState([30, 70]);

    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <ScrollView className="p-4">
                    <View className="mb-8">
                        <Text className="text-2xl font-bold mb-2 text-foreground">
                            Slider
                        </Text>
                        <Text className="text-base mb-6 text-muted-foreground">
                            An input component for selecting a value or range from a given range.
                        </Text>
                    </View>

                    <View className="mb-10">
                        <Text className="text-xl font-semibold mb-5 text-foreground">
                            Basic Example
                        </Text>
                        <View className="rounded-lg p-4">
                            <Text className="text-foreground mb-2">Volume: {volume[0]}%</Text>
                            <Slider
                                value={volume}
                                onValueChange={setVolume}
                                className="mt-2"
                            />
                        </View>
                    </View>

                    <View className="mb-10">
                        <Text className="text-xl font-semibold mb-5 text-foreground">
                            Custom Min/Max
                        </Text>
                        <View className="rounded-lg p-4">
                            <Text className="text-foreground mb-2">Temperature: {temperature[0]}°C</Text>
                            <Slider
                                value={temperature}
                                onValueChange={setTemperature}
                                min={16}
                                max={30}
                                step={0.5}
                                className="mt-2"
                            />
                            <Text className="text-sm text-muted-foreground mt-2">
                                Range: 16°C - 30°C, Step: 0.5°C
                            </Text>
                        </View>
                    </View>

                    <View className="mb-10">
                        <Text className="text-xl font-semibold mb-5 text-foreground">
                            Range Slider
                        </Text>
                        <View className="rounded-lg p-4">
                            <Text className="text-foreground mb-2">
                                Price Range: \${range[0]} - \${range[1]}
                            </Text>
                            <Slider
                                value={range}
                                onValueChange={setRange}
                                min={0}
                                max={100}
                                className="mt-2"
                            />
                            <Text className="text-sm text-muted-foreground mt-2">
                                A slider with two thumbs for selecting a range of values
                            </Text>
                        </View>
                    </View>

                    <View className="mb-10">
                        <Text className="text-xl font-semibold mb-5 text-foreground">
                            Disabled State
                        </Text>
                        <View className="rounded-lg p-4">
                            <Text className="text-foreground mb-2">
                                Brightness: 75%
                            </Text>
                            <Slider
                                value={[75]}
                                disabled={true}
                                className="mt-2"
                            />
                            <Text className="text-sm text-muted-foreground mt-2">
                                A disabled slider is non-interactive
                            </Text>
                        </View>
                    </View>

                    <View className="mb-10">
                        <Text className="text-xl font-semibold mb-5 text-foreground">
                            Custom Styling
                        </Text>
                        <View className="rounded-lg p-4">
                            <Text className="text-foreground mb-2">
                                Brightness: {brightness[0]}%
                            </Text>
                            <Slider
                                value={brightness}
                                onValueChange={setBrightness}
                                className="mt-2"
                                trackClassName="bg-yellow-200"
                                rangeClassName="bg-yellow-500"
                                thumbClassName="border-yellow-500 bg-yellow-50"
                            />
                            <Text className="text-sm text-muted-foreground mt-2">
                                Custom styling applied to track, range and thumb
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
`}
      registryName="slider"
      packageName="@nativeui/ui"
      dependencies={["react-native"]}
      changelog={[]}
    />
  );
}
