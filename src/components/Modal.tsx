"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl max-h-[80vh] bg-black/60 border border-white/10 backdrop-blur-2xl rounded-sm overflow-hidden flex flex-col"
                    >
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h3 className="text-xl font-bold font-montserrat text-white uppercase tracking-widest">{title}</h3>
                            <button
                                onClick={onClose}
                                className="text-white/40 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-8 overflow-y-auto text-white/60 font-light leading-relaxed space-y-4">
                            {children}
                        </div>

                        <div className="p-6 border-t border-white/10 flex justify-end">
                            <button
                                onClick={onClose}
                                className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold tracking-widest uppercase transition-colors rounded-sm"
                            >
                                Schließen
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
