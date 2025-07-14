import { cn } from "@/lib/utils";
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
