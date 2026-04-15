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

const COUNTRY_FLAGS: Record<CountryKey, string> = {
  kenya: '🇰🇪',
  tanzania: '🇹🇿',
  mozambique: '🇲🇿',
  madagascar: '🇲🇬',
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
      { opacity: 0, scale: 0.97 },
      {
        opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      }
    );
  }, []);

  const countries = t.map.countries;

  const getCountryFill = (isoNum: string) => {
    const key = MEMBER_COUNTRY_ISO[isoNum];
    if (key) {
      if (key === activeCountry) return '#0A5F5A';
      if (key === hoveredCountry) return '#16A99F';
      return '#1DB89A';
    }
    return '#C8D8E4';
  };

  const getCountryStroke = (isoNum: string) => {
    const key = MEMBER_COUNTRY_ISO[isoNum];
    if (key === activeCountry) return '#08403D';
    if (key) return '#0E7B74';
    return '#AABFCE';
  };

  const orderedCountries: CountryKey[] = ['kenya', 'tanzania', 'mozambique', 'madagascar'];

  return (
    <section ref={sectionRef} className="bg-[#F5F8FA] py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg viewBox="0 0 1200 700" className="w-full h-full">
          <circle cx="600" cy="350" r="500" fill="none" stroke="#0E7B74" strokeWidth="0.5" />
          <circle cx="600" cy="350" r="300" fill="none" stroke="#0E7B74" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#0E7B74] uppercase tracking-widest text-sm font-semibold">Our Region</span>
          <h2 className="font-display text-section text-[#0A1628] mt-2">{t.map.headline}</h2>
          <p className="text-[#718096] mt-3 text-base max-w-xl mx-auto">{t.map.subheadline}</p>
        </div>

        {/* 60/40 layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">

          {/* MAP — 60% */}
          <div className="map-container lg:w-[60%] flex-shrink-0 bg-[#E2EFF6] rounded-3xl overflow-hidden shadow-lg flex flex-col" style={{ minHeight: 480 }}>
            <div className="flex-1">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ center: [28, -5], scale: 440 }}
                style={{ width: '100%', height: '100%', minHeight: 440 }}
              >
                <ZoomableGroup zoom={1} minZoom={0.8} maxZoom={4}>
                  <Geographies geography={GEO_URL}>
                    {({ geographies }) =>
                      geographies
                        .filter((geo) => AFRICA_ISO_NUMERIC.has(geo.id))
                        .map((geo) => {
                          const isoNum = String(geo.id);
                          const memberKey = MEMBER_COUNTRY_ISO[isoNum];
                          const isMember = Boolean(memberKey);
                          return (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              fill={getCountryFill(isoNum)}
                              stroke={getCountryStroke(isoNum)}
                              strokeWidth={isMember ? 1.5 : 0.4}
                              style={{
                                default: { outline: 'none', cursor: isMember ? 'pointer' : 'default' },
                                hover: { outline: 'none', fill: isMember ? '#16A99F' : '#B8CDD9', cursor: isMember ? 'pointer' : 'default' },
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
                </ZoomableGroup>
              </ComposableMap>
            </div>

            {/* Legend */}
            <div className="px-5 pb-4 pt-1 flex items-center gap-5 flex-wrap border-t border-black/5">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#1DB89A]" />
                <span className="text-xs text-[#5A7080]">ESA-ORA Members</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#C8D8E4]" />
                <span className="text-xs text-[#5A7080]">Other African Nations</span>
              </div>
              <span className="text-xs text-[#5A7080] italic ml-auto hidden sm:inline">
                Click a highlighted country to learn more
              </span>
            </div>
          </div>

          {/* PANEL — 40% */}
          <div className="lg:w-[40%] flex-shrink-0 flex flex-col gap-3">
            {orderedCountries.map((key) => {
              const country = countries[key];
              const isActive = activeCountry === key;
              return (
                <div
                  key={key}
                  className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                    isActive ? 'shadow-xl shadow-teal-100' : 'shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Header row — always visible */}
                  <button
                    onClick={() => setActiveCountry(isActive ? null : key)}
                    className={`w-full text-left flex items-center gap-4 px-4 py-3.5 transition-colors duration-200 ${
                      isActive ? 'bg-[#0E7B74]' : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    {/* Flag emoji — large */}
                    <span className="text-3xl leading-none flex-shrink-0" role="img" aria-label={country.name}>
                      {COUNTRY_FLAGS[key]}
                    </span>

                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-sm ${isActive ? 'text-white' : 'text-[#0A1628]'}`}>
                        {country.name}
                      </p>
                      <p className={`text-xs mt-0.5 ${isActive ? 'text-white/70' : 'text-[#718096]'}`}>
                        {COUNTRY_COASTLINE[key]}
                      </p>
                    </div>

                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                        isActive ? 'rotate-180 text-white/60' : 'text-gray-300'
                      }`}
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </button>

                  {/* Expanded detail panel */}
                  {isActive && (
                    <div className="bg-white">
                      {/* Country image */}
                      <div className="h-32 overflow-hidden">
                        <img
                          src={COUNTRY_IMAGES[key]}
                          alt={country.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <p className="text-[#4A5568] text-sm leading-relaxed mb-3">
                          {country.description}
                        </p>

                        {/* Focus tags — only here, not in header */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {country.focus.map((f) => (
                            <span
                              key={f}
                              className="bg-[#0E7B74]/10 text-[#0E7B74] text-xs px-2.5 py-1 rounded-full font-medium"
                            >
                              {f}
                            </span>
                          ))}
                        </div>

                        <button className="flex items-center gap-1.5 text-[#0E7B74] text-xs font-semibold hover:gap-3 transition-all duration-200">
                          {t.map.visitCountry} <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Indian ocean note */}
            <div className="bg-[#1A6BA0]/8 rounded-xl p-3 text-center mt-auto">
              <p className="text-[#1A6BA0] text-xs italic">
                Sharing the Indian Ocean coastline — one interconnected maritime region
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
