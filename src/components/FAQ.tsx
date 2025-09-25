import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is the typical ROI for automation projects?",
      answer: "Most of our clients see 200-400% ROI within the first year. The exact return depends on your current processes and automation scope, but cost savings typically range from 25-60% of operational expenses."
    },
    {
      question: "How long does implementation take?",
      answer: "Simple automations can be live within 1-2 weeks. Complex enterprise implementations typically take 4-12 weeks depending on the number of systems and processes involved."
    },
    {
      question: "Do I need technical knowledge to use the automations?",
      answer: "No! We design all automations to be user-friendly. We provide comprehensive training and documentation, plus ongoing support to ensure your team can manage the systems confidently."
    },
    {
      question: "What's the difference between Make.com and n8n?",
      answer: "Make.com is cloud-based with a visual interface and 5000+ pre-built integrations - perfect for quick deployment. n8n is self-hosted, offering complete data control and custom development options - ideal for enterprises with security requirements."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer comprehensive support including initial training, documentation, 24/7 technical support, regular check-ins, and ongoing optimization to ensure your automations continue delivering value."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-6 bg-slate-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-400">
            Everything you need to know about our automation services
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-900/80 backdrop-blur-xl border border-blue-500/20 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-400/50"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <HelpCircle className="w-6 h-6 text-blue-400 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                </div>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-400" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <div className="pl-10">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;