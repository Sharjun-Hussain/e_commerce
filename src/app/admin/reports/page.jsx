"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Download, FileText, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { useAuth } from "@/States/auth-context"

// Mock data for reports
const salesReportData = [
    { period: "Jan 2024", revenue: 45000, orders: 320, customers: 280, avgOrder: 140.63 },
    { period: "Feb 2024", revenue: 52000, orders: 380, customers: 340, avgOrder: 136.84 },
    { period: "Mar 2024", revenue: 48000, orders: 350, customers: 310, avgOrder: 137.14 },
    { period: "Apr 2024", revenue: 61000, orders: 420, customers: 380, avgOrder: 145.24 },
    { period: "May 2024", revenue: 55000, orders: 390, customers: 350, avgOrder: 141.03 },
    { period: "Jun 2024", revenue: 67000, orders: 480, customers: 420, avgOrder: 139.58 },
]

const productPerformanceData = [
    { name: "MacBook Pro M3", sales: 45000, units: 23, profit: 13500, margin: 30 },
    { name: "Samsung Galaxy S24", sales: 32000, units: 25, profit: 8000, margin: 25 },
    { name: "Sony Headphones", sales: 25000, units: 63, profit: 7500, margin: 30 },
    { name: "Dell XPS 13", sales: 18000, units: 14, profit: 4500, margin: 25 },
    { name: "iPad Pro M2", sales: 15000, units: 14, profit: 3750, margin: 25 },
]

const customerSegmentData = [
    { segment: "VIP Customers", count: 45, revenue: 89000, avgSpent: 1978 },
    { segment: "Premium Customers", count: 128, revenue: 156000, avgSpent: 1219 },
    { segment: "Regular Customers", count: 342, revenue: 187000, avgSpent: 547 },
    { segment: "New Customers", count: 89, revenue: 23000, avgSpent: 258 },
]

const inventoryReportData = [
    { product: "MacBook Pro M3", stock: 25, reserved: 3, available: 22, reorderLevel: 10, status: "Good" },
    { product: "Samsung Galaxy S24", stock: 45, reserved: 8, available: 37, reorderLevel: 20, status: "Good" },
    { product: "Sony Headphones", stock: 12, reserved: 2, available: 10, reorderLevel: 15, status: "Low" },
    { product: "Dell XPS 13", stock: 8, reserved: 1, available: 7, reorderLevel: 10, status: "Critical" },
    { product: "iPad Pro M2", stock: 0, reserved: 0, available: 0, reorderLevel: 5, status: "Out of Stock" },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function ReportsPage() {
    const { hasPermission } = useAuth()
    const [dateRange, setDateRange] = useState("last30days")
    const [reportType, setReportType] = useState("sales")
    const [isGenerating, setIsGenerating] = useState(false)

    const handleExportReport = async (format) => {
        setIsGenerating(true)
        // Simulate export process
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setIsGenerating(false)
        // In a real app, this would trigger the actual export
        console.log(`Exporting ${reportType} report as ${format}`)
    }

    const getStockStatusBadge = (status) => {
        switch (status) {
            case "Good":
                return <Badge className="bg-green-100 text-green-800">Good</Badge>
            case "Low":
                return <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>
            case "Critical":
                return <Badge className="bg-orange-100 text-orange-800">Critical</Badge>
            case "Out of Stock":
                return <Badge variant="destructive">Out of Stock</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    const reportStats = [
        {
            title: "Total Revenue",
            value: "Rs.V328,000",
            change: "+12.5%",
            trend: "up",
            icon: DollarSign,
        },
        {
            title: "Total Orders",
            value: "2,340",
            change: "+8.2%",
            trend: "up",
            icon: ShoppingCart,
        },
        {
            title: "Active Customers",
            value: "1,080",
            change: "+15.3%",
            trend: "up",
            icon: Users,
        },
        {
            title: "Products Sold",
            value: "4,567",
            change: "+22.1%",
            trend: "up",
            icon: Package,
        },
    ]

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
                        <p className="text-gray-600 mt-1">Generate detailed reports and insights</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Select value={dateRange} onValueChange={setDateRange}>
                            <SelectTrigger className="w-40">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="today">Today</SelectItem>
                                <SelectItem value="yesterday">Yesterday</SelectItem>
                                <SelectItem value="last7days">Last 7 days</SelectItem>
                                <SelectItem value="last30days">Last 30 days</SelectItem>
                                <SelectItem value="last90days">Last 90 days</SelectItem>
                                <SelectItem value="thisyear">This year</SelectItem>
                                <SelectItem value="custom">Custom Range</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="" onClick={() => handleExportReport("pdf")} disabled={isGenerating}>
                            <Download className="w-4 h-4 mr-2" />
                            {isGenerating ? "Generating..." : "Export PDF"}
                        </Button>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {reportStats.map((stat) => (
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
                                    <span>from last period</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Reports Tabs */}
                <Tabs defaultValue="sales" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="sales">Sales Report</TabsTrigger>
                        <TabsTrigger value="products">Product Performance</TabsTrigger>
                        <TabsTrigger value="customers">Customer Analytics</TabsTrigger>
                        <TabsTrigger value="inventory">Inventory Report</TabsTrigger>
                        <TabsTrigger value="financial">Financial Summary</TabsTrigger>
                    </TabsList>

                    <TabsContent value="sales" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Revenue Trend</CardTitle>
                                    <CardDescription>Monthly revenue performance</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <AreaChart data={salesReportData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="period" />
                                            <YAxis />
                                            <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
                                            <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Orders & Customers</CardTitle>
                                    <CardDescription>Order volume and customer acquisition</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={salesReportData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="period" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="orders" stroke="#8884d8" name="Orders" />
                                            <Line type="monotone" dataKey="customers" stroke="#82ca9d" name="New Customers" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Sales Performance Summary</CardTitle>
                                <CardDescription>Detailed breakdown of sales metrics</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Period</TableHead>
                                            <TableHead>Revenue</TableHead>
                                            <TableHead>Orders</TableHead>
                                            <TableHead>New Customers</TableHead>
                                            <TableHead>Avg Order Value</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {salesReportData.map((row) => (
                                            <TableRow key={row.period}>
                                                <TableCell className="font-medium">{row.period}</TableCell>
                                                <TableCell>Rs.{row.revenue.toLocaleString()}</TableCell>
                                                <TableCell>{row.orders}</TableCell>
                                                <TableCell>{row.customers}</TableCell>
                                                <TableCell>Rs.{row.avgOrder.toFixed(2)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="products" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Top Products by Revenue</CardTitle>
                                    <CardDescription>Best performing products</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={productPerformanceData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                                            <YAxis />
                                            <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Sales"]} />
                                            <Bar dataKey="sales" fill="#8884d8" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Profit Margins</CardTitle>
                                    <CardDescription>Product profitability analysis</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={productPerformanceData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                                            <YAxis />
                                            <Tooltip formatter={(value) => [`${value}%`, "Margin"]} />
                                            <Bar dataKey="margin" fill="#82ca9d" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Product Performance Details</CardTitle>
                                <CardDescription>Comprehensive product analytics</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Product</TableHead>
                                            <TableHead>Sales Revenue</TableHead>
                                            <TableHead>Units Sold</TableHead>
                                            <TableHead>Profit</TableHead>
                                            <TableHead>Margin</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {productPerformanceData.map((product) => (
                                            <TableRow key={product.name}>
                                                <TableCell className="font-medium">{product.name}</TableCell>
                                                <TableCell>Rs.{product.sales.toLocaleString()}</TableCell>
                                                <TableCell>{product.units}</TableCell>
                                                <TableCell>Rs.{product.profit.toLocaleString()}</TableCell>
                                                <TableCell>{product.margin}%</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="customers" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Customer Segments</CardTitle>
                                    <CardDescription>Revenue distribution by customer type</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={customerSegmentData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ segment, revenue }) => `${segment}: $${revenue.toLocaleString()}`}
                                                outerRadius={100}
                                                fill="#8884d8"
                                                dataKey="revenue"
                                            >
                                                {customerSegmentData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Customer Value Analysis</CardTitle>
                                    <CardDescription>Average spending by segment</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={customerSegmentData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="segment" angle={-45} textAnchor="end" height={80} />
                                            <YAxis />
                                            <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Avg Spent"]} />
                                            <Bar dataKey="avgSpent" fill="#ffc658" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Customer Segment Analysis</CardTitle>
                                <CardDescription>Detailed customer segmentation data</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Segment</TableHead>
                                            <TableHead>Customer Count</TableHead>
                                            <TableHead>Total Revenue</TableHead>
                                            <TableHead>Avg Spent</TableHead>
                                            <TableHead>Revenue Share</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {customerSegmentData.map((segment) => {
                                            const totalRevenue = customerSegmentData.reduce((sum, s) => sum + s.revenue, 0)
                                            const share = ((segment.revenue / totalRevenue) * 100).toFixed(1)
                                            return (
                                                <TableRow key={segment.segment}>
                                                    <TableCell className="font-medium">{segment.segment}</TableCell>
                                                    <TableCell>{segment.count}</TableCell>
                                                    <TableCell>Rs.{segment.revenue.toLocaleString()}</TableCell>
                                                    <TableCell>Rs.{segment.avgSpent.toLocaleString()}</TableCell>
                                                    <TableCell>{share}%</TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="inventory" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Inventory Status Report</CardTitle>
                                <CardDescription>Current stock levels and alerts</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Product</TableHead>
                                            <TableHead>Current Stock</TableHead>
                                            <TableHead>Reserved</TableHead>
                                            <TableHead>Available</TableHead>
                                            <TableHead>Reorder Level</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {inventoryReportData.map((item) => (
                                            <TableRow key={item.product}>
                                                <TableCell className="font-medium">{item.product}</TableCell>
                                                <TableCell>{item.stock}</TableCell>
                                                <TableCell>{item.reserved}</TableCell>
                                                <TableCell>{item.available}</TableCell>
                                                <TableCell>{item.reorderLevel}</TableCell>
                                                <TableCell>{getStockStatusBadge(item.status)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        <div className="grid gap-4 md:grid-cols-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Stock Alerts</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-red-600">3</div>
                                        <div className="text-sm text-red-600">Critical Items</div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Low Stock</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-yellow-600">1</div>
                                        <div className="text-sm text-yellow-600">Items Below Threshold</div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Total Value</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">$125,450</div>
                                        <div className="text-sm text-green-600">Inventory Value</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="financial" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Revenue vs Costs</CardTitle>
                                    <CardDescription>Financial performance overview</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span>Total Revenue</span>
                                            <span className="font-bold text-green-600">Rs.328,000</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Cost of Goods Sold</span>
                                            <span className="font-bold text-red-600">Rs.196,800</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Operating Expenses</span>
                                            <span className="font-bold text-red-600">Rs.65,600</span>
                                        </div>
                                        <div className="border-t pt-2">
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold">Net Profit</span>
                                                <span className="font-bold text-green-600">Rs.65,600</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm text-gray-500">
                                                <span>Profit Margin</span>
                                                <span>20%</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Key Financial Metrics</CardTitle>
                                    <CardDescription>Important financial indicators</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span>Gross Margin</span>
                                            <span className="font-bold">40%</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Average Order Value</span>
                                            <span className="font-bold">Rs.140.17</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Customer Acquisition Cost</span>
                                            <span className="font-bold">Rs.25.50</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Customer Lifetime Value</span>
                                            <span className="font-bold">Rs.1,250</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Return on Investment</span>
                                            <span className="font-bold text-green-600">25.8%</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Export Options</CardTitle>
                                <CardDescription>Generate detailed financial reports</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <Button
                                        variant=""
                                        onClick={() => handleExportReport("pdf")}
                                        disabled={isGenerating}
                                        className="flex items-center justify-center"
                                    >
                                        <FileText className="w-4 h-4 mr-2" />
                                        Export PDF
                                    </Button>
                                    <Button
                                        variant=""
                                        onClick={() => handleExportReport("excel")}
                                        disabled={isGenerating}
                                        className="flex items-center justify-center"
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Export Excel
                                    </Button>
                                    <Button
                                        variant=""
                                        onClick={() => handleExportReport("csv")}
                                        disabled={isGenerating}
                                        className="flex items-center justify-center"
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Export CSV
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
    )
}
