import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';

gsap.registerPlugin(ScrollTrigger);

const CRISES = [
  {
    title: 'Water Insecurity',
    body: 'Saltwater intrusion, drought, and flooding are relentlessly dismantling freshwater sources across Indian Ocean coastlines. The crisis is already here.',
    image: '/images/sections/pillar-wash.jpeg',
    color: '#0097a6',
  },
  {
    title: 'Ecosystem Collapse',
    body: 'The natural shields protecting coastal communities including mangroves, coral reefs, and seagrass beds are disappearing faster than they can recover.',
    image: '/images/sections/pillar-climate-action.jpg',
    color: '#22C55E',
  },
  {
    title: 'Health Emergency',
    body: 'Contaminated water, inadequate sanitation, and degraded ecosystems combine to create a persistent health emergency in the region.',
    image: '/images/sections/pillar-public-health.jpeg',
    color: '#F59E0B',
  },
  {
    title: 'Economic Vulnerability',
    body: 'Diminishing fisheries and degraded marine resources threaten the primary livelihoods of millions reliant on the coastal blue economy for daily survival.',
    image: '/images/sections/pillar-blueeconomy.jpeg',
    color: '#00d2ff',
  }
];

const MILESTONES = [
  {
    period: 'Early 2025',
    event: 'Regional Consultations',
    detail: 'Cross-country needs assessments and stakeholder dialogues confirmed a shared crisis too large for any single organization to tackle alone.',
    image: '/images/hero/hero-bg-2.jpg'
  },
  {
    period: 'Mid 2025',
    event: 'Drafting the Agreement',
    detail: 'Representatives from the founding organizations convened for an intensive co-drafting process to build an agreement based on equal partnership.',
    image: '/images/hero/hero-bg-4.jpg'
  },
  {
    period: 'Late 2025',
    event: 'Alliance Established',
    detail: 'The Regional Consortium Charter was officially signed. The Alliance was born uniting four nations, one ocean, and one purpose.',
    image: '/images/hero/hero-bg-6.jpg'
  },
  {
    period: 'April 2026',
    event: 'Governance Set in Motion',
    detail: 'The inaugural Steering Committee meeting set strategic priorities and established the first regional work plan for the coming five years.',
    image: '/images/hero/hero-bg-8.jpg'
  },
];

const FOUNDING_ORGS = [
  { org: 'Mariners for Action', website: 'https://marinersfa.org/', logo: '/images/partners/Mariners-FA-official-logo.png', country: 'Kenya', desc: 'Leading marine conservation, climate-resilient ocean strategies, and community empowerment initiatives along the Kenyan coast.' },
  { org: 'Wavu', website: 'https://wavu.blue/', logo: '/images/partners/wavu.png', country: 'East Africa (Kenya)', desc: 'Connecting East African fish farmers with high-quality aquaculture inputs, financing options, and guaranteed offtake markets.' },
  { org: 'Blue Economy Organisation', website: 'https://beo.or.tz/', logo: '/images/partners/BEO-Logo.png', country: 'Tanzania', desc: 'Dedicated to restoring marine ecosystems while enhancing the livelihoods of coastal communities across Tanzania.' },
  { org: 'Harona', website: 'https://ongharona.vercel.app/', logo: '/images/partners/Harona.png', country: 'Madagascar', desc: 'Protecting Madagascar\'s extraordinary world-class coral reefs and building critical environmental stewardship directly at the community level.' },
];

export default function OurStoryPage() {
  const videoSectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro fade in
      gsap.fromTo('.story-intro-content',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: '.story-intro-content', start: 'top 80%' } }
      );

      // Crisis panels
      gsap.fromTo('.crisis-panel',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: '.crisis-panel-container', start: 'top 75%' } }
      );

      // Video quote parallax
      gsap.fromTo(quoteRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: videoSectionRef.current, start: 'top 60%' } }
      );

      // Milestones timeline
      gsap.fromTo('.timeline-item',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out', scrollTrigger: { trigger: '.timeline-container', start: 'top 70%' } }
      );

      // Founding orgs
      gsap.fromTo('.org-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: '.org-card-container', start: 'top 80%' } }
      );
    });
    return () => { ctx.revert(); };
  }, []);

  return (
    <main className="bg-brand-navy">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <PageHero
        label="OUR HERITAGE"
        heading="From Shared Waters to Shared Purpose"
        subheading="Four nations and one ocean forming an alliance to face compounding crisis together."
        imageSrc="/images/hero/hero-bg-3.jpg"
        breadcrumb="Our Story"
        breadcrumbParent={{ label: 'About', href: '/about' }}
      />

      {/* ── The Catalyst (Premium Editorial Narrative) ──────────── */}
      <section className="bg-brand-navy py-24 md:py-32 px-4 relative overflow-hidden text-white border-b border-white/5">
        <div className="absolute inset-0 bg-[#001f4a] z-0"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            {/* Visual Composition (Clean Staggered Grid) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center gap-4 sm:gap-6 lg:pr-8">
              {/* Left Image - Pushed Down */}
              <div className="w-1/2 pt-16 sm:pt-24">
                <div className="rounded-lg overflow-hidden shadow-2xl h-[300px] sm:h-[400px] lg:h-[480px] w-full relative border border-white/5">
                  <img src="/images/sections/pillar-climate-action.jpg" alt="Climate Action" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-brand-navy/10 mix-blend-multiply" />
                </div>
              </div>
              {/* Right Image - Pulled Up */}
              <div className="w-1/2 pb-16 sm:pb-24">
                <div className="rounded-lg overflow-hidden shadow-2xl h-[300px] sm:h-[400px] lg:h-[480px] w-full relative border border-white/5">
                  <img src="/images/sections/pillar-blueeconomy.jpeg" alt="Blue Economy" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-brand-navy/10 mix-blend-multiply" />
                </div>
              </div>
            </div>

            {/* Narrative Prose */}
            <div className="w-full lg:w-1/2 story-intro-content">
              <div className="inline-flex items-center gap-3 mb-8">
                <span className="w-12 h-[1px] bg-[#00d2ff]"></span>
                <span className="text-[#00d2ff] uppercase tracking-widest text-[10px] sm:text-xs font-bold">The Catalyst</span>
              </div>
              
              <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl leading-[1.05] font-bold mb-10 text-white drop-shadow-lg">
                Forging a Resilient Path for Our Shared Ocean
              </h2>
              
              <div className="space-y-6 text-white/70 text-base md:text-lg leading-relaxed font-light">
                <p>
                  <span className="text-6xl text-[#00d2ff] font-display float-left mr-4 mt-2 leading-[0.8] mb-1">A</span>
                  cross Kenya, Tanzania, Mozambique, and Madagascar, coastal communities face compounding vulnerabilities. We see water, sanitation, and hygiene (WASH) infrastructure struggling against extreme weather, while climate-driven disruptions accelerate environmental degradation.
                </p>
                <p>
                  Simultaneously, sustainable blue economy livelihoods face pressure from diminishing fisheries, and these overlapping challenges escalate severe public health emergencies. Yet, despite this shared maritime heritage, our organizations historically operated in isolation, running fragmented programs that limited our regional impact.
                </p>
                
                <div className="my-10 border-l border-[#00d2ff]/30 pl-8 py-3 relative before:absolute before:top-0 before:-left-[1px] before:w-[2px] before:h-1/3 before:bg-[#00d2ff] before:shadow-[0_0_12px_#00d2ff]">
                  <p className="text-xl md:text-2xl text-white font-display italic leading-snug">
                    "Coastal communities are on the frontlines of climate change. ESA-ORA is their regional voice."
                  </p>
                </div>
                
                <p className="text-white/90 font-medium">
                  We bridge the gap. The East and Southern Africa Ocean Resilience Alliance (ESA-ORA) creates a unified regional network to synchronize climate adaptation, water security, public health, and sustainable ocean governance under a shared charter.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Four Crises (Clean Card Grid) ──────────────────── */}
      <section className="bg-brand-navy py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#00d2ff] bg-[#00d2ff]/10 px-4 py-1.5 rounded-lg uppercase tracking-widest text-xs font-bold block mb-4 mx-auto w-max">The Reality on the Coastline</span>
            <h2 className="font-display text-4xl sm:text-5xl text-white font-bold">Four Converging Crises</h2>
            <p className="text-white/50 mt-4 text-lg max-w-2xl mx-auto">
              Separated, these issues are difficult to manage. Combined, they threaten the survival of communities across the region.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 crisis-panel-container">
            {CRISES.map((crisis, index) => (
              <div key={index} className="crisis-panel bg-white/5 border border-white/10 rounded-lg overflow-hidden group flex flex-col h-full">
                <div className="h-56 w-full relative overflow-hidden bg-brand-navy flex-shrink-0">
                  <img src={crisis.image} alt={crisis.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-brand-navy/30 pointer-events-none" />
                </div>
                <div className="p-8 flex-grow">
                  <div className="w-10 h-1 rounded-full mb-6" style={{ backgroundColor: crisis.color }} />
                  <h3 className="text-xl font-bold text-white mb-3">{crisis.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{crisis.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Video Quote (Parallax cinematic break) ──────────── */}
      <section
        ref={videoSectionRef}
        className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden"
        style={{ clipPath: 'inset(0)' }}
      >
        {/* Sticky Background Image */}
        <div 
          className="fixed top-0 left-0 w-full h-[100vh] pointer-events-none overflow-hidden -z-10 bg-black bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/sections/homearea.jpg')" }}
        />
        <div className="absolute inset-0 bg-brand-navy/60 pointer-events-none" />

        <div ref={quoteRef} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="w-12 h-1 bg-[#00d2ff] mx-auto mb-8 rounded-full" />
          <blockquote className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-6 drop-shadow-xl">
            &ldquo;We cannot fix the ocean from one beach. We build resilience together or we do not build it at all.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ── Timeline ────────────────────────────────────────── */}
      <section className="bg-[#FAF9F6] py-24 px-4 relative overflow-hidden">
        {/* Dotted Whiteboard Pattern - Dimmed */}
        <div 
          className="absolute inset-0 z-0 opacity-20" 
          style={{ 
            backgroundImage: 'radial-gradient(#94A3B8 1.5px, transparent 1.5px)', 
            backgroundSize: '32px 32px' 
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6] via-transparent to-[#FAF9F6] z-0 pointer-events-none opacity-90" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-20 relative pt-8">
            <span className="text-brand-navy/50 uppercase tracking-widest text-xs font-bold block mb-4 mx-auto w-max bg-white px-3 py-1 rounded-lg shadow-sm">Milestones</span>
            <h2 className="font-display text-4xl sm:text-5xl text-brand-navy font-bold">How We Built the Alliance</h2>
            <p className="text-[#4A5568] mt-4 text-lg bg-white/50 inline-block px-4 py-1 rounded-lg">The moments that brought four nations under one charter.</p>
          </div>

          <div className="relative timeline-container">
            {/* Vertical connecting line */}
            <div className="absolute top-0 bottom-0 left-[27px] md:left-1/2 w-0.5 bg-brand-navy/10 -translate-x-1/2" />

            {MILESTONES.map((m, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="timeline-item relative flex flex-col md:flex-row items-start md:items-center justify-between mb-16 last:mb-0">
                  {/* Timeline Dot */}
                  <div className="absolute left-[27px] md:left-1/2 w-4 h-4 bg-[#00d2ff] rounded-full -translate-x-1/2 mt-2 md:mt-0 z-10 ring-4 ring-[#FAF9F6]" />

                  {/* Left Side (Content for even, Image for odd) */}
                  <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? 'md:text-right md:pr-12' : 'md:order-2 md:pl-12'}`}>
                    <span className="text-[#00d2ff] font-bold tracking-widest text-sm uppercase block mb-2">{m.period}</span>
                    <h3 className="font-display text-2xl text-brand-navy font-bold mb-3">{m.event}</h3>
                    <p className="text-[#4A5568] text-sm leading-relaxed">{m.detail}</p>
                  </div>

                  {/* Right Side (Image for even, Content for odd) */}
                  <div className={`hidden md:block w-[45%] ${isEven ? 'md:order-2 md:pl-12' : 'md:text-right md:pr-12'}`}>
                    <div className="rounded-lg overflow-hidden shadow-lg h-48 w-full relative bg-brand-navy">
                      <img src={m.image} alt={m.event} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-brand-navy/20 pointer-events-none" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Founding Organizations ───────────────────────────── */}
      <section className="bg-white py-24 px-4 border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#00d2ff] uppercase tracking-widest text-xs font-bold block mb-3">The Founders</span>
            <h2 className="font-display text-4xl sm:text-5xl text-brand-navy font-bold">Embedded in the Community</h2>
            <p className="text-[#4A5568] mt-4 text-base max-w-2xl mx-auto">
              ESA-ORA was not imposed from the outside. It was built organically by four organizations already driving critical impact on the ground in their respective home nations. Today, each organization holds an equal, permanent founding seat on the Steering Committee to ensure precise regional balance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 org-card-container">
            {FOUNDING_ORGS.map((org, index) => (
              <div key={index} className="org-card bg-[#F0F4F8] rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <div className="h-40 w-full bg-white flex items-center justify-center p-6 border-b border-black/5 relative group-hover:bg-[#FAFAFA] transition-colors">
                  <img src={org.logo} alt={org.org} className="w-auto h-auto max-w-[150px] max-h-[75px] object-contain mix-blend-multiply flex-shrink-0" />
                </div>
                <div className="p-6 text-center flex-grow flex flex-col">
                  <span className="inline-block bg-[#00d2ff]/15 text-[#0097a6] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm mb-3 self-center">
                    {org.country}
                  </span>
                  <h3 className="text-brand-navy font-bold text-base mb-3">{org.org}</h3>
                  <p className="text-[#718096] text-sm leading-relaxed mb-6 flex-grow">{org.desc}</p>
                  
                  <a
                    href={org.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-brand-navy font-bold text-xs uppercase tracking-wider hover:text-[#0097a6] transition-colors mt-auto pt-4 border-t border-black/5"
                  >
                    Visit Website <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
