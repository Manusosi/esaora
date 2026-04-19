import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/i18n/LanguageContext';
import { MembershipModal } from './MembershipModal';
import { ShareModal } from './ShareModal';

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [membershipOpen, setMembershipOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      bannerRef.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 88%' },
      }
    );
  }, []);

  return (
    <>
      <section ref={sectionRef} className="bg-white py-12 px-4 sm:px-6">
        <div
          ref={bannerRef}
          className="max-w-6xl mx-auto rounded-[7px] overflow-hidden relative flex items-center border border-brand-navy/8"
          style={{ minHeight: '260px', backgroundColor: '#0B1F3A' }}
        >
          {/* Very subtle dot texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 0)', backgroundSize: '22px 22px' }}
          />

          {/* Content */}
          <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-0 py-10 pl-10 sm:pl-14 pr-4">
            {/* Left: Text + Buttons */}
            <div className="flex-1 text-left space-y-5 md:pr-8 lg:pr-0">
              <div className="space-y-3">
                <span className="inline-block px-2.5 py-1 rounded-full bg-white/8 border border-white/15 text-[#00d2ff] text-[9px] font-black uppercase tracking-[0.25em]">
                  {t.cta.getInvolved}
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight leading-snug max-w-sm italic">
                  {t.cta.headline}
                </h2>
                <p className="text-white/55 text-sm leading-relaxed max-w-md">
                  {t.cta.subheadline}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                {/* Join — matches NavBar Contact button: bg-[#00d2ff] text-brand-navy */}
                <button
                  onClick={() => setMembershipOpen(true)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#00d2ff] hover:bg-[#00b8e6] text-brand-navy rounded-[7px] font-black text-xs uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  {t.cta.joinButton}
                  <JoinIcon className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setShareOpen(true)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-transparent border border-white/25 text-white/80 hover:text-white hover:border-white/50 rounded-[7px] font-black text-xs uppercase tracking-widest transition-all duration-200 active:scale-95"
                >
                  {t.cta.shareButton}
                  <ShareIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Hero image — contained, grounded */}
            <div className="hidden lg:flex absolute bottom-0 right-0 h-[110%] w-[480px] items-end justify-end pointer-events-none overflow-hidden select-none">
              <img
                src="/images/sections/CTA.png"
                alt="ESAORA Action"
                className="h-full w-auto object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </section>

      <MembershipModal open={membershipOpen} onClose={() => setMembershipOpen(false)} />
      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </>
  );
}

function JoinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" />
      <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}
