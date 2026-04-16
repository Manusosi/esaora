import { useLanguage } from '@/i18n/LanguageContext';
import { ArrowRight } from 'lucide-react';

const PARTNER_LOGOS = [
  { name: 'UNEP', color: '#1A6BA0' },
  { name: 'WWF', color: '#2D7A4E' },
  { name: 'IUCN', color: '#00d2ff' },
  { name: 'GEF', color: '#1A6BA0' },
  { name: 'UNDP', color: '#000080' },
  { name: 'GCF', color: '#2D7A4E' },
  { name: 'SWIOFISH', color: '#D97706' },
  { name: 'WIOMSA', color: '#00d2ff' },
];

const PARTNER_LOGOS_2 = [
  { name: 'KEMFRI', color: '#00d2ff' },
  { name: 'TAFIRI', color: '#1A6BA0' },
  { name: 'MIMAPO', color: '#2D7A4E' },
  { name: 'WCS', color: '#D97706' },
  { name: 'CMS', color: '#000080' },
  { name: 'SIDA', color: '#1A6BA0' },
  { name: 'AFD', color: '#00d2ff' },
  { name: 'KOICA', color: '#2D7A4E' },
];

function LogoPlaceholder({ name, color }: { name: string; color: string }) {
  return (
    <div
      className="flex-shrink-0 h-12 px-5 flex items-center justify-center rounded-lg border border-gray-200 grayscale hover:grayscale-0 transition-all duration-300 hover:shadow-sm cursor-pointer"
      style={{ minWidth: 100 }}
      title={name}
    >
      <span className="font-bold text-sm tracking-wider" style={{ color: color }}>{name}</span>
    </div>
  );
}

export function PartnerMarquee() {
  const { t } = useLanguage();

  return (
    <section className="bg-[#FAFAFA] py-14 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-6">
          <span className="text-[#00d2ff] uppercase tracking-widest text-sm font-semibold">{t.partners.headline}</span>
          <p className="text-[#718096] text-sm mt-1">{t.partners.subheadline}</p>
        </div>
      </div>

      {/* Row 1 - Forward */}
      <div className="overflow-hidden mb-3">
        <div className="marquee-track flex gap-4 w-max">
          {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((p, i) => (
            <LogoPlaceholder key={i} name={p.name} color={p.color} />
          ))}
        </div>
      </div>

      {/* Row 2 - Reverse */}
      <div className="overflow-hidden">
        <div className="marquee-track-reverse flex gap-4 w-max">
          {[...PARTNER_LOGOS_2, ...PARTNER_LOGOS_2].map((p, i) => (
            <LogoPlaceholder key={i} name={p.name} color={p.color} />
          ))}
        </div>
      </div>

      <div className="text-center mt-8">
        <button className="inline-flex items-center gap-2 text-[#00d2ff] font-semibold text-sm hover:gap-3 transition-all hover:text-[#000080]">
          {t.partners.becomeMember} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
