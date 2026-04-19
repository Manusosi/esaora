import { Link } from 'wouter';
import { PageHero } from '@/components/PageHero';
import { CountryMapSection } from '@/components/CountryMapSection';
import { CTASection } from '@/components/CTASection';
import { PartnerMarquee } from '@/components/PartnerMarquee';
import { usePublishedPrograms } from '@workspace/esaora-core/hooks/usePrograms';
import { Loader2, Calendar, Globe, ArrowRight } from 'lucide-react';

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

      {/* Live Programs / Projects */}
      <LiveProgramsSection />

      {/* Cross-cutting themes */}
      <section className="bg-[#F0F4F8] py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#00d2ff] uppercase tracking-widest text-xs font-bold block mb-3">Embedded Across All Pillars</span>
            <h2 className="font-display text-4xl text-brand-navy font-bold">Cross-Cutting Program Themes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {CROSS_CUTTING.map((item, i) => (
              <div key={i} className="bg-white rounded-[7px] p-7 border border-black/5 hover:-translate-y-1 transition-all">
                <div className="w-8 h-8 bg-brand-navy rounded-lg flex items-center justify-center text-[#00d2ff] text-xs font-bold mb-4">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-brand-navy font-bold text-base mb-3">{item.title}</h3>
                <p className="text-slate-700 text-sm leading-relaxed">{item.desc}</p>
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
              <div key={phase.num} className="bg-white/5 border border-white/10 rounded-[7px] p-6 text-center">
                <div className="text-[#00d2ff] font-bold text-2xl font-display mb-2">{phase.num}</div>
                <h3 className="text-white font-bold text-sm mb-3">{phase.phase}</h3>
                <p className="text-white/70 text-xs leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}

function LiveProgramsSection() {
  const { programs, loading } = usePublishedPrograms();

  if (loading) {
    return (
      <section className="bg-white py-12">
        <div className="flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-brand-navy/30" />
        </div>
      </section>
    );
  }

  if (programs.length === 0) return null;

  return (
    <section className="bg-white py-24 px-4 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-brand-cyan uppercase tracking-[0.2em] text-[10px] font-black block mb-3">Active Projects</span>
            <h2 className="font-display text-4xl text-brand-navy font-black">Featured Initiatives</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.slice(0, 6).map(p => {
             const fundingPercent = p.funding_goal > 0 ? Math.min(Math.round((p.funding_raised / p.funding_goal) * 100), 100) : 0;
             return (
                <Link key={p.id} href={`/programs/${p.slug}`}>
                  <div className="group bg-white rounded-[7px] border border-gray-100 overflow-hidden transition-all h-full flex flex-col hover:border-brand-cyan/50">
                    {p.cover_image_url && (
                      <div className="h-56 overflow-hidden bg-gray-100 relative">
                        <img src={p.cover_image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute top-4 left-4">
                            <span className="px-2.5 py-1 bg-brand-navy text-white text-[9px] font-black uppercase tracking-widest rounded-sm">
                                {p.pillar}
                            </span>
                        </div>
                      </div>
                    )}
                    <div className="p-7 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                           <Globe className="w-3 h-3 text-brand-cyan" /> {p.countries?.length || 0} Member Nations
                        </div>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-tighter ${
                          p.status === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                          p.status === 'completed' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-gray-50 text-slate-500 border border-gray-200'
                        }`}>{p.status}</span>
                      </div>
                      
                      <h3 className="font-display text-xl text-brand-navy font-black mb-3 group-hover:text-brand-cyan transition-colors leading-tight">{p.name}</h3>
                      <p className="text-slate-800 text-sm line-clamp-2 flex-1 mb-6 leading-relaxed">{p.summary}</p>
                      
                      {p.funding_goal > 0 && (
                        <div className="pt-5 border-t border-gray-50 mt-auto">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Funding Support</span>
                                <span className="text-[10px] font-black text-brand-navy">{fundingPercent}%</span>
                            </div>
                            <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-cyan transition-all duration-1000" style={{ width: `${fundingPercent}%` }} />
                            </div>
                        </div>
                      )}
                      
                      <div className="mt-6 flex items-center justify-between">
                         <div className="flex -space-x-2">
                             {p.countries?.slice(0, 3).map((c, i) => (
                                 <div key={i} className="w-6 h-6 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[8px] font-bold text-brand-navy" title={c}>
                                     {c.substring(0, 2).toUpperCase()}
                                 </div>
                             ))}
                         </div>
                         <span className="text-[10px] font-black text-brand-navy uppercase tracking-widest group-hover:text-brand-cyan transition-colors flex items-center gap-2">
                            Program Details <ArrowRight className="w-3 h-3" />
                         </span>
                      </div>
                    </div>
                  </div>
                </Link>
             );
          })}
        </div>
      </div>
    </section>
  );
}
