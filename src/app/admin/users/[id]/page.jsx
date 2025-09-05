"use client"
import Link from "next/link"
import { useParams } from "next/navigation"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, User, Mail, MapPin, Calendar, ShoppingCart, Shield, Edit } from "lucide-react"
import { useAuth } from "@/States/auth-context"
import { useUsers } from "@/States/user-store"
import { AdminLayout } from "@/components/admin/admin-layout"

export default function UserDetailPage() {
    const params = useParams()
    const userId = params.id
    const { getUser, updateUserRole, updateUserStatus } = useUsers()
    const { hasPermission } = useAuth()
    const user = getUser(userId)

    if (!user) {
        return (
            <AdminLayout>
                <div className="text-center py-8">
                    <h1 className="text-2xl font-bold text-gray-900">User Not Found</h1>
                    <p className="text-gray-600 mt-2">The user you're looking for doesn't exist.</p>
                    <Link href="/admin/users">
                        <Button className="mt-4">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Users
                        </Button>
                    </Link>
                </div>
            </AdminLayout>
        )
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-100 text-green-800">Active</Badge>
            case "inactive":
                return <Badge variant="secondary">Inactive</Badge>
            case "suspended":
                return <Badge variant="destructive">Suspended</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    const getRoleBadge = (role) => {
        switch (role) {
            case "admin":
                return <Badge className="bg-red-100 text-red-800">Admin</Badge>
            case "manager":
                return <Badge className="bg-blue-100 text-blue-800">Manager</Badge>
            case "staff":
                return <Badge className="bg-purple-100 text-purple-800">Staff</Badge>
            case "customer":
                return <Badge variant="outline">Customer</Badge>
            default:
                return <Badge variant="outline">{role}</Badge>
        }
    }

    const recentActivity = [
        { action: "Placed order", details: "Order #ORD-2024-001 - $2,489.84", time: "2 days ago" },
        { action: "Updated profile", details: "Changed shipping address", time: "1 week ago" },
        { action: "Logged in", details: "From New York, NY", time: "2 weeks ago" },
        { action: "Placed order", details: "Order #ORD-2023-089 - $399.99", time: "3 weeks ago" },
    ]

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin/users">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Users
                            </Button>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Avatar className="w-16 h-16">
                                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.fullName} />
                                <AvatarFallback className="text-lg">
                                    {user.firstName.charAt(0)}
                                    {user.lastName.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{user.fullName}</h1>
                                <p className="text-gray-600 mt-1">{user.email}</p>
                                <div className="flex items-center space-x-2 mt-2">
                                    {getRoleBadge(user.role)}
                                    {getStatusBadge(user.status)}
                                    {!user.emailVerified && <Badge variant="outline">Email Unverified</Badge>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        {hasPermission("users.write") && (
                            <Link href={`/admin/users/edit/${user.id}`}>
                                <Button>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit User
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* User Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <User className="w-5 h-5 mr-2" />
                                    User Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <h4 className="font-medium mb-2 flex items-center">
                                            <Mail className="w-4 h-4 mr-2" />
                                            Contact Information
                                        </h4>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <p>
                                                <strong>Email:</strong> {user.email}
                                            </p>
                                            {user.phone && (
                                                <p>
                                                    <strong>Phone:</strong> {user.phone}
                                                </p>
                                            )}
                                            <p>
                                                <strong>Email Verified:</strong> {user.emailVerified ? "Yes" : "No"}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-2 flex items-center">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            Account Details
                                        </h4>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <p>
                                                <strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}
                                            </p>
                                            <p>
                                                <strong>Last Login:</strong>{" "}
                                                {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Never"}
                                            </p>
                                            <p>
                                                <strong>Last Updated:</strong> {new Date(user.updatedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {user.address && (
                                    <>
                                        <Separator />
                                        <div>
                                            <h4 className="font-medium mb-2 flex items-center">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                Address
                                            </h4>
                                            <div className="text-sm text-gray-600 space-y-1">
                                                <p>{user.address.street}</p>
                                                <p>
                                                    {user.address.city}, {user.address.state} {user.address.postalCode}
                                                </p>
                                                <p>{user.address.country}</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        {/* Order History for Customers */}
                        {user.role === "customer" && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <ShoppingCart className="w-5 h-5 mr-2" />
                                        Order Statistics
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                                            <div className="text-2xl font-bold text-blue-600">{user.totalOrders}</div>
                                            <div className="text-sm text-blue-600">Total Orders</div>
                                        </div>
                                        <div className="text-center p-4 bg-green-50 rounded-lg">
                                            <div className="text-2xl font-bold text-green-600">${user.totalSpent.toFixed(2)}</div>
                                            <div className="text-sm text-green-600">Total Spent</div>
                                        </div>
                                    </div>
                                    {user.totalOrders > 0 && (
                                        <div className="mt-4">
                                            <p className="text-sm text-gray-600">
                                                Average order value: <strong>${(user.totalSpent / user.totalOrders).toFixed(2)}</strong>
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {/* Recent Activity */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>Latest user actions and events</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentActivity.map((activity, index) => (
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
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* User Management */}
                        {hasPermission("users.write") && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Shield className="w-5 h-5 mr-2" />
                                        User Management
                                    </CardTitle>
                                    <CardDescription>Update user role and status</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Role</label>
                                        <Select value={user.role} onValueChange={(value) => updateUserRole(userId, value)}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="customer">Customer</SelectItem>
                                                <SelectItem value="staff">Staff</SelectItem>
                                                <SelectItem value="manager">Manager</SelectItem>
                                                <SelectItem value="admin">Admin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Status</label>
                                        <Select value={user.status} onValueChange={(value) => updateUserStatus(userId, value)}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="inactive">Inactive</SelectItem>
                                                <SelectItem value="suspended">Suspended</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Quick Stats */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Stats</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Account Age:</span>
                                    <span className="text-sm font-medium">
                                        {Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days
                                    </span>
                                </div>
                                {user.role === "customer" && (
                                    <>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Customer Tier:</span>
                                            <Badge variant="outline">
                                                {user.totalSpent > 5000 ? "VIP" : user.totalSpent > 1000 ? "Premium" : "Standard"}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Loyalty Points:</span>
                                            <span className="text-sm font-medium">{Math.floor(user.totalSpent / 10)}</span>
                                        </div>
                                    </>
                                )}
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Profile Complete:</span>
                                    <span className="text-sm font-medium">
                                        {user.phone && user.address ? "100%" : user.phone || user.address ? "75%" : "50%"}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
