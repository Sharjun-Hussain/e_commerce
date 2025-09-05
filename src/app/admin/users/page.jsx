"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Plus,
    Search,
    MoreHorizontal,
    Eye,
    Edit,
    Trash2,
    Users,
    UserCheck,
    UserX,
    Shield,
    Download,
} from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { useUsers } from "@/States/user-store"
import { useAuth } from "@/States/auth-context"

export default function UsersPage() {
    const { users, deleteUser, updateUserStatus, updateUserRole } = useUsers()
    const { hasPermission } = useAuth()
    const [searchTerm, setSearchTerm] = useState("")
    const [roleFilter, setRoleFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")

    // Filter users based on search and filters
    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone?.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesRole = roleFilter === "all" || user.role === roleFilter
        const matchesStatus = statusFilter === "all" || user.status === statusFilter

        return matchesSearch && matchesRole && matchesStatus
    })

    const getStatusBadge = (status) => {
        switch (status) {
            case "active":
                return (
                    <Badge className="bg-green-100 text-green-800">
                        <UserCheck className="w-3 h-3 mr-1" />
                        Active
                    </Badge>
                )
            case "inactive":
                return (
                    <Badge variant="secondary">
                        <UserX className="w-3 h-3 mr-1" />
                        Inactive
                    </Badge>
                )
            case "suspended":
                return <Badge variant="destructive">Suspended</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    const getRoleBadge = (role) => {
        switch (role) {
            case "admin":
                return (
                    <Badge className="bg-red-100 text-red-800">
                        <Shield className="w-3 h-3 mr-1" />
                        Admin
                    </Badge>
                )
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

    const stats = [
        {
            title: "Total Users",
            value: users.length.toString(),
            icon: Users,
        },
        {
            title: "Active Users",
            value: users.filter((u) => u.status === "active").length.toString(),
            icon: UserCheck,
        },
        {
            title: "Customers",
            value: users.filter((u) => u.role === "customer").length.toString(),
            icon: Users,
        },
        {
            title: "Staff Members",
            value: users.filter((u) => ["staff", "manager", "admin"].includes(u.role)).length.toString(),
            icon: Shield,
        },
    ]

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold dark:text-gray-200 text-gray-900">Users</h1>
                        <p className="text-gray-600 dark:text-gray-50 mt-1">Manage customers and staff members</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </Button>
                        {hasPermission("users.write") && (
                            <Link href="/admin/users/add">
                                <Button>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add User
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                <stat.icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Users Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>User Management</CardTitle>
                        <CardDescription>View and manage all users</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search users by name, email, or phone..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={roleFilter} onValueChange={setRoleFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Roles</SelectItem>
                                    <SelectItem value="customer">Customer</SelectItem>
                                    <SelectItem value="staff">Staff</SelectItem>
                                    <SelectItem value="manager">Manager</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                    <SelectItem value="suspended">Suspended</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Orders</TableHead>
                                        <TableHead>Total Spent</TableHead>
                                        <TableHead>Last Login</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredUsers.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>
                                                <div className="flex items-center space-x-3">
                                                    <Avatar className="w-10 h-10">
                                                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.fullName} />
                                                        <AvatarFallback>
                                                            {user.firstName.charAt(0)}
                                                            {user.lastName.charAt(0)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">{user.fullName}</p>
                                                        <p className="text-sm text-gray-500">{user.email}</p>
                                                        {!user.emailVerified && (
                                                            <Badge variant="outline" className="text-xs mt-1">
                                                                Unverified
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{getRoleBadge(user.role)}</TableCell>
                                            <TableCell>{getStatusBadge(user.status)}</TableCell>
                                            <TableCell>
                                                <span className="text-sm">{user.totalOrders}</span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-medium">${user.totalSpent.toFixed(2)}</span>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    {user.lastLogin ? (
                                                        <>
                                                            <p className="text-sm">{new Date(user.lastLogin).toLocaleDateString()}</p>
                                                            <p className="text-xs text-gray-500">{new Date(user.lastLogin).toLocaleTimeString()}</p>
                                                        </>
                                                    ) : (
                                                        <span className="text-sm text-gray-500">Never</span>
                                                    )}
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
                                                            <Link href={`/admin/users/${user.id}`}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View Details
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        {hasPermission("users.write") && (
                                                            <>
                                                                <DropdownMenuItem asChild>
                                                                    <Link href={`/admin/users/edit/${user.id}`}>
                                                                        <Edit className="mr-2 h-4 w-4" />
                                                                        Edit User
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        updateUserStatus(user.id, user.status === "active" ? "inactive" : "active")
                                                                    }
                                                                >
                                                                    {user.status === "active" ? "Deactivate" : "Activate"}
                                                                </DropdownMenuItem>
                                                                {user.status !== "suspended" && (
                                                                    <DropdownMenuItem
                                                                        onClick={() => updateUserStatus(user.id, "suspended")}
                                                                        className="text-orange-600"
                                                                    >
                                                                        Suspend User
                                                                    </DropdownMenuItem>
                                                                )}
                                                                <AlertDialog>
                                                                    <AlertDialogTrigger asChild>
                                                                        <DropdownMenuItem className="text-red-600" onSelect={(e) => e.preventDefault()}>
                                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                                            Delete User
                                                                        </DropdownMenuItem>
                                                                    </AlertDialogTrigger>
                                                                    <AlertDialogContent>
                                                                        <AlertDialogHeader>
                                                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                            <AlertDialogDescription>
                                                                                This action cannot be undone. This will permanently delete the user "
                                                                                {user.fullName}" and all associated data.
                                                                            </AlertDialogDescription>
                                                                        </AlertDialogHeader>
                                                                        <AlertDialogFooter>
                                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                            <AlertDialogAction
                                                                                onClick={() => deleteUser(user.id)}
                                                                                className="bg-red-600 hover:bg-red-700"
                                                                            >
                                                                                Delete
                                                                            </AlertDialogAction>
                                                                        </AlertDialogFooter>
                                                                    </AlertDialogContent>
                                                                </AlertDialog>
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

                        {filteredUsers.length === 0 && (
                            <div className="text-center py-8">
                                <Users className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {searchTerm || roleFilter !== "all" || statusFilter !== "all"
                                        ? "Try adjusting your search or filters."
                                        : "Users will appear here when they register."}
                                </p>
                                {hasPermission("users.write") && (
                                    <div className="mt-6">
                                        <Link href="/admin/users/add">
                                            <Button>
                                                <Plus className="w-4 h-4 mr-2" />
                                                Add User
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    )
}
