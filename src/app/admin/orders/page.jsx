"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    Package,
    Truck,
    CheckCircle,
    XCircle,
    Clock,
    DollarSign,
    Download,
    Eye,
} from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import DataTable from "@/components/admin/DataTable"
import { useAuth } from "@/States/auth-context"
import { useOrders } from "@/States/order-store"
import { useRouter } from "next/navigation"


export default function OrdersPage() {
    const { orders, updateOrderStatus, bulkUpdateOrderStatus } = useOrders()
    const { hasPermission } = useAuth()
    const router = useRouter();

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

    const handleBulkAction = (action, orderIds) => {
        if (action === "updateStatus") {
            // You could open a modal here to select the status
            bulkUpdateOrderStatus(orderIds, "processing")
        } else if (action === "export") {
            // Handle export logic
            console.log("Exporting orders:", orderIds)
        } else if (action === "cancel") {
            bulkUpdateOrderStatus(orderIds, "cancelled")
        }
    }

    const handleRowClick = (order) => {
        // Navigate to order details
        router.push(`/admin/orders/${order.id}`)

    }

    const ordersColumns = [
        {
            accessor: "orderNumber",
            header: "Order",
            sortable: true,
            cell: (order) => (
                <div>
                    <p className="font-medium">{order.orderNumber}</p>
                    {order.trackingNumber && (
                        <p className="text-xs text-gray-500">Tracking: {order.trackingNumber}</p>
                    )}
                </div>
            )
        },
        {
            accessor: "customerName",
            header: "Customer",
            sortable: true,
            cell: (order) => (
                <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                        <AvatarFallback>{order.customerName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-sm text-gray-500">{order.customerEmail}</p>
                    </div>
                </div>
            )
        },
        {
            accessor: "items",
            header: "Items",
            cell: (order) => (
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
            )
        },
        {
            accessor: "total",
            header: "Total",
            sortable: true,
            cell: (order) => <span className="font-medium">${order.total.toFixed(2)}</span>
        },
        {
            accessor: "status",
            header: "Status",
            sortable: true,
            cell: (order) => getStatusBadge(order.status),
            filterOptions: [
                { value: "pending", label: "Pending" },
                { value: "processing", label: "Processing" },
                { value: "shipped", label: "Shipped" },
                { value: "delivered", label: "Delivered" },
                { value: "cancelled", label: "Cancelled" },
                { value: "refunded", label: "Refunded" },
            ]
        },
        {
            accessor: "paymentStatus",
            header: "Payment",
            sortable: true,
            cell: (order) => getPaymentBadge(order.paymentStatus),
            filterOptions: [
                { value: "paid", label: "Paid" },
                { value: "pending", label: "Pending" },
                { value: "failed", label: "Failed" },
                { value: "refunded", label: "Refunded" },
            ]
        },
        {
            accessor: "createdAt",
            header: "Date",
            sortable: true,
            cell: (order) => (
                <div>
                    <p className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleTimeString()}</p>
                </div>
            )
        },
    ]

    const bulkActions = [
        { value: "updateStatus", label: "Update Status" },
        { value: "export", label: "Export Selected" },
        { value: "cancel", label: "Cancel Orders", destructive: true },
    ]

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

    return (
        <AdminLayout>
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
                        <CardTitle>Order Management</CardTitle>
                        <CardDescription>View and manage all customer orders</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            data={orders}
                            columns={ordersColumns}
                            searchableColumns={[
                                { accessor: "orderNumber" },
                                { accessor: "customerName" },
                                { accessor: "customerEmail" }
                            ]}
                            filterableColumns={[
                                {
                                    accessor: "status", header: "Status", filterOptions: [
                                        { value: "pending", label: "Pending" },
                                        { value: "processing", label: "Processing" },
                                        { value: "shipped", label: "Shipped" },
                                        { value: "delivered", label: "Delivered" },
                                        { value: "cancelled", label: "Cancelled" },
                                        { value: "refunded", label: "Refunded" },
                                    ]
                                },
                                {
                                    accessor: "paymentStatus", header: "Payment", filterOptions: [
                                        { value: "paid", label: "Paid" },
                                        { value: "pending", label: "Pending" },
                                        { value: "failed", label: "Failed" },
                                        { value: "refunded", label: "Refunded" },
                                    ]
                                }
                            ]}
                            bulkActions={hasPermission("orders.write") ? bulkActions : []}
                            onBulkAction={handleBulkAction}
                            onRowClick={handleRowClick}
                            defaultSortField="createdAt"
                            defaultSortDirection="desc"
                            emptyState={
                                <div className="text-center py-8">
                                    <Package className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Try adjusting your search or filters.
                                    </p>
                                </div>
                            }
                        />
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    )
}