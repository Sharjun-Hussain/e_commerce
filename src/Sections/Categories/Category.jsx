"use client"

import { Button } from "@/components/ui/button"
import { Monitor, Laptop, Smartphone, Headphones, Gamepad2, HardDrive, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useRef, useEffect } from "react"

const categories = [
    {
        icon: Laptop,
        title: "Laptops",
        description: "Gaming & Professional",
        image: "/static/cat4.jpg",
        color: "from-blue-500/20 to-blue-700/10"
    },
    {
        icon: Monitor,
        title: "Monitors",
        description: "4K & Gaming Displays",
        image: "/static/cat8.jpg",
        color: "from-green-500/20 to-green-700/10"
    },
    {
        icon: Smartphone,
        title: "Smartphones",
        description: "Latest Models",
        image: "/static/cat3.jpg",
        color: "from-purple-500/20 to-purple-700/10"
    },
    {
        icon: Headphones,
        title: "Audio",
        description: "Headphones & Speakers",
        image: "/static/cat5.jpg",
        color: "from-red-500/20 to-red-700/10"
    },
    {
        icon: Gamepad2,
        title: "Gaming",
        description: "Consoles & Accessories",
        image: "/static/cat6.jpg",
        color: "from-amber-500/20 to-amber-700/10"
    },
    {
        icon: HardDrive,
        title: "Components",
        description: "PC Parts & Upgrades",
        image: "/static/cat7.jpg",
        color: "from-cyan-500/20 to-cyan-700/10"
    },
]

export function ProductCategories() {
    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(true)
    const scrollContainer = useRef(null)

    // Check scroll position to show/hide navigation arrows
    const checkScrollPosition = () => {
        if (scrollContainer.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current
            setShowLeftArrow(scrollLeft > 0)
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
        }
    }

    // Scroll functions with smooth behavior
    const scrollLeft = () => {
        if (scrollContainer.current) {
            scrollContainer.current.scrollBy({ left: -300, behavior: 'smooth' })
        }
    }

    const scrollRight = () => {
        if (scrollContainer.current) {
            scrollContainer.current.scrollBy({ left: 300, behavior: 'smooth' })
        }
    }

    // Add event listeners and check initial position
    useEffect(() => {
        const container = scrollContainer.current
        if (container) {
            container.addEventListener('scroll', checkScrollPosition)
            checkScrollPosition() // Initial check

            // Cleanup
            return () => container.removeEventListener('scroll', checkScrollPosition)
        }
    }, [])

    // Add keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                scrollLeft()
            } else if (e.key === 'ArrowRight') {
                scrollRight()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <section className="py-16 px-4 md:px-6" aria-labelledby="categories-heading">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 id="categories-heading" className="text-3xl font-bold mb-4">Shop by Category</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Discover our wide range of electronics and computer products
                    </p>
                </div>

                <div className="relative">
                    {/* Navigation Arrows */}
                    {showLeftArrow && (
                        <button
                            onClick={scrollLeft}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-lg border hover:bg-accent transition-colors hidden md:block"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                    )}

                    {showRightArrow && (
                        <button
                            onClick={scrollRight}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-lg border hover:bg-accent transition-colors hidden md:block"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    )}

                    {/* Scroll Indicators for Mobile */}
                    <div className="flex justify-center mb-4 md:hidden">
                        <div className="flex space-x-1">
                            {categories.map((_, index) => (
                                <div
                                    key={index}
                                    className="w-2 h-2 rounded-full bg-muted"
                                    aria-hidden="true"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Categories Container */}
                    <div
                        ref={scrollContainer}
                        className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent snap-x snap-mandatory"
                        role="region"
                        aria-label="Product categories"
                        tabIndex={0}
                    >
                        {categories.map((category) => {
                            const IconComponent = category.icon
                            return (
                                <div
                                    key={category.title}
                                    className="flex-none w-64 md:w-72 group cursor-pointer snap-start focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
                                    tabIndex={0}
                                    role="article"
                                    aria-label={`Category: ${category.title}`}
                                >
                                    <div className="relative mb-4">
                                        <div className={`w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden bg-gradient-to-br ${category.color} p-2 transition-all duration-300 group-hover:scale-105 group-focus:scale-105`}>
                                            <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                                                <img
                                                    src={category.image || "/placeholder.svg"}
                                                    alt={category.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>
                                        {/* Icon overlay */}
                                        <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                            <IconComponent className="h-6 w-6 text-primary" aria-hidden="true" />
                                        </div>
                                    </div>

                                    {/* Text below image */}
                                    <div className="text-center px-2">
                                        <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-accent group-focus:text-accent transition-colors">
                                            {category.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{category.description}</p>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full h-12 group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all duration-300 bg-transparent group-focus:bg-accent group-focus:text-accent-foreground"
                                        >
                                            Browse {category.title}
                                        </Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* View All Categories Button */}
                <div className="text-center mt-12">
                    <Button size="lg" className="px-8">
                        View All Categories
                    </Button>
                </div>
            </div>
        </section>
    )
}