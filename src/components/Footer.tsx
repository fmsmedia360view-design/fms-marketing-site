"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Modal from "./Modal";
import { useEffect } from "react";

export default function Footer() {
    const [modalContent, setModalContent] = useState<null | 'impressum' | 'datenschutz'>(null);

    useEffect(() => {
        const handleOpenDatenschutz = () => setModalContent('datenschutz');
        window.addEventListener('open-datenschutz', handleOpenDatenschutz);
        return () => window.removeEventListener('open-datenschutz', handleOpenDatenschutz);
    }, []);

    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="w-full px-6 sm:px-8 py-12 flex flex-col items-center gap-8 border-t border-white/5"
        >
            <div className="flex gap-8 sm:gap-12 text-[10px] font-bold tracking-[0.3em] uppercase text-white/20">
                <button onClick={() => setModalContent('impressum')} className="hover:text-white/60 transition-colors cursor-pointer outline-none">Impressum</button>
                <button onClick={() => setModalContent('datenschutz')} className="hover:text-white/60 transition-colors cursor-pointer outline-none">Datenschutz</button>
            </div>

            <div className="text-[10px] font-light text-white/10 tracking-[0.2em] uppercase">
                © 2026 FMS — FUTURE MARKETING SOLUTIONS
            </div>

            {/* Modals */}
            <Modal
                isOpen={modalContent === 'impressum'}
                onClose={() => setModalContent(null)}
                title="Impressum"
            >
                <div className="space-y-4 text-sm text-white/70 leading-relaxed overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
                    <section>
                        <h4 className="font-bold text-white mb-1 uppercase tracking-wider">Angaben gemäß § 5 TMG</h4>
                        <p>FMS GmbH</p>
                        <p>Geschäftsführer: Nacer El Moudni</p>
                        <p>Antonio-Segni-Straße 4</p>
                        <p>44263 Dortmund</p>
                    </section>

                    <section>
                        <h4 className="font-bold text-white mb-1 uppercase tracking-wider">Kontakt</h4>
                        <p>Telefon: +49 231 9976 7477</p>
                        <p>E-Mail: info@fms-marketing.com</p>
                        <p>Internet: https://www.fms-marketing.de</p>
                    </section>

                    <section>
                        <h4 className="font-bold text-white mb-1 uppercase tracking-wider">Registereintrag</h4>
                        <p>Eintragung im Handelsregister</p>
                        <p>Registergericht: Amtsgericht Dortmund</p>
                        <p>Registernummer: HRB 26036</p>
                    </section>

                    <section>
                        <h4 className="font-bold text-white mb-1 uppercase tracking-wider">Umsatzsteuer-ID</h4>
                        <p>DE29160644</p>
                    </section>

                    <section>
                        <h4 className="font-bold text-white mb-1 uppercase tracking-wider">Inhaltlich verantwortlich</h4>
                        <p>Nacer El Moudni (Anschrift wie oben)</p>
                    </section>

                    <section className="text-[10px] text-white/30 pt-4 border-t border-white/5">
                        <p className="mb-2">Haftungsausschluss: Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
                        <p>Urheberrecht: Inhalt und Struktur dieser Website sind urheberrechtlich geschützt. Vervielfältigung der veröffentlichten Inhalte und Grafiken bedürfen der vorherigen Zustimmung des Herausgebers.</p>
                    </section>
                </div>
            </Modal>

            <Modal
                isOpen={modalContent === 'datenschutz'}
                onClose={() => setModalContent(null)}
                title="Datenschutzerklärung"
            >
                <div className="space-y-6 text-xs sm:text-sm text-white/70 leading-relaxed overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
                    <section>
                        <h4 className="font-bold text-white mb-2 uppercase tracking-wider">1. Datenschutz auf einen Blick</h4>
                        <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>
                    </section>

                    <section>
                        <h4 className="font-bold text-white mb-2 uppercase tracking-wider">2. Datenerfassung auf unserer Website</h4>
                        <p><span className="text-white">Kontaktformular:</span> Ihre Daten werden erhoben, wenn Sie uns diese über unser Kontaktformular mitteilen. Diese Daten verwenden wir ausschließlich zur Bearbeitung Ihrer Anfrage.</p>
                        <p><span className="text-white">Automatische Datenerfassung:</span> Beim Besuch unserer Website werden automatisch technische Daten erfasst (IP-Adresse, Browser-Typ, Uhrzeit des Zugriffs). Diese Daten werden für die technische Bereitstellung der Website benötigt.</p>
                    </section>

                    <section>
                        <h4 className="font-bold text-white mb-2 uppercase tracking-wider">3. Analyse-Tools</h4>
                        <p>Diese Website nutzt Google Analytics zur Analyse des Nutzerverhaltens. Sie können die Erfassung durch Google Analytics verhindern, indem Sie entsprechende Browser-Einstellungen wählen oder das verfügbare Browser-Add-on zur Deaktivierung installieren.</p>
                    </section>

                    <section>
                        <h4 className="font-bold text-white mb-2 uppercase tracking-wider">4. Ihre Rechte</h4>
                        <p>Sie haben jederzeit das Recht auf Auskunft über Ihre gespeicherten personenbezogenen Daten sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.</p>
                    </section>

                    <section>
                        <h4 className="font-bold text-white mb-2 uppercase tracking-wider">5. Sicherheit</h4>
                        <p>Diese Seite nutzt zum Schutz der Übertragung vertraulicher Inhalte eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers auf "https://" wechselt.</p>
                    </section>

                    <section className="text-[10px] text-white/30 pt-4 border-t border-white/5">
                        <p>Bei Fragen zum Datenschutz wenden Sie sich bitte an: info@fms-marketing.com</p>
                    </section>
                </div>
            </Modal>
        </motion.footer>
    );
}
