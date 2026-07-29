import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveStudioPreview } from './components/LiveStudioPreview';
import { TemplateGallery } from './components/TemplateGallery';
import { FeatureShowcase } from './components/FeatureShowcase';
import { HowItWorks } from './components/HowItWorks';
import { PricingSection } from './components/PricingSection';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { TemplateDetailModal } from './components/TemplateDetailModal';
import { CreateOrderModal } from './components/CreateOrderModal';
import { AuthModal } from './components/AuthModal';
import { AdminDashboard } from './components/AdminDashboard';
import { 
  TEMPLATES_DATA, 
  PRICING_PLANS, 
  INITIAL_HERO_CONFIG, 
  FAQ_DATA, 
  FEATURES_DATA, 
  TESTIMONIALS_DATA, 
  INITIAL_ORDERS, 
  INITIAL_USERS 
} from './data/mockData';
import { TemplateTheme, PricingPlan, HeroConfig, FaqItem, FeatureItem, Testimonial, Order, UserAccount } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'admin'>('landing');

  // Dynamic Application Data States (Managed by Admin)
  const [templates, setTemplates] = useState<TemplateTheme[]>(TEMPLATES_DATA);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(PRICING_PLANS);
  const [heroConfig, setHeroConfig] = useState<HeroConfig>(INITIAL_HERO_CONFIG);
  const [faqData, setFaqData] = useState<FaqItem[]>(FAQ_DATA);
  const [featuresData, setFeaturesData] = useState<FeatureItem[]>(FEATURES_DATA);
  const [testimonialsData, setTestimonialsData] = useState<Testimonial[]>(TESTIMONIALS_DATA);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);

  // Modals & Selection States
  const [selectedTemplateForDetail, setSelectedTemplateForDetail] = useState<TemplateTheme | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [modalInitialTemplate, setModalInitialTemplate] = useState<TemplateTheme | null>(null);
  const [modalInitialPlan, setModalInitialPlan] = useState<PricingPlan | null>(null);

  // Authentication State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; avatar?: string } | null>(null);

  // Admin CRUD Handlers
  const handleAddTemplate = (newTpl: TemplateTheme) => {
    setTemplates(prev => [newTpl, ...prev]);
  };

  const handleUpdateTemplate = (updatedTpl: TemplateTheme) => {
    setTemplates(prev => prev.map(t => t.id === updatedTpl.id ? updatedTpl : t));
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
  };

  const handleUpdatePricingPlan = (updatedPlan: PricingPlan) => {
    setPricingPlans(prev => prev.map(p => p.id === updatedPlan.id ? updatedPlan : p));
  };

  const handleAddFaq = (faq: FaqItem) => {
    setFaqData(prev => [...prev, faq]);
  };

  const handleUpdateFaq = (faq: FaqItem) => {
    setFaqData(prev => prev.map(f => f.id === faq.id ? faq : f));
  };

  const handleDeleteFaq = (id: string) => {
    setFaqData(prev => prev.filter(f => f.id !== id));
  };

  const handleAddFeature = (feat: FeatureItem) => {
    setFeaturesData(prev => [...prev, feat]);
  };

  const handleUpdateFeature = (feat: FeatureItem) => {
    setFeaturesData(prev => prev.map(f => f.id === feat.id ? feat : f));
  };

  const handleDeleteFeature = (id: string) => {
    setFeaturesData(prev => prev.filter(f => f.id !== id));
  };

  const handleAddTestimonial = (testi: Testimonial) => {
    setTestimonialsData(prev => [testi, ...prev]);
  };

  const handleDeleteTestimonial = (id: string) => {
    setTestimonialsData(prev => prev.filter(t => t.id !== id));
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const handleUpdateUserRole = (userId: string, role: 'admin' | 'user') => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u));
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: u.status === 'Aktif' ? 'Terblokir' : 'Aktif' } : u));
  };

  // Auth Handlers
  const handleOpenAuthModal = (mode: 'login' | 'register') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (userData: { name: string; email: string; avatar?: string }) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleOpenCreateWithTemplate = (template: TemplateTheme) => {
    setModalInitialTemplate(template);
    setIsCreateModalOpen(true);
  };

  const handleOpenCreateWithPlan = (plan: PricingPlan) => {
    setModalInitialPlan(plan);
    setIsCreateModalOpen(true);
  };

  const scrollToStudio = () => {
    const studioEl = document.getElementById('live-studio');
    if (studioEl) {
      studioEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (currentView === 'admin') {
    return (
      <AdminDashboard 
        onBackToMain={() => setCurrentView('landing')}
        templates={templates}
        onAddTemplate={handleAddTemplate}
        onUpdateTemplate={handleUpdateTemplate}
        onDeleteTemplate={handleDeleteTemplate}
        pricingPlans={pricingPlans}
        onUpdatePricingPlan={handleUpdatePricingPlan}
        heroConfig={heroConfig}
        onUpdateHeroConfig={setHeroConfig}
        faqData={faqData}
        onAddFaq={handleAddFaq}
        onUpdateFaq={handleUpdateFaq}
        onDeleteFaq={handleDeleteFaq}
        featuresData={featuresData}
        onAddFeature={handleAddFeature}
        onUpdateFeature={handleUpdateFeature}
        onDeleteFeature={handleDeleteFeature}
        testimonialsData={testimonialsData}
        onAddTestimonial={handleAddTestimonial}
        onDeleteTestimonial={handleDeleteTestimonial}
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        users={users}
        onUpdateUserRole={handleUpdateUserRole}
        onToggleUserStatus={handleToggleUserStatus}
        onPreviewTemplate={(tmpl) => setSelectedTemplateForDetail(tmpl)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F6F2] text-slate-800 font-sans-body relative overflow-x-hidden selection:bg-purple-200 selection:text-purple-900">
      
      {/* Top Floating Navbar */}
      <Navbar 
        onOpenCreateModal={() => {
          setModalInitialTemplate(null);
          setModalInitialPlan(null);
          setIsCreateModalOpen(true);
        }} 
        onOpenAuthModal={handleOpenAuthModal}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAdminDashboard={() => setCurrentView('admin')}
      />

      {/* Hero Section */}
      <Hero 
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onScrollToStudio={scrollToStudio}
        heroConfig={heroConfig}
      />

      {/* Interactive Studio Preview */}
      <LiveStudioPreview />

      {/* Template Gallery */}
      <TemplateGallery 
        templates={templates}
        onSelectTemplate={(tmpl) => setSelectedTemplateForDetail(tmpl)}
      />

      {/* Feature Showcase */}
      <FeatureShowcase />

      {/* Step by Step How it Works */}
      <HowItWorks 
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
      />

      {/* Pricing Table */}
      <PricingSection 
        plansData={pricingPlans}
        onSelectPlan={(plan) => handleOpenCreateWithPlan(plan)}
      />

      {/* Customer Testimonials */}
      <Testimonials />

      {/* FAQ Accordion */}
      <FaqSection faqData={faqData} />

      {/* Footer */}
      <Footer />

      {/* Template Detail Modal */}
      <TemplateDetailModal 
        template={selectedTemplateForDetail}
        onClose={() => setSelectedTemplateForDetail(null)}
        onUseTemplate={(tmpl) => handleOpenCreateWithTemplate(tmpl)}
      />

      {/* Invitation Creation Wizard Modal */}
      <CreateOrderModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        initialTemplate={modalInitialTemplate}
        initialPlan={modalInitialPlan}
      />

      {/* Authentication Modal (Login & Register) */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
}

