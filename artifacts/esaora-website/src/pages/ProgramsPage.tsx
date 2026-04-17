import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { CountryMapSection } from '@/components/CountryMapSection';
import { CTASection } from '@/components/CTASection';
import { PartnerMarquee } from '@/components/PartnerMarquee';

const PILLARS = [
  {
    name: 'WASH',
    full: 'Water, Sanitation & Hygiene',
    color: '#0097a6',
    href: '/our-work/wash',
    countries: ['Kenya', 'Tanzania', 'Mozambique', 'Madagascar'],
    summary: 'Coordinated water infrastructure rehabilitation, climate-resilient sanitation systems, and WASH behavior change programs across all four member nations.',
    keyOutput: '120+ water points rehabilitated',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2C7 7 4 10.5 4 14a8 8 0 0016 0c0-3.5-3-7-8-12z" />
        <path d="M8 17.5a4 4 0 008 0" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    name: 'Climate Action',
    full: 'Climate Action & Environmental Resilience',
    color: '#22C55E',
    href: '/our-work/climate',
    countries: ['Kenya', 'Tanzania', 'Mozambique', 'Madagascar'],
    summary: 'Mangrove restoration, coastal ecosystem rehabilitation, early warning systems, and nature-based solutions for climate adaptation.',
    keyOutput: '500km² ecosystem restoration target',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    name: 'Blue Economy',
    full: 'Sustainable Blue Economy',
    color: '#00d2ff',
    href: '/our-work/blue-economy',
    countries: ['Kenya', 'Tanzania', 'Mozambique', 'Madagascar'],
    summary: 'Sustainable fisheries management, marine protected area governance, seaweed cultivation, and ocean-based enterprise development.',
    keyOutput: '10,000+ fishers in program areas',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M3 15c2 0 3-2 5-2s3 2 5 2 3-2 5-2" />
        <path d="M3 19c2 0 3-2 5-2s3 2 5 2 3-2 5-2" />
        <path d="M12 3L9 8h6l-3-5z" />
      </svg>
    ),
  },
  {
    name: 'Public Health',
    full: 'Public Health & Community Wellbeing',
    color: '#F59E0B',
    href: '/our-work/public-health',
    countries: ['Kenya', 'Tanzania', 'Mozambique', 'Madagascar'],
    summary: 'Waterborne disease prevention, community health worker training, maternal and child health programs, and WASH-health system integration.',
    keyOutput: '400+ community health workers to be trained',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
];

const CROSS_CUTTING = [
  { title: 'Research & Innovation', desc: 'Cross-country evidence generation, MEL frameworks, and knowledge sharing across all thematic areas through the Research & Innovation Technical Working Group.' },
  { title: 'Capacity Building', desc: 'Strengthening the technical and institutional capacities of member organizations, local partners, and community groups across the four nations.' },
  { title: 'Policy & Advocacy', desc: 'Influencing national and regional policies on WASH, climate adaptation, marine resource governance, and public health through evidence-based advocacy.' },
  { title: 'Youth & Gender', desc: 'Mainstreaming youth leadership and gender equity across all programs — with explicit targets for women-led enterprises and young people in program leadership roles.' },
];

export default function ProgramsPage() {
  return (
    <main>
      <PageHero
        label="OUR PROGRAMS"
        heading="Four Pillars. Four Nations. One Regional Strategy."
        subheading="All ESA-ORA programs are delivered through four thematic pillars, coordinated across member nations through Technical Working Groups and governed by the Steering Committee."
        imageSrc="/images/hero/hero-bg-2.jpg"
        breadcrumb="Programs"
      />

      {/* Pillars Overview */}
      <section className="bg-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#00d2ff] uppercase tracking-widest text-xs font-bold block mb-3">Thematic Pillars</span>
            <h2 className="font-display text-4xl text-brand-navy font-bold">Our Program Pillars</h2>
            <p className="text-[#718096] mt-4 text-base max-w-2xl mx-auto">
              Each pillar is delivered through a dedicated Technical Working Group, ensuring cross-country coordination, shared learning, and consistent standards across all four member nations.
            </p>
          </div>

          <div className="space-y-6">
            {PILLARS.map((pillar, i) => (
              <div
                key={pillar.name}
                className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-[#F0F4F8] rounded-lg overflow-hidden border border-black/5 hover:-translate-y-0.5 transition-all"
              >
                {/* Left: color block */}
                <div className="lg:col-span-1 h-2 lg:h-auto" style={{ background: pillar.color }} />

                {/* Icon + name */}
                <div className="lg:col-span-2 flex items-center gap-4 p-7 border-b lg:border-b-0 lg:border-r border-black/5">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: pillar.color + '20', color: pillar.color }}>
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="text-brand-navy font-bold text-base leading-snug">{pillar.name}</h3>
                    <p className="text-[#718096] text-xs mt-0.5">{pillar.full}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="lg:col-span-5 p-7 border-b lg:border-b-0 lg:border-r border-black/5">
                  <p className="text-[#4A5568] text-sm leading-relaxed mb-4">{pillar.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {pillar.countries.map((c) => (
                      <span key={c} className="text-xs bg-white text-brand-navy/60 px-3 py-1 rounded-lg border border-black/5 font-medium">{c}</span>
                    ))}
                  </div>
                </div>

                {/* Key output + CTA */}
                <div className="lg:col-span-4 p-7 flex flex-col justify-between">
                  <div>
                    <p className="text-[#718096] text-xs uppercase tracking-widest font-bold mb-2">Key Output</p>
                    <p className="text-brand-navy font-bold text-sm">{pillar.keyOutput}</p>
                  </div>
                  <Link
                    href={pillar.href}
                    className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:gap-3 transition-all"
                    style={{ color: pillar.color }}
                  >
                    Explore Pillar <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-cutting themes */}
      <section className="bg-[#F0F4F8] py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#00d2ff] uppercase tracking-widest text-xs font-bold block mb-3">Embedded Across All Pillars</span>
            <h2 className="font-display text-4xl text-brand-navy font-bold">Cross-Cutting Program Themes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {CROSS_CUTTING.map((item, i) => (
              <div key={i} className="bg-white rounded-lg p-7 border border-black/5 hover:-translate-y-1 transition-all shadow-sm">
                <div className="w-8 h-8 bg-brand-navy rounded-lg flex items-center justify-center text-[#00d2ff] text-xs font-bold mb-4">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-brand-navy font-bold text-base mb-3">{item.title}</h3>
                <p className="text-[#718096] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Map */}
      <CountryMapSection />

      {/* Partner Marquee */}
      <PartnerMarquee />

      {/* Program Cycle */}
      <section className="bg-brand-navy py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#00d2ff] uppercase tracking-widest text-xs font-bold bg-[#00d2ff]/10 px-4 py-1.5 rounded-lg inline-block mb-4">How Programs Are Managed</span>
            <h2 className="font-display text-4xl text-white font-bold mt-4">The ESA-ORA Program Cycle</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { phase: 'Design', num: '01', desc: 'Country-led needs assessment and participatory program design aligned with charter objectives.' },
              { phase: 'Approval', num: '02', desc: 'TWG technical review followed by Steering Committee approval of programs and budgets.' },
              { phase: 'Delivery', num: '03', desc: 'Implementation by National Lead Organizations with cross-country learning facilitated by TWGs.' },
              { phase: 'Learning', num: '04', desc: 'Continuous monitoring, evaluation, and adaptive management guided by the MEL framework.' },
              { phase: 'Reporting', num: '05', desc: 'Quarterly operational and annual impact reports to the Steering Committee and all stakeholders.' },
            ].map((phase) => (
              <div key={phase.num} className="bg-white/5 border border-white/10 rounded-lg p-6 text-center">>
                <div className="text-[#00d2ff] font-bold text-2xl font-display mb-2">{phase.num}</div>
                <h3 className="text-white font-bold text-sm mb-3">{phase.phase}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
