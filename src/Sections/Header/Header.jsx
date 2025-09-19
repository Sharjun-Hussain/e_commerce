"use client"

import { Search, ShoppingCart, Menu, MapPin, Package, Tag, ChevronDown, User, Phone, Star, Heart, Truck, Shield, Award, Clock, Sun, Moon, X, MenuIcon, MenuSquareIcon, HeartMinusIcon, LayoutDashboard, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

const categories = [
    {
        name: "Laptops",
        icon: "💻",
        hasDropdown: true,
        subcategories: [
            "Gaming Laptops",
            "Business Laptops",
            "Ultrabooks",
            "2-in-1 Laptops",
            "MacBooks",
            "Student Laptops"
        ],
        image: "https://source.unsplash.com/300x200/?laptop,technology"
    },
    {
        name: "Desktops",
        icon: "🖥️",
        hasDropdown: true,
        subcategories: [
            "Gaming PCs",
            "All-in-One PCs",
            "Business Desktops",
            "Workstations",
            "Mini PCs",
            "Custom Builds"
        ],
        image: "https://source.unsplash.com/300x200/?desktop,computer"
    },
    {
        name: "PC Components",
        icon: "🧩",
        hasDropdown: true,
        subcategories: [
            "Processors (CPU)",
            "Graphics Cards (GPU)",
            "Motherboards",
            "RAM & Memory",
            "Storage (HDD/SSD)",
            "Power Supplies"
        ],
        image: "https://source.unsplash.com/300x200/?computer,parts"
    },
    {
        name: "Monitors",
        icon: "🖼️",
        hasDropdown: true,
        subcategories: [
            "Gaming Monitors",
            "Office Monitors",
            "4K Monitors",
            "Curved Monitors",
            "Ultrawide Monitors",
            "Portable Monitors"
        ],
        image: "https://source.unsplash.com/300x200/?monitor,screen"
    },
    {
        name: "Peripherals",
        icon: "⌨️",
        hasDropdown: true,
        subcategories: [
            "Keyboards",
            "Mice",
            "Headsets",
            "Webcams",
            "Speakers",
            "External Storage"
        ],
        image: "https://source.unsplash.com/300x200/?keyboard,mouse"
    },
    {
        name: "Networking",
        icon: "🌐",
        hasDropdown: true,
        subcategories: [
            "Routers",
            "Wi-Fi Adapters",
            "Modems",
            "Network Switches",
            "Cables",
            "Mesh Wi-Fi Systems"
        ],
        image: "https://source.unsplash.com/300x200/?network,router"
    },
    {
        name: "Printers & Scanners",
        icon: "🖨️",
        hasDropdown: true,
        subcategories: [
            "Inkjet Printers",
            "Laser Printers",
            "All-in-One Printers",
            "Photo Printers",
            "3D Printers",
            "Scanners"
        ],
        image: "https://source.unsplash.com/300x200/?printer,scanner"
    },
    {
        name: "Accessories",
        icon: "🎧",
        hasDropdown: true,
        subcategories: [
            "Laptop Bags",
            "Cooling Pads",
            "Docking Stations",
            "Cables & Chargers",
            "Adapters",
            "USB Hubs"
        ],
        image: "https://source.unsplash.com/300x200/?computer,accessories"
    }
];


export function Header() {
    const { theme, setTheme } = useTheme()
    const router = useRouter()

    const [mounted, setMounted] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
    const [hoveredCategory, setHoveredCategory] = useState(null)
    const [isClosing, setIsClosing] = useState(false)

    // Handle scroll to hide promotional bar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleWishlistClick = () => {
        // Wishlist click handler
    }

    const toggleMegaMenu = () => {
        if (isMegaMenuOpen) {
            // Start closing animation
            setIsClosing(true)
            setTimeout(() => {
                setIsMegaMenuOpen(false)
                setIsClosing(false)
            }, 300)
        } else {
            setIsMegaMenuOpen(true)
            setIsClosing(false)
        }
    }

    const closeMegaMenu = () => {
        // Start closing animation
        setIsClosing(true)
        setTimeout(() => {
            setIsMegaMenuOpen(false)
            setIsClosing(false)
        }, 300)
    }

    // Close mega menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMegaMenuOpen && !event.target.closest('.mega-menu-container')) {
                closeMegaMenu()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isMegaMenuOpen])


    return (
        <header className="w-full sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
            {/* Promotional Top Bar - Hidden when scrolled */}
            <div className={`hidden md:block bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800/30 transition-all duration-300 ${isScrolled ? 'max-h-0 opacity-0 overflow-hidden' : 'max-h-20 opacity-100'}`}>
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
                                <span className="hidden sm:inline">Deliver to 423651</span>
                            </div>
                            <div className="hidden md:flex items-center gap-1 hover:text-blue-900 dark:hover:text-blue-100 cursor-pointer transition-colors">
                                <Package className="h-4 w-4" />
                                <span>Track your order</span>
                            </div>
                            <div className="hidden lg:flex items-center gap-1 hover:text-blue-900 dark:hover:text-blue-100 cursor-pointer transition-colors">
                                <Tag className="h-4 w-4" />
                                <span>All Offers</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header - Always sticky */}
            <div className="bg-white dark:bg-gray-900  dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between gap-4">
                        {/* Mobile Menu Button and Logo */}
                        <div className="flex items-center gap-2 mega-menu-container">
                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="md:hidden">
                                        <Menu className="h-6 w-6" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-80 sm:w-96 p-0 bg-white dark:bg-gray-900">
                                    <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
                                        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                                            <ShoppingCart className="h-6 w-6" />
                                            MegaMart
                                        </h2>

                                    </div>
                                    <div className="p-4">
                                        <div className="mb-6">
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                                <Input
                                                    type="search"
                                                    placeholder="Search products..."
                                                    className="pl-10 pr-4 py-2 w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-800 rounded-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Button variant="ghost" className="w-full justify-start gap-2">
                                                <User className="h-5 w-5" />
                                                Sign Up/Sign In
                                            </Button>
                                            <Button variant="ghost" className="w-full justify-start gap-2">
                                                <MapPin className="h-5 w-5" />
                                                Delivery Location
                                            </Button>
                                            <Button variant="ghost" className="w-full justify-start gap-2">
                                                <Package className="h-5 w-5" />
                                                Orders
                                            </Button>
                                            <Link href='/wishlist' className="w-full justify-start gap-2">
                                                <Heart className="h-5 w-5" />
                                                Wishlist
                                            </Link>
                                        </div>
                                        <div className="mt-6 pt-4 border-t dark:border-gray-800">
                                            <h3 className="font-semibold mb-2">Categories</h3>
                                            <div className="space-y-1">
                                                {categories.map((category) => (
                                                    <Button
                                                        key={category.name}
                                                        variant="ghost"
                                                        className="w-full justify-start gap-2"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        <span className="text-base">{category.icon}</span>
                                                        {category.name}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mt-6 pt-4 border-t dark:border-gray-800">
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-start gap-2"
                                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                            >
                                                {theme === 'dark' ? (
                                                    <Sun className="h-5 w-5" />
                                                ) : (
                                                    <Moon className="h-5 w-5" />
                                                )}
                                                Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
                                            </Button>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>

                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                                    <ShoppingCart className="h-6 w-6" />
                                    <span className="hidden sm:inline">MegaMart</span>
                                </h1>

                                {/* Desktop Menu Button */}
                                <Button
                                    variant="ghost"
                                    className="hidden md:flex items-center gap-1 px-3 py-2"
                                    onClick={toggleMegaMenu}
                                    aria-expanded={isMegaMenuOpen}
                                >
                                    <Menu className="h-5 w-5" />
                                    <span className="font-medium">Categories</span>
                                </Button>
                            </div>
                        </div>

                        {/* Search Bar - Hidden on mobile */}
                        <div className="flex-1 max-w-2xl mx-4 hidden md:block">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <Input
                                    type="search"
                                    placeholder="Search products and more..."
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

                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Search className="h-5 w-5" />
                            </Button>

                            <Button variant="ghost" size="icon" className="md:hidden">
                                <User className="h-5 w-5" />
                            </Button>

                            <Button variant="ghost" className="hidden md:flex items-center gap-2">
                                <User className="h-5 w-5" />
                                <span className="hidden lg:inline">Sign Up/Sign In</span>
                            </Button>

                            <Button variant="ghost" size="icon" className="md:hidden relative">
                                <Heart className="h-5 w-5" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">3</span>
                            </Button>

                            <Button onClick={handleWishlistClick} variant="ghost" className="hidden md:flex items-center gap-2 relative">
                                <Heart className="h-5 w-5" />
                                <span className="hidden md:inline">Wishlist</span>
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">3</span>
                            </Button>

                            <Button onClick={() => router.push('/cart')} variant="ghost" size="icon" className="relative">
                                <ShoppingCart className="h-5 w-5" />
                                <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">5</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mega Menu - Appears when clicking the Categories button */}
            {isMegaMenuOpen && (
                <div className={`mega-menu-container hidden md:block absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg z-40 transition-all duration-300 ease-in-out ${isClosing ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
                    <div className="max-w-7xl mx-auto px-4 py-6">
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">All Categories</h2>
                            <Button variant="ghost" size="icon" onClick={closeMegaMenu} className="rounded-full">
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="flex gap-8">
                            {/* Categories List */}
                            <div className="w-1/3">
                                <div className="space-y-1 border-r border-gray-200 dark:border-gray-800 pr-4">
                                    {categories.map((category) => (
                                        <div
                                            key={category.name}
                                            className={`group flex items-center gap-3 p-3 rounded-md cursor-pointer transition-all duration-200 ${hoveredCategory === category.name ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                                            onMouseEnter={() => setHoveredCategory(category.name)}
                                        >
                                            <span className="text-xl transition-transform duration-200 group-hover:scale-110">{category.icon}</span>
                                            <span className="font-medium transition-all duration-200 group-hover:translate-x-1">{category.name}</span>
                                            <ChevronDown className={`h-4 w-4 ml-auto transition-transform duration-200 ${hoveredCategory === category.name ? 'rotate-180' : ''}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Subcategories and Image */}
                            <div className="w-2/3">
                                {hoveredCategory ? (
                                    <div className="animate-fadeIn">
                                        <div className="flex gap-6">
                                            <div className="w-2/3">
                                                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                                                    {categories.find(c => c.name === hoveredCategory)?.name}
                                                </h3>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {categories.find(c => c.name === hoveredCategory)?.subcategories.map((subcategory) => (
                                                        <Link
                                                            key={subcategory}
                                                            href="#"
                                                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-200 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                                            onClick={closeMegaMenu}
                                                        >
                                                            {subcategory}
                                                        </Link>
                                                    ))}
                                                </div>
                                                <div className="mt-4">
                                                    <Link
                                                        href="#"
                                                        className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline transition-all duration-200 hover:translate-x-1"
                                                        onClick={closeMegaMenu}
                                                    >
                                                        View All {hoveredCategory}
                                                        <ChevronDown className="h-4 w-4 ml-1 rotate-90" />
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="w-1/3">
                                                <div className="rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg">
                                                    <div className="bg-gray-200 dark:bg-gray-700 h-40 flex items-center justify-center">
                                                        <span className="text-gray-500 dark:text-gray-400">
                                                            {categories.find(c => c.name === hoveredCategory)?.name} Image
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="mt-3 text-center">
                                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                                        Shop Now
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400 animate-pulse">
                                        <div className="text-center">
                                            <LayoutGrid className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                            <p>Hover over a category to see products</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                            <div className="flex flex-wrap gap-6">
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer">
                                    <Star className="h-4 w-4 text-yellow-500" />
                                    <span>Popular Items</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer">
                                    <Clock className="h-4 w-4 text-blue-500" />
                                    <span>New Arrivals</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer">
                                    <Award className="h-4 w-4 text-orange-500" />
                                    <span>Best Sellers</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer">
                                    <Shield className="h-4 w-4 text-green-500" />
                                    <span>Quality Assured</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Overlay for closing mega menu when clicking outside */}
            {/* {isMegaMenuOpen && (
                <div
                    className={`fixed inset-0 bg-black bg-opacity-20 z-30 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
                    onClick={closeMegaMenu}
                />
            )} */}

            <style jsx>{`
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-in-out;
                }
            `}</style>
        </header>
    )
}