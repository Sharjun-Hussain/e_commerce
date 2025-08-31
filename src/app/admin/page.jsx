"use client"



import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Package, ShoppingCart, Users, TrendingUp, TrendingDown, DollarSign, Eye } from "lucide-react"
import { useAuth } from "@/States/auth-context"
import { AdminLayout } from "@/components/admin/admin-layout"

export default function AdminDashboard() {
    const { user, hasPermission } = useAuth()

    const stats = [
        {
            title: "Total Revenue",
            value: "$45,231.89",
            change: "+20.1%",
            trend: "up",
            icon: DollarSign,
            permission: "analytics.read",
        },
        {
            title: "Orders",
            value: "2,350",
            change: "+180.1%",
            trend: "up",
            icon: ShoppingCart,
            permission: "orders.read",
        },
        {
            title: "Products",
            value: "1,234",
            change: "+19%",
            trend: "up",
            icon: Package,
            permission: "products.read",
        },
        {
            title: "Active Users",
            value: "573",
            change: "+201",
            trend: "up",
            icon: Users,
            permission: "users.read",
        },
    ]

    const recentActivities = [
        { action: "New order", details: "Order #12345 - $299.99", time: "2 minutes ago" },
        { action: "Product updated", details: "MacBook Pro M3 - Stock updated", time: "5 minutes ago" },
        { action: "User registered", details: "john.doe@example.com", time: "10 minutes ago" },
        { action: "Payment received", details: "Order #12344 - $1,299.99", time: "15 minutes ago" },
    ]

    const filteredStats = stats.filter((stat) => !stat.permission || hasPermission(stat.permission))

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Welcome Section */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
                    <p className="text-gray-600 mt-1">Here's what's happening with your store today.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {filteredStats.map((stat) => (
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
                                    <span>from last month</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Recent Activity */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Latest updates from your store</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentActivities.map((activity, index) => (
                                    <div key={index} className="flex items-center space-x-4">
                                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                            <p className="text-sm text-gray-500 truncate">{activity.details}</p>
                                        </div>
                                        <div className="text-xs text-gray-400">{activity.time}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Common tasks and shortcuts</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3">
                                {hasPermission("products.write") && (
                                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                        <div className="flex items-center space-x-3">
                                            <Package className="h-5 w-5 text-primary" />
                                            <span className="text-sm font-medium">Add New Product</span>
                                        </div>
                                        <Badge variant="secondary">Quick</Badge>
                                    </div>
                                )}
                                {hasPermission("orders.read") && (
                                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                        <div className="flex items-center space-x-3">
                                            <ShoppingCart className="h-5 w-5 text-primary" />
                                            <span className="text-sm font-medium">View Pending Orders</span>
                                        </div>
                                        <Badge variant="secondary">5 pending</Badge>
                                    </div>
                                )}
                                {hasPermission("analytics.read") && (
                                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                        <div className="flex items-center space-x-3">
                                            <BarChart3 className="h-5 w-5 text-primary" />
                                            <span className="text-sm font-medium">View Analytics</span>
                                        </div>
                                        <Badge variant="secondary">Reports</Badge>
                                    </div>
                                )}
                                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                    <div className="flex items-center space-x-3">
                                        <Eye className="h-5 w-5 text-primary" />
                                        <span className="text-sm font-medium">View Store</span>
                                    </div>
                                    <Badge variant="outline">External</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    )
}
