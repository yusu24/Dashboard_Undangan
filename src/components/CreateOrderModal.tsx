import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { TEMPLATES_DATA, PRICING_PLANS } from '../data/mockData';
import { TemplateTheme, PricingPlan } from '../types';
import { X, Sparkles, Check, Copy, Share2, Heart, ArrowRight, ExternalLink } from 'lucide-react';

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTemplate?: TemplateTheme | null;
  initialPlan?: PricingPlan | null;
}

export const CreateOrderModal: React.FC<CreateOrderModalProps> = ({
  isOpen,
  onClose,
  initialTemplate,
  initialPlan
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  
  // Form State
  const [groom, setGroom] = useState(initialTemplate?.coupleDefault.groom || 'Rian Pratama');
  const [bride, setBride] = useState(initialTemplate?.coupleDefault.bride || 'Anindya Putri');
  const [eventDate, setEventDate] = useState('2026-10-24');
  const [selectedThemeId, setSelectedThemeId] = useState(initialTemplate?.id || 'ethereal-garden');
  const [selectedPlanId, setSelectedPlanId] = useState(initialPlan?.id || 'plan-gold');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const activeTheme = TEMPLATES_DATA.find(t => t.id === selectedThemeId) || TEMPLATES_DATA[0];
  const activePlan = PRICING_PLANS.find(p => p.id === selectedPlanId) || PRICING_PLANS[1];

  const generatedSlug = `${groom.toLowerCase().replace(/[^a-z0-9]/g, '')}-${bride.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  const invitationUrl = `https://invitra.com/u/${generatedSlug || 'wedding-demo'}`;

  const handleFinishCreation = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(invitationUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white/95 backdrop-blur-2xl border border-white rounded-[36px] shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Wizard Progress */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
              {step}
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm font-sans-body">
                {step === 1 && 'Data Undangan'}
                {step === 2 && 'Pilih Paket & Tema'}
                {step === 3 && 'Undangan Siap Disebar! 🎉'}
              </h3>
              <p className="text-[10px] text-slate-500">Langkah {step} dari 3</p>
            </div>
          </div>

          <div className="flex gap-1">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-6 h-1.5 rounded-full ${s <= step ? 'bg-purple-600' : 'bg-slate-200'}`}
              ></div>
            ))}
          </div>
        </div>

        {/* STEP 1: Details */}
        {step === 1 && (
          <form onSubmit={() => setStep(2)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Pria / Mempelai 1</label>
                <input
                  type="text"
                  required
                  value={groom}
                  onChange={(e) => setGroom(e.target.value)}
                  placeholder="Contoh: Rian Pratama"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Wanita / Mempelai 2</label>
                <input
                  type="text"
                  required
                  value={bride}
                  onChange={(e) => setBride(e.target.value)}
                  placeholder="Contoh: Anindya Putri"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tanggal Hari Bahagia</label>
              <input
                type="date"
                required
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-lg flex items-center justify-center gap-2"
            >
              <span>Lanjut ke Pilih Tema & Paket</span>
              <ArrowRight className="w-4 h-4 text-purple-300" />
            </button>
          </form>
        )}

        {/* STEP 2: Theme & Plan Picker */}
        {step === 2 && (
          <form onSubmit={handleFinishCreation} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Pilih Tema Desain</label>
              <div className="grid grid-cols-2 gap-2">
                {TEMPLATES_DATA.slice(0, 4).map((tmpl) => (
                  <button
                    type="button"
                    key={tmpl.id}
                    onClick={() => setSelectedThemeId(tmpl.id)}
                    className={`p-3 rounded-2xl border text-left text-xs font-semibold flex items-center justify-between ${
                      selectedThemeId === tmpl.id
                        ? 'bg-purple-900 text-white border-purple-900 shadow-md'
                        : 'bg-slate-50 text-slate-800 border-slate-200'
                    }`}
                  >
                    <span>{tmpl.name}</span>
                    {selectedThemeId === tmpl.id && <Check className="w-4 h-4 text-purple-300" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Pilih Paket Fitur</label>
              <div className="space-y-2">
                {PRICING_PLANS.map((plan) => (
                  <button
                    type="button"
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between ${
                      selectedPlanId === plan.id
                        ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-400'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-slate-800 text-xs block">{plan.name}</span>
                      <span className="text-[10px] text-slate-500">{plan.description}</span>
                    </div>
                    <span className="font-extrabold text-xs text-purple-900">
                      {plan.price === 0 ? 'Gratis' : `Rp ${plan.price.toLocaleString('id-ID')}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3 px-5 bg-slate-100 text-slate-700 font-bold text-xs rounded-2xl"
              >
                Kembali
              </button>
              <button
                type="submit"
                className="flex-1 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-xl flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-purple-300" />
                <span>Terbitkan Undangan Digital</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Complete / Ready Link */}
        {step === 3 && (
          <div className="text-center space-y-5 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div>
              <h4 className="text-2xl font-bold font-serif-title italic text-slate-800">
                Undangan Anda Telah Aktif!
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Website undangan digital untuk <span className="font-bold text-slate-800">{groom} & {bride}</span> siap disebarkan ke sanak saudara.
              </p>
            </div>

            <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-2">
              <span className="font-mono text-xs text-purple-900 font-bold truncate">{invitationUrl}</span>
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl flex items-center gap-1 shrink-0"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Tersalin' : 'Salin'}</span>
              </button>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={`https://wa.me/?text=Kepada%20Yth.%20Bapak/Ibu/Saudara/i,%20Tanpa%20mengurangi%20rasa%20hormat,%20perkenankan%20kami%20mengundang%20ke%20pernikahan%20${encodeURIComponent(groom)}%20%26%20${encodeURIComponent(bride)}:%20${encodeURIComponent(invitationUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-md flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Sebar Langsung via WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-2xl"
              >
                Tutup Window
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
