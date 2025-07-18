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
import { Pressable, ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

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

// Sample data for monthly summary
const monthlySummary = [
    { category: "Income", amount: 3250.00 },
    { category: "Shopping", amount: -425.75 },
    { category: "Dining", amount: -185.50 },
    { category: "Transport", amount: -95.25 },
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

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "text-green-600"
            case "pending":
                return "text-amber-600"
            default:
                return "text-gray-600"
        }
    }

    const getAmountColor = (amount: number) => {
        return amount >= 0 ? "text-green-600" : "text-red-600"
    }

    return (
        <>
            <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
                <ScrollView className="flex-1 p-4">
                    {/* Recent Transactions Table */}
                    <View className="mb-8">
                        <Text className="text-2xl font-bold mb-2 text-foreground">
                            Recent Transactions
                        </Text>
                        <Text className="text-foreground mb-4 text-muted-foreground">
                            Your latest financial activities
                        </Text>

                        <Table>
                            <TableCaption>Your transaction history for March 2024.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead width={100}>Date</TableHead>
                                    <TableHead width={180}>Description</TableHead>
                                    <TableHead width={120} align="right">Amount</TableHead>
                                    <TableHead width={120}>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.map((tx) => (
                                    <TableRow key={tx.id}>
                                        <TableCell width={100}>
                                            <Text className="text-foreground text-sm">{formatDate(tx.date)}</Text>
                                        </TableCell>
                                        <TableCell width={180}>
                                            <Text className="text-foreground font-medium">{tx.description}</Text>
                                            <Text className="text-sm text-muted-foreground">{tx.category}</Text>
                                        </TableCell>
                                        <TableCell width={120} align="right">
                                            <Text className={cn("font-medium", getAmountColor(tx.amount))}>
                                                {formatCurrency(tx.amount)}
                                            </Text>
                                        </TableCell>
                                        <TableCell width={120}>
                                            <View className="flex-row items-center">
                                                <View className={cn(
                                                    "w-2 h-2 rounded-full mr-2",
                                                    tx.status === "completed" ? "bg-green-600" : "bg-amber-600"
                                                )} />
                                                <Text className={cn("capitalize", getStatusColor(tx.status))}>
                                                    {tx.status}
                                                </Text>
                                            </View>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </View>

                    {/* Monthly Summary Table */}
                    <View className="mb-8">
                        <Text className="text-2xl font-bold mb-2 text-foreground">
                            Monthly Summary
                        </Text>
                        <Text className="text-foreground mb-4 text-muted-foreground">
                            March 2024 breakdown by category
                        </Text>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead width={200}>Category</TableHead>
                                    <TableHead width={150} align="right">Amount</TableHead>
                                    <TableHead width={100} align="right">% of Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {monthlySummary.map((item) => (
                                    <TableRow key={item.category}>
                                        <TableCell width={200}>
                                            <View className="flex-row items-center">
                                                <View className={cn(
                                                    "w-8 h-8 rounded-full mr-3 items-center justify-center",
                                                    item.category === "Income" ? "bg-green-100" : "bg-red-100"
                                                )}>
                                                    <Ionicons
                                                        name={item.category === "Income" ? "trending-up" : "trending-down"}
                                                        size={16}
                                                        color={item.category === "Income" ? "#16a34a" : "#dc2626"}
                                                    />
                                                </View>
                                                <Text className="text-foreground font-medium">{item.category}</Text>
                                            </View>
                                        </TableCell>
                                        <TableCell width={150} align="right">
                                            <Text className={cn("font-medium", getAmountColor(item.amount))}>
                                                {formatCurrency(item.amount)}
                                            </Text>
                                        </TableCell>
                                        <TableCell width={100} align="right">
                                            <Text className="text-muted-foreground">
                                                {Math.abs((item.amount / 3250.00) * 100).toFixed(1)}%
                                            </Text>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell width={200}>Net Total</TableCell>
                                    <TableCell width={150} align="right" className="font-bold">
                                        {formatCurrency(monthlySummary.reduce((acc, curr) => acc + curr.amount, 0))}
                                    </TableCell>
                                    <TableCell width={100} align="right">100%</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </View>

                    {/* Compact Transaction List */}
                    <View className="mb-8">
                        <Text className="text-2xl font-bold mb-2 text-foreground">
                            Quick View
                        </Text>
                        <Text className="text-foreground mb-4 text-muted-foreground">
                            Simplified transaction list
                        </Text>

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
                    </View>

                    {/* Extra padding for scroll */}
                    <View className="h-20" />
                </ScrollView>
            </SafeAreaView>
        </>
    )
}
