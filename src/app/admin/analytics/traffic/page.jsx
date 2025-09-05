"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
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
import { Eye, Users, Clock, MousePointer, Download } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"

const trafficData = [
    { date: "Mon", visitors: 1200, pageViews: 3400, bounceRate: 45, avgSession: 180 },
    { date: "Tue", visitors: 1400, pageViews: 3800, bounceRate: 42, avgSession: 195 },
    { date: "Wed", visitors: 1100, pageViews: 3100, bounceRate: 48, avgSession: 165 },
    { date: "Thu", visitors: 1600, pageViews: 4200, bounceRate: 38, avgSession: 210 },
    { date: "Fri", visitors: 1800, pageViews: 4800, bounceRate: 35, avgSession: 225 },
    { date: "Sat", visitors: 2200, pageViews: 5600, bounceRate: 32, avgSession: 240 },
    { date: "Sun", visitors: 1900, pageViews: 4900, bounceRate: 36, avgSession: 220 },
]

const deviceData = [
    { name: "Desktop", value: 45, visitors: 5400 },
    { name: "Mobile", value: 40, visitors: 4800 },
    { name: "Tablet", value: 15, visitors: 1800 },
]

const topPages = [
    { page: "/", views: 12500, bounce: "32%", avgTime: "2:45" },
    { page: "/products", views: 8900, bounce: "28%", avgTime: "3:12" },
    { page: "/product/macbook-pro", views: 6700, bounce: "25%", avgTime: "4:20" },
    { page: "/cart", views: 4200, bounce: "15%", avgTime: "1:30" },
    { page: "/checkout", views: 3100, bounce: "8%", avgTime: "2:15" },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

export default function TrafficAnalyticsPage() {
    const trafficStats = [
        {
            title: "Total Visitors",
            value: "12,000",
            change: "+15.3%",
            icon: Users,
        },
        {
            title: "Page Views",
            value: "34,500",
            change: "+12.1%",
            icon: Eye,
        },
        {
            title: "Avg. Session Duration",
            value: "3:45",
            change: "+8.7%",
            icon: Clock,
        },
        {
            title: "Bounce Rate",
            value: "38.2%",
            change: "-5.2%",
            icon: MousePointer,
        },
    ]

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold dark:text-gray-200 text-gray-900">Traffic Analytics</h1>
                        <p className="text-gray-600 dark:text-gray-50 mt-1">Monitor website traffic and user behavior</p>
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
                            Export Data
                        </Button>
                    </div>
                </div>

                {/* Traffic Stats */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {trafficStats.map((stat) => (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                <stat.icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground">
                                    <span className="text-green-500">{stat.change}</span> from last week
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Charts */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Traffic Overview</CardTitle>
                            <CardDescription>Daily visitors and page views</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={400}>
                                <AreaChart data={trafficData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Area
                                        type="monotone"
                                        dataKey="visitors"
                                        stackId="1"
                                        stroke="#8884d8"
                                        fill="#8884d8"
                                        name="Visitors"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="pageViews"
                                        stackId="2"
                                        stroke="#82ca9d"
                                        fill="#82ca9d"
                                        name="Page Views"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Device Breakdown</CardTitle>
                            <CardDescription>Traffic by device type</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={400}>
                                <PieChart>
                                    <Pie
                                        data={deviceData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={120}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {deviceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Bounce Rate Trend</CardTitle>
                            <CardDescription>Daily bounce rate percentage</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={trafficData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => [`${value}%`, "Bounce Rate"]} />
                                    <Bar dataKey="bounceRate" fill="#ff7300" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Top Pages</CardTitle>
                            <CardDescription>Most visited pages this week</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {topPages.map((page, index) => (
                                    <div key={page.page} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center text-xs font-medium">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{page.page}</p>
                                                <p className="text-xs text-gray-500">{page.views.toLocaleString()} views</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center space-x-2">
                                                <Badge variant="outline" className="text-xs">
                                                    {page.bounce} bounce
                                                </Badge>
                                                <span className="text-xs text-gray-500">{page.avgTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    )
}
