import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const PILLAR_COLORS: Record<string, string> = {
  'WASH': '#0097a6',
  'MAJI & USAFI': '#0097a6',
  'EAH': '#0097a6',
  'Climate Action': '#22C55E',
  'Hali ya Hewa': '#22C55E',
  'Action climatique': '#22C55E',
  'Ação Climática': '#22C55E',
  'Blue Economy': '#00d2ff',
  'Uchumi wa Bluu': '#00d2ff',
  'Économie bleue': '#00d2ff',
  'Economia Azul': '#00d2ff',
  'Public Health': '#F59E0B',
  'Afya ya Umma': '#F59E0B',
  'Santé publique': '#F59E0B',
  'Saúde Pública': '#F59E0B',
};

const PILLAR_ICONS: Record<string, React.ReactNode> = {
  water: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C7 7 4 10.5 4 14a8 8 0 0016 0c0-3.5-3-7-8-12z" /></svg>,
  climate: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2" /><circle cx="12" cy="12" r="4" /></svg>,
  ocean: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 15c2 0 3-2 5-2s3 2 5 2 3-2 5-2"/><path d="M3 19c2 0 3-2 5-2s3 2 5 2 3-2 5-2"/></svg>,
  health: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
};

function getIconForPillar(pillar: string): React.ReactNode {
  if (pillar.includes('WASH') || pillar.includes('Eau') || pillar.includes('Água') || pillar.includes('MAJI') || pillar.includes('EAH')) {
    return PILLAR_ICONS.water;
  } else if (pillar.includes('Climate') || pillar.includes('Clima') || pillar.includes('Hali') || pillar.includes('Action climatique') || pillar.includes('Ação')) {
    return PILLAR_ICONS.climate;
  } else if (pillar.includes('Blue') || pillar.includes('Bleu') || pillar.includes('Azul') || pillar.includes('Bluu') || pillar.includes('Économie')) {
    return PILLAR_ICONS.ocean;
  } else {
    return PILLAR_ICONS.health;
  }
}

function getColorForPillar(pillar: string): string {
  return PILLAR_COLORS[pillar] || '#00d2ff';
}

export function ObjectivesSlider() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    );

    // Animate Caustics (Light ray drifting)
    gsap.to('.caustic-orb', {
      x: 'random(-100, 100)',
      y: 'random(-50, 50)',
      scale: 'random(1, 1.2)',
      duration: 'random(10, 20)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Animate Marine Snow (Drifting particles)
    gsap.to('.marine-snow', {
      y: '+=100',
      x: '+=30',
      opacity: 'random(0.1, 0.4)',
      duration: 'random(15, 25)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: { amount: 10, from: 'random' }
    });

    // Topo Shelf Parallax Flow
    gsap.to('.topo-shelf', {
      x: '-=30',
      duration: 30,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 2
    });

    // Animate oceanic current flow
    gsap.to('.ocean-current-line', {
      strokeDashoffset: 2000,
      duration: 120,
      repeat: -1,
      ease: 'none',
      stagger: {
        amount: 30,
        from: 'random'
      }
    });

    // Gentle organic shimmer
    gsap.to('.ocean-current-line', {
      y: '+=20',
      rotation: 1,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, []);

  const scrollToIndex = (index: number) => {
    const container = trackRef.current;
    if (!container) return;
    const cardWidth = (container.firstElementChild as HTMLElement)?.offsetWidth || 304;
    const gap = 24;
    container.scrollTo({ left: index * (cardWidth + gap), behavior: 'smooth' });
  };

  const startAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (isPausedRef.current) return;
      setActiveIndex((prev) => {
        const next = (prev + 1) % t.objectives.items.length;
        scrollToIndex(next);
        return next;
      });
    }, 4500);
  };

  useEffect(() => {
    startAutoScroll();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [t.objectives.items.length]);

  const goToIndex = (i: number) => {
    setActiveIndex(i);
    scrollToIndex(i);
  };

  const handleScroll = () => {
    const container = trackRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const cardWidth = (container.firstElementChild as HTMLElement)?.offsetWidth || 304;
    const gap = 24;
    const index = Math.round(scrollLeft / (cardWidth + gap));
    if (index !== activeIndex && index >= 0 && index < t.objectives.items.length) {
      setActiveIndex(index);
    }
  };

  return (
    <section ref={sectionRef} className="relative bg-[#002659] py-24 px-4 overflow-hidden">
      {/* Deep Sea Narrative Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Ocean Caustics (Light rays) */}
        <div className="absolute inset-0 opacity-20">
          <div className="caustic-orb absolute -top-1/4 -left-1/4 w-full h-full rounded-full blur-[120px] bg-[#00d2ff15]" />
          <div className="caustic-orb absolute -bottom-1/4 -right-1/4 w-full h-full rounded-full blur-[120px] bg-[#00d2ff10]" />
          <div className="caustic-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 rounded-full blur-[150px] bg-[#00d2ff08]" />
        </div>

        {/* Marine Snow (Particles) */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="marine-snow absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                scale: Math.random() * 0.5 + 0.5,
              }}
            />
          ))}
        </div>

        {/* Ocean Current Contour Background */}
        <svg 
          className="absolute -top-[10%] -left-[10%] w-[120%] h-[120%]" 
          viewBox="0 0 1000 1000" 
          preserveAspectRatio="none"
        >
          {/* Layered Topographic Shelves (Fills) */}
          {[...Array(4)].map((_, i) => {
            const yOffset = i * 60;
            return (
              <path 
                key={`shelf-${i}`}
                className="topo-shelf"
                d={`M-100,${300 + yOffset} C150,${100 + yOffset} 400,${900 + yOffset} 650,${500 + yOffset} C900,${100 + yOffset} 1150,${50 + yOffset} 1300,${300 + yOffset} L1300,1100 L-100,1100 Z`}
                fill="#00d2ff"
                fillOpacity={0.01 + (i * 0.005)}
              />
            );
          })}

          {/* Parallel Accent Lines */}
          {[...Array(6)].map((_, i) => {
            const yOffset = i * 50;
            const opacity = 0.02 + (i * 0.01);
            const isWhite = i % 2 === 0;
            return (
              <path 
                key={`line-${i}`}
                className={`ocean-current-line ocean-current-${i}`}
                d={`M-100,${250 + yOffset} C150,${50 + yOffset} 400,${850 + yOffset} 650,${450 + yOffset} C900,${50 + yOffset} 1150,${0 + yOffset} 1300,${250 + yOffset}`} 
                fill="none" 
                stroke={isWhite ? '#ffffff' : '#00d2ff'} 
                strokeWidth={1 + (i * 0.5)}
                strokeOpacity={opacity}
                strokeDasharray={i % 3 === 0 ? "50 150" : "none"}
              />
            );
          })}
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-16">
          <span className="text-[#00d2ff] uppercase tracking-widest text-xs font-bold bg-[#00d2ff]/10 px-4 py-1.5 rounded-lg">
            {/* @ts-ignore */}
            {t.objectives.sectionLabel || 'Strategic Impact'}
          </span>
          <h2 className="font-display text-4xl lg:text-5xl text-white mt-6 font-bold">{t.objectives.headline}</h2>
          <p className="text-white/70 mt-4 text-lg max-w-4xl mx-auto">{t.objectives.subheadline}</p>
        </div>

        {/* Scrollable card track */}
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
          onScroll={handleScroll}
          onMouseEnter={() => { isPausedRef.current = true; }}
          onMouseLeave={() => { isPausedRef.current = false; }}
        >
          {t.objectives.items.map((item, i) => {
            const color = getColorForPillar(item.pillar);
            const isActive = activeIndex === i;
            return (
              <div
                key={i}
                className={`flex-shrink-0 w-80 rounded-lg overflow-hidden snap-start cursor-pointer transition-all duration-500 border relative group`}
                style={{ 
                  backgroundColor: isActive ? color : '#001433',
                  borderColor: isActive ? color : 'rgba(255,255,255,0.1)',
                  boxShadow: isActive ? `0 20px 40px ${color}33` : 'none'
                }}
                onMouseEnter={() => {
                  isPausedRef.current = true;
                }}
                onMouseLeave={() => {
                  isPausedRef.current = false;
                }}
                onClick={() => goToIndex(i)}
              >
                <div className="p-6 h-full relative z-10">
                  {/* Header row */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg transition-colors duration-300"
                      style={{ 
                        color: isActive ? '#fff' : color, 
                        background: isActive ? color : color + '22' 
                      }}
                    >
                      {item.pillar}
                    </span>
                    <span 
                      style={{ color: isActive ? '#fff' : color }} 
                      className={`transition-transform duration-500 ${isActive ? 'scale-110 opacity-100' : 'opacity-70'}`}
                    >
                      {getIconForPillar(item.pillar)}
                    </span>
                  </div>

                  {/* Number */}
                  <div 
                    className="text-white/35 text-4xl font-bold mb-2 font-sora transition-colors duration-500"
                    style={{ color: isActive ? 'rgba(255,255,255,0.45)' : undefined }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-lg mb-3 leading-snug group-hover:text-white transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p 
                    className={`text-sm leading-relaxed mb-6 group-hover:text-white transition-colors ${isActive ? 'text-white' : 'text-white/75'}`}
                  >
                    {item.description}
                  </p>

                  {/* Activities */}
                  <ul className="space-y-3">
                    {item.activities.map((a) => (
                      <li key={a} className={`flex items-start gap-3 text-sm group-hover:text-white transition-colors ${isActive ? 'text-white font-medium' : 'text-white/65'}`}>
                        <span 
                          className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 transition-all duration-300" 
                          style={{ background: isActive ? '#fff' : 'rgba(255,255,255,0.4)' }}
                        />
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
          <div className="flex justify-center gap-2 mt-8">
            {t.objectives.items.map((_, i) => (
              <button
                key={i}
                onClick={() => goToIndex(i)}
                className="h-2 rounded-full transition-all duration-300 pointer-events-auto"
                style={{
                  width: activeIndex === i ? '28px' : '8px',
                  background: activeIndex === i ? '#00d2ff' : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>
        </div>
    </section>
  );
}
