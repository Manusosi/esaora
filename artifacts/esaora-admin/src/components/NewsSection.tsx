import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'wouter';
import { useLanguage } from '@/i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const ARTICLE_IMAGES = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
  'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&q=80',
  'https://images.unsplash.com/photo-1504184988885-f3c6e36f8db8?w=600&q=80',
];

const CATEGORY_COLORS: Record<string, string> = {
  'Announcement': '#00d2ff',
  'Programs': '#1A6BA0',
  'Opportunity': '#D97706',
  'Tangazo': '#00d2ff',
  'Programu': '#1A6BA0',
  'Fursa': '#D97706',
  'Annonce': '#00d2ff',
  'Opportunité': '#D97706',
  'Anúncio': '#00d2ff',
  'Oportunidade': '#D97706',
};

export function NewsSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.children ? Array.from(cardsRef.current.children) : [];
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-[#00d2ff] uppercase tracking-widest text-sm font-semibold block mb-2">{t.news.latestLabel}</span>
            <h2 className="font-display text-section text-brand-navy">{t.news.headline}</h2>
          </div>
          <Link href="/news" className="hidden sm:flex items-center gap-2 text-[#00d2ff] font-semibold hover:gap-3 transition-all text-sm hover:text-brand-navy">
            {t.news.viewAll} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-[#F0F4F8] rounded-lg p-12 text-center border border-black/5">
          <div className="w-16 h-16 bg-brand-navy/5 rounded-lg flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-8 h-8 text-brand-navy opacity-30" />
          </div>
          <h3 className="font-display text-2xl text-brand-navy font-bold mb-3">{t.news.headline}</h3>
          <p className="text-[#718096] text-base max-w-md mx-auto mb-8">
            News and announcements from the ESA-ORA Alliance will be shared here soon. 
            Stay tuned for updates from our member nations and technical working groups.
          </p>
          <Link href="/news" className="inline-flex items-center gap-2 bg-brand-navy text-white px-8 py-3 rounded-lg font-bold text-sm hover:gap-3 transition-all">
            {t.news.viewAll} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
