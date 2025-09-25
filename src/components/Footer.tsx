import React, { useState } from 'react';
import { Zap, Mail, Phone, MapPin, X } from 'lucide-react';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import CookieSettings from './CookieSettings';

const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'cookies' | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openModal = (modalType: 'privacy' | 'terms' | 'cookies') => {
    console.log('Opening modal:', modalType);
    setActiveModal(modalType);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = 'unset';
  };

  const renderModalContent = () => {
    console.log('Rendering modal content for:', activeModal);
    switch (activeModal) {
      case 'privacy':
        return <PrivacyPolicy />;
      case 'terms':
        return <TermsOfService />;
      case 'cookies':
        return <CookieSettings onClose={closeModal} />;
      default:
        return null;
    }
  };

  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Features", id: "features" },
        { name: "Solutions", id: "solutions" },
        { name: "Technology", id: "technology" },
        { name: "Pricing", id: "pricing" },
        { name: "Documentation", id: "docs" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", id: "about" },
        { name: "Careers", id: "careers" },
        { name: "Blog", id: "blog" },
        { name: "Press", id: "press" },
        { name: "Partners", id: "partners" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", id: "help" },
        { name: "Contact", id: "contact" },
        { name: "Status", id: "status" },
        { name: "Security", id: "security" },
        { name: "Privacy", id: "privacy" }
      ]
    }
  ];

  return (
    <>
      <footer className="bg-slate-950 border-t border-blue-500/20">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <Zap className="w-10 h-10 text-blue-400" />
                  <div className="absolute inset-0 w-10 h-10 bg-blue-400/20 rounded-full blur-xl" />
                </div>
                <span className="text-2xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  AUTOMATION
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                Expert AI automation solutions by Alaeddine - Transforming businesses with cutting-edge technology and professional expertise.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-400">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:alaeddine@automationsolutions.bond" className="hover:text-blue-400 transition-colors">
                    alaeddine@automationsolutions.bond
                  </a>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+4915560957826" className="hover:text-blue-400 transition-colors">
                    +49 15560 957826
                  </a>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <MapPin className="w-4 h-4" />
                  <span>Germany & Global Operations</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-white font-bold mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button
                        onClick={() => scrollToSection(link.id)}
                        className="text-slate-400 hover:text-blue-400 transition-colors"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-500/10 py-6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-400 text-center md:text-left">
                &copy; 2025 NexaFlow by Alaeddine. All rights reserved. | Professional AI Automation Solutions - Germany & Global
              </p>
              <div className="flex gap-6">
                <button 
                  onClick={() => {
                    console.log('Privacy Policy button clicked!');
                    openModal('privacy');
                  }}
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </button>
                <button 
                  onClick={() => openModal('terms')}
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  Terms of Service
                </button>
                <button 
                  onClick={() => openModal('cookies')}
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  Cookie Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <button
        onClick={() => scrollToSection('contact')}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all duration-300 hover:shadow-blue-500/50 z-50 group"
        aria-label="Contact us"
      >
        <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
      </button>

      {/* Simple Reliable Modal */}
      {activeModal && (
        <div 
          className="fixed inset-0 z-[99999] bg-black bg-opacity-75 flex items-center justify-center p-4"
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Simple Backdrop */}
          <div 
            className="absolute inset-0 bg-black opacity-75"
            onClick={closeModal}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          />
          
          {/* Simple Modal Content */}
          <div 
            className="relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            style={{ 
              position: 'relative',
              zIndex: 100000,
              maxWidth: '90vw',
              maxHeight: '90vh',
              backgroundColor: 'white'
            }}
          >
            {/* Enhanced Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  {activeModal === 'privacy' && 'Privacy Policy'}
                  {activeModal === 'terms' && 'Terms of Service'} 
                  {activeModal === 'cookies' && 'Cookie Settings'}
                </h2>
              </div>
              <button
                onClick={closeModal}
                className="group p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all duration-200 hover:scale-110"
                title="Close"
              >
                <X className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
              </button>
            </div>
            
            {/* Enhanced Content */}
            <div className="overflow-y-auto max-h-[calc(95vh-88px)] scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
              {renderModalContent()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;