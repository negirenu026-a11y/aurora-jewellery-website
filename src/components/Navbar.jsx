import { useState, useEffect } from 'react';
import { siteConfig, whatsappLink } from '../config/site.js';
import { useStore } from '../context/StoreContext.jsx';
import { CloseIcon, HeartFilledIcon, MenuIcon, WhatsAppIcon } from './Icons.jsx';

const links = [
  ['#colecoes', 'Collections'], ['#produtos', 'Pieces'], ['#sobre', 'Our story'], ['#social', 'Social'], ['#contato', 'Contact'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { wishlist } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
      <nav
        className={`glass mx-auto mt-3 flex max-w-7xl items-center justify-between rounded-full px-5 py-3 transition-all duration-300 sm:mx-6 lg:mx-auto ${scrolled ? 'shadow-lg shadow-black/30' : ''}`}
        aria-label="Main"
      >
        <a href="#inicio" className="font-display text-2xl text-cream-50">
          <span className="text-gold-gradient">{siteConfig.brand.name}</span>{' '}
          <span className="hidden text-base text-cream-200/80 sm:inline">{siteConfig.brand.suffix}</span>
        </a>

        <ul className="hidden items-center gap-8 text-sm text-cream-200/85 md:flex">
          {links.map(([h, l]) => (
            <li key={h}><a href={h} className="transition hover:text-gold-300">{l}</a></li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Wishlist counter */}
          <a
            href="#produtos"
            className="relative grid h-11 w-11 place-items-center rounded-full text-gold-200 transition hover:bg-white/10"
            aria-label={`Wishlist: ${wishlist.length} items`}
          >
            <HeartFilledIcon width={18} height={18} />
            {wishlist.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-gold-400 text-[10px] font-bold text-cocoa-950">
                {wishlist.length > 9 ? '9+' : wishlist.length}
              </span>
            )}
          </a>

          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-gold hidden !px-5 !py-2.5 sm:inline-flex">
            <WhatsAppIcon width={16} height={16} /> Contact us
          </a>
          <button
            className="grid h-11 w-11 place-items-center rounded-full text-cream-100 md:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="glass mx-4 mt-2 rounded-3xl p-5 md:hidden" role="menu">
          <ul className="space-y-1 text-cream-100">
            {links.map(([h, l]) => (
              <li key={h} role="menuitem">
                <a href={h} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-base hover:bg-white/5 active:bg-white/10">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-gold mt-4 w-full sm:hidden">
            <WhatsAppIcon width={16} height={16} /> Contact us
          </a>
        </div>
      )}
    </header>
  );
}
