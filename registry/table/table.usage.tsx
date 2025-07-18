import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Ionicons } from "@expo/vector-icons"
import * as React from "react"
import { Pressable, Text, View } from "react-native"

// Sample data for transactions
const transactions = [
    {
        id: "TX001",
        date: "2024-03-20",
        description: "Grocery Store",
        amount: -85.50,
        category: "Shopping",
        status: "completed",
    },
    {
        id: "TX002",
        date: "2024-03-19",
        description: "Salary Deposit",
        amount: 2500.00,
        category: "Income",
        status: "completed",
    },
    {
        id: "TX003",
        date: "2024-03-18",
        description: "Restaurant",
        amount: -45.75,
        category: "Dining",
        status: "pending",
    },
    {
        id: "TX004",
        date: "2024-03-17",
        description: "Uber Ride",
        amount: -22.50,
        category: "Transport",
        status: "completed",
    },
    {
        id: "TX005",
        date: "2024-03-16",
        description: "Freelance Payment",
        amount: 750.00,
        category: "Income",
        status: "completed",
    },
]


export default function TableExample() {
    const formatCurrency = (amount: number) => {
        return amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        })
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        })
    }

    const getAmountColor = (amount: number) => {
        return amount >= 0 ? "text-green-600" : "text-red-600"
    }

    return (
        <Table>
            <TableBody>
                {transactions.slice(0, 3).map((tx) => (
                    <Pressable key={tx.id}>
                        <TableRow>
                            <TableCell width={250}>
                                <View className="flex-row items-center">
                                    <View className={cn(
                                        "w-10 h-10 rounded-full mr-3 items-center justify-center",
                                        tx.amount >= 0 ? "bg-green-100" : "bg-red-100"
                                    )}>
                                        <Ionicons
                                            name={tx.amount >= 0 ? "arrow-down" : "arrow-up"}
                                            size={20}
                                            color={tx.amount >= 0 ? "#16a34a" : "#dc2626"}
                                        />
                                    </View>
                                    <View>
                                        <Text className="text-foreground font-medium">{tx.description}</Text>
                                        <Text className="text-sm text-muted-foreground">
                                            {formatDate(tx.date)}
                                        </Text>
                                    </View>
                                </View>
                            </TableCell>
                            <TableCell width={150} align="right">
                                <Text className={cn("font-medium", getAmountColor(tx.amount))}>
                                    {formatCurrency(tx.amount)}
                                </Text>
                                <Text className="text-sm text-muted-foreground">
                                    {tx.category}
                                </Text>
                            </TableCell>
                        </TableRow>
                    </Pressable>
                ))}
            </TableBody>
        </Table>
    )
}
