'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Zap, Clock, Check } from 'lucide-react';

const FlashDealComponent = () => {
    const [timeLeft, setTimeLeft] = useState({
        hours: 2,
        minutes: 30,
        seconds: 0
    });
    const [quantity, setQuantity] = useState(1);
    const [soldCount, setSoldCount] = useState(42);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Sample product data
    const product = {
        id: 1,
        name: 'Premium Wireless Headphones',
        originalPrice: 299.99,
        discountPrice: 199.99,
        discount: 33,
        images: [
            '/api/placeholder/400/400',
            '/api/placeholder/400/401',
            '/api/placeholder/400/402',
            '/api/placeholder/400/403'
        ],
        totalStock: 100,
        description: 'Noise cancelling wireless headphones with premium sound quality and 30-hour battery life.',
        features: ['Active Noise Cancellation', '30-hour battery', 'Bluetooth 5.2', 'Comfortable fit']
    };

    // Calculate percentage sold
    const soldPercentage = (soldCount / product.totalStock) * 100;

    // Countdown timer effect
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                const { hours, minutes, seconds } = prev;

                if (seconds > 0) {
                    return { ...prev, seconds: seconds - 1 };
                } else if (minutes > 0) {
                    return { hours, minutes: minutes - 1, seconds: 59 };
                } else if (hours > 0) {
                    return { hours: hours - 1, minutes: 59, seconds: 59 };
                } else {
                    clearInterval(timer);
                    return { hours: 0, minutes: 0, seconds: 0 };
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Auto-rotate product images
    useEffect(() => {
        const imageTimer = setInterval(() => {
            setCurrentImageIndex(prev => (prev + 1) % product.images.length);
        }, 5000);

        return () => clearInterval(imageTimer);
    }, [product.images.length]);

    const handleAddToCart = () => {
        setIsAddedToCart(true);
        // Simulate API call
        setTimeout(() => setIsAddedToCart(false), 2000);
    };

    const formatTime = (time) => time.toString().padStart(2, '0');

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6">
            <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
                <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row">
                        {/* Product Images Section */}
                        <div className="lg:w-1/2 p-6">
                            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden bg-white shadow-md">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentImageIndex}
                                        src={product.images[currentImageIndex]}
                                        alt={product.name}
                                        className="w-full h-full object-contain"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </AnimatePresence>

                                <Badge className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1">
                                    <Zap className="w-4 h-4 mr-1" />
                                    {product.discount}% OFF
                                </Badge>

                                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                                    {product.images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`w-3 h-3 rounded-full transition-all ${index === currentImageIndex ? 'bg-blue-500 scale-125' : 'bg-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Product Details Section */}
                        <div className="lg:w-1/2 p-6 flex flex-col justify-between">
                            <div>
                                <motion.h1
                                    className="text-3xl font-bold text-gray-900 mb-2"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    {product.name}
                                </motion.h1>

                                <motion.p
                                    className="text-gray-600 mb-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {product.description}
                                </motion.p>

                                <motion.div
                                    className="flex items-center mb-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <span className="text-3xl font-bold text-gray-900">
                                        ${product.discountPrice.toFixed(2)}
                                    </span>
                                    <span className="ml-3 text-lg text-gray-500 line-through">
                                        ${product.originalPrice.toFixed(2)}
                                    </span>
                                </motion.div>

                                {/* Features List */}
                                <motion.div
                                    className="mb-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <h3 className="font-semibold text-gray-900 mb-2">Key Features:</h3>
                                    <ul className="grid grid-cols-2 gap-2">
                                        {product.features.map((feature, index) => (
                                            <li key={index} className="flex items-center text-sm text-gray-700">
                                                <Check className="w-4 h-4 text-green-500 mr-2" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </div>

                            <div>
                                {/* Timer Section */}
                                <motion.div
                                    className="mb-6 p-4 bg-red-50 rounded-lg border border-red-100"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center text-red-700 font-medium">
                                            <Clock className="w-5 h-5 mr-2" />
                                            Deal ends in:
                                        </div>
                                        <Badge variant="outline" className="bg-white text-red-700">
                                            Limited Stock
                                        </Badge>
                                    </div>

                                    <div className="flex gap-2">
                                        {Object.entries(timeLeft).map(([unit, value]) => (
                                            <div key={unit} className="flex-1 text-center bg-white p-2 rounded shadow-sm">
                                                <div className="text-2xl font-bold text-gray-900">
                                                    {formatTime(value)}
                                                </div>
                                                <div className="text-xs text-gray-500 uppercase">
                                                    {unit}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Stock Progress */}
                                <motion.div
                                    className="mb-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <div className="flex justify-between text-sm text-gray-700 mb-1">
                                        <span>Sold: {soldCount}</span>
                                        <span>Available: {product.totalStock - soldCount}</span>
                                    </div>
                                    <Progress value={soldPercentage} className="h-2" />
                                </motion.div>

                                {/* Add to Cart Section */}
                                <motion.div
                                    className="flex flex-col sm:flex-row gap-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <div className="flex items-center border rounded-lg overflow-hidden bg-white">
                                        <Button
                                            variant="ghost"
                                            className="h-12 w-12 text-xl"
                                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        >
                                            -
                                        </Button>
                                        <span className="w-12 text-center font-medium">{quantity}</span>
                                        <Button
                                            variant="ghost"
                                            className="h-12 w-12 text-xl"
                                            onClick={() => setQuantity(q => q + 1)}
                                            disabled={quantity >= (product.totalStock - soldCount)}
                                        >
                                            +
                                        </Button>
                                    </div>

                                    <Button
                                        className="flex-1 h-12 text-base font-medium"
                                        size="lg"
                                        onClick={handleAddToCart}
                                        disabled={isAddedToCart}
                                    >
                                        {isAddedToCart ? (
                                            <>
                                                <Check className="w-5 h-5 mr-2" />
                                                Added to Cart
                                            </>
                                        ) : (
                                            <>
                                                <ShoppingCart className="w-5 h-5 mr-2" />
                                                Add to Cart - ${(product.discountPrice * quantity).toFixed(2)}
                                            </>
                                        )}
                                    </Button>
                                </motion.div>

                                {/* Trust Indicators */}
                                <motion.div
                                    className="mt-6 grid grid-cols-3 gap-4 text-center text-xs text-gray-500"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.9 }}
                                >
                                    <div>
                                        <div className="font-medium">Free Shipping</div>
                                        <div>On orders over $50</div>
                                    </div>
                                    <div>
                                        <div className="font-medium">30-Day Returns</div>
                                        <div>No questions asked</div>
                                    </div>
                                    <div>
                                        <div className="font-medium">Secure Payment</div>
                                        <div>256-bit encryption</div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default FlashDealComponent;