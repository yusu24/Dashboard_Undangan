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
import { TemplateTheme, PricingPlan } from './types';

export default function App() {
  const [selectedTemplateForDetail, setSelectedTemplateForDetail] = useState<TemplateTheme | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [modalInitialTemplate, setModalInitialTemplate] = useState<TemplateTheme | null>(null);
  const [modalInitialPlan, setModalInitialPlan] = useState<PricingPlan | null>(null);

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

  return (
    <div className="min-h-screen bg-[#F9F6F2] text-slate-800 font-sans-body relative overflow-x-hidden selection:bg-purple-200 selection:text-purple-900">
      
      {/* Top Floating Navbar */}
      <Navbar onOpenCreateModal={() => {
        setModalInitialTemplate(null);
        setModalInitialPlan(null);
        setIsCreateModalOpen(true);
      }} />

      {/* Hero Section */}
      <Hero 
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onScrollToStudio={scrollToStudio}
      />

      {/* Interactive Studio Preview */}
      <LiveStudioPreview />

      {/* Template Gallery */}
      <TemplateGallery 
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
        onSelectPlan={(plan) => handleOpenCreateWithPlan(plan)}
      />

      {/* Customer Testimonials */}
      <Testimonials />

      {/* FAQ Accordion */}
      <FaqSection />

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

    </div>
  );
}

