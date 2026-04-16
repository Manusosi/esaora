import { useLanguage } from '@/i18n/LanguageContext';
import { Linkedin, Twitter, Facebook, Youtube, Instagram, Mail, Globe } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#000080] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo & tagline */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#00d2ff] rounded-full flex items-center justify-center">
                <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
                  <circle cx="16" cy="16" r="14" stroke="white" strokeWidth="1.5" />
                  <path d="M6 18 Q10 12 16 16 Q22 20 26 14" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M6 22 Q10 16 16 20 Q22 24 26 18" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
                </svg>
              </div>
              <div>
                <div className="text-white font-bold text-lg font-sora">ESA-ORA</div>
                <div className="text-[#00d2ff] text-xs tracking-wider">OCEAN RESILIENCE ALLIANCE</div>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-xs">{t.footer.tagline}</p>
            <p className="text-white/60 text-xs leading-relaxed mb-5">{t.footer.charter}</p>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: <Linkedin className="w-4 h-4" />, href: '#' },
                { icon: <Twitter className="w-4 h-4" />, href: '#' },
                { icon: <Facebook className="w-4 h-4" />, href: '#' },
                { icon: <Youtube className="w-4 h-4" />, href: '#' },
                { icon: <Instagram className="w-4 h-4" />, href: '#' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-[#00d2ff] hover:text-[#000080] transition-all hover:scale-110 duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{t.footer.about}</h4>
            <ul className="space-y-2.5">
              {[t.nav.ourStory, t.nav.vision, t.nav.governance, 'Charter & Legal'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/80 hover:text-white text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Work */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{t.footer.ourWork}</h4>
            <ul className="space-y-2.5">
              {[t.nav.wash, t.nav.climate, t.nav.blueEconomy, t.nav.publicHealth].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/80 hover:text-white text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Countries */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{t.footer.countries}</h4>
            <ul className="space-y-2.5 mb-6">
              {[t.nav.kenya, t.nav.tanzania, t.nav.mozambique, t.nav.madagascar].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/80 hover:text-white text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">{t.footer.contact}</h4>
            <div className="space-y-2">
              <a href={`mailto:${t.footer.email}`} className="flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors">
                <Mail className="w-3.5 h-3.5" />
                {t.footer.email}
              </a>
              <a href="#" className="flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors">
                <Globe className="w-3.5 h-3.5" />
                {t.footer.website}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-xs">
            © {new Date().getFullYear()} ESA-ORA — East & Southern Africa Ocean Resilience Alliance. All rights reserved.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            {[t.footer.privacy, t.footer.terms, t.footer.cookies, t.footer.gdpr].map((item) => (
              <a key={item} href="#" className="text-white/60 hover:text-white/60 text-xs transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
