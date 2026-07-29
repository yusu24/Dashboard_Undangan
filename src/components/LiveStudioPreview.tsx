import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Music, Volume2, VolumeX, Heart, MapPin, Calendar, Send, Copy, 
  Check, Sparkles, User, Users, Gift, Clock, RefreshCw, Smartphone, ExternalLink, ChevronRight
} from 'lucide-react';
import { TEMPLATES_DATA, INITIAL_WISHES } from '../data/mockData';
import { WishComment } from '../types';

export const LiveStudioPreview: React.FC = () => {
  const [selectedThemeId, setSelectedThemeId] = useState('ethereal-garden');
  const [groomName, setGroomName] = useState('Rian Pratama');
  const [brideName, setBrideName] = useState('Anindya Putri');
  const [eventDate, setEventDate] = useState('2026-10-24');
  const [eventLocation, setEventLocation] = useState('Grand Ballroom Hotel Mulia, Jakarta');

  // Phone Interactive State
  const [isCoverOpen, setIsCoverOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'rsvp' | 'gift' | 'wishes'>('details');
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  // RSVP Form State
  const [guestName, setGuestName] = useState('');
  const [guestStatus, setGuestStatus] = useState<'Hadir' | 'Ragu-ragu' | 'Tidak Hadir'>('Hadir');
  const [guestCount, setGuestCount] = useState('1');
  const [guestMessage, setGuestMessage] = useState('');
  const [wishesList, setWishesList] = useState<WishComment[]>(INITIAL_WISHES);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  const activeTheme = TEMPLATES_DATA.find(t => t.id === selectedThemeId) || TEMPLATES_DATA[0];

  // Confetti trigger
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Submit RSVP in phone
  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const newWish: WishComment = {
      id: Date.now().toString(),
      name: guestName,
      status: guestStatus,
      message: guestMessage || 'Selamat dan bahagia selalu!',
      time: 'Baru saja'
    };

    setWishesList([newWish, ...wishesList]);
    setRsvpSubmitted(true);
    triggerConfetti();

    setTimeout(() => {
      setGuestName('');
      setGuestMessage('');
      setRsvpSubmitted(false);
      setActiveTab('wishes');
    }, 1800);
  };

  const handleCopyAccount = (bankName: string, accountNum: string) => {
    navigator.clipboard.writeText(accountNum);
    setCopiedBank(bankName);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  return (
    <section id="live-studio" className="py-20 sm:py-28 px-4 sm:px-8 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-purple-200/40 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-pink-200/40 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/40 backdrop-blur-md border border-white/60 rounded-full text-xs font-bold uppercase tracking-widest text-slate-600 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Interactive Live Studio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-title italic text-slate-800 mb-4">
            Uji Coba Tampilan & Fitur Undangan
          </h2>
          <p className="text-slate-600 font-sans-body text-base sm:text-lg">
            Ganti nama, tanggal, & tema di studio samping untuk melihat perubahan langsung di layar smartphone secara real-time.
          </p>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Customizer Control Panel */}
          <div className="lg:col-span-5 bg-white/35 backdrop-blur-2xl border border-white/60 rounded-[32px] p-6 sm:p-8 shadow-xl flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
              <div>
                <h3 className="font-bold text-slate-800 text-lg font-sans-body">Studio Kustomisasi</h3>
                <p className="text-xs text-slate-500">Edit data untuk simulasi live</p>
              </div>
              <button
                onClick={() => {
                  setGroomName('Rian Pratama');
                  setBrideName('Anindya Putri');
                  setEventDate('2026-10-24');
                  setSelectedThemeId('ethereal-garden');
                  setIsCoverOpen(false);
                }}
                className="text-xs text-purple-700 font-semibold hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Theme Picker Pills */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                1. Pilih Tema & Palet Warna
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {TEMPLATES_DATA.slice(0, 4).map((theme) => {
                  const isSelected = theme.id === selectedThemeId;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => {
                        setSelectedThemeId(theme.id);
                        setGroomName(theme.coupleDefault.groom);
                        setBrideName(theme.coupleDefault.bride);
                      }}
                      className={`p-3 rounded-2xl text-left border text-xs font-semibold transition-all duration-200 flex items-center justify-between ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]'
                          : 'bg-white/50 text-slate-700 border-white/80 hover:bg-white/80'
                      }`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: theme.accentColor }}></span>
                        <span className="truncate">{theme.name}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-purple-300 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inputs Form */}
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                2. Nama Pasangan / Tuan Rumah
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] text-slate-500 font-medium">Nama Pria / Nama Utama</span>
                  <input
                    type="text"
                    value={groomName}
                    onChange={(e) => setGroomName(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2.5 bg-white/60 border border-white/80 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-medium">Nama Wanita / Pasangan</span>
                  <input
                    type="text"
                    value={brideName}
                    onChange={(e) => setBrideName(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2.5 bg-white/60 border border-white/80 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-500 font-medium mb-1">Tanggal Acara</label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/60 border border-white/80 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 font-medium mb-1">Lokasi Singkat</label>
                  <input
                    type="text"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/60 border border-white/80 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>
            </div>

            {/* Simulated Feature Test Actions */}
            <div className="pt-3 border-t border-slate-200/60 space-y-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                3. Uji Fitur Interaktif
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsCoverOpen(!isCoverOpen)}
                  className="py-2.5 px-3 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>{isCoverOpen ? 'Tutup Cover' : 'Buka Sampul'}</span>
                </button>

                <button
                  onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                  className={`py-2.5 px-3 border rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                    isPlayingMusic 
                      ? 'bg-rose-500 text-white border-rose-600' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                  }`}
                >
                  {isPlayingMusic ? <Volume2 className="w-3.5 h-3.5 animate-bounce" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>{isPlayingMusic ? 'Lagu Putar' : 'Putar Musik'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsCoverOpen(true);
                    setActiveTab('rsvp');
                  }}
                  className="py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Coba Form RSVP</span>
                </button>

                <button
                  onClick={() => {
                    setIsCoverOpen(true);
                    setShowGiftModal(true);
                  }}
                  className="py-2.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Gift className="w-3.5 h-3.5 text-amber-600" />
                  <span>Amplop Digital</span>
                </button>
              </div>
            </div>

            <div className="bg-purple-100/60 border border-purple-200/80 rounded-2xl p-4 text-xs text-purple-950 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <p>
                <strong>Eksklusif INVITRA:</strong> Anda dapat meng-export daftar konfirmasi RSVP tamu langsung ke Excel/Google Sheets setelah dipublikasikan.
              </p>
            </div>
          </div>

          {/* RIGHT: Phone Mockup Frame Container */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <div className="relative w-full max-w-[380px] h-[680px] bg-slate-900 rounded-[50px] p-3 shadow-2xl shadow-purple-900/20 border-4 border-slate-800 ring-1 ring-white/20">
              
              {/* Phone Speaker Notch */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full z-40 flex items-center justify-center">
                <div className="w-10 h-1 bg-slate-700 rounded-full"></div>
                <div className="w-2 h-2 rounded-full bg-slate-800 ml-3"></div>
              </div>

              {/* Mobile Screen Wrapper */}
              <div className={`relative w-full h-full rounded-[40px] overflow-hidden bg-gradient-to-br ${activeTheme.bgGradient} flex flex-col no-scrollbar`}>
                
                {/* Floating Music Indicator inside Phone */}
                <div className="absolute top-4 right-4 z-30">
                  <button
                    onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg border backdrop-blur-md transition-transform ${
                      isPlayingMusic 
                        ? 'bg-rose-500 text-white border-rose-400 animate-spin-slow' 
                        : 'bg-white/60 text-slate-700 border-white/80'
                    }`}
                  >
                    <Music className="w-4 h-4" />
                  </button>
                </div>

                {/* Simulated Opening Cover Modal inside Phone */}
                {!isCoverOpen ? (
                  <div className="absolute inset-0 z-20 bg-gradient-to-b from-white/90 via-purple-50/90 to-rose-100/90 backdrop-blur-md p-6 flex flex-col justify-between items-center text-center animate-in fade-in duration-300">
                    <div className="pt-10">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase block mb-1">THE WEDDING OF</span>
                      <h3 className="text-3xl font-serif-title italic text-slate-800 font-bold mb-1">
                        {groomName} & {brideName}
                      </h3>
                      <p className="text-xs text-slate-500">{eventDate}</p>
                    </div>

                    <div className="my-auto w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl relative">
                      <img 
                        src={activeTheme.image} 
                        alt="Couple" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-purple-900/10"></div>
                    </div>

                    <div className="w-full space-y-3 pb-4">
                      <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl p-3 text-xs text-slate-600">
                        <span className="text-[10px] uppercase text-slate-400 font-bold block">Kepada Yth:</span>
                        <span className="font-bold text-slate-800">Tamu Undangan Special</span>
                      </div>

                      <button
                        onClick={() => {
                          setIsCoverOpen(true);
                          setIsPlayingMusic(true);
                        }}
                        className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-xl flex items-center justify-center gap-2 group transition-all"
                      >
                        <Heart className="w-4 h-4 fill-pink-400 text-pink-400 group-hover:scale-125 transition-transform" />
                        <span>Buka Undangan</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Inside Invitation Content */
                  <div className="flex-1 overflow-y-auto no-scrollbar p-5 pt-12 flex flex-col gap-5">
                    
                    {/* Header Banner */}
                    <div className="text-center bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl p-5 shadow-sm">
                      <span className="text-[10px] tracking-[0.2em] font-bold text-slate-500 uppercase block mb-1">Undangan Pernikahan</span>
                      <h3 className="text-2xl font-serif-title italic font-bold text-slate-800">
                        {groomName} <span className="text-purple-600 font-script text-3xl">&</span> {brideName}
                      </h3>
                      <p className="text-xs text-slate-600 mt-2 flex items-center justify-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-purple-600" />
                        <span>{eventDate}</span>
                      </p>
                    </div>

                    {/* Countdown Timer Widget */}
                    <div className="bg-white/50 backdrop-blur-md border border-white/70 rounded-2xl p-3.5 text-center shadow-sm">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Menghitung Hari Reuni Kebahagiaan</span>
                      <div className="grid grid-cols-4 gap-2 text-slate-800">
                        <div className="bg-white/70 rounded-xl p-1.5 border border-white/80">
                          <span className="text-sm font-extrabold block">28</span>
                          <span className="text-[9px] text-slate-500 uppercase">Hari</span>
                        </div>
                        <div className="bg-white/70 rounded-xl p-1.5 border border-white/80">
                          <span className="text-sm font-extrabold block">14</span>
                          <span className="text-[9px] text-slate-500 uppercase">Jam</span>
                        </div>
                        <div className="bg-white/70 rounded-xl p-1.5 border border-white/80">
                          <span className="text-sm font-extrabold block">42</span>
                          <span className="text-[9px] text-slate-500 uppercase">Menit</span>
                        </div>
                        <div className="bg-white/70 rounded-xl p-1.5 border border-white/80">
                          <span className="text-sm font-extrabold block text-purple-600">08</span>
                          <span className="text-[9px] text-slate-500 uppercase">Detik</span>
                        </div>
                      </div>
                    </div>

                    {/* Mini Navigation Tabs inside Phone */}
                    <div className="grid grid-cols-4 gap-1 bg-white/40 p-1 rounded-2xl border border-white/60 text-[10px] font-bold text-slate-600">
                      <button
                        onClick={() => setActiveTab('details')}
                        className={`py-1.5 rounded-xl transition-all ${activeTab === 'details' ? 'bg-slate-900 text-white shadow-sm' : 'hover:bg-white/40'}`}
                      >
                        Acara
                      </button>
                      <button
                        onClick={() => setActiveTab('rsvp')}
                        className={`py-1.5 rounded-xl transition-all ${activeTab === 'rsvp' ? 'bg-slate-900 text-white shadow-sm' : 'hover:bg-white/40'}`}
                      >
                        RSVP
                      </button>
                      <button
                        onClick={() => setActiveTab('gift')}
                        className={`py-1.5 rounded-xl transition-all ${activeTab === 'gift' ? 'bg-slate-900 text-white shadow-sm' : 'hover:bg-white/40'}`}
                      >
                        Amplop
                      </button>
                      <button
                        onClick={() => setActiveTab('wishes')}
                        className={`py-1.5 rounded-xl transition-all ${activeTab === 'wishes' ? 'bg-slate-900 text-white shadow-sm' : 'hover:bg-white/40'}`}
                      >
                        Ucapan
                      </button>
                    </div>

                    {/* Tab 1: Event Details */}
                    {activeTab === 'details' && (
                      <div className="space-y-3 animate-in fade-in duration-200">
                        <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl p-4 text-xs">
                          <div className="flex items-center gap-2 text-purple-700 font-bold mb-1">
                            <Clock className="w-4 h-4" />
                            <span>Akad Nikah</span>
                          </div>
                          <p className="font-semibold text-slate-800">Pukul 08:00 WIB - Selesai</p>
                          <p className="text-slate-500 text-[11px] mt-1">{eventLocation}</p>
                        </div>

                        <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl p-4 text-xs">
                          <div className="flex items-center gap-2 text-pink-700 font-bold mb-1">
                            <Sparkles className="w-4 h-4" />
                            <span>Resepsi Pernikahan</span>
                          </div>
                          <p className="font-semibold text-slate-800">Pukul 11:00 WIB - 14:00 WIB</p>
                          <p className="text-slate-500 text-[11px] mt-1">{eventLocation}</p>

                          <button 
                            onClick={() => alert(`Membuka Google Maps menuju: ${eventLocation}`)}
                            className="mt-3 w-full py-2 bg-purple-600 text-white font-bold rounded-xl text-[11px] flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            <MapPin className="w-3.5 h-3.5" />
                            <span>Buka Google Maps Lokasi</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Tab 2: RSVP Form */}
                    {activeTab === 'rsvp' && (
                      <div className="bg-white/70 backdrop-blur-md border border-white/80 rounded-2xl p-4 text-xs animate-in fade-in duration-200">
                        <h4 className="font-bold text-slate-800 text-sm mb-1">Konfirmasi Kehadiran</h4>
                        <p className="text-[10px] text-slate-500 mb-3">Mohon isi form konfirmasi untuk membantu persiapan hidangan.</p>

                        {rsvpSubmitted ? (
                          <div className="bg-emerald-100/80 border border-emerald-300 text-emerald-900 rounded-xl p-4 text-center space-y-1">
                            <Check className="w-6 h-6 mx-auto text-emerald-600" />
                            <p className="font-bold">Terima Kasih!</p>
                            <p className="text-[10px]">Konfirmasi RSVP Anda berhasil tersimpan.</p>
                          </div>
                        ) : (
                          <form onSubmit={handleRsvpSubmit} className="space-y-2.5">
                            <div>
                              <input
                                type="text"
                                required
                                placeholder="Nama Lengkap Anda"
                                value={guestName}
                                onChange={(e) => setGuestName(e.target.value)}
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
                              />
                            </div>

                            <div className="grid grid-cols-3 gap-1">
                              {(['Hadir', 'Ragu-ragu', 'Tidak Hadir'] as const).map((st) => (
                                <button
                                  type="button"
                                  key={st}
                                  onClick={() => setGuestStatus(st)}
                                  className={`py-1.5 rounded-lg text-[10px] font-bold border ${
                                    guestStatus === st
                                      ? 'bg-purple-600 text-white border-purple-600'
                                      : 'bg-white text-slate-600 border-slate-200'
                                  }`}
                                >
                                  {st}
                                </button>
                              ))}
                            </div>

                            <div>
                              <textarea
                                rows={2}
                                placeholder="Tuliskan ucapan & doa untuk mempelai..."
                                value={guestMessage}
                                onChange={(e) => setGuestMessage(e.target.value)}
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md"
                            >
                              <Send className="w-3.5 h-3.5 text-purple-300" />
                              <span>Kirim Konfirmasi</span>
                            </button>
                          </form>
                        )}
                      </div>
                    )}

                    {/* Tab 3: Digital Gift */}
                    {(activeTab === 'gift' || showGiftModal) && (
                      <div className="bg-white/70 backdrop-blur-md border border-white/80 rounded-2xl p-4 text-xs animate-in fade-in duration-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-800 text-sm">Amplop & Hadiah Digital</h4>
                          {showGiftModal && (
                            <button onClick={() => setShowGiftModal(false)} className="text-[10px] text-slate-400 underline">Tutup</button>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500">Doa restu Anda merupakan hadiah terindah, namun jika ingin memberi tanda kasih secara digital:</p>

                        <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-blue-600 block">Bank BCA</span>
                            <span className="font-mono font-bold text-slate-800 text-xs">8820 4910 22</span>
                            <span className="text-[10px] text-slate-400 block">a.n. Rian Pratama</span>
                          </div>
                          <button
                            onClick={() => handleCopyAccount('BCA', '8820491022')}
                            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-bold text-slate-700 flex items-center gap-1"
                          >
                            {copiedBank === 'BCA' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedBank === 'BCA' ? 'Salin!' : 'Salin'}</span>
                          </button>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-amber-600 block">Bank Mandiri</span>
                            <span className="font-mono font-bold text-slate-800 text-xs">1370 0019 88201</span>
                            <span className="text-[10px] text-slate-400 block">a.n. Anindya Putri</span>
                          </div>
                          <button
                            onClick={() => handleCopyAccount('Mandiri', '1370001988201')}
                            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-bold text-slate-700 flex items-center gap-1"
                          >
                            {copiedBank === 'Mandiri' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedBank === 'Mandiri' ? 'Salin!' : 'Salin'}</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Tab 4: Wishes Stream */}
                    {activeTab === 'wishes' && (
                      <div className="space-y-2 animate-in fade-in duration-200">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Ucapan Doa Restu ({wishesList.length})</span>
                        <div className="space-y-2 max-h-52 overflow-y-auto no-scrollbar">
                          {wishesList.map((wish) => (
                            <div key={wish.id} className="bg-white/70 backdrop-blur-sm border border-white/80 rounded-xl p-3 text-xs">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-slate-800">{wish.name}</span>
                                <span className="text-[9px] bg-purple-100 text-purple-700 font-bold px-1.5 py-0.5 rounded-full">{wish.status}</span>
                              </div>
                              <p className="text-[11px] text-slate-600 leading-relaxed">{wish.message}</p>
                              <span className="text-[9px] text-slate-400 mt-1 block">{wish.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
