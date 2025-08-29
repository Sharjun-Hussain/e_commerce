"use client"

import { Button } from "@/components/ui/button"
import { Monitor, Laptop, Smartphone, Headphones, Gamepad2, HardDrive } from "lucide-react"
import Image from "next/image"
import { useRef, useEffect, useState } from "react"

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
    const containerRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    // Handle mouse events for drag scrolling
    const handleMouseDown = (e) => {
        setIsDragging(true)
        setStartX(e.pageX - containerRef.current.offsetLeft)
        setScrollLeft(containerRef.current.scrollLeft)
    }

    const handleMouseLeave = () => {
        setIsDragging(false)
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return
        e.preventDefault()
        const x = e.pageX - containerRef.current.offsetLeft
        const walk = (x - startX) * 2
        containerRef.current.scrollLeft = scrollLeft - walk
    }

    // Handle touch events for mobile
    const handleTouchStart = (e) => {
        setIsDragging(true)
        setStartX(e.touches[0].pageX - containerRef.current.offsetLeft)
        setScrollLeft(containerRef.current.scrollLeft)
    }

    const handleTouchMove = (e) => {
        if (!isDragging) return
        const x = e.touches[0].pageX - containerRef.current.offsetLeft
        const walk = (x - startX) * 2
        containerRef.current.scrollLeft = scrollLeft - walk
    }

    // Add keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!containerRef.current) return

            if (e.key === 'ArrowLeft') {
                containerRef.current.scrollBy({ left: -300, behavior: 'smooth' })
            } else if (e.key === 'ArrowRight') {
                containerRef.current.scrollBy({ left: 300, behavior: 'smooth' })
            }
        }

        containerRef.current?.addEventListener('keydown', handleKeyDown)
        return () => containerRef.current?.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <section className="py-8 pl-4" aria-labelledby="categories-heading">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 id="categories-heading" className="text-3xl font-bold mb-4">Shop by Category</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Discover our wide range of electronics and computer products
                    </p>
                </div>

                <div className="relative">
                    {/* Categories Container with hidden scrollbar */}
                    <div
                        ref={containerRef}
                        className="flex gap-6 md:justify-start xl:justify-center  overflow-x-auto pb-4  scrollbar-hide"
                        role="region"
                        aria-label="Product categories"
                        tabIndex={0}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleMouseUp}
                        onTouchMove={handleTouchMove}
                    >
                        {categories.map((category) => {
                            const IconComponent = category.icon
                            return (
                                <div
                                    key={category.title}
                                    className="flex-none w-46 md:w-45 group cursor-pointer  rounded-lg"
                                    tabIndex={0}
                                    role="article"
                                    aria-label={`Category: ${category.title}`}
                                >
                                    <div className="relative mb-4">
                                        <div className={`w-46 h-46 md:w-45 md:h-45 rounded-full overflow-hidden bg-gradient-to-br ${category.color} p-2 transition-all duration-300 group-hover:scale-105 group-focus:scale-105`}>
                                            <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                                                <Image
                                                    width={100}
                                                    height={100}
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
                                        <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-primary group-focus:text-primary transition-colors">
                                            {category.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{category.description}</p>
                                        {/* <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full h-12 group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all duration-300 bg-transparent group-focus:bg-accent group-focus:text-accent-foreground"
                                        >
                                            Browse {category.title}
                                        </Button> */}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>




                {/* Custom CSS to hide scrollbar */}
                <style jsx>{`
                    .scrollbar-hide {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
            </div>
        </section>
    )
}