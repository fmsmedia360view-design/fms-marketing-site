"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, memo } from "react";

const SplineScene = memo(() => (
    <div
        className="absolute inset-0 z-0 pointer-events-auto mix-blend-screen overflow-hidden"
    >
        {/* 
          Iframe-Scale-Crop Trick:
          We make the iframe slightly larger and offset it to push the watermark out of view.
        */}
        <div className="absolute inset-0 scale-[1.1] origin-center translate-y-[1%]">
            <iframe
                src="https://my.spline.design/nexbotbyaximoriscopycopy-TrYyi5rjPANQCTao5HkPWEUW/"
                frameBorder="0"
                width="100%"
                height="100%"
                title="Spline 3D Model"
                className="w-full h-full border-none outline-none bg-transparent"
                style={{ pointerEvents: 'auto' }}
                loading="eager"
            ></iframe>
        </div>

        {/* 
          Back-Mask: A blurred black region specifically to hide scene text objects 
          like "Nexbot" that sit behind the main animation.
        */}
        <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-40 bg-black/80 blur-[100px] pointer-events-none rounded-full"></div>

        {/* Masking the very bottom right where the logo usually sits just in case */}
        <div className="absolute bottom-0 right-0 w-32 h-12 bg-black blur-xl opacity-90 pointer-events-none"></div>
    </div>
));

SplineScene.displayName = "SplineScene";

export default function Background3D() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [mounted, setMounted] = useState(false);
    const [showSpline, setShowSpline] = useState(false);

    // Cinematic movement config
    const springConfig = { damping: 40, stiffness: 200, mass: 1 };

    const smoothMouseX = useSpring(mouseX, springConfig);
    const smoothMouseY = useSpring(mouseY, springConfig);

    // Subtle parallax for the bot container (iframe)
    const iframeX = useTransform(smoothMouseX, [-0.5, 0.5], [15, -15]);
    const iframeY = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);

    // Parallax Orbs - High movement for depth
    const layer1X = useTransform(smoothMouseX, [-0.5, 0.5], [-60, 60]);
    const layer1Y = useTransform(smoothMouseY, [-0.5, 0.5], [-60, 60]);

    const layer2X = useTransform(smoothMouseX, [-0.5, 0.5], [80, -80]);
    const layer2Y = useTransform(smoothMouseY, [-0.5, 0.5], [80, -80]);

    const layer3X = useTransform(smoothMouseX, [-0.5, 0.5], [-120, 120]);
    const layer3Y = useTransform(smoothMouseY, [-0.5, 0.5], [-120, 120]);

    useEffect(() => {
        setMounted(true);
        // Delay Spline loading to prioritize UI
        const splineTimer = setTimeout(() => setShowSpline(true), 2000);

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX / window.innerWidth - 0.5);
            mouseY.set(e.clientY / window.innerHeight - 0.5);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            clearTimeout(splineTimer);
        };
    }, [mouseX, mouseY]);

    if (!mounted) {
        return <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden bg-[#000000]"></div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden bg-[#000000] pointer-events-auto text-white"
        >
            {/* Background radial layer - Very deep focus */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#050505_0%,_#000000_100%)] opacity-100 pointer-events-none"></div>

            {/* Actual Spline 3D Scene - Subtle Parallax restored alongside native interaction */}
            <motion.div
                style={{ x: iframeX, y: iframeY, willChange: "transform" }}
                className="absolute inset-0 scale-[0.7] sm:scale-[0.9] md:scale-[1.1] origin-center translate-y-[10%] sm:translate-y-[1%] transition-opacity duration-1000"
            >
                {showSpline ? <SplineScene /> : <div className="absolute inset-0 bg-black/40" />}
            </motion.div>

            {/* Parallax Glow Orbs - Cinematic nebulous effect - Optimized Blurs */}
            <motion.div
                style={{ x: layer1X, y: layer1Y, willChange: "transform" }}
                animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.15, 0.1] }}
                transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
                className="absolute top-[-10%] left-[-10%] w-[30rem] sm:w-[50rem] h-[30rem] sm:h-[50rem] bg-[#ff6b35] rounded-full blur-[120px] sm:blur-[180px] pointer-events-none z-10 mix-blend-screen"
            />

            <motion.div
                style={{ x: layer2X, y: layer2Y, willChange: "transform" }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ repeat: Infinity, duration: 20, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-[-20%] right-[-10%] w-[35rem] sm:w-[45rem] h-[35rem] sm:h-[45rem] bg-[#ff00ff] rounded-full blur-[100px] sm:blur-[160px] mix-blend-screen pointer-events-none z-10"
            />

            <motion.div
                style={{ x: layer3X, y: layer3Y, willChange: "transform" }}
                animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.1, 0.15, 0.1] }}
                transition={{ repeat: Infinity, duration: 15, ease: "easeInOut", delay: 4 }}
                className="absolute top-[20%] left-[10%] -translate-x-1/2 -translate-y-1/2 w-[25rem] sm:w-[35rem] h-[25rem] sm:h-[35rem] bg-[#00ffff] rounded-full blur-[80px] sm:blur-[140px] mix-blend-screen pointer-events-none z-10"
            />


            {/* Deep Vignette Fade-out */}
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#000000] to-transparent z-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#000000] to-transparent z-20 pointer-events-none"></div>
        </motion.div>
    );
}
