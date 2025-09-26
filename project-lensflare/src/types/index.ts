// Core Types for Aadiz.FX

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'commercial' | 'music-video' | 'vfx-breakdown' | 'short-film' | 'documentary';
  client?: string;
  role: string[];
  videoUrl: string;
  thumbnailUrl: string;
  images?: string[];
  beforeAfter?: {
    before: string;
    after: string;
  };
  tags: string[];
  year: number;
  featured: boolean;
  duration?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  avatar?: string;
  rating?: number;
}

export interface Client {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  tier: 'pre-production' | 'production' | 'post-production' | 'vfx';
}

export interface Tool {
  id: string;
  name: string;
  icon: string;
  category: 'editing' | 'vfx' | 'color' | 'audio' | 'motion';
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface ContactForm {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface SiteMetadata {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  siteUrl: string;
  ogImage: string;
}