import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Alaeddine transformed our e-commerce operations completely. His automation expertise saved us countless hours and improved our order processing efficiency by 300%. Professional and reliable service!",
      author: "Marcus Weber",
      title: "Managing Director, E-commerce Solutions GmbH",
      avatar: "MW",
      rating: 5
    },
    {
      quote: "Working with Alaeddine was a game-changer for our business. His Make.com and n8n expertise helped us automate complex workflows that we thought were impossible to streamline. Highly recommended!",
      author: "Anna Schmidt", 
      title: "Operations Manager, Digital Marketing Agency",
      avatar: "AS",
      rating: 5
    },
    {
      quote: "Professional, responsive, and extremely knowledgeable. Alaeddine didn't just deliver automation - he provided strategic insights that transformed our entire business process. Outstanding results!",
      author: "David Thompson",
      title: "CTO, SaaS Platform", 
      avatar: "DT",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 px-6 bg-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Client Success Stories
          </h2>
          <p className="text-xl text-gray-400">
            Real results from businesses I've helped transform
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-slate-900/80 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <Quote className="w-10 h-10 text-blue-400 mb-6 opacity-50" />
                
                <p className="text-lg text-gray-300 leading-relaxed mb-8 italic">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white">{testimonial.author}</div>
                    <div className="text-gray-400 text-sm">{testimonial.title}</div>
                    <div className="flex gap-1 mt-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;