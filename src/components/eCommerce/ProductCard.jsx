"use client"

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
    Award,
    Crown,
    Sparkles
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
            className={`bg-card rounded-xl border border-border dark:border-0  overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group relative ${getCardSize()} ${className} ${isOutOfStock ? "opacity-70" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Sponsored Banner - Top of card */}
            {isSponsored && (
                <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold py-1.5 px-3 text-center relative">
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
                        className={`object-cover rounded-md transition-all duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
                    />

                    {/* Out of Stock Overlay */}
                    {isOutOfStock && (
                        <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                            <div className="bg-background/90 py-2 px-4 rounded-md text-destructive font-bold">
                                Out of Stock
                            </div>
                        </div>
                    )}
                </div>

                {/* Hover Actions */}
                <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-full h-9 w-9 p-0 bg-background/90 text-secondary backdrop-blur-sm shadow-md hover:bg-red-100 transition-colors"
                        onClick={handleLikeClick}
                    >
                        <Heart
                            className={`h-4 w-4 transition-all ${isLiked ? "fill-red-500 text-red-500 scale-110" : ""}`}
                        />
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-full h-9 w-9 p-0 text-secondary bg-background/90 backdrop-blur-sm shadow-md hover:text-secondary-foreground transition-colors"
                        onClick={handleQuickView}
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                </div>

                {/* Badges - Top Left */}
                <div className="absolute top-3 left-3 flex flex-col items-start gap-2">
                    {/* Discount Badge */}
                    {product.discount > 0 && (
                        <Badge className="bg-secondary text-secondary-foreground font-semibold text-xs py-1 px-2 shadow-md">
                            {product.discount}% OFF
                        </Badge>
                    )}

                    {/* Featured Badge - Red label design */}
                    {isFeatured && (
                        <div className="relative">
                            <div className="bg-red-600 text-white font-bold text-xs py-1 px-3 shadow-md flex items-center rounded-md relative overflow-hidden">
                                {/* Decorative elements for the red label */}
                                <div className="absolute -left-2 top-0 w-6 h-full bg-white/20 skew-x-12"></div>
                                <div className="absolute -left-1 top-0 w-3 h-full bg-white/10 skew-x-12"></div>

                                <Crown className="h-3 w-3 mr-1 fill-yellow-300 text-yellow-300" />
                                Featured
                            </div>
                            {/* Triangular notch for design effect */}
                            <div className="absolute -bottom-1.5 left-3 w-3 h-3 bg-red-800 rotate-45 transform origin-center"></div>
                        </div>
                    )}
                </div>

                {/* Express Delivery Badge */}
                {product.fastDelivery && (
                    <Badge variant="outline" className="absolute top-12 left-3 bg-background/90 backdrop-blur-sm text-xs shadow-md">
                        <Zap className="h-3 w-3 mr-1 fill-yellow-500 text-yellow-500" />
                        Express
                    </Badge>
                )}

                {/* Location Badge for certain placements */}
                {(place === "productListing" || place === "featured") && product.location && (
                    <Badge variant="outline" className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm text-xs shadow-md">
                        <MapPin className="h-3 w-3 mr-1" />
                        {product.location}
                    </Badge>
                )}
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-2 border-t border-border mt-2">
                <h3 className="font-medium text-foreground text-sm line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                    {product.name}
                </h3>

                {/* Rating */}
                {product.rating && renderRating(product.rating)}

                {/* Pricing */}
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-base font-bold text-foreground">{formatPrice(product.currentPrice)}</span>
                    {product.originalPrice > product.currentPrice && (
                        <span className="text-xs text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                        </span>
                    )}
                </div>

                {/* Savings */}
                {product.savings > 0 && (
                    <div className="text-xs font-medium text-green-600 flex items-center justify-between">
                        <span>Save {formatPrice(product.savings)}</span>
                        {product.originalPrice > 0 && (
                            <span className="text-xs text-muted-foreground">
                                {Math.round((product.currentPrice / product.originalPrice) * 100)}% off
                            </span>
                        )}
                    </div>
                )}

                {/* Progress Bar for limited stock */}
                {product.stockPercentage && !isOutOfStock && (
                    <div className="mt-2">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Sold: {product.stockPercentage}%</span>
                            <span>Limited stock</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                            <div
                                className="bg-accent h-1.5 rounded-full transition-all duration-500"
                                style={{ width: `${product.stockPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* CTA Button */}
                <Button variant="default"
                    className="w-full mt-3 h-10  group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
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