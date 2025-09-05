"use client"


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Download } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"

// Extended sales data
const dailySalesData = [
    { date: "Mon", revenue: 2400, orders: 18, avgOrder: 133 },
    { date: "Tue", revenue: 3200, orders: 22, avgOrder: 145 },
    { date: "Wed", revenue: 2800, orders: 19, avgOrder: 147 },
    { date: "Thu", revenue: 4100, orders: 28, avgOrder: 146 },
    { date: "Fri", revenue: 5200, orders: 35, avgOrder: 149 },
    { date: "Sat", revenue: 6800, orders: 42, avgOrder: 162 },
    { date: "Sun", revenue: 4900, orders: 31, avgOrder: 158 },
]

const monthlySalesData = [
    { month: "Jan", revenue: 45000, orders: 320, returns: 15, refunds: 2200 },
    { month: "Feb", revenue: 52000, orders: 380, returns: 18, refunds: 2800 },
    { month: "Mar", revenue: 48000, orders: 350, returns: 12, refunds: 1900 },
    { month: "Apr", revenue: 61000, orders: 420, returns: 22, refunds: 3100 },
    { month: "May", revenue: 55000, orders: 390, returns: 16, refunds: 2400 },
    { month: "Jun", revenue: 67000, orders: 480, returns: 19, refunds: 2900 },
]

export default function SalesReportPage() {
    const salesStats = [
        {
            title: "Today's Revenue",
            value: "$4,890",
            change: "+12.5%",
            trend: "up",
            icon: DollarSign,
        },
        {
            title: "Today's Orders",
            value: "31",
            change: "+8.2%",
            trend: "up",
            icon: ShoppingCart,
        },
        {
            title: "Average Order Value",
            value: "$158",
            change: "+5.1%",
            trend: "up",
            icon: TrendingUp,
        },
        {
            title: "Conversion Rate",
            value: "3.2%",
            change: "-0.3%",
            trend: "down",
            icon: TrendingDown,
        },
    ]

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200">Sales Report</h1>
                        <p className="text-gray-600 mt-1 dark:text-gray-50">Detailed sales analytics and performance metrics</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Select defaultValue="7days">
                            <SelectTrigger className="w-40">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="today">Today</SelectItem>
                                <SelectItem value="7days">Last 7 days</SelectItem>
                                <SelectItem value="30days">Last 30 days</SelectItem>
                                <SelectItem value="90days">Last 90 days</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Export Report
                        </Button>
                    </div>
                </div>

                {/* Sales Stats */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {salesStats.map((stat) => (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                <stat.icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                    {stat.trend === "up" ? (
                                        <TrendingUp className="h-3 w-3 text-green-500" />
                                    ) : (
                                        <TrendingDown className="h-3 w-3 text-red-500" />
                                    )}
                                    <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                                    <span>vs yesterday</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Charts */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Daily Sales Trend</CardTitle>
                            <CardDescription>Revenue and orders for the last 7 days</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={400}>
                                <AreaChart data={dailySalesData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip formatter={(value, name) => [name === "revenue" ? `$${value}` : value, name]} />
                                    <Legend />
                                    <Area type="monotone" dataKey="revenue" stackId="1" stroke="#8884d8" fill="#8884d8" name="Revenue" />
                                    <Area type="monotone" dataKey="orders" stackId="2" stroke="#82ca9d" fill="#82ca9d" name="Orders" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Average Order Value</CardTitle>
                            <CardDescription>Daily average order value trend</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={dailySalesData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => [`$${value}`, "Avg Order Value"]} />
                                    <Line type="monotone" dataKey="avgOrder" stroke="#ff7300" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Sales Performance</CardTitle>
                        <CardDescription>Revenue, orders, returns, and refunds by month</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={monthlySalesData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="revenue" fill="#8884d8" name="Revenue ($)" />
                                <Bar dataKey="orders" fill="#82ca9d" name="Orders" />
                                <Bar dataKey="returns" fill="#ffc658" name="Returns" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    )
}
