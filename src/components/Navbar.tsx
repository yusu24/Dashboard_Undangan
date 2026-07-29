import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, ArrowRight, Heart, User, LogOut, ChevronDown, LogIn, UserPlus } from 'lucide-react';

interface NavbarProps {
  onOpenCreateModal: () => void;
  onOpenAuthModal: (mode: 'login' | 'register') => void;
  currentUser: { name: string; email: string; avatar?: string } | null;
  onLogout: () => void;
  onOpenAdminDashboard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenCreateModal, 
  onOpenAuthModal, 
  currentUser, 
  onLogout,
  onOpenAdminDashboard
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

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

        {/* Action Buttons & Auth */}
        <div className="hidden sm:flex items-center gap-3 relative">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="px-3.5 py-1.5 bg-white/80 hover:bg-white text-slate-800 rounded-full text-xs font-semibold shadow-sm border border-slate-200/80 flex items-center gap-2 transition-all"
              >
                {currentUser.avatar ? (
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-6 h-6 rounded-full object-cover border border-purple-300"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-[10px]">
                    {currentUser.name.charAt(0)}
                  </div>
                )}
                <span className="max-w-[100px] truncate">{currentUser.name}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-2xl border border-slate-100 rounded-2xl shadow-xl p-2 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="p-2.5 border-b border-slate-100">
                    <p className="font-bold text-slate-800 truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenAdminDashboard();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-purple-700 bg-purple-50 hover:bg-purple-100 font-bold flex items-center gap-2 transition-colors mb-1"
                    >
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      <span>Admin Dashboard Center</span>
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenCreateModal();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-slate-700 hover:bg-purple-50 hover:text-purple-700 font-medium flex items-center gap-2 transition-colors"
                    >
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      <span>Buat Undangan Baru</span>
                    </button>
                  </div>
                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-medium flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      <span>Keluar (Logout)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuthModal('login')}
                className="px-4 py-2 text-slate-700 hover:text-purple-600 text-xs font-semibold rounded-full hover:bg-white/50 transition-all flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-slate-500" />
                <span>Masuk</span>
              </button>
              <button
                onClick={() => onOpenAuthModal('register')}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full text-xs font-bold shadow-md shadow-purple-500/20 transition-all flex items-center gap-1.5 border border-purple-400/30"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Daftar Gratis</span>
              </button>
            </div>
          )}

          <button
            onClick={onOpenAdminDashboard}
            className="px-3.5 py-2 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border border-purple-300 shadow-sm"
            title="Panel Admin Control Center"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Admin Panel</span>
          </button>

          <button
            onClick={onOpenCreateModal}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-semibold shadow-md shadow-slate-900/10 hover:shadow-xl transition-all duration-300 flex items-center gap-1.5 group border border-slate-700/50"
          >
            <span>Buat Undangan</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-purple-300" />
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

          {currentUser ? (
            <div className="p-3 bg-purple-50/80 rounded-2xl border border-purple-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full border border-purple-300" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-purple-200 text-purple-800 font-bold flex items-center justify-center text-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-xs font-bold text-slate-800">{currentUser.name}</p>
                  <p className="text-[10px] text-slate-500">{currentUser.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="p-2 text-rose-600 hover:bg-rose-100 rounded-xl transition-colors"
                title="Keluar"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuthModal('login');
                }}
                className="py-2.5 px-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Masuk</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuthModal('register');
                }}
                className="py-2.5 px-3 bg-purple-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Daftar Gratis</span>
              </button>
            </div>
          )}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCreateModal();
            }}
            className="mt-1 w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Buat Undangan Digital Sekarang</span>
          </button>
        </div>
      )}
    </header>
  );
};
