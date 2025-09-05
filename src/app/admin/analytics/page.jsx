"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Eye, Download } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"

// Mock data for charts
const salesData = [
    { month: "Jan", revenue: 45000, orders: 320, customers: 280 },
    { month: "Feb", revenue: 52000, orders: 380, customers: 340 },
    { month: "Mar", revenue: 48000, orders: 350, customers: 310 },
    { month: "Apr", revenue: 61000, orders: 420, customers: 380 },
    { month: "May", revenue: 55000, orders: 390, customers: 350 },
    { month: "Jun", revenue: 67000, orders: 480, customers: 420 },
]

const productData = [
    { name: "Laptops", value: 35, sales: 45000 },
    { name: "Smartphones", value: 25, sales: 32000 },
    { name: "Headphones", value: 20, sales: 25000 },
    { name: "Monitors", value: 15, sales: 18000 },
    { name: "Accessories", value: 5, sales: 6000 },
]

const trafficData = [
    { source: "Direct", visitors: 4200, percentage: 35 },
    { source: "Google", visitors: 3600, percentage: 30 },
    { source: "Social Media", visitors: 2400, percentage: 20 },
    { source: "Email", visitors: 1200, percentage: 10 },
    { source: "Referral", visitors: 600, percentage: 5 },
]

const recentOrders = [
    { id: "#12345", customer: "John Doe", amount: 299.99, status: "completed", time: "2 min ago" },
    { id: "#12346", customer: "Jane Smith", amount: 1299.99, status: "processing", time: "5 min ago" },
    { id: "#12347", customer: "Bob Johnson", amount: 599.99, status: "pending", time: "8 min ago" },
    { id: "#12348", customer: "Alice Brown", amount: 199.99, status: "completed", time: "12 min ago" },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function AnalyticsPage() {
    const stats = [
        {
            title: "Total Revenue",
            value: "$328,000",
            change: "+12.5%",
            trend: "up",
            icon: DollarSign,
            description: "vs last month",
        },
        {
            title: "Total Orders",
            value: "2,340",
            change: "+8.2%",
            trend: "up",
            icon: ShoppingCart,
            description: "vs last month",
        },
        {
            title: "New Customers",
            value: "1,080",
            change: "+15.3%",
            trend: "up",
            icon: Users,
            description: "vs last month",
        },
        {
            title: "Page Views",
            value: "45,200",
            change: "-2.1%",
            trend: "down",
            icon: Eye,
            description: "vs last month",
        },
    ]

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200">Analytics Dashboard</h1>
                        <p className="text-gray-600 dark:text-gray-50 mt-1">Track your store performance and insights</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Select defaultValue="30days">
                            <SelectTrigger className="w-40">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="7days">Last 7 days</SelectItem>
                                <SelectItem value="30days">Last 30 days</SelectItem>
                                <SelectItem value="90days">Last 90 days</SelectItem>
                                <SelectItem value="1year">Last year</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </Button>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
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
                                    <span>{stat.description}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Charts Section */}
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="sales">Sales</TabsTrigger>
                        <TabsTrigger value="products">Products</TabsTrigger>
                        <TabsTrigger value="traffic">Traffic</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Revenue Trend</CardTitle>
                                    <CardDescription>Monthly revenue over the last 6 months</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <AreaChart data={salesData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
                                            <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Orders</CardTitle>
                                    <CardDescription>Latest customer orders</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {recentOrders.map((order) => (
                                            <div key={order.id} className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div>
                                                        <p className="text-sm font-medium">{order.id}</p>
                                                        <p className="text-xs text-gray-500">{order.customer}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-medium">${order.amount}</p>
                                                    <div className="flex items-center space-x-2">
                                                        <Badge
                                                            variant={
                                                                order.status === "completed"
                                                                    ? "default"
                                                                    : order.status === "processing"
                                                                        ? "secondary"
                                                                        : "destructive"
                                                            }
                                                            className="text-xs"
                                                        >
                                                            {order.status}
                                                        </Badge>
                                                        <span className="text-xs text-gray-400">{order.time}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="sales" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Sales Performance</CardTitle>
                                    <CardDescription>Revenue, orders, and customers over time</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={400}>
                                        <LineChart data={salesData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue ($)" />
                                            <Line type="monotone" dataKey="orders" stroke="#82ca9d" name="Orders" />
                                            <Line type="monotone" dataKey="customers" stroke="#ffc658" name="Customers" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Monthly Comparison</CardTitle>
                                    <CardDescription>Orders by month</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={400}>
                                        <BarChart data={salesData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="orders" fill="#8884d8" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="products" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Product Categories</CardTitle>
                                    <CardDescription>Sales distribution by category</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={400}>
                                        <PieChart>
                                            <Pie
                                                data={productData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                outerRadius={120}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {productData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Top Products</CardTitle>
                                    <CardDescription>Best performing products by sales</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {productData.map((product, index) => (
                                            <div key={product.name} className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                                                    <span className="text-sm font-medium">{product.name}</span>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-medium">${product.sales.toLocaleString()}</p>
                                                    <p className="text-xs text-gray-500">{product.value}% of total</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="traffic" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Traffic Sources</CardTitle>
                                    <CardDescription>Where your visitors come from</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={400}>
                                        <BarChart data={trafficData} layout="horizontal">
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis type="number" />
                                            <YAxis dataKey="source" type="category" width={80} />
                                            <Tooltip />
                                            <Bar dataKey="visitors" fill="#8884d8" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Traffic Breakdown</CardTitle>
                                    <CardDescription>Visitor sources and percentages</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {trafficData.map((source, index) => (
                                            <div key={source.source} className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                                                    <span className="text-sm font-medium">{source.source}</span>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-medium">{source.visitors.toLocaleString()}</p>
                                                    <p className="text-xs text-gray-500">{source.percentage}%</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
    )
}
