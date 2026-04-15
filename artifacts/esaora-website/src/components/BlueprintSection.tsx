import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const PILLAR_COLORS = {
  wash: '#1A6BA0',
  climate: '#2D7A4E',
  blueEconomy: '#0E7B74',
  publicHealth: '#D97706',
};

const PILLAR_KEYS = ['wash', 'climate', 'blueEconomy', 'publicHealth'] as const;
type PillarKey = typeof PILLAR_KEYS[number];

const PILLAR_ICONS = {
  wash: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 2C7 7 4 10.5 4 14a8 8 0 0016 0c0-3.5-3-7-8-12z" />
      <path d="M8 17.5a4 4 0 008 0" strokeDasharray="2 2" />
    </svg>
  ),
  climate: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 2v6M4.93 4.93l4.24 4.24M2 12h6M4.93 19.07l4.24-4.24M12 22v-6M19.07 19.07l-4.24-4.24M22 12h-6M19.07 4.93l-4.24 4.24" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  blueEconomy: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M3 15c2 0 3-2 5-2s3 2 5 2 3-2 5-2" />
      <path d="M3 19c2 0 3-2 5-2s3 2 5 2 3-2 5-2" />
      <path d="M12 3L9 8h6l-3-5z" />
      <path d="M9 8v4" /><path d="M15 8v4" />
    </svg>
  ),
  publicHealth: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
};

function PillarAccordion({ pillarKey }: { pillarKey: PillarKey }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const pillar = t.blueprint.pillars[pillarKey];
  const color = PILLAR_COLORS[pillarKey];

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-white/5 transition-colors"
        style={{ borderLeft: `4px solid ${color}` }}
      >
        <div style={{ color }} className="flex-shrink-0">{PILLAR_ICONS[pillarKey]}</div>
        <div>
          <div className="text-white font-bold text-sm uppercase tracking-wider">{pillar.name}</div>
          <div className="text-white/60 text-sm mt-0.5">{pillar.full}</div>
        </div>
        <div className="ml-auto text-white/40">
          <svg className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </button>
      {open && (
        <div className="px-5 py-4 bg-white/5">
          <p className="text-white/70 text-sm leading-relaxed mb-3">{pillar.description}</p>
          <ul className="space-y-1.5">
            {pillar.activities.map((a) => (
              <li key={a} className="flex items-center gap-2 text-sm text-white/60">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                {a}
              </li>
            ))}
          </ul>
          <button className="mt-4 flex items-center gap-1.5 text-sm font-medium transition-colors" style={{ color }}>
            {t.blueprint.learnMore} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export function BlueprintSection() {
  const { t } = useLanguage();
  const [activePillar, setActivePillar] = useState<PillarKey | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const circlesRef = useRef<SVGGElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (!circlesRef.current || isMobile) return;
    const circles = Array.from(circlesRef.current.querySelectorAll('.pillar-circle-g'));
    gsap.fromTo(
      circles,
      { opacity: 0, scale: 0.85, transformOrigin: 'center center' },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    );
  }, [isMobile]);

  const activePillarData = activePillar ? t.blueprint.pillars[activePillar] : null;
  const activePillarColor = activePillar ? PILLAR_COLORS[activePillar] : null;

  return (
    <section ref={sectionRef} className="bg-[#0A1628] py-20 md:py-28 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[#0E7B74] uppercase tracking-widest text-sm font-semibold">{t.blueprint.sectionLabel}</span>
          <h2 className="font-display text-section text-white mt-2">{t.blueprint.headline}</h2>
        </div>

        {/* Mobile: Accordion */}
        <div className="md:hidden space-y-3 max-w-lg mx-auto">
          {PILLAR_KEYS.map((key) => <PillarAccordion key={key} pillarKey={key} />)}
        </div>

        {/* Desktop: SVG Blueprint */}
        <div className="hidden md:flex gap-8 items-start justify-center">
          {/* SVG Diagram */}
          <div className="flex-shrink-0 relative" style={{ width: 480, height: 480 }}>
            <svg width="480" height="480" viewBox="0 0 480 480">
              <defs>
                <filter id="glow-wash">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              <g ref={circlesRef}>
                {/* WASH — top left */}
                <g className="pillar-circle-g" onClick={() => setActivePillar(activePillar === 'wash' ? null : 'wash')} style={{ cursor: 'pointer' }}>
                  <circle cx="175" cy="175" r="120" fill={PILLAR_COLORS.wash} opacity={activePillar && activePillar !== 'wash' ? 0.4 : 0.85} className="blueprint-circle" />
                  <text x="138" y="158" fill="white" fontSize="13" fontWeight="700" letterSpacing="1">WATER &</text>
                  <text x="145" y="175" fill="white" fontSize="13" fontWeight="700" letterSpacing="1">SANITATION</text>
                  <text x="158" y="192" fill="white" fontSize="11" opacity="0.85">& HYGIENE</text>
                  <foreignObject x="148" y="118" width="54" height="30">
                    <div style={{ color: 'white', display: 'flex', justifyContent: 'center' }}>
                      {PILLAR_ICONS.wash}
                    </div>
                  </foreignObject>
                </g>

                {/* Climate — top right */}
                <g className="pillar-circle-g" onClick={() => setActivePillar(activePillar === 'climate' ? null : 'climate')} style={{ cursor: 'pointer' }}>
                  <circle cx="305" cy="175" r="120" fill={PILLAR_COLORS.climate} opacity={activePillar && activePillar !== 'climate' ? 0.4 : 0.85} className="blueprint-circle" />
                  <text x="267" y="155" fill="white" fontSize="12" fontWeight="700" letterSpacing="0.5">CLIMATE ACTION</text>
                  <text x="267" y="172" fill="white" fontSize="11" opacity="0.85">& ENVIRONMENTAL</text>
                  <text x="280" y="189" fill="white" fontSize="11" opacity="0.85">RESILIENCE</text>
                  <foreignObject x="278" y="118" width="54" height="30">
                    <div style={{ color: 'white', display: 'flex', justifyContent: 'center' }}>
                      {PILLAR_ICONS.climate}
                    </div>
                  </foreignObject>
                </g>

                {/* Blue Economy — bottom left */}
                <g className="pillar-circle-g" onClick={() => setActivePillar(activePillar === 'blueEconomy' ? null : 'blueEconomy')} style={{ cursor: 'pointer' }}>
                  <circle cx="175" cy="305" r="120" fill={PILLAR_COLORS.blueEconomy} opacity={activePillar && activePillar !== 'blueEconomy' ? 0.4 : 0.85} className="blueprint-circle" />
                  <text x="152" y="295" fill="white" fontSize="12" fontWeight="700" letterSpacing="0.5">SUSTAINABLE</text>
                  <text x="155" y="312" fill="white" fontSize="12" fontWeight="700" letterSpacing="0.5">BLUE ECONOMY</text>
                  <foreignObject x="148" y="250" width="54" height="30">
                    <div style={{ color: 'white', display: 'flex', justifyContent: 'center' }}>
                      {PILLAR_ICONS.blueEconomy}
                    </div>
                  </foreignObject>
                </g>

                {/* Public Health — bottom right */}
                <g className="pillar-circle-g" onClick={() => setActivePillar(activePillar === 'publicHealth' ? null : 'publicHealth')} style={{ cursor: 'pointer' }}>
                  <circle cx="305" cy="305" r="120" fill={PILLAR_COLORS.publicHealth} opacity={activePillar && activePillar !== 'publicHealth' ? 0.4 : 0.85} className="blueprint-circle" />
                  <text x="268" y="295" fill="white" fontSize="12" fontWeight="700" letterSpacing="0.5">PUBLIC HEALTH</text>
                  <text x="273" y="312" fill="white" fontSize="11" opacity="0.85">& COMMUNITY</text>
                  <text x="275" y="329" fill="white" fontSize="11" opacity="0.85">WELLBEING</text>
                  <foreignObject x="278" y="250" width="54" height="30">
                    <div style={{ color: 'white', display: 'flex', justifyContent: 'center' }}>
                      {PILLAR_ICONS.publicHealth}
                    </div>
                  </foreignObject>
                </g>

                {/* Center circle */}
                <circle cx="240" cy="240" r="52" fill="#0A1628" stroke="#0E7B74" strokeWidth="2" />
                <circle cx="240" cy="240" r="48" fill="#0A1628" opacity="0.9" />
                <text x="240" y="235" textAnchor="middle" fill="#0E7B74" fontSize="11" fontWeight="700">ESA-ORA</text>
                <text x="240" y="250" textAnchor="middle" fill="white" fontSize="9" opacity="0.8">RESILIENCE</text>
                <text x="240" y="262" textAnchor="middle" fill="white" fontSize="9" opacity="0.8">ALLIANCE</text>
              </g>
            </svg>
            <p className="text-center text-white/40 text-xs mt-2 italic">{t.blueprint.centerText}</p>
          </div>

          {/* Side panel */}
          <div className="flex-1 min-w-0 max-w-sm">
            {activePillarData && activePillarColor ? (
              <div className="blueprint-panel bg-white/5 border border-white/10 rounded-2xl p-6 relative">
                <button
                  onClick={() => setActivePillar(null)}
                  className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div style={{ color: activePillarColor }} className="mb-3">{PILLAR_ICONS[activePillar!]}</div>
                <h3 className="text-white font-bold text-xl mb-1 font-sora">{activePillarData.name}</h3>
                <p className="text-white/50 text-sm mb-3">{activePillarData.full}</p>
                <p className="text-white/70 text-sm leading-relaxed mb-4">{activePillarData.description}</p>
                <div className="mb-4">
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-2 font-medium">Key Activities</div>
                  <ul className="space-y-2">
                    {activePillarData.activities.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-sm text-white/70">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: activePillarColor }} />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="flex items-center gap-2 text-sm font-semibold transition-colors" style={{ color: activePillarColor }}>
                  {t.blueprint.learnMore} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                <div className="w-16 h-16 rounded-full bg-[#0E7B74]/20 flex items-center justify-center mb-4">
                  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="#0E7B74" strokeWidth="1.5">
                    <path d="M15 15l-5-5m0 0l5-5m-5 5h12" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-white/40 text-sm">Click any circle to explore a pillar</p>
                <div className="mt-6 grid grid-cols-2 gap-3 w-full">
                  {PILLAR_KEYS.map((key) => (
                    <button
                      key={key}
                      onClick={() => setActivePillar(key)}
                      className="px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wide text-white transition-all hover:scale-105"
                      style={{ background: PILLAR_COLORS[key] + '33', border: `1px solid ${PILLAR_COLORS[key]}` }}
                    >
                      {t.blueprint.pillars[key].name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
