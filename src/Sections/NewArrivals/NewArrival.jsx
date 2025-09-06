'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';



// Sample product data
const products = [
    {
        id: 1,
        name: 'Minimalist Wireless Headphones',
        price: 129.99,
        originalPrice: 159.99,
        image: '/product/main-image-2.jpeg',
        isNew: true,
        discount: 19,
    },
    {
        id: 2,
        name: 'Premium Leather Watch',
        price: 189.99,
        image: '/placeholder-watch.jpg',
        isTrending: true,
    },
    {
        id: 3,
        name: 'Slim Fit Casual Shirt',
        price: 49.99,
        originalPrice: 69.99,
        image: '/placeholder-shirt.jpg',
        discount: 29,
    },
    {
        id: 4,
        name: 'Designer Sunglasses',
        price: 89.99,
        image: '/placeholder-sunglasses.jpg',
        isNew: true,
    },
    {
        id: 5,
        name: 'Running Shoes',
        price: 79.99,
        originalPrice: 99.99,
        image: '/placeholder-shoes.jpg',
        discount: 20,
        isTrending: true,
    },
    {
        id: 6,
        name: 'Classic Backpack',
        price: 59.99,
        image: '/placeholder-backpack.jpg',
        isNew: true,
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        },
    },
};

const ProductCard = ({ product }) => {
    return (
        <motion.div
            variants={itemVariants}
            className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
            <div className="relative overflow-hidden">
                {/* Product image with zoom effect */}
                <div className="aspect-square overflow-hidden">
                    <motion.img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                    />
                </div>

                {/* Badges container */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && (
                        <span className="bg-blue-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                            New
                        </span>
                    )}
                    {product.isTrending && (
                        <span className="bg-rose-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                            Trending
                        </span>
                    )}
                </div>

                {/* Discount badge */}
                {product.discount && (
                    <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        -{product.discount}%
                    </span>
                )}
            </div>

            {/* Product details */}
            <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{product.name}</h3>

                <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                    )}
                </div>

                <Button className="w-full group/btn">
                    <ShoppingCart className="h-4 w-4 mr-2 transition-transform group-hover/btn:scale-110" />
                    Add to Cart
                </Button>
            </div>
        </motion.div>
    );
};

export default function NewArrivalsSection() {
    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-12">
                    <motion.h2
                        className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        New Arrivals & Hot Deals
                    </motion.h2>
                    <motion.p
                        className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        Discover our latest products and exclusive offers
                    </motion.p>
                </div>

                {/* Products grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </motion.div>

                {/* View all button */}
                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <Button variant="outline" size="lg">
                        View All Products
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}