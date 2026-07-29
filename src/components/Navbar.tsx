import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, ArrowRight, Heart } from 'lucide-react';

interface NavbarProps {
  onOpenCreateModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCreateModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 pt-4">
      <div 
        className={`max-w-7xl mx-auto rounded-full transition-all duration-300 px-6 sm:px-8 py-3.5 flex items-center justify-between ${
          scrolled 
            ? 'bg-white/60 backdrop-blur-2xl border border-white/80 shadow-lg shadow-purple-900/5' 
            : 'bg-white/30 backdrop-blur-md border border-white/40 shadow-sm'
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 via-pink-400 to-rose-300 p-0.5 shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-purple-600">
              <Sparkles className="w-4 h-4 fill-purple-200 text-purple-600" />
            </div>
          </div>
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 font-sans">
            INVITRA<span className="text-purple-500 font-serif italic">.</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs sm:text-sm font-medium text-slate-600 uppercase tracking-widest">
          <a href="#templates" className="hover:text-purple-600 transition-colors">Templates</a>
          <a href="#live-studio" className="hover:text-purple-600 transition-colors flex items-center gap-1">
            <span>Demo Live</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          </a>
          <a href="#features" className="hover:text-purple-600 transition-colors">Fitur</a>
          <a href="#pricing" className="hover:text-purple-600 transition-colors">Harga</a>
          <a href="#faq" className="hover:text-purple-600 transition-colors">FAQ</a>
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenCreateModal}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs sm:text-sm font-semibold shadow-md shadow-slate-900/10 hover:shadow-xl transition-all duration-300 flex items-center gap-2 group border border-slate-700/50"
          >
            <span>Buat Undangan</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-purple-300" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-purple-600 rounded-full bg-white/40 border border-white/60"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-7xl mx-auto rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/80 shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <a 
            href="#templates" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-700 font-medium py-2 border-b border-slate-100 flex items-center justify-between"
          >
            <span>Pilihan Template</span>
            <span className="text-xs bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full font-bold">12+ Tema</span>
          </a>
          <a 
            href="#live-studio" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-700 font-medium py-2 border-b border-slate-100 flex items-center justify-between"
          >
            <span>Live Interactive Preview</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </a>
          <a 
            href="#features" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-700 font-medium py-2 border-b border-slate-100"
          >
            Fitur Unggulan
          </a>
          <a 
            href="#pricing" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-700 font-medium py-2 border-b border-slate-100"
          >
            Paket Harga & Promo
          </a>
          <a 
            href="#faq" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-700 font-medium py-2"
          >
            Tanya Jawab (FAQ)
          </a>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCreateModal();
            }}
            className="mt-2 w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Buat Undangan Digital Sekarang</span>
          </button>
        </div>
      )}
    </header>
  );
};
