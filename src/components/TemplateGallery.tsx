import React, { useState } from 'react';
import { TEMPLATES_DATA } from '../data/mockData';
import { TemplateCategory, TemplateTheme } from '../types';
import { Sparkles, Eye, Check, Heart, Search, Filter } from 'lucide-react';

interface TemplateGalleryProps {
  onSelectTemplate: (template: TemplateTheme) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onSelectTemplate }) => {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = TEMPLATES_DATA.filter((tmpl) => {
    const matchesCategory = activeCategory === 'all' || tmpl.category === activeCategory;
    const matchesSearch = tmpl.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tmpl.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tmpl.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="templates" className="py-20 sm:py-28 px-4 sm:px-8 relative bg-white/20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/50 backdrop-blur-md border border-white/70 rounded-full text-xs font-bold uppercase tracking-widest text-slate-600 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Koleksi Eksklusif 2026</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-title italic text-slate-800 mb-4">
            Pilih Tema Undangan Favorit Anda
          </h2>
          <p className="text-slate-600 font-sans-body text-base sm:text-lg">
            Setiap tema didesain secara presisi dengan perpaduan warna yang elegan, animasi mulus, & kenyamanan mata para tamu.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-3 sm:p-4 shadow-sm">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-1 md:pb-0">
            {[
              { id: 'all', label: 'Semua Tema' },
              { id: 'wedding', label: 'Pernikahan' },
              { id: 'birthday', label: 'Ulang Tahun' },
              { id: 'aqiqah', label: 'Aqiqah & Syukuran' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as TemplateCategory)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white/50 text-slate-700 hover:bg-white/80 border border-white/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari tema (e.g. Floral, Gold, Modern)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/70 border border-white/80 rounded-2xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-inner"
            />
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="glass-card glass-card-hover rounded-[32px] overflow-hidden flex flex-col justify-between group"
            >
              {/* Image Preview Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/80 backdrop-blur-md rounded-full text-[11px] font-bold text-slate-800 shadow-sm border border-white/80">
                    {template.tag}
                  </span>
                  {template.isPopular && (
                    <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full text-[11px] font-bold shadow-md">
                      🔥 Terpopuler
                    </span>
                  )}
                  {template.isFree && (
                    <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-[11px] font-bold shadow-md">
                      Gratis
                    </span>
                  )}
                </div>

                {/* Accent Circle */}
                <div
                  className="absolute bottom-4 right-4 w-6 h-6 rounded-full border-2 border-white shadow-md"
                  style={{ backgroundColor: template.accentColor }}
                  title="Warna Aksen Utama"
                ></div>

                {/* Couple Names Overlay */}
                <div className="absolute bottom-4 left-4 right-12">
                  <span className="text-[10px] text-white/80 uppercase font-bold tracking-widest block">Contoh Tampilan</span>
                  <p className="text-white font-serif-title text-xl font-bold italic truncate">
                    {template.coupleDefault.groom} & {template.coupleDefault.bride}
                  </p>
                </div>
              </div>

              {/* Template Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold font-serif-title italic text-slate-800 mb-2">
                    {template.name}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-sans-body">
                    {template.description}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-200/60 flex items-center gap-3">
                  <button
                    onClick={() => onSelectTemplate(template)}
                    className="flex-1 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Gunakan Tema</span>
                    <Heart className="w-3.5 h-3.5 fill-pink-300 text-pink-300 group-hover/btn:scale-125 transition-transform" />
                  </button>
                  <button
                    onClick={() => onSelectTemplate(template)}
                    className="p-3 bg-white/70 hover:bg-white text-slate-800 border border-white/80 rounded-2xl transition-colors shadow-sm"
                    title="Lihat Detail"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-16 bg-white/30 rounded-3xl border border-white/50">
            <p className="text-slate-600 font-semibold mb-2">Tema tidak ditemukan untuk pencarian "{searchQuery}"</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="text-xs text-purple-700 font-bold underline"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
