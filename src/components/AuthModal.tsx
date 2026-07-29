import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, Mail, Lock, User, Eye, EyeOff, Sparkles, CheckCircle2, 
  ArrowRight, ShieldCheck, Heart
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onLoginSuccess: (userData: { name: string; email: string; avatar?: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onLoginSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  
  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Status
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (mode === 'register') {
      if (!fullName.trim()) {
        setErrorMessage('Silakan masukkan nama lengkap Anda.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Konfirmasi kata sandi tidak cocok.');
        return;
      }
      if (!agreeTerms) {
        setErrorMessage('Anda harus menyetujui Syarat & Ketentuan Layanan.');
        return;
      }
    }

    if (!email.includes('@')) {
      setErrorMessage('Silakan masukkan alamat email yang valid.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Kata sandi minimal 6 karakter.');
      return;
    }

    setLoading(true);

    // Simulate API Auth Request
    setTimeout(() => {
      setLoading(false);
      const user = {
        name: fullName || (email.split('@')[0] ? email.split('@')[0].toUpperCase() : 'Pengguna INVITRA'),
        email: email,
        avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150`
      };

      if (mode === 'register') {
        setSuccessMessage('Pendaftaran akun berhasil! Mengalihkan ke dashboard...');
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } else {
        setSuccessMessage('Selamat datang kembali! Login berhasil.');
      }

      setTimeout(() => {
        onLoginSuccess(user);
        onClose();
        // Reset form
        setPassword('');
        setConfirmPassword('');
        setSuccessMessage('');
      }, 1200);
    }, 1000);
  };

  const handleGoogleAuth = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const user = {
        name: 'Gita Permata',
        email: 'gitapermata@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
      };
      setSuccessMessage('Berhasil masuk dengan Akun Google!');
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      setTimeout(() => {
        onLoginSuccess(user);
        onClose();
      }, 1000);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Frosted Glass Container */}
      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-2xl border border-white/80 rounded-[36px] shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Background Mesh Accents */}
        <div className="absolute -top-20 -left-20 w-52 h-52 bg-purple-200/50 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-52 h-52 bg-pink-200/50 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Branding */}
        <div className="text-center mb-6 relative z-10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 via-pink-400 to-rose-300 p-0.5 mx-auto mb-3 shadow-md shadow-purple-500/20">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-purple-600">
              <Sparkles className="w-5 h-5 fill-purple-200 text-purple-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-800 font-sans-body">
            INVITRA<span className="text-purple-500 font-serif italic">.</span>
          </h3>
          <p className="text-xs text-slate-500 font-sans-body mt-1">
            {mode === 'login' 
              ? 'Masuk ke dashboard untuk mengelola undangan digital Anda' 
              : 'Buat akun gratis & mulai desain undangan impian Anda'}
          </p>
        </div>

        {/* Login / Register Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-slate-100/80 rounded-2xl mb-6 text-xs font-bold relative z-10 border border-slate-200/60">
          <button
            onClick={() => {
              setMode('login');
              setErrorMessage('');
            }}
            className={`py-2.5 rounded-xl transition-all ${
              mode === 'login'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Masuk (Login)
          </button>
          <button
            onClick={() => {
              setMode('register');
              setErrorMessage('');
            }}
            className={`py-2.5 rounded-xl transition-all ${
              mode === 'register'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Daftar (Register)
          </button>
        </div>

        {/* Google SSO Button */}
        <div className="mb-5 relative z-10">
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={loading}
            className="w-full py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 rounded-2xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 hover:border-slate-300"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Lanjutkan dengan Akun Google</span>
          </button>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-slate-200"></div>
            <span className="px-3 text-[10px] uppercase font-bold text-slate-400">Atau Email</span>
            <div className="flex-1 border-t border-slate-200"></div>
          </div>
        </div>

        {/* Error / Success Banners */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 relative z-10">
          {mode === 'register' && (
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Nama Lengkap</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nama Lengkap Anda"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Alamat Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Kata Sandi</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Ulangi Kata Sandi</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          )}

          {/* Options Checkboxes */}
          {mode === 'login' ? (
            <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-purple-400"
                />
                <span>Ingat Saya</span>
              </label>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Link reset kata sandi telah dikirimkan ke email Anda.'); }} className="text-purple-700 font-bold hover:underline">
                Lupa Kata Sandi?
              </a>
            </div>
          ) : (
            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer text-[11px] text-slate-600">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded text-purple-600 focus:ring-purple-400"
                />
                <span>
                  Saya menyetujui <a href="#" onClick={(e) => { e.preventDefault(); alert('Ketentuan Layanan INVITRA menjamin privasi dan keamanan data Anda.'); }} className="text-purple-700 font-bold underline">Syarat & Ketentuan</a> serta Kebijakan Privasi INVITRA.
                </span>
              </label>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <span>Memproses...</span>
            ) : (
              <>
                <span>{mode === 'login' ? 'Masuk ke Akun' : 'Daftar Sekarang'}</span>
                <ArrowRight className="w-4 h-4 text-purple-300" />
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-6 text-center text-[11px] text-slate-500 border-t border-slate-200/60 pt-4">
          {mode === 'login' ? (
            <p>
              Belum memiliki akun INVITRA?{' '}
              <button
                onClick={() => { setMode('register'); setErrorMessage(''); }}
                className="text-purple-700 font-bold hover:underline"
              >
                Daftar Gratis
              </button>
            </p>
          ) : (
            <p>
              Sudah mendaftar sebelumnya?{' '}
              <button
                onClick={() => { setMode('login'); setErrorMessage(''); }}
                className="text-purple-700 font-bold hover:underline"
              >
                Masuk di sini
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
