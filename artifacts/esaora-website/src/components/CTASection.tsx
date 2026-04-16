import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/i18n/LanguageContext';
import { MembershipModal } from './MembershipModal';
import { ShareModal } from './ShareModal';

gsap.registerPlugin(ScrollTrigger);

function FundIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function JoinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" />
      <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

export function CTASection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [membershipOpen, setMembershipOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [fundHint, setFundHint] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      contentRef.current?.querySelectorAll('.cta-card') ?? [],
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    );
  }, []);

  return (
    <>
      <section ref={sectionRef} className="bg-[#000080] py-20 px-4">
        <div ref={contentRef} className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#00d2ff] uppercase tracking-widest text-sm font-semibold">Get Involved</span>
            <h2 className="font-display text-section text-white mt-2">{t.cta.headline}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* ── Fund Our Work ── */}
            <div className="cta-card bg-[#000080] border border-white/10 rounded-2xl p-7 text-center flex flex-col items-center group hover:border-[#E8682A]/40 transition-all duration-300">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-200" style={{ background: '#E8682A22', color: '#E8682A' }}>
                <FundIcon />
              </div>
              <h3 className="text-white font-bold text-xl mb-3 font-sora">{t.cta.fund.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed mb-6 flex-1">{t.cta.fund.description}</p>
              <div className="relative w-full">
                <button
                  className="w-full py-3 rounded-full font-semibold text-sm text-white transition-all duration-200 opacity-70 cursor-not-allowed"
                  style={{ background: '#E8682A' }}
                  onMouseEnter={() => setFundHint(true)}
                  onMouseLeave={() => setFundHint(false)}
                  onClick={() => setFundHint(true)}
                >
                  {t.cta.fund.button}
                </button>
                {fundHint && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap border border-white/10">
                    Donation portal coming soon
                  </div>
                )}
              </div>
            </div>

            {/* ── Join the Alliance ── */}
            <div className="cta-card bg-[#000080] border border-white/8 rounded-2xl p-7 text-center flex flex-col items-center group hover:border-[#00d2ff]/40 transition-all duration-300 relative overflow-hidden">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-200 relative z-10" style={{ background: '#00d2ff22', color: '#00d2ff' }}>
                <JoinIcon />
              </div>
              <h3 className="text-white font-bold text-xl mb-3 font-sora relative z-10">{t.cta.join.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed mb-6 flex-1 relative z-10">{t.cta.join.description}</p>
              <button
                onClick={() => setMembershipOpen(true)}
                className="w-full py-3 rounded-full font-semibold text-sm text-[#000080] transition-all duration-200 hover:brightness-110 hover:scale-105 relative z-10"
                style={{ background: '#00d2ff' }}
              >
                {t.cta.join.button}
              </button>
            </div>

            {/* ── Share Our Mission ── */}
            <div className="cta-card bg-[#000080] border border-white/8 rounded-2xl p-7 text-center flex flex-col items-center group hover:border-white/20 transition-all duration-300 relative overflow-hidden">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-200 relative z-10" style={{ background: '#00d2ff15', color: '#00d2ff' }}>
                <ShareIcon />
              </div>
              <h3 className="text-white font-bold text-xl mb-3 font-sora relative z-10">{t.cta.share.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed mb-6 flex-1 relative z-10">{t.cta.share.description}</p>
              <button
                onClick={() => setShareOpen(true)}
                className="w-full py-3 border border-[#00d2ff] rounded-full font-semibold text-sm text-[#00d2ff] transition-all duration-200 hover:bg-[#00d2ff] hover:text-[#000080] relative z-10"
              >
                {t.cta.share.button}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <MembershipModal open={membershipOpen} onClose={() => setMembershipOpen(false)} />
      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </>
  );
}
