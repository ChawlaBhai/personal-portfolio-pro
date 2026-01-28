"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Logo() {
    const [clickCount, setClickCount] = useState(0);
    const [showMeow, setShowMeow] = useState(false);

    /* 
   * "Clicking is useless but if the user is clicking multiple times..."
   * Implementing a click threshold (Easter Egg style).
   */
    const handleClick = () => {
        // Increment local counter
        const newCount = clickCount + 1;
        setClickCount(newCount);

        // Threshold: 5 clicks to activate "Meow"
        // Reset count after activation so they have to click 5 times again? 
        // Or just show it every click after 5?
        // Let's show it once they hit 5, and keep showing it if they keep clicking?
        // "clicking multiple times... pop up... for 2 seconds"

        if (newCount >= 3) {
            setShowMeow(true);

            // Auto hide after 2s
            setTimeout(() => {
                setShowMeow(false);
                // Optional: Reset count to require "multiple times" again? 
                // setClickCount(0); -> User didn't specify, but resetting makes it re-playable as an easter egg.
                // Let's reset to 0 after the popup shows to strictly follow "clicking multiple times" each time.
                setClickCount(0);
            }, 2000);
        }
    };

    return (
        <div className="fixed top-4 left-4 z-50 flex items-center gap-2">
            <div className="relative">
                <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    onClick={handleClick}
                    className="cursor-pointer"
                >
                    {/* Using a simple img tag or Next Image if configured, assuming public/logo.png exists */}
                    <div className="w-10 h-10 md:w-16 md:h-16 relative">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            fill
                            className="object-contain rounded-full"
                        />
                    </div>
                </motion.div>

                {/* Meow Popup */}
                <AnimatePresence>
                    {showMeow && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute left-full top-0 ml-3 bg-white text-black px-4 py-2 rounded-lg shadow-lg whitespace-nowrap text-sm md:text-base font-bold pointer-events-none"
                        >
                            <div className="absolute left-0 top-1/2 -translate-x-1.5 -translate-y-1/2 w-3 h-3 bg-white rotate-45"></div>
                            Main kya laadlee, MEOWWW!
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
