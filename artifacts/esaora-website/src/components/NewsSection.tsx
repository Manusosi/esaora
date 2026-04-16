import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar } from 'lucide-react';
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
            <span className="text-[#00d2ff] uppercase tracking-widest text-sm font-semibold block mb-2">Latest</span>
            <h2 className="font-display text-section text-[#000080]">{t.news.headline}</h2>
          </div>
          <button className="hidden sm:flex items-center gap-2 text-[#00d2ff] font-semibold hover:gap-3 transition-all text-sm hover:text-[#000080]">
            {t.news.viewAll} <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.news.articles.map((article, i) => {
            const color = CATEGORY_COLORS[article.category] || '#00d2ff';
            return (
              <article key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover group cursor-pointer">
                <div className="h-48 overflow-hidden">
                  <img
                    src={ARTICLE_IMAGES[i]}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full"
                      style={{ color, background: color + '15' }}
                    >
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#000080] text-base leading-snug mb-2 group-hover:text-[#00d2ff] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[#718096] text-sm leading-relaxed mb-4">{article.excerpt}</p>
                  <button className="flex items-center gap-1.5 text-sm font-semibold text-[#00d2ff] hover:gap-2.5 transition-all hover:text-[#000080]">
                    {t.news.readMore} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <button className="inline-flex items-center gap-2 text-[#00d2ff] font-semibold text-sm border border-[#00d2ff] px-5 py-2.5 rounded-full hover:bg-[#00d2ff] hover:text-[#000080] transition-all">
            {t.news.viewAll} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
