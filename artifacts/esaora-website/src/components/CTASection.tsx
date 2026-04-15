import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Users, Share2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    );
  }, []);

  const cards = [
    {
      icon: <Heart className="w-7 h-7" />,
      data: t.cta.fund,
      color: '#E8682A',
      delay: 0,
    },
    {
      icon: <Users className="w-7 h-7" />,
      data: t.cta.join,
      color: '#0E7B74',
      delay: 0.1,
    },
    {
      icon: <Share2 className="w-7 h-7" />,
      data: t.cta.share,
      color: '#1A6BA0',
      delay: 0.2,
    },
  ];

  return (
    <section ref={sectionRef} className="bg-[#0A1628] py-20 px-4 relative overflow-hidden">
      {/* Top teal accent border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0E7B74] via-[#1A6BA0] to-[#0E7B74]" />

      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <svg viewBox="0 0 800 400" className="w-full h-full">
          <path d="M0,200 C200,100 600,300 800,200" stroke="#0E7B74" strokeWidth="2" fill="none" />
          <path d="M0,250 C200,150 600,350 800,250" stroke="#0E7B74" strokeWidth="1" fill="none" />
          <path d="M0,150 C200,50 600,250 800,150" stroke="#0E7B74" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div ref={contentRef} className="max-w-6xl mx-auto relative">
        <div className="text-center mb-14">
          <h2 className="font-display text-section text-white">{t.cta.headline}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map(({ icon, data, color }) => (
            <div
              key={data.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-7 text-center card-hover group"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 transition-transform group-hover:scale-110 duration-200"
                style={{ background: color + '25', color }}
              >
                {icon}
              </div>
              <h3 className="text-white font-bold text-xl mb-3 font-sora">{data.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">{data.description}</p>
              <button
                className="w-full py-3 rounded-full font-semibold text-sm text-white transition-all hover:scale-105 duration-200"
                style={{ background: color }}
              >
                {data.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
