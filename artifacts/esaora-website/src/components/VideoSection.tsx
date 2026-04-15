import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export function VideoSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      quoteRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      }
    );

    gsap.to(bgRef.current, {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background image with parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 scale-110"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/60 via-[#0A1628]/50 to-[#0A1628]/70" />

      {/* Content */}
      <div ref={quoteRef} className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <div className="w-12 h-1 bg-[#0E7B74] mx-auto mb-6 rounded-full" />
        <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-snug mb-6">
          "{t.videoQuote.quote}"
        </blockquote>
        <p className="text-white/60 text-sm tracking-wider">{t.videoQuote.attribution}</p>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#FAFAFA" />
        </svg>
      </div>
    </section>
  );
}
