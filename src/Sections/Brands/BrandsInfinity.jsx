// components/brand-showcase-enhanced.jsx
'use client';

import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const BrandShowcaseEnhanced = () => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Wait for component to mount to avoid hydration mismatch with theme
    useEffect(() => {
        setMounted(true);
    }, []);

    // Sample brand logos with different assets for light/dark mode
    const brands = [
        {
            id: 1,
            name: 'HP',
            lightLogo: '/brands/hp.png',
            darkLogo: '/brands/hp.png',
        },
        {
            id: 2,
            name: 'Hisense',
            lightLogo: '/brands/hisense.png',
            darkLogo: '/brands/hisense.png',
        },
        {
            id: 3,
            name: 'Samsung',
            lightLogo: '/brands/samsung.png',
            darkLogo: '/brands/samsung.png',
        },
        {
            id: 4,
            name: 'Sony',
            lightLogo: '/brands/sony.png',
            darkLogo: '/brands/sony.png',
        },
        {
            id: 5,
            name: 'Lenovo',
            lightLogo: '/brands/lenovo.png',
            darkLogo: '/brands/lenovo.png',
        },
        {
            id: 6,
            name: 'Dell',
            lightLogo: '/brands/dell.png',
            darkLogo: '/brands/dell.png',
        },
        // Add more brands as needed
    ];

    // Duplicate the brands for seamless looping
    const duplicatedBrands = [...brands, ...brands];

    // Calculate total width for animation
    const brandWidth = 160; // w-40 = 160px
    const gap = 32; // mx-8 = 32px
    const totalWidth = (brandWidth + gap) * brands.length;

    return (
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800  relative">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
                        Trusted by Leading Brands
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        We partner with the world's most innovative companies to deliver exceptional ecommerce experiences.
                    </p>
                </div>

                <div className="relative overflow-hidden">
                    {/* Left fade gradient */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />

                    {/* Right fade gradient */}
                    <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />

                    <motion.div
                        className="flex"
                        animate={{
                            x: [0, -totalWidth],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 30,
                                ease: "linear",
                            },
                        }}
                    >
                        {duplicatedBrands.map((brand, index) => (
                            <div
                                key={`${brand.id}-${index}`}
                                className="flex-shrink-0 mx-4 md:mx-8 w-28 h-16 md:w-40 md:h-20 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center relative"
                            >
                                {mounted ? (
                                    <Image
                                        src={theme === 'dark' ? brand.darkLogo : brand.lightLogo}
                                        alt={brand.name}
                                        fill
                                        className="object-contain"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-muted animate-pulse rounded-lg" />
                                )}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default BrandShowcaseEnhanced;