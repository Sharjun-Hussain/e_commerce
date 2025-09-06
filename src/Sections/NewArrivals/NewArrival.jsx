'use client';

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Star,
    Zap,
    Heart,
    Eye,
    ShoppingCart,
    MapPin,
    TrendingUp,
    Crown,
    Sparkles,
    Clock,
    Shield,
    Truck,
    RotateCcw
} from "lucide-react"

export function ProductCard({
    product,
    place = "homepage",
    isFeatured = false,
    isSponsored = false,
    isOutOfStock = false,
    onLike,
    onQuickView,
    onAddToCart,
    className = ""
}) {
    const [isHovered, setIsHovered] = useState(false)
    const [isLiked, setIsLiked] = useState(product.isLiked || false)

    const formatPrice = (price) => `Rs.${price.toLocaleString()}`

    // Handle like click
    const handleLikeClick = (e) => {
        e.stopPropagation()
        const newLikedState = !isLiked
        setIsLiked(newLikedState)
        if (onLike) onLike(product.id, newLikedState)
    }

    // Handle quick view
    const handleQuickView = (e) => {
        e.stopPropagation()
        if (onQuickView) onQuickView(product.id)
    }

    // Handle add to cart
    const handleAddToCart = (e) => {
        e.stopPropagation()
        if (onAddToCart) onAddToCart(product.id)
    }

    // Function to render star ratings
    const renderRating = (rating) => {
        return (
            <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`h-3 w-3 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                ))}
                <span className="text-xs text-muted-foreground ml-1">({rating})</span>
            </div>
        )
    }

    // Determine card size based on placement
    const getCardSize = () => {
        switch (place) {
            case "productListing":
                return "h-80"
            case "featured":
                return "h-96"
            case "cart":
                return "h-64"
            default: // homepage
                return "h-88"
        }
    }

    return (
        <div
            className={`bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group relative ${getCardSize()} ${className} ${isOutOfStock ? "opacity-70" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Sponsored Banner - Top of card */}
            {isSponsored && (
                <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold py-1.5 px-3 text-center relative z-10">
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                        <Sparkles className="h-3 w-3" />
                    </div>
                    <span className="ml-4">Sponsored</span>
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <TrendingUp className="h-3 w-3" />
                    </div>
                </div>
            )}

            {/* Image Container */}
            <div className="relative px-0 flex-1 overflow-hidden">
                <div className="relative h-40 md:h-48 w-full">
                    <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className={`object-cover rounded-t-xl transition-all duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
                    />

                    {/* Out of Stock Overlay - Centered with better design */}
                    {isOutOfStock && (
                        <div className="absolute inset-0 bg-white/90 flex items-center justify-center z-20">
                            <div className="bg-gray-800 text-white py-3 px-6 rounded-lg font-bold text-sm shadow-lg transform rotate-[-3deg]">
                                Out of Stock
                            </div>
                        </div>
                    )}
                </div>

                {/* Hover Actions - Top Right */}
                <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 z-30 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-full h-9 w-9 p-0 bg-white/90 text-gray-700 backdrop-blur-sm shadow-md hover:bg-red-100 transition-colors"
                        onClick={handleLikeClick}
                    >
                        <Heart
                            className={`h-4 w-4 transition-all ${isLiked ? "fill-red-500 text-red-500 scale-110" : ""}`}
                        />
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-full h-9 w-9 p-0 text-gray-700 bg-white/90 backdrop-blur-sm shadow-md hover:text-gray-900 transition-colors"
                        onClick={handleQuickView}
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                </div>

                {/* Badges - Top Left */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-30">
                    {/* Discount Badge - Positioned with slight offset */}
                    {product.discount > 0 && (
                        <div className="relative">
                            <Badge className="bg-red-600 text-white font-semibold text-xs py-1 px-2 shadow-md transform rotate-[-2deg]">
                                {product.discount}% OFF
                            </Badge>
                            <div className="absolute -bottom-1 left-3 w-2 h-2 bg-red-800 rotate-45"></div>
                        </div>
                    )}

                    {/* New Arrival Badge - Positioned next to discount */}
                    {product.isNew && (
                        <div className="relative mt-4">
                            <Badge className="bg-blue-600 text-white font-semibold text-xs py-1 px-2 shadow-md transform rotate-[2deg]">
                                NEW
                            </Badge>
                            <div className="absolute -bottom-1 left-3 w-2 h-2 bg-blue-800 rotate-45"></div>
                        </div>
                    )}

                    {/* Featured Badge - Positioned separately */}
                    {isFeatured && (
                        <div className="relative mt-8">
                            <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold text-xs py-1 px-3 shadow-md flex items-center rounded-md relative overflow-hidden transform rotate-[-1deg]">
                                <Crown className="h-3 w-3 mr-1 fill-yellow-300 text-yellow-300" />
                                Featured
                            </div>
                            <div className="absolute -bottom-1 left-4 w-2 h-2 bg-amber-800 rotate-45"></div>
                        </div>
                    )}
                </div>

                {/* Express Delivery Badge - Positioned at bottom right */}
                {product.fastDelivery && (
                    <div className="absolute bottom-3 right-3 z-30">
                        <Badge variant="outline" className="bg-white/90 backdrop-blur-sm text-xs shadow-md border-amber-300 text-amber-700 flex items-center transform rotate-[1deg]">
                            <Zap className="h-3 w-3 mr-1 fill-amber-500 text-amber-500" />
                            Express
                        </Badge>
                    </div>
                )}

                {/* Additional badges for product benefits - Positioned at bottom left */}
                <div className="absolute bottom-3 left-3 flex flex-col gap-1 z-30">
                    {product.freeShipping && (
                        <Badge variant="outline" className="bg-white/90 backdrop-blur-sm text-xs shadow-md border-green-300 text-green-700 transform rotate-[-1deg]">
                            <Truck className="h-3 w-3 mr-1" />
                            Free Shipping
                        </Badge>
                    )}
                    {product.warranty && (
                        <Badge variant="outline" className="bg-white/90 backdrop-blur-sm text-xs shadow-md border-blue-300 text-blue-700 transform rotate-[1deg]">
                            <Shield className="h-3 w-3 mr-1" />
                            {product.warranty} Warranty
                        </Badge>
                    )}
                    {product.returnPolicy && (
                        <Badge variant="outline" className="bg-white/90 backdrop-blur-sm text-xs shadow-md border-purple-300 text-purple-700 transform rotate-[-1deg]">
                            <RotateCcw className="h-3 w-3 mr-1" />
                            Easy Returns
                        </Badge>
                    )}
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-2 flex-1 flex flex-col">
                <h3 className="font-medium text-gray-900 text-sm line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                    {product.name}
                </h3>

                {/* Brand */}
                {product.brand && (
                    <p className="text-xs text-gray-500">{product.brand}</p>
                )}

                {/* Rating */}
                {product.rating && renderRating(product.rating)}

                {/* Pricing */}
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-base font-bold text-gray-900">{formatPrice(product.currentPrice)}</span>
                    {product.originalPrice > product.currentPrice && (
                        <span className="text-xs text-gray-500 line-through">
                            {formatPrice(product.originalPrice)}
                        </span>
                    )}
                </div>

                {/* Savings */}
                {product.savings > 0 && (
                    <div className="text-xs font-medium text-green-600">
                        You save {formatPrice(product.savings)}
                    </div>
                )}

                {/* Color variants */}
                {product.colors && product.colors.length > 0 && (
                    <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-1">Colors:</p>
                        <div className="flex gap-1">
                            {product.colors.slice(0, 4).map((color, index) => (
                                <div
                                    key={index}
                                    className="w-4 h-4 rounded-full border border-gray-200"
                                    style={{ backgroundColor: color }}
                                    title={color}
                                />
                            ))}
                            {product.colors.length > 4 && (
                                <div className="text-xs text-gray-500 flex items-center">
                                    +{product.colors.length - 4} more
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Progress Bar for limited stock */}
                {product.stockPercentage && !isOutOfStock && (
                    <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Sold: {product.stockPercentage}%</span>
                            <span>Limited stock</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                                className="bg-red-600 h-1.5 rounded-full transition-all duration-500"
                                style={{ width: `${product.stockPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* Countdown timer for flash sales - Positioned above CTA */}
                {product.saleEnds && (
                    <div className="mt-2 bg-gradient-to-r from-red-50 to-orange-50 p-2 rounded-md border border-red-100">
                        <div className="flex justify-between items-center text-xs text-red-700">
                            <span className="font-medium">Sale ends in:</span>
                            <div className="flex items-center gap-1 font-mono bg-red-100 px-2 py-1 rounded">
                                <Clock className="h-3 w-3" />
                                <span>02:45:33</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* CTA Button */}
                <Button
                    className="w-full mt-3 h-10 bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </Button>
            </div>
        </div>
    )
}

// Updated New Arrivals Section using your ProductCard
export default function NewArrivalsSection() {
    // Sample product data matching your ProductCard props
    const newArrivalProducts = [
        {
            id: 1,
            name: 'Minimalist Wireless Headphones with Noise Cancellation',
            brand: "SoundMax",
            image: '/product/main-image-2.jpeg',
            currentPrice: 12999,
            originalPrice: 15999,
            discount: 19,
            rating: 4.8,
            isNew: true,
            fastDelivery: true,
            freeShipping: true,
            warranty: "1 year",
            colors: ["#000000", "#FF0000", "#0000FF"],
            stockPercentage: 75,
            isLiked: false
        },
        {
            id: 2,
            name: 'Premium Leather Watch with Chronograph',
            brand: "TimeCraft",
            image: '/placeholder-watch.jpg',
            currentPrice: 18999,
            originalPrice: 22999,
            discount: 17,
            rating: 4.9,
            isFeatured: true,
            fastDelivery: true,
            returnPolicy: true,
            stockPercentage: 45,
            isLiked: true
        },
        {
            id: 3,
            name: 'Slim Fit Casual Shirt - Cotton Blend',
            brand: "UrbanStyle",
            image: '/placeholder-shirt.jpg',
            currentPrice: 4999,
            originalPrice: 6999,
            discount: 29,
            rating: 4.5,
            isNew: true,
            freeShipping: true,
            colors: ["#FFFFFF", "#0000FF", "#FF0000", "#00FF00"],
            stockPercentage: 30,
            isLiked: false
        },
        {
            id: 4,
            name: 'Designer Sunglasses with UV Protection',
            brand: "SunShades",
            image: '/placeholder-sunglasses.jpg',
            currentPrice: 8999,
            originalPrice: 11999,
            discount: 25,
            rating: 4.7,
            isNew: true,
            fastDelivery: true,
            warranty: "2 years",
            isLiked: false
        },
        {
            id: 5,
            name: 'Running Shoes with Air Cushion Technology',
            brand: "RunFast",
            image: '/placeholder-shoes.jpg',
            currentPrice: 7999,
            originalPrice: 9999,
            discount: 20,
            rating: 4.6,
            isSponsored: true,
            fastDelivery: true,
            freeShipping: true,
            returnPolicy: true,
            saleEnds: "2023-12-31",
            stockPercentage: 20,
            isLiked: false
        },
        {
            id: 6,
            name: 'Classic Backpack with Laptop Compartment',
            brand: "TravelGear",
            image: '/placeholder-backpack.jpg',
            currentPrice: 5999,
            originalPrice: 7999,
            discount: 25,
            rating: 4.8,
            isNew: true,
            freeShipping: true,
            colors: ["#000000", "#808080", "#964B00"],
            stockPercentage: 60,
            isLiked: false
        },
    ];

    const handleLike = (productId, isLiked) => {
        console.log(`Product ${productId} is now ${isLiked ? 'liked' : 'unliked'}`);
    };

    const handleQuickView = (productId) => {
        console.log(`Quick view for product ${productId}`);
    };

    const handleAddToCart = (productId) => {
        console.log(`Product ${productId} added to cart`);
    };

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                        New Arrivals & Hot Deals
                    </h2>
                    <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-lg">
                        Discover our latest products and exclusive offers with premium quality
                    </p>

                    {/* Decorative element */}
                    <div className="w-20 h-1 bg-blue-600 mx-auto mt-6"></div>
                </div>

                {/* Products grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newArrivalProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            isFeatured={product.isFeatured}
                            isSponsored={product.isSponsored}
                            onLike={handleLike}
                            onQuickView={handleQuickView}
                            onAddToCart={handleAddToCart}
                        />
                    ))}
                </div>

                {/* View all button */}
                <div className="mt-16 text-center">
                    <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full px-8">
                        View All Products
                    </Button>
                </div>
            </div>
        </section>
    );
}