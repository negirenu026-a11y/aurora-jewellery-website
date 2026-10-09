import { useState } from 'react';
import { categories, siteConfig, whatsappLink } from '../config/site.js';
import { useStore } from '../context/StoreContext.jsx';
import Reveal from './Reveal.jsx';
import { ClockIcon, MailIcon, PinIcon, WhatsAppIcon } from './Icons.jsx';

const field = 'mt-2 w-full rounded-xl border border-white/15 bg-white/[0.07] px-4 py-3 text-cream-50 placeholder:text-cream-200/40 focus:border-gold-400 focus:outline-none transition';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const { contact } = siteConfig;
  const { addEnquiry } = useStore();

  const onSubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const data = {
      name: f.get('name'),
      contact: f.get('contact'),
      interest: f.get('interest'),
      message: f.get('message'),
    };
    // Save enquiry to localStorage
    addEnquiry(data);
    // Open WhatsApp with pre-filled message
    const msg = `Hello! My name is ${data.name}.\nInterested in: ${data.interest}.\n${data.message}\nContact: ${data.contact}`;
    window.open(whatsappLink(msg), '_blank', 'noopener');
    setSent(true);
  };

  return (
    <section id="contato" className="section" style={{ background: 'radial-gradient(70% 80% at 80% 20%, #4A3326 0%, #21150F 60%, #150C08 100%)' }}>
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <h2 className="h-display text-cream-50" style={{ fontSize: 'var(--fs-3xl)' }}>Tell us what you are looking for</h2>
          <p className="mt-5 max-w-md text-cream-200/80">We reply within a few hours during business hours. Prefer a quicker chat? Message us on WhatsApp.</p>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-gold mt-8"><WhatsAppIcon /> Message us on WhatsApp</a>
          <ul className="mt-10 space-y-4 text-cream-200/85">
            <li className="flex items-center gap-3"><MailIcon className="shrink-0 text-gold-400" /> <a href={`mailto:${contact.email}`} className="hover:text-gold-300">{contact.email}</a></li>
            <li className="flex items-center gap-3"><PinIcon className="shrink-0 text-gold-400" /> <span>{contact.address}</span></li>
            <li className="flex items-center gap-3"><ClockIcon className="shrink-0 text-gold-400" /> <span>{contact.hours}</span></li>
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <form onSubmit={onSubmit} className="glass rounded-[2rem] p-6 sm:p-9">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm text-cream-200">Name<input name="name" required autoComplete="name" className={field} placeholder="Your name" /></label>
              <label className="text-sm text-cream-200">WhatsApp or email<input name="contact" required className={field} placeholder="(11) 90000-0000" /></label>
            </div>
            <label className="mt-5 block text-sm text-cream-200">I am interested in
              <select name="interest" className={field + ' [&>option]:text-cocoa-900'}>
                {categories.map((c) => <option key={c.id}>{c.label}</option>)}
                <option>Custom piece</option><option>Something else</option>
              </select>
            </label>
            <label className="mt-5 block text-sm text-cream-200">Message
              <textarea name="message" required rows={4} className={field} placeholder="E.g. I am looking for an emerald engagement ring…" />
            </label>
            <button type="submit" className="btn-gold mt-7 w-full"><WhatsAppIcon /> Send via WhatsApp</button>
            <p className="mt-4 min-h-5 text-center text-xs text-gold-200" role="status">
              {sent ? 'WhatsApp is open with your message ready. Just tap send.' : 'When you send, WhatsApp opens with your message pre-filled.'}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
