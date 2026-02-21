"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactSection() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: "",
        gdpr: false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch("https://formspree.io/f/xqeddroe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: "", email: "", company: "", message: "", gdpr: false });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <section id="kontakt" className="relative w-full py-24 sm:py-32 px-6 sm:px-8 flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="max-w-3xl w-full"
            >
                <div className="mb-16 sm:mb-20 text-center">
                    <h2 className="text-white/40 text-[10px] sm:text-sm tracking-[0.4em] sm:tracking-[0.5em] uppercase mb-4">Kontakt</h2>
                    <h3 className="text-3xl sm:text-5xl md:text-6xl font-black font-montserrat text-white uppercase leading-tight">
                        BEREIT FÜR DEN <br /><span className="text-white/20">NÄCHSTEN SCHRITT?</span>
                    </h3>
                </div>

                <div className="relative">
                    {/* Success State Overlay */}
                    <AnimatePresence>
                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute inset-0 z-50 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-sm flex flex-col items-center justify-center text-center p-8 transition-all"
                            >
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <CheckCircle2 className="w-16 h-16 text-green-500 mb-6 mx-auto" strokeWidth={1} />
                                    <h4 className="text-2xl font-black font-montserrat text-white uppercase mb-4 tracking-tighter">Nachricht gesendet!</h4>
                                    <p className="text-white/50 font-light mb-8 max-w-xs mx-auto">Vielen Dank für Ihr Vertrauen. Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.</p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors"
                                    >
                                        Neue Nachricht senden
                                    </button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className={`space-y-6 ${status === 'success' ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-500`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative group">
                                <input
                                    required
                                    type="text"
                                    placeholder="NAME"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 p-6 text-white font-montserrat text-sm tracking-widest focus:outline-none focus:border-white/30 transition-colors rounded-sm"
                                />
                            </div>
                            <div className="relative group">
                                <input
                                    required
                                    type="email"
                                    placeholder="E-MAIL"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 p-6 text-white font-montserrat text-sm tracking-widest focus:outline-none focus:border-white/30 transition-colors rounded-sm"
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="UNTERNEHMEN (OPTIONAL)"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 p-6 text-white font-montserrat text-sm tracking-widest focus:outline-none focus:border-white/30 transition-colors rounded-sm"
                            />
                        </div>

                        <div className="relative group">
                            <textarea
                                required
                                rows={6}
                                placeholder="NACHRICHT AN FMS"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 p-6 text-white font-montserrat text-sm tracking-widest focus:outline-none focus:border-white/30 transition-colors rounded-sm resize-none"
                            ></textarea>
                        </div>

                        {/* GDPR Checkbox */}
                        <div className="flex items-start gap-3 px-2">
                            <input
                                required
                                type="checkbox"
                                id="gdpr"
                                checked={formData.gdpr}
                                onChange={(e) => setFormData({ ...formData, gdpr: e.target.checked })}
                                className="mt-1 w-4 h-4 rounded-sm border-white/10 bg-black/40 text-white accent-white cursor-pointer"
                            />
                            <label htmlFor="gdpr" className="text-[11px] text-white/30 leading-relaxed font-light hover:text-white/50 transition-colors cursor-pointer">
                                Ich stimme zu, dass meine Angaben zur Beantwortung meiner Anfrage erhoben und verarbeitet werden.
                                Details in der <button type="button" onClick={() => window.dispatchEvent(new CustomEvent('open-datenschutz'))} className="text-white/60 hover:text-white underline underline-offset-4 transition-colors">Datenschutzerklärung</button>.
                            </label>
                        </div>

                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3 text-red-500/80 text-xs px-2"
                            >
                                <AlertCircle size={16} />
                                <span>Ups! Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.</span>
                            </motion.div>
                        )}

                        <button
                            disabled={status === 'loading'}
                            className="w-full relative overflow-hidden border border-white/10 bg-white text-black py-6 rounded-sm uppercase font-montserrat font-black tracking-[0.3em] transition-all hover:scale-[1.01] active:scale-[0.99] group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className={`relative z-10 flex items-center justify-center gap-3 ${status === 'loading' ? 'opacity-0' : 'opacity-100'}`}>
                                Strategie-Gespräch anfordern
                            </span>

                            {status === 'loading' && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Loader2 className="w-6 h-6 animate-spin text-black" />
                                </div>
                            )}

                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"></div>
                        </button>
                    </form>
                </div>
            </motion.div>
        </section>
    );
}
