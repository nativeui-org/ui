import React from "react";
import { View } from "react-native";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <View
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  );
}

export { Skeleton };
