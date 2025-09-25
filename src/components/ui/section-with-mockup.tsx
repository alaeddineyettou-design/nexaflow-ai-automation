// components/ui/section-with-mockup.tsx
'use client';

import React from "react";
import { motion } from "framer-motion";
import { GradientDots } from "./gradient-dots";

interface SectionWithMockupProps {
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    // Optional image URLs (backward compatible)
    primaryImageSrc?: string;
    secondaryImageSrc?: string;
    // Optional custom nodes to fully replace stock images
    primaryNode?: React.ReactNode;
    secondaryNode?: React.ReactNode;
    reverseLayout?: boolean;
}

const SectionWithMockup: React.FC<SectionWithMockupProps> = ({
    title,
    description,
    primaryImageSrc,
    secondaryImageSrc,
    primaryNode,
    secondaryNode,
    reverseLayout = false,
}) => {

    const containerVariants = {
        hidden: {},
        visible: {
             transition: {
                staggerChildren: 0.2,
            }
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as any } },
    };

    const layoutClasses = reverseLayout
        ? "md:grid-cols-2 md:grid-flow-col-dense"
        : "md:grid-cols-2";

    const textOrderClass = reverseLayout ? "md:col-start-2" : "";
    const imageOrderClass = reverseLayout ? "md:col-start-1" : "";


    return (
        <section className="relative py-24 md:py-48 pb-0 overflow-hidden -mb-px" style={{backgroundColor: "rgb(2, 6, 23)"}}>
            {/* Animated Gradient Dots Background */}
            <GradientDots 
                duration={28} 
                colorCycleDuration={8}
                backgroundColor="rgb(2, 6, 23)"
                dotSize={6}
                spacing={14}
                className="opacity-25"
            />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                     className={`grid grid-cols-1 gap-16 md:gap-8 w-full items-center ${layoutClasses}`}
                     variants={containerVariants}
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true, amount: 0.2 }}
                >
                    {/* Text Content */}
                    <motion.div
                        className={`flex flex-col items-start gap-4 mt-10 md:mt-0 max-w-[546px] mx-auto md:mx-0 ${textOrderClass}`}
                        variants={itemVariants}
                    >
                         <div className="space-y-2 md:space-y-1">
                            <h2 className="text-white text-3xl md:text-[40px] font-semibold leading-tight md:leading-[53px]">
                                {title}
                            </h2>
                        </div>

                        <p className="text-[#868f97] text-sm md:text-[15px] leading-6">
                            {description}
                        </p>
                         {/* Optional: Add a button or link here */}
                         {/* <div>
                            <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md">Learn More</button>
                         </div> */}
                    </motion.div>

                    {/* App mockup/Image Content */}
                    <motion.div
                        className={`relative mt-10 md:mt-0 mx-auto ${imageOrderClass} w-full max-w-[300px] md:max-w-[471px]`}
                        variants={itemVariants}
                    >
                        {/* Decorative Background Element */}
                        <motion.div
                             className={`absolute w-[300px] h-[317px] md:w-[472px] md:h-[500px] bg-[#090909] rounded-[32px] z-0`}
                             style={{
                                top: reverseLayout ? 'auto' : '10%',
                                bottom: reverseLayout ? '10%' : 'auto',
                                left: reverseLayout ? 'auto' : '-20%',
                                right: reverseLayout ? '-20%' : 'auto',
                                transform: reverseLayout ? 'translate(0, 0)' : 'translateY(10%)',
                                filter: 'blur(2px)'
                            }}
                            initial={{ y: reverseLayout ? 0 : 0 }}
                            whileInView={{ y: reverseLayout ? -20 : -30 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            {secondaryNode ? (
                                <div className="relative w-full h-full rounded-[32px] overflow-hidden">
                                    {secondaryNode}
                                </div>
                            ) : (
                                <div
                                    className="relative w-full h-full bg-cover bg-center rounded-[32px]"
                                    style={{
                                        backgroundImage: secondaryImageSrc ? `url(${secondaryImageSrc})` : undefined,
                                    }}
                                />
                            )}
                        </motion.div>

                        {/* Main Mockup Card */}
                        <motion.div
                            className="relative w-full h-[405px] md:h-[637px] bg-[#ffffff0a] rounded-[32px] backdrop-blur-[15px] backdrop-brightness-[100%] border-0 z-10 overflow-hidden"
                            initial={{ y: reverseLayout ? 0 : 0 }}
                            whileInView={{ y: reverseLayout ? 20 : 30 }}
                             transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                             viewport={{ once: true, amount: 0.5 }}
                        >
                            <div className="p-0 h-full">
                                <div
                                    className="h-full relative"
                                    style={{
                                        backgroundSize: "100% 100%",
                                    }}
                                >
                                    {primaryNode ? (
                                        <div className="w-full h-full">
                                            {primaryNode}
                                        </div>
                                    ) : (
                                        <div
                                            className="w-full h-full bg-cover bg-center"
                                            style={{
                                                backgroundImage: primaryImageSrc ? `url(${primaryImageSrc})` : undefined,
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};


export default SectionWithMockup;
