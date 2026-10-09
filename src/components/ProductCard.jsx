import { categories, formatPrice, productMessage, whatsappLink } from '../config/site.js';
import { useStore } from '../context/StoreContext.jsx';
import useTilt from '../hooks/useTilt.js';
import JewelryArt from './JewelryArt.jsx';
import { EyeIcon, HeartFilledIcon, HeartIcon, WhatsAppIcon } from './Icons.jsx';

export default function ProductCard({ product, onQuickView, index = 0 }) {
  const tilt = useTilt(7);
  const cat = categories.find((c) => c.id === product.category);
  const { wishlist, toggleWishlist } = useStore();
  const isFav = wishlist.includes(product.id);

  return (
    <article className="product-grid-enter" style={{ animationDelay: `${index * 60}ms` }}>
      <div {...tilt} className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-gold-300/40 bg-white/60 backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_0_30px_-6px_rgba(212,175,122,.25)]"
        style={{ ...tilt.style, boxShadow: '0 26px 50px -30px rgba(74,51,38,.55), inset 0 1px 0 rgba(255,255,255,.9)' }}>

        {/* Image area */}
        <div className="relative grid aspect-[4/3] place-items-center overflow-hidden"
          style={{ background: 'radial-gradient(70% 70% at 50% 40%, #FBF7F0 0%, #EADFC9 70%, #D9CAAE 100%)' }}>
          {product.image
            ? <img src={product.image} alt={product.name} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            : <JewelryArt type={cat?.art || 'ring'} gem={product.gem || '#D9577F'} className="h-[78%] drop-shadow-[0_14px_14px_rgba(74,51,38,.35)] transition duration-500 group-hover:-translate-y-1 group-hover:scale-110" />}
          <span className="glass-light absolute left-3 top-3 rounded-full px-3 py-1 text-xs text-cocoa-700">{cat?.singular || 'Piece'}</span>

          {/* Wishlist & Quick-view overlay */}
          <div className="absolute right-2 top-2 flex flex-col gap-1.5">
            <button
              onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
              className={`grid h-10 w-10 place-items-center rounded-full bg-white/80 backdrop-blur-sm transition hover:scale-110 ${isFav ? 'text-red-500' : 'text-cocoa-600 hover:text-red-400'}`}
              aria-label={isFav ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            >
              {isFav ? <HeartFilledIcon width={17} height={17} /> : <HeartIcon width={17} height={17} />}
            </button>
            {onQuickView && (
              <button
                onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/80 text-cocoa-600 backdrop-blur-sm transition hover:scale-110 hover:text-cocoa-900"
                aria-label={`Quick view: ${product.name}`}
              >
                <EyeIcon width={17} height={17} />
              </button>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="h-display text-xl text-cocoa-900 sm:text-2xl">{product.name}</h3>
          <p className="mt-1 text-xs text-gold-600">{product.material}</p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-cocoa-600">{product.description}</p>
          <div className="mt-5 flex items-center justify-between gap-3">
            <span className="font-display text-xl text-cocoa-900">{formatPrice(product.price)}</span>
            <a href={whatsappLink(productMessage(product))} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-cocoa-900 px-4 py-2.5 text-sm text-cream-50 transition hover:bg-[#1f9d55] hover:shadow-lg"
              aria-label={`Enquire about ${product.name} on WhatsApp`}>
              <WhatsAppIcon width={16} height={16} /> Enquire
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
