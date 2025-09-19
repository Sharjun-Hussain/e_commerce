"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Heart, Shield, Truck, RotateCcw } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { useStore } from "@/States/Store"
import { Header } from "@/Sections/Header/Header"

export default function CartPage() {
    const { state, dispatch } = useStore()
    const { cart } = state

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = subtotal > 500 ? 0 : 50
    const tax = subtotal * 0.1
    const total = subtotal + shipping + tax

    const updateQuantity = (productId, quantity) => {
        dispatch({ type: "UPDATE_QUANTITY", productId, quantity })
    }

    const removeFromCart = (productId) => {
        dispatch({ type: "REMOVE_FROM_CART", productId })
    }

    const addToWishlist = (product) => {
        dispatch({ type: "ADD_TO_WISHLIST", product })
        dispatch({ type: "REMOVE_FROM_CART", productId: product.id })
    }

    if (cart.length === 0) {
        return (
            <div>
                <Header />
                <div className="min-h-screen bg-background ">

                    <div className="container mx-auto px-4 py-16">
                        <div className="text-center max-w-md mx-auto">
                            <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                                <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                            </div>
                            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                            <p className="text-muted-foreground mb-8">
                                Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
                            </p>
                            <Link href="/">
                                <Button size="lg" className="bg-primary hover:bg-primary/90">
                                    Continue Shopping
                                </Button>
                            </Link>
                        </div>
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
                        <h1 className="text-3xl font-bold">Shopping Cart</h1>
                        <p className="text-muted-foreground">{cart.length} items in your cart</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <Card key={item.id} className="overflow-hidden">
                                <CardContent className="p-6">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        {/* Product Image */}
                                        <div className="relative w-full sm:w-32 h-32 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                                            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 space-y-3">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                                <div>
                                                    <h3 className="font-semibold text-lg leading-tight">{item.name}</h3>
                                                    {item.brand && <p className="text-sm text-muted-foreground">{item.brand}</p>}
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xl font-bold">₹{item.price.toLocaleString()}</div>
                                                    {item.originalPrice && (
                                                        <div className="text-sm text-muted-foreground line-through">
                                                            ₹{item.originalPrice.toLocaleString()}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Quantity and Actions */}
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center border rounded-lg">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="h-10 w-10 p-0"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </Button>
                                                        <Input
                                                            type="number"
                                                            value={item.quantity}
                                                            onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                                                            className="w-16 h-10 text-center border-0 focus-visible:ring-0"
                                                            min="1"
                                                        />
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="h-10 w-10 p-0"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        ₹{(item.price * item.quantity).toLocaleString()} total
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => addToWishlist(item)}
                                                        className="text-muted-foreground hover:text-foreground"
                                                    >
                                                        <Heart className="w-4 h-4 mr-2" />
                                                        Save for later
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-destructive hover:text-destructive"
                                                    >
                                                        <Trash2 className="w-4 h-4 mr-2" />
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-6">
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span>Subtotal ({cart.length} items)</span>
                                        <span>₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span className={shipping === 0 ? "text-green-600" : ""}>
                                            {shipping === 0 ? "FREE" : `₹${shipping}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tax</span>
                                        <span>₹{tax.toFixed(0)}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between text-lg font-semibold">
                                        <span>Total</span>
                                        <span>₹{total.toLocaleString()}</span>
                                    </div>
                                </div>

                                {shipping > 0 && (
                                    <div className="mt-4 p-3 bg-muted rounded-lg">
                                        <p className="text-sm text-muted-foreground">
                                            Add ₹{(500 - subtotal).toLocaleString()} more to get FREE shipping!
                                        </p>
                                    </div>
                                )}

                                <Button className="w-full mt-6 bg-primary hover:bg-primary/90" size="lg">
                                    Proceed to Checkout
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Trust Badges */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-4">Why shop with us?</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Shield className="w-5 h-5 text-green-600" />
                                        <span className="text-sm">Secure payments</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Truck className="w-5 h-5 text-blue-600" />
                                        <span className="text-sm">Fast delivery</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RotateCcw className="w-5 h-5 text-orange-600" />
                                        <span className="text-sm">Easy returns</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
