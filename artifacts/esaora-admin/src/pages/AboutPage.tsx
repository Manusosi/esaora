import { useRef, useEffect } from 'react';
import { Link } from 'wouter';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { CountryMapSection } from '@/components/CountryMapSection';
import { PartnerMarquee } from '@/components/PartnerMarquee';
import { CTASection } from '@/components/CTASection';

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ───────────────────────────────────────────────────────────────── */

const ABOUT_SECTIONS = [
  {
    num: '01',
    label: 'Our Heritage',
    title: 'Our Story',
    desc: 'How four nations — facing identical crises in isolation — chose to form a binding regional alliance. The founding narrative of ESA-ORA.',
    href: '/our-story',
    image: '/images/hero/hero-bg-3.jpg',
    color: '#00d2ff',
  },
  {
    num: '02',
    label: 'Purpose & Principles',
    title: 'Vision & Mission',
    desc: 'Our vision for a resilient Indian Ocean coastline, the mission that drives every program, and the 7 strategic objectives we are accountable to.',
    href: '/vision',
    image: '/images/hero/hero-bg-4.jpg',
    color: '#0097a6',
  },
  {
    num: '03',
    label: 'Structure & Accountability',
    title: 'Governance',
    desc: 'The transparent, member-led structure — Steering Committee, Secretariat, Country Leads, and 5 Technical Working Groups — that governs the Alliance.',
    href: '/governance',
    image: '/images/hero/hero-bg-5.jpg',
    color: '#22C55E',
  },
];

const PILLARS = [
  { key: 'WASH',          color: '#0097a6', href: '/our-work/wash',         image: '/images/sections/pillar-wash.jpeg',         desc: 'Climate-resilient water, sanitation, and hygiene systems for coastal communities.' },
  { key: 'Climate Action',color: '#22C55E', href: '/our-work/climate',      image: '/images/sections/pillar-climate-action.jpg', desc: 'Mangrove restoration, ecosystem rehabilitation, and nature-based climate adaptation.' },
  { key: 'Blue Economy',  color: '#00d2ff', href: '/our-work/blue-economy', image: '/images/sections/pillar-blueeconomy.jpeg',  desc: 'Sustainable fisheries, marine conservation, and ocean enterprise development.' },
  { key: 'Public Health', color: '#F59E0B', href: '/our-work/public-health',image: '/images/sections/pillar-public-health.jpeg', desc: 'Integrated health and WASH programs that prevent waterborne disease and strengthen community wellbeing.' },
];

const KEY_FACTS = [
  { v: '4',      sub: 'Founding Nations', detail: 'Kenya · Tanzania · Mozambique · Madagascar' },
  { v: '8,000+', sub: 'km of Coastline', detail: 'Under coordinated ESA-ORA programs' },
  { v: '5',      sub: 'Technical Working Groups', detail: 'Cross-country thematic expertise' },
  { v: '2025',   sub: 'Alliance Established', detail: 'Charter valid through 2030' },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function AboutPage() {
  const pillarsRef = useRef<HTMLElement>(null);
  const factsRef   = useRef<HTMLElement>(null);
  const navRef     = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pillar panels
      gsap.fromTo('.about-pillar',
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: pillarsRef.current, start: 'top 70%' } }
      );
      // Key facts
      gsap.fromTo('.key-fact',
        { opacity: 0, scale: 0.88 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: factsRef.current, start: 'top 75%' } }
      );
      // Nav cards
      gsap.fromTo('.about-nav-card',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: navRef.current, start: 'top 75%' } }
      );
    });
    return () => { ctx.revert(); };
  }, []);

  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <PageHero
        label="ABOUT ESA-ORA"
        heading="One Alliance. Four Nations. One Indian Ocean."
        subheading="The East & Southern Africa Ocean Resilience Alliance is a formal regional consortium — bound by charter, driven by community, and guided by shared purpose."
        imageSrc="/images/hero/hero-bg-10.jpg"
        breadcrumb="About"
      />

      {/* ── 01. Who We Are — cinematic split ─────────────────────────────── */}
      <section className="bg-[#001833] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[65vh]">

          {/* Left — stacked images panel */}
          <div className="relative min-h-[380px] lg:min-h-full overflow-hidden">
            {/* Primary image */}
            <div
              className="absolute inset-0"
              style={{ backgroundImage: `url('/images/hero/hero-bg-11.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#001833]/0 to-[#001833]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001833] via-transparent to-transparent" />

            {/* Floating identity card */}
            <div className="absolute bottom-10 left-10 right-16 bg-[#001833]/85 border border-white/15 rounded-lg p-5">
              <p className="text-[#00d2ff] text-[10px] uppercase tracking-widest font-bold mb-2">Alliance Identity</p>
              <p className="text-white font-bold text-base leading-snug">
                East & Southern Africa Ocean Resilience Alliance
              </p>
              <p className="text-white/50 text-xs mt-1">Charter: 2025–2030 · 4 Founding Members · 5 Thematic Pillars</p>
            </div>
          </div>

          {/* Right — editorial narrative */}
          <div className="flex flex-col justify-center px-10 lg:px-16 py-20">
            <span className="text-[#00d2ff] uppercase tracking-widest text-xs font-bold block mb-6">Who We Are</span>
            <h2 className="font-display text-3xl sm:text-4xl text-white font-bold leading-tight mb-8">
              A Regional Alliance<br />Built to Last
            </h2>
            <div className="space-y-5 text-white/60 text-lg leading-relaxed">
              <p>
                ESA-ORA is a formal regional consortium of four founding organizations from Kenya, Tanzania, Mozambique, and Madagascar — united under a binding charter to address the converging crises of water insecurity, climate disruption, marine ecosystem degradation, and public health challenges along the Western Indian Ocean.
              </p>
              <p>
                This is not a loose network or informal partnership. ESA-ORA is a governed, accountable, and member-led alliance — with a Steering Committee, a Secretariat, National Lead Organizations in each country, and five Technical Working Groups delivering cross-country programs in coordination.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/our-story" className="inline-flex items-center gap-2 bg-[#00d2ff] text-brand-navy px-6 py-3 rounded-lg font-bold text-sm hover:bg-[#00b8e6] transition-all hover:gap-3 hover:scale-105">
                Read Our Story <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/governance" className="inline-flex items-center gap-2 border-2 border-white/25 hover:border-white text-white px-6 py-3 rounded-lg font-bold text-sm transition-all hover:bg-white/10">
                View Governance
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02. Key Facts Bar ─────────────────────────────────────────────── */}
      <section ref={factsRef} className="bg-white py-16 px-4 border-b border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {KEY_FACTS.map((f) => (
              <div key={f.v} className="key-fact text-center py-8 px-4 bg-[#F0F4F8] rounded-lg">
                <p className="font-display text-4xl sm:text-5xl text-brand-navy font-bold mb-1">{f.v}</p>
                <p className="text-[#00d2ff] text-xs font-bold uppercase tracking-widest mb-1">{f.sub}</p>
                <p className="text-[#718096] text-xs">{f.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03. About Subsections — 3 image nav cards ─────────────────────── */}
      <section ref={navRef} className="bg-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#00d2ff] uppercase tracking-widest text-xs font-bold block mb-3">Explore the Alliance</span>
            <h2 className="font-display text-4xl sm:text-5xl text-brand-navy font-bold">About ESA-ORA</h2>
            <p className="text-[#718096] mt-4 text-base max-w-xl mx-auto">Three chapters that tell the full story of who we are, what we stand for, and how we operate.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ABOUT_SECTIONS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="about-nav-card group block rounded-lg overflow-hidden relative min-h-[380px] flex flex-col justify-end hover:-translate-y-2 transition-all duration-400 shadow-sm hover:shadow-2xl"
              >
                {/* BG */}
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-600 group-hover:scale-105" style={{ backgroundImage: `url('${s.image}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001833] via-[#001833]/60 to-transparent" />
                {/* Top color bar */}
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: s.color }} />
                {/* Number watermark */}
                <div className="absolute top-5 right-7 text-white/8 font-display text-8xl font-bold select-none pointer-events-none">{s.num}</div>

                {/* Content */}
                <div className="relative z-10 p-8">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: s.color }}>{s.label}</p>
                  <h3 className="text-white font-bold text-2xl mb-3 group-hover:text-[#00d2ff] transition-colors">{s.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">{s.desc}</p>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold group-hover:gap-3 transition-all" style={{ color: s.color }}>
                    <span>Explore</span><ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04. Our Work — 4 Pillar image panels ─────────────────────────── */}
      <section ref={pillarsRef} className="bg-[#001833] py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#00d2ff] uppercase tracking-widest text-xs font-bold bg-[#00d2ff]/10 px-4 py-1.5 rounded-lg inline-block mb-4">Program Architecture</span>
            <h2 className="font-display text-4xl sm:text-5xl text-white font-bold mt-4">Four Thematic Pillars</h2>
            <p className="text-white/45 mt-4 text-base max-w-lg mx-auto leading-relaxed">The four areas of work through which ESA-ORA delivers its mission across the region.</p>
          </div>

          {/* 4 image-backed panels — 2-2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PILLARS.map((p) => (
              <Link
                key={p.key}
                href={p.href}
                className="about-pillar group relative rounded-lg overflow-hidden min-h-[320px] flex flex-col justify-end hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-106" style={{ backgroundImage: `url('${p.image}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/10" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500" style={{ background: p.color }} />

                <div className="relative z-10 p-7">
                  <div className="h-0.5 w-8 rounded-full mb-4" style={{ background: p.color }} />
                  <h3 className="text-white font-bold text-xl mb-2">{p.key}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-5">{p.desc}</p>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 group-hover:gap-3 transition-all" style={{ color: p.color }}>
                    <span>Explore Pillar</span><ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/programs" className="inline-flex items-center gap-2 border-2 border-white/20 hover:border-[#00d2ff]/60 text-white hover:text-[#00d2ff] px-8 py-3.5 rounded-lg font-bold text-sm transition-all hover:gap-3">
              View All Programs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 05. Regional Map — reused from homepage ───────────────────────── */}
      <CountryMapSection />

      {/* ── 06. Partners Marquee — reused from homepage ───────────────────── */}
      <PartnerMarquee />

      <CTASection />
    </main>
  );
}
