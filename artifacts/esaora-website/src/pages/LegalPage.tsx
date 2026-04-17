import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';

export default function LegalPage({ title, type }: { title: string; type: string }) {
  return (
    <main>
      <PageHero
        label="LEGAL & COMPLIANCE"
        heading={title}
        subheading={`Official policies and legal frameworks governing the ESA-ORA Regional Consortium and its digital platforms.`}
        imageSrc="/images/hero/hero-bg-12.jpg"
        breadcrumb={title}
      />

      <section className="bg-white py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-slate max-w-none">
            <div className="bg-[#f8fafc] border border-black/5 rounded-lg p-12 text-center">
              <div className="w-16 h-16 bg-brand-navy/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-brand-navy opacity-30" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h2 className="font-display text-2xl text-brand-navy font-bold mb-4">{title}</h2>
              <p className="text-[#718096] text-lg leading-relaxed mb-0">
                The full {title} for the ESA-ORA Alliance is currently being finalized by our Legal and Governance Committee. 
                This document will define the protocols and protections for all stakeholders across our member nations.
              </p>
              <div className="mt-8 pt-8 border-t border-black/5 text-[#A0AEC0] text-sm italic">
                Last Updated: April 2025
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
