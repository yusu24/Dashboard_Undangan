import React from 'react';
import { TemplateTheme } from '../types';
import { X, CheckCircle2, Heart, Music, Calendar, MapPin, ExternalLink } from 'lucide-react';

interface TemplateDetailModalProps {
  template: TemplateTheme | null;
  onClose: () => void;
  onUseTemplate: (template: TemplateTheme) => void;
}

export const TemplateDetailModal: React.FC<TemplateDetailModalProps> = ({
  template,
  onClose,
  onUseTemplate
}) => {
  if (!template) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white/90 backdrop-blur-2xl border border-white rounded-[36px] shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Banner */}
        <div className="relative h-56 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 overflow-hidden">
          <img
            src={template.image}
            alt={template.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="px-3 py-1 bg-white/30 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/40 mb-2 inline-block">
              {template.tag}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif-title italic font-bold">
              {template.name}
            </h3>
          </div>
        </div>

        {/* Description & Default Info */}
        <div className="space-y-6">
          <p className="text-slate-600 text-sm font-sans-body leading-relaxed">
            {template.description}
          </p>

          <div className="bg-purple-50/80 border border-purple-100 rounded-2xl p-4 space-y-2 text-xs text-purple-950">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <Music className="w-4 h-4 text-purple-600" />
              <span>Lagu Latar Default: {template.musicTitle}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Calendar className="w-4 h-4 text-purple-600" />
              <span>Contoh Acara: {template.coupleDefault.groom} & {template.coupleDefault.bride}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="w-4 h-4 text-purple-600" />
              <span>{template.coupleDefault.location}</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">Fitur Termasuk di Tema Ini</h4>
            <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-700">
              {['RSVP Real-Time & Rekap', 'Amplop Digital QRIS/Bank', 'Countdown Timer Acara', 'Google Maps Navigasi', 'Lagu Latar Auto-Play', 'Galeri Photo Slide'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/60 p-2.5 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onUseTemplate(template);
                onClose();
              }}
              className="flex-1 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-pink-300 text-pink-300" />
              <span>Gunakan Tema Ini</span>
            </button>
            <button
              onClick={onClose}
              className="py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-2xl"
            >
              Tutup
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
