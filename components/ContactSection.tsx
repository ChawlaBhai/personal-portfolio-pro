"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
    return (
        <section className="relative z-20 min-h-screen bg-black flex flex-col items-center justify-between py-8 md:py-12 overflow-hidden">

            {/* TOP: "As never seen on" Marquee - Slimmer & No Top Gap */}
            <div className="w-full flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity duration-500">
                <p className="uppercase tracking-[0.3em] text-[10px] md:text-xs text-gray-500">
                    As <span className="text-red-500 font-bold">never</span> seen on
                </p>

                {/* Infinite Marquee */}
                <div className="w-full overflow-hidden flex relative mask-linear-fade">
                    <motion.div
                        className="flex whitespace-nowrap items-center"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    >
                        {/* Repeated list for seamless loop - Removed parent gap, added pr-16/32 to items */}
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="flex gap-16 md:gap-32 items-center text-lg md:text-2xl font-bold text-gray-700 select-none pr-16 md:pr-32">
                                <span className="font-serif">Forbes India</span>
                                <span className="font-sans tracking-tighter">YOURSTORY</span>
                                <span className="font-serif italic">Mint</span>
                                <span className="font-sans">Inc42</span>
                                <span className="font-serif font-black">THE TIMES OF INDIA</span>
                                <span className="font-sans tracking-widest">NDTV</span>
                                <span className="font-serif">CNBC-TV18</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>


            {/* CENTER: Contact Info */}
            <div className="space-y-8 text-center mt-auto mb-auto">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-12">
                    Contact me at your own risk.
                </h2>

                <div className="flex flex-col gap-4 text-xl md:text-2xl text-gray-400 font-light">
                    <a href="mailto:sahajsadhu@gmail.com" className="hover:text-white transition-colors duration-300">
                        sahajsadhu@gmail.com
                    </a>
                    {/* The bold 69 request */}
                    <a href="tel:+917007162269" className="hover:text-white transition-colors duration-300">
                        <span>+91 70071622</span>
                        <span className="text-white">69</span>
                    </a>
                </div>

                <div className="pt-8">
                    <a
                        href="https://www.linkedin.com/in/13sahajchawla/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 border border-white/20 rounded-full text-white text-sm uppercase tracking-widest hover:bg-white/10 hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 backdrop-blur-sm"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>


            {/* BOTTOM: Footer (User's Custom Text) */}
            <footer className="w-full text-center pb-4 text-gray-600 text-xs md:text-sm tracking-wide">
                <p>&copy; 2026 Sahaj Chawla. No rights reserved but andi bandi shandi hai.</p>
            </footer>

        </section>
    );
}
