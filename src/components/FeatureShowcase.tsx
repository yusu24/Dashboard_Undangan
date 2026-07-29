import React, { useState } from 'react';
import { FEATURES_DATA } from '../data/mockData';
import { 
  UserCheck, Wallet, Music, MapPin, Image, Sparkles, Check, 
  Play, Pause, Copy, Heart, ShieldCheck 
} from 'lucide-react';

export const FeatureShowcase: React.FC = () => {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [isPlayingDemoMusic, setIsPlayingDemoMusic] = useState(false);
  const [copiedDemo, setCopiedDemo] = useState(false);

  const activeFeature = FEATURES_DATA[activeFeatureIndex];

  return (
    <section id="features" className="py-20 sm:py-28 px-4 sm:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/40 backdrop-blur-md border border-white/60 rounded-full text-xs font-bold uppercase tracking-widest text-slate-600 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Fitur Masa Kini</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-title italic text-slate-800 mb-4">
            Semua yang Anda Butuhkan dalam 1 Link
          </h2>
          <p className="text-slate-600 font-sans-body text-base sm:text-lg">
            Teknologi undangan digital modern yang memudahkan penyebaran, pencatatan tamu, hingga penerimaan hadiah secara instan.
          </p>
        </div>

        {/* Feature Interactive Showcase Box */}
        <div className="bg-white/30 backdrop-blur-2xl border border-white/50 rounded-[36px] p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Feature Selector Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {FEATURES_DATA.map((feat, idx) => {
              const isSelected = idx === activeFeatureIndex;
              return (
                <div
                  key={feat.id}
                  onClick={() => setActiveFeatureIndex(idx)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? 'bg-white/80 border-white shadow-xl scale-[1.02]'
                      : 'bg-white/20 hover:bg-white/40 border-white/30 text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                      isSelected ? 'bg-slate-900 text-white' : 'bg-white/50 text-slate-700'
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-purple-600 block">{feat.tag}</span>
                      <h3 className={`text-base font-bold font-sans-body ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                        {feat.title}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feature Interactive Graphic Canvas */}
          <div className="lg:col-span-7 bg-gradient-to-br from-purple-900/10 via-pink-900/5 to-slate-900/10 rounded-3xl p-6 sm:p-8 border border-white/80 min-h-[360px] flex flex-col justify-center items-center text-center relative overflow-hidden">
            
            <div className="absolute top-4 right-4 bg-white/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-700 border border-white/80">
              Interactive Demo
            </div>

            {/* Feature Demo 1: RSVP */}
            {activeFeature.previewType === 'rsvp' && (
              <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white rounded-2xl p-6 shadow-2xl text-left space-y-3 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b pb-3">
                  <span className="font-bold text-slate-800 text-sm">Dashboard Rekap Tamu</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-0.5 rounded-full">Live Sync</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-purple-50 p-2.5 rounded-xl border border-purple-100">
                    <span className="text-lg font-extrabold text-purple-900 block">128</span>
                    <span className="text-[10px] text-purple-700 uppercase font-bold">Hadir</span>
                  </div>
                  <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-100">
                    <span className="text-lg font-extrabold text-amber-900 block">14</span>
                    <span className="text-[10px] text-amber-700 uppercase font-bold">Ragu</span>
                  </div>
                  <div className="bg-rose-50 p-2.5 rounded-xl border border-rose-100">
                    <span className="text-lg font-extrabold text-rose-900 block">5</span>
                    <span className="text-[10px] text-rose-700 uppercase font-bold">Absen</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed pt-2">
                  Tamu langsung masuk ke sistem rekap tanpa perlu dicatat manual. Anda dapat men-download rekap PDF/Excel dengan 1 klik.
                </p>
              </div>
            )}

            {/* Feature Demo 2: Gift */}
            {activeFeature.previewType === 'gift' && (
              <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white rounded-2xl p-6 shadow-2xl text-left space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Amplop Digital BCA</h4>
                    <p className="text-xs text-slate-500">8820-4910-22 a.n Rian Pratama</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('8820491022');
                    setCopiedDemo(true);
                    setTimeout(() => setCopiedDemo(false), 2000);
                  }}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  {copiedDemo ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedDemo ? 'Nomor Rekening Tersalin!' : 'Uji Salin Nomor Rekening'}</span>
                </button>
              </div>
            )}

            {/* Feature Demo 3: Music */}
            {activeFeature.previewType === 'music' && (
              <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white rounded-2xl p-6 shadow-2xl text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 mx-auto flex items-center justify-center text-white shadow-xl">
                  <Music className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">A Thousand Years (Piano)</h4>
                  <p className="text-xs text-slate-500">Preset Audio Romantis INVITRA</p>
                </div>
                <button
                  onClick={() => setIsPlayingDemoMusic(!isPlayingDemoMusic)}
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full text-xs inline-flex items-center gap-2 shadow-md"
                >
                  {isPlayingDemoMusic ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  <span>{isPlayingDemoMusic ? 'Jeda Audio' : 'Uji Pemutar Musik'}</span>
                </button>
              </div>
            )}

            {/* Feature Demo 4: Maps */}
            {activeFeature.previewType === 'maps' && (
              <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white rounded-2xl p-6 shadow-2xl text-left space-y-3 animate-in fade-in duration-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-rose-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Grand Ballroom Hotel Mulia</h4>
                    <p className="text-xs text-slate-500">Jl. Asia Afrika No.6, Senayan, Jakarta Pusat</p>
                  </div>
                </div>
                <div className="h-28 rounded-xl bg-slate-200 overflow-hidden relative border flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=400" alt="Map mockup" className="w-full h-full object-cover opacity-60" />
                  <span className="absolute bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-slate-800 shadow-md">
                    📍 Pin GPS Presisi
                  </span>
                </div>
              </div>
            )}

            {/* Feature Demo 5: Gallery */}
            {activeFeature.previewType === 'gallery' && (
              <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white rounded-2xl p-4 shadow-2xl text-left space-y-2 animate-in fade-in duration-300">
                <span className="text-xs font-bold text-slate-800 block">Slide Foto Pre-Wedding</span>
                <div className="grid grid-cols-3 gap-2">
                  <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=200" className="rounded-xl h-24 object-cover w-full border" alt="Slide 1" />
                  <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=200" className="rounded-xl h-24 object-cover w-full border" alt="Slide 2" />
                  <img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=200" className="rounded-xl h-24 object-cover w-full border" alt="Slide 3" />
                </div>
              </div>
            )}

            {/* Feature Demo 6: Instagram Filter */}
            {activeFeature.previewType === 'filter' && (
              <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white rounded-2xl p-6 shadow-2xl text-center space-y-3 animate-in fade-in duration-300">
                <Sparkles className="w-8 h-8 text-pink-500 mx-auto animate-spin-slow" />
                <h4 className="font-bold text-slate-800 text-sm">Custom Instagram Story Filter</h4>
                <p className="text-xs text-slate-500">Frame foto elegan senada dengan tema undangan untuk tamu saat hadir di pesta.</p>
              </div>
            )}

            {/* Active Description */}
            <div className="mt-6 max-w-md text-slate-700 text-xs sm:text-sm font-sans-body">
              {activeFeature.description}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
