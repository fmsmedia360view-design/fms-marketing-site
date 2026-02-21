"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, CheckCircle2, Loader2, Calendar, ShieldCheck, Mail, User, Phone } from "lucide-react";

interface AuditFunnelProps {
    isOpen: boolean;
    onClose: () => void;
}

const steps = [
    {
        id: "status",
        question: "Wie gewinnen Sie aktuell Kunden?",
        options: ["Empfehlungen", "Kaltakquise", "Google/Social Media", "Print/Offline"]
    },
    {
        id: "pain",
        question: "Was sind Ihre größten digitalen Hürden?",
        options: ["Zu wenig Anfragen", "Veraltete Website", "Zeitraubende Prozesse", "Fehlende Sichtbarkeit"]
    },
    {
        id: "3d",
        question: "Welchen Stellenwert hat das visuelle Erlebnis für Ihre Marke?",
        options: [
            "Wir benötigen eine moderne 3D-Präsentation",
            "Unsere Landingpage muss sich von der Konkurrenz abheben",
            "Interaktive Produkte sind wichtig",
            "Standard-Design reicht uns nicht mehr"
        ]
    },
    {
        id: "ai",
        question: "Welche KI-Themen interessieren Sie?",
        options: ["Chatbots/Voicebots", "Automatisierte Workflows", "KI-Content-Erstellung", "Daten-Analyse"]
    },
    {
        id: "goal",
        question: "Welche Ziele priorisieren Sie?",
        options: ["Mehr Umsatz", "Zeitersparnis durch Automation", "Marktführerschaft", "Skalierung"]
    }
];

export default function AuditFunnel({ isOpen, onClose }: AuditFunnelProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<'audit' | 'contact' | 'submitting' | 'calendly' | 'error'>('audit');
    const [contactData, setContactData] = useState({
        name: "",
        email: "",
        phone: "",
        gdpr: false
    });

    // Reset funnel when opened
    useEffect(() => {
        if (isOpen) {
            setCurrentStep(0);
            setAnswers({});
            setStatus('audit');
            setContactData({ name: "", email: "", phone: "", gdpr: false });
        }
    }, [isOpen]);

    const handleOptionSelect = (option: string) => {
        const newAnswers = { ...answers, [steps[currentStep].id]: option };
        setAnswers(newAnswers);

        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            setStatus('contact');
        }
    };

    const handleBack = () => {
        if (status === 'contact') {
            setStatus('audit');
        } else if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        const payload = {
            ...answers,
            ...contactData,
            _subject: "Neue Audit-Anfrage: FMS Marketing Funnel"
        };

        try {
            const response = await fetch("https://formspree.io/f/xqeddroe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setStatus('calendly');
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    const progress = status === 'audit'
        ? ((currentStep + 1) / (steps.length + 1)) * 100
        : status === 'contact' ? 90 : 100;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden flex flex-col max-h-[90vh] shadow-2xl"
            >
                {/* Header / Progress Bar */}
                <div className="p-6 border-b border-white/5 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                <ShieldCheck className="text-white/40" size={16} />
                            </div>
                            <span className="text-[10px] sm:text-xs font-bold font-montserrat tracking-[0.3em] text-white/40 uppercase">
                                {status === 'calendly' ? 'Termin Buchung' : 'Strategie-Audit'}
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white/20 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {status !== 'calendly' && (
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="h-full bg-white"
                            />
                        </div>
                    )}
                </div>

                {/* Content Area */}
                <div className="flex-grow overflow-y-auto p-6 sm:p-10 md:p-16 flex flex-col">
                    <AnimatePresence mode="wait">
                        {status === 'audit' && (
                            <motion.div
                                key={`step-${currentStep}`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex flex-col gap-8"
                            >
                                <div className="space-y-2">
                                    <span className="text-white/20 text-[10px] font-bold tracking-widest uppercase">Schritt 0{currentStep + 1} / 05</span>
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-montserrat text-white uppercase leading-tight">
                                        {steps[currentStep].question}
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {steps[currentStep].options.map((option, idx) => (
                                        <button
                                            key={option}
                                            onClick={() => handleOptionSelect(option)}
                                            className="group relative p-6 bg-white/5 border border-white/5 rounded-sm hover:border-white/20 hover:bg-white/10 transition-all text-left flex items-center justify-between"
                                        >
                                            <span className="text-sm sm:text-base font-light text-white/60 group-hover:text-white transition-colors">
                                                {option}
                                            </span>
                                            <ChevronRight size={18} className="text-white/0 group-hover:text-white/40 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                        </button>
                                    ))}
                                </div>

                                {currentStep > 0 && (
                                    <button
                                        onClick={handleBack}
                                        className="w-fit flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-white/20 hover:text-white transition-colors"
                                    >
                                        <ChevronLeft size={14} /> Zurück
                                    </button>
                                )}
                            </motion.div>
                        )}

                        {status === 'contact' && (
                            <motion.div
                                key="contact"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex flex-col gap-8"
                            >
                                <div className="space-y-2 text-center sm:text-left">
                                    <span className="text-white/20 text-[10px] font-bold tracking-widest uppercase">Fast geschafft</span>
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-montserrat text-white uppercase leading-tight">
                                        Wer sind Sie?
                                    </h3>
                                    <p className="text-white/40 font-light text-xs sm:text-sm">Bitte geben Sie Ihre Kontaktdaten an, um das Audit abzuschließen und Ihren Termin zu sichern.</p>
                                </div>

                                <form onSubmit={handleContactSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                            <input
                                                required
                                                type="text"
                                                placeholder="NAME"
                                                value={contactData.name}
                                                onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                                                className="w-full bg-white/5 border border-white/5 p-5 pl-12 text-white font-montserrat text-xs tracking-widest focus:outline-none focus:border-white/20 transition-colors"
                                            />
                                        </div>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                            <input
                                                required
                                                type="email"
                                                placeholder="E-MAIL"
                                                value={contactData.email}
                                                onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                                                className="w-full bg-white/5 border border-white/5 p-5 pl-12 text-white font-montserrat text-xs tracking-widest focus:outline-none focus:border-white/20 transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                        <input
                                            required
                                            type="tel"
                                            placeholder="TELEFONNUMMER"
                                            value={contactData.phone}
                                            onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                                            className="w-full bg-white/5 border border-white/5 p-5 pl-12 text-white font-montserrat text-xs tracking-widest focus:outline-none focus:border-white/20 transition-colors"
                                        />
                                    </div>

                                    <div className="flex items-start gap-3 py-2">
                                        <input
                                            required
                                            type="checkbox"
                                            id="audit-gdpr"
                                            checked={contactData.gdpr}
                                            onChange={(e) => setContactData({ ...contactData, gdpr: e.target.checked })}
                                            className="mt-1 w-4 h-4 rounded-sm border-white/5 bg-black/40 text-white accent-white cursor-pointer"
                                        />
                                        <label htmlFor="audit-gdpr" className="text-[10px] text-white/30 leading-relaxed font-light hover:text-white/50 transition-colors cursor-pointer">
                                            Ich stimme zu, dass meine Angaben zur Auswertung erhoben werden.
                                            Details in der <button type="button" onClick={() => window.dispatchEvent(new CustomEvent('open-datenschutz'))} className="text-white/60 hover:text-white underline transition-colors">Datenschutzerklärung</button>.
                                        </label>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                        <button
                                            type="button"
                                            onClick={handleBack}
                                            className="flex-1 py-4 border border-white/5 text-[10px] font-bold tracking-widest uppercase text-white/20 hover:text-white transition-colors"
                                        >
                                            Zurück
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-[2] bg-white text-black py-4 font-black font-montserrat uppercase tracking-[0.3em] text-xs hover:scale-[1.02] transition-transform"
                                        >
                                            Audit abschließen
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {status === 'submitting' && (
                            <motion.div
                                key="submitting"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center gap-6 text-center py-10"
                            >
                                <Loader2 className="w-12 h-12 text-white animate-spin" strokeWidth={1} />
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold font-montserrat text-white uppercase tracking-tighter">Daten werden verarbeitet...</h3>
                                    <p className="text-white/40 text-sm font-light">Einen Moment geduld, wir bereiten Ihren persönlichen Strategie-Check vor.</p>
                                </div>
                            </motion.div>
                        )}

                        {status === 'calendly' && (
                            <motion.div
                                key="calendly"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col gap-8 h-full min-h-[500px]"
                            >
                                <div className="text-center space-y-2">
                                    <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" strokeWidth={1} />
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black font-montserrat text-white uppercase leading-tight">
                                        Audit abgeschlossen
                                    </h3>
                                    <p className="text-white/40 text-sm font-light max-w-lg mx-auto">
                                        Vielen Dank für Ihre Angaben. Wählen Sie jetzt einen Termin für Ihr kostenloses Erstgespräch aus.
                                    </p>
                                </div>

                                {/* Calendly Container - Light/Harmonious Contrast */}
                                <div className="relative flex-grow bg-[#f5f5f5] rounded-xl overflow-hidden min-h-[500px] border-4 border-white/5 shadow-inner">
                                    <iframe
                                        src={`https://calendly.com/clientmarketing/unverbindliches-erstgespraech?hide_landing_page_details=1&hide_gdpr_banner=1&name=${encodeURIComponent(contactData.name)}&email=${encodeURIComponent(contactData.email)}`}
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        className="absolute inset-0"
                                        title="Calendly"
                                    ></iframe>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/20 hover:text-white transition-colors text-center py-4"
                                >
                                    Funnels schließen
                                </button>
                            </motion.div>
                        )}

                        {status === 'error' && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center gap-6 text-center py-10"
                            >
                                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                                    <X className="text-red-500" size={32} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold font-montserrat text-white uppercase tracking-tighter">Übertragung fehlgeschlagen</h3>
                                    <p className="text-white/40 text-sm font-light">Es gab ein Problem beim Senden Ihrer Antworten. Bitte versuchen Sie es erneut.</p>
                                </div>
                                <button
                                    onClick={() => setStatus('contact')}
                                    className="px-8 py-3 bg-white/5 border border-white/10 text-white text-[10px] font-bold tracking-widest uppercase hover:bg-white/10 transition-all"
                                >
                                    Erneut versuchen
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
