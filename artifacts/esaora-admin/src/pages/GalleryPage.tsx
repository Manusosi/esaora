import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';

const CATEGORIES = ['All', 'WASH', 'Climate', 'Blue Economy', 'Public Health', 'Country Programs'];

const GALLERY_ITEMS = [
  { src: '/images/sections/pillar-wash.jpeg', caption: 'Water infrastructure rehabilitation, coastal Kenya', category: 'WASH', tall: true },
  { src: '/images/sections/pillar-climate-action.jpg', caption: 'Mangrove restoration, Northern Mozambique', category: 'Climate', tall: false },
  { src: '/images/sections/pillar-blueeconomy.jpeg', caption: 'Artisanal fishers, Zanzibar, Tanzania', category: 'Blue Economy', tall: false },
  { src: '/images/sections/pillar-public-health.jpeg', caption: 'Community health worker training session', category: 'Public Health', tall: true },
  { src: '/images/hero/hero-bg-2.jpg', caption: 'ESA-ORA alliance founding meeting, 2025', category: 'Country Programs', tall: false },
  { src: '/images/hero/hero-bg-3.jpg', caption: 'Regional Steering Committee session', category: 'Country Programs', tall: false },
  { src: '/images/hero/hero-bg-4.jpg', caption: 'Coastal community WASH program, Madagascar', category: 'WASH', tall: true },
  { src: '/images/hero/hero-bg-5.jpg', caption: 'Seaweed cultivation cooperative, Tanzania', category: 'Blue Economy', tall: false },
  { src: '/images/hero/hero-bg-6.jpg', caption: 'Coral reef monitoring dive, Kenya', category: 'Climate', tall: false },
  { src: '/images/hero/hero-bg-7.jpg', caption: 'Community health outreach, Mozambique', category: 'Public Health', tall: false },
  { src: '/images/hero/hero-bg-8.jpg', caption: 'Eco-tourism pilot program, Madagascar', category: 'Blue Economy', tall: true },
  { src: '/images/hero/hero-bg-9.jpg', caption: 'Youth fishers enterprise training, Tanzania', category: 'Country Programs', tall: false },
];

export default function GalleryPage() {
  return (
    <main>
      <PageHero
        label="GALLERY"
        heading="Moments from the Field"
        subheading="Photographs and visual stories from ESA-ORA's programs, communities, and partner organizations across East and Southern Africa."
        imageSrc="/images/hero/hero-bg-10.jpg"
        breadcrumb="Gallery"
      />

      <section className="bg-white py-24 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="w-20 h-20 bg-[#F0F4F8] rounded-lg flex items-center justify-center mb-8">
            <svg viewBox="0 0 24 24" className="w-10 h-10 text-brand-navy opacity-20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <h2 className="font-display text-4xl text-brand-navy font-bold mb-4">Field Documentation</h2>
          <p className="text-[#718096] text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Visual documentation and field stories from our regional programs are currently being curated. The full gallery of photographs and videos will be available for public viewing soon.
          </p>
          <div className="h-px w-24 bg-brand-navy/10 mb-8" />
        </div>
      </section>

      <CTASection />
    </main>
  );
}
