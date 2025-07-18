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

export default function PaginationExampleScreen() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const totalPages = 10;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
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
    );
}
