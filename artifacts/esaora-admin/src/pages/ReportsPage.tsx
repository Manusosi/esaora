import { useState } from 'react';
import { ArrowRight, Download, FileText, BookOpen } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';

const REPORT_CATEGORIES = ['All', 'Charter & Policy', 'Program Reports', 'Research', 'Financial'];

const REPORTS = [
  {
    id: 1,
    category: 'Charter & Policy',
    title: 'ESA-ORA Regional Consortium Charter 2025–2030',
    date: 'April 2025',
    type: 'Governing Document',
    desc: 'The founding charter of the East & Southern Africa Ocean Resilience Alliance. Defines purpose, governance structure, membership rules, financial management framework, and charter duration.',
    pages: 32,
    highlight: true,
    color: '#00d2ff',
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    id: 2,
    category: 'Program Reports',
    title: 'ESA-ORA 2025 Inaugural Annual Report',
    date: 'December 2025',
    type: 'Annual Report',
    desc: 'A comprehensive account of ESA-ORA\'s first year of operations — program activities across all four nations, governance milestones, financial summary, and strategic outlook for 2026.',
    pages: 48,
    highlight: false,
    color: '#22C55E',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: 3,
    category: 'Research',
    title: 'Regional Baseline Assessment: Coastal Resilience in East & Southern Africa',
    date: 'August 2025',
    type: 'Research Report',
    desc: 'Cross-country data on WASH coverage, ecosystem health, fisheries status, climate vulnerability, and public health indicators across all four ESA-ORA member nations.',
    pages: 84,
    highlight: false,
    color: '#0097a6',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: 4,
    category: 'Program Reports',
    title: 'WASH Program Status Report — Q3 2025',
    date: 'September 2025',
    type: 'Quarterly Report',
    desc: 'Progress update from the WASH Technical Working Group covering water point rehabilitation, sanitation activities, and behavior change campaigns across all four member nations.',
    pages: 22,
    highlight: false,
    color: '#0097a6',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: 5,
    category: 'Research',
    title: 'Indian Ocean Climate Vulnerability Assessment 2025',
    date: 'October 2025',
    type: 'Research Report',
    desc: 'Assessment of climate vulnerability across ESA-ORA member nations, documenting sea-level rise projections, storm surge frequency, and freshwater security risks to 2030.',
    pages: 62,
    highlight: false,
    color: '#22C55E',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: 6,
    category: 'Financial',
    title: 'ESA-ORA 2025 Audited Financial Statements',
    date: 'January 2026',
    type: 'Financial Report',
    desc: 'Independently audited financial statements covering ESA-ORA\'s inaugural fiscal year. Prepared in accordance with International Financial Reporting Standards.',
    pages: 18,
    highlight: false,
    color: '#F59E0B',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: 7,
    category: 'Charter & Policy',
    title: 'ESA-ORA MEL Framework 2025–2030',
    date: 'July 2025',
    type: 'Framework Document',
    desc: 'The Monitoring, Evaluation and Learning framework defining indicators, data collection methodologies, and learning systems across all four thematic pillars and member nations.',
    pages: 36,
    highlight: false,
    color: '#00d2ff',
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    id: 8,
    category: 'Research',
    title: 'Blue Economy Opportunity Mapping — Western Indian Ocean',
    date: 'November 2025',
    type: 'Research Report',
    desc: 'Analysis of sustainable blue economy opportunities across all four member nations, identifying high-potential sectors, community-led enterprise models, and investment gaps.',
    pages: 56,
    highlight: false,
    color: '#00d2ff',
    icon: <FileText className="w-5 h-5" />,
  },
];

export default function ReportsPage() {
  return (
    <main>
      <PageHero
        label="REPORTS & PUBLICATIONS"
        heading="Knowledge, Transparency, and Evidence"
        subheading="ESA-ORA publishes program reports, research findings, financial statements, and policy documents to ensure full transparency and drive evidence-based practice across the region."
        imageSrc="/images/hero/hero-bg-5.jpg"
        breadcrumb="Reports & Publications"
      />

      <section className="bg-white py-24 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-[#F0F4F8] rounded-lg flex items-center justify-center mb-6">
            <FileText className="w-10 h-10 text-brand-navy opacity-20" />
          </div>
          <h2 className="font-display text-4xl text-brand-navy font-bold mb-4">Reports & Publications</h2>
          <p className="text-[#718096] text-lg max-w-xl mx-auto mb-8">
            No reports are available for the public currently, please check back later.
          </p>
          <div className="h-px w-24 bg-brand-navy/10 mb-8" />
        </div>
      </section>

      {/* Open Access Statement */}
      <section className="bg-[#F0F4F8] py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-12 border border-black/5 text-center shadow-sm">
            <div className="w-14 h-14 bg-[#00d2ff]/10 rounded-lg flex items-center justify-center mx-auto mb-5">
              <BookOpen className="w-7 h-7 text-[#00d2ff]" />
            </div>
            <h2 className="font-display text-3xl text-brand-navy font-bold mb-4">Open Access Policy</h2>
            <p className="text-[#4A5568] text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              ESA-ORA is committed to open access knowledge sharing. All program reports, research publications, and policy documents produced by the Alliance are freely available for download. We believe that evidence must be accessible to drive better decisions across the region.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="mailto:info@esaora.org" className="inline-flex items-center gap-2 bg-brand-navy text-white px-7 py-3 rounded-lg font-bold text-sm hover:bg-brand-navy/90 transition-all hover:gap-3">
                Request a Custom Report <ArrowRight className="w-4 h-4" />
              </a>
              <a href="mailto:info@esaora.org" className="inline-flex items-center gap-2 border-2 border-brand-navy/15 text-brand-navy px-7 py-3 rounded-lg font-bold text-sm hover:border-brand-navy/40 transition-all">
                Submit Research Proposal
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
