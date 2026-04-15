import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

type TierKey = 'steering' | 'secretariat' | 'countryLeads' | 'twgs';

const TIER_ICONS: Record<TierKey, JSX.Element> = {
  steering: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  secretariat: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  countryLeads: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  twgs: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
};

const TIER_COLORS: Record<TierKey, string> = {
  steering: '#0E7B74',
  secretariat: '#1A6BA0',
  countryLeads: '#2D7A4E',
  twgs: '#D97706',
};

export function GovernanceSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const tiersRef = useRef<HTMLDivElement>(null);
  const [activeTier, setActiveTier] = useState<TierKey | null>(null);
  const tiers = t.governance.tiers;

  useEffect(() => {
    const tierEls = tiersRef.current?.children ? Array.from(tiersRef.current.children) : [];
    gsap.fromTo(
      tierEls,
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out',
        scrollTrigger: { trigger: tiersRef.current, start: 'top 75%' },
      }
    );
  }, []);

  const tierKeys: TierKey[] = ['steering', 'secretariat', 'countryLeads', 'twgs'];

  return (
    <section ref={sectionRef} className="bg-[#FAFAFA] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-[#0E7B74] uppercase tracking-widest text-sm font-semibold">{t.governance.sectionLabel}</span>
          <h2 className="font-display text-section text-[#0A1628] mt-2">{t.governance.headline}</h2>
          <p className="text-[#718096] mt-3 text-base max-w-xl mx-auto">{t.governance.subheadline}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* SVG Org Chart */}
          <div className="hidden lg:block flex-shrink-0">
            <svg width="180" height="480" viewBox="0 0 180 480">
              {tierKeys.map((key, i) => {
                const y = 60 + i * 110;
                const color = TIER_COLORS[key];
                const isActive = activeTier === key;
                return (
                  <g key={key} onClick={() => setActiveTier(activeTier === key ? null : key)} style={{ cursor: 'pointer' }}>
                    {/* Connection line to next tier */}
                    {i < 3 && (
                      <line
                        x1="90" y1={y + 32} x2="90" y2={y + 78}
                        stroke={color} strokeWidth="2" strokeDasharray="4 3"
                        className="draw-line"
                        style={{ animationDelay: `${i * 0.3}s` }}
                      />
                    )}
                    {/* Tier node */}
                    <circle
                      cx="90" cy={y}
                      r={isActive ? 34 : 30}
                      fill={color}
                      opacity={isActive ? 1 : 0.8}
                      className="transition-all duration-200"
                    />
                    {i > 0 && (
                      <>
                        <line x1="60" y1={y} x2="20" y2={y} stroke={color} strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />
                        <line x1="120" y1={y} x2="160" y2={y} stroke={color} strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />
                        <circle cx="15" cy={y} r="5" fill={color} opacity="0.5" />
                        <circle cx="165" cy={y} r="5" fill={color} opacity="0.5" />
                      </>
                    )}
                    {/* Tier number */}
                    <text x="90" y={y + 5} textAnchor="middle" fill="white" fontSize="14" fontWeight="700">
                      T{i + 1}
                    </text>
                    {/* Label */}
                    <text x="90" y={y + 50} textAnchor="middle" fill="#0A1628" fontSize="9" fontWeight="600">
                      {tiers[key].title.split(' ').slice(0, 2).join(' ')}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Tier detail cards */}
          <div ref={tiersRef} className="flex-1 space-y-4">
            {tierKeys.map((key, i) => {
              const tier = tiers[key];
              const color = TIER_COLORS[key];
              const isActive = activeTier === key;
              return (
                <div
                  key={key}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                  style={{ borderLeft: `4px solid ${color}` }}
                  onClick={() => setActiveTier(isActive ? null : key)}
                >
                  <div className="p-5 flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: color + '20', color }}
                    >
                      {TIER_ICONS[key]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold px-2 py-0.5 rounded text-white" style={{ background: color }}>
                          Tier {i + 1}
                        </span>
                        <h3 className="font-bold text-[#0A1628] text-base">{tier.title}</h3>
                      </div>
                      <p className="text-[#718096] text-sm leading-relaxed">{tier.description}</p>
                    </div>
                    <ChevronDown
                      className="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200"
                      style={{ transform: isActive ? 'rotate(180deg)' : 'none' }}
                    />
                  </div>

                  {isActive && (
                    <div className="px-5 pb-5 border-t border-gray-50">
                      <div className="pt-4">
                        <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">Key Responsibilities</div>
                        <ul className="grid grid-cols-2 gap-2">
                          {tier.responsibilities.map((r) => (
                            <li key={r} className="flex items-start gap-2 text-sm text-[#718096]">
                              <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: color }} />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-10">
          <button className="inline-flex items-center gap-2 text-[#0E7B74] font-semibold text-base hover:gap-3 transition-all">
            {t.governance.fullDetails} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
