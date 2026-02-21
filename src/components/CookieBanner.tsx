"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Cookie, X, Check, ShieldCheck } from "lucide-react";

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        console.log("CookieBanner mounted");

        // Check if user has already made a choice
        const consent = localStorage.getItem("fms-cookie-consent");
        console.log("Existing consent:", consent);

        if (!consent) {
            console.log("No consent found, showing banner in 1.5s...");
            const timer = setTimeout(() => {
                setIsVisible(true);
                console.log("Banner state set to VISIBLE");
            }, 1500);
            return () => clearTimeout(timer);
        } else {
            console.log("Consent exists, banner stays hidden.");
        }
    }, []);

    const acceptAll = () => {
        console.log("Accepting all cookies...");
        localStorage.setItem("fms-cookie-consent", "all");
        setIsVisible(false);
    };

    const acceptNecessary = () => {
        console.log("Accepting only necessary...");
        localStorage.setItem("fms-cookie-consent", "necessary");
        setIsVisible(false);
    };

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed bottom-6 left-6 right-6 z-[200] flex justify-center pointer-events-none"
                >
                    <div className="max-w-6xl w-full bg-black/40 border border-white/10 backdrop-blur-2xl p-4 sm:p-5 rounded-sm shadow-2xl pointer-events-auto flex flex-col md:flex-row items-center gap-4 md:gap-8 border-l-white/20">
                        {/* Icon & Title */}
                        <div className="flex items-center gap-3 shrink-0">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                <ShieldCheck className="text-white/60" size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold font-montserrat uppercase tracking-[0.2em] text-[10px] mb-0.5">Privacy</h4>
                                <div className="flex items-center gap-1.5 text-[9px] text-white/20 uppercase tracking-widest font-bold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/50 animate-pulse"></span>
                                    DSGVO
                                </div>
                            </div>
                        </div>

                        {/* Text */}
                        <div className="flex-grow">
                            <p className="text-white/50 text-[11px] sm:text-xs leading-relaxed font-light">
                                Wir nutzen Cookies für Optimierung und <span className="text-white/80">Google Analytics</span>.
                                Details in der{" "}
                                <button
                                    onClick={() => {
                                        window.dispatchEvent(new CustomEvent('open-datenschutz'));
                                    }}
                                    className="text-white/80 hover:text-white underline underline-offset-4 transition-colors font-medium decoration-white/20"
                                >
                                    Datenschutzerklärung
                                </button>.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-2 min-w-fit">
                            <button
                                onClick={acceptNecessary}
                                className="px-5 py-2.5 border border-white/10 text-white/40 hover:text-white hover:bg-white/5 transition-all text-[9px] font-black uppercase tracking-[0.2em] rounded-sm whitespace-nowrap"
                            >
                                Nur Notwendig
                            </button>
                            <button
                                onClick={acceptAll}
                                className="px-7 py-2.5 bg-white text-black hover:bg-white/90 transition-all text-[9px] font-black uppercase tracking-[0.2em] rounded-sm whitespace-nowrap"
                            >
                                Alle Akzeptieren
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
