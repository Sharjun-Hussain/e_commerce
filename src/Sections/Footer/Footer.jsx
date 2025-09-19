"use client"
import React, { useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image'; // Import Next.js Image component

// Register the ScrollTrigger plugin once in a module-level scope
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// --- Data for the Footer ---
const footerSections = [
    {
        title: 'Shop',
        links: ['New Arrivals', 'Best Sellers', 'Deals & Discounts', 'PC Components', 'Gaming Gear', 'Accessories', 'Software', 'Brands']
    },
    {
        title: 'Support',
        links: ['Contact Us', 'Help Center', 'Returns & Exchanges', 'Shipping Info', 'Track Order', 'Warranty', 'FAQ', 'Service Centers']
    },
    {
        title: 'Company',
        links: ['About Us', 'Careers', 'Investor Relations', 'Sustainability', 'Press', 'Blog', 'Affiliate Program', 'Contact']
    }
];

const socialLinks = [
    { name: 'twitter', color: 'hover:text-blue-400', logo: '/static/twitter.png' },
    { name: 'facebook', color: 'hover:text-blue-600', logo: '/static/facebook.png' },
    { name: 'instagram', color: 'hover:text-pink-500', logo: '/static/instagram.png' },
    { name: 'youtube', color: 'hover:text-red-500', logo: '/static/youtube.png' },
    // { name: 'linkedin', color: 'hover:text-blue-500', logo: 'L' }
];

const trustBadges = ['Secure Payment', 'Free Returns', '2-Year Warranty', '24/7 Support'];
const legalLinks = ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility', 'Sitemap'];

// Payment method logos - YOU NEED TO REPLACE THESE WITH YOUR ACTUAL IMAGE PATHS!
const paymentMethodLogos = {
    Visa: '/static/visa.png', // Replace with your Visa logo path
    Mastercard: '/static/mastercard.png', // Replace with your Mastercard logo path
    PayPal: '/static/paypal.png', // Replace with your PayPal logo path
    // Replace with your GooglePay logo path
    // Add more payment methods as needed
};

// --- The Footer Component ---
const Footer = () => {
    const { theme } = useTheme();
    const footerRef = useRef(null);
    const sectionsRef = useRef([]);

    useEffect(() => {
        // Ensure this code runs only on the client
        if (typeof window === 'undefined') return;

        // Use GSAP Context for safe cleanup
        const ctx = gsap.context(() => {
            // Animate individual elements with a shared ScrollTrigger config
            const animateIn = (elem, vars) => {
                gsap.fromTo(elem,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: elem,
                            start: "top 90%",
                            toggleActions: "play none none none"
                        },
                        ...vars
                    }
                );
            };

            // Animate the main footer sections with a stagger effect
            gsap.fromTo(sectionsRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );

            // Animate logo, newsletter, and copyright sections individually
            animateIn(".logo-animate");
            animateIn(".newsletter-animate");

            // *** UPDATED: Copyright animation changed to a fade-in ***
            gsap.fromTo(".copyright-animate",
                {
                    opacity: 0,
                    y: 20
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".copyright-animate",
                        start: "top 95%", // Adjusted start for better timing
                        toggleActions: "play none none none"
                    }
                }
            );

            // Hover animations for list items and social icons
            const listItems = footerRef.current.querySelectorAll('.footer-link');
            listItems.forEach(item => {
                item.addEventListener('mouseenter', () => gsap.to(item, { x: 8, duration: 0.3, ease: "power2.out" }));
                item.addEventListener('mouseleave', () => gsap.to(item, { x: 0, duration: 0.3, ease: "power2.out" }));
            });

            const socialIcons = footerRef.current.querySelectorAll('.social-icon');
            socialIcons.forEach(icon => {
                icon.addEventListener('mouseenter', () => gsap.to(icon, { scale: 1.15, duration: 0.3, ease: "power2.out" }));
                icon.addEventListener('mouseleave', () => gsap.to(icon, { scale: 1, duration: 0.3, ease: "power2.out" }));
            });

        }, footerRef); // Scope the context to the footer element

        // Cleanup function to revert all GSAP animations and listeners
        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="w-full bg-background dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300 relative overflow-hidden border-t border-gray-200 dark:border-gray-800">
            {/* Decorative background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute -bottom-32 -right-32 w-64 h-64 rounded-full ${theme === 'dark' ? 'bg-blue-900/10' : 'bg-blue-200/20'}`}></div>
                <div className={`absolute -top-32 -left-32 w-64 h-64 rounded-full ${theme === 'dark' ? 'bg-purple-900/10' : 'bg-purple-200/20'}`}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-2" ref={(el) => sectionsRef.current[0] = el}>
                        <div className="logo-animate mb-6">
                            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Mega Mart
                            </h3>
                            <p className="text-sm text-blue-600 font-medium mt-1">Premium Electronics & Tech</p>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed max-w-md">
                            Providing cutting-edge technology solutions with over a decade of excellence. We offer the latest electronics with fast shipping and exceptional customer service.
                        </p>
                        {/* <div className="flex space-x-3">
                            {socialLinks.map((social) => (

                                <Image className='w-6 ' alt={`${social.name} logo`} src={social.logo} width={100} height={100} />

                            ))}
                        </div> */}
                    </div>

                    {/* Dynamic Sections: Shop, Support, Company */}
                    {footerSections.map((section, index) => (
                        <div key={section.title} ref={(el) => sectionsRef.current[index + 1] = el}>
                            <h4 className="font-semibold text-lg mb-5 relative inline-block pb-2">
                                {section.title}
                                <span className="absolute bottom-0 left-0 w-10 h-1 bg-blue-600 rounded-full"></span>
                            </h4>
                            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                                {section.links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="footer-link hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 flex items-center">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-3"></span>
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center gap-6 mb-12 opacity-80">
                    {trustBadges.map((badge) => (
                        <div key={badge} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2 text-blue-600 dark:text-blue-400">
                                ✓
                            </div>
                            {badge}
                        </div>
                    ))}
                </div>

                {/* Newsletter Subscription */}
                <div className="newsletter-animate mb-16 p-8 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800/80 border border-blue-100 dark:border-gray-700 shadow-lg">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                        <div className="text-center lg:text-left">
                            <h4 className="font-bold text-xl mb-2">Join Our Newsletter</h4>
                            <p className="text-gray-600 dark:text-gray-400 max-w-md">Subscribe to receive exclusive offers, product updates, and tech tips.</p>
                        </div>
                        <form className="flex flex-col sm:flex-row w-full sm:w-auto" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="px-5 py-4 rounded-l-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white flex-grow sm:w-80 mb-3 sm:mb-0"
                                required
                            />
                            <button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-4 px-8 rounded-r-lg transition-all duration-300 shadow-md hover:shadow-lg">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Payment Methods with Images */}
                <div className="flex flex-col items-center mb-8">
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">We Accept</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {Object.entries(paymentMethodLogos).map(([methodName, imagePath]) => (
                            <div
                                key={methodName}
                                className="relative w-16 h-10 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center overflow-hidden"
                            >
                                <Image
                                    src={imagePath}
                                    alt={`${methodName} logo`}
                                    layout="fill"
                                    objectFit="contain"
                                    className="p-1" // Add some padding inside the div
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="copyright-animate border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-gray-600 dark:text-gray-400">
                    <p className="mb-4">&copy; {new Date().getFullYear()} MegaMart. All rights reserved.</p>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                        {legalLinks.map((link) => (
                            <a href="#" key={link} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-300">
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;