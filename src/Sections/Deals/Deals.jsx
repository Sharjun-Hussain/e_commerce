"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ChevronRight, Star, Zap, Shield, Truck, Clock, Heart, Eye, ShoppingCart } from "lucide-react"
import { useState } from "react"

export function ProductDealsSection({ title, products, viewAllLink = "#" }) {
    const [hoveredProduct, setHoveredProduct] = useState(null)
    const [likedProducts, setLikedProducts] = useState({})
    const formatPrice = (price) => `Rs.${price.toLocaleString()}`

    // Toggle like status for a product
    const toggleLike = (productId, e) => {
        e.stopPropagation()
        setLikedProducts(prev => ({
            ...prev,
            [productId]: !prev[productId]
        }))
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

    return (
        <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                        Grab the best deal on <span className="text-primary">{title}</span>
                    </h2>
                    <p className="text-muted-foreground mt-2">Limited time offers - prices that can't be beaten</p>
                </div>
                <Button variant="" className="mt-4 sm:mt-0 group rounded-full">
                    View All <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8 py-3 bg-muted/40 rounded-lg">
                <div className="flex items-center text-xs text-muted-foreground">
                    <Shield className="h-4 w-4 mr-1 text-green-600" />
                    <span>Authentic Products</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                    <Truck className="h-4 w-4 mr-1 text-blue-600" />
                    <span>Free Delivery</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1 text-orange-600" />
                    <span>Limited Time Deal</span>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group relative"
                        onMouseEnter={() => setHoveredProduct(product.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                    >
                        <div className="relative  px-0 flex-1 overflow-hidden">
                            <div className="relative h-40 md:h-48 w-full">
                                <Image
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    fill
                                    className={`object-cover rounded-md transition-all duration-500 ${hoveredProduct === product.id ? "scale-110" : "scale-100"}`}
                                />
                            </div>

                            {/* Hover Actions - Positioned on the right side */}
                            <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${hoveredProduct === product.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="rounded-full h-9 w-9 p-0 bg-background/90 text-secondary backdrop-blur-sm shadow-md hover:bg-red-100 transition-colors"
                                    onClick={(e) => toggleLike(product.id, e)}
                                >
                                    <Heart
                                        className={`h-4 w-4 transition-all ${likedProducts[product.id] ? "fill-red-500 text-red-500 scale-110" : ""}`}
                                    />
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="rounded-full h-9 w-9 p-0 text-secondary bg-background/90 backdrop-blur-sm shadow-md hover:text-secondary-foreground transition-colors"
                                >
                                    <Eye className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* Discount Badge */}
                            <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground font-semibold text-xs py-1 px-2 shadow-md">
                                {product.discount}% OFF
                            </Badge>

                            {/* Express Delivery Badge */}
                            {product.fastDelivery && (
                                <Badge variant="outline" className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm text-xs shadow-md">
                                    <Zap className="h-3 w-3 mr-1 fill-yellow-500 text-yellow-500" />
                                    Express
                                </Badge>
                            )}
                        </div>

                        <div className="p-4 space-y-2 border-t border-border mt-2">
                            <h3 className="font-medium text-foreground text-sm line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                                {product.name}
                            </h3>

                            {/* Rating */}
                            {product.rating && renderRating(product.rating)}

                            {/* Pricing */}
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-base font-bold text-foreground">{formatPrice(product.currentPrice)}</span>
                                <span className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                            </div>

                            {/* Savings */}
                            <div className="text-xs font-medium text-green-600 flex items-center justify-between">
                                <span>Save {formatPrice(product.savings)}</span>
                                <span className="text-xs text-muted-foreground">
                                    {Math.round((product.currentPrice / product.originalPrice) * 100)}% off
                                </span>
                            </div>

                            {/* Progress Bar for limited stock */}
                            {product.stockPercentage && (
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
                            <Button className="w-full mt-3  h-10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                <ShoppingCart />   Add to Cart
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* View All Button for Mobile */}
            <div className="mt-8 flex justify-center lg:hidden">
                <Button variant="outline" className="w-full max-w-sm">
                    View All Products <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
            </div>
        </section>
    )
}