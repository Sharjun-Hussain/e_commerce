"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Search,
    MoreHorizontal,
    Eye,
    Package,
    Truck,
    CheckCircle,
    XCircle,
    Clock,
    DollarSign,
    Download,
    ChevronDown,
    ChevronUp,
} from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { useAuth } from "@/States/auth-context"
import { useOrders } from "@/States/order-store"

export default function OrdersPage() {
    return (
        <AdminLayout>
            <OrdersDataTable />
        </AdminLayout>
    )
}

export default function OrdersDataTable() {
    const { orders, updateOrderStatus, bulkUpdateOrderStatus } = useOrders()
    const { hasPermission } = useAuth()
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [paymentFilter, setPaymentFilter] = useState("all")
    const [selectedOrders, setSelectedOrders] = useState([])
    const [sortField, setSortField] = useState("createdAt")
    const [sortDirection, setSortDirection] = useState("desc")

    // Handle sorting
    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("desc")
        }
    }

    // Filter orders based on search and filters
    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const matchesSearch =
                order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesStatus = statusFilter === "all" || order.status === statusFilter
            const matchesPayment = paymentFilter === "all" || order.paymentStatus === paymentFilter

            return matchesSearch && matchesStatus && matchesPayment
        })
    }, [orders, searchTerm, statusFilter, paymentFilter])

    // Sort orders
    const sortedOrders = useMemo(() => {
        return [...filteredOrders].sort((a, b) => {
            let aValue = a[sortField]
            let bValue = b[sortField]

            // Handle nested properties if needed
            if (sortField === "customerName") {
                aValue = a.customerName
                bValue = b.customerName
            }

            if (aValue < bValue) {
                return sortDirection === "asc" ? -1 : 1
            }
            if (aValue > bValue) {
                return sortDirection === "asc" ? 1 : -1
            }
            return 0
        })
    }, [filteredOrders, sortField, sortDirection])

    // Select all orders
    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedOrders(sortedOrders.map(order => order.id))
        } else {
            setSelectedOrders([])
        }
    }

    // Toggle single order selection
    const toggleOrderSelection = (orderId) => {
        if (selectedOrders.includes(orderId)) {
            setSelectedOrders(selectedOrders.filter(id => id !== orderId))
        } else {
            setSelectedOrders([...selectedOrders, orderId])
        }
    }

    // Check if all orders are selected
    const allSelected = selectedOrders.length > 0 && selectedOrders.length === sortedOrders.length

    // Check if some orders are selected
    const someSelected = selectedOrders.length > 0 && selectedOrders.length < sortedOrders.length

    // Handle bulk status update
    const handleBulkStatusUpdate = (status) => {
        bulkUpdateOrderStatus(selectedOrders, status)
        setSelectedOrders([])
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case "pending":
                return (
                    <Badge className="bg-yellow-100 text-yellow-800">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                    </Badge>
                )
            case "processing":
                return (
                    <Badge className="bg-blue-100 text-blue-800">
                        <Package className="w-3 h-3 mr-1" />
                        Processing
                    </Badge>
                )
            case "shipped":
                return (
                    <Badge className="bg-purple-100 text-purple-800">
                        <Truck className="w-3 h-3 mr-1" />
                        Shipped
                    </Badge>
                )
            case "delivered":
                return (
                    <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Delivered
                    </Badge>
                )
            case "cancelled":
                return (
                    <Badge className="bg-red-100 text-red-800">
                        <XCircle className="w-3 h-3 mr-1" />
                        Cancelled
                    </Badge>
                )
            case "refunded":
                return <Badge className="bg-gray-100 text-gray-800">Refunded</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    const getPaymentBadge = (status) => {
        switch (status) {
            case "paid":
                return <Badge className="bg-green-100 text-green-800">Paid</Badge>
            case "pending":
                return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
            case "failed":
                return <Badge className="bg-red-100 text-red-800">Failed</Badge>
            case "refunded":
                return <Badge className="bg-gray-100 text-gray-800">Refunded</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    const stats = [
        {
            title: "Total Orders",
            value: orders.length.toString(),
            icon: Package,
        },
        {
            title: "Pending Orders",
            value: orders.filter((o) => o.status === "pending").length.toString(),
            icon: Clock,
        },
        {
            title: "Processing",
            value: orders.filter((o) => o.status === "processing").length.toString(),
            icon: Package,
        },
        {
            title: "Total Revenue",
            value: `$${orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}`,
            icon: DollarSign,
        },
    ]

    const SortableHeader = ({ field, children }) => {
        const isSorted = sortField === field
        const isAsc = isSorted && sortDirection === "asc"

        return (
            <TableHead
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => handleSort(field)}
            >
                <div className="flex items-center">
                    {children}
                    {isSorted && (
                        isAsc ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                </div>
            </TableHead>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200">Orders</h1>
                    <p className="text-gray-900 dark:text-gray-200 mt-1">Manage customer orders and fulfillment</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="default" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Orders Table */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Order Management</CardTitle>
                            <CardDescription>View and manage all customer orders</CardDescription>
                        </div>

                        {/* Bulk Actions */}
                        {selectedOrders.length > 0 && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        Bulk Actions ({selectedOrders.length})
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Bulk Actions</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => handleBulkStatusUpdate("processing")}>
                                        Mark as Processing
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleBulkStatusUpdate("shipped")}>
                                        Mark as Shipped
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleBulkStatusUpdate("delivered")}>
                                        Mark as Delivered
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() => handleBulkStatusUpdate("cancelled")}
                                        className="text-red-600"
                                    >
                                        Cancel Orders
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Search orders, customers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Order Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Payment Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Payments</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="failed">Failed</SelectItem>
                                <SelectItem value="refunded">Refunded</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12">
                                        <Checkbox
                                            checked={allSelected}
                                            onCheckedChange={handleSelectAll}
                                            aria-label="Select all"
                                            indeterminate={someSelected && !allSelected}
                                        />
                                    </TableHead>
                                    <SortableHeader field="orderNumber">Order</SortableHeader>
                                    <SortableHeader field="customerName">Customer</SortableHeader>
                                    <TableHead>Items</TableHead>
                                    <SortableHeader field="total">Total</SortableHeader>
                                    <SortableHeader field="status">Status</SortableHeader>
                                    <SortableHeader field="paymentStatus">Payment</SortableHeader>
                                    <SortableHeader field="createdAt">Date</SortableHeader>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedOrders.map((order) => (
                                    <TableRow className="border-gray-300 dark:border-gray-600" key={order.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedOrders.includes(order.id)}
                                                onCheckedChange={() => toggleOrderSelection(order.id)}
                                                aria-label={`Select order ${order.orderNumber}`}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <p className="font-medium">{order.orderNumber}</p>
                                                {order.trackingNumber && (
                                                    <p className="text-xs text-gray-500">Tracking: {order.trackingNumber}</p>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-3">
                                                <Avatar className="w-8 h-8">
                                                    <AvatarFallback>{order.customerName.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{order.customerName}</p>
                                                    <p className="text-sm text-gray-500">{order.customerEmail}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <p className="text-sm">
                                                    {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {order.items
                                                        .slice(0, 2)
                                                        .map((item) => item.productName)
                                                        .join(", ")}
                                                    {order.items.length > 2 && ` +${order.items.length - 2} more`}
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-medium">${order.total.toFixed(2)}</span>
                                        </TableCell>
                                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                                        <TableCell>{getPaymentBadge(order.paymentStatus)}</TableCell>
                                        <TableCell>
                                            <div>
                                                <p className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                                                <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleTimeString()}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/admin/orders/${order.id}`}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Details
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    {hasPermission("orders.write") && (
                                                        <>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                onClick={() => updateOrderStatus(order.id, "processing")}
                                                                disabled={order.status === "processing"}
                                                            >
                                                                Mark as Processing
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => updateOrderStatus(order.id, "shipped")}
                                                                disabled={order.status === "shipped" || order.status === "delivered"}
                                                            >
                                                                Mark as Shipped
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => updateOrderStatus(order.id, "delivered")}
                                                                disabled={order.status === "delivered"}
                                                            >
                                                                Mark as Delivered
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                onClick={() => updateOrderStatus(order.id, "cancelled")}
                                                                disabled={order.status === "delivered" || order.status === "cancelled"}
                                                                className="text-red-600"
                                                            >
                                                                Cancel Order
                                                            </DropdownMenuItem>
                                                        </>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {sortedOrders.length === 0 && (
                        <div className="text-center py-8">
                            <Package className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {searchTerm || statusFilter !== "all" || paymentFilter !== "all"
                                    ? "Try adjusting your search or filters."
                                    : "Orders will appear here when customers make purchases."}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}