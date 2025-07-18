import { Skeleton } from "@/components/ui/skeleton";
import * as React from "react";
import { View } from "react-native";

export function SkeletonDemo() {
    return (
        <View className="flex-row items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <View className="gap-3">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </View>
        </View>
    );
}
