import { useEffect, useRef } from 'react';
import { categories, formatPrice, productMessage, whatsappLink } from '../config/site.js';
import { useStore } from '../context/StoreContext.jsx';
import JewelryArt from './JewelryArt.jsx';
import { CloseIcon, HeartFilledIcon, HeartIcon, WhatsAppIcon } from './Icons.jsx';

/** Keyboard-accessible quick-view modal for a product. Closes with Esc. */
export default function QuickViewModal({ product, onClose }) {
  const dialogRef = useRef(null);
  const { wishlist, toggleWishlist } = useStore();
  const isFav = wishlist.includes(product.id);
  const cat = categories.find((c) => c.id === product.category);

  /* Trap focus and close on Escape */
  useEffect(() => {
    const dialog = dialogRef.current;
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      // Trap focus inside modal
      if (e.key === 'Tab') {
        const focusable = dialog.querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);

    // Auto-focus close button
    const closeBtn = dialog.querySelector('[data-close]');
    if (closeBtn) closeBtn.focus();

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} role="dialog" aria-modal="true" aria-label={`Quick view: ${product.name}`}>
      <div ref={dialogRef} className="modal-content glass mx-4 w-full max-w-lg overflow-auto rounded-[2rem] p-0 sm:mx-0">
        {/* Image / illustration area */}
        <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-t-[2rem]"
          style={{ background: 'radial-gradient(70% 70% at 50% 40%, #FBF7F0 0%, #EADFC9 70%, #D9CAAE 100%)' }}>
          {product.image
            ? <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            : <JewelryArt type={cat?.art || 'ring'} gem={product.gem} className="h-[75%] drop-shadow-[0_14px_18px_rgba(74,51,38,.35)]" />
          }
          <button data-close onClick={onClose}
            className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-white/70 text-cocoa-800 backdrop-blur-sm transition hover:bg-white"
            aria-label="Close quick view">
            <CloseIcon />
          </button>
          <span className="glass-light absolute left-3 top-3 rounded-full px-3 py-1 text-xs text-cocoa-700">{cat?.singular}</span>
        </div>

        {/* Details */}
        <div className="space-y-4 p-6 sm:p-8">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="h-display text-2xl text-cream-50 sm:text-3xl">{product.name}</h3>
              <p className="mt-1 text-sm text-gold-300">{product.material}</p>
            </div>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full transition ${isFav ? 'text-red-400 hover:text-red-300' : 'text-cream-200/60 hover:text-gold-300'}`}
              aria-label={isFav ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            >
              {isFav ? <HeartFilledIcon width={22} height={22} /> : <HeartIcon width={22} height={22} />}
            </button>
          </div>

          <p className="text-sm leading-relaxed text-cream-200/80">{product.description}</p>

          <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4">
            <span className="font-display text-2xl text-cream-50">{formatPrice(product.price)}</span>
            <a href={whatsappLink(productMessage(product))} target="_blank" rel="noopener noreferrer"
              className="btn-gold !py-3 !px-6">
              <WhatsAppIcon width={18} height={18} /> Enquire
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
