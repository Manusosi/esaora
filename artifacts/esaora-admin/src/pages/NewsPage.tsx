import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';
import { ArrowRight, Globe } from 'lucide-react';

const CATEGORIES = ['All', 'Announcements', 'Programs', 'Opportunities', 'Reports'];

const ARTICLES = [
  {
    id: 1,
    category: 'Announcements',
    date: 'April 2025',
    title: 'ESA-ORA Regional Consortium Formally Established',
    excerpt: 'Four founding organizations across Kenya, Tanzania, Mozambique, and Madagascar have signed the Regional Consortium Charter, formally establishing the East & Southern Africa Ocean Resilience Alliance.',
    image: '/images/news/news-1.jpg',
    tag: '#00d2ff',
  },
  {
    id: 2,
    category: 'Programs',
    date: 'May 2025',
    title: 'First Steering Committee Sets 2025–2026 Regional Strategy',
    excerpt: 'The inaugural ESA-ORA Steering Committee meeting convened representatives from all four member nations to agree on strategic priorities, governance protocols, and joint work plans for the first year.',
    image: '/images/news/news-2.jpg',
    tag: '#22C55E',
  },
  {
    id: 3,
    category: 'Programs',
    date: 'June 2025',
    title: 'Five Technical Working Groups Activated Across the Alliance',
    excerpt: 'ESA-ORA\'s five Technical Working Groups — WASH, Climate Action, Blue Economy, Public Health, and Research & Innovation — have officially commenced operations with cross-country membership.',
    image: '/images/news/news-3.jpg',
    tag: '#0097a6',
  },
  {
    id: 4,
    category: 'Opportunities',
    date: 'July 2025',
    title: 'ESA-ORA Calls for Applications: Research & Innovation Grant',
    excerpt: 'ESA-ORA is inviting applications from researchers and institutions across member nations for the inaugural Regional Research & Innovation Fund, supporting evidence generation across all four thematic pillars.',
    image: '/images/news/news-4.jpg',
    tag: '#F59E0B',
  },
  {
    id: 5,
    category: 'Reports',
    date: 'August 2025',
    title: 'Regional Baseline Assessment Published',
    excerpt: 'ESA-ORA publishes its inaugural regional baseline assessment, presenting cross-country data on WASH coverage, ecosystem health, fisheries status, and public health indicators across all four member nations.',
    image: '/images/news/news-5.jpg',
    tag: '#8B5CF6',
  },
  {
    id: 6,
    category: 'Announcements',
    date: 'September 2025',
    title: 'ESA-ORA Partners with Regional Development Bank for Climate Financing',
    excerpt: 'The Alliance has signed a memorandum of understanding with a regional development partner to explore blue bond and climate finance mechanisms that can scale ocean resilience programs across all four nations.',
    image: '/images/news/news-6.jpg',
    tag: '#00d2ff',
  },
];

export default function NewsPage() {
  const { t } = useLanguage();

  return (
    <main>
      <PageHero
        label="NEWS & INSIGHTS"
        heading="News, Stories & Insights from the Alliance"
        subheading="Updates, program stories, opportunities, and publications from ESA-ORA and its member organizations across East and Southern Africa."
        imageSrc="/images/hero/hero-bg-11.jpg"
        breadcrumb="News"
      />

      <section className="bg-white py-24 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="w-20 h-20 bg-[#F0F4F8] rounded-lg flex items-center justify-center mb-8">
            <Globe className="w-10 h-10 text-brand-navy opacity-20" />
          </div>
          <h2 className="font-display text-4xl text-brand-navy font-bold mb-4">Alliance Newsroom</h2>
          <p className="text-[#718096] text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            News and updates from the ESA-ORA Alliance will be shared here soon. Please check back for official announcements, regional insights, and stories from the field across our member nations.
          </p>
          <div className="h-px w-24 bg-brand-navy/10 mb-8" />
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-brand-navy py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[#00d2ff] uppercase tracking-widest text-xs font-bold block mb-4">Stay Connected</span>
          <h2 className="font-display text-3xl text-white font-bold mb-4">Get ESA-ORA Updates</h2>
          <p className="text-white/55 text-base mb-8">Receive news, program updates, and funding opportunities directly from the Alliance Secretariat.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.org"
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 px-5 py-3 rounded-lg text-sm focus:outline-none focus:border-[#00d2ff]/60 transition-colors"
            />
            <button type="submit" className="bg-[#00d2ff] hover:bg-[#00b8e6] text-brand-navy px-7 py-3 rounded-lg font-bold text-sm transition-all hover:scale-105 whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
