import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';

const FOCUS_AREAS = [
  { name: 'Coral Reef Protection', color: '#00d2ff', href: '/our-work/climate', desc: 'Madagascar\'s coral reefs are among the most biodiverse on Earth. ESA-ORA supports community-led protection programs, marine protected area governance, and reef monitoring networks that track bleaching events and recovery.' },
  { name: 'Eco-Tourism', color: '#22C55E', href: '/our-work/blue-economy', desc: 'Developing sustainable eco-tourism as a high-value, low-impact alternative livelihood that gives coastal communities an economic stake in protecting their extraordinary natural environments.' },
  { name: 'Environmental Stewardship', color: '#F59E0B', href: '/our-work/climate', desc: 'Building community and institutional capacity for environmental stewardship — integrating traditional ecological knowledge with scientific monitoring to protect Madagascar\'s unique and globally threatened biodiversity.' },
];

export default function MadagascarPage() {
  return (
    <main>
      <PageHero
        label="MEMBER NATION — MADAGASCAR"
        heading="Madagascar: The Island at the Heart of Indian Ocean Biodiversity"
        subheading="4,828 km of coastline, unparalleled biodiversity, and a founding seat in ESA-ORA — leading coral reef protection and environmental stewardship for the entire region."
        imageSrc="/images/hero/hero-bg-9.jpg"
        breadcrumb="Madagascar"
        breadcrumbParent={{ label: 'Countries', href: '/about' }}
      />

      <section className="bg-white py-16 px-4 border-b border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Indian Ocean Coastline', value: '4,828 km' },
              { label: 'Capital City', value: 'Antananarivo' },
              { label: 'Coastal Hub', value: 'Toamasina & Mahajanga' },
              { label: 'Alliance Status', value: 'Founding Member' },
            ].map((s) => (
              <div key={s.label} className="text-center py-6 px-4 bg-[#F0F4F8] rounded-lg border border-black/5">
                <p className="text-3xl font-bold font-display text-brand-navy mb-1">{s.value}</p>
                <p className="text-[#718096] text-sm font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F0F4F8] py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-[#00d2ff] uppercase tracking-widest text-xs font-bold block mb-4">ESA-ORA in Madagascar</span>
              <h2 className="font-display text-4xl text-brand-navy font-bold leading-tight mb-6">Madagascar's Role in the Alliance</h2>
              <p className="text-[#4A5568] text-lg leading-relaxed mb-5">
                Madagascar is one of the world's greatest biodiversity hotspots — and one of its most threatened. With the longest ESA-ORA coastline (4,828 km), unique endemic species, and coral reef systems of global importance, Madagascar anchors the Alliance's biodiversity conservation agenda.
              </p>
              <p className="text-[#4A5568] text-lg leading-relaxed">
                Madagascar leads regional environmental stewardship — bringing its extraordinary natural heritage and deep traditions of community-based resource management to the whole ESA-ORA network. Lessons from Madagascar's nature-based approaches are being scaled across all four nations.
              </p>
            </div>
            <div className="bg-brand-navy rounded-lg p-8">
              <p className="text-[#00d2ff] text-xs uppercase tracking-widest font-bold mb-4">Country Snapshot</p>
              <div className="space-y-4 text-white/70 text-sm">
                {[
                  { label: 'Primary Focus', value: 'Coral Reef Protection, Eco-Tourism, Stewardship' },
                  { label: 'Key Ecosystem', value: 'Coral reefs, endemic coastal forests' },
                  { label: 'Coastline', value: '4,828 km — largest in ESA-ORA' },
                  { label: 'Key Cities', value: 'Antananarivo, Toamasina, Mahajanga' },
                  { label: 'Alliance Role', value: 'Biodiversity conservation lead' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between border-b border-white/10 pb-3">
                    <span className="text-white/45 font-medium">{item.label}</span>
                    <span className="text-white font-semibold text-right max-w-[55%]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#00d2ff] uppercase tracking-widest text-xs font-bold block mb-3">Program Focus</span>
            <h2 className="font-display text-4xl text-brand-navy font-bold">Madagascar's ESA-ORA Focus Areas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FOCUS_AREAS.map((area) => (
              <Link key={area.name} href={area.href} className="group block bg-[#F0F4F8] rounded-lg p-7 border border-black/5 hover:-translate-y-1 transition-all">
                <h3 className="text-brand-navy font-bold text-xl mb-4 group-hover:text-[#00d2ff] transition-colors">{area.name}</h3>
                <p className="text-[#718096] text-sm leading-relaxed mb-5">{area.desc}</p>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00d2ff] group-hover:gap-3 transition-all">
                  <span>Learn More</span><ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F0F4F8] py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-display text-3xl text-brand-navy font-bold mb-4">Explore All ESA-ORA Member Nations</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {[{ name: 'Kenya', href: '/countries/kenya' }, { name: 'Tanzania', href: '/countries/tanzania' }, { name: 'Mozambique', href: '/countries/mozambique' }].map((c) => (
              <Link key={c.name} href={c.href} className="bg-white border border-brand-navy/10 hover:border-[#00d2ff]/40 text-brand-navy hover:text-[#00d2ff] px-6 py-2.5 rounded-lg text-sm font-semibold transition-all">
                {c.name} <ArrowRight className="inline w-3.5 h-3.5 ml-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
