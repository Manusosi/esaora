import { useState, useRef, useEffect } from 'react';
import { X, Copy, Check, Facebook, Twitter, Linkedin, Mail, MessageCircle, Send } from 'lucide-react';

const SHARE_URL = typeof window !== 'undefined' ? window.location.origin : 'https://esaora.org';
const DEFAULT_MSG = `ESA-ORA — the East & Southern Africa Ocean Resilience Alliance — is uniting Kenya, Tanzania, Mozambique & Madagascar for water security, climate resilience, and a sustainable blue economy. Learn more:`;

interface Platform {
  key: string;
  label: string;
  color: string;
  icon: React.ReactNode;
  build: (msg: string, url: string) => string;
}

const PLATFORMS: Platform[] = [
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    color: '#25D366',
    icon: <MessageCircle className="w-5 h-5" />,
    build: (msg, url) => `https://wa.me/?text=${encodeURIComponent(`${msg}\n${url}`)}`,
  },
  {
    key: 'facebook',
    label: 'Facebook',
    color: '#1877F2',
    icon: <Facebook className="w-5 h-5" />,
    build: (_msg, url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    key: 'twitter',
    label: 'X (Twitter)',
    color: '#000000',
    icon: <Twitter className="w-5 h-5" />,
    build: (msg, url) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(msg)}&url=${encodeURIComponent(url)}`,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    color: '#0A66C2',
    icon: <Linkedin className="w-5 h-5" />,
    build: (_msg, url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    key: 'telegram',
    label: 'Telegram',
    color: '#2AABEE',
    icon: <Send className="w-5 h-5" />,
    build: (msg, url) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(msg)}`,
  },
  {
    key: 'email',
    label: 'Email',
    color: '#6B7280',
    icon: <Mail className="w-5 h-5" />,
    build: (msg, url) =>
      `mailto:?subject=${encodeURIComponent('ESA-ORA — Ocean Resilience Alliance')}&body=${encodeURIComponent(`${msg}\n\n${url}`)}`,
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ShareModal({ open, onClose }: Props) {
  const [message, setMessage] = useState(DEFAULT_MSG);
  const [copied, setCopied] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const handleShare = (platform: Platform) => {
    const href = platform.build(message, SHARE_URL);
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${message}\n${SHARE_URL}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(10,22,40,0.85)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="bg-[#0D1B2E] border border-white/10 rounded-3xl w-full max-w-md shadow-2xl shadow-black/60">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
          <div>
            <h2 className="text-white font-bold text-xl">Share Our Mission</h2>
            <p className="text-white/50 text-sm mt-0.5">Amplify the voice of coastal communities</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Editable message */}
          <div>
            <label className="block text-white/40 text-xs uppercase tracking-widest font-medium mb-2">
              Customise your message
            </label>
            <textarea
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm resize-none focus:outline-none focus:border-[#1A6BA0]/60 transition-all placeholder-white/25"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex justify-end mt-1">
              <span className="text-white/25 text-xs">{message.length} chars</span>
            </div>
          </div>

          {/* Link preview */}
          <div className="bg-white/5 rounded-xl px-4 py-3 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-white/40 text-xs uppercase tracking-widest font-medium mb-0.5">Link</p>
              <p className="text-white/70 text-sm truncate">{SHARE_URL}</p>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 flex-shrink-0"
              style={{ background: copied ? '#0E7B74' : 'rgba(255,255,255,0.08)', color: copied ? 'white' : 'rgba(255,255,255,0.6)' }}
            >
              {copied ? <><Check className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
            </button>
          </div>

          {/* Platform grid */}
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest font-medium mb-3">Share on platform</p>
            <div className="grid grid-cols-3 gap-2">
              {PLATFORMS.map((p) => (
                <button
                  key={p.key}
                  onClick={() => handleShare(p)}
                  className="flex flex-col items-center gap-2 py-3 px-2 rounded-xl border border-white/8 transition-all duration-200 hover:border-white/20 hover:scale-105 group"
                  style={{ background: p.color + '12' }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                    style={{ background: p.color + '28', color: p.color }}
                  >
                    {p.icon}
                  </div>
                  <span className="text-white/60 text-xs font-medium">{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 text-center">
          <p className="text-white/25 text-xs">
            Help us grow — every share brings more support to East & Southern Africa's coastal communities.
          </p>
        </div>
      </div>
    </div>
  );
}
