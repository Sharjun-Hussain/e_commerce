"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ChevronRight, Star, Zap, Shield, Truck, Clock, Heart, Eye, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { ProductCard } from "@/components/eCommerce/ProductCard"

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
                        className="bg-card rounded-xl border border-border dark:border-gray-800 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group relative"
                        onMouseEnter={() => setHoveredProduct(product.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                    >
                        <ProductCard product={product} />
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