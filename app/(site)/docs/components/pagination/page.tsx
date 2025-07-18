import { ComponentPreview } from "@/components/docs/component-preview";

export default function PaginationPage() {
  return (
    <ComponentPreview
      name="Pagination"
      description="A pagination component for React Native applications."
      examples={[
  {
    "title": "Default",
    "value": "default",
    "content": "import { Pagination } from \"@nativeui/ui\";\n\nexport default function PaginationDemo() {\n  return (\n    <Pagination>\n      Click me\n    </Pagination>\n  );\n}",
    "language": "tsx"
  }
]}
      componentCode={`import * as React from "react";
import { View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { cn } from "@/lib/utils";

const Pagination = ({
  className,
  ...props
}: React.ComponentProps<typeof View>) => (
  <View
    accessibilityRole="none"
    accessibilityLabel="pagination"
    className={cn("w-full justify-center items-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  View,
  React.ComponentProps<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("flex-row items-center justify-center gap-2", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  View,
  React.ComponentProps<typeof View>
>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
  onPress?: () => void;
  disabled?: boolean;
} & React.ComponentProps<typeof Pressable>;

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  onPress,
  disabled = false,
  children,
  ...props
}: PaginationLinkProps) => {
  // Different size variants for better touch targets on mobile
  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "h-8 min-w-8 px-2";
      case "lg":
        return "h-12 min-w-12 px-3";
      case "icon":
        return "h-10 w-10";
      default:
        return "h-10 min-w-10 px-2.5";
    }
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{
        selected: isActive,
        disabled: disabled,
      }}
      className={cn(
        "items-center justify-center rounded-md",
        getSizeStyles(),
        isActive
          ? "bg-primary text-primary-foreground"
          : "bg-background text-foreground",
        isActive && "font-medium",
        disabled && "opacity-50",
        className
      )}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      {...props}
    >
      {children}
    </Pressable>
  );
};
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink size="default" className={cn("gap-1", className)} {...props}>
    <View className="flex-row items-center">
      <Feather name="chevron-left" size={16} className="text-foreground" />
      <Text className="ml-0.5 text-sm text-foreground">Prev</Text>
    </View>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink size="default" className={cn("gap-1", className)} {...props}>
    <View className="flex-row items-center">
      <Text className="mr-0.5 text-sm text-foreground">Next</Text>
      <Feather name="chevron-right" size={16} className="text-foreground" />
    </View>
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<typeof View>) => (
  <View
    className={cn("flex h-10 w-10 items-center justify-center", className)}
    {...props}
  >
    <Feather name="more-horizontal" size={16} className="text-foreground" />
    <Text className="sr-only">More pages</Text>
  </View>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
`}
      previewCode={`import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import * as React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaginationExampleScreen() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const totalPages = 10;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const renderPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;

        // Case 1: Show just the first few pages
        if (currentPage <= 3) {
            for (let i = 1; i <= Math.min(maxVisiblePages, totalPages); i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            isActive={i === currentPage}
                            onPress={() => handlePageChange(i)}
                        >
                            <Text className={\`text-base \${i === currentPage ? 'text-primary-foreground' : 'text-foreground'}\`}>
                                {i}
                            </Text>
                        </PaginationLink>
                    </PaginationItem>
                );
            }

            if (totalPages > maxVisiblePages) {
                items.push(
                    <PaginationItem key="ellipsis1">
                        <PaginationEllipsis />
                    </PaginationItem>
                );

                items.push(
                    <PaginationItem key={totalPages}>
                        <PaginationLink onPress={() => handlePageChange(totalPages)}>
                            <Text className="text-base text-foreground">{totalPages}</Text>
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        }
        // Case 2: Show middle pages with ellipsis on both sides
        else if (currentPage > 3 && currentPage < totalPages - 2) {
            items.push(
                <PaginationItem key={1}>
                    <PaginationLink onPress={() => handlePageChange(1)}>
                        <Text className="text-base text-foreground">1</Text>
                    </PaginationLink>
                </PaginationItem>
            );

            items.push(
                <PaginationItem key="ellipsis1">
                    <PaginationEllipsis />
                </PaginationItem>
            );

            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            isActive={i === currentPage}
                            onPress={() => handlePageChange(i)}
                        >
                            <Text className={\`text-base \${i === currentPage ? 'text-primary-foreground' : 'text-foreground'}\`}>
                                {i}
                            </Text>
                        </PaginationLink>
                    </PaginationItem>
                );
            }

            items.push(
                <PaginationItem key="ellipsis2">
                    <PaginationEllipsis />
                </PaginationItem>
            );

            items.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink onPress={() => handlePageChange(totalPages)}>
                        <Text className="text-base text-foreground">{totalPages}</Text>
                    </PaginationLink>
                </PaginationItem>
            );
        }
        // Case 3: Show the last few pages
        else {
            items.push(
                <PaginationItem key={1}>
                    <PaginationLink onPress={() => handlePageChange(1)}>
                        <Text className="text-base text-foreground">1</Text>
                    </PaginationLink>
                </PaginationItem>
            );

            items.push(
                <PaginationItem key="ellipsis1">
                    <PaginationEllipsis />
                </PaginationItem>
            );

            for (let i = Math.max(totalPages - 4, 2); i <= totalPages; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            isActive={i === currentPage}
                            onPress={() => handlePageChange(i)}
                        >
                            <Text className={\`text-base \${i === currentPage ? 'text-primary-foreground' : 'text-foreground'}\`}>
                                {i}
                            </Text>
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        }

        return items;
    };

    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <ScrollView className="p-4">
                    <View className="mb-6">
                        <Text className="text-2xl font-bold mb-2 text-foreground">
                            Pagination
                        </Text>
                        <Text className="text-base mb-6 text-muted-foreground">
                            Navigation for pagination interface with page numbers and previous/next controls.
                        </Text>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Basic Pagination
                        </Text>
                        <View className="items-center">
                            <Pagination className="w-full max-w-screen-sm">
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onPress={() => handlePageChange(Math.max(1, currentPage - 1))}
                                            disabled={currentPage === 1}
                                        />
                                    </PaginationItem>

                                    {renderPaginationItems()}

                                    <PaginationItem>
                                        <PaginationNext
                                            onPress={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                            disabled={currentPage === totalPages}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                            <Text className="mt-4 text-foreground">
                                Page {currentPage} of {totalPages}
                            </Text>
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Simple Pagination (Without Numbers)
                        </Text>
                        <View className="items-center">
                            <Pagination className="w-full max-w-screen-sm">
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onPress={() => handlePageChange(Math.max(1, currentPage - 1))}
                                            disabled={currentPage === 1}
                                        />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext
                                            onPress={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                            disabled={currentPage === totalPages}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="text-xl font-semibold mb-4 text-foreground">
                            Number-Only Pagination
                        </Text>
                        <View className="items-center">
                            <Pagination className="w-full max-w-screen-sm">
                                <PaginationContent>
                                    {Array.from({ length: 3 }, (_, i) => i + 1).map((page) => (
                                        <PaginationItem key={page}>
                                            <PaginationLink
                                                isActive={page === currentPage}
                                                onPress={() => handlePageChange(page)}
                                            >
                                                <Text className={\`text-base \${page === currentPage ? 'text-primary-foreground' : 'text-foreground'}\`}>
                                                    {page}
                                                </Text>
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                </PaginationContent>
                            </Pagination>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
`}
      registryName="pagination"
      packageName="@nativeui/ui"
      dependencies={["react-native","@expo/vector-icons"]}
      changelog={[]}
    />
  );
}
