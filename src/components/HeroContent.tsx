"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroContent({ onAuditOpen }: { onAuditOpen: () => void }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="flex flex-col items-center justify-center z-20 pointer-events-none mt-12 pb-16 perspective-[1000px] opacity-0">
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black font-montserrat uppercase tracking-[0.1em] text-center leading-[1.1] mb-16 underline-offset-8">
                    DIVE INTO<br /> DIGITAL MAGIC
                </h1>
            </div>
        );
    }

    const titleWords = ["DIVE", "INTO", "DIGITAL", "MAGIC"];

    return (
        <div className="flex flex-col items-center justify-center z-20 pointer-events-none mt-20 pb-20 sm:pb-32 px-6 sm:px-8 perspective-[1000px]">
            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="text-white/60 font-medium tracking-[0.3em] sm:tracking-[0.5em] font-sans text-xs sm:text-base md:text-lg uppercase mb-6 sm:mb-8 text-center"
                style={{ textShadow: "0 0 20px rgba(255,255,255,0.2)" }}
            >
                FMS MARKETING — EXPERTISE SEIT 2009
            </motion.p>

            <div className="flex flex-col items-center mb-12 sm:mb-16">
                <motion.h1
                    className="text-4xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black font-montserrat uppercase text-center leading-[1.2] sm:leading-[1.1] drop-shadow-2xl mix-blend-screen"
                >
                    <motion.div
                        initial={{ letterSpacing: "0.5em", filter: "blur(20px)", opacity: 0 }}
                        animate={{ letterSpacing: "0.1em", filter: "blur(0px)", opacity: 1 }}
                        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                        className="flex flex-wrap justify-center gap-x-4 sm:gap-x-8 text-white"
                        style={{ textShadow: "0 0 30px rgba(255,255,255,0.3)" }}
                    >
                        <span>MEHR ALS NUR</span>
                    </motion.div>
                    <motion.div
                        initial={{ letterSpacing: "0.5em", filter: "blur(20px)", opacity: 0 }}
                        animate={{ letterSpacing: "0.1em", filter: "blur(0px)", opacity: 1 }}
                        transition={{ duration: 2, ease: "easeOut", delay: 0.8 }}
                        className="text-white/20"
                        style={{ textShadow: "0 0 30px rgba(255,255,255,0.1)" }}
                    >
                        <span>SICHTBARKEIT</span>
                    </motion.div>
                </motion.h1>
            </div>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="text-white/70 font-light text-sm sm:text-base md:text-lg max-w-2xl text-center mb-12 sm:mb-16 leading-relaxed drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
                Während andere von KI sprechen, implementieren wir sie. Wir kombinieren zwei Jahrzehnte Marketing-Erfahrung mit immersiven 3D-Web-Experiences und intelligenter Automatisierung für Ihren entscheidenden Marktvorsprung.
            </motion.p>

            <div className="pointer-events-auto">
                <motion.button
                    onClick={onAuditOpen}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 40px 0px rgba(255, 255, 255, 0.1)",
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="relative overflow-hidden border border-white/10 backdrop-blur-[12px] bg-black/40 px-14 py-5 rounded-sm uppercase font-montserrat font-bold tracking-[0.25em] transition-all duration-500 ease-out group text-sm sm:text-base text-white/80 hover:text-white"
                >
                    Strategie-Check anfordern
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-150%] skew-x-[-30deg] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out"></div>
                </motion.button>
            </div>
        </div>
    );
}
