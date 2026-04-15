import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { gsap } from 'gsap';
import type { Language } from '@/i18n/translations';

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'sw', label: 'Kiswahili' },
  { code: 'fr', label: 'Français' },
  { code: 'pt', label: 'Português' },
];

export function NavBar() {
  const { t, language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [mobileOpen]);

  const navItems = [
    { key: 'about', label: t.nav.about, sub: [{ label: t.nav.ourStory }, { label: t.nav.vision }, { label: t.nav.governance }] },
    { key: 'ourWork', label: t.nav.ourWork, sub: [{ label: t.nav.wash }, { label: t.nav.climate }, { label: t.nav.blueEconomy }, { label: t.nav.publicHealth }] },
    { key: 'countries', label: t.nav.countries, sub: [{ label: t.nav.kenya }, { label: t.nav.tanzania }, { label: t.nav.mozambique }, { label: t.nav.madagascar }] },
    { key: 'programs', label: t.nav.programs, sub: [{ label: t.nav.allProjects }, { label: t.nav.impactMap }, { label: t.nav.reports }] },
    { key: 'partners', label: t.nav.partners, sub: [{ label: t.nav.partnerDirectory }, { label: t.nav.becomeMember }, { label: t.nav.funders }] },
    { key: 'news', label: t.nav.news },
    { key: 'contact', label: t.nav.contact },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#0A1628] shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-10 h-10 bg-[#0E7B74] rounded-full flex items-center justify-center">
                <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
                  <circle cx="16" cy="16" r="14" stroke="white" strokeWidth="1.5" />
                  <path d="M6 18 Q10 12 16 16 Q22 20 26 14" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M6 22 Q10 16 16 20 Q22 24 26 18" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
                </svg>
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-none font-sora">ESA-ORA</div>
                <div className="text-[#0E7B74] text-xs leading-none tracking-wider hidden sm:block">OCEAN RESILIENCE ALLIANCE</div>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => item.sub && setActiveDropdown(item.key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="nav-link flex items-center gap-1 text-white/90 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                    {item.label}
                    {item.sub && <ChevronDown className="w-3 h-3 opacity-60" />}
                  </button>
                  {item.sub && activeDropdown === item.key && (
                    <div className="absolute top-full left-0 w-52 bg-[#0A1628] border border-white/10 rounded-lg py-2 shadow-2xl">
                      {item.sub.map((s) => (
                        <button key={s.label} className="w-full text-left px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                          {s.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right side: Lang + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm py-1.5 px-2 rounded transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span className="uppercase font-medium">{language}</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-1 w-40 bg-[#0A1628] border border-white/10 rounded-lg py-1.5 shadow-2xl">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          language === lang.code ? 'text-[#0E7B74] font-medium' : 'text-white/80 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button className="bg-[#0E7B74] hover:bg-[#0a5f5a] text-white px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105">
                {t.nav.joinAlliance}
              </button>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div ref={mobileMenuRef} className="lg:hidden fixed inset-0 top-16 bg-[#0A1628] z-40 overflow-y-auto">
            <div className="px-6 py-6 space-y-1">
              {navItems.map((item) => (
                <div key={item.key}>
                  <button className="w-full text-left text-white text-lg font-medium py-3 border-b border-white/10">
                    {item.label}
                  </button>
                  {item.sub && (
                    <div className="pl-4 py-1 space-y-1">
                      {item.sub.map((s) => (
                        <button key={s.label} className="block w-full text-left text-white/70 text-base py-2">
                          {s.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <div className="flex gap-2 flex-wrap">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setMobileOpen(false); }}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        language === lang.code
                          ? 'border-[#0E7B74] bg-[#0E7B74] text-white'
                          : 'border-white/30 text-white/80'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
                <button className="bg-[#0E7B74] text-white px-6 py-3 rounded-full font-semibold text-base w-full mt-2">
                  {t.nav.joinAlliance}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
