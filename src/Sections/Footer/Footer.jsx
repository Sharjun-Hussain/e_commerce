"use client"
import React from 'react';
import { useTheme } from 'next-themes';

const Footer = () => {
    const { theme, setTheme } = useTheme();

    return (
        <footer className="w-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">TechMart</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Your trusted partner for premium electronics and computer equipment.
                        </p>
                        <div className="mt-4 flex items-center">
                            <span className="mr-2">Theme:</span>
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm"
                            >
                                {theme === 'dark' ? 'Light' : 'Dark'} Mode
                            </button>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div>
                        <h4 className="font-semibold mb-4">Products</h4>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                            <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Laptops</li>
                            <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Monitors</li>
                            <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Components</li>
                            <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Gaming</li>
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                            <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Contact Us</li>
                            <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Warranty</li>
                            <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Returns</li>
                            <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">FAQ</li>
                        </ul>
                    </div>

                    {/* Company Section */}
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                            <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">About Us</li>
                            <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Careers</li>
                            <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Privacy Policy</li>
                            <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Terms of Service</li>
                        </ul>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
                    <p>&copy; 2024 TechMart. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;