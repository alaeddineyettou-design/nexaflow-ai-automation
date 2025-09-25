"use client";

import { motion } from "framer-motion";
interface HandWrittenTitleProps {
    title?: string;
    subtitle?: string;
}

function HandWrittenTitle({
    title = "Hand Written",
    subtitle = "Optional subtitle",
}: HandWrittenTitleProps) {
    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
        },
    };

    return (
        <div className="relative w-full max-w-6xl mx-auto py-12">
            <div className="absolute inset-0">
                <motion.svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 1400 400"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    className="w-full h-full"
                >
                    <title>HandWritten Animation</title>
                    <motion.path
                        d="M 100 80 
                           C 300 50, 500 50, 700 80
                           C 900 110, 1100 110, 1300 80
                           C 1300 120, 1100 150, 900 120
                           C 700 90, 500 90, 300 120
                           C 100 150, 100 120, 100 80"
                        fill="none"
                        strokeWidth="8"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        variants={draw}
                        transition={{ 
                            pathLength: { duration: 2.5 },
                            opacity: { duration: 0.5 }
                        }}
                        className="text-white opacity-60"
                    />
                </motion.svg>
            </div>
            <div className="relative text-center z-10 flex flex-col items-center justify-center px-4">
                <motion.h2
                    className="text-4xl md:text-6xl text-white font-bold tracking-tighter mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    {title.includes("Talk to AI") ? (
                        <>
                            Talk to AI,
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                Build Automations
                            </span>
                        </>
                    ) : (
                        title
                    )}
                </motion.h2>
                {subtitle && (
                    <motion.p
                        className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ delay: 1, duration: 0.8 }}
                    >
                        {subtitle}
                    </motion.p>
                )}
            </div>
        </div>
    );
}

export { HandWrittenTitle }