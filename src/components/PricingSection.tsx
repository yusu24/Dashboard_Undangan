import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/mockData';
import { PricingPlan } from '../types';
import { Check, Sparkles, Heart, ArrowRight } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (plan: PricingPlan) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-20 sm:py-28 px-4 sm:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/40 backdrop-blur-md border border-white/60 rounded-full text-xs font-bold uppercase tracking-widest text-slate-600 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Tanpa Biaya Tersembunyi</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-title italic text-slate-800 mb-4">
            Pilihan Paket Terjangkau
          </h2>
          <p className="text-slate-600 font-sans-body text-base sm:text-lg">
            Investasi sekali bayar tanpa langganan bulanan. Dapatkan fitur terbaik untuk momen istimewa Anda.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isPopular = plan.popular;
            return (
              <div
                key={plan.id}
                className={`glass-card rounded-[36px] p-8 sm:p-10 flex flex-col justify-between relative transition-all duration-300 ${
                  isPopular
                    ? 'bg-white/70 border-2 border-purple-400 shadow-2xl scale-[1.03] z-10'
                    : 'bg-white/35 border border-white/60'
                }`}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[11px] font-extrabold uppercase tracking-widest rounded-full shadow-lg">
                    {plan.badge}
                  </div>
                )}

                <div>
                  {/* Plan Name & Desc */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold font-sans-body text-slate-800 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans-body">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price display */}
                  <div className="mb-8 pb-6 border-b border-slate-200/60">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-sans-body">
                        {plan.price === 0 ? 'Rp 0' : `Rp ${plan.price.toLocaleString('id-ID')}`}
                      </span>
                      {plan.originalPrice && (
                        <span className="text-xs text-slate-400 line-through font-medium">
                          Rp {plan.originalPrice.toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium mt-1 block">
                      {plan.price === 0 ? 'Gratis 100% Selamanya' : 'Sekali Bayar • Tanpa Biaya Tambahan'}
                    </span>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-3.5 mb-8 text-xs sm:text-sm text-slate-700 font-sans-body">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full py-4 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                    isPopular
                      ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-purple-900/20'
                      : 'bg-white/80 hover:bg-white text-slate-800 border border-white'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-purple-300" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 bg-white/30 backdrop-blur-md border border-white/60 rounded-3xl p-6 text-center text-xs text-slate-600 max-w-2xl mx-auto flex items-center justify-center gap-3">
          <Sparkles className="w-5 h-5 text-purple-600 shrink-0" />
          <p>
            Membutuhkan kustomisasi khusus seperti tema korporat atau event besar? <a href="#faq" className="text-purple-700 font-bold underline">Hubungi CS WhatsApp kami</a> untuk konsultasi gratis.
          </p>
        </div>

      </div>
    </section>
  );
};
