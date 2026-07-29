import React, { useState } from 'react';
import { FAQ_DATA } from '../data/mockData';
import { ChevronDown, Sparkles, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 px-4 sm:px-8 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/40 backdrop-blur-md border border-white/60 rounded-full text-xs font-bold uppercase tracking-widest text-slate-600 mb-4 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
            <span>Tanya Jawab</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-title italic text-slate-800 mb-4">
            Pertanyaan Sering Diajukan
          </h2>
          <p className="text-slate-600 font-sans-body text-base sm:text-lg">
            Temukan jawaban langsung seputar pembuatan, pengeditan, dan penyebaran undangan digital.
          </p>
        </div>

        {/* Accordion Items */}
        <div className="space-y-4">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl overflow-hidden transition-all duration-300 border border-white/60"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-800 text-sm sm:text-base font-sans-body hover:text-purple-700 transition-colors"
                >
                  <span>{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full bg-white/60 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-purple-100 text-purple-700' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-slate-600 font-sans-body leading-relaxed border-t border-slate-200/40 pt-4 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
