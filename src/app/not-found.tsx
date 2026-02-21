"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full border border-white/10 bg-black/40 backdrop-blur-xl p-12 rounded-sm"
            >
                <h2 className="text-3xl font-black font-montserrat text-white mb-4 uppercase tracking-tighter">
                    404
                </h2>
                <p className="text-white/40 font-light mb-8 text-sm uppercase tracking-widest">
                    Sollte hier nicht sein.
                </p>
                <Link
                    href="/"
                    className="inline-block w-full border border-white/10 bg-white text-black py-4 rounded-sm uppercase font-montserrat font-black tracking-widest text-xs hover:scale-[1.02] transition-transform"
                >
                    Zurück zur Basis
                </Link>
            </motion.div>
        </div>
    );
}
