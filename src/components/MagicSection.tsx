"use client";

import { motion } from "framer-motion";
import { Box, Sparkles, MessageSquare, TrendingUp, X, RotateCw } from "lucide-react";
import { useState } from "react";

const services = [
    {
        title: "KI-Automatisierung",
        desc: "Effizienz neu definiert. Wir implementieren maßgeschneiderte KI-Automatisierung, die Ihre Betriebskosten drastisch senkt, Fehlerquoten minimiert und echte, unbegrenzte Skalierbarkeit für Ihr Geschäftsmodell schafft.",
        details: "Von autonomen Agenten bis hin zur intelligenten Prozessoptimierung: Wir machen künstliche Intelligenz zum integralen Bestandteil Ihrer Wertschöpfungskette. Wir verwandeln komplexe Datenströme in automatisierte, hocheffiziente Workflows.",
        features: ["Autonome Workflow-Agenten", "Prädiktive Datenanalyse", "Nahtlose Systemintegration"],
        icon: Sparkles,
        color: "#ff00ff"
    },
    {
        title: "Next-Gen Web",
        desc: "Digitale Erlebnisse in 3D. Wir entwickeln High-End Landingpages mit Fokus auf immersives 3D Webdesign, die Ihre Marke von der Masse abheben und Ihre Conversion-Rate nachhaltig auf ein neues Level heben.",
        details: "Statische Seiten waren gestern. Wir nutzen WebGL und Spline, um interaktive Welten zu erschaffen, die Ihre Marke digital greifbar machen. Technologische Überlegenheit, die direkt in Ihren messbaren Unternehmenserfolg einzahlt.",
        features: ["Interaktive 3D-Showrooms", "WebGL Performance-Design", "Psychologische Conversion-Optimierung"],
        icon: Box,
        color: "#00ffff"
    },
    {
        title: "Smart Communication",
        desc: "Intelligente Interaktion rund um die Uhr. Unsere Neural-Voice- & Chatbots automatisieren Ihren Kundenservice, qualifizieren Leads vollautomatisch und garantieren eine Reaktionszeit von unter einer Sekunde.",
        details: "KI-gestützte Kommunikation, die sich menschlich anfühlt. Wir entwickeln Systeme, die komplexe Kundenanfragen sofort lösen und Ihr Team spürbar entlasten – für 100% Erreichbarkeit an 365 Tagen im Jahr.",
        features: ["Neural-Voice KI-Telefonie", "Vollautomatisierte Lead-Qualifizierung", "24/7 Premium-Multilingual Support"],
        icon: MessageSquare,
        color: "#ff6b35"
    },
    {
        title: "Digital Growth",
        desc: "Strategische Marktdominanz. Mit präzisen Outreach-Kampagnen und datengetriebenem Performance-Marketing führen wir Ihre Marke zu planbarem, skalierbarem und nachhaltigem Wachstum.",
        details: "Wachstum ist kein Zufall, sondern Strategie. Wir kombinieren tiefgreifende Marktanalysen mit psychologisch optimiertem Content, um Ihre Zielgruppe genau dort zu konvertieren, wo sie ihre Kaufentscheidungen trifft.",
        features: ["Datengestütztes Outreach-System", "KI-Content-Skalierung", "Performance-Tracking in Echtzeit"],
        icon: TrendingUp,
        color: "#00ff88"
    }
];

function ServiceCard({ service, index, onAuditOpen }: { service: typeof services[0], index: number, onAuditOpen: () => void }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="relative h-[380px] w-full perspective-[1500px]">
            <motion.div
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative w-full h-full"
            >
                {/* Front Side */}
                <div
                    style={{ backfaceVisibility: "hidden" }}
                    className="absolute inset-0 group h-full p-6 sm:p-8 rounded-sm bg-black/40 border border-white/10 backdrop-blur-md transition-all duration-500 overflow-hidden flex flex-col"
                >
                    {/* Accent Glow */}
                    <div
                        className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                        style={{ backgroundColor: service.color }}
                    ></div>

                    <service.icon className="w-10 h-10 mb-6 text-white/80 group-hover:text-white transition-colors duration-500" strokeWidth={1} />

                    <h4 className="text-xl font-bold font-montserrat text-white mb-4 uppercase tracking-wider">{service.title}</h4>
                    <p className="text-white/40 group-hover:text-white/60 transition-colors duration-500 font-light leading-relaxed mb-6 text-sm sm:text-base">
                        {service.desc}
                    </p>

                    <button
                        onClick={() => setIsFlipped(true)}
                        className="mt-auto flex items-center gap-2 text-white/20 group-hover:text-white transition-colors duration-500 text-[10px] font-bold tracking-widest uppercase outline-none cursor-pointer"
                    >
                        ROI-Details ansehen <RotateCw size={14} className="group-hover:rotate-45 transition-transform duration-500" />
                    </button>
                </div>

                {/* Back Side */}
                <div
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)"
                    }}
                    className="absolute inset-0 h-full p-6 sm:p-8 rounded-sm bg-black/60 border border-white/20 backdrop-blur-lg overflow-hidden flex flex-col"
                >
                    {/* Background Glow (Back side) */}
                    <div
                        className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full blur-[100px] opacity-20"
                        style={{ backgroundColor: service.color }}
                    ></div>

                    <div className="flex justify-between items-start mb-6">
                        <h4 className="text-lg font-bold font-montserrat text-white uppercase tracking-wider">Business Impact</h4>
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                            className="text-white/40 hover:text-white transition-colors p-1"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <p className="text-white/70 font-light leading-relaxed mb-6 text-xs sm:text-sm italic border-l-2 border-white/10 pl-4">
                        {service.details}
                    </p>

                    <div className="space-y-3 mb-6">
                        {service.features.map((feature, fIndex) => (
                            <div key={fIndex} className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: service.color }}></div>
                                <span className="text-[10px] sm:text-xs text-white/50 uppercase tracking-widest font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={onAuditOpen}
                        className="mt-2 w-full py-3 border border-white/10 bg-white text-black text-[9px] font-black uppercase tracking-[0.2em] rounded-sm hover:scale-[1.02] transition-transform"
                    >
                        Strategie-Audit starten
                    </button>

                    <div className="mt-auto space-y-3">
                        <div className="w-full h-[1px] bg-white/10"></div>
                        <div className="flex justify-between text-[9px] font-bold tracking-widest uppercase text-white/40">
                            <span>Business Unit: {service.title}</span>
                            <span style={{ color: service.color }}>Strategic Alignment</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function MagicSection({ onAuditOpen }: { onAuditOpen: () => void }) {
    return (
        <section id="magie" className="relative w-full py-24 sm:py-32 px-6 sm:px-8 flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="max-w-7xl w-full"
            >
                <div className="mb-16 sm:mb-24">
                    <h2 className="text-white/40 text-[10px] sm:text-sm tracking-[0.4em] sm:tracking-[0.5em] uppercase mb-4">Expertise & Lösungen</h2>
                    <h3 className="text-3xl sm:text-5xl md:text-6xl font-black font-montserrat text-white uppercase leading-tight">
                        ERFAHRUNG TRIFFT <span className="text-white/20">INNOVATION</span>
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.2 }}
                            className="w-full"
                        >
                            <ServiceCard service={service} index={i} onAuditOpen={onAuditOpen} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
