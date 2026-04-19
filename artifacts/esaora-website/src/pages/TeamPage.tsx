import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';
import { usePublishedTeam } from '@workspace/esaora-core/hooks/useData';
import { Mail, Plus, User, ArrowUpRight } from 'lucide-react';
import { LinkedInIcon } from '@/components/icons/LinkedInIcon';

export default function TeamPage() {
  const { members, loading } = usePublishedTeam();

  // Grouping logic for editorial structure
  const groupedMembers = useMemo(() => {
    return {
      leadership: members.filter(m => ['leadership', 'board'].includes(m.role.toLowerCase())),
      secretariat: members.filter(m => !['leadership', 'board'].includes(m.role.toLowerCase()))
    };
  }, [members]);

  // Slug helper
  const getSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

  return (
    <main className="bg-white">
      <PageHero
        label="GOVERNANCE & SECRETARIAT"
        heading="Our Team"
        subheading="A multidisciplinary alliance dedicated to the long-term resilience of the Western Indian Ocean."
        imageSrc="/images/hero/hero-bg-2.jpg"
        breadcrumb="Team"
      />
      
      {/* Introduction */}
      <section className="py-24 px-4 bg-[#FAFAFA] border-b border-gray-100">
          <div className="max-w-4xl mx-auto text-center">
              <span className="text-[#00d2ff] text-[10px] font-black uppercase tracking-[0.4em] block mb-6">Consortium Registry</span>
              <h2 className="font-display text-4xl md:text-5xl text-brand-navy font-bold leading-tight mb-8">
                  The leadership and technical experts driving <span className="text-brand-cyan italic">regional impact.</span>
              </h2>
              <div className="w-16 h-1 bg-brand-cyan mx-auto rounded-full" />
          </div>
      </section>

      {/* Leadership Section */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
              <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] block mb-4">Governance</span>
              <h3 className="font-display text-4xl text-brand-navy font-bold">Board of Directors</h3>
          </div>

          {loading ? (
             <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-10 h-10 border-2 border-gray-100 border-t-brand-cyan rounded-full animate-spin" />
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
              {groupedMembers.leadership.map((member) => (
                <div key={member.id} className="group flex flex-col items-center text-center">
                   {/* Portrait with Hover Overlay */}
                   <Link href={`/team/${getSlug(member.name)}-bio`}>
                     <div className="relative aspect-square w-full rounded-t-[7px] overflow-hidden bg-gray-50 cursor-pointer border-x border-t border-gray-100 transition-all group-hover:border-brand-cyan/30 shadow-none">
                        {member.photo_url ? (
                            <img 
                                src={member.photo_url} 
                                alt={member.name} 
                                className="w-full h-full object-cover grayscale-[0.2] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-brand-navy/5">
                                <User className="w-16 h-16 text-brand-navy/10" />
                            </div>
                        )}
                        
                        {/* Hover Overlay Icon */}
                        <div className="absolute inset-0 bg-brand-navy/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
                            <div className="bg-[#00d2ff] p-4 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <ArrowUpRight className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                   </Link>

                   <div className="w-full bg-[#fcfcfa] p-8 rounded-b-[7px] border-x border-b border-gray-100 flex-1 flex flex-col justify-between">
                        <div>
                            <Link href={`/team/${getSlug(member.name)}-bio`}>
                               <h4 className="font-display text-2xl text-brand-navy font-bold leading-tight cursor-pointer hover:text-brand-cyan transition-colors">
                                   {member.name}
                               </h4>
                            </Link>
                            <p className="text-brand-cyan text-[10px] font-black uppercase tracking-[0.3em] mt-3">
                                {member.role}
                            </p>
                            <p className="text-gray-500 font-medium text-sm mt-3 max-w-[280px] mx-auto italic leading-relaxed">
                                {member.title}
                            </p>
                        </div>

                        {/* Centered Social Media - Official Colors */}
                        <div className="mt-8 flex justify-center items-center gap-6">
                             {member.linkedin_url && (
                                <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                                    <LinkedInIcon size={18} />
                                </a>
                             )}
                             {member.email && (
                                <a href={`mailto:${member.email}`} className="text-[#00d2ff] hover:text-brand-navy transition-colors">
                                    <Mail size={18} />
                                </a>
                             )}
                        </div>
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Secretariat Section - Applying same centered design */}
      <section className="py-32 px-4 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
              <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] block mb-4">Implementation</span>
              <h3 className="font-display text-4xl text-brand-navy font-bold">Regional Secretariat</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
              {groupedMembers.secretariat.map((member) => (
                <div key={member.id} className="group flex flex-col items-center text-center">
                     <Link href={`/team/${getSlug(member.name)}-bio`}>
                        <div className="relative aspect-square w-full rounded-t-[7px] overflow-hidden bg-gray-50 cursor-pointer border-x border-t border-gray-100 transition-all group-hover:border-brand-cyan/30 shadow-none">
                            {member.photo_url ? (
                                <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover grayscale-[0.3] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center"><User className="w-12 h-12 text-gray-200" /></div>
                            )}

                            {/* Hover Overlay Icon */}
                            <div className="absolute inset-0 bg-brand-navy/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center overflow-hidden">
                                <div className="bg-[#00d2ff] p-4 rounded-full shadow-2xl transform translate-y-10 group-hover:translate-y-0 transition-all duration-300">
                                    <Plus className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                     </Link>

                     <div className="w-full bg-white p-8 rounded-b-[7px] border-x border-b border-gray-100 flex-1 flex flex-col justify-between">
                        <div>
                            <Link href={`/team/${getSlug(member.name)}-bio`}>
                               <h5 className="font-display text-xl text-brand-navy font-bold cursor-pointer hover:text-brand-cyan transition-colors">
                                   {member.name}
                               </h5>
                            </Link>
                            <p className="text-brand-cyan text-[10px] font-black uppercase tracking-[0.2em] mt-2">
                                {member.role}
                            </p>
                            <p className="text-gray-400 text-xs font-bold leading-tight mt-3 italic">{member.title}</p>
                        </div>

                        {/* Centered Social Media - Official Colors */}
                        <div className="mt-8 flex justify-center items-center gap-6">
                             {member.linkedin_url && (
                                 <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                                     <LinkedInIcon size={16} />
                                 </a>
                             )}
                             {member.email && (
                                 <a href={`mailto:${member.email}`} className="text-[#00d2ff] hover:text-brand-navy transition-colors">
                                     <Mail size={16} />
                                 </a>
                             )}
                        </div>
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
