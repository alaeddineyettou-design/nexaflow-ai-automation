import React from 'react';
import { useAnimate } from 'framer-motion';
import { Mail, MessageCircle, Zap } from 'lucide-react';
import { HighlightGroup, HighlighterItem, Particles } from './ui/highlighter';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

export const ContactDemo: React.FC = () => {
  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    animate(
      [
        ["#pointer", { left: 200, top: 60 }, { duration: 0 }],
        ["#branding", { opacity: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: 50, top: 102 },
          { at: "+0.5", duration: 0.5, ease: "easeInOut" },
        ],
        ["#branding", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
        ["#graphic-design", { opacity: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: 224, top: 170 },
          { at: "+0.5", duration: 0.5, ease: "easeInOut" },
        ],
        ["#graphic-design", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
        ["#web-app", { opacity: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: 88, top: 198 },
          { at: "+0.5", duration: 0.5, ease: "easeInOut" },
        ],
        ["#web-app", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
        ["#ui-ux", { opacity: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: 200, top: 60 },
          { at: "+0.5", duration: 0.5, ease: "easeInOut" },
        ],
        ["#ui-ux", { opacity: 0.5 }, { at: "-0.3", duration: 0.1 }],
      ],
      {
        repeat: Number.POSITIVE_INFINITY,
      },
    );
  }, [animate]);

  const handleCalBooking = () => {
    window.open('https://cal.com/alae-automation/ai-automation-business', '_blank');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/4915560957826', '_blank');
  };

  const handleEmail = () => {
    window.open('mailto:contact@alae-automation.com', '_blank');
  };

  return (
    <section className="relative mx-auto mb-20 mt-6 max-w-5xl px-4">
      <HighlightGroup className="group h-full">
        <div className="group/item h-full" data-aos="fade-down">
          <HighlighterItem className="rounded-3xl p-6">
            <div className="relative z-20 h-full overflow-hidden rounded-3xl border border-slate-800 bg-black">
              <Particles
                className="absolute inset-0 -z-10 opacity-10 transition-opacity duration-1000 ease-in-out group-hover/item:opacity-100"
                quantity={200}
                color="#10b981"
                vy={-0.2}
              />
              
              <div className="flex justify-center">
                <div className="flex h-full flex-col justify-center gap-10 p-4 md:h-[300px] md:flex-row">
                  {/* Left side - Animated Design Elements */}
                  <div
                    className="relative mx-auto h-[270px] w-[300px] md:h-[270px] md:w-[300px]"
                    ref={scope}
                  >
                    {/* Center AI/Automation Icon */}
                    <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600">
                      <Zap className="h-6 w-6 text-white" />
                    </div>

                    {/* Animated Service Tags */}
                    <div
                      id="ui-ux"
                      className="absolute bottom-12 left-14 rounded-3xl border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs text-white opacity-50 transition-opacity"
                    >
                      AI Automation
                    </div>
                    <div
                      id="graphic-design"
                      className="absolute left-2 top-20 rounded-3xl border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs text-white opacity-50 transition-opacity"
                    >
                      Process Optimization
                    </div>
                    <div
                      id="web-app"
                      className="absolute bottom-20 right-1 rounded-3xl border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs text-white opacity-50 transition-opacity"
                    >
                      Business Intelligence
                    </div>
                    <div
                      id="branding"
                      className="absolute right-12 top-10 rounded-3xl border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs text-white opacity-50 transition-opacity"
                    >
                      Custom Solutions
                    </div>

                    {/* Animated Cursor */}
                    <div id="pointer" className="absolute">
                      <svg
                        width="16.8"
                        height="18.2"
                        viewBox="0 0 12 13"
                        className="fill-emerald-500"
                        stroke="white"
                        strokeWidth="1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 5.50676L0 0L2.83818 13L6.30623 7.86537L12 5.50676V5.50676Z"
                        />
                      </svg>
                      <span className="relative -top-1 left-3 rounded-3xl bg-emerald-500 px-2 py-1 text-xs text-white">
                        AI
                      </span>
                    </div>
                  </div>

                  {/* Right side - Contact Information */}
                  <div className="-mt-20 flex h-full flex-col justify-center p-2 md:-mt-4 md:ml-10 md:w-[400px]">
                    <div className="flex flex-col items-start">
                      <h3 className="mt-6 pb-1 font-bold text-white">
                        <span className="text-2xl md:text-4xl">
                          Any questions about AI Automation?
                        </span>
                      </h3>
                    </div>
                    <p className="mb-6 text-slate-400">
                      Feel free to reach out to me!
                    </p>
                    
                    {/* Contact Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <Button 
                        onClick={handleCalBooking}
                        className="bg-white text-black hover:bg-gray-100"
                      >
                        Book a call
                      </Button>
                      
                      <button
                        onClick={handleEmail}
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-md border border-slate-600 bg-transparent hover:bg-slate-800 transition-colors"
                        )}
                      >
                        <Mail className="h-5 w-5 text-white" />
                      </button>
                      
                      <button
                        onClick={handleWhatsApp}
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-md border border-slate-600 bg-transparent hover:bg-slate-800 transition-colors"
                        )}
                      >
                        <MessageCircle className="h-4 w-4 text-emerald-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </HighlighterItem>
        </div>
      </HighlightGroup>
    </section>
  );
};
