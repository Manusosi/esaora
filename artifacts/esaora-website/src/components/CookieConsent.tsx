import { useState, useEffect } from 'react';
import { ChevronDown, X, ShieldCheck } from 'lucide-react';
import { Link } from 'wouter';

const STORAGE_KEY = 'esaora-cookie-consent';

interface CookieCategory {
  id: string;
  label: string;
  description: string;
  required: boolean;
}

const CATEGORIES: CookieCategory[] = [
  {
    id: 'session',
    label: 'Session Cookies',
    description:
      'Essential cookies that keep you logged in and maintain your session state while browsing the site. These are strictly necessary and cannot be disabled.',
    required: true,
  },
  {
    id: 'persistent',
    label: 'Persistent Cookies',
    description:
      'Cookies that are stored on your device between sessions, remembering your language preferences, display settings, and navigation history for a more seamless experience.',
    required: false,
  },
  {
    id: 'performance',
    label: 'Performance Cookies',
    description:
      'Help us understand how visitors interact with the ESA-ORA website by collecting anonymised data on page visits, load times, and error reports so we can improve our platform.',
    required: false,
  },
  {
    id: 'third_party',
    label: 'Third Party Cookies',
    description:
      'Set by external services such as our mapping tools, video embeds, and social media integrations. These may transfer data to third-party servers outside the ESA-ORA network.',
    required: false,
  },
  {
    id: 'functionality',
    label: 'Functionality Cookies',
    description:
      'Enable enhanced features such as regional content personalisation, accessibility preferences, and saved newsletter preferences to deliver a tailored experience.',
    required: false,
  },
];

function getStoredConsent(): Record<string, boolean> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [consent, setConsent] = useState<Record<string, boolean>>(() => {
    const defaults: Record<string, boolean> = {};
    CATEGORIES.forEach((c) => { defaults[c.id] = c.required; });
    return defaults;
  });

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      // Small delay so we don't flash immediately on page load
      const t = setTimeout(() => {
        setMounted(true);
        requestAnimationFrame(() => setVisible(true));
      }, 800);
      return () => clearTimeout(t);
    }
  }, []);

  if (!mounted) return null;

  const handleToggle = (id: string) => {
    if (CATEGORIES.find((c) => c.id === id)?.required) return;
    setConsent((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectAll = () => {
    const all: Record<string, boolean> = {};
    CATEGORIES.forEach((c) => { all[c.id] = true; });
    setConsent(all);
  };

  const handleConfirm = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    setVisible(false);
    setTimeout(() => setMounted(false), 400);
  };

  const handleRejectAll = () => {
    const minimal: Record<string, boolean> = {};
    CATEGORIES.forEach((c) => { minimal[c.id] = c.required; });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(minimal));
    setVisible(false);
    setTimeout(() => setMounted(false), 400);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-[2px] transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
        aria-hidden="true"
      />

      {/* Banner panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Cookie Consent"
        className="fixed z-[9999] transition-all duration-400 ease-in-out"
        style={{
          bottom: visible ? '2rem' : '-120%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(520px, calc(100vw - 2rem))',
          opacity: visible ? 1 : 0,
        }}
      >
        <div
          style={{
            background: 'linear-gradient(145deg, #001B40 0%, #002659 100%)',
            border: '1px solid rgba(0, 210, 255, 0.18)',
            borderRadius: '16px',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,210,255,0.06) inset',
          }}
          className="overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 pb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(0,210,255,0.12)' }}
              >
                <ShieldCheck className="w-5 h-5" style={{ color: '#00d2ff' }} />
              </div>
              <h2
                className="font-bold text-xl leading-tight"
                style={{ color: '#00d2ff', fontFamily: "'Sora', sans-serif" }}
              >
                Cookie Consent
              </h2>
            </div>
            <button
              onClick={handleRejectAll}
              aria-label="Decline all cookies"
              className="text-white/30 hover:text-white/70 transition-colors mt-0.5 p-1 rounded-lg hover:bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 pb-2">
            <p className="text-white/75 text-sm leading-relaxed">
              We use cookies to give you the best experience on our website. You can choose which
              cookies you want to allow below. You can find more details in our{' '}
              <Link
                href="/cookies"
                className="underline underline-offset-2 decoration-white/30 hover:text-[#00d2ff] transition-colors"
                onClick={handleRejectAll}
              >
                cookie policy
              </Link>
              .
            </p>
          </div>

          {/* Categories */}
          <div className="px-4 py-3 space-y-1 max-h-[300px] overflow-y-auto cookie-scroll">
            {CATEGORIES.map((cat) => {
              const isOpen = expanded === cat.id;
              const checked = consent[cat.id];

              return (
                <div
                  key={cat.id}
                  style={{ borderRadius: '10px', background: isOpen ? 'rgba(255,255,255,0.04)' : 'transparent' }}
                  className="transition-colors"
                >
                  {/* Row */}
                  <div className="flex items-center gap-3 px-2 py-2.5">
                    {/* Checkbox */}
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={checked}
                      onClick={() => handleToggle(cat.id)}
                      disabled={cat.required}
                      aria-label={`${cat.label} cookies`}
                      className="flex-shrink-0 transition-all duration-200 disabled:cursor-default"
                      style={{ outline: 'none' }}
                    >
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '4px',
                          border: `2px solid ${checked ? '#00d2ff' : 'rgba(255,255,255,0.25)'}`,
                          background: checked ? 'transparent' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {checked && (
                          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                            <path
                              d="M1 5L4.5 8.5L11 1"
                              stroke={cat.required ? '#00d2ff' : '#00d2ff'}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </button>

                    {/* Label */}
                    <span
                      className="flex-1 text-sm font-semibold"
                      style={{ color: checked ? '#ffffff' : 'rgba(255,255,255,0.65)' }}
                    >
                      {cat.label}
                      {cat.required && (
                        <span
                          className="ml-2 text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded"
                          style={{ background: 'rgba(0,210,255,0.12)', color: '#00d2ff' }}
                        >
                          Required
                        </span>
                      )}
                    </span>

                    {/* Expand toggle */}
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : cat.id)}
                      aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${cat.label} details`}
                      className="text-white/30 hover:text-white/70 transition-colors p-1 rounded"
                    >
                      <ChevronDown
                        className="w-4 h-4 transition-transform duration-200"
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      />
                    </button>
                  </div>

                  {/* Expandable description */}
                  <div
                    style={{
                      maxHeight: isOpen ? '200px' : '0px',
                      overflow: 'hidden',
                      transition: 'max-height 0.25s ease',
                    }}
                  >
                    <p className="text-white/50 text-xs leading-relaxed px-3 pb-3 pr-8">
                      {cat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', margin: '0 16px' }} />

          {/* Actions */}
          <div className="flex items-center gap-3 p-5">
            <button
              type="button"
              id="cookie-select-all"
              onClick={handleSelectAll}
              className="flex-1 py-3 px-5 rounded-lg text-sm font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #00d2ff 0%, #0090b8 100%)',
                color: '#001B40',
                boxShadow: '0 4px 20px rgba(0,210,255,0.25)',
              }}
            >
              Select All
            </button>
            <button
              type="button"
              id="cookie-confirm"
              onClick={handleConfirm}
              className="flex-1 py-3 px-5 rounded-lg text-sm font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: '#0d1b2e',
                color: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              Confirm
            </button>
          </div>

          {/* Subtle footer */}
          <div className="pb-4 flex items-center justify-center">
            <p className="text-white/20 text-[10px] tracking-widest uppercase font-medium">
              esaora.org · GDPR Compliant
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .cookie-scroll::-webkit-scrollbar { width: 4px; }
        .cookie-scroll::-webkit-scrollbar-track { background: transparent; }
        .cookie-scroll::-webkit-scrollbar-thumb { background: rgba(0,210,255,0.2); border-radius: 2px; }
        .cookie-scroll { scrollbar-width: thin; scrollbar-color: rgba(0,210,255,0.2) transparent; }
      `}</style>
    </>
  );
}
