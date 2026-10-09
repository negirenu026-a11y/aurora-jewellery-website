import { useMemo } from 'react';
import { siteConfig } from '../config/site.js';
import { useStore } from '../context/StoreContext.jsx';
import JewelryArt from './JewelryArt.jsx';
import Reveal from './Reveal.jsx';
import { FacebookIcon, InstagramIcon } from './Icons.jsx';

const arts = { rings: 'ring', necklaces: 'necklace', earrings: 'earrings', bracelets: 'bracelet' };

export default function Social() {
  const { instagram, facebook } = siteConfig.social;
  const { products } = useStore();

  // Pick 6 tiles from available products
  const tiles = useMemo(() => {
    const picks = [0, 4, 7, 10, 2, 3];
    return picks.map((i) => products[i % products.length]).filter(Boolean);
  }, [products]);

  return (
    <section id="social" className="section bg-cream-100 text-cocoa-800">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="h-display text-cocoa-900" style={{ fontSize: 'var(--fs-3xl)' }}>Follow Áurea on social media</h2>
          <p className="mt-4 text-cocoa-600">New launches, behind-the-scenes from the workshop and styling inspiration with our jewellery.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={instagram.url} target="_blank" rel="noopener noreferrer" className="btn-gold"><InstagramIcon /> {instagram.handle}</a>
            <a href={facebook.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-cocoa-900/30 px-7 py-3.5 text-sm font-medium text-cocoa-900 transition hover:bg-cocoa-900 hover:text-cream-50"><FacebookIcon /> Facebook</a>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {tiles.map((p, i) => (
            <a key={p.id + i} href={instagram.url} target="_blank" rel="noopener noreferrer" aria-label={`View on Instagram: ${p.name}`}
              className="group relative grid aspect-square place-items-center overflow-hidden rounded-2xl"
              style={{ background: i % 2 ? 'linear-gradient(160deg,#4A3326,#21150F)' : 'linear-gradient(160deg,#FBF7F0,#E0C48F)' }}>
              <JewelryArt type={arts[p.category] || 'ring'} gem={p.gem || '#D9577F'} className="h-3/4 transition duration-500 group-hover:scale-110" />
              <span className="absolute inset-0 grid place-items-center bg-cocoa-950/60 opacity-0 transition group-hover:opacity-100">
                <InstagramIcon width={30} height={30} className="text-gold-200" />
              </span>
            </a>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-cocoa-600">To show your real Instagram feed, see the &ldquo;Social media&rdquo; section of the README.</p>

        {facebook.embed && (
          <div className="mt-12 flex justify-center">
            <iframe title="Áurea on Facebook" loading="lazy" width="340" height="500" style={{ border: 0, overflow: 'hidden' }}
              src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(facebook.url)}&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`}
              allow="encrypted-media" />
          </div>
        )}
      </div>
    </section>
  );
}
