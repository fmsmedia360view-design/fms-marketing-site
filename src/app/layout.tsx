import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import { LazyMotion, domAnimation } from "framer-motion";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["300", "400", "500"] });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", weight: ["400", "700", "900"] });

export const metadata: Metadata = {
    title: "FMS Marketing — Expertise seit 2009",
    description: "High-End Marketing & KI-Automatisierung",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${inter.variable} ${montserrat.variable} antialiased bg-black`}>
                <LazyMotion features={domAnimation}>
                    {children}
                    <CookieBanner />
                </LazyMotion>
            </body>
        </html>
    );
}
