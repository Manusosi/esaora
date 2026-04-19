import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'wouter';
import { useLanguage } from '@/i18n/LanguageContext';

const HERO_IMAGES = [
  '/images/hero/hero-bg.jpg',
  '/images/hero/hero-bg-2.jpg',
  '/images/hero/hero-bg-3.jpg',
  '/images/hero/hero-bg-4.jpg',
  '/images/hero/hero-bg-5.jpg',
  '/images/hero/hero-bg-6.jpg',
  '/images/hero/hero-bg-7.jpg',
  '/images/hero/hero-bg-8.jpg',
  '/images/hero/hero-bg-9.jpg',
  '/images/hero/hero-bg-10.jpg',
  '/images/hero/hero-bg-11.jpg',
];

export function HeroSection() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Initial enter animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power2.out' })
      .fromTo(headlineRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.5')
      .fromTo(subRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4');
  }, []);

  // Background slider loop
  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 8000); // Change image every 8 seconds

    return () => clearInterval(sliderInterval);
  }, []);

  const lines = t.hero.headline.split('\n');

  return (
    <section className="relative w-full h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden bg-brand-navy">
      {/* Background Slider */}
      <div className="absolute top-16 md:top-20 left-0 right-0 bottom-0 bg-black">
        {HERO_IMAGES.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-[3000ms] ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${img}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        <div ref={overlayRef} className="absolute inset-0 bg-black/55" />
      </div>

      {/* Clean Horizontal Transition (No Curves) */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10 z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-navy/80 to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-20 md:pt-28">
        <div className="inline-flex items-center gap-2 bg-brand-navy/60 border border-white/20 rounded-lg px-4 py-1.5 mb-8 text-xs sm:text-sm text-white/90">
          <span className="w-2 h-2 bg-[#00d2ff] rounded-full animate-pulse flex-shrink-0" />
          {t.hero.welcome}
        </div>

        <h1 ref={headlineRef} className="font-display text-hero text-white mb-6 leading-tight">
          {lines.map((line, i) => (
            <span key={i} className={`block ${i === 1 ? 'text-[#00d2ff]' : ''}`}>{line}</span>
          ))}
        </h1>

        <p ref={subRef} className="text-lg sm:text-xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed px-4">
          {t.hero.subheadline}
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/programs" className="bg-[#00d2ff] hover:bg-[#00b8e6] text-brand-navy px-8 py-3.5 rounded-lg font-semibold text-base transition-all duration-200 hover:scale-105 shadow-lg shadow-navy-900/20">
            {t.hero.discoverWork}
          </Link>
          <Link href="/partners" className="border-2 border-white/60 hover:border-white text-white px-8 py-3.5 rounded-lg font-semibold text-base transition-all duration-200 hover:bg-white/10 text-center">
            {t.hero.joinAlliance}
          </Link>
        </div>
      </div>
    </section>
  );
}
