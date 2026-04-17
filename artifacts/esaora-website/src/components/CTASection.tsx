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
    // Banner entry animation
    gsap.fromTo(
      bannerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      }
    );
  }, []);

  return (
    <>
      <section ref={sectionRef} className="bg-white py-16 px-4 sm:px-6">
        <div 
          ref={bannerRef}
          className="max-w-6xl mx-auto rounded-lg overflow-hidden relative min-h-[400px] flex items-center shadow-2xl shadow-brand-navy/10"
        >
          {/* Background Gradient Layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#001D45] via-[#004A5E] to-[#0D9488]" />
          
          {/* Banner Content Container */}
          <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-8 py-12 px-10 sm:px-14">
            
            {/* Left Side: Content */}
            <div className="flex-1 text-left space-y-6 md:pr-12">
              <div className="space-y-3">
                <span className="inline-block px-3 py-0.5 rounded-lg bg-white/10 border border-white/20 text-[#00d2ff] text-[9px] font-bold uppercase tracking-widest">
                  {t.cta.getInvolved}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight max-w-md">
                  {t.cta.headline}
                </h2>
                <p className="text-white/70 text-base leading-relaxed max-w-lg">
                  {t.cta.subheadline}
                </p>
              </div>

              {/* Two Buttons Container */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => setMembershipOpen(true)}
                  className="group relative flex items-center gap-2 px-7 py-3.5 bg-[#00d2ff] text-brand-navy rounded-lg font-bold text-sm transition-all duration-300 hover:pr-10 active:scale-95"
                >
                  {t.cta.joinButton}
                  <JoinIcon className="absolute right-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 w-4 h-4" />
                </button>
                <button
                  onClick={() => setShareOpen(true)}
                  className="group relative flex items-center gap-2 px-7 py-3.5 bg-transparent border border-white/30 text-white rounded-lg font-bold text-sm transition-all duration-300 hover:pr-10 active:scale-95"
                >
                  {t.cta.shareButton}
                  <ShareIcon className="absolute right-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Side: Grounded Visual Asset */}
            <div className="hidden lg:flex absolute bottom-[-2px] right-0 h-[115%] w-[600px] items-end justify-end pointer-events-none overflow-hidden">
              <img 
                src="/images/sections/CTA.png" 
                alt="ESAORA Action" 
                className="h-full w-auto object-contain object-bottom filter drop-shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition-transform duration-700 origin-bottom"
              />
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

// Internal Icon components with className support
function JoinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" />
      <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}


