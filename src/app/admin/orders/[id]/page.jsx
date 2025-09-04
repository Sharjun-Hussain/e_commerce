"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    ArrowLeft, Package, Truck, MapPin, CreditCard, FileText, Edit, Save,
    User, Mail, Phone, Calendar, Printer, Download, MessageSquare,
    AlertCircle, CheckCircle, Clock, RefreshCw, MoreVertical,
    ArrowBigLeft,
    MoveRight,
    AlignLeft,
    ArrowLeftCircleIcon
} from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { useAuth } from "@/States/auth-context"
import { useOrders } from "@/States/order-store"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function OrderDetailPage() {
    const params = useParams()
    const orderId = params.id
    const { getOrder, updateOrderStatus, updatePaymentStatus, addTrackingNumber, addOrderNotes } = useOrders()
    const { hasPermission, user } = useAuth()
    const order = getOrder(orderId)

    const [trackingNumber, setTrackingNumber] = useState(order?.trackingNumber || "")
    const [notes, setNotes] = useState(order?.notes || "")
    const [isEditingTracking, setIsEditingTracking] = useState(false)
    const [isEditingNotes, setIsEditingNotes] = useState(false)
    const [activeTab, setActiveTab] = useState("overview")

    if (!order) {
        return (
            <AdminLayout>
                <div className="text-center py-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Order Not Found</h1>
                    <p className="text-gray-600 dark:text-gray-200  mt-2">The order you're looking for doesn't exist.</p>
                    <Link href="/admin/orders">
                        <Button className="mt-4">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Orders
                        </Button>
                    </Link>
                </div>
            </AdminLayout>
        )
    }

    const handleSaveTracking = () => {
        addTrackingNumber(orderId, trackingNumber)
        setIsEditingTracking(false)
    }

    const handleSaveNotes = () => {
        addOrderNotes(orderId, notes)
        setIsEditingNotes(false)
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case "pending":
                return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    <Clock className="w-3 h-3 mr-1" /> Pending
                </Badge>
            case "processing":
                return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <RefreshCw className="w-3 h-3 mr-1" /> Processing
                </Badge>
            case "shipped":
                return <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                    <Truck className="w-3 h-3 mr-1" /> Shipped
                </Badge>
            case "delivered":
                return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" /> Delivered
                </Badge>
            case "cancelled":
                return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    <AlertCircle className="w-3 h-3 mr-1" /> Cancelled
                </Badge>
            case "refunded":
                return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                    Refunded
                </Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    const getPaymentBadge = (status) => {
        switch (status) {
            case "paid":
                return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" /> Paid
                </Badge>
            case "pending":
                return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    <Clock className="w-3 h-3 mr-1" /> Pending
                </Badge>
            case "failed":
                return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    <AlertCircle className="w-3 h-3 mr-1" /> Failed
                </Badge>
            case "refunded":
                return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                    Refunded
                </Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    const getPaymentIcon = (method) => {
        switch (method.toLowerCase()) {
            case "visa":
                return <div className="w-8 h-5 bg-blue-600 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Visa</span>
                </div>
            case "mastercard":
                return <div className="w-8 h-5 bg-orange-600 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs font-bold">MC</span>
                </div>
            case "paypal":
                return <div className="w-8 h-5 bg-blue-500 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs font-bold">PP</span>
                </div>
            case "american express":
                return <div className="w-8 h-5 bg-green-600 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs font-bold">AM</span>
                </div>
            default:
                return <CreditCard className="w-5 h-5 text-gray-500 dark:text-gray-200" />
        }
    }

    const getStatusProgress = (status) => {
        switch (status) {
            case "pending": return 10
            case "processing": return 30
            case "shipped": return 70
            case "delivered": return 100
            case "cancelled": return 0
            case "refunded": return 0
            default: return 0
        }
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin/orders">

                            <span className="w-14 h-14 bg-secondary rounded-md text-center flex items-center justify-center">
                                <ArrowLeftCircleIcon className="w-8 h-8  text-primary-foreground" />

                            </span>

                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Order #{order.orderNumber}</h1>
                            <p className="text-gray-600  dark:text-gray-200 mt-1 flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="secondary" className="" size="sm">
                            <Printer className="w-4 h-4 mr-2" />
                            Print
                        </Button>
                        <Button variant="secondary" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="secondary" size="sm">
                                    <MoreVertical className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Create Shipping Label</DropdownMenuItem>
                                <DropdownMenuItem>Resend Confirmation</DropdownMenuItem>
                                <DropdownMenuItem>Archive Order</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Status Bar */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center space-x-2">
                                {getStatusBadge(order.status)}
                                {getPaymentBadge(order.paymentStatus)}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-200">
                                Last updated: {new Date(order.updatedAt || order.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Progress value={getStatusProgress(order.status)} className="h-2" />
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-200">
                                <span>Order Placed</span>
                                <span>Processing</span>
                                <span>Shipped</span>
                                <span>Delivered</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="customer">Customer</TabsTrigger>
                        <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid gap-6 lg:grid-cols-3">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Order Items */}
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="flex items-center">
                                            <Package className="w-5 h-5 mr-2" />
                                            Order Items ({order.items.length})
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {order.items.map((item) => (
                                                <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-300 dark:border-gray-700 rounded-lg">
                                                    <Avatar className="w-16 h-16 rounded-md">
                                                        <AvatarImage src={item.productImage || "/placeholder-product.jpg"} alt={item.productName} />
                                                        <AvatarFallback className="rounded-md">{item.productName.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <h3 className="font-medium">{item.productName}</h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-200">SKU: {item.sku}</p>
                                                        <div className="flex items-center mt-1">
                                                            <Badge variant="outline" className="text-xs mr-2">Qty: {item.quantity}</Badge>
                                                            {item.variant && (
                                                                <Badge variant="outline" className="text-xs">
                                                                    {item.variant}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-medium">${item.total.toFixed(2)}</p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-200">${item.price.toFixed(2)} each</p>
                                                        {item.discount > 0 && (
                                                            <p className="text-xs text-green-600">Saved ${item.discount.toFixed(2)}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <Separator className="my-4" />

                                        {/* Order Summary */}
                                        <div className="space-y-2 max-w-md ml-auto">
                                            <div className="flex justify-between">
                                                <span>Subtotal ({order.items.length} items):</span>
                                                <span>${order.subtotal.toFixed(2)}</span>
                                            </div>
                                            {order.discount > 0 && (
                                                <div className="flex justify-between text-green-600">
                                                    <span>Discount:</span>
                                                    <span>-${order.discount.toFixed(2)}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between">
                                                <span>Shipping:</span>
                                                <span>{order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Tax:</span>
                                                <span>${order.tax.toFixed(2)}</span>
                                            </div>
                                            <Separator />
                                            <div className="flex justify-between font-bold text-lg">
                                                <span>Total:</span>
                                                <span>${order.total.toFixed(2)}</span>
                                            </div>
                                            {order.refundedAmount > 0 && (
                                                <div className="flex justify-between text-red-600">
                                                    <span>Refunded Amount:</span>
                                                    <span>-${order.refundedAmount.toFixed(2)}</span>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Shipping & Tracking */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <Truck className="w-5 h-5 mr-2" />
                                            Shipping & Tracking
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div>
                                                <h4 className="font-medium mb-3 text-sm">SHIPPING ADDRESS</h4>
                                                <div className="text-sm text-gray-600 dark:text-gray-200 space-y-1">
                                                    <p className="font-medium">{order.shippingAddress.fullName}</p>
                                                    <p>{order.shippingAddress.addressLine1}</p>
                                                    {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                                                    <p>
                                                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                                                    </p>
                                                    <p>{order.shippingAddress.country}</p>
                                                    <div className="flex items-center mt-2">
                                                        <Phone className="w-4 h-4 mr-1" />
                                                        <span>{order.shippingAddress.phone}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-medium mb-3 text-sm">SHIPPING METHOD</h4>
                                                <div className="text-sm text-gray-600 dark:text-gray-200 space-y-2">
                                                    <p className="font-medium">{order.shippingMethod || "Standard Shipping"}</p>
                                                    <p>Est. delivery: {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>

                                                    <div className="mt-4">
                                                        <h4 className="font-medium mb-2">TRACKING INFORMATION</h4>
                                                        {isEditingTracking ? (
                                                            <div className="flex space-x-2">
                                                                <Input
                                                                    value={trackingNumber}
                                                                    onChange={(e) => setTrackingNumber(e.target.value)}
                                                                    placeholder="Enter tracking number"
                                                                    className="h-8"
                                                                />
                                                                <Button size="sm" onClick={handleSaveTracking} className="h-8">
                                                                    <Save className="w-3 h-3" />
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center justify-between">
                                                                <span className={order.trackingNumber ? "text-blue-600 cursor-pointer" : "text-gray-500 dark:text-gray-200"}>
                                                                    {order.trackingNumber || "No tracking number"}
                                                                </span>
                                                                {hasPermission("orders.write") && (
                                                                    <Button size="sm" variant="ghost" onClick={() => setIsEditingTracking(true)} className="h-8 w-8 p-0">
                                                                        <Edit className="w-3 h-3" />
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Order Management */}
                                {hasPermission("orders.write") && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Order Management</CardTitle>
                                            <CardDescription>Update order status and details</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>Order Status</Label>
                                                <Select value={order.status} onValueChange={(value) => updateOrderStatus(orderId, value)}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="pending">Pending</SelectItem>
                                                        <SelectItem value="processing">Processing</SelectItem>
                                                        <SelectItem value="shipped">Shipped</SelectItem>
                                                        <SelectItem value="delivered">Delivered</SelectItem>
                                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Payment Status</Label>
                                                <Select
                                                    value={order.paymentStatus}
                                                    onValueChange={(value) => updatePaymentStatus(orderId, value)}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="pending">Pending</SelectItem>
                                                        <SelectItem value="paid">Paid</SelectItem>
                                                        <SelectItem value="failed">Failed</SelectItem>
                                                        <SelectItem value="refunded">Refunded</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <Button className="w-full" variant="">
                                                Send Status Update
                                            </Button>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Payment Information */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <CreditCard className="w-5 h-5 mr-2" />
                                            Payment Information
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600 dark:text-gray-200">Method:</span>
                                                <div className="flex items-center">
                                                    {getPaymentIcon(order.paymentMethod)}
                                                    <span className="text-sm ml-2">{order.paymentMethod}</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600 dark:text-gray-200">Status:</span>
                                                {getPaymentBadge(order.paymentStatus)}
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600 dark:text-gray-200">Transaction ID:</span>
                                                <span className="text-sm font-mono">{order.transactionId || "N/A"}</span>
                                            </div>
                                            <Separator />
                                            <div className="flex justify-between font-medium">
                                                <span>Total Paid:</span>
                                                <span>${order.total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Customer Service */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Customer Service</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <Button variant="" className="w-full">
                                            <MessageSquare className="w-4 h-4 mr-2" />
                                            Contact Customer
                                        </Button>
                                        <Button variant="" className="w-full">
                                            Resend Order Details
                                        </Button>
                                        {order.paymentStatus === "paid" && (
                                            <Button variant="secondary" className="w-full">
                                                Process Refund
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Order Notes */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <FileText className="w-5 h-5 mr-2" />
                                            Order Notes
                                        </CardTitle>
                                        <CardDescription>
                                            Internal notes only visible to your team
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {isEditingNotes ? (
                                            <div className="space-y-2">
                                                <Textarea
                                                    value={notes}
                                                    onChange={(e) => setNotes(e.target.value)}
                                                    placeholder="Add order notes..."
                                                    rows={4}
                                                />
                                                <div className="flex space-x-2">
                                                    <Button size="sm" onClick={handleSaveNotes}>
                                                        Save Notes
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => {
                                                            setNotes(order.notes || "")
                                                            setIsEditingNotes(false)
                                                        }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-200 mb-2">{order.notes || "No notes added"}</p>
                                                {hasPermission("orders.write") && (
                                                    <Button size="sm" variant="" onClick={() => setIsEditingNotes(true)}>
                                                        <Edit className="w-4 h-4 mr-2" />
                                                        Add Notes
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="customer">
                        <Card>
                            <CardHeader>
                                <CardTitle>Customer Information</CardTitle>
                                <CardDescription>
                                    Details about the customer who placed this order
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-4">
                                            <Avatar>
                                                <AvatarImage src={order.customer?.avatar || "/placeholder-avatar.jpg"} />
                                                <AvatarFallback>
                                                    {order.customer?.name?.charAt(0) || order.shippingAddress.fullName?.charAt(0) || "C"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-medium">{order.customer?.name || order.shippingAddress.fullName}</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-200">Customer since {new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <h4 className="font-medium text-sm">CONTACT INFORMATION</h4>
                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-200">
                                                <Mail className="w-4 h-4 mr-2" />
                                                {order.customer?.email || "No email provided"}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-200">
                                                <Phone className="w-4 h-4 mr-2" />
                                                {order.shippingAddress.phone}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <h4 className="font-medium text-sm">ORDER HISTORY</h4>
                                            <div className="text-sm text-gray-600 dark:text-gray-200">
                                                <p>{order.customer?.orderCount || 1} order(s) total</p>
                                                <p>Last order: {new Date(order.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="font-medium text-sm">CUSTOMER ADDRESSES</h4>

                                        <div className="grid gap-4 md:grid-cols-2">
                                            <Card>
                                                <CardHeader className="pb-3">
                                                    <CardTitle className="text-sm">Shipping Address</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="text-sm text-gray-600 dark:text-gray-200 space-y-1">
                                                        <p>{order.shippingAddress.fullName}</p>
                                                        <p>{order.shippingAddress.addressLine1}</p>
                                                        {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                                                        <p>
                                                            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                                                        </p>
                                                        <p>{order.shippingAddress.country}</p>
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            <Card>
                                                <CardHeader className="pb-3">
                                                    <CardTitle className="text-sm">Billing Address</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="text-sm text-gray-600 dark:text-gray-200 space-y-1">
                                                        <p>{order.billingAddress.fullName}</p>
                                                        <p>{order.billingAddress.addressLine1}</p>
                                                        {order.billingAddress.addressLine2 && <p>{order.billingAddress.addressLine2}</p>}
                                                        <p>
                                                            {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.postalCode}
                                                        </p>
                                                        <p>{order.billingAddress.country}</p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="timeline">
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Timeline</CardTitle>
                                <CardDescription>
                                    History of all events related to this order
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                                <CheckCircle className="w-4 h-4 text-green-600" />
                                            </div>
                                            <div className="w-0.5 h-16 bg-gray-200 mt-1"></div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium">Order delivered</h4>
                                            <p className="text-sm text-gray-500  dark:text-gray-200">The order was successfully delivered to the customer</p>
                                            <p className="text-xs text-gray-400 mt-1">{new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                <Truck className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div className="w-0.5 h-16 bg-gray-200 mt-1"></div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium">Out for delivery</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-200">Package is out for delivery with carrier</p>
                                            <p className="text-xs text-gray-400 mt-1">{new Date(Date.now() - 26 * 60 * 60 * 1000).toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                <Package className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div className="w-0.5 h-16 bg-gray-200 mt-1"></div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium">Order shipped</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-200">Order was shipped with tracking number {order.trackingNumber || "N/A"}</p>
                                            <p className="text-xs text-gray-400 mt-1">{new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                <RefreshCw className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div className="w-0.5 h-16 bg-gray-200 mt-1"></div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium">Order processing</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-200">Order is being processed in the warehouse</p>
                                            <p className="text-xs text-gray-400 mt-1">{new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                                <CreditCard className="w-4 h-4 text-green-600" />
                                            </div>
                                            <div className="w-0.5 h-16 bg-gray-200 mt-1"></div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium">Payment confirmed</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-200">Payment was successfully processed</p>
                                            <p className="text-xs text-gray-400 mt-1">{new Date(order.createdAt).toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                <FileText className="w-4 h-4 text-blue-600" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium">Order placed</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-200">Customer placed the order</p>
                                            <p className="text-xs text-gray-400 mt-1">{new Date(order.createdAt).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AdminLayout>
    )
}