import { siteConfig, categories, whatsappLink } from '../config/site.js';
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from './Icons.jsx';

export default function Footer() {
  const { social, brand, contact } = siteConfig;
  const ico = 'grid h-11 w-11 place-items-center rounded-full border border-gold-400/40 text-gold-200 transition hover:bg-gold-400 hover:text-cocoa-950';
  return (
    <footer className="border-t border-gold-400/20 bg-cocoa-950 px-5 pb-28 pt-14 text-cream-200/75 sm:px-8">
      <div className="container-x grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-display text-3xl text-gold-gradient">{brand.name} <span className="text-lg text-cream-200">{brand.suffix}</span></p>
          <p className="mt-3 max-w-xs text-sm">{brand.tagline} in 18k gold, with selected gemstones and handcrafted finishing.</p>
          <div className="mt-5 flex gap-3">
            <a href={social.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={ico}><InstagramIcon /></a>
            <a href={social.facebook.url} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={ico}><FacebookIcon /></a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={ico}><WhatsAppIcon /></a>
          </div>
        </div>
        <div>
          <h3 className="font-display text-xl text-cream-50">Collections</h3>
          <ul className="mt-3 space-y-2 text-sm">{categories.map((c) => <li key={c.id}><a href="#produtos" className="hover:text-gold-300">{c.label}</a></li>)}</ul>
        </div>
        <div>
          <h3 className="font-display text-xl text-cream-50">Customer care</h3>
          <ul className="mt-3 space-y-2 text-sm"><li>{contact.phoneLabel}</li><li>{contact.email}</li><li>{contact.hours}</li></ul>
        </div>
        <div>
          <h3 className="font-display text-xl text-cream-50">Our promise</h3>
          <ul className="mt-3 space-y-2 text-sm"><li>Lifetime gold guarantee</li><li>Free annual cleaning</li><li>30-day exchange</li></ul>
        </div>
      </div>
      <p className="container-x mt-12 border-t border-white/10 pt-6 text-xs">© {new Date().getFullYear()} {brand.name} {brand.suffix}. All rights reserved.</p>
    </footer>
  );
}
