export type TemplateCategory = 'all' | 'wedding' | 'birthday' | 'aqiqah' | 'corporate';

export interface TemplateTheme {
  id: string;
  name: string;
  category: TemplateCategory;
  tag: string;
  isPopular?: boolean;
  isNew?: boolean;
  isFree?: boolean;
  image: string;
  description: string;
  accentColor: string;
  bgGradient: string;
  fontTitle: string;
  musicTitle: string;
  coupleDefault: {
    groom: string;
    bride: string;
    date: string;
    location: string;
  };
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  popular?: boolean;
  badge?: string;
  description: string;
  features: string[];
  ctaText: string;
  color: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tag: string;
  previewType: 'rsvp' | 'gift' | 'music' | 'maps' | 'gallery' | 'filter';
}

export interface Testimonial {
  id: string;
  coupleName: string;
  eventType: string;
  avatar: string;
  quote: string;
  rating: number;
  date: string;
  templateUsed: string;
}

export interface WishComment {
  id: string;
  name: string;
  status: 'Hadir' | 'Ragu-ragu' | 'Tidak Hadir';
  message: string;
  time: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface HeroConfig {
  eyebrowPill: string;
  titlePart1: string;
  titleGradient: string;
  subtitle: string;
  featuredBadge: string;
  featuredTitle: string;
  featuredDescription: string;
  totalCreatedStat: string;
  satisfactionStat: string;
  timeStat: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  templateId: string;
  templateName: string;
  planId: string;
  planName: string;
  amount: number;
  status: 'Aktif' | 'Pending' | 'Expired' | 'Dibatalkan';
  paymentMethod: string;
  createdAt: string;
  weddingDate: string;
  coupleNames: string;
  slug: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
  package: string;
  joinedAt: string;
  invitationsCount: number;
  status: 'Aktif' | 'Terblokir';
}

