"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Activity,
    Search,
    Download,
    User,
    ShoppingCart,
    Package,
    Settings,
    Shield,
    AlertTriangle,
    CheckCircle,
    Clock,
} from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { useAuth } from "@/States/auth-context"

// Mock activity data
const activityLogs = [
    {
        id: "1",
        timestamp: "2024-01-15 14:30:25",
        user: "admin@techmart.com",
        action: "Product Created",
        details: "Created new product: MacBook Pro M3",
        category: "product",
        severity: "info",
        ip: "192.168.1.100",
    },
    {
        id: "2",
        timestamp: "2024-01-15 14:25:12",
        user: "manager@techmart.com",
        action: "Order Status Updated",
        details: "Order #ORD-2024-001 status changed to 'Shipped'",
        category: "order",
        severity: "info",
        ip: "192.168.1.101",
    },
    {
        id: "3",
        timestamp: "2024-01-15 14:20:45",
        user: "staff@techmart.com",
        action: "User Login",
        details: "Successful login attempt",
        category: "auth",
        severity: "info",
        ip: "192.168.1.102",
    },
    {
        id: "4",
        timestamp: "2024-01-15 14:15:33",
        user: "unknown",
        action: "Failed Login",
        details: "Failed login attempt for admin@techmart.com",
        category: "auth",
        severity: "warning",
        ip: "203.0.113.1",
    },
    {
        id: "5",
        timestamp: "2024-01-15 14:10:18",
        user: "admin@techmart.com",
        action: "Settings Updated",
        details: "Updated notification preferences",
        category: "settings",
        severity: "info",
        ip: "192.168.1.100",
    },
    {
        id: "6",
        timestamp: "2024-01-15 14:05:07",
        user: "system",
        action: "Backup Created",
        details: "Automated daily backup completed successfully",
        category: "system",
        severity: "info",
        ip: "localhost",
    },
    {
        id: "7",
        timestamp: "2024-01-15 13:58:42",
        user: "manager@techmart.com",
        action: "Inventory Alert",
        details: "Low stock alert for Sony Headphones (5 units remaining)",
        category: "inventory",
        severity: "warning",
        ip: "192.168.1.101",
    },
    {
        id: "8",
        timestamp: "2024-01-15 13:45:29",
        user: "admin@techmart.com",
        action: "User Role Changed",
        details: "Changed user role for john.doe@example.com to 'Manager'",
        category: "user",
        severity: "info",
        ip: "192.168.1.100",
    },
]

export default function ActivityPage() {
    const { user, hasPermission } = useAuth()
    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [severityFilter, setSeverityFilter] = useState("all")
    const [isExporting, setIsExporting] = useState(false)

    const filteredLogs = activityLogs.filter((log) => {
        const matchesSearch =
            log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.user.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = categoryFilter === "all" || log.category === categoryFilter
        const matchesSeverity = severityFilter === "all" || log.severity === severityFilter

        return matchesSearch && matchesCategory && matchesSeverity
    })

    const handleExport = async () => {
        setIsExporting(true)
        // Simulate export process
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setIsExporting(false)
        console.log("Exporting activity logs...")
    }

    const getCategoryIcon = (category) => {
        switch (category) {
            case "product":
                return <Package className="w-4 h-4" />
            case "order":
                return <ShoppingCart className="w-4 h-4" />
            case "user":
                return <User className="w-4 h-4" />
            case "auth":
                return <Shield className="w-4 h-4" />
            case "settings":
                return <Settings className="w-4 h-4" />
            case "system":
                return <Activity className="w-4 h-4" />
            case "inventory":
                return <Package className="w-4 h-4" />
            default:
                return <Clock className="w-4 h-4" />
        }
    }

    const getSeverityBadge = (severity) => {
        switch (severity) {
            case "info":
                return (
                    <Badge className="bg-blue-100 text-blue-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Info
                    </Badge>
                )
            case "warning":
                return (
                    <Badge className="bg-yellow-100 text-yellow-800">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Warning
                    </Badge>
                )
            case "error":
                return (
                    <Badge variant="destructive">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Error
                    </Badge>
                )
            default:
                return <Badge variant="outline">{severity}</Badge>
        }
    }

    const activityStats = [
        {
            title: "Total Activities",
            value: activityLogs.length.toString(),
            icon: Activity,
            color: "text-blue-600",
        },
        {
            title: "Warnings",
            value: activityLogs.filter((log) => log.severity === "warning").length.toString(),
            icon: AlertTriangle,
            color: "text-yellow-600",
        },
        {
            title: "Errors",
            value: activityLogs.filter((log) => log.severity === "error").length.toString(),
            icon: AlertTriangle,
            color: "text-red-600",
        },
        {
            title: "System Events",
            value: activityLogs.filter((log) => log.category === "system").length.toString(),
            icon: Settings,
            color: "text-green-600",
        },
    ]

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Activity Logs</h1>
                        <p className="text-gray-600 mt-1">Monitor system activities and user actions</p>
                    </div>
                    <Button onClick={handleExport} disabled={isExporting} variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        {isExporting ? "Exporting..." : "Export Logs"}
                    </Button>
                </div>

                {/* Stats Overview */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {activityStats.map((stat) => (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filter Activities</CardTitle>
                        <CardDescription>Search and filter activity logs</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Search activities..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger className="w-full md:w-48">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="product">Product</SelectItem>
                                    <SelectItem value="order">Order</SelectItem>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="auth">Authentication</SelectItem>
                                    <SelectItem value="settings">Settings</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                    <SelectItem value="inventory">Inventory</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={severityFilter} onValueChange={setSeverityFilter}>
                                <SelectTrigger className="w-full md:w-48">
                                    <SelectValue placeholder="Severity" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Severities</SelectItem>
                                    <SelectItem value="info">Info</SelectItem>
                                    <SelectItem value="warning">Warning</SelectItem>
                                    <SelectItem value="error">Error</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Activity Logs Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activities</CardTitle>
                        <CardDescription>
                            Showing {filteredLogs.length} of {activityLogs.length} activities
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Timestamp</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>Action</TableHead>
                                    <TableHead>Details</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Severity</TableHead>
                                    <TableHead>IP Address</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredLogs.map((log) => (
                                    <TableRow key={log.id}>
                                        <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                                        <TableCell>{log.user}</TableCell>
                                        <TableCell className="font-medium">{log.action}</TableCell>
                                        <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                {getCategoryIcon(log.category)}
                                                <span className="capitalize">{log.category}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                                        <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    )
}
