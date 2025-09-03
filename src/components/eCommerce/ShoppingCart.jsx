import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Plus, Minus, X, Trash2 } from 'lucide-react';




export const ShoppingCartComponent = ({
    items,
    onUpdateQuantity,
    onRemoveItem,
    onClearCart,
    isOpen,
    onToggle,
}) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <>
            {/* Cart Toggle Button */}
            <Button
                variant="outline"
                onClick={onToggle}
                className="relative"
            >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {totalItems > 0 && (
                    <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                    >
                        {totalItems}
                    </Badge>
                )}
            </Button>

            {/* Cart Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/50"
                        onClick={onToggle}
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Card className="h-full flex flex-col">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="text-xl">Shopping Cart</CardTitle>
                                    <div className="flex items-center gap-2">
                                        {items.length > 0 && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={onClearCart}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={onToggle}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>

                                <CardContent className="flex-1 overflow-y-auto">
                                    <AnimatePresence>
                                        {items.length === 0 ? (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex flex-col items-center justify-center h-64 text-center"
                                            >
                                                <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                                                <p className="text-lg font-medium text-muted-foreground">Your cart is empty</p>
                                                <p className="text-sm text-muted-foreground">Add some products to get started</p>
                                            </motion.div>
                                        ) : (
                                            <div className="space-y-4">
                                                {items.map((item) => (
                                                    <motion.div
                                                        key={item.product.id}
                                                        layout
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, x: 100 }}
                                                        className="flex gap-3 p-3 border rounded-lg"
                                                    >
                                                        <img
                                                            src={item.product.image}
                                                            alt={item.product.name}
                                                            className="w-16 h-16 object-cover rounded"
                                                        />
                                                        <div className="flex-1 space-y-1">
                                                            <h4 className="font-medium text-sm line-clamp-1">{item.product.name}</h4>
                                                            <p className="text-xs text-muted-foreground">{item.product.brand}</p>
                                                            <p className="font-semibold text-green-600">${item.product.price}</p>

                                                            <div className="flex items-center gap-2">
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="h-6 w-6 p-0"
                                                                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                                                    disabled={item.quantity <= 1}
                                                                >
                                                                    <Minus className="h-3 w-3" />
                                                                </Button>
                                                                <span className="text-sm font-medium min-w-[2rem] text-center">
                                                                    {item.quantity}
                                                                </span>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="h-6 w-6 p-0"
                                                                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                                                >
                                                                    <Plus className="h-3 w-3" />
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="h-6 w-6 p-0 text-red-600 hover:text-red-700 ml-auto"
                                                                    onClick={() => onRemoveItem(item.product.id)}
                                                                >
                                                                    <X className="h-3 w-3" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </CardContent>

                                {items.length > 0 && (
                                    <div className="p-4 border-t space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Subtotal</span>
                                                <span>${totalPrice.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span>Shipping</span>
                                                <span>Free</span>
                                            </div>
                                            <Separator />
                                            <div className="flex justify-between text-lg font-semibold">
                                                <span>Total</span>
                                                <span className="text-green-600">${totalPrice.toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <Button className="w-full bg-green-600 hover:bg-green-700">
                                            Checkout ({totalItems} items)
                                        </Button>
                                    </div>
                                )}
                            </Card>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};