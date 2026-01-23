"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Overlay() {
    const { scrollYProgress } = useScroll();

    // BEAT 1: INTRO (Automatic, then fade out on scroll)
    const opacity1Exit = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
    const y1Exit = useTransform(scrollYProgress, [0, 0.05], [0, -50]);


    // BEAT 2: IDENTITY
    const opacity2a = useTransform(scrollYProgress, [0.12, 0.15, 0.18, 0.22], [0, 1, 1, 0]);
    const x2a = useTransform(scrollYProgress, [0.12, 0.22], [-30, 0]);

    const opacity2b = useTransform(scrollYProgress, [0.25, 0.28, 0.33, 0.36], [0, 1, 1, 0]);
    const x2b = useTransform(scrollYProgress, [0.25, 0.36], [30, 0]);


    // BEAT 3: TIMELINE
    const start3 = 0.38;
    const op3_container_in = useTransform(scrollYProgress, [0.38, 0.42], [0, 1]);
    const op3_exit = useTransform(scrollYProgress, [0.62, 0.66], [1, 0]);

    const lineJob = useTransform(scrollYProgress, [0.38, 0.60], ["0%", "100%"]);

    const op3_1_in = useTransform(scrollYProgress, [0.38, 0.41], [0, 1]);
    const op3_2_in = useTransform(scrollYProgress, [0.44, 0.47], [0, 1]);
    const op3_3_in = useTransform(scrollYProgress, [0.50, 0.53], [0, 1]);
    const op3_4_in = useTransform(scrollYProgress, [0.56, 0.59], [0, 1]);


    // BEAT 4: ACHIEVEMENTS
    const op4 = useTransform(scrollYProgress, [0.78, 0.82, 0.98, 0.995], [0, 1, 1, 0]);
    const y4 = useTransform(scrollYProgress, [0.78, 0.995], [0, -40]);

    return (
        <div className="fixed inset-0 pointer-events-none z-10 flex flex-col justify-center items-center text-[#ededed]">

            {/* 🟢 BEAT 1: INTRO */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                style={{ opacity: opacity1Exit, y: y1Exit }}
                className="absolute text-center top-[35%] md:top-[40%]"
            >
                <h1 className="text-4xl md:text-9xl font-bold tracking-tighter px-4">Sahaj Chawla</h1>
                <p className="text-sm md:text-3xl mt-2 md:mt-4 font-light tracking-[0.5em] uppercase opacity-90">Majdoor</p>
            </motion.div>


            {/* 🟢 BEAT 2: IDENTITY 
          Mobile: top-[55%]
          Desktop: top-[25%]
      */}
            <motion.div
                style={{ opacity: opacity2a, x: x2a }}
                className="absolute left-6 md:left-24 top-[55%] md:top-[25%] text-left"
            >
                <h2 className="text-4xl md:text-7xl font-bold">22.</h2>
                <h3 className="text-2xl md:text-5xl font-light">2x Founder</h3>
            </motion.div>

            <motion.div
                style={{ opacity: opacity2b, x: x2b }}
                className="absolute right-6 md:right-24 bottom-[35%] md:bottom-[30%] text-right"
            >
                <h3 className="text-2xl md:text-5xl font-medium leading-tight max-w-[200px] md:max-w-lg ml-auto">
                    On my way onto the <br /> next big thing.
                </h3>
            </motion.div>


            {/* 🟢 BEAT 3: TIMELINE 
          Mobile: Bottom-Right.
          Desktop: Top-Right (Perfect).
      */}
            <motion.div
                style={{ opacity: op3_exit }}
                className="absolute w-full h-screen top-0 left-0"
            >
                <motion.div
                    style={{ opacity: op3_container_in }}
                    className="absolute bottom-[10%] right-4 md:bottom-auto md:top-[15%] md:right-[5%] w-[60%] md:w-full max-w-md border-l md:border-l-2 border-white/20 pl-4 md:pl-8 space-y-6 md:space-y-12 py-2 md:py-4"
                >
                    {/* Animated Line */}
                    <div className="absolute left-[-1px] md:left-[-2px] top-0 bottom-0 w-0.5 bg-transparent">
                        <motion.div
                            style={{ height: lineJob }}
                            className="w-full bg-white origin-top"
                        />
                    </div>

                    <motion.div style={{ opacity: op3_1_in }} className="relative">
                        <span className="absolute -left-[21px] md:-left-[41px] top-1 md:top-2 w-3 h-3 md:w-5 md:h-5 bg-white/20 rounded-full border-2 md:border-4 border-[#121212]"></span>
                        <span className="block text-[10px] md:text-sm text-gray-400 mb-0.5 md:mb-1 font-mono">2021</span>
                        <h4 className="text-sm md:text-3xl font-medium">Joined Christ University, Bangalore</h4>
                    </motion.div>

                    <motion.div style={{ opacity: op3_2_in }} className="relative">
                        <span className="absolute -left-[21px] md:-left-[41px] top-1 md:top-2 w-3 h-3 md:w-5 md:h-5 bg-white/20 rounded-full border-2 md:border-4 border-[#121212]"></span>
                        <span className="block text-[10px] md:text-sm text-gray-400 mb-0.5 md:mb-1 font-mono">2022</span>
                        <h4 className="text-sm md:text-3xl font-medium">Founded Gulaab Jamoon Experiences</h4>
                    </motion.div>

                    <motion.div style={{ opacity: op3_3_in }} className="relative">
                        <span className="absolute -left-[21px] md:-left-[41px] top-1 md:top-2 w-3 h-3 md:w-5 md:h-5 bg-white/20 rounded-full border-2 md:border-4 border-[#121212]"></span>
                        <span className="block text-[10px] md:text-sm text-gray-400 mb-0.5 md:mb-1 font-mono">2023</span>
                        <h4 className="text-sm md:text-3xl font-medium">Founded PreciousLy</h4>
                    </motion.div>

                    <motion.div style={{ opacity: op3_4_in }} className="relative">
                        <span className="absolute -left-[21px] md:-left-[41px] top-1 md:top-2 w-3 h-3 md:w-5 md:h-5 bg-white rounded-full border-2 md:border-4 border-[#121212] shadow-[0_0_10px_white] md:shadow-[0_0_15px_white]"></span>
                        <span className="block text-[10px] md:text-sm text-gray-400 mb-0.5 md:mb-1 font-mono">2025</span>
                        <h4 className="text-sm md:text-3xl font-bold text-white">Scaled both to ₹1Cr+ ARR</h4>
                    </motion.div>
                </motion.div>
            </motion.div>


            {/* 🟢 BEAT 4: ACHIEVEMENTS */}
            <motion.div
                style={{ opacity: op4, y: y4 }}
                className="absolute w-full h-screen top-0 left-0"
            >
                {/* =======================
            MOBILE LAYOUT (Tight Stacks at Bottom)
            ** SWAPPED LOWER ITEMS TO BALANCE HEIGHT **
           ======================= */}

                {/* Bottom Left Group */}
                <div className="md:hidden absolute bottom-4 left-4 flex flex-col gap-6 max-w-[45%]">
                    {/* Top Item: Winner (Short) */}
                    <div>
                        <p className="text-xl font-bold text-emerald-400 leading-tight">Winner</p>
                        <p className="text-sm text-gray-400 leading-tight">India Sustainability Startathon 2023</p>
                    </div>
                    {/* Bottom Item: 100+ Certificates (Long/Tall) - Moved here from Right */}
                    <div>
                        <p className="text-xl font-bold text-amber-500 leading-tight text-balance">100+ Certificates</p>
                        <p className="text-sm text-gray-400 leading-tight">Of participation. No wins.</p>
                    </div>
                </div>

                {/* Bottom Right Group */}
                <div className="md:hidden absolute bottom-4 right-4 flex flex-col gap-6 text-right max-w-[45%]">
                    {/* Top Item: Represented India (Tall) */}
                    <div>
                        <p className="text-xl font-bold text-blue-400 leading-tight">Represented India</p>
                        <p className="text-sm text-gray-400 leading-tight">ACIYLS 2023, Singapore</p>
                    </div>
                    {/* Bottom Item: Failed (Short) - Moved here from Left */}
                    <div>
                        <p className="text-xl font-bold text-red-500 leading-tight">Failed</p>
                        <p className="text-sm text-gray-400 leading-tight">At 3 previous ventures</p>
                    </div>
                </div>


                {/* =======================
            DESKTOP LAYOUT (Distributed Corners)
            - Preserved exactly as "Perfect" state
           ======================= */}

                {/* Top Left */}
                <div className="hidden md:block absolute top-[15%] left-24 max-w-sm">
                    <p className="text-3xl font-bold text-emerald-400 leading-tight">Winner</p>
                    <p className="text-xl text-gray-400 leading-tight">India Sustainability Startathon 2023</p>
                </div>

                {/* Bottom Left */}
                <div className="hidden md:block absolute bottom-[20%] left-24 max-w-sm">
                    <p className="text-3xl font-bold leading-tight text-red-500">Failed</p>
                    <p className="text-xl text-gray-400 leading-tight">At 3 previous ventures</p>
                </div>

                {/* Top Right */}
                <div className="hidden md:block absolute top-[22%] right-24 max-w-sm text-right">
                    <p className="text-3xl font-bold leading-tight text-blue-400">Represented India</p>
                    <p className="text-xl text-gray-400 leading-tight">ACIYLS 2023, Singapore</p>
                </div>

                {/* Bottom Right */}
                <div className="hidden md:block absolute bottom-[15%] right-24 max-w-sm text-right">
                    <p className="text-3xl font-bold leading-tight text-amber-500">100+ Certificates</p>
                    <p className="text-xl text-gray-500 leading-tight">Of participation. No wins.</p>
                </div>

            </motion.div>

        </div>
    );
}
