import {
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
                            <Text className={`text-base ${i === currentPage ? 'text-primary-foreground' : 'text-foreground'}`}>
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
                            <Text className={`text-base ${i === currentPage ? 'text-primary-foreground' : 'text-foreground'}`}>
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
                            <Text className={`text-base ${i === currentPage ? 'text-primary-foreground' : 'text-foreground'}`}>
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
                                                <Text className={`text-base ${page === currentPage ? 'text-primary-foreground' : 'text-foreground'}`}>
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
