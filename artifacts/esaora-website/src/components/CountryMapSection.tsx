import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';

gsap.registerPlugin(ScrollTrigger);

type CountryKey = 'kenya' | 'tanzania' | 'mozambique' | 'madagascar';

const MEMBER_COUNTRY_ISO: Record<string, CountryKey> = {
  '404': 'kenya',
  '834': 'tanzania',
  '508': 'mozambique',
  '450': 'madagascar',
};

const AFRICA_ISO_NUMERIC = new Set([
  '012','024','072','086','108','120','132','140','148','174',
  '175','178','180','204','218','226','231','232','262','266',
  '270','288','324','384','404','426','430','434','450','454',
  '466','478','480','508','516','562','566','624','638','646',
  '686','694','706','710','716','728','729','748','768','788',
  '800','818','834','854','894',
]);

const FLAG_CODES: Record<CountryKey, string> = {
  kenya: 'ke',
  tanzania: 'tz',
  mozambique: 'mz',
  madagascar: 'mg',
};

const COUNTRY_COASTLINE: Record<CountryKey, string> = {
  kenya: '536 km coastline',
  tanzania: '1,424 km coastline',
  mozambique: '2,470 km coastline',
  madagascar: '4,828 km coastline',
};

const COUNTRY_IMAGES: Record<CountryKey, string> = {
  kenya: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80',
  tanzania: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80',
  mozambique: 'https://images.unsplash.com/photo-1504184988885-f3c6e36f8db8?w=600&q=80',
  madagascar: 'https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=600&q=80',
};

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

export function CountryMapSection() {
  const { t } = useLanguage();
  const [activeCountry, setActiveCountry] = useState<CountryKey | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<CountryKey | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.querySelector('.map-container'),
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      }
    );
  }, []);

  const countries = t.map.countries;

  const getCountryFill = (isoNum: string) => {
    const key = MEMBER_COUNTRY_ISO[isoNum];
    if (key) {
      if (key === activeCountry) return '#000080'; // Navy for active
      if (key === hoveredCountry) return '#00b8e6'; // Dark Cyan for hover
      return '#00d2ff'; // Brand Cyan for members
    }
    return '#E2E8F0';
  };

  const getCountryStroke = (isoNum: string) => {
    const key = MEMBER_COUNTRY_ISO[isoNum];
    if (key === activeCountry) return '#00d2ff';
    if (key) return '#000080';
    return '#CBD5E1';
  };

  const orderedCountries: CountryKey[] = ['kenya', 'tanzania', 'mozambique', 'madagascar'];

  return (
    <section ref={sectionRef} className="bg-[#F5F8FA] py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg viewBox="0 0 1200 700" className="w-full h-full">
          <circle cx="600" cy="350" r="500" fill="none" stroke="#00d2ff" strokeWidth="0.5" />
          <circle cx="600" cy="350" r="300" fill="none" stroke="#00d2ff" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#00d2ff] uppercase tracking-widest text-xs font-bold bg-[#00d2ff]/10 px-4 py-1.5 rounded-full">
            Regional Presence
          </span>
          <h2 className="font-display text-4xl lg:text-5xl text-[#000080] mt-6 font-bold">{t.map.headline}</h2>
          <p className="text-[#5A7080] mt-4 text-lg max-w-4xl mx-auto">{t.map.subheadline}</p>
        </div>

        {/* 60/40 layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">

          {/* MAP — 60% */}
          <div className="map-container lg:w-[60%] flex-shrink-0 bg-[#E2EFF6]/50 rounded-[8px] border border-black/5 overflow-hidden flex flex-col" style={{ minHeight: 520 }}>
            <div className="flex-1 relative">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ center: [37, -15], scale: 650 }}
                style={{ width: '100%', height: '100%', minHeight: 480 }}
              >
                <Geographies geography={GEO_URL}>
                  {({ geographies }: { geographies: any[] }) =>
                    geographies
                      .filter((geo: any) => AFRICA_ISO_NUMERIC.has(geo.id))
                      .map((geo: any) => {
                        const isoNum = String(geo.id);
                        const memberKey = MEMBER_COUNTRY_ISO[isoNum];
                        const isMember = Boolean(memberKey);
                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={getCountryFill(isoNum)}
                            stroke={getCountryStroke(isoNum)}
                            strokeWidth={isMember ? 1.5 : 0.6}
                            style={{
                              default: { outline: 'none', cursor: isMember ? 'pointer' : 'default' },
                              hover: { outline: 'none', fill: isMember ? '#00b8e6' : '#CBD5E1', cursor: isMember ? 'pointer' : 'default' },
                              pressed: { outline: 'none' },
                            }}
                            onMouseEnter={() => { if (memberKey) setHoveredCountry(memberKey); }}
                            onMouseLeave={() => setHoveredCountry(null)}
                            onClick={() => {
                              if (memberKey) setActiveCountry(activeCountry === memberKey ? null : memberKey);
                            }}
                          />
                        );
                      })
                  }
                </Geographies>
              </ComposableMap>
            </div>

            {/* Legend */}
            <div className="px-8 pb-6 pt-2 flex items-center gap-6 flex-wrap border-t border-black/5 bg-white/30 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[#00d2ff] shadow-sm shadow-[#00d2ff]/40" />
                <span className="text-xs font-bold text-[#000080] uppercase tracking-widest">ESA-ORA Members</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[#C8D8E4] border border-black/5" />
                <span className="text-xs font-bold text-[#000080]/70 uppercase tracking-widest">African Nations</span>
              </div>
            </div>
          </div>

          {/* PANEL — 40% */}
          <div className="lg:w-[40%] flex-shrink-0 flex flex-col">
            <div className="bg-white/40 rounded-[8px] border border-black/5 overflow-hidden">
              {orderedCountries.map((key, index) => {
                const country = countries[key];
                const isActive = activeCountry === key;
                return (
                  <div
                    key={key}
                    className={`transition-all duration-300 border-b border-black/5 last:border-0 ${
                      isActive ? 'bg-white' : 'hover:bg-white/30'
                    }`}
                  >
                    <button
                      onClick={() => setActiveCountry(isActive ? null : key)}
                      className={`w-full text-left flex items-center gap-5 px-6 py-5 relative group`}
                    >
                      {/* Active Indicator Line */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${
                        isActive ? 'bg-[#00d2ff]' : 'bg-transparent'
                      }`} />

                      {/* Flag - Clean SVG Image */}
                      <div className="w-12 h-8 rounded-md overflow-hidden bg-gray-100 border border-black/5 flex-shrink-0 shadow-sm">
                        <img 
                          src={`https://flagcdn.com/w80/${FLAG_CODES[key]}.png`}
                          alt={country.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className={`font-display font-bold text-lg leading-none ${isActive ? 'text-[#000080]' : 'text-[#000080]/80'}`}>
                          {country.name}
                        </p>
                        <p className={`text-xs mt-1 font-medium tracking-wide uppercase ${isActive ? 'text-[#00d2ff]' : 'text-[#718096]'}`}>
                          {COUNTRY_COASTLINE[key]}
                        </p>
                      </div>

                      <div className={`transition-transform duration-300 ${isActive ? 'rotate-180 text-[#00d2ff]' : 'text-gray-300'}`}>
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </button>

                    {/* Detailed Info (Seamless list expansion) */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isActive ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-6 pb-6 pt-1">
                        <p className="text-[#5A7080] text-sm leading-relaxed mb-5 font-normal">
                          {country.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {country.focus.map((f) => (
                            <span
                              key={f}
                              className="bg-[#00d2ff]/5 text-[#00d2ff] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-[#00d2ff]/10"
                            >
                              {f}
                            </span>
                          ))}
                        </div>

                        <button className="w-full bg-[#000080] text-white py-3 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-[#000080]/90 transition-all flex items-center justify-center gap-2">
                          {t.map.visitCountry} <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Indian ocean note - Seamless integration */}
            <div className="p-4 flex items-center justify-center gap-3">
              <div className="h-px flex-1 bg-black/5" />
              <p className="text-[#1A6BA0] text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap opacity-60">
                Shared Maritime Heritage
              </p>
              <div className="h-px flex-1 bg-black/5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
