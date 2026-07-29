import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  Globe, 
  ShoppingBag, 
  Users, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Search, 
  DollarSign, 
  FileText, 
  ArrowLeft,
  Save,
  HelpCircle,
  Star,
  Check,
  TrendingUp,
  CreditCard,
  PhoneCall,
  ExternalLink,
  ShieldCheck,
  Image as ImageIcon,
  Music,
  Palette
} from 'lucide-react';
import { TemplateTheme, PricingPlan, FeatureItem, Testimonial, FaqItem, Order, UserAccount, HeroConfig, TemplateCategory } from '../types';

interface AdminDashboardProps {
  onBackToMain: () => void;
  // State props passed from parent App
  templates: TemplateTheme[];
  onAddTemplate: (newTpl: TemplateTheme) => void;
  onUpdateTemplate: (updatedTpl: TemplateTheme) => void;
  onDeleteTemplate: (id: string) => void;

  pricingPlans: PricingPlan[];
  onUpdatePricingPlan: (updatedPlan: PricingPlan) => void;

  heroConfig: HeroConfig;
  onUpdateHeroConfig: (newConfig: HeroConfig) => void;

  faqData: FaqItem[];
  onAddFaq: (faq: FaqItem) => void;
  onUpdateFaq: (faq: FaqItem) => void;
  onDeleteFaq: (id: string) => void;

  featuresData: FeatureItem[];
  onAddFeature: (feat: FeatureItem) => void;
  onUpdateFeature: (feat: FeatureItem) => void;
  onDeleteFeature: (id: string) => void;

  testimonialsData: Testimonial[];
  onAddTestimonial: (testi: Testimonial) => void;
  onDeleteTestimonial: (id: string) => void;

  orders: Order[];
  onUpdateOrderStatus: (orderId: string, newStatus: Order['status']) => void;

  users: UserAccount[];
  onUpdateUserRole: (userId: string, role: 'admin' | 'user') => void;
  onToggleUserStatus: (userId: string) => void;
  
  onPreviewTemplate: (template: TemplateTheme) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToMain,
  templates,
  onAddTemplate,
  onUpdateTemplate,
  onDeleteTemplate,
  pricingPlans,
  onUpdatePricingPlan,
  heroConfig,
  onUpdateHeroConfig,
  faqData,
  onAddFaq,
  onUpdateFaq,
  onDeleteFaq,
  featuresData,
  onAddFeature,
  onUpdateFeature,
  onDeleteFeature,
  testimonialsData,
  onAddTestimonial,
  onDeleteTestimonial,
  orders,
  onUpdateOrderStatus,
  users,
  onUpdateUserRole,
  onToggleUserStatus,
  onPreviewTemplate
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'templates' | 'landing' | 'orders' | 'users' | 'settings'>('overview');
  const [landingSubTab, setLandingSubTab] = useState<'hero' | 'pricing' | 'features' | 'faq' | 'testimonials'>('hero');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Template Modal State
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<TemplateTheme | null>(null);

  // FAQ Modal State
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);

  // Feature Modal State
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<FeatureItem | null>(null);

  // Pricing Edit State
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);

  // Hero Edit State
  const [heroForm, setHeroForm] = useState<HeroConfig>(heroConfig);

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState({
    siteName: 'INVITRA - Premium Digital Invitation',
    bcaAccount: '8830192811 - PT INVITRA DIGITAL',
    mandiriAccount: '1270009988771 - PT INVITRA DIGITAL',
    csWhatsapp: '6281234567890',
    maintenanceMode: false
  });

  // Filter States
  const [templateFilterCategory, setTemplateFilterCategory] = useState<string>('all');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [userSearchQuery, setUserSearchQuery] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Metrics Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status === 'Aktif' ? o.amount : 0), 0);
  const activeOrdersCount = orders.filter(o => o.status === 'Aktif').length;
  const pendingOrdersCount = orders.filter(o => o.status === 'Pending').length;

  // Handle Template Submit
  const handleSaveTemplateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = editingTemplate ? editingTemplate.id : `tpl-${Date.now()}`;
    
    const templateData: TemplateTheme = {
      id,
      name: formData.get('name') as string,
      category: formData.get('category') as TemplateCategory,
      tag: formData.get('tag') as string,
      image: formData.get('image') as string,
      description: formData.get('description') as string,
      accentColor: formData.get('accentColor') as string,
      bgGradient: formData.get('bgGradient') as string || 'from-pink-100 via-purple-50 to-rose-100',
      fontTitle: formData.get('fontTitle') as string || 'Playfair Display',
      musicTitle: formData.get('musicTitle') as string || 'Acoustic Piano Love',
      isPopular: formData.get('isPopular') === 'on',
      isNew: formData.get('isNew') === 'on',
      isFree: formData.get('isFree') === 'on',
      coupleDefault: {
        groom: formData.get('groom') as string || 'Pengantin Pria',
        bride: formData.get('bride') as string || 'Pengantin Wanita',
        date: formData.get('weddingDate') as string || '24 Oktober 2026',
        location: formData.get('location') as string || 'Grand Ballroom Hotel, Jakarta'
      }
    };

    if (editingTemplate) {
      onUpdateTemplate(templateData);
      showToast('Template berhasil diperbarui!');
    } else {
      onAddTemplate(templateData);
      showToast('Template baru berhasil ditambahkan!');
    }
    setIsTemplateModalOpen(false);
    setEditingTemplate(null);
  };

  // Handle Hero Submit
  const handleSaveHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateHeroConfig(heroForm);
    showToast('Konten Hero Landing Page berhasil disimpan!');
  };

  // Handle Pricing Submit
  const handleSavePricingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPlan) {
      onUpdatePricingPlan(editingPlan);
      showToast(`Paket ${editingPlan.name} berhasil diperbarui!`);
      setEditingPlan(null);
    }
  };

  // Handle FAQ Submit
  const handleSaveFaqSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const faqItem: FaqItem = {
      id: editingFaq ? editingFaq.id : `faq-${Date.now()}`,
      question: formData.get('question') as string,
      answer: formData.get('answer') as string
    };

    if (editingFaq) {
      onUpdateFaq(faqItem);
      showToast('FAQ berhasil diperbarui!');
    } else {
      onAddFaq(faqItem);
      showToast('FAQ baru berhasil ditambahkan!');
    }
    setIsFaqModalOpen(false);
    setEditingFaq(null);
  };

  // Filtered Templates
  const filteredTemplates = templates.filter(t => 
    templateFilterCategory === 'all' || t.category === templateFilterCategory
  );

  // Filtered Orders
  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.customerName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
                          o.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
                          o.coupleNames.toLowerCase().includes(orderSearchQuery.toLowerCase());
    const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Users
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans-body selection:bg-purple-500 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 font-bold text-sm animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle className="w-5 h-5 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToMain}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border border-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Landing Page</span>
          </button>
          <div className="h-5 w-px bg-slate-800 hidden sm:block"></div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
              A
            </div>
            <div>
              <h1 className="text-sm font-bold text-white flex items-center gap-2">
                <span>INVITRA Control Center</span>
                <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] rounded-full font-semibold">Super Admin</span>
              </h1>
              <p className="text-[11px] text-slate-400">Atur Seluruh Landing Page, Template, Pesanan & Pengguna</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-3 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/80 text-xs text-slate-300">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Rp {totalRevenue.toLocaleString('id-ID')}
            </span>
            <span className="text-slate-500">|</span>
            <span>{activeOrdersCount} Undangan Aktif</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-2xl border border-slate-700">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" 
              alt="Admin Avatar"
              className="w-7 h-7 rounded-xl object-cover border border-purple-500/50" 
            />
            <span className="text-xs font-semibold text-slate-200 pr-2 hidden sm:inline">Admin Master</span>
          </div>
        </div>
      </header>

      {/* Main Container Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        
        {/* Navigation Tabs Bar */}
        <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'templates'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Kelola Template ({templates.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('landing')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'landing'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Kelola Landing Page</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap relative ${
              activeTab === 'orders'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Pesanan Undangan ({orders.length})</span>
            {pendingOrdersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] flex items-center justify-center ml-1 animate-pulse">
                {pendingOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'users'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Daftar Pengguna ({users.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Pengaturan Sistem</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW / ANALYTICS */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6" />
                </div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Omset Penjualan</p>
                <h2 className="text-3xl font-extrabold text-white">Rp {totalRevenue.toLocaleString('id-ID')}</h2>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+24.5% bulan ini</span>
                </div>
              </div>

              <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 text-purple-400 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Undangan Terbuat</p>
                <h2 className="text-3xl font-extrabold text-white">{orders.length} Undangan</h2>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-emerald-400 font-bold">{activeOrdersCount} Aktif</span>
                  <span>•</span>
                  <span className="text-amber-400 font-bold">{pendingOrdersCount} Pending</span>
                </div>
              </div>

              <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Koleksi Template Theme</p>
                <h2 className="text-3xl font-extrabold text-white">{templates.length} Tema</h2>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                  <span>{templates.filter(t => t.isPopular).length} Popular</span>
                  <span>•</span>
                  <span>{templates.filter(t => t.isFree).length} Gratis</span>
                </div>
              </div>

              <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Terdaftar User</p>
                <h2 className="text-3xl font-extrabold text-white">{users.length} Akun</h2>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% Verified Users</span>
                </div>
              </div>
            </div>

            {/* Quick Control Center & Recent Orders Table */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Recent Orders List */}
              <div className="lg:col-span-2 bg-slate-800/60 border border-slate-700/80 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-purple-400" />
                      <span>Pesanan Undangan Terbaru</span>
                    </h3>
                    <p className="text-xs text-slate-400">Daftar transaksi dan status pembayaran pelanggan</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1"
                  >
                    <span>Lihat Semua</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-700/80 text-slate-400 uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-3">ID & Nama Acara</th>
                        <th className="py-3 px-3">Pelanggan</th>
                        <th className="py-3 px-3">Paket</th>
                        <th className="py-3 px-3">Harga</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                      {orders.slice(0, 5).map(ord => (
                        <tr key={ord.id} className="hover:bg-slate-700/30 transition-colors">
                          <td className="py-3 px-3">
                            <div className="font-bold text-white">{ord.coupleNames}</div>
                            <div className="text-[10px] text-slate-400">{ord.id} • {ord.templateName}</div>
                          </td>
                          <td className="py-3 px-3">
                            <div className="text-slate-200 font-medium">{ord.customerName}</div>
                            <div className="text-[10px] text-slate-400">{ord.customerPhone}</div>
                          </td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-lg text-[10px] font-bold">
                              {ord.planName}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-bold text-emerald-400">
                            Rp {ord.amount.toLocaleString('id-ID')}
                          </td>
                          <td className="py-3 px-3">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 w-max ${
                              ord.status === 'Aktif'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : ord.status === 'Pending'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                ord.status === 'Aktif' ? 'bg-emerald-400' : ord.status === 'Pending' ? 'bg-amber-400' : 'bg-rose-400'
                              }`}></span>
                              <span>{ord.status}</span>
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            {ord.status === 'Pending' && (
                              <button
                                onClick={() => {
                                  onUpdateOrderStatus(ord.id, 'Aktif');
                                  showToast(`Pembayaran ${ord.id} dikonfirmasi!`);
                                }}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-[11px] transition-colors"
                              >
                                Verifikasi
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>Aksi Cepat Admin</span>
                  </h3>
                  <p className="text-xs text-slate-400 mb-6">Pintasan cepat untuk memperbarui sistem</p>

                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setEditingTemplate(null);
                        setIsTemplateModalOpen(true);
                      }}
                      className="w-full p-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-2xl font-bold text-xs flex items-center justify-between transition-all shadow-lg shadow-purple-600/20"
                    >
                      <div className="flex items-center gap-2.5">
                        <Plus className="w-4 h-4" />
                        <span>Tambah Template Undangan Baru</span>
                      </div>
                      <Sparkles className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('landing');
                        setLandingSubTab('hero');
                      }}
                      className="w-full p-3.5 bg-slate-700/60 hover:bg-slate-700 text-slate-200 rounded-2xl font-bold text-xs flex items-center justify-between transition-all border border-slate-600/80"
                    >
                      <div className="flex items-center gap-2.5">
                        <Edit3 className="w-4 h-4 text-purple-400" />
                        <span>Edit Banner & Teks Hero Landing</span>
                      </div>
                      <Globe className="w-4 h-4 text-slate-400" />
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('landing');
                        setLandingSubTab('pricing');
                      }}
                      className="w-full p-3.5 bg-slate-700/60 hover:bg-slate-700 text-slate-200 rounded-2xl font-bold text-xs flex items-center justify-between transition-all border border-slate-600/80"
                    >
                      <div className="flex items-center gap-2.5">
                        <CreditCard className="w-4 h-4 text-emerald-400" />
                        <span>Ubah Harga & Fitur Paket</span>
                      </div>
                      <DollarSign className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-purple-950/40 border border-purple-800/40 rounded-2xl">
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-300 mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Status Sistem Normal</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Seluruh server rendering & database berjalan optimal tanpa hambatan.</p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: KELOLA TEMPLATE */}
        {activeTab === 'templates' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header & Add Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800/60 border border-slate-700/80 p-5 rounded-3xl">
              <div>
                <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span>Koleksi Template Undangan ({templates.length})</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Tambah, edit, dan atur katalog template yang tersedia di landing page</p>
              </div>

              <button
                onClick={() => {
                  setEditingTemplate(null);
                  setIsTemplateModalOpen(true);
                }}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-2xl text-xs flex items-center gap-2 transition-all shadow-lg shadow-purple-600/30"
              >
                <Plus className="w-4 h-4" />
                <span>Buat Template Baru</span>
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {[
                { id: 'all', label: 'Semua Tema' },
                { id: 'wedding', label: '💍 Pernikahan (Wedding)' },
                { id: 'birthday', label: '🎂 Ulang Tahun' },
                { id: 'aqiqah', label: '👶 Aqiqah & Syukuran' },
                { id: 'corporate', label: '💼 Corporate / Event' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setTemplateFilterCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    templateFilterCategory === cat.id
                      ? 'bg-white text-slate-900 shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Template Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map(tpl => (
                <div 
                  key={tpl.id}
                  className="bg-slate-800/80 border border-slate-700/80 rounded-3xl overflow-hidden group hover:border-purple-500/60 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Image Thumbnail */}
                    <div className="h-52 relative overflow-hidden bg-slate-950">
                      <img 
                        src={tpl.image} 
                        alt={tpl.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30"></div>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded-full border border-white/20">
                          {tpl.tag}
                        </span>
                        {tpl.isPopular && (
                          <span className="px-2 py-0.5 bg-amber-500 text-slate-950 text-[10px] font-black rounded-full">
                            Popular 🔥
                          </span>
                        )}
                        {tpl.isNew && (
                          <span className="px-2 py-0.5 bg-emerald-500 text-slate-950 text-[10px] font-black rounded-full">
                            Baru ✨
                          </span>
                        )}
                        {tpl.isFree && (
                          <span className="px-2 py-0.5 bg-blue-500 text-white text-[10px] font-black rounded-full">
                            Gratis
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-lg font-bold text-white drop-shadow-md">{tpl.name}</h3>
                        <p className="text-[11px] text-slate-300 capitalize">{tpl.category} Theme</p>
                      </div>
                    </div>

                    {/* Details Info */}
                    <div className="p-5 space-y-3">
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{tpl.description}</p>

                      <div className="pt-2 border-t border-slate-700/60 grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                        <div className="flex items-center gap-1.5">
                          <Palette className="w-3.5 h-3.5 text-purple-400" />
                          <span>Warna: {tpl.accentColor}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Music className="w-3.5 h-3.5 text-indigo-400" />
                          <span className="truncate">{tpl.musicTitle}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons Footer */}
                  <div className="p-4 bg-slate-900/60 border-t border-slate-700/80 grid grid-cols-3 gap-2">
                    <button
                      onClick={() => onPreviewTemplate(tpl)}
                      className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition-colors border border-slate-700"
                    >
                      <Eye className="w-3.5 h-3.5 text-purple-400" />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={() => {
                        setEditingTemplate(tpl);
                        setIsTemplateModalOpen(true);
                      }}
                      className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition-colors border border-slate-700"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Hapus template ${tpl.name}?`)) {
                          onDeleteTemplate(tpl.id);
                          showToast('Template dihapus.');
                        }
                      }}
                      className="py-2 bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition-colors border border-rose-800/40"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: KELOLA LANDING PAGE */}
        {activeTab === 'landing' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Landing Sub-Nav Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setLandingSubTab('hero')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  landingSubTab === 'hero' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                1. Hero Banner & Stats
              </button>
              <button
                onClick={() => setLandingSubTab('pricing')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  landingSubTab === 'pricing' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                2. Paket & Harga
              </button>
              <button
                onClick={() => setLandingSubTab('features')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  landingSubTab === 'features' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                3. Fitur Unggulan
              </button>
              <button
                onClick={() => setLandingSubTab('faq')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  landingSubTab === 'faq' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                4. FAQ (Tanya Jawab)
              </button>
              <button
                onClick={() => setLandingSubTab('testimonials')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  landingSubTab === 'testimonials' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                5. Testimoni
              </button>
            </div>

            {/* SubTab 1: Hero Form */}
            {landingSubTab === 'hero' && (
              <form onSubmit={handleSaveHeroSubmit} className="bg-slate-800/80 border border-slate-700/80 p-6 sm:p-8 rounded-3xl space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Pengaturan Teks Header & Banner Hero</h3>
                  <p className="text-xs text-slate-400">Ubah ucapan selamat datang dan konten banner utama yang dilihat pengguna pertama kali</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">Eyebrow Pill Label</label>
                    <input 
                      type="text" 
                      value={heroForm.eyebrowPill}
                      onChange={e => setHeroForm({ ...heroForm, eyebrowPill: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">Judul Utama Baris 1</label>
                    <input 
                      type="text" 
                      value={heroForm.titlePart1}
                      onChange={e => setHeroForm({ ...heroForm, titlePart1: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">Judul Gradient Baris 2</label>
                    <input 
                      type="text" 
                      value={heroForm.titleGradient}
                      onChange={e => setHeroForm({ ...heroForm, titleGradient: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">Waktu Pembuatan Stat</label>
                    <input 
                      type="text" 
                      value={heroForm.timeStat}
                      onChange={e => setHeroForm({ ...heroForm, timeStat: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-300 mb-2">Deskripsi Subtitle Hero</label>
                    <textarea 
                      rows={3}
                      value={heroForm.subtitle}
                      onChange={e => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-2xl text-xs flex items-center gap-2 transition-all shadow-lg shadow-purple-600/30"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Perubahan Hero</span>
                  </button>
                </div>
              </form>
            )}

            {/* SubTab 2: Pricing Manager */}
            {landingSubTab === 'pricing' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {pricingPlans.map(plan => (
                    <div key={plan.id} className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 relative flex flex-col justify-between">
                      <div>
                        {plan.popular && (
                          <span className="px-3 py-1 bg-purple-500 text-white font-extrabold text-[10px] rounded-full uppercase tracking-wider mb-3 inline-block">
                            {plan.badge || 'Populer'}
                          </span>
                        )}
                        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                        <p className="text-xs text-slate-400 mb-4">{plan.description}</p>

                        <div className="text-2xl font-extrabold text-emerald-400 mb-4">
                          Rp {plan.price.toLocaleString('id-ID')}
                          {plan.originalPrice && (
                            <span className="text-xs text-slate-500 line-through font-normal ml-2">
                              Rp {plan.originalPrice.toLocaleString('id-ID')}
                            </span>
                          )}
                        </div>

                        <ul className="space-y-2 mb-6">
                          {plan.features.map((feat, idx) => (
                            <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => setEditingPlan(plan)}
                        className="w-full py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-600"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                        <span>Edit Harga & Fitur Paket</span>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Edit Pricing Modal */}
                {editingPlan && (
                  <form onSubmit={handleSavePricingSubmit} className="bg-slate-800 border border-slate-700 p-6 rounded-3xl space-y-4">
                    <h4 className="text-base font-bold text-white">Edit Paket: {editingPlan.name}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Nama Paket</label>
                        <input 
                          type="text" 
                          value={editingPlan.name}
                          onChange={e => setEditingPlan({ ...editingPlan, name: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Harga Utama (Rp)</label>
                        <input 
                          type="number" 
                          value={editingPlan.price}
                          onChange={e => setEditingPlan({ ...editingPlan, price: Number(e.target.value) })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-300 mb-1">Deskripsi Ringkas</label>
                        <input 
                          type="text" 
                          value={editingPlan.description}
                          onChange={e => setEditingPlan({ ...editingPlan, description: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingPlan(null)}
                        className="px-4 py-2 bg-slate-700 text-slate-300 text-xs font-bold rounded-xl"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-purple-600 text-white text-xs font-bold rounded-xl"
                      >
                        Simpan Paket
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* SubTab 4: FAQ Manager */}
            {landingSubTab === 'faq' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                  <h3 className="text-base font-bold text-white">Daftar Tanya Jawab FAQ ({faqData.length})</h3>
                  <button
                    onClick={() => {
                      setEditingFaq(null);
                      setIsFaqModalOpen(true);
                    }}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah FAQ</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {faqData.map(faq => (
                    <div key={faq.id} className="bg-slate-800/60 border border-slate-700 p-4 rounded-2xl flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1">{faq.question}</h4>
                        <p className="text-xs text-slate-400">{faq.answer}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingFaq(faq);
                            setIsFaqModalOpen(true);
                          }}
                          className="p-2 bg-slate-700 hover:bg-slate-600 text-amber-400 rounded-lg text-xs"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            onDeleteFaq(faq.id);
                            showToast('FAQ Dihapus');
                          }}
                          className="p-2 bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 rounded-lg text-xs"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PESANAN & UNDANGAN */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Search & Status Filter */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-800/80 p-5 rounded-3xl border border-slate-700">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Cari ID, Nama Acara, Pelanggan..."
                  value={orderSearchQuery}
                  onChange={e => setOrderSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                {['all', 'Aktif', 'Pending', 'Expired'].map(st => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      orderStatusFilter === st ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {st === 'all' ? 'Semua Status' : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Data Table */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-700">
                    <tr>
                      <th className="py-4 px-4">ID & Nama Mempelai / Acara</th>
                      <th className="py-4 px-4">Pelanggan</th>
                      <th className="py-4 px-4">Template & Paket</th>
                      <th className="py-4 px-4">Nominal</th>
                      <th className="py-4 px-4">Metode Bayar</th>
                      <th className="py-4 px-4">Status</th>
                      <th className="py-4 px-4 text-right">Ubah Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {filteredOrders.map(ord => (
                      <tr key={ord.id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white text-sm">{ord.coupleNames}</div>
                          <div className="text-[10px] text-slate-400">{ord.id} • Tgl Acara: {ord.weddingDate}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-slate-200 font-medium">{ord.customerName}</div>
                          <div className="text-[10px] text-slate-400">{ord.customerEmail}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-slate-300 font-medium">{ord.templateName}</div>
                          <div className="text-[10px] text-purple-400 font-bold">{ord.planName}</div>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-emerald-400 text-sm">
                          Rp {ord.amount.toLocaleString('id-ID')}
                        </td>
                        <td className="py-3.5 px-4 text-slate-300">
                          {ord.paymentMethod}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            ord.status === 'Aktif'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : ord.status === 'Pending'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}>
                            {ord.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-1">
                          <select
                            value={ord.status}
                            onChange={e => {
                              onUpdateOrderStatus(ord.id, e.target.value as Order['status']);
                              showToast(`Status ${ord.id} diubah ke ${e.target.value}`);
                            }}
                            className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1 font-bold focus:outline-none"
                          >
                            <option value="Aktif">Aktif</option>
                            <option value="Pending">Pending</option>
                            <option value="Expired">Expired</option>
                            <option value="Dibatalkan">Dibatalkan</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PENGGUNA */}
        {activeTab === 'users' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between bg-slate-800/80 p-5 rounded-3xl border border-slate-700">
              <div>
                <h2 className="text-xl font-bold text-white">Daftar Akun Pengguna ({users.length})</h2>
                <p className="text-xs text-slate-400">Atur hak akses admin, status akun, dan keanggotaan user</p>
              </div>

              <div className="relative w-64">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Cari user..."
                  value={userSearchQuery}
                  onChange={e => setUserSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white"
                />
              </div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-3xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-700">
                  <tr>
                    <th className="py-3.5 px-4">Pengguna</th>
                    <th className="py-3.5 px-4">Role Akses</th>
                    <th className="py-3.5 px-4">Paket</th>
                    <th className="py-3.5 px-4">Bergabung</th>
                    <th className="py-3.5 px-4">Undangan</th>
                    <th className="py-3.5 px-4 text-right">Aksi Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {filteredUsers.map(u => (
                    <tr key={u.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          {u.avatar ? (
                            <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover border border-purple-500/50" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center text-xs">
                              {u.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-white">{u.name}</div>
                            <div className="text-[10px] text-slate-400">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          u.role === 'admin' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-slate-700 text-slate-300'
                        }`}>
                          {u.role === 'admin' ? 'Super Admin' : 'Pelanggan'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 font-medium">
                        {u.package}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">
                        {u.joinedAt}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-purple-300">
                        {u.invitationsCount} Undangan
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            const newRole = u.role === 'admin' ? 'user' : 'admin';
                            onUpdateUserRole(u.id, newRole);
                            showToast(`Role ${u.name} diubah menjadi ${newRole}`);
                          }}
                          className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold rounded-lg transition-colors"
                        >
                          Tukar Role ({u.role === 'admin' ? 'Jadikan User' : 'Jadikan Admin'})
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: PENGATURAN SISTEM */}
        {activeTab === 'settings' && (
          <div className="bg-slate-800/80 border border-slate-700 p-6 sm:p-8 rounded-3xl space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Pengaturan Rekening Pembayaran & CS</h3>
              <p className="text-xs text-slate-400">Informasi ini ditampilkan di modal pembayaran dan bantuan WhatsApp</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Rekening Transfer BCA</label>
                <input 
                  type="text" 
                  value={settingsForm.bcaAccount}
                  onChange={e => setSettingsForm({ ...settingsForm, bcaAccount: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Rekening Transfer Mandiri</label>
                <input 
                  type="text" 
                  value={settingsForm.mandiriAccount}
                  onChange={e => setSettingsForm({ ...settingsForm, mandiriAccount: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Nomor WhatsApp CS Admin</label>
                <input 
                  type="text" 
                  value={settingsForm.csWhatsapp}
                  onChange={e => setSettingsForm({ ...settingsForm, csWhatsapp: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Nama Platform Slogan</label>
                <input 
                  type="text" 
                  value={settingsForm.siteName}
                  onChange={e => setSettingsForm({ ...settingsForm, siteName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700 flex justify-end">
              <button
                type="button"
                onClick={() => showToast('Pengaturan sistem disimpan!')}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-2xl text-xs flex items-center gap-2 shadow-lg shadow-purple-600/30"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Pengaturan</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* MODAL: TAMBAH / EDIT TEMPLATE */}
      {isTemplateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 my-8 relative shadow-2xl animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsTemplateModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
            >
              <XCircle className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1">
              {editingTemplate ? 'Edit Template Undangan' : 'Buat Template Undangan Baru'}
            </h3>
            <p className="text-xs text-slate-400 mb-6">Isi data visual dan informasi dasar untuk tema ini</p>

            <form onSubmit={handleSaveTemplateSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Nama Template</label>
                  <input 
                    name="name"
                    required
                    defaultValue={editingTemplate?.name || ''}
                    placeholder="misal: Emerald Blossom"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Kategori Event</label>
                  <select 
                    name="category"
                    defaultValue={editingTemplate?.category || 'wedding'}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="wedding">Pernikahan (Wedding)</option>
                    <option value="birthday">Ulang Tahun (Birthday)</option>
                    <option value="aqiqah">Aqiqah & Syukuran</option>
                    <option value="corporate">Corporate / Event</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Tag Sub-Judul</label>
                  <input 
                    name="tag"
                    required
                    defaultValue={editingTemplate?.tag || 'Floral Premium'}
                    placeholder="misal: Boho & Outdoor"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Warna Akses Aksen (Hex)</label>
                  <input 
                    name="accentColor"
                    required
                    defaultValue={editingTemplate?.accentColor || '#C8A2C8'}
                    placeholder="#C8A2C8"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 mb-1">Gambar Sample (URL Unsplash)</label>
                  <input 
                    name="image"
                    required
                    defaultValue={editingTemplate?.image || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800'}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 mb-1">Deskripsi Singkat</label>
                  <textarea 
                    name="description"
                    rows={2}
                    required
                    defaultValue={editingTemplate?.description || ''}
                    placeholder="Estetika bunga liar nan elegan dengan warna pastel..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Judul Musik Latar</label>
                  <input 
                    name="musicTitle"
                    defaultValue={editingTemplate?.musicTitle || 'A Thousand Years - Piano'}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Font Utama</label>
                  <input 
                    name="fontTitle"
                    defaultValue={editingTemplate?.fontTitle || 'Playfair Display'}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              {/* Status Checkboxes */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="isPopular" 
                    defaultChecked={editingTemplate?.isPopular} 
                    className="rounded bg-slate-800 border-slate-700 text-purple-600 focus:ring-0"
                  />
                  <span>Tandai Sebagai "Popular" 🔥</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="isNew" 
                    defaultChecked={editingTemplate?.isNew} 
                    className="rounded bg-slate-800 border-slate-700 text-purple-600 focus:ring-0"
                  />
                  <span>Tandai Sebagai "Baru" ✨</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="isFree" 
                    defaultChecked={editingTemplate?.isFree} 
                    className="rounded bg-slate-800 border-slate-700 text-purple-600 focus:ring-0"
                  />
                  <span>Gratis Diklaim</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsTemplateModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-purple-600/30"
                >
                  Simpan Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: FAQ EDIT */}
      {isFaqModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 relative">
            <h3 className="text-lg font-bold text-white mb-4">
              {editingFaq ? 'Edit FAQ' : 'Tambah FAQ Baru'}
            </h3>
            <form onSubmit={handleSaveFaqSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Pertanyaan</label>
                <input 
                  name="question"
                  required
                  defaultValue={editingFaq?.question || ''}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Jawaban</label>
                <textarea 
                  name="answer"
                  required
                  rows={4}
                  defaultValue={editingFaq?.answer || ''}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFaqModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 text-white font-bold text-xs rounded-xl"
                >
                  Simpan FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
