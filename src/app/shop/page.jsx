"use client"
import { useState, useEffect, useMemo, Fragment } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDown, Grid3X3, List, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import { getProducts } from '../Data';

import { ProductFilters } from '@/components/eCommerce/ProductFilters';
import { Header } from '@/Sections/Header/Header';
import { ProductCard } from '@/components/eCommerce/ProductCard';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('name');
    const [viewMode, setViewMode] = useState('grid');
    const isMobile = useIsMobile();

    const [filters, setFilters] = useState({
        search: '',
        categories: [],
        priceRange: { min: 0, max: 200 },
        minRating: 0,
        inStockOnly: false,
        showSaleItems: false
    });

    // Load products
    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error('Failed to load products:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    // Filter and sort products
    const filteredAndSortedProducts = useMemo(() => {
        let filtered = products.filter(product => {
            // Search filter
            if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) {
                return false;
            }

            // Category filter
            if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
                return false;
            }

            // Price range filter
            const price = product.salePrice || product.price;
            if (price < filters.priceRange.min || (filters.priceRange.max < 200 && price > filters.priceRange.max)) {
                return false;
            }

            // Rating filter
            if (product.rating < filters.minRating) {
                return false;
            }

            // Stock filter
            if (filters.inStockOnly && !product.isInStock) {
                return false;
            }

            // Sale items filter
            if (filters.showSaleItems && !product.salePrice) {
                return false;
            }

            return true;
        });

        // Sort products
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return (a.salePrice || a.price) - (b.salePrice || b.price);
                case 'price-high':
                    return (b.salePrice || b.price) - (a.salePrice || a.price);
                case 'rating':
                    return b.rating - a.rating;
                case 'newest':
                    return a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1;
                case 'name':
                default:
                    return a.name.localeCompare(b.name);
            }
        });

        return filtered;
    }, [products, filters, sortBy]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <p className="text-muted-foreground">Loading products...</p>
                </div>
            </div>
        );
    }

    return (

        <Fragment>
            <Header />
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="min-h-screen bg-background"
            >

                <div className="container mx-auto px-4 py-8 max-w-7xl">


                    {/* Main Content */}
                    <div className="flex gap-8">
                        {/* Desktop Filters Sidebar */}
                        {!isMobile && (
                            <motion.aside
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <ProductFilters filters={filters} onFiltersChange={setFilters} />
                            </motion.aside>
                        )}


                        {/* Products Grid */}
                        <motion.main
                            className="flex-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            {filteredAndSortedProducts.length === 0 ? (
                                <motion.div
                                    className="text-center py-12"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">No products found</h3>
                                    <p className="text-muted-foreground">
                                        Try adjusting your filters or search criteria
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    className={`grid gap-6 ${viewMode === 'grid'
                                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                                        : 'grid-cols-1'
                                        }`}
                                    variants={containerVariants}
                                >
                                    {filteredAndSortedProducts.map((product, index) => (
                                        <ProductCard key={product.id} product={product} index={index} />
                                    ))}
                                </motion.div>
                            )}
                        </motion.main>
                    </div>
                </div>
            </motion.div>
        </Fragment>

    );
};

export default Products;