"use client"

import { Search, ShoppingCart, Menu, MapPin, Package, Tag, ChevronDown, User, Phone, Star, Heart, Truck, Shield, Award, Clock, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const categories = [
    { name: "Groceries", icon: "🛒", hasDropdown: true },
    { name: "Premium Fruits", icon: "🍎", hasDropdown: true },
    { name: "Home & Kitchen", icon: "🏠", hasDropdown: true },
    { name: "Fashion", icon: "👕", hasDropdown: true },
    { name: "Electronics", icon: "📱", hasDropdown: true },
    { name: "Beauty", icon: "💄", hasDropdown: true },
    { name: "Home Improvement", icon: "🔧", hasDropdown: true },
    { name: "Sports, Toys & Luggage", icon: "⚽", hasDropdown: true },
]

export function Header() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Avoid hydration mismatch by only rendering after component mounts
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <header className="w-full sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-800">
            {/* Promotional Top Bar */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800/30">
                <div className="max-w-7xl mx-auto px-4 py-2">
                    <div className="flex flex-col md:flex-row items-center justify-between text-sm text-blue-700 dark:text-blue-300">
                        <div className="flex items-center gap-1 mb-2 md:mb-0">
                            <span className="flex items-center gap-1">
                                <Truck className="h-4 w-4" />
                                Free delivery on orders over $50
                            </span>
                        </div>
                        <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm">
                            <div className="flex items-center gap-1 hover:text-blue-900 dark:hover:text-blue-100 cursor-pointer transition-colors">
                                <MapPin className="h-4 w-4" />
                                <span>Deliver to 423651</span>
                            </div>
                            <div className="flex items-center gap-1 hover:text-blue-900 dark:hover:text-blue-100 cursor-pointer transition-colors">
                                <Package className="h-4 w-4" />
                                <span>Track your order</span>
                            </div>
                            <div className="flex items-center gap-1 hover:text-blue-900 dark:hover:text-blue-100 cursor-pointer transition-colors">
                                <Tag className="h-4 w-4" />
                                <span>All Offers</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between gap-4">
                        {/* Mobile Menu Button and Logo */}
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-6 w-6" />
                            </Button>

                            <div className="flex items-center">
                                <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                                    <ShoppingCart className="h-6 w-6" />
                                    MegaMart
                                </h1>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="flex-1 max-w-2xl mx-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <Input
                                    type="search"
                                    placeholder="Search essentials, groceries and more..."
                                    className="pl-10 pr-4 py-2 w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-800 rounded-full"
                                />
                                <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-1 h-7 text-sm">
                                    Search
                                </Button>
                            </div>
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-2">
                            {/* Theme Toggle Button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="hidden md:flex"
                            >
                                {theme === 'dark' ? (
                                    <Sun className="h-5 w-5" />
                                ) : (
                                    <Moon className="h-5 w-5" />
                                )}
                            </Button>

                            <Button variant="ghost" className="hidden md:flex items-center gap-2">
                                <User className="h-5 w-5" />
                                <span className="hidden lg:inline">Sign Up/Sign In</span>
                            </Button>
                            <Button variant="ghost" className="flex items-center gap-2 relative">
                                <Heart className="h-5 w-5" />
                                <span className="hidden md:inline">Wishlist</span>
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">3</span>
                            </Button>
                            <Button variant="ghost" className="flex items-center gap-2 relative">
                                <ShoppingCart className="h-5 w-5" />
                                <span className="hidden md:inline">Cart</span>
                                <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">5</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4">
                    <nav className="flex items-center gap-1 overflow-x-auto py-2 hide-scrollbar">
                        {categories.map((category) => (
                            <DropdownMenu key={category.name}>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 whitespace-nowrap rounded-md"
                                    >
                                        <span className="text-base">{category.icon}</span>
                                        {category.name}
                                        {category.hasDropdown && <ChevronDown className="h-3 w-3 ml-1" />}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="start"
                                    className="w-56 p-2 bg-white dark:bg-gray-800 border dark:border-gray-700"
                                >
                                    <DropdownMenuItem className="flex items-center gap-2 p-2 cursor-pointer text-gray-900 dark:text-gray-100">
                                        <span className="text-blue-600 dark:text-blue-400">All {category.name}</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                                    <DropdownMenuItem className="flex items-center gap-2 p-2 cursor-pointer text-gray-900 dark:text-gray-100">
                                        <Star className="h-4 w-4 text-yellow-500" />
                                        <span>Popular Items</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex items-center gap-2 p-2 cursor-pointer text-gray-900 dark:text-gray-100">
                                        <Clock className="h-4 w-4 text-blue-500" />
                                        <span>New Arrivals</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex items-center gap-2 p-2 cursor-pointer text-gray-900 dark:text-gray-100">
                                        <Award className="h-4 w-4 text-orange-500" />
                                        <span>Best Sellers</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex items-center gap-2 p-2 cursor-pointer text-gray-900 dark:text-gray-100">
                                        <Shield className="h-4 w-4 text-green-500" />
                                        <span>Quality Assured</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Additional Promotional Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white py-2 text-center text-sm">
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>Download our app for exclusive offers - Get 20% off on your first order!</span>
                </div>
            </div>

            <style jsx>{`
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </header>
    )
}