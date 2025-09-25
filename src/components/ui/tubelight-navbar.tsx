"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)

  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map(item => {
        const elementId = item.url.replace('#', '');
        const element = document.getElementById(elementId);
        if (element) {
          const rect = element.getBoundingClientRect();
          return {
            name: item.name,
            elementId,
            top: rect.top,
            bottom: rect.bottom,
            height: rect.height
          };
        }
        return null;
      }).filter(Boolean);

      // Find the section that's most visible in the viewport
      const viewportHeight = window.innerHeight;
      const scrollOffset = 100; // Offset for navbar height
      
      let activeName = '';
      let maxVisibility = 0;
      
      sections.forEach(section => {
        if (section) {
          // Check if section is in view considering navbar offset
          const adjustedTop = section.top - scrollOffset;
          const adjustedBottom = section.bottom - scrollOffset;
          
          // Calculate visibility
          const visibleStart = Math.max(0, -adjustedTop);
          const visibleEnd = Math.min(section.height, viewportHeight - Math.max(0, adjustedTop));
          const visibleHeight = Math.max(0, visibleEnd - visibleStart);
          const visibility = visibleHeight / section.height;
          
          // Prioritize sections that are at the top of viewport
          if (adjustedTop <= 0 && adjustedBottom > 0 && visibility > maxVisibility) {
            maxVisibility = visibility;
            activeName = section.name;
          }
        }
      });
      
      // If no section is clearly visible, pick the closest one to top
      if (!activeName && sections.length > 0) {
        let closestDistance = Infinity;
        sections.forEach(section => {
          if (section) {
            const distance = Math.abs(section.top - scrollOffset);
            if (distance < closestDistance) {
              closestDistance = distance;
              activeName = section.name;
            }
          }
        });
      }
      
      if (activeName && activeName !== activeTab) {
        setActiveTab(activeName);
      }
    };

    // Initial check
    handleScroll();
    
    // Add scroll listener with throttling
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [items, activeTab])

  const handleNavClick = (item: NavItem) => {
    setActiveTab(item.name)
    
    // Handle navigation
    if (item.url.startsWith('#')) {
      const elementId = item.url.replace('#', '');
      const element = document.getElementById(elementId);
      if (element) {
        // Calculate offset for fixed navbar
        const navbarHeight = 80; // Approximate navbar height
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        console.warn(`Element with id "${elementId}" not found`);
      }
    } else {
      // Navigate to external page
      window.location.href = item.url
    }
  }

  return (
    <div
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50",
        className,
      )}
    >
      <motion.div 
        className="flex items-center gap-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-2 py-2 shadow-lg"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <motion.button
              key={item.name}
              onClick={() => handleNavClick(item)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300",
                "text-white/70 hover:text-white",
                isActive && "text-white"
              )}
            >
              <div className="flex items-center gap-2">
                <Icon size={18} strokeWidth={2.5} />
                <span className="hidden md:inline">{item.name}</span>
              </div>
              
              {/* تأثير التوهج المتحرك */}
              {isActive && (
                <motion.div
                  layoutId="tubelight"
                  className="absolute inset-0 rounded-full bg-white/20 border border-white/30"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  {/* المصباح المتوهج في الأعلى */}
                  <motion.div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-2 bg-gradient-to-r from-blue-400 via-white to-blue-400 rounded-full shadow-lg"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(59,130,246,0.5)",
                        "0 0 30px rgba(255,255,255,1), 0 0 60px rgba(59,130,246,0.8)",
                        "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(59,130,246,0.5)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* الضوء المنتشر */}
                  <motion.div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/10 rounded-full blur-md"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* توهج إضافي */}
                  <motion.div
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-6 bg-blue-400/20 rounded-full blur-sm"
                    animate={{
                      opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              )}
              
              {/* تأثير hover */}
              <motion.div
                className="absolute inset-0 rounded-full bg-white/5"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}

// Export default for backward compatibility
export default function TubelightNavbar() {
  const { Home, Database, Bot, FileText, Zap, Settings } = require('lucide-react');
  
  const defaultItems = [
    { name: 'Home', url: '#home', icon: Home },
    { name: 'Database', url: '#database', icon: Database },
    { name: 'Workflow', url: '#workflow', icon: Bot },
    { name: 'Features', url: '#features', icon: FileText },
    { name: 'Showcase', url: '#showcase', icon: Zap },
    { name: 'Reviews', url: '#testimonials', icon: Settings },
  ];
  
  return <NavBar items={defaultItems} />;
}