"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
    {
        id: 1,
        title: "Latest Gaming Laptops",
        subtitle: "Up to 40% Off",
        description: "Experience ultimate gaming performance with RTX 4080 graphics",
        image: "/static/2.jpg",
        cta: "Shop Gaming Laptops",
    },
    {
        id: 2,
        title: "Professional Workstations",
        subtitle: "For Creators & Developers",
        description: "Powerful workstations designed for demanding professional workflows",
        image: "/static/1.jpg",
        cta: "Explore Workstations",
    },
    {
        id: 3,
        title: "Smart Home Electronics",
        subtitle: "Connected Living",
        description: "Transform your home with cutting-edge smart technology",
        image: "/static/3.jpg",
        cta: "Discover Smart Tech",
    },
]

export function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => {
            handleSlideChange((prev) => (prev + 1) % slides.length)
        }, 6000)
        return () => clearInterval(timer)
    }, [])

    const handleSlideChange = (newSlideOrCallback) => {
        if (isTransitioning) return

        setIsTransitioning(true)
        const newSlide = typeof newSlideOrCallback === "function" ? newSlideOrCallback(currentSlide) : newSlideOrCallback
        setCurrentSlide(newSlide)

        setTimeout(() => setIsTransitioning(false), 500)
    }

    const nextSlide = () => {
        handleSlideChange((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        handleSlideChange((prev) => (prev - 1 + slides.length) % slides.length)
    }

    return (
        <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden  bg-muted group">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${index === currentSlide
                        ? "translate-x-0 opacity-100 scale-100"
                        : index < currentSlide
                            ? "-translate-x-full opacity-0 scale-105"
                            : "translate-x-full opacity-0 scale-105"
                        }`}
                >
                    <div className="relative h-full w-full">
                        <img
                            src={slide.image || "/placeholder.svg"}
                            alt={slide.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                        <div className="absolute left-4 md:left-8 lg:left-12 top-1/2 -translate-y-1/2 text-white max-w-xs md:max-w-lg lg:max-w-xl">
                            <p className="text-secondary-foreground font-semibold mb-2 text-sm md:text-base animate-in slide-in-from-left-4 duration-700">
                                {slide.subtitle}
                            </p>
                            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance animate-in slide-in-from-left-6 duration-700 delay-100">
                                {slide.title}
                            </h1>
                            <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-pretty opacity-90 animate-in slide-in-from-left-8 duration-700 delay-200">
                                {slide.description}
                            </p>
                            <Button
                                size="lg"
                                className="bg-primary rounded-full hover:bg-primary/90 text-primary-foreground animate-in slide-in-from-left-10 duration-300 transition-all "
                            >
                                {slide.cta}
                            </Button>
                        </div>
                    </div>
                </div>
            ))}

            {/* <Button
                variant="ghost"
                size="icon"
                className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-gray-800 hover:text-gray-900 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 border border-white/20"
                onClick={prevSlide}
                disabled={isTransitioning}
            >
                <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-gray-800 hover:text-gray-900 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 border border-white/20"
                onClick={nextSlide}
                disabled={isTransitioning}
            >
                <ChevronRight className="h-5 w-5" />
            </Button> */}

            <div className="absolute bottom-6 right-6 flex flex-col space-y-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`relative w-1 h-8 rounded-full transition-all duration-500 ${index === currentSlide ? "bg-accent shadow-lg shadow-accent/50" : "bg-white/40 hover:bg-white/60"
                            }`}
                        onClick={() => handleSlideChange(index)}
                        disabled={isTransitioning}
                    >
                        {index === currentSlide && <div className="absolute inset-0 bg-accent rounded-full animate-pulse" />}
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                            {slides[index].title}
                        </span>
                    </button>
                ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                <div
                    className="h-full bg-accent transition-all duration-300 ease-out"
                    style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                />
            </div>
        </div>
    )
}
