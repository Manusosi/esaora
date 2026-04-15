import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const PILLAR_COLORS: Record<string, string> = {
  'WASH': '#1A6BA0',
  'Climate Action': '#2D7A4E',
  'Blue Economy': '#0E7B74',
  'Public Health': '#D97706',
  'Hali ya Hewa': '#2D7A4E',
  'Uchumi wa Bluu': '#0E7B74',
  'Afya ya Umma': '#D97706',
  'MAJI & USAFI': '#1A6BA0',
  'EAH': '#1A6BA0',
  "Action climatique": '#2D7A4E',
  "Économie bleue": '#0E7B74',
  "Santé publique": '#D97706',
  'Ação Climática': '#2D7A4E',
  'Economia Azul': '#0E7B74',
  'Saúde Pública': '#D97706',
};

const PILLAR_ICONS: Record<string, JSX.Element> = {
  'WASH': <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C7 7 4 10.5 4 14a8 8 0 0016 0c0-3.5-3-7-8-12z" /></svg>,
  'Climate Action': <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2" /><circle cx="12" cy="12" r="4" /></svg>,
  'Blue Economy': <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 15c2 0 3-2 5-2s3 2 5 2 3-2 5-2"/><path d="M3 19c2 0 3-2 5-2s3 2 5 2 3-2 5-2"/><path d="M7 8h10M12 3v5"/></svg>,
  'Public Health': <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
};

function getIconForPillar(pillar: string): JSX.Element {
  if (pillar.includes('WASH') || pillar.includes('Eau') || pillar.includes('Água') || pillar.includes('MAJI')) {
    return PILLAR_ICONS['WASH'];
  } else if (pillar.includes('Climate') || pillar.includes('Clima') || pillar.includes('Hali')) {
    return PILLAR_ICONS['Climate Action'];
  } else if (pillar.includes('Blue') || pillar.includes('Bleu') || pillar.includes('Azul') || pillar.includes('Bluu')) {
    return PILLAR_ICONS['Blue Economy'];
  } else {
    return PILLAR_ICONS['Public Health'];
  }
}

function getColorForPillar(pillar: string): string {
  return PILLAR_COLORS[pillar] || '#0E7B74';
}

export function ObjectivesSlider() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    );
  }, []);

  // Auto-scroll the slider
  useEffect(() => {
    const container = trackRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      currentIndexRef.current = (currentIndexRef.current + 1) % t.objectives.items.length;
      const cardWidth = container.children[0]?.clientWidth || 320;
      gsap.to(container, {
        scrollLeft: currentIndexRef.current * (cardWidth + 24),
        duration: 0.6,
        ease: 'power2.inOut',
      });
    }, 5000);

    const handleMouseEnter = () => clearInterval(interval);
    container.addEventListener('mouseenter', handleMouseEnter);
    return () => {
      clearInterval(interval);
      container.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [t.objectives.items.length]);

  return (
    <section ref={sectionRef} className="bg-[#0A1628] py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-12">
          <span className="text-[#0E7B74] uppercase tracking-widest text-sm font-semibold">
            {t.nav.programs}
          </span>
          <h2 className="font-display text-section text-white mt-2">{t.objectives.headline}</h2>
          <p className="text-white/50 mt-3 text-base">{t.objectives.subheadline}</p>
        </div>

        {/* Scrollable card track */}
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {t.objectives.items.map((item, i) => {
            const color = getColorForPillar(item.pillar);
            return (
              <div
                key={i}
                className="flex-shrink-0 w-72 bg-white/5 border border-white/10 rounded-2xl overflow-hidden snap-start card-hover cursor-pointer hover:bg-white/8 transition-all"
                style={{ borderTop: `3px solid ${color}` }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{ color, background: color + '22' }}
                    >
                      {item.pillar}
                    </span>
                    <span style={{ color }} className="opacity-70">
                      {getIconForPillar(item.pillar)}
                    </span>
                  </div>
                  <div className="text-white/30 text-3xl font-bold mb-2">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="text-white font-bold text-lg mb-3 leading-snug">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">{item.description}</p>
                  <ul className="space-y-1.5">
                    {item.activities.map((a) => (
                      <li key={a} className="flex items-center gap-2 text-white/50 text-xs">
                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: color }} />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {t.objectives.items.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                currentIndexRef.current = i;
                const container = trackRef.current;
                if (container) {
                  const cardWidth = container.children[0]?.clientWidth || 320;
                  gsap.to(container, { scrollLeft: i * (cardWidth + 24), duration: 0.4, ease: 'power2.inOut' });
                }
              }}
              className="h-2 rounded-full transition-all"
              style={{
                width: i === currentIndexRef.current ? '24px' : '8px',
                background: '#0E7B74',
                opacity: i === currentIndexRef.current ? 1 : 0.35,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
