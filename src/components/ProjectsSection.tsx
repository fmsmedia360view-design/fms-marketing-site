"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronRight, ChevronLeft } from "lucide-react";

const projects = [
    {
        title: "Enterprise AI Core",
        category: "KI-Automatisierung",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
        features: [
            "Autonomous Agent Logic",
            "Predictive Data Mesh",
            "Real-time ROI Dashboard"
        ],
        descriptions: [
            "Prozesse, die mitdenken. Wir integrieren intelligente Agenten, die routinemäßige Entscheidungen autonom und mit 100% Präzision treffen.",
            "Daten als Wachstumstreiber. Unser Neural Core analysiert Marktveränderungen in Echtzeit und bereitet strategische Entscheidungen vor.",
            "Skalierbarkeit ohne Reibungsverlust. KI-Automatisierung, die mit Ihrem Unternehmen wächst und Kapazitäten für echte Innovation schafft."
        ]
    },
    {
        title: "Immersive Brand Space",
        category: "3D Webdesign",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
        features: [
            "WebGL Performance Architecture",
            "Cinematic UI Interactions",
            "Spatial Storytelling"
        ],
        descriptions: [
            "Der erste Eindruck entscheidet. Unsere 3D-Environments binden Nutzer signifikant länger als klassische Websites und stärken die Brand-Authority.",
            "Technologie trifft Ästhetik. Shaders und Lichteffekte, die physikalisch akkurat reagieren und ein Gefühl von digitaler Exklusivität vermitteln.",
            "Grenzenlose Interaktion. Wir verwandeln Ihr Produktportfolio in eine begehbare digitale Erfahrung – direkt im Browser, ohne Plugins."
        ]
    },
    {
        title: "Neural Client Voice",
        category: "Smart Communication",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
        features: [
            "Natural Language Understanding",
            "Multi-Channel Intelligence",
            "Instant Lead Conversion"
        ],
        descriptions: [
            "100% Erreichbarkeit, 0% Leerlauf. Unsere Chatbots qualifizieren Anfragen vor und übergeben nur die wertvollsten Leads an Ihr Team.",
            "Kommunikation ohne Barrieren. Durch fortschrittliches NLU verstehen unsere Systeme Nuancen und reagieren empathisch und präzise.",
            "Effizienz im Kundenservice. Automatisierte Lösungen, die Standardanfragen sofort lösen und Ihre Support-Kosten signifikant senken."
        ]
    }
];

export default function ProjectsSection() {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
    const [featureIndex, setFeatureIndex] = useState(0);

    const nextFeature = () => {
        if (selectedProject) {
            setFeatureIndex((prev) => (prev + 1) % selectedProject.features.length);
        }
    };

    const prevFeature = () => {
        if (selectedProject) {
            setFeatureIndex((prev) => (prev - 1 + selectedProject.features.length) % selectedProject.features.length);
        }
    };

    return (
        <section id="projekte" className="relative w-full py-24 sm:py-32 px-6 sm:px-8 flex flex-col items-center bg-black/20">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="max-w-7xl w-full"
            >
                <div className="mb-16 sm:mb-20 text-right">
                    <h2 className="text-white/40 text-[10px] sm:text-sm tracking-[0.4em] sm:tracking-[0.5em] uppercase mb-4">Case Studies</h2>
                    <h3 className="text-3xl sm:text-5xl md:text-6xl font-black font-montserrat text-white uppercase leading-tight">
                        STRATEGISCHE <span className="text-white/20">MEILENSTEINE</span>
                    </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1px bg-white/5 border border-white/5">
                    {projects.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            onClick={() => {
                                setSelectedProject(project);
                                setFeatureIndex(0);
                            }}
                            className="group relative aspect-[4/5] bg-black overflow-hidden cursor-pointer"
                        >
                            <motion.img
                                src={project.image}
                                alt={project.title}
                                initial={
                                    project.title === "Immersive Brand Space"
                                        ? { scale: 1.3, x: "-5%", opacity: 0 }
                                        : { scale: 1.2, opacity: 0 }
                                }
                                animate={
                                    project.title === "Immersive Brand Space"
                                        ? {
                                            scale: [1.3, 1.15, 1.3],
                                            x: ["-5%", "5%", "-5%"],
                                            opacity: 0.4
                                        }
                                        : (project.title === "Neural Client Voice" || project.title === "Enterprise AI Core")
                                            ? {
                                                scale: [1, 1.05, 1],
                                                opacity: [0.3, 0.5, 0.3]
                                            }
                                            : { scale: 1, opacity: 0.4 }
                                }
                                whileHover={{ scale: 1.1, opacity: 0.6 }}
                                transition={
                                    project.title === "Immersive Brand Space"
                                        ? {
                                            scale: { duration: 20, repeat: Infinity, ease: "easeInOut" },
                                            x: { duration: 20, repeat: Infinity, ease: "easeInOut" },
                                            opacity: { duration: 1 }
                                        }
                                        : (project.title === "Neural Client Voice" || project.title === "Enterprise AI Core")
                                            ? {
                                                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                                opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                                            }
                                            : { duration: 1.5, ease: "easeOut" }
                                }
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                            {/* Additional Neural Overlay for AI & Communication projects */}
                            {(project.title === "Neural Client Voice" || project.title === "Enterprise AI Core") && (
                                <motion.div
                                    animate={{ opacity: [0, 0.2, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 bg-white/5 pointer-events-none"
                                />
                            )}

                            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-left">
                                <span className="text-white/40 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase mb-2 block">{project.category}</span>
                                <h4 className="text-2xl sm:text-3xl font-black font-montserrat text-white uppercase tracking-tight mb-4">{project.title}</h4>
                                <div className="w-0 group-hover:w-full h-[1px] bg-white/20 transition-all duration-700" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Showcase Overlay */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 backdrop-blur-xl bg-black/95 overflow-y-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            className="relative max-w-5xl w-full bg-black border border-white/10 rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl my-auto"
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 sm:top-6 right-4 sm:right-6 z-50 text-white/40 hover:text-white transition-colors p-2"
                            >
                                <X size={24} className="sm:w-8 sm:h-8" />
                            </button>

                            {/* Left Side: Visual - Full Bleed Implementation */}
                            <div className="w-full md:w-1/2 min-h-[300px] md:h-auto relative overflow-hidden">
                                <motion.img
                                    key={selectedProject.title}
                                    src={selectedProject.image}
                                    initial={{ scale: 1.05, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 1.2, ease: "easeOut" }}
                                    className="w-full h-full object-cover"
                                />
                                {/* Minimal edge fade only for text readability overlap if needed */}
                                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-transparent to-black/40 md:to-black/60 block md:hidden" />
                            </div>

                            {/* Right Side: Content Slideshow */}
                            <div className="w-full md:w-1/2 p-6 sm:p-10 md:p-16 flex flex-col justify-center text-left">
                                <span className="text-white/20 text-[10px] tracking-[0.4em] uppercase mb-2 sm:mb-4">{selectedProject.category}</span>
                                <h4 className="text-2xl sm:text-3xl md:text-5xl font-black font-montserrat text-white uppercase mb-6 sm:mb-8">{selectedProject.title}</h4>

                                <div className="relative min-h-[150px] flex flex-col justify-center">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={featureIndex}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.5 }}
                                            className="absolute inset-0 flex flex-col justify-center"
                                        >
                                            <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase mb-2">Key Feature 0{featureIndex + 1}</span>
                                            <p className="text-xl md:text-2xl font-bold font-montserrat text-white uppercase tracking-wider mb-4 leading-tight">
                                                {selectedProject.features[featureIndex]}
                                            </p>
                                            <p className="text-white/40 font-light text-sm leading-relaxed max-w-sm">
                                                {selectedProject.descriptions[featureIndex]}
                                            </p>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <div className="mt-12 flex items-center gap-8">
                                    <div className="flex gap-4">
                                        <button onClick={prevFeature} className="p-2 border border-white/10 hover:border-white/40 text-white/40 hover:text-white transition-all rounded-full cursor-pointer">
                                            <ChevronLeft size={20} />
                                        </button>
                                        <button onClick={nextFeature} className="p-2 border border-white/10 hover:border-white/40 text-white/40 hover:text-white transition-all rounded-full cursor-pointer">
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                    <div className="flex gap-2">
                                        {selectedProject.features.map((_, i) => (
                                            <div
                                                key={i}
                                                className={`h-[2px] w-8 transition-colors duration-500 ${i === featureIndex ? 'bg-white' : 'bg-white/10'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
