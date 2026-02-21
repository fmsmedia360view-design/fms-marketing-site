"use client";

import Background3D from "@/components/Background3D";
import Header from "@/components/Header";
import HeroContent from "@/components/HeroContent";
import Footer from "@/components/Footer";
import MagicSection from "@/components/MagicSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import AuditFunnel from "@/components/AuditFunnel";
import { useState, useEffect } from "react";

export default function Home() {
    const [isAuditOpen, setIsAuditOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="bg-black min-h-screen" />;

    return (
        <main className="relative w-full min-h-screen bg-[#000000] text-white selection:bg-white/20">

            {/* Fixed 3D Background Layer */}
            <div className="fixed inset-0 z-0">
                <Background3D />
            </div>

            {/* Fixed Cinematic Vignette Overlay */}
            <div
                className="fixed inset-0 z-[5] pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,1) 100%)'
                }}
            ></div>

            {/* UI Content Layer - Container is transparent to events, Sections catch them */}
            <div className="relative z-10 w-full overflow-x-hidden pointer-events-none">
                <Header />

                {/* Hero Section - Full Height */}
                <section id="hero" className="w-full h-screen flex items-center justify-center pointer-events-none">
                    <HeroContent onAuditOpen={() => setIsAuditOpen(true)} />
                </section>

                {/* Content Sections */}
                <div className="pointer-events-auto">
                    <MagicSection onAuditOpen={() => setIsAuditOpen(true)} />
                    <ProjectsSection />
                    <ContactSection />
                    <Footer />
                </div>
            </div>

            <AuditFunnel isOpen={isAuditOpen} onClose={() => setIsAuditOpen(false)} />
        </main>
    );
}
