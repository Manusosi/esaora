import { useState, useRef, useEffect } from 'react';
import { X, ChevronDown, Check, Loader2 } from 'lucide-react';

const AFRICAN_COUNTRIES = [
  'Algeria','Angola','Benin','Botswana','Burkina Faso','Burundi','Cabo Verde',
  'Cameroon','Central African Republic','Chad','Comoros','Congo (Brazzaville)',
  'Congo (DRC)','Djibouti','Egypt','Equatorial Guinea','Eritrea','Eswatini',
  'Ethiopia','Gabon','Gambia','Ghana','Guinea','Guinea-Bissau','Ivory Coast',
  'Kenya','Lesotho','Liberia','Libya','Madagascar','Malawi','Mali','Mauritania',
  'Mauritius','Morocco','Mozambique','Namibia','Niger','Nigeria','Rwanda',
  'São Tomé and Príncipe','Senegal','Seychelles','Sierra Leone','Somalia',
  'South Africa','South Sudan','Sudan','Tanzania','Togo','Tunisia','Uganda',
  'Zambia','Zimbabwe',
];

const ORG_TYPES = [
  'Non-Governmental Organization (NGO)',
  'Government Ministry / Agency',
  'Academic / Research Institution',
  'Intergovernmental Organization',
  'Private Sector / Corporation',
  'Community-Based Organization',
  'International Development Agency',
  'Other',
];

const FOCUS_AREAS = [
  'WASH (Water, Sanitation & Hygiene)',
  'Climate Action & Environmental Resilience',
  'Sustainable Blue Economy',
  'Public Health & Community Wellbeing',
  'Marine Conservation',
  'Ocean Governance & Policy',
  'Research & Innovation',
  'Capacity Building',
];

interface Props {
  open: boolean;
  onClose: () => void;
}

type Step = 1 | 2 | 3;

interface FormData {
  orgName: string;
  orgType: string;
  country: string;
  website: string;
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  contactPhone: string;
  focusAreas: string[];
  motivation: string;
  termsAgreed: boolean;
}

const INITIAL: FormData = {
  orgName: '', orgType: '', country: '', website: '',
  contactName: '', contactTitle: '', contactEmail: '', contactPhone: '',
  focusAreas: [], motivation: '', termsAgreed: false,
};

export function MembershipModal({ open, onClose }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) { setStep(1); setForm(INITIAL); setSubmitted(false); }
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const set = (field: keyof FormData, value: unknown) =>
    setForm((f) => ({ ...f, [field]: value }));

  const toggleFocus = (area: string) => {
    set('focusAreas', form.focusAreas.includes(area)
      ? form.focusAreas.filter((a) => a !== area)
      : [...form.focusAreas, area]);
  };

  const canNext1 = form.orgName && form.orgType && form.country;
  const canNext2 = form.contactName && form.contactEmail && form.focusAreas.length > 0;
  const canSubmit = canNext2 && form.motivation && form.termsAgreed;

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1800));
    setSubmitting(false);
    setSubmitted(true);
  };

  const STEPS = ['Organisation', 'Contact & Focus', 'Motivation'];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(10,22,40,0.85)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="bg-[#0D1B2E] border border-white/10 rounded-3xl w-full max-w-xl shadow-2xl shadow-black/60 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10 flex-shrink-0">
          <div>
            <h2 className="text-white font-bold text-xl">Apply for Membership</h2>
            <p className="text-white/50 text-sm mt-0.5">Join the ESA-ORA Alliance</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <>
            {/* Step indicators */}
            <div className="flex items-center gap-2 px-6 py-4 border-b border-white/5 flex-shrink-0">
              {STEPS.map((label, i) => {
                const num = (i + 1) as Step;
                const isActive = step === num;
                const isDone = step > num;
                return (
                  <div key={label} className="flex items-center gap-2 flex-1">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-200"
                      style={{
                        background: isDone ? '#0E7B74' : isActive ? '#0E7B74' : 'rgba(255,255,255,0.08)',
                        color: isDone || isActive ? 'white' : 'rgba(255,255,255,0.3)',
                      }}
                    >
                      {isDone ? <Check className="w-3.5 h-3.5" /> : num}
                    </div>
                    <span className={`text-xs font-medium hidden sm:inline ${isActive ? 'text-white' : 'text-white/30'}`}>{label}</span>
                    {i < STEPS.length - 1 && (
                      <div className="flex-1 h-px mx-1" style={{ background: step > num ? '#0E7B74' : 'rgba(255,255,255,0.1)' }} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Form body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {step === 1 && (
                <>
                  <Field label="Organisation Name *">
                    <input className={input} value={form.orgName} onChange={(e) => set('orgName', e.target.value)} placeholder="e.g. Kenya Marine & Fisheries Research Institute" />
                  </Field>
                  <Field label="Organisation Type *">
                    <select className={input} value={form.orgType} onChange={(e) => set('orgType', e.target.value)}>
                      <option value="">Select type…</option>
                      {ORG_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </Field>
                  <Field label="Country *">
                    <select className={input} value={form.country} onChange={(e) => set('country', e.target.value)}>
                      <option value="">Select country…</option>
                      {AFRICAN_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </Field>
                  <Field label="Website (optional)">
                    <input className={input} value={form.website} onChange={(e) => set('website', e.target.value)} placeholder="https://yourorg.org" />
                  </Field>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Lead Contact Name *">
                      <input className={input} value={form.contactName} onChange={(e) => set('contactName', e.target.value)} placeholder="Full name" />
                    </Field>
                    <Field label="Contact Title">
                      <input className={input} value={form.contactTitle} onChange={(e) => set('contactTitle', e.target.value)} placeholder="e.g. Director" />
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Email Address *">
                      <input className={input} type="email" value={form.contactEmail} onChange={(e) => set('contactEmail', e.target.value)} placeholder="contact@org.org" />
                    </Field>
                    <Field label="Phone Number">
                      <input className={input} type="tel" value={form.contactPhone} onChange={(e) => set('contactPhone', e.target.value)} placeholder="+254 700 000000" />
                    </Field>
                  </div>
                  <Field label={`Primary Focus Areas * (select at least 1)`}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                      {FOCUS_AREAS.map((area) => {
                        const checked = form.focusAreas.includes(area);
                        return (
                          <label key={area} className="flex items-start gap-2 cursor-pointer group">
                            <div
                              className="w-4 h-4 rounded flex-shrink-0 mt-0.5 border flex items-center justify-center transition-all duration-150"
                              style={{
                                borderColor: checked ? '#0E7B74' : 'rgba(255,255,255,0.2)',
                                background: checked ? '#0E7B74' : 'transparent',
                              }}
                              onClick={() => toggleFocus(area)}
                            >
                              {checked && <Check className="w-2.5 h-2.5 text-white" />}
                            </div>
                            <span className="text-white/65 text-xs leading-relaxed group-hover:text-white/90 transition-colors">{area}</span>
                          </label>
                        );
                      })}
                    </div>
                  </Field>
                </>
              )}

              {step === 3 && (
                <>
                  <Field label="Why do you want to join ESA-ORA? *">
                    <textarea
                      className={`${input} resize-none`}
                      rows={5}
                      value={form.motivation}
                      onChange={(e) => set('motivation', e.target.value)}
                      placeholder="Describe your organisation's interest in joining, relevant work in the region, and how you hope to contribute to the Alliance's mission…"
                    />
                  </Field>

                  {/* Summary */}
                  <div className="bg-white/5 rounded-xl p-4 space-y-2">
                    <p className="text-white/40 text-xs uppercase tracking-widest font-medium">Application Summary</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                      <span className="text-white/40">Organisation</span>
                      <span className="text-white/80 truncate">{form.orgName}</span>
                      <span className="text-white/40">Type</span>
                      <span className="text-white/80 truncate">{form.orgType.split('(')[0].trim()}</span>
                      <span className="text-white/40">Country</span>
                      <span className="text-white/80">{form.country}</span>
                      <span className="text-white/40">Contact</span>
                      <span className="text-white/80 truncate">{form.contactName}</span>
                      <span className="text-white/40">Focus Areas</span>
                      <span className="text-white/80">{form.focusAreas.length} selected</span>
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <div
                      className="w-5 h-5 rounded border flex-shrink-0 mt-0.5 flex items-center justify-center transition-all"
                      style={{
                        borderColor: form.termsAgreed ? '#0E7B74' : 'rgba(255,255,255,0.2)',
                        background: form.termsAgreed ? '#0E7B74' : 'transparent',
                      }}
                      onClick={() => set('termsAgreed', !form.termsAgreed)}
                    >
                      {form.termsAgreed && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-white/50 text-xs leading-relaxed">
                      I confirm that the information provided is accurate and that my organisation consents to ESA-ORA processing this application in accordance with its membership policy.
                    </span>
                  </label>
                </>
              )}
            </div>

            {/* Footer buttons */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 flex-shrink-0">
              <button
                onClick={() => step > 1 ? setStep((s) => (s - 1) as Step) : onClose()}
                className="text-white/50 hover:text-white text-sm transition-colors"
              >
                {step === 1 ? 'Cancel' : '← Back'}
              </button>
              {step < 3 ? (
                <button
                  onClick={() => setStep((s) => (s + 1) as Step)}
                  disabled={step === 1 ? !canNext1 : !canNext2}
                  className="px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ background: '#0E7B74' }}
                >
                  Continue →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit || submitting}
                  className="px-6 py-2.5 rounded-full text-sm font-semibold text-white flex items-center gap-2 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ background: '#0E7B74' }}
                >
                  {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</> : 'Submit Application'}
                </button>
              )}
            </div>
          </>
        ) : (
          /* Success screen */
          <div className="flex flex-col items-center justify-center flex-1 px-6 py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#0E7B74]/20 flex items-center justify-center mb-5">
              <Check className="w-8 h-8 text-[#0E7B74]" />
            </div>
            <h3 className="text-white font-bold text-2xl mb-2">Application Submitted!</h3>
            <p className="text-white/55 text-sm leading-relaxed max-w-sm">
              Thank you, <strong className="text-white">{form.contactName}</strong>. We've received {form.orgName}'s application to join the ESA-ORA Alliance. Our Secretariat will review your submission and be in touch within 10 business days.
            </p>
            <button
              onClick={onClose}
              className="mt-8 px-8 py-3 rounded-full text-white font-semibold text-sm"
              style={{ background: '#0E7B74' }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-white/50 text-xs font-medium mb-1.5 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

const input = [
  'w-full bg-white/6 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm',
  'focus:outline-none focus:border-[#0E7B74]/60 focus:bg-white/8 transition-all placeholder-white/25',
  '[&>option]:bg-[#0D1B2E] [&>option]:text-white',
].join(' ');
