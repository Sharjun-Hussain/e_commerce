"use client"

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
import { useAuth } from "@/States/auth-context"
import { useOrders } from "@/States/order-store"
import { useRouter } from "next/navigation"
import ReusableListingPage from "@/components/admin/ReusableListingPage"


export default function OrdersPage() {
    const { orders, updateOrderStatus, bulkUpdateOrderStatus } = useOrders()
    const { hasPermission } = useAuth()
    const router = useRouter()

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
            bulkUpdateOrderStatus(orderIds, "processing")
        } else if (action === "export") {
            console.log("Exporting orders:", orderIds)
        } else if (action === "cancel") {
            bulkUpdateOrderStatus(orderIds, "cancelled")
        }
    }

    const handleRowClick = (order) => {
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

    const headerRightContent = (
        <div className="flex items-center space-x-2">
            <Button variant="default" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
            </Button>
        </div>
    )

    return (
        <ReusableListingPage
            title="Orders"
            description="Manage customer orders and fulfillment"
            data={orders}
            columns={ordersColumns}
            stats={stats}
            bulkActions={bulkActions}
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
            onBulkAction={handleBulkAction}
            onRowClick={handleRowClick}
            headerRightContent={headerRightContent}
            requireWritePermission={true}
        />
    )
}