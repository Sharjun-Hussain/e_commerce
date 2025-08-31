"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Trash2, ArrowLeft, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useStore } from "@/States/Store"

export default function WishlistPage() {
    const { state, dispatch } = useStore()
    const { wishlist } = state

    const removeFromWishlist = (productId) => {
        dispatch({ type: "REMOVE_FROM_WISHLIST", productId })
    }

    const moveToCart = (productId) => {
        dispatch({ type: "MOVE_TO_CART", productId })
    }

    if (wishlist.length === 0) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center max-w-md mx-auto">
                        <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                            <Heart className="w-12 h-12 text-muted-foreground" />
                        </div>
                        <h1 className="text-2xl font-bold mb-4">Your wishlist is empty</h1>
                        <p className="text-muted-foreground mb-8">
                            Save items you love by clicking the heart icon. They'll appear here for easy access later!
                        </p>
                        <Link href="/">
                            <Button size="lg" className="bg-primary hover:bg-primary/90">
                                Start Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Continue Shopping
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">My Wishlist</h1>
                        <p className="text-muted-foreground">{wishlist.length} items saved</p>
                    </div>
                </div>

                {/* Wishlist Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {wishlist.map((item) => (
                        <Card key={item.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-0">
                                {/* Product Image */}
                                <div className="relative aspect-square bg-muted overflow-hidden">
                                    <Image
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />

                                    {/* Discount Badge */}
                                    {item.originalPrice && (
                                        <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
                                            {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                                        </Badge>
                                    )}

                                    {/* Remove from Wishlist */}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeFromWishlist(item.id)}
                                        className="absolute top-3 right-3 w-8 h-8 p-0 bg-background/80 hover:bg-background text-destructive hover:text-destructive"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>

                                    {/* Quick Actions Overlay */}
                                    <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Button
                                            onClick={() => moveToCart(item.id)}
                                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                                            size="sm"
                                        >
                                            <ShoppingCart className="w-4 h-4 mr-2" />
                                            Move to Cart
                                        </Button>
                                    </div>
                                </div>

                                {/* Product Details */}
                                <div className="p-4 space-y-3">
                                    <div>
                                        <h3 className="font-semibold text-sm leading-tight line-clamp-2 mb-1">{item.name}</h3>
                                        {item.brand && <p className="text-xs text-muted-foreground">{item.brand}</p>}
                                    </div>

                                    {/* Rating */}
                                    {item.rating && (
                                        <div className="flex items-center gap-1">
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-3 h-3 ${i < Math.floor(item.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-xs text-muted-foreground">({item.reviews || 0})</span>
                                        </div>
                                    )}

                                    {/* Pricing */}
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-bold">₹{item.price.toLocaleString()}</span>
                                            {item.originalPrice && (
                                                <span className="text-sm text-muted-foreground line-through">
                                                    ₹{item.originalPrice.toLocaleString()}
                                                </span>
                                            )}
                                        </div>
                                        {item.originalPrice && (
                                            <div className="text-xs text-green-600 font-medium">
                                                Save ₹{(item.originalPrice - item.price).toLocaleString()}
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 pt-2">
                                        <Button
                                            onClick={() => moveToCart(item.id)}
                                            className="flex-1 bg-primary hover:bg-primary/90"
                                            size="sm"
                                        >
                                            <ShoppingCart className="w-4 h-4 mr-2" />
                                            Add to Cart
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeFromWishlist(item.id)}
                                            className="px-3 text-destructive hover:text-destructive border-destructive/20 hover:border-destructive/40"
                                        >
                                            <Heart className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Continue Shopping */}
                <div className="text-center mt-12">
                    <Link href="/">
                        <Button variant="outline" size="lg">
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
