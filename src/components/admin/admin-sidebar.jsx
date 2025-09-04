"use client"

import React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    BarChart3,
    Settings,
    FileText,
    X,
    ChevronDown,
    LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/States/auth-context"



const navItems = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Products",
        href: "/admin/products",
        icon: Package,
        permission: "products.read",
        children: [
            { title: "All Products", href: "/admin/products", icon: Package },
            { title: "Add Product", href: "/admin/products/add", icon: Package, permission: "products.write" },
            { title: "Categories", href: "/admin/products/categories", icon: Package },
            { title: "Inventory", href: "/admin/products/inventory", icon: Package },
        ],
    },
    {
        title: "Orders",
        href: "/admin/orders",
        icon: ShoppingCart,
        permission: "orders.read",
        badge: "12",
        children: [
            { title: "All Orders", href: "/admin/orders", icon: ShoppingCart },
            { title: "Pending", href: "/admin/orders/pending", icon: ShoppingCart, badge: "5" },
            { title: "Processing", href: "/admin/orders/processing", icon: ShoppingCart, badge: "3" },
            { title: "Shipped", href: "/admin/orders/shipped", icon: ShoppingCart, badge: "4" },
        ],
    },
    {
        title: "Users",
        href: "/admin/users",
        icon: Users,
        permission: "users.read",
        children: [
            { title: "All Users", href: "/admin/users", icon: Users },
            { title: "Customers", href: "/admin/users/customers", icon: Users },
            { title: "Staff", href: "/admin/users/staff", icon: Users, permission: "users.write" },
        ],
    },
    {
        title: "Analytics",
        href: "/admin/analytics",
        icon: BarChart3,
        permission: "analytics.read",
        children: [
            { title: "Overview", href: "/admin/analytics", icon: BarChart3 },
            { title: "Sales Report", href: "/admin/analytics/sales", icon: BarChart3 },
            { title: "Traffic", href: "/admin/analytics/traffic", icon: BarChart3 },
        ],
    },
    {
        title: "Reports",
        href: "/admin/reports",
        icon: FileText,
        permission: "analytics.read",
    },
    {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
        permission: "all",
    },
]



export function AdminSidebar({ isOpen, onClose }) {
    const pathname = usePathname()
    const { user, logout, hasPermission } = useAuth()
    const [expandedItems, setExpandedItems] = useState([])

    const toggleExpanded = (title) => {
        setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
    }

    const filteredNavItems = navItems.filter((item) => !item.permission || hasPermission(item.permission))

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

            {/* Sidebar */}
            <div
                className={cn(
                    "fixed left-0 top-0 z-50 h-full w-64 bg-background border-r border-gray-200 overflow-auto transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-600 border-gray-200 ">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-lg">TechMart</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                {/* User info */}
                <div className="p-4 border-b dark:border-gray-600 border-gray-200">
                    <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                            <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-200 capitalize">{user?.role}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {filteredNavItems.map((item) => (
                        <div key={item.title}>
                            {item.children ? (
                                <div>
                                    <Button
                                        variant="ghost"
                                        className={cn(
                                            "w-full justify-between text-left font-normal",
                                            pathname.startsWith(item.href) && "bg-primary/10 text-primary",
                                        )}
                                        onClick={() => toggleExpanded(item.title)}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <item.icon className="w-4 h-4" />
                                            <span>{item.title}</span>
                                            {item.badge && (
                                                <Badge variant="secondary" className="ml-auto">
                                                    {item.badge}
                                                </Badge>
                                            )}
                                        </div>
                                        <ChevronDown
                                            className={cn("w-4 h-4 transition-transform", expandedItems.includes(item.title) && "rotate-180")}
                                        />
                                    </Button>
                                    {expandedItems.includes(item.title) && (
                                        <div className="ml-4 mt-1 space-y-1">
                                            {item.children
                                                .filter((child) => !child.permission || hasPermission(child.permission))
                                                .map((child) => (
                                                    <Link key={child.href} href={child.href}>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className={cn(
                                                                "w-full justify-start text-left font-normal",
                                                                pathname === child.href && "bg-primary/10 text-primary",
                                                            )}
                                                        >
                                                            <div className="flex items-center space-x-2 w-full">
                                                                <span className="text-xs">{child.title}</span>
                                                                {child.badge && (
                                                                    <Badge variant="secondary" className="ml-auto text-xs">
                                                                        {child.badge}
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                        </Button>
                                                    </Link>
                                                ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link href={item.href}>
                                    <Button
                                        variant="ghost"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            pathname === item.href && "bg-primary/10 text-primary",
                                        )}
                                    >
                                        <div className="flex items-center space-x-3 w-full">
                                            <item.icon className="w-4 h-4" />
                                            <span>{item.title}</span>
                                            {item.badge && (
                                                <Badge variant="secondary" className="ml-auto">
                                                    {item.badge}
                                                </Badge>
                                            )}
                                        </div>
                                    </Button>
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-gray-200">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={logout}
                    >
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                    </Button>
                </div>
            </div>
        </>
    )
}
