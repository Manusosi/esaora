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

// ISO 3166-1 numeric codes for our 4 countries
const MEMBER_COUNTRY_ISO: Record<string, CountryKey> = {
  '404': 'kenya',
  '834': 'tanzania',
  '508': 'mozambique',
  '450': 'madagascar',
};

// ISO numeric codes for African countries (to filter and show only Africa)
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

const COUNTRY_IMAGES: Record<CountryKey, string> = {
  kenya: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=500&q=75',
  tanzania: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=500&q=75',
  mozambique: 'https://images.unsplash.com/photo-1504184988885-f3c6e36f8db8?w=500&q=75',
  madagascar: 'https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=500&q=75',
};

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

export function CountryMapSection() {
  const { t } = useLanguage();
  const [activeCountry, setActiveCountry] = useState<CountryKey | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<CountryKey | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (panelRef.current && activeCountry) {
      gsap.fromTo(panelRef.current, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' });
    }
  }, [activeCountry]);

  const countries = t.map.countries;

  const getCountryFill = (isoNum: string) => {
    const key = MEMBER_COUNTRY_ISO[isoNum];
    if (key) {
      if (key === activeCountry) return '#0E7B74';
      if (key === hoveredCountry) return '#16A99F';
      return '#22C4A3';
    }
    return '#C8D8E4';
  };

  const getCountryStroke = (isoNum: string) => {
    const key = MEMBER_COUNTRY_ISO[isoNum];
    if (key === activeCountry) return '#0A5F5A';
    if (key) return '#0E7B74';
    return '#B0C4D4';
  };

  const orderedCountries: CountryKey[] = ['kenya', 'tanzania', 'mozambique', 'madagascar'];

  return (
    <section ref={sectionRef} className="bg-[#FAFAFA] py-20 px-4 relative overflow-hidden">
      {/* Subtle bg decoration */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <svg viewBox="0 0 1200 700" className="w-full h-full">
          <circle cx="600" cy="350" r="450" fill="none" stroke="#0E7B74" strokeWidth="0.5" />
          <circle cx="600" cy="350" r="280" fill="none" stroke="#0E7B74" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#0E7B74] uppercase tracking-widest text-sm font-semibold">{t.map.headline}</span>
          <h2 className="font-display text-section text-[#0A1628] mt-2">{t.map.headline}</h2>
          <p className="text-[#718096] mt-3 text-base max-w-xl mx-auto">{t.map.subheadline}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Map */}
          <div className="map-container flex-1 min-w-0 bg-[#EAF4FB] rounded-3xl overflow-hidden shadow-lg" style={{ minHeight: 420 }}>
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                center: [30, -5],
                scale: 480,
              }}
              style={{ width: '100%', height: '100%', minHeight: 420 }}
            >
              <ZoomableGroup zoom={1} minZoom={0.8} maxZoom={3}>
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
                            strokeWidth={isMember ? 1.5 : 0.5}
                            style={{
                              default: { outline: 'none', cursor: isMember ? 'pointer' : 'default' },
                              hover: { outline: 'none', fill: isMember ? '#16A99F' : '#BDD0DC', cursor: isMember ? 'pointer' : 'default' },
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

            {/* Map legend */}
            <div className="px-4 pb-3 flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#22C4A3]" />
                <span className="text-xs text-[#718096]">ESA-ORA Members</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-[#C8D8E4]" />
                <span className="text-xs text-[#718096]">Other African Nations</span>
              </div>
              <span className="text-xs text-[#718096] italic ml-auto">Click a country to learn more</span>
            </div>
          </div>

          {/* Right panel */}
          <div className="lg:w-80 flex-shrink-0 space-y-3">
            {/* Country list */}
            {orderedCountries.map((key) => {
              const country = countries[key];
              const isActive = activeCountry === key;
              return (
                <div key={key}>
                  <button
                    onClick={() => setActiveCountry(isActive ? null : key)}
                    className={`w-full text-left rounded-2xl overflow-hidden transition-all duration-200 ${
                      isActive
                        ? 'shadow-lg shadow-teal-100'
                        : 'hover:shadow-md shadow-sm'
                    }`}
                  >
                    <div className={`flex items-center gap-3 p-4 ${isActive ? 'bg-[#0E7B74]' : 'bg-white'}`}>
                      <span className="text-2xl">{COUNTRY_FLAGS[key]}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-bold text-sm ${isActive ? 'text-white' : 'text-[#0A1628]'}`}>{country.name}</h4>
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          {country.focus.slice(0, 2).map((f) => (
                            <span
                              key={f}
                              className={`text-xs px-1.5 py-0.5 rounded-full ${
                                isActive ? 'bg-white/20 text-white/80' : 'bg-[#0E7B74]/10 text-[#0E7B74]'
                              }`}
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                      <svg
                        viewBox="0 0 20 20"
                        className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${isActive ? 'text-white rotate-180' : 'text-gray-400'}`}
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>

                    {/* Expanded detail */}
                    {isActive && (
                      <div ref={panelRef} className="bg-white border-t border-[#0E7B74]/10">
                        <div className="h-28 overflow-hidden">
                          <img
                            src={COUNTRY_IMAGES[key]}
                            alt={country.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <p className="text-[#718096] text-xs leading-relaxed mb-3">{country.description}</p>
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {country.focus.map((f) => (
                              <span key={f} className="bg-[#0E7B74]/10 text-[#0E7B74] text-xs px-2 py-0.5 rounded-full font-medium">{f}</span>
                            ))}
                          </div>
                          <button className="flex items-center gap-1.5 text-[#0E7B74] text-xs font-semibold hover:gap-2.5 transition-all">
                            {t.map.visitCountry} <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              );
            })}

            {/* Indian Ocean note */}
            <div className="bg-[#1A6BA0]/8 rounded-xl p-3 text-center">
              <p className="text-[#1A6BA0] text-xs italic font-medium">
                Sharing the Indian Ocean coastline — one interconnected maritime region
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
