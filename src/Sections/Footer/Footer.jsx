"use client"
import React, { useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const Footer = () => {
    const { theme } = useTheme();
    const footerRef = useRef(null);
    const sectionsRef = useRef([]);
    const copyrightRef = useRef(null);

    // Add elements to ref array
    const addToRefs = (el) => {
        if (el && !sectionsRef.current.includes(el)) {
            sectionsRef.current.push(el);
        }
    };

    useEffect(() => {
        // Only run animations in browser environment
        if (typeof window === 'undefined') return;

        const ctx = gsap.context(() => {
            // Animate footer entrance
            gsap.fromTo(sectionsRef.current,
                {
                    y: 50,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
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

            // Animate copyright section
            gsap.fromTo(copyrightRef.current,
                {
                    scaleX: 0
                },
                {
                    scaleX: 1,
                    duration: 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: copyrightRef.current,
                        start: "top 90%",
                        toggleActions: "play none none none"
                    }
                }
            );

            // Hover animations for list items
            const listItems = footerRef.current.querySelectorAll('li');
            listItems.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    gsap.to(item, {
                        x: 8,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });

                item.addEventListener('mouseleave', () => {
                    gsap.to(item, {
                        x: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
            });
        }, footerRef);

        // Clean up
        return () => ctx.revert();
    }, []);

    return (
        <footer
            ref={footerRef}
            className="w-full bg-background dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300 relative overflow-hidden"
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute -bottom-32 -right-32 w-64 h-64 rounded-full ${theme === 'dark' ? 'bg-blue-900/10' : 'bg-blue-200/30'}`}></div>
                <div className={`absolute -top-32 -left-32 w-64 h-64 rounded-full ${theme === 'dark' ? 'bg-purple-900/10' : 'bg-purple-200/30'}`}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div ref={addToRefs}>
                        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            MegaMart
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                            Your trusted partner for premium electronics and computer equipment with over a decade of excellence.
                        </p>
                        <div className="flex space-x-4">
                            {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                                <div
                                    key={social}
                                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-300 cursor-pointer"
                                >
                                    <span className="sr-only">{social}</span>
                                    <div className="w-5 h-5 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Products Section */}
                    <div ref={addToRefs}>
                        <h4 className="font-semibold text-lg mb-5 relative inline-block">
                            Products
                            <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-blue-600"></span>
                        </h4>
                        <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                            {['Laptops', 'Monitors', 'Components', 'Gaming', 'Accessories', 'Software'].map((item) => (
                                <li
                                    key={item}
                                    className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-300 flex items-center"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-3"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div ref={addToRefs}>
                        <h4 className="font-semibold text-lg mb-5 relative inline-block">
                            Support
                            <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-blue-600"></span>
                        </h4>
                        <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                            {['Contact Us', 'Warranty', 'Returns', 'FAQ', 'Shipping', 'Track Order'].map((item) => (
                                <li
                                    key={item}
                                    className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-300 flex items-center"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-3"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Section */}
                    <div ref={addToRefs}>
                        <h4 className="font-semibold text-lg mb-5 relative inline-block">
                            Company
                            <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-blue-600"></span>
                        </h4>
                        <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                            {['About Us', 'Careers', 'Privacy Policy', 'Terms of Service', 'Blog', 'Press'].map((item) => (
                                <li
                                    key={item}
                                    className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-300 flex items-center"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-3"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter Subscription */}
                <div ref={addToRefs} className="mt-16 p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h4 className="font-bold text-lg">Stay Updated</h4>
                            <p className="text-gray-600 dark:text-gray-400">Subscribe to our newsletter for the latest products and offers</p>
                        </div>
                        <div className="flex w-full md:w-auto">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="px-4 py-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white flex-grow md:flex-grow-0 md:w-64"
                            />
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-r-lg transition-colors duration-300">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div
                    ref={copyrightRef}
                    className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-gray-600 dark:text-gray-400 transform origin-left"
                >
                    <p>&copy; 2025 MegaMart. All rights reserved.</p>
                    <div className="flex justify-center space-x-6 mt-4 text-sm">
                        <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Privacy Policy</span>
                        <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Terms of Service</span>
                        <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Cookie Policy</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;