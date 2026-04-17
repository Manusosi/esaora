import { useRef, useEffect } from 'react';
import { Link } from 'wouter';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { ObjectivesSlider } from '@/components/ObjectivesSlider';
import { CTASection } from '@/components/CTASection';

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ───────────────────────────────────────────────────────────────── */

const CORE_VALUES = [
  {
    name: 'Equity & Inclusivity',
    desc: 'Every member nation and coastal community has an equal voice in shaping our agenda and governance. No single nation can dominate the Alliance. Decisions reflect the full partnership.',
    color: '#00d2ff',
    image: '/images/hero/hero-bg-2.jpg',
    num: '01',
  },
  {
    name: 'Accountability',
    desc: 'Transparent financial management, independent annual auditing, and clear reporting obligations at every tier - to member organizations, communities, and institutional funders alike.',
    color: '#0097a6',
    image: '/images/sections/pillar-wash.jpeg',
    num: '02',
  },
  {
    name: 'Innovation',
    desc: 'Science-based, evidence-driven approaches that adapt as challenges evolve. We invest in research, scale what works, and build systems that learn.',
    color: '#22C55E',
    image: '/images/sections/pillar-climate-action.jpg',
    num: '03',
  },
  {
    name: 'Sustainability',
    desc: 'Every intervention is designed for long-term ecosystem and community benefit. We do not optimize for short-term metrics at the expense of lasting, regenerative impact.',
    color: '#F59E0B',
    image: '/images/sections/pillar-blueeconomy.jpeg',
    num: '04',
  },
];

const MISSION_PILLARS = [
  { num: '01', text: 'Deliver coordinated WASH interventions in climate-vulnerable coastal communities across all four nations', color: '#0097a6' },
  { num: '02', text: 'Drive ecosystem restoration - mangrove rehabilitation, watershed protection, and coastal conservation - at regional scale', color: '#22C55E' },
  { num: '03', text: 'Promote sustainable blue economy development that benefits youth, women, and artisanal coastal livelihoods', color: '#00d2ff' },
  { num: '04', text: 'Integrate public health systems with environmental programs for holistic, lasting community resilience', color: '#F59E0B' },
];



/* ─── Component ──────────────────────────────────────────────────────────── */

export default function VisionPage() {
  const visionRef  = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLElement>(null);
  const valuesRef  = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Vision statement — dramatic typewriter-like stagger
      gsap.fromTo('.vision-word',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out',
          scrollTrigger: { trigger: visionRef.current, start: 'top 65%' } }
      );

      // Mission pillars
      gsap.fromTo('.mission-pillar',
        { opacity: 0, x: 25 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: missionRef.current, start: 'top 75%' } }
      );

      // Values cards
      gsap.fromTo('.value-card',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.65, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: valuesRef.current, start: 'top 70%' } }
      );

    });

    return () => { ctx.revert(); };
  }, []);

  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <PageHero
        label="PURPOSE"
        heading="Our Vision for Resilient Coasts and Communities"
        subheading="The principles and aspirations that guide every decision, program, and partnership the Alliance makes."
        imageSrc="/images/hero/hero-bg-4.jpg"
        breadcrumb="Vision & Mission"
        breadcrumbParent={{ label: 'About', href: '/about' }}
      />

      {/* ── 01. Vision Statement — dark full-bleed with giant typography ──── */}
      <section className="bg-[#001833] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[68vh]">

          {/* Left - cinematic image */}
          <div
            className="relative min-h-[340px] lg:min-h-full"
            style={{
              backgroundImage: `url('/images/hero/hero-bg-2.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#001833]/0 to-[#001833]/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001833] via-transparent to-transparent" />

            {/* Water / ocean label overlay */}
            <div className="absolute top-8 left-8">
              <span className="text-[10px] uppercase tracking-widest font-bold text-white/50 bg-[#001833]/80 border border-white/15 px-3 py-1.5 rounded-lg">Vision 2025-2030</span>
            </div>
          </div>

          {/* Right - vision statement */}
          <div ref={visionRef} className="flex flex-col justify-center px-10 lg:px-16 py-20">
            <span className="text-[#00d2ff] tracking-widest text-xs font-bold block mb-8">Our Vision</span>
            <div className="w-12 h-0.5 bg-[#00d2ff] mb-10" />
            <blockquote className="font-display text-2xl sm:text-3xl text-white leading-[1.3] mb-8 font-light">
              {`We envision a resilient and environmentally sustainable East and Southern African region in which communities have equitable access to safe water, adequate sanitation, and strengthened public health systems. Coastal and marine ecosystems are managed responsibly to support sustainable livelihoods and thriving blue economies. Through collaborative regional action, we aim to strengthen environmental stewardship, enhance climate resilience, and promote inclusive economic opportunities that benefit present and future generations.`.split(' ').map((word, i) => (
                <span key={i} className="vision-word inline-block mr-[0.28em]">{word}</span>
              ))}
            </blockquote>
            <p className="text-white/45 text-base leading-relaxed">
              This is not aspirational rhetoric - it is the operational north star that every ESA-ORA program, partnership, and investment is designed to serve.
            </p>
          </div>
        </div>
      </section>

      {/* ── 02. Mission — split with image and numbered list ──────────────── */}
      <section ref={missionRef} className="bg-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — text */}
            <div>
              <span className="text-[#00d2ff] uppercase tracking-widest text-xs font-bold block mb-4">Our Mission</span>
              <h2 className="font-display text-4xl sm:text-5xl text-brand-navy font-bold leading-tight mb-7">
                How We Turn<br />Vision into Action
              </h2>
              <p className="text-[#4A5568] text-lg leading-relaxed mb-10">
                We seek to establish a collaborative regional platform that unites organizations working in water security, climate resilience, public health, and sustainable ocean economies. Through strategic partnerships, joint programming, research, and innovation, we will mobilize technical and financial resources to support sustainable development initiatives and improve the well-being of communities across participating countries.
              </p>
              <div className="space-y-4">
                {MISSION_PILLARS.map((p) => (
                  <div key={p.num} className="mission-pillar flex items-start gap-5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs" style={{ background: p.color + '20', color: p.color }}>
                      {p.num}
                    </div>
                    <p className="text-[#4A5568] text-sm leading-relaxed">{p.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - stacked images with overlay text */}
            <div className="relative">
              <div
                className="w-full rounded-lg overflow-hidden"
                style={{ height: '500px', backgroundImage: `url('/images/hero/hero-bg-10.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center top' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#001833]/80 via-transparent to-transparent rounded-lg" />
              </div>
              {/* Floating metric card */}
              <div className="absolute bottom-8 left-8 right-8 bg-brand-navy/90 border border-white/20 rounded-lg p-5">
                <p className="text-white/60 text-xs uppercase tracking-widest font-bold mb-2">Alliance Mission Target</p>
                <p className="text-white font-display text-2xl font-bold">8,000+ km of coastline under coordinated resilience programs by 2030</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03. Core Values - editorial image cards ──────────────────────── */}
      <section ref={valuesRef} className="bg-[#FAF9F6] py-24 px-4 relative overflow-hidden text-center md:text-left">
        {/* Dotted Whiteboard Pattern - Dimmed */}
        <div 
          className="absolute inset-0 z-0 opacity-20" 
          style={{ 
            backgroundImage: 'radial-gradient(#94A3B8 1.5px, transparent 1.5px)', 
            backgroundSize: '32px 32px' 
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6] via-transparent to-[#FAF9F6] z-0 pointer-events-none opacity-90" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 relative pt-8">
            <span className="text-brand-navy/50 uppercase tracking-widest text-xs font-bold bg-white shadow-sm px-4 py-1.5 rounded-lg inline-block mb-4">Our Principles</span>
            <h2 className="font-display text-4xl sm:text-5xl text-brand-navy font-bold mt-4">Core Values</h2>
            <p className="text-[#4A5568] mt-4 text-base max-w-lg mx-auto bg-white/50 inline-block px-4 py-1 rounded-lg leading-relaxed">
              The principles embedded in our charter - governing how we operate across all four nations.
            </p>
          </div>

          {/* 4 image-backed value panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CORE_VALUES.map((v) => (
              <div
                key={v.name}
                className="value-card group relative rounded-lg overflow-hidden min-h-[380px] flex flex-col justify-end cursor-default"
              >
                {/* BG */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-108"
                  style={{ backgroundImage: `url('${v.image}')` }}
                />
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
                {/* Color tint on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500" style={{ background: v.color }} />

                {/* Number watermark */}
                <div className="absolute top-5 right-6 text-white/8 font-display text-7xl font-bold leading-none select-none pointer-events-none">
                  {v.num}
                </div>

                {/* Content */}
                <div className="relative z-10 p-7">
                  {/* Color accent bar */}
                  <div className="h-0.5 w-10 mb-5 rounded-full" style={{ background: v.color }} />
                  <h3 className="text-white font-bold text-lg mb-3">{v.name}</h3>
                  <p className="text-white/58 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04. Strategic Objectives — reuse ObjectivesSlider as-is ──────── */}
      <ObjectivesSlider />

      {/* ── 06. Navigation — image-backed cards ─────────────────────────── */}
      <section className="bg-[#F0F4F8] py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#00d2ff] uppercase tracking-widest text-xs font-bold block mb-3">Continue</span>
            <h2 className="font-display text-4xl text-brand-navy font-bold">Explore the Alliance</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { label: 'Our Story',   sub: 'How four nations formed the Alliance and why - the founding narrative', href: '/our-story',   image: '/images/hero/hero-bg-3.jpg', color: '#00d2ff' },
              { label: 'Governance',  sub: 'The transparent, member-led structure ensuring accountability at every tier', href: '/governance', image: '/images/hero/hero-bg-5.jpg', color: '#0097a6' },
              { label: 'Our Programs', sub: 'Four thematic pillars, five Technical Working Groups, one regional strategy', href: '/programs',   image: '/images/sections/pillar-blueeconomy.jpeg', color: '#22C55E' },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group block rounded-lg overflow-hidden relative min-h-[260px] flex flex-col justify-end hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-600 group-hover:scale-105" style={{ backgroundImage: `url('${card.image}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001833]/95 via-[#001833]/40 to-transparent" />
                <div className="relative z-10 p-8">
                  <h3 className="text-white font-bold text-xl mb-2 group-hover:text-[#00d2ff] transition-colors">{card.label}</h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-5">{card.sub}</p>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold group-hover:gap-3 transition-all" style={{ color: card.color }}>
                    <span>Explore</span><ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
