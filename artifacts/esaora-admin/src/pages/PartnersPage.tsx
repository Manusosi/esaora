import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Check, ExternalLink } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';
import { MembershipModal } from '@/components/MembershipModal';

const PARTNERS = [
  {
    name: 'Mariners for Action',
    logo: '/images/partners/Mariners-FA-official-logo.png',
    country: 'KENYA',
    desc: 'Leading marine conservation, climate-resilient ocean strategies, and community empowerment initiatives along the Kenyan coast.',
  },
  {
    name: 'Wavu',
    logo: '/images/partners/wavu.png',
    country: 'EAST AFRICA (KENYA)',
    desc: 'Connecting East African fish farmers with high-quality aquaculture inputs, financing options, and guaranteed offtake markets.',
  },
  {
    name: 'Blue Economy Organisation',
    logo: '/images/partners/BEO-Logo.png',
    country: 'TANZANIA',
    desc: 'Dedicated to restoring marine ecosystems while enhancing the livelihoods of coastal communities across Tanzania.',
  },
  {
    name: 'Harona',
    logo: '/images/partners/Harona.png',
    country: 'MADAGASCAR',
    desc: 'Protecting Madagascar\'s extraordinary world-class coral reefs and building critical environmental stewardship directly at the community level.',
  },
];

const MEMBERSHIP_BENEFITS = [
  'Formal seat on the Steering Committee (founding members) or observer status (associate members)',
  'Access to all 5 Technical Working Groups across WASH, Climate, Blue Economy, Public Health, and Research',
  'Regional visibility through ESA-ORA communications, publications, and events',
  'Co-branding on all joint initiatives, reports, and campaigns',
  'Shared regional knowledge base, monitoring frameworks, and data systems',
  'Priority access to regional funding opportunities coordinated through the Secretariat',
];

const ELIGIBILITY = [
  'Non-Governmental Organizations (NGOs)',
  'Community-Based Organizations (CBOs)',
  'Academic & Research Institutions',
  'Private Sector entities with aligned mission',
  'Government Ministries & Agencies',
  'Intergovernmental Organizations',
];

export default function PartnersPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main>
      <PageHero
        label="PARTNERS & MEMBERS"
        heading="The Alliance is Stronger Together"
        subheading="ESA-ORA is built on the principle that no single organization can solve the Indian Ocean's interconnected crises alone. We are stronger as one."
        imageSrc="/images/hero/hero-bg-10.jpg"
        breadcrumb="Partners"
      />

      {/* Partners Grid */}
      <section className="bg-[#f8fafc] py-24 px-4 border-b border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#00d2ff] uppercase tracking-widest text-xs font-bold block mb-3">Our Core Partners</span>
            <h2 className="font-display text-4xl text-brand-navy font-bold">Leading Organizations</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PARTNERS.map((p) => (
              <div key={p.name} className="bg-white rounded-xl border border-black/5 overflow-hidden flex flex-col group hover:shadow-2xl hover:shadow-brand-navy/5 transition-all duration-500 hover:-translate-y-1">
                <div className="h-48 bg-white flex items-center justify-center p-8 border-b border-black/5">
                  <img src={p.logo} alt={p.name} className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" />
                </div>
                <div className="p-8 flex-1 flex flex-col items-center text-center bg-[#F1F5F9]/30">
                  <span className="bg-[#CCF2F4] text-[#0097a6] text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg mb-4">
                    {p.country}
                  </span>
                  <h3 className="text-brand-navy font-bold text-lg mb-4 leading-tight">{p.name}</h3>
                  <p className="text-[#718096] text-sm leading-relaxed mb-8 flex-grow">
                    {p.desc}
                  </p>
                  <div className="w-full pt-6 border-t border-black/5">
                    <button className="flex items-center justify-center gap-2 text-brand-navy font-bold text-xs uppercase tracking-widest group-hover:text-[#00d2ff] transition-colors mx-auto">
                      VISIT WEBSITE <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Framework */}
      <section className="bg-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#00d2ff] uppercase tracking-widest text-xs font-bold block mb-3">Join ESA-ORA</span>
            <h2 className="font-display text-4xl text-brand-navy font-bold">Become a Member of the Alliance</h2>
            <p className="text-[#718096] mt-4 text-base max-w-2xl mx-auto">
              ESA-ORA welcomes organizations from across the Western Indian Ocean region who share our commitment to coastal resilience. Membership is open, transparent, and governed by the Alliance Charter.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">
            {[
              { step: '01', title: 'Eligibility', desc: 'Open to NGOs, CBOs, academic institutions, private sector, and government agencies operating in or supporting the ESA-ORA region.', items: ELIGIBILITY },
              { step: '02', title: 'Application', desc: 'Submit your application through our online form. The Secretariat conducts due diligence and presents to the Steering Committee for review.', items: ['Complete membership application form', 'Secretariat review & due diligence (2–3 weeks)', 'Steering Committee vote (2/3 majority required)', 'Formal charter signing & onboarding'] },
              { step: '03', title: 'Active Membership', desc: 'Approved members receive formal onboarding, access to all TWGs, and begin contributing to ESA-ORA\'s regional programs.', items: MEMBERSHIP_BENEFITS.slice(0, 4) },
            ].map((block) => (
              <div key={block.step} className="bg-[#F0F4F8] rounded-lg p-8 border border-black/5 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center text-[#00d2ff] text-sm font-bold">{block.step}</div>
                  <h3 className="text-brand-navy font-bold text-lg">{block.title}</h3>
                </div>
                <p className="text-[#718096] text-sm leading-relaxed mb-5">{block.desc}</p>
                <ul className="space-y-2.5">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[#4A5568] text-xs leading-relaxed">
                      <Check className="w-3.5 h-3.5 text-[#00d2ff] flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-[#00d2ff] hover:bg-[#00b8e6] text-brand-navy px-10 py-4 rounded-lg font-bold text-base transition-all hover:scale-105 shadow-lg shadow-[#00d2ff]/30"
            >
              Apply for Membership
            </button>
            <p className="text-[#718096] text-xs mt-4">Applications reviewed within 10 business days. Questions? Contact <a href="mailto:info@esaora.org" className="text-[#00d2ff] hover:underline">info@esaora.org</a></p>
          </div>
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="bg-brand-navy py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#00d2ff] uppercase tracking-widest text-xs font-bold bg-[#00d2ff]/10 px-4 py-1.5 rounded-lg inline-block mb-4">Why Join</span>
            <h2 className="font-display text-4xl text-white font-bold mt-4">Member Benefits</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MEMBERSHIP_BENEFITS.map((benefit, i) => (
              <div key={i} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-lg p-5">
                <div className="w-7 h-7 bg-[#00d2ff]/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#00d2ff]" />
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-[#00d2ff] hover:bg-[#00b8e6] text-brand-navy px-8 py-3.5 rounded-lg font-bold text-sm transition-all hover:scale-105"
            >
              Start Your Application
            </button>
          </div>
        </div>
      </section>

      {/* Funder CTA */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#00d2ff] uppercase tracking-widest text-xs font-bold block mb-4">Institutional Funders</span>
          <h2 className="font-display text-3xl text-brand-navy font-bold mb-5">Support the Alliance's Mission</h2>
          <p className="text-[#718096] text-lg leading-relaxed mb-8">
            ESA-ORA welcomes institutional funding partners who share our commitment to coastal resilience, ocean sustainability, and community wellbeing across East and Southern Africa. All funding is managed transparently through our Financial Management Committee.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-brand-navy text-white px-8 py-3.5 rounded-lg font-bold text-sm hover:bg-brand-navy/90 transition-all hover:gap-3">
            Discuss a Partnership <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <MembershipModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <CTASection />
    </main>
  );
}
