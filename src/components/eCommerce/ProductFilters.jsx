import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CATEGORIES } from '@/app/Data';



const FilterSection = ({
    filters,
    onFiltersChange,
    activeFilterCount
}) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    const handleClearFilters = () => {
        onFiltersChange({
            search: '',
            categories: [],
            priceRange: { min: 0, max: 200 },
            minRating: 0,
            inStockOnly: false,
            showSaleItems: false
        });
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    <h3 className="font-semibold">Filters</h3>
                </div>
                {activeFilterCount > 0 && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-2"
                    >
                        <Badge variant="secondary" className="text-xs">
                            {activeFilterCount} active
                        </Badge>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClearFilters}
                            className="text-xs p-1 h-6"
                        >
                            Clear
                        </Button>
                    </motion.div>
                )}
            </motion.div>

            {/* Search */}
            <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="search">Search Products</Label>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        id="search"
                        placeholder="Search by name..."
                        value={filters.search}
                        onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
                        className="pl-9"
                    />
                </div>
            </motion.div>

            <Separator />

            {/* Categories */}
            <motion.div variants={itemVariants} className="space-y-3">
                <Label>Categories</Label>
                <div className="space-y-2">
                    {CATEGORIES.map((category) => (
                        <motion.div
                            key={category}
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.1 }}
                            className="flex items-center space-x-2"
                        >
                            <Checkbox
                                id={category}
                                checked={filters.categories.includes(category)}
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        onFiltersChange({
                                            ...filters,
                                            categories: [...filters.categories, category]
                                        });
                                    } else {
                                        onFiltersChange({
                                            ...filters,
                                            categories: filters.categories.filter(c => c !== category)
                                        });
                                    }
                                }}
                            />
                            <Label
                                htmlFor={category}
                                className="text-sm cursor-pointer hover:text-primary transition-colors"
                            >
                                {category}
                            </Label>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <Separator />

            {/* Price Range */}
            <motion.div variants={itemVariants} className="space-y-3">
                <Label>Price Range</Label>
                <div className="px-2">
                    <Slider
                        value={[filters.priceRange.min, filters.priceRange.max]}
                        onValueChange={([min, max]) =>
                            onFiltersChange({ ...filters, priceRange: { min, max } })
                        }
                        max={200}
                        min={0}
                        step={5}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>${filters.priceRange.min}</span>
                        <span>${filters.priceRange.max}+</span>
                    </div>
                </div>
            </motion.div>

            <Separator />

            {/* Rating */}
            <motion.div variants={itemVariants} className="space-y-3">
                <Label>Minimum Rating</Label>
                <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                        <motion.div
                            key={rating}
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.1 }}
                            className="flex items-center space-x-2 cursor-pointer"
                            onClick={() => onFiltersChange({ ...filters, minRating: rating })}
                        >
                            <div className="flex items-center space-x-1">
                                <input
                                    type="radio"
                                    name="rating"
                                    checked={filters.minRating === rating}
                                    onChange={() => onFiltersChange({ ...filters, minRating: rating })}
                                    className="w-3 h-3"
                                />
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-3 h-3 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-muted-foreground">& up</span>
                            </div>
                        </motion.div>
                    ))}
                    <motion.div
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.1 }}
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => onFiltersChange({ ...filters, minRating: 0 })}
                    >
                        <input
                            type="radio"
                            name="rating"
                            checked={filters.minRating === 0}
                            onChange={() => onFiltersChange({ ...filters, minRating: 0 })}
                            className="w-3 h-3"
                        />
                        <span className="text-sm text-muted-foreground">All Ratings</span>
                    </motion.div>
                </div>
            </motion.div>

            <Separator />

            {/* Additional Options */}
            <motion.div variants={itemVariants} className="space-y-3">
                <Label>Options</Label>
                <div className="space-y-2">
                    <motion.div
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.1 }}
                        className="flex items-center space-x-2"
                    >
                        <Checkbox
                            id="inStock"
                            checked={filters.inStockOnly}
                            onCheckedChange={(checked) =>
                                onFiltersChange({ ...filters, inStockOnly: !!checked })
                            }
                        />
                        <Label htmlFor="inStock" className="cursor-pointer">In Stock Only</Label>
                    </motion.div>
                    <motion.div
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.1 }}
                        className="flex items-center space-x-2"
                    >
                        <Checkbox
                            id="saleItems"
                            checked={filters.showSaleItems}
                            onCheckedChange={(checked) =>
                                onFiltersChange({ ...filters, showSaleItems: !!checked })
                            }
                        />
                        <Label htmlFor="saleItems" className="cursor-pointer">Sale Items Only</Label>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export const ProductFilters = ({ filters, onFiltersChange, isMobile = false }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Count active filters
    const activeFilterCount =
        (filters.search ? 1 : 0) +
        filters.categories.length +
        (filters.priceRange.min > 0 || filters.priceRange.max < 200 ? 1 : 0) +
        (filters.minRating > 0 ? 1 : 0) +
        (filters.inStockOnly ? 1 : 0) +
        (filters.showSaleItems ? 1 : 0);

    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        Filters
                        {activeFilterCount > 0 && (
                            <Badge variant="secondary" className="ml-1">
                                {activeFilterCount}
                            </Badge>
                        )}
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Filter Products</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                        <FilterSection
                            filters={filters}
                            onFiltersChange={onFiltersChange}
                            activeFilterCount={activeFilterCount}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <div className="w-64 bg-card bg-blend-screen rounded-lg border border-border dark:border-gray-800 p-6 h-fit sticky top-4">
            <FilterSection
                filters={filters}
                onFiltersChange={onFiltersChange}
                activeFilterCount={activeFilterCount}
            />
        </div>
    );
};