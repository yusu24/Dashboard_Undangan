import React from 'react';
import { Sparkles, Heart, MessageCircle, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 pt-16 pb-12 px-4 sm:px-8 border-t border-white/40 bg-white/30 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
        
        {/* Brand info */}
        <div className="text-center md:text-left space-y-3 max-w-sm">
          <a href="#" className="inline-flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-rose-400 p-0.5 shadow-md">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-purple-600">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-800 font-sans">
              INVITRA<span className="text-purple-500 font-serif italic">.</span>
            </span>
          </a>
          <p className="text-xs text-slate-500 font-sans-body leading-relaxed">
            Platform pembuat website undangan digital interaktif & elegan untuk pernikahan, ulang tahun, & acara istimewa Anda.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600 uppercase tracking-widest">
          <a href="#templates" className="hover:text-purple-600 transition-colors">Templates</a>
          <a href="#live-studio" className="hover:text-purple-600 transition-colors">Demo Live</a>
          <a href="#features" className="hover:text-purple-600 transition-colors">Fitur</a>
          <a href="#pricing" className="hover:text-purple-600 transition-colors">Paket Harga</a>
          <a href="#faq" className="hover:text-purple-600 transition-colors">FAQ</a>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="p-3.5 bg-white/80 hover:bg-white text-slate-700 rounded-2xl border border-white/80 shadow-md transition-all flex items-center justify-center gap-2 text-xs font-bold"
        >
          <span>Ke Atas</span>
          <ArrowUp className="w-4 h-4 text-purple-600" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200/50 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>&copy; 2026 INVITRA. Crafting digital emotions with Frosted Elegance.</p>
        <p className="flex items-center gap-1">
          <span>Made with</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>for Special Moments in Indonesia</span>
        </p>
      </div>

      {/* Floating WhatsApp CS Button */}
      <a
        href="https://wa.me/6281234567890?text=Halo%20INVITRA,%20saya%20ingin%20tanya%20mengenai%20undangan%20digital"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl flex items-center gap-2 text-xs font-bold transition-all hover:scale-105 group border border-emerald-400"
      >
        <MessageCircle className="w-5 h-5 fill-white text-emerald-500" />
        <span className="hidden sm:inline">Tanya CS WhatsApp</span>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-200 animate-ping"></span>
      </a>
    </footer>
  );
};
