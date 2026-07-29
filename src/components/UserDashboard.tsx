import React, { useState } from 'react';
import { 
  UserInvitation, 
  TemplateTheme, 
  GuestItem, 
  RsvpResponse, 
  LoveStoryItem, 
  BankAccountItem 
} from '../types';
import { 
  Sparkles, 
  Plus, 
  Edit3, 
  Eye, 
  Share2, 
  Copy, 
  Trash2, 
  Check, 
  Calendar, 
  MapPin, 
  Users, 
  MessageSquare, 
  Music, 
  Heart, 
  CreditCard, 
  Send, 
  ArrowLeft, 
  BarChart3, 
  Search, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  ExternalLink,
  Smartphone,
  Phone,
  Image as ImageIcon
} from 'lucide-react';

interface UserDashboardProps {
  onBackToMain: () => void;
  invitations: UserInvitation[];
  templates: TemplateTheme[];
  onCreateNewInvitation: () => void;
  onUpdateInvitation: (updatedInv: UserInvitation) => void;
  onDeleteInvitation: (id: string) => void;
  onPreviewInvitation: (tmpl: TemplateTheme) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  onBackToMain,
  invitations,
  templates,
  onCreateNewInvitation,
  onUpdateInvitation,
  onDeleteInvitation,
  onPreviewInvitation
}) => {
  const [activeTab, setActiveTab] = useState<'my-invitations' | 'editor' | 'guests' | 'rsvps' | 'analytics'>('my-invitations');
  const [selectedInvId, setSelectedInvId] = useState<string>(invitations[0]?.id || '');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedInv = invitations.find(i => i.id === selectedInvId) || invitations[0];

  // Editor sub-tabs state
  const [editorSubTab, setEditorSubTab] = useState<'acara' | 'galeri' | 'story' | 'amplop'>('acara');

  // Local draft state for selected invitation editor
  const [editForm, setEditForm] = useState<UserInvitation | null>(selectedInv || null);

  // Sync editForm when selectedInvId changes
  React.useEffect(() => {
    if (selectedInv) {
      setEditForm(JSON.parse(JSON.stringify(selectedInv)));
    }
  }, [selectedInvId, invitations]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyLink = (inv: UserInvitation, guestName?: string) => {
    let url = `https://invitra.com/u/${inv.slug}`;
    if (guestName) {
      url += `?to=${encodeURIComponent(guestName)}`;
    }
    navigator.clipboard.writeText(url);
    setCopiedId(inv.id + (guestName || ''));
    showToast(`Link ${guestName ? `untuk ${guestName}` : ''} berhasil disalin!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveEditor = () => {
    if (!editForm) return;
    onUpdateInvitation(editForm);
    showToast('Perubahan undangan berhasil disimpan!');
  };

  // Guest Management State
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestPhone, setNewGuestPhone] = useState('');
  const [newGuestCategory, setNewGuestCategory] = useState('Keluarga');

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim() || !editForm) return;
    const newGuest: GuestItem = {
      id: `g-${Date.now()}`,
      name: newGuestName.trim(),
      phone: newGuestPhone.trim() || '-',
      category: newGuestCategory,
      statusSent: false
    };
    const updatedForm = {
      ...editForm,
      guestList: [newGuest, ...editForm.guestList]
    };
    setEditForm(updatedForm);
    onUpdateInvitation(updatedForm);
    setNewGuestName('');
    setNewGuestPhone('');
    showToast(`Tamu "${newGuest.name}" berhasil ditambahkan!`);
  };

  const handleToggleGuestSent = (guestId: string) => {
    if (!editForm) return;
    const updatedList = editForm.guestList.map(g => 
      g.id === guestId ? { ...g, statusSent: !g.statusSent } : g
    );
    const updatedForm = { ...editForm, guestList: updatedList };
    setEditForm(updatedForm);
    onUpdateInvitation(updatedForm);
  };

  const handleDeleteGuest = (guestId: string) => {
    if (!editForm) return;
    const updatedList = editForm.guestList.filter(g => g.id !== guestId);
    const updatedForm = { ...editForm, guestList: updatedList };
    setEditForm(updatedForm);
    onUpdateInvitation(updatedForm);
    showToast('Tamu berhasil dihapus');
  };

  // WhatsApp text format generator
  const getWaLink = (guest: GuestItem, inv: UserInvitation) => {
    const inviteUrl = `https://invitra.com/u/${inv.slug}?to=${encodeURIComponent(guest.name)}`;
    const text = `Kepada Yth. Bpk/Ibu/Saudara/i *${guest.name}*\n\nTanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir di acara kami:\n*${inv.title}*\n\nTanggal: ${inv.eventDetails.date}\nLokasi: ${inv.eventDetails.locationName}\n\nDetail lengkap acara & konfirmasi kehadiran (RSVP) dapat diakses melalui link berikut:\n${inviteUrl}\n\nMerupakan suatu kehormatan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.\n\nTerima kasih.`;
    
    let cleanPhone = guest.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '62' + cleanPhone.slice(1);
    }
    return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(text)}`;
  };

  // Totals calculations
  const totalInvitations = invitations.length;
  const totalViews = invitations.reduce((acc, curr) => acc + curr.viewsCount, 0);
  const totalRsvps = invitations.reduce((acc, curr) => acc + curr.rsvps.length, 0);
  const totalAttending = invitations.reduce((acc, curr) => 
    acc + curr.rsvps.filter(r => r.attendance === 'Hadir').reduce((sum, r) => sum + r.pax, 0), 0
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans-body">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-purple-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-purple-400 animate-bounce">
          <Sparkles className="w-5 h-5 text-yellow-300" />
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <button
            onClick={onBackToMain}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all flex items-center gap-2 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-white text-base leading-none">Dashboard Pengunjung</h1>
              <p className="text-xs text-slate-400 mt-0.5">Pusat Kelola & Buat Undangan Digital</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            onClick={onCreateNewInvitation}
            className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-900/30 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Undangan Baru</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Welcome Stat Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">{totalInvitations}</div>
              <div className="text-xs text-slate-400 font-medium">Total Undangan Kamu</div>
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">{totalViews.toLocaleString()}</div>
              <div className="text-xs text-slate-400 font-medium">Total Pengunjung Web</div>
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">{totalAttending} Orang</div>
              <div className="text-xs text-slate-400 font-medium">Konfirmasi Hadir (RSVP)</div>
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">{totalRsvps} Ucapan</div>
              <div className="text-xs text-slate-400 font-medium">Buku Tamu & Doa</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('my-invitations')}
            className={`px-4 py-3 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border-b-2 ${
              activeTab === 'my-invitations'
                ? 'bg-purple-600/10 text-purple-400 border-purple-500'
                : 'text-slate-400 hover:text-slate-200 border-transparent'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Undangan Saya ({invitations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('editor')}
            className={`px-4 py-3 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border-b-2 ${
              activeTab === 'editor'
                ? 'bg-purple-600/10 text-purple-400 border-purple-500'
                : 'text-slate-400 hover:text-slate-200 border-transparent'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Editor & Isi Data</span>
          </button>

          <button
            onClick={() => setActiveTab('guests')}
            className={`px-4 py-3 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border-b-2 ${
              activeTab === 'guests'
                ? 'bg-purple-600/10 text-purple-400 border-purple-500'
                : 'text-slate-400 hover:text-slate-200 border-transparent'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Manajemen Tamu & Sebar WA</span>
          </button>

          <button
            onClick={() => setActiveTab('rsvps')}
            className={`px-4 py-3 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border-b-2 ${
              activeTab === 'rsvps'
                ? 'bg-purple-600/10 text-purple-400 border-purple-500'
                : 'text-slate-400 hover:text-slate-200 border-transparent'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Buku Tamu & RSVP</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-3 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border-b-2 ${
              activeTab === 'analytics'
                ? 'bg-purple-600/10 text-purple-400 border-purple-500'
                : 'text-slate-400 hover:text-slate-200 border-transparent'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Statistik Pengunjung</span>
          </button>
        </div>

        {/* Dynamic Selector for Active Invitation if editing/guests/rsvps */}
        {activeTab !== 'my-invitations' && (
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pilih Undangan:</span>
              <select
                value={selectedInvId}
                onChange={(e) => setSelectedInvId(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-white text-xs font-bold rounded-xl px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none flex-1 sm:w-64"
              >
                {invitations.map(inv => (
                  <option key={inv.id} value={inv.id}>
                    {inv.title} ({inv.templateName})
                  </option>
                ))}
              </select>
            </div>

            {selectedInv && (
              <div className="flex items-center gap-3 text-xs w-full sm:w-auto justify-end">
                <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  {selectedInv.status}
                </span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  {selectedInv.viewsCount} Dilihat
                </span>
              </div>
            )}
          </div>
        )}

        {/* TAB 1: MY INVITATIONS LIST */}
        {activeTab === 'my-invitations' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Daftar Undangan Digital Kamu</h2>
                <p className="text-xs text-slate-400 mt-1">Kelola, edit, atau sebar link undangan digital yang sudah kamu buat.</p>
              </div>

              <button
                onClick={onCreateNewInvitation}
                className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-900/30"
              >
                <Plus className="w-4 h-4" />
                <span>+ Buat Undangan Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {invitations.map((inv) => {
                const tmpl = templates.find(t => t.id === inv.templateId) || templates[0];
                return (
                  <div 
                    key={inv.id} 
                    className="bg-slate-800/80 border border-slate-700/80 rounded-3xl overflow-hidden shadow-xl hover:border-purple-500/50 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Preview Thumbnail */}
                      <div className="relative h-48 overflow-hidden bg-slate-950">
                        <img 
                          src={inv.templateImage} 
                          alt={inv.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                        
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 bg-purple-900/80 backdrop-blur-md border border-purple-400/30 text-purple-200 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            {inv.templateName}
                          </span>
                        </div>

                        <div className="absolute top-3 right-3">
                          <span className="px-2.5 py-1 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-emerald-300 rounded-full text-[10px] font-bold">
                            ● {inv.status}
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                          <span className="flex items-center gap-1 text-slate-300">
                            <Calendar className="w-3.5 h-3.5 text-purple-400" />
                            {inv.eventDetails.date}
                          </span>
                          <span className="flex items-center gap-1 bg-slate-900/80 px-2 py-0.5 rounded-md text-[11px]">
                            <Eye className="w-3 h-3 text-indigo-400" />
                            {inv.viewsCount} views
                          </span>
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="p-5 space-y-3">
                        <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                          {inv.title}
                        </h3>

                        <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                          <div className="truncate text-slate-400 max-w-[200px]">
                            https://invitra.com/u/<span className="text-purple-300 font-semibold">{inv.slug}</span>
                          </div>
                          <button
                            onClick={() => handleCopyLink(inv)}
                            className="text-purple-400 hover:text-purple-300 p-1.5 hover:bg-purple-950/50 rounded-lg transition-colors"
                            title="Salin Link"
                          >
                            {copiedId === inv.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1">
                          <div className="bg-slate-900/40 p-2 rounded-lg text-center border border-slate-800">
                            <div className="font-bold text-white text-sm">{inv.guestList.length}</div>
                            <div>Daftar Tamu</div>
                          </div>
                          <div className="bg-slate-900/40 p-2 rounded-lg text-center border border-slate-800">
                            <div className="font-bold text-emerald-400 text-sm">{inv.rsvps.length}</div>
                            <div>Respon RSVP</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="p-4 bg-slate-900/60 border-t border-slate-800 grid grid-cols-3 gap-2 text-xs">
                      <button
                        onClick={() => {
                          setSelectedInvId(inv.id);
                          setActiveTab('editor');
                        }}
                        className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold transition-all flex items-center justify-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-purple-400" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedInvId(inv.id);
                          setActiveTab('guests');
                        }}
                        className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold transition-all flex items-center justify-center gap-1"
                      >
                        <Users className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Tamu</span>
                      </button>

                      <button
                        onClick={() => onPreviewInvitation(tmpl)}
                        className="py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 rounded-xl font-bold transition-all flex items-center justify-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: EDITOR & BUILDER */}
        {activeTab === 'editor' && editForm && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Form Column */}
            <div className="lg:col-span-2 bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                <div>
                  <h3 className="text-lg font-extrabold text-white">Edit Content Undangan</h3>
                  <p className="text-xs text-slate-400">Atur rincian mempelai, lokasi acara, galeri, dan cerita kamu.</p>
                </div>
                <button
                  onClick={handleSaveEditor}
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/30 transition-all flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>

              {/* Editor Sub-Tabs */}
              <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-700">
                <button
                  onClick={() => setEditorSubTab('acara')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    editorSubTab === 'acara' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  💍 Acara & Mempelai
                </button>
                <button
                  onClick={() => setEditorSubTab('galeri')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    editorSubTab === 'galeri' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🖼️ Galeri & Musik
                </button>
                <button
                  onClick={() => setEditorSubTab('story')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    editorSubTab === 'story' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  📖 Story
                </button>
                <button
                  onClick={() => setEditorSubTab('amplop')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    editorSubTab === 'amplop' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  💳 Amplop Digital
                </button>
              </div>

              {/* Sub-Tab 1: Acara & Mempelai */}
              {editorSubTab === 'acara' && (
                <div className="space-y-5 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Judul Utama Undangan</label>
                    <input 
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {/* Mempelai Pria */}
                    <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/80 space-y-3">
                      <h4 className="font-bold text-purple-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 text-purple-400" />
                        Mempelai Pria / Utama
                      </h4>
                      <div>
                        <label className="text-slate-400 block mb-1">Nama Lengkap & Gelar</label>
                        <input 
                          type="text"
                          value={editForm.eventDetails.groomName}
                          onChange={(e) => setEditForm({
                            ...editForm,
                            eventDetails: { ...editForm.eventDetails, groomName: e.target.value }
                          })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Keterangan Orang Tua</label>
                        <input 
                          type="text"
                          value={editForm.eventDetails.groomParents}
                          onChange={(e) => setEditForm({
                            ...editForm,
                            eventDetails: { ...editForm.eventDetails, groomParents: e.target.value }
                          })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                        />
                      </div>
                    </div>

                    {/* Mempelai Wanita */}
                    <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/80 space-y-3">
                      <h4 className="font-bold text-pink-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 text-pink-400" />
                        Mempelai Wanita / Pendamping
                      </h4>
                      <div>
                        <label className="text-slate-400 block mb-1">Nama Lengkap & Gelar</label>
                        <input 
                          type="text"
                          value={editForm.eventDetails.brideName}
                          onChange={(e) => setEditForm({
                            ...editForm,
                            eventDetails: { ...editForm.eventDetails, brideName: e.target.value }
                          })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Keterangan Orang Tua</label>
                        <input 
                          type="text"
                          value={editForm.eventDetails.brideParents}
                          onChange={(e) => setEditForm({
                            ...editForm,
                            eventDetails: { ...editForm.eventDetails, brideParents: e.target.value }
                          })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Akad & Resepsi */}
                  <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/80 space-y-4 pt-4">
                    <h4 className="font-bold text-indigo-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      Waktu & Lokasi Acara Utama (Akad/Keagamaan)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-slate-400 block mb-1">Hari & Tanggal</label>
                        <input 
                          type="text"
                          value={editForm.eventDetails.date}
                          onChange={(e) => setEditForm({
                            ...editForm,
                            eventDetails: { ...editForm.eventDetails, date: e.target.value }
                          })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Waktu / Jam</label>
                        <input 
                          type="text"
                          value={editForm.eventDetails.time}
                          onChange={(e) => setEditForm({
                            ...editForm,
                            eventDetails: { ...editForm.eventDetails, time: e.target.value }
                          })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-slate-400 block mb-1">Nama Tempat / Gedung</label>
                        <input 
                          type="text"
                          value={editForm.eventDetails.locationName}
                          onChange={(e) => setEditForm({
                            ...editForm,
                            eventDetails: { ...editForm.eventDetails, locationName: e.target.value }
                          })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Alamat Lengkap</label>
                        <input 
                          type="text"
                          value={editForm.eventDetails.locationAddress}
                          onChange={(e) => setEditForm({
                            ...editForm,
                            eventDetails: { ...editForm.eventDetails, locationAddress: e.target.value }
                          })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 2: Galeri & Musik */}
              {editorSubTab === 'galeri' && (
                <div className="space-y-5 text-xs">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Musik Latar</label>
                    <input 
                      type="text"
                      value={editForm.musicTitle}
                      onChange={(e) => setEditForm({ ...editForm, musicTitle: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                      placeholder="Judul lagu romantis background..."
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-2">Foto Galeri Kenangan (URL Foto)</label>
                    <div className="space-y-3">
                      {editForm.gallery.map((imgUrl, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input 
                            type="text"
                            value={imgUrl}
                            onChange={(e) => {
                              const newGal = [...editForm.gallery];
                              newGal[idx] = e.target.value;
                              setEditForm({ ...editForm, gallery: newGal });
                            }}
                            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                          />
                          <button
                            onClick={() => {
                              const newGal = editForm.gallery.filter((_, i) => i !== idx);
                              setEditForm({ ...editForm, gallery: newGal });
                            }}
                            className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-xl"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}

                      <button
                        onClick={() => {
                          setEditForm({
                            ...editForm,
                            gallery: [...editForm.gallery, 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800']
                          });
                        }}
                        className="px-3 py-2 bg-slate-900 border border-dashed border-slate-700 hover:border-purple-500 text-purple-400 rounded-xl font-bold flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>+ Tambah Foto Galeri</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 3: Story */}
              {editorSubTab === 'story' && (
                <div className="space-y-4 text-xs">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-300">Linimasa Story (Kisah Cinta)</label>
                    <button
                      onClick={() => {
                        const newStory: LoveStoryItem = { year: '2025', title: 'Judul Momen', story: 'Cerita momen spesial...' };
                        setEditForm({ ...editForm, loveStory: [...editForm.loveStory, newStory] });
                      }}
                      className="px-3 py-1.5 bg-purple-600 text-white rounded-xl text-xs font-bold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Momen</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {editForm.loveStory.map((story, idx) => (
                      <div key={idx} className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/80 space-y-2">
                        <div className="flex items-center gap-2">
                          <input 
                            type="text"
                            value={story.year}
                            onChange={(e) => {
                              const updated = [...editForm.loveStory];
                              updated[idx].year = e.target.value;
                              setEditForm({ ...editForm, loveStory: updated });
                            }}
                            className="w-20 bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-purple-300 font-bold"
                            placeholder="Tahun"
                          />
                          <input 
                            type="text"
                            value={story.title}
                            onChange={(e) => {
                              const updated = [...editForm.loveStory];
                              updated[idx].title = e.target.value;
                              setEditForm({ ...editForm, loveStory: updated });
                            }}
                            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-bold"
                            placeholder="Judul Momen"
                          />
                          <button
                            onClick={() => {
                              const updated = editForm.loveStory.filter((_, i) => i !== idx);
                              setEditForm({ ...editForm, loveStory: updated });
                            }}
                            className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <textarea
                          value={story.story}
                          onChange={(e) => {
                            const updated = [...editForm.loveStory];
                            updated[idx].story = e.target.value;
                            setEditForm({ ...editForm, loveStory: updated });
                          }}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-300"
                          rows={2}
                          placeholder="Ceritakan momen singkat ini..."
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-Tab 4: Amplop Digital */}
              {editorSubTab === 'amplop' && (
                <div className="space-y-4 text-xs">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-300">Rekening Amplop & Digital Gift</label>
                    <button
                      onClick={() => {
                        const newBank: BankAccountItem = { bankName: 'BCA', accountNumber: '123456789', accountHolder: 'Nama Pemilik' };
                        setEditForm({ ...editForm, bankAccounts: [...editForm.bankAccounts, newBank] });
                      }}
                      className="px-3 py-1.5 bg-purple-600 text-white rounded-xl text-xs font-bold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Bank</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {editForm.bankAccounts.map((bank, idx) => (
                      <div key={idx} className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/80 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                        <input 
                          type="text"
                          value={bank.bankName}
                          onChange={(e) => {
                            const updated = [...editForm.bankAccounts];
                            updated[idx].bankName = e.target.value;
                            setEditForm({ ...editForm, bankAccounts: updated });
                          }}
                          className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                          placeholder="Nama Bank / E-Wallet"
                        />
                        <input 
                          type="text"
                          value={bank.accountNumber}
                          onChange={(e) => {
                            const updated = [...editForm.bankAccounts];
                            updated[idx].accountNumber = e.target.value;
                            setEditForm({ ...editForm, bankAccounts: updated });
                          }}
                          className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                          placeholder="Nomor Rekening"
                        />
                        <div className="flex items-center gap-2">
                          <input 
                            type="text"
                            value={bank.accountHolder}
                            onChange={(e) => {
                              const updated = [...editForm.bankAccounts];
                              updated[idx].accountHolder = e.target.value;
                              setEditForm({ ...editForm, bankAccounts: updated });
                            }}
                            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                            placeholder="Atas Nama"
                          />
                          <button
                            onClick={() => {
                              const updated = editForm.bankAccounts.filter((_, i) => i !== idx);
                              setEditForm({ ...editForm, bankAccounts: updated });
                            }}
                            className="p-2 text-red-400 hover:bg-red-500/20 rounded-xl"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Live Card Preview Column */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 space-y-4 shadow-xl sticky top-24">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-purple-400" />
                  Pratinjau Tampilan Undangan
                </h3>
                <span className="text-[10px] bg-purple-500/20 border border-purple-500/30 text-purple-300 px-2 py-0.5 rounded-full font-bold">
                  Realtime Sync
                </span>
              </div>

              {/* Smartphone Frame Simulation */}
              <div className="bg-slate-950 rounded-3xl p-4 border-4 border-slate-700 shadow-2xl space-y-4 text-center max-w-sm mx-auto">
                <div className="h-40 rounded-2xl overflow-hidden relative">
                  <img src={editForm.templateImage} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  <div className="absolute bottom-3 inset-x-0 text-white font-serif italic text-sm">
                    {editForm.title}
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="font-bold text-purple-300">{editForm.eventDetails.groomName}</div>
                  <div className="text-[10px] text-slate-400">&</div>
                  <div className="font-bold text-pink-300">{editForm.eventDetails.brideName || 'Pasangan'}</div>
                </div>

                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <div className="font-bold text-amber-300">{editForm.eventDetails.date}</div>
                  <div className="text-[10px] text-slate-400">{editForm.eventDetails.locationName}</div>
                </div>

                <button
                  onClick={() => {
                    const tmpl = templates.find(t => t.id === editForm.templateId) || templates[0];
                    onPreviewInvitation(tmpl);
                  }}
                  className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  Buka Undangan Penuh
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MANAJEMEN TAMU & SEBAR WA */}
        {activeTab === 'guests' && editForm && (
          <div className="space-y-6">
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 space-y-6 shadow-xl">
              <div>
                <h3 className="text-lg font-bold text-white">Manajemen Daftar Tamu & Sebar WhatsApp</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Buat link personal kustom untuk masing-masing tamu & sebar langsung ke WhatsApp dengan 1-klik!
                </p>
              </div>

              {/* Add Guest Form */}
              <form onSubmit={handleAddGuest} className="bg-slate-900/90 p-4 rounded-2xl border border-slate-700/80 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Nama Tamu Undangan</label>
                  <input 
                    type="text"
                    value={newGuestName}
                    onChange={(e) => setNewGuestName(e.target.value)}
                    placeholder="Misal: Bpk. H. Ahmad & Partner"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Nomor WhatsApp (Opsional)</label>
                  <input 
                    type="text"
                    value={newGuestPhone}
                    onChange={(e) => setNewGuestPhone(e.target.value)}
                    placeholder="081234567890"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Kategori Tamu</label>
                  <select 
                    value={newGuestCategory}
                    onChange={(e) => setNewGuestCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs font-semibold"
                  >
                    <option value="Keluarga Besar">Keluarga Besar</option>
                    <option value="Sahabat / Teman Dekat">Sahabat / Teman Dekat</option>
                    <option value="Rekan Kerja / VIP">Rekan Kerja / VIP</option>
                    <option value="Tetangga">Tetangga</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-900/30 transition-all flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Tambah Tamu</span>
                </button>
              </form>

              {/* Guest List Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700 text-slate-400 uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-4">Nama Tamu</th>
                      <th className="py-3 px-4">Kategori</th>
                      <th className="py-3 px-4">Nomor WhatsApp</th>
                      <th className="py-3 px-4">Link Kustom Tamu</th>
                      <th className="py-3 px-4 text-center">Status Sebar</th>
                      <th className="py-3 px-4 text-right">Aksi WA & Link</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-200 font-medium">
                    {editForm.guestList.map((guest) => (
                      <tr key={guest.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-white">
                          {guest.name}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-0.5 bg-slate-900 border border-slate-700 text-purple-300 rounded-full text-[10px]">
                            {guest.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-400 font-mono">
                          {guest.phone}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-slate-400 font-mono text-[11px]">
                            invitra.com/u/{editForm.slug}?to=<span className="text-purple-300 font-bold">{encodeURIComponent(guest.name)}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => handleToggleGuestSent(guest.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                              guest.statusSent 
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}
                          >
                            {guest.statusSent ? '✓ Terkirim' : '⏳ Belum'}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <a
                            href={getWaLink(guest, editForm)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              if (!guest.statusSent) handleToggleGuestSent(guest.id);
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all text-[11px]"
                          >
                            <Send className="w-3 h-3" />
                            <span>Kirim WA</span>
                          </a>

                          <button
                            onClick={() => handleCopyLink(editForm, guest.name)}
                            className="p-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-all"
                            title="Salin Link Kustom"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDeleteGuest(guest.id)}
                            className="p-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-all"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: BUKU TAMU & RSVP */}
        {activeTab === 'rsvps' && editForm && (
          <div className="space-y-6">
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Daftar Konfirmasi RSVP & Ucapan Tamu</h3>
                  <p className="text-xs text-slate-400 mt-1">Data kehadiran otomatis dari tamu yang mengisi form di link undangan kamu.</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
                    Hadir: {editForm.rsvps.filter(r => r.attendance === 'Hadir').reduce((acc, r) => acc + r.pax, 0)} Orang
                  </span>
                  <span className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
                    Ragu: {editForm.rsvps.filter(r => r.attendance === 'Ragu-ragu').length} Tamu
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {editForm.rsvps.map((rsvp) => (
                  <div key={rsvp.id} className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{rsvp.name}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          rsvp.attendance === 'Hadir' ? 'bg-emerald-500/20 text-emerald-300' :
                          rsvp.attendance === 'Tidak Hadir' ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {rsvp.attendance} ({rsvp.pax} Pax)
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">{rsvp.date}</span>
                    </div>

                    <p className="text-xs text-slate-300 italic bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                      "{rsvp.message}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: ANALYTICS */}
        {activeTab === 'analytics' && editForm && (
          <div className="space-y-6">
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 space-y-6 shadow-xl">
              <div>
                <h3 className="text-lg font-bold text-white">Statistik & Trafik Pengunjung Undangan</h3>
                <p className="text-xs text-slate-400 mt-1">Pantau performa sebaran undangan digital kamu secara realtime.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 text-center space-y-2">
                  <Eye className="w-8 h-8 text-indigo-400 mx-auto" />
                  <div className="text-3xl font-black text-white">{editForm.viewsCount}</div>
                  <div className="text-xs text-slate-400 font-semibold">Total Pengunjung Membuka Web</div>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 text-center space-y-2">
                  <Users className="w-8 h-8 text-emerald-400 mx-auto" />
                  <div className="text-3xl font-black text-white">{editForm.guestList.length}</div>
                  <div className="text-xs text-slate-400 font-semibold">Tamu Dalam Daftar Broadcast</div>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-purple-400 mx-auto" />
                  <div className="text-3xl font-black text-white">{editForm.rsvps.length}</div>
                  <div className="text-xs text-slate-400 font-semibold">Total Respon Masuk</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
