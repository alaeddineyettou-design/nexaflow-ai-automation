import React, { useState } from 'react';
import { Mail, Phone, Clock, Send, CheckCircle, MapPin } from 'lucide-react';
import AutomationForm from './ui/multistep-form';

const Contact: React.FC = () => {

  return (
    <section id="contact" className="py-20 px-6 bg-slate-900/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 font-semibold text-sm mb-4">
            GET IN TOUCH
          </div>
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
            Start Your Automation Journey
          </h2>
          <p className="text-xl text-slate-400">
            Ready to transform your business? Let's discuss your AI automation needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">Let's Build Something Amazing</h3>
              <p className="text-lg text-slate-400 mb-8">
                Schedule a free consultation to discover how next-generation AI automation 
                can revolutionize your operations and accelerate your growth.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">Email Us</div>
                  <div className="text-slate-400">alaeddine@automationsolutions.bond</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">Call Us</div>
                  <div className="text-slate-400">+49 15560 957826</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">Response Time</div>
                  <div className="text-slate-400">Within 5 minutes</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">Global Presence</div>
                  <div className="text-slate-400">AI Automation Solutions Worldwide</div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-white mb-4">What You'll Get:</h4>
              <ul className="space-y-3">
                {[
                  "Free AI automation assessment",
                  "Custom AI solution roadmap",
                  "ROI projection analysis",
                  "Implementation timeline",
                  "Ongoing support plan"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mr-3" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Multistep Form */}
          <AutomationForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;