import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

type CountryKey = 'kenya' | 'tanzania' | 'mozambique' | 'madagascar';

const COUNTRY_FLAGS: Record<CountryKey, string> = {
  kenya: '🇰🇪',
  tanzania: '🇹🇿',
  mozambique: '🇲🇿',
  madagascar: '🇲🇬',
};

const COUNTRY_IMAGES: Record<CountryKey, string> = {
  kenya: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80',
  tanzania: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80',
  mozambique: 'https://images.unsplash.com/photo-1546016366-bf061374d54d?w=600&q=80',
  madagascar: 'https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=600&q=80',
};

// Simplified SVG paths for East/Southern Africa countries
// These represent the rough outlines of the four countries
const COUNTRY_SVG_PATHS: Record<CountryKey, { d: string; cx: number; cy: number }> = {
  kenya: {
    d: "M170,80 L195,75 L215,85 L220,105 L205,120 L200,135 L185,140 L175,130 L160,125 L155,110 L160,95 Z",
    cx: 188, cy: 108,
  },
  tanzania: {
    d: "M175,135 L185,140 L200,135 L210,145 L215,160 L210,180 L205,195 L185,200 L170,195 L160,180 L158,165 L162,150 Z",
    cx: 186, cy: 167,
  },
  mozambique: {
    d: "M185,205 L200,200 L215,205 L220,220 L218,240 L215,260 L210,278 L200,290 L188,285 L180,268 L178,248 L180,228 Z",
    cx: 199, cy: 247,
  },
  madagascar: {
    d: "M255,170 L268,165 L278,175 L280,195 L275,215 L268,230 L258,235 L250,228 L248,210 L248,190 L250,175 Z",
    cx: 264, cy: 200,
  },
};

const CONNECTOR_LINES = [
  { from: { x: 188, y: 108 }, to: { x: 186, y: 167 } },
  { from: { x: 186, y: 167 }, to: { x: 199, y: 247 } },
  { from: { x: 199, y: 247 }, to: { x: 264, y: 200 } },
  { from: { x: 188, y: 108 }, to: { x: 264, y: 200 } },
];

export function CountryMapSection() {
  const { t } = useLanguage();
  const [activeCountry, setActiveCountry] = useState<CountryKey | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<SVGSVGElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = cardsRef.current?.children ? Array.from(cardsRef.current.children) : [];
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
      }
    );
  }, []);

  const countries = t.map.countries;

  return (
    <section ref={sectionRef} className="bg-[#FAFAFA] py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <svg viewBox="0 0 800 600" className="w-full h-full">
          <circle cx="400" cy="300" r="300" fill="none" stroke="#0E7B74" strokeWidth="1" />
          <circle cx="400" cy="300" r="200" fill="none" stroke="#0E7B74" strokeWidth="1" />
          <circle cx="400" cy="300" r="100" fill="none" stroke="#0E7B74" strokeWidth="1" />
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
          {/* SVG Map */}
          <div className="flex-shrink-0 mx-auto relative" style={{ width: 340, height: 380 }}>
            <svg ref={mapRef} width="340" height="380" viewBox="100 50 250 320" className="drop-shadow-xl">
              {/* Ocean background */}
              <rect x="100" y="50" width="250" height="320" fill="#1A6BA0" opacity="0.08" rx="12" />

              {/* Connector dotted lines */}
              {CONNECTOR_LINES.map((line, i) => (
                <line
                  key={i}
                  x1={line.from.x} y1={line.from.y}
                  x2={line.to.x} y2={line.to.y}
                  stroke="#0E7B74"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.4"
                  className="animated-dash"
                />
              ))}

              {/* Country paths */}
              {(Object.entries(COUNTRY_SVG_PATHS) as [CountryKey, { d: string; cx: number; cy: number }][]).map(([key, { d, cx, cy }]) => (
                <g key={key} onClick={() => setActiveCountry(activeCountry === key ? null : key)} style={{ cursor: 'pointer' }}>
                  <path
                    d={d}
                    fill={activeCountry === key ? '#0E7B74' : '#1A6BA0'}
                    opacity={activeCountry && activeCountry !== key ? 0.5 : 0.85}
                    stroke="white"
                    strokeWidth="1.5"
                    className="country-path transition-all duration-200"
                  />
                  {/* Country dot + label */}
                  <circle cx={cx} cy={cy} r="4" fill="white" opacity="0.9" />
                  <text x={cx + 6} y={cy + 4} fill="white" fontSize="9" fontWeight="600" opacity="0.9">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </text>
                </g>
              ))}

              {/* Indian Ocean label */}
              <text x="270" y="230" fill="#1A6BA0" fontSize="9" opacity="0.5" fontStyle="italic" transform="rotate(-15, 270, 230)">Indian Ocean</text>
            </svg>

            <p className="text-center text-[#718096] text-xs mt-2">Click a country to explore</p>
          </div>

          {/* Country modal / info panel */}
          {activeCountry && (
            <div className="flex-1 max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="relative h-40">
                <img
                  src={COUNTRY_IMAGES[activeCountry]}
                  alt={countries[activeCountry].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button
                  onClick={() => setActiveCountry(null)}
                  className="absolute top-3 right-3 bg-black/40 rounded-full p-1 text-white hover:bg-black/60 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <span className="text-2xl">{COUNTRY_FLAGS[activeCountry]}</span>
                  <h3 className="text-white font-bold text-xl font-display">{countries[activeCountry].name}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[#718096] text-sm leading-relaxed mb-4">{countries[activeCountry].description}</p>
                <div className="mb-4">
                  <div className="text-xs text-[#0E7B74] font-bold uppercase tracking-wider mb-2">Focus Areas</div>
                  <div className="flex flex-wrap gap-2">
                    {countries[activeCountry].focus.map((f) => (
                      <span key={f} className="bg-[#0E7B74]/10 text-[#0E7B74] text-xs px-3 py-1 rounded-full font-medium">{f}</span>
                    ))}
                  </div>
                </div>
                <button className="flex items-center gap-2 text-[#0E7B74] text-sm font-semibold hover:gap-3 transition-all">
                  {t.map.visitCountry} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Default state - show all country cards */}
          {!activeCountry && (
            <div className="flex-1">
              <div ref={cardsRef} className="grid grid-cols-2 gap-4">
                {(Object.entries(countries) as [CountryKey, typeof countries.kenya][]).map(([key, country]) => (
                  <div
                    key={key}
                    onClick={() => setActiveCountry(key)}
                    className="bg-white rounded-xl overflow-hidden shadow-md card-hover cursor-pointer border border-gray-100"
                  >
                    <div className="h-28 relative overflow-hidden">
                      <img src={COUNTRY_IMAGES[key]} alt={country.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className="absolute bottom-2 left-3 text-xl">{COUNTRY_FLAGS[key]}</span>
                    </div>
                    <div className="p-3">
                      <h4 className="font-bold text-[#0A1628] text-sm mb-1">{country.name}</h4>
                      <div className="flex flex-wrap gap-1">
                        {country.focus.slice(0, 2).map((f) => (
                          <span key={f} className="bg-[#0E7B74]/10 text-[#0E7B74] text-xs px-2 py-0.5 rounded-full">{f}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
