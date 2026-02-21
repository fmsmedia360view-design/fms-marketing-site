"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: 'Services', href: '#magie' },
        { name: 'Case Studies', href: '#projekte' },
        { name: 'Kontakt', href: '#kontakt' }
    ];

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="fixed top-0 left-0 w-full z-[100] px-6 sm:px-8 py-4 sm:py-6 flex justify-between items-center backdrop-blur-[12px] bg-black/40 border-b border-white/10 pointer-events-auto"
        >
            <a href="#hero" className="text-base sm:text-lg font-bold tracking-[0.2em] sm:tracking-[0.3em] font-montserrat text-white/60 uppercase cursor-pointer hover:text-white transition-colors">
                FMS — FUTURE MARKETING SOLUTIONS
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-12">
                {navItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className="text-[10px] font-bold tracking-[0.4em] text-white/40 hover:text-white uppercase transition-all duration-300"
                    >
                        {item.name}
                    </a>
                ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white/60 hover:text-white transition-colors cursor-pointer p-2"
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 top-[72px] bg-black/95 backdrop-blur-xl z-[90] flex flex-col items-center justify-center gap-12 p-8"
                    >
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-2xl font-black font-montserrat tracking-[0.2em] text-white/60 hover:text-white uppercase transition-all"
                            >
                                {item.name}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.header>
    );
}
