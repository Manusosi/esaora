import { Link } from 'wouter';
import { useLanguage } from '@/i18n/LanguageContext';
import { Mail } from 'lucide-react';
import { FaLinkedin, FaXTwitter, FaFacebookF, FaYoutube } from 'react-icons/fa6';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-brand-navy border-t border-white/10 pt-24 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

          {/* Identity Column */}
          <div className="space-y-8">
            <Link href="/">
              <img
                src="/footerlogo.png"
                alt="ESA-ORA Logo"
                className="h-20 w-auto hover:scale-105 transition-transform duration-500 cursor-pointer"
              />
            </Link>
            <div className="space-y-4">
              <p className="text-white text-lg font-medium leading-snug tracking-tight">
                {t.footer.tagline}
              </p>
              <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                {t.footer.charter}
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-5 pt-2">
              {[
                { icon: <FaLinkedin className="w-6 h-6" />, href: '#', color: '#0077b5', label: 'LinkedIn' },
                { icon: <FaXTwitter className="w-6 h-6" />,  href: '#', color: '#ffffff', label: 'Twitter' },
                { icon: <FaFacebookF className="w-6 h-6" />, href: '#', color: '#1877F2', label: 'Facebook' },
                { icon: <FaYoutube className="w-6 h-6" />,   href: '#', color: '#FF0000', label: 'YouTube' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  aria-label={s.label}
                  style={{ color: s.color }}
                  className="transition-all duration-300 transform hover:-translate-y-2 hover:scale-110 p-1 hover:border hover:border-white/20 rounded-lg"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Our Work Column */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-widest mb-10">{t.footer.ourWork}</h4>
            <ul className="space-y-5">
              <li><Link href="/our-work/wash"         className="text-white/80 hover:text-[#00d2ff] text-base transition-all duration-200 block">{t.nav.wash}</Link></li>
              <li><Link href="/our-work/climate"      className="text-white/80 hover:text-[#00d2ff] text-base transition-all duration-200 block">{t.nav.climate}</Link></li>
              <li><Link href="/our-work/blue-economy" className="text-white/80 hover:text-[#00d2ff] text-base transition-all duration-200 block">{t.nav.blueEconomy}</Link></li>
              <li><Link href="/our-work/public-health"className="text-white/80 hover:text-[#00d2ff] text-base transition-all duration-200 block">{t.nav.publicHealth}</Link></li>
            </ul>
          </div>

          {/* Countries Column */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-widest mb-10">{t.footer.countries}</h4>
            <ul className="space-y-5">
              <li><Link href="/countries/kenya"      className="text-white/80 hover:text-[#00d2ff] text-base transition-all duration-200 block">{t.nav.kenya}</Link></li>
              <li><Link href="/countries/tanzania"   className="text-white/80 hover:text-[#00d2ff] text-base transition-all duration-200 block">{t.nav.tanzania}</Link></li>
              <li><Link href="/countries/mozambique" className="text-white/80 hover:text-[#00d2ff] text-base transition-all duration-200 block">{t.nav.mozambique}</Link></li>
              <li><Link href="/countries/madagascar" className="text-white/80 hover:text-[#00d2ff] text-base transition-all duration-200 block">{t.nav.madagascar}</Link></li>
            </ul>
          </div>

          {/* Alliance Links Column */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-widest mb-10">{t.footer.allianceConnectivity}</h4>
            <ul className="space-y-5">
              <li><Link href="/about"   className="text-white/80 hover:text-[#00d2ff] text-base transition-all duration-200 block">{t.nav.about}</Link></li>
              <li><Link href="/gallery" className="text-white/80 hover:text-[#00d2ff] text-base transition-all duration-200 block">{t.nav.gallery}</Link></li>
              <li><Link href="/news"    className="text-white/80 hover:text-[#00d2ff] text-base transition-all duration-200 block">{t.nav.news}</Link></li>
              <li><Link href="/partners"className="text-white/80 hover:text-[#00d2ff] text-base transition-all duration-200 block">{t.nav.partners}</Link></li>
              <li><Link href="/contact" className="text-white/80 hover:text-[#00d2ff] text-base transition-all duration-200 block">{t.nav.contact}</Link></li>
              <li className="pt-4">
                <a
                  href={`mailto:${t.footer.email}`}
                  className="text-[#00d2ff] font-medium text-sm flex items-center gap-2 group"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  {t.footer.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white/50 text-xs tracking-wide">
            © {new Date().getFullYear()} ESA-ORA. {t.footer.allianceFullTitle}. All rights reserved.
          </div>
          <div className="flex gap-10">
            {[
              { label: t.footer.privacy, href: '/privacy' },
              { label: t.footer.terms,   href: '/terms' },
              { label: t.footer.cookies, href: '/cookies' },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="text-white/60 hover:text-white text-xs transition-colors font-medium">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
