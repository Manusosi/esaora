import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const PARTNERS = [
  { 
    name: 'Blue Economy Organisation', 
    logo: '/images/partners/BEO-Logo.png',
    width: 140
  },
  { 
    name: 'Harona', 
    logo: '/images/partners/Harona.png',
    width: 120
  },
  { 
    name: 'Mariners for Action', 
    logo: '/images/partners/Mariners-FA-official-logo.png',
    width: 150
  },
  { 
    name: 'Wavu', 
    logo: '/images/partners/wavu.png',
    width: 130
  },
];

export function PartnerMarquee() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current || !containerRef.current) return;

    const track = trackRef.current;
    const totalWidth = track.scrollWidth;
    
    // GSAP Marquee Animation
    // We animate the track to move to the left by half its width (which is the length of one full set of partners)
    const animation = gsap.to(track, {
      x: `-50%`,
      duration: 35, // Adjust speed here for "professional" feel
      ease: 'none',
      repeat: -1,
      paused: false
    });

    // Pause on hover for a premium feel
    const handleMouseEnter = () => {
      gsap.to(animation, { timeScale: 0.2, duration: 1, ease: 'power2.out' });
    };
    const handleMouseLeave = () => {
      gsap.to(animation, { timeScale: 1, duration: 1, ease: 'power2.inOut' });
    };

    track.addEventListener('mouseenter', handleMouseEnter);
    track.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      animation.kill();
      track.removeEventListener('mouseenter', handleMouseEnter);
      track.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Triple the list to ensure there's always enough content to fill the screen and loop
  const displayPartners = [...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <section className="bg-white py-16 px-4 overflow-hidden border-t border-brand-navy/[0.03]">
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center space-y-2">
          <span className="text-[#00d2ff] uppercase tracking-[0.25em] text-[10px] font-extrabold block">
            {t.partners.headline}
          </span>
          <h2 className="text-brand-navy text-2xl font-bold tracking-tight">
            {t.partners.marqueeHeadline}
          </h2>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="relative mask-fade-edges max-w-[1600px] mx-auto overflow-hidden cursor-grab active:cursor-grabbing"
      >
        <div 
          ref={trackRef}
          className="flex items-center gap-12 sm:gap-20 w-max"
        >
          {displayPartners.map((partner, i) => (
            <div 
              key={`${partner.name}-${i}`}
              className="flex-shrink-0 flex items-center justify-center py-4 rounded-xl group transition-all duration-300"
              style={{ width: partner.width }}
            >
              <img 
                src={partner.logo} 
                alt={partner.name}
                className="max-h-12 w-auto object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 will-change-transform"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-12">
        <button className="group inline-flex items-center gap-2 text-brand-navy/60 font-bold text-xs uppercase tracking-widest hover:text-[#00d2ff] transition-all duration-300">
          <span className="relative">
            {t.partners.becomeMember}
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#00d2ff] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </span>
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .mask-fade-edges {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}} />
    </section>
  );
}

