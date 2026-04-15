import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

type TierKey = 'steering' | 'secretariat' | 'countryLeads' | 'twgs';

const TIER_ICONS: Record<TierKey, JSX.Element> = {
  steering: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="#0E7B74" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  ),
  secretariat: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="#0E7B74" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="M7 8h10M7 12h5" />
    </svg>
  ),
  countryLeads: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="#0E7B74" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  twgs: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="#0E7B74" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  ),
};

const TIER_DESCRIPTIONS: Record<TierKey, string> = {
  steering: 'The highest decision-making body composed of senior representatives from each founding organization. Provides strategic leadership, approves work plans and budgets, oversees financial management, and resolves disputes.',
  secretariat: 'Coordinates day-to-day operations, organizes Steering Committee meetings, maintains documentation, facilitates partner communication, and serves as primary contact for external stakeholders.',
  countryLeads: 'Designated lead organizations in each of the four member countries. Coordinate national-level implementation, liaise with local stakeholders, and report programmatic and financial progress to the Secretariat.',
  twgs: 'Provide specialized expertise across five thematic areas: WASH, Climate Action, Blue Economy, Public Health, and Research & Innovation. Support program design, implementation, and knowledge sharing.',
};

const TIER_RESPONSIBILITIES_LIST: Record<TierKey, string[]> = {
  steering: ['Strategic leadership & direction', 'Work plan & budget approval', 'Financial oversight & transparency', 'Dispute resolution', 'Membership application review', 'Meets at least twice per year'],
  secretariat: ['Day-to-day operational coordination', 'Steering Committee meeting logistics', 'Partner communications', 'Program development support', 'Monitoring & consolidated reporting', 'Primary external stakeholder contact'],
  countryLeads: ['National implementation coordination', 'Local stakeholder consultations', 'Alignment with regional strategies', 'Programmatic & financial progress reports', 'Capacity building at country level'],
  twgs: ['WASH technical guidance', 'Climate & environmental expertise', 'Blue economy program design', 'Public health integration', 'Research & innovation support', 'Knowledge sharing across countries'],
};

export function GovernanceSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeTier, setActiveTier] = useState<TierKey | null>(null);

  const tierKeys: TierKey[] = ['steering', 'secretariat', 'countryLeads', 'twgs'];

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll('.gov-card');
    if (!cards) return;
    gsap.fromTo(
      Array.from(cards),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 75%',
        },
      }
    );
  }, []);

  const tiers = t.governance.tiers;

  return (
    <section ref={sectionRef} className="bg-white py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#0E7B74] uppercase tracking-widest text-sm font-semibold">{t.governance.sectionLabel}</span>
          <h2 className="font-display text-section text-[#0A1628] mt-2">{t.governance.headline}</h2>
          <p className="text-[#718096] mt-3 text-base max-w-xl mx-auto">{t.governance.subheadline}</p>
        </div>

        {/* Flowchart */}
        <div ref={cardsRef} className="relative">
          {tierKeys.map((key, i) => {
            const isActive = activeTier === key;
            const tierName = tiers[key].title;
            return (
              <div key={key} className="relative">
                {/* Card */}
                <div
                  className={`gov-card relative bg-[#0D1B2E] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    isActive ? 'ring-2 ring-[#0E7B74]/60 shadow-2xl shadow-teal-900/30' : 'hover:shadow-xl hover:shadow-black/20'
                  }`}
                  onClick={() => setActiveTier(isActive ? null : key)}
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex items-start gap-5">
                      {/* Icon */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#0E7B74]/15 flex items-center justify-center">
                        {TIER_ICONS[key]}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          {/* Numbered badge */}
                          <div className="w-7 h-7 rounded-full bg-[#0E7B74] flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">{i + 1}</span>
                          </div>
                          <h3 className="text-white font-bold text-lg sm:text-xl">{tierName}</h3>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed">
                          {TIER_DESCRIPTIONS[key]}
                        </p>

                        {/* Expanded responsibilities */}
                        {isActive && (
                          <div className="mt-5 pt-5 border-t border-white/10">
                            <p className="text-[#0E7B74] text-xs font-bold uppercase tracking-widest mb-3">Key Responsibilities</p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {TIER_RESPONSIBILITIES_LIST[key].map((r) => (
                                <li key={r} className="flex items-start gap-2 text-sm text-white/55">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#0E7B74] mt-1.5 flex-shrink-0" />
                                  {r}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Expand indicator */}
                      <div className="flex-shrink-0 ml-2">
                        <svg
                          viewBox="0 0 20 20"
                          className="w-5 h-5 text-white/30 transition-transform duration-200"
                          fill="currentColor"
                          style={{ transform: isActive ? 'rotate(180deg)' : 'none' }}
                        >
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vertical connector line to next card */}
                {i < 3 && (
                  <div className="flex justify-center py-0">
                    <div className="flex flex-col items-center">
                      <div className="w-px h-6 bg-[#0E7B74]/40" />
                      <div className="w-2 h-2 rounded-full bg-[#0E7B74]/60" />
                      <div className="w-px h-6 bg-[#0E7B74]/40" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom TWGs detail - shows the 5 working groups */}
        <div className="mt-10 bg-[#0D1B2E]/5 border border-[#0D1B2E]/10 rounded-2xl p-6">
          <p className="text-[#0E7B74] text-xs font-bold uppercase tracking-widest mb-4">Technical Working Groups — 5 Thematic Areas</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {['WASH', 'Climate Action', 'Blue Economy', 'Public Health', 'Research & Innovation'].map((twg) => (
              <div key={twg} className="bg-[#0D1B2E] rounded-xl px-3 py-2.5 text-center">
                <span className="text-white/70 text-xs font-medium">{twg}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <button className="inline-flex items-center gap-2 text-[#0E7B74] font-semibold text-sm hover:gap-3 transition-all">
            {t.governance.fullDetails} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
