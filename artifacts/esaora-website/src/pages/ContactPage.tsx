import { useState } from 'react';
import { ArrowRight, Mail, Globe } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';

const PURPOSES = ['General Enquiry', 'Media & Press', 'Partnership', 'Funding & Investment', 'Membership Application', 'Other'];

const FOCAL_POINTS = [
  { country: 'Kenya', code: 'ke', email: 'kenya@esaora.org', city: 'Mombasa' },
  { country: 'Tanzania', code: 'tz', email: 'tanzania@esaora.org', city: 'Dar es Salaam' },
  { country: 'Mozambique', code: 'mz', email: 'mozambique@esaora.org', city: 'Maputo' },
  { country: 'Madagascar', code: 'mg', email: 'madagascar@esaora.org', city: 'Antananarivo' },
];

const FAQ = [
  { q: 'What is ESA-ORA?', a: 'ESA-ORA is a regional alliance between Kenya, Tanzania, Mozambique, and Madagascar committed to ocean resilience, climate action, and community wellbeing in the Western Indian Ocean.' },
  { q: 'How do I become a member?', a: 'Membership is open to NGOs, government agencies, and private entities. Apply via our Partners page; applications are reviewed by the Secretariat and approved by the Steering Committee.' },
  { q: 'Where does ESA-ORA operate?', a: 'We operate across the coastal zones of our four member nations: Kenya, Tanzania, Mozambique, and Madagascar.' },
  { q: 'How is ESA-ORA funded?', a: 'Funding comes from member contributions and institutional donor grants, managed with full transparency under our Financial Management sub-committee.' },
  { q: 'What is the ESA-ORA Charter?', a: 'The Charter is our binding legal framework (2025–2030) governing alliance structure, membership, and regional policy coordination.' },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', org: '', email: '', country: '', purpose: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main>
      <PageHero
        label="CONTACT US"
        heading="Get in Touch with the Alliance"
        subheading="Contact our regional Secretariat or national focal points for enquiries, partnerships, and applications."
        imageSrc="/images/hero/hero-bg.jpg"
        breadcrumb="Contact"
      />

      {/* Regional Focal Points — MOVED ABOVE FORM */}
      <section className="bg-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#00d2ff] uppercase tracking-widest text-xs font-bold block mb-3">In-Country Contact</span>
            <h2 className="font-display text-4xl text-brand-navy font-bold">Country Focal Points</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FOCAL_POINTS.map((fp) => (
              <div key={fp.country} className="bg-[#F0F4F8] rounded-lg p-6 border border-black/5 hover:-translate-y-1 transition-all shadow-sm">
                <div className="mb-5 overflow-hidden rounded-md border border-black/5 shadow-sm w-12 h-8">
                  <img 
                    src={`https://flagcdn.com/w80/${fp.code}.png`} 
                    alt={`${fp.country} Flag`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-brand-navy font-bold text-lg mb-1">{fp.country}</h3>
                <p className="text-[#4A5568] text-xs mb-5 font-medium opacity-70">{fp.city}</p>
                <a href={`mailto:${fp.email}`} className="text-[#00d2ff] text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all">
                  <Mail className="w-3 h-3" /> {fp.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secretariat Contact Form — MOVED BELOW FOCAL POINTS */}
      <section className="bg-[#F0F4F8] py-24 px-4 border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Form */}
            <div>
              <span className="text-[#00d2ff] uppercase tracking-widest text-xs font-bold block mb-4">Send a Message</span>
              <h2 className="font-display text-4xl text-brand-navy font-bold leading-tight mb-8">Message the Secretariat</h2>

              {sent ? (
                <div className="bg-white border border-[#00d2ff]/30 rounded-lg p-10 text-center shadow-xl shadow-black/5">
                  <div className="w-14 h-14 bg-[#00d2ff]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ArrowRight className="w-7 h-7 text-[#00d2ff]" />
                  </div>
                  <h3 className="text-brand-navy font-bold text-xl mb-2">Message Sent!</h3>
                  <p className="text-[#718096] text-sm">Thank you. We will respond within 3–5 business days.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { field: 'name', label: 'Full Name *', placeholder: 'Your name', type: 'text' },
                      { field: 'org', label: 'Organisation', placeholder: 'Your organisation', type: 'text' },
                    ].map(({ field, label, placeholder, type }) => (
                      <div key={field}>
                        <label className="block text-brand-navy/60 text-xs font-bold mb-1.5 uppercase tracking-wider">{label}</label>
                        <input
                          type={type}
                          className="w-full bg-white border border-black/10 rounded-lg px-4 py-2.5 text-brand-navy text-sm focus:outline-none focus:border-[#00d2ff]/50 focus:ring-1 focus:ring-[#00d2ff]/20 transition-all placeholder-gray-400"
                          placeholder={placeholder}
                          value={formData[field as keyof typeof formData]}
                          onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-brand-navy/60 text-xs font-bold mb-1.5 uppercase tracking-wider">Email *</label>
                      <input
                        type="email" required
                        className="w-full bg-white border border-black/10 rounded-lg px-4 py-2.5 text-brand-navy text-sm focus:outline-none focus:border-[#00d2ff]/50 focus:ring-1 focus:ring-[#00d2ff]/20 transition-all placeholder-gray-400"
                        placeholder="your@email.org"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-brand-navy/60 text-xs font-bold mb-1.5 uppercase tracking-wider">Country</label>
                      <select
                        className="w-full bg-white border border-black/10 rounded-lg px-4 py-2.5 text-brand-navy text-sm focus:outline-none focus:border-[#00d2ff]/50 focus:ring-1 focus:ring-[#00d2ff]/20 transition-all"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      >
                        <option value="">Select country…</option>
                        {['Kenya', 'Tanzania', 'Mozambique', 'Madagascar', 'Other African Country', 'Other'].map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-brand-navy/60 text-xs font-bold mb-1.5 uppercase tracking-wider">Purpose *</label>
                    <select
                      required
                      className="w-full bg-white border border-black/10 rounded-lg px-4 py-2.5 text-brand-navy text-sm focus:outline-none focus:border-[#00d2ff]/50 focus:ring-1 focus:ring-[#00d2ff]/20 transition-all"
                      value={formData.purpose}
                      onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    >
                      <option value="">Select purpose…</option>
                      {PURPOSES.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-brand-navy/60 text-xs font-bold mb-1.5 uppercase tracking-wider">Message *</label>
                    <textarea
                      required rows={5}
                      className="w-full bg-white border border-black/10 rounded-lg px-4 py-2.5 text-brand-navy text-sm focus:outline-none focus:border-[#00d2ff]/50 focus:ring-1 focus:ring-[#00d2ff]/20 transition-all placeholder-gray-400 resize-none"
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="bg-[#00d2ff] hover:bg-[#00b8e6] text-brand-navy px-8 py-3.5 rounded-lg font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 w-full shadow-lg shadow-brand-navy/10">
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div>
                <span className="text-[#00d2ff] uppercase tracking-widest text-xs font-bold block mb-4">Direct Contact</span>
                <h2 className="font-display text-4xl text-brand-navy font-bold leading-tight mb-8">Regional Office</h2>
              </div>
              <div className="space-y-4">
                <a href="mailto:info@esaora.org" className="flex items-center gap-4 bg-white rounded-lg p-5 border border-black/5 hover:border-[#00d2ff]/30 transition-all group shadow-sm">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#00d2ff]/10 text-[#00d2ff]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-brand-navy/50 text-xs font-bold uppercase tracking-wide">Email</p>
                    <p className="text-brand-navy font-bold text-sm">info@esaora.org</p>
                  </div>
                </a>
              </div>
              <div className="bg-brand-navy rounded-lg p-8 mt-8 relative overflow-hidden text-white shadow-2xl shadow-brand-navy/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00d2ff] rounded-full blur-[120px] opacity-10 -mr-32 -mt-32" />
                <div className="relative z-10">
                    RESPONSE TIMES
                  </p>
                  <div className="space-y-4">
                    {[
                      { label: 'General enquiries', time: '3–5 business days' },
                      { label: 'Media & press', time: '1–2 business days' },
                      { label: 'Membership applications', time: '10 business days' },
                      { label: 'Partnership discussions', time: '5–7 business days' },
                    ].map((row, idx, arr) => (
                      <div key={row.label} className={`flex justify-between items-center ${idx !== arr.length - 1 ? 'border-b border-white/10 pb-4' : ''}`}>
                        <span className="text-white/60 text-sm font-medium">{row.label}</span>
                        <span className="text-white font-bold text-sm">{row.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#00d2ff] uppercase tracking-widest text-xs font-bold block mb-3">Common Questions</span>
            <h2 className="font-display text-4xl text-brand-navy font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="border border-black/5 rounded-lg overflow-hidden">
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-[#F0F4F8]/50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-brand-navy font-semibold text-sm leading-snug">{item.q}</span>
                  <span className={`text-[#00d2ff] text-xl font-light flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-[#718096] text-sm leading-relaxed border-t border-black/5 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
