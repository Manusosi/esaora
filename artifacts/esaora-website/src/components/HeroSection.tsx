import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const COUNTRY_FLAGS = [
  { code: 'KE', emoji: '🇰🇪', name: 'Kenya' },
  { code: 'TZ', emoji: '🇹🇿', name: 'Tanzania' },
  { code: 'MZ', emoji: '🇲🇿', name: 'Mozambique' },
  { code: 'MG', emoji: '🇲🇬', name: 'Madagascar' },
];

export function HeroSection() {
  const { t } = useLanguage();
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const flagsRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power2.out' })
      .fromTo(headlineRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.5')
      .fromTo(subRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
      .fromTo(flagsRef.current?.children ? Array.from(flagsRef.current.children) : [], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '-=0.3');
  }, []);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  const lines = t.hero.headline.split('\n');

  return (
    <section className="relative w-full h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#000080]">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1439405326854-014607f694d7?w=1920&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div ref={overlayRef} className="absolute inset-0 video-overlay" />
      </div>

      {/* Clean Horizontal Transition (No Curves) */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10 z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000080]/80 to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6 text-sm text-white/80">
          <span className="w-2 h-2 bg-[#00d2ff] rounded-full animate-pulse" />
          East & Southern Africa Ocean Resilience Alliance
        </div>

        <h1 ref={headlineRef} className="font-display text-hero text-white mb-6 leading-tight">
          {lines.map((line, i) => (
            <span key={i} className={`block ${i === 1 ? 'text-[#00d2ff]' : ''}`}>{line}</span>
          ))}
        </h1>

        <p ref={subRef} className="text-lg sm:text-xl text-white/75 mb-8 max-w-2xl mx-auto leading-relaxed">
          {t.hero.subheadline}
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-[#00d2ff] hover:bg-[#00b8e6] text-[#000080] px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-200 hover:scale-105 shadow-lg shadow-navy-900/20">
            {t.hero.discoverWork}
          </button>
          <button className="border-2 border-white/60 hover:border-white text-white px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-200 hover:bg-white/10">
            {t.hero.joinAlliance}
          </button>
        </div>
      </div>

    </section>
  );
}
