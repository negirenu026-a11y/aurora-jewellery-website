import { useStore } from '../context/StoreContext.jsx';
import useTilt from '../hooks/useTilt.js';
import JewelryArt from './JewelryArt.jsx';
import Reveal from './Reveal.jsx';
import { ArrowIcon } from './Icons.jsx';

function CollectionCard({ cat, onSelect, delay, count }) {
  const tilt = useTilt(9);
  return (
    <Reveal delay={delay}>
      <a href="#produtos" onClick={() => onSelect(cat.id)} className="group block [perspective:900px]">
        <div {...tilt} className="relative overflow-hidden rounded-[2rem] border border-gold-300/40 p-6 text-cocoa-800 transition-shadow duration-300 hover:shadow-[0_0_30px_-6px_rgba(212,175,122,.2)]"
          style={{ ...tilt.style, background: 'linear-gradient(160deg, #FBF7F0 0%, #EADFC9 100%)', boxShadow: '0 30px 60px -30px rgba(74,51,38,.5)' }}>
          <div className="absolute inset-x-10 top-6 h-40 rounded-full bg-gold-300/40 blur-3xl transition group-hover:bg-gold-400/60" />
          <JewelryArt type={cat.art} gem="#D9577F" className="relative mx-auto h-40 w-40 drop-shadow-[0_18px_18px_rgba(74,51,38,.35)] transition duration-500 group-hover:scale-110 sm:h-48 sm:w-48" />
          <h3 className="h-display relative mt-4 text-2xl sm:text-3xl">{cat.label}</h3>
          <p className="relative mt-2 text-sm leading-relaxed text-cocoa-600">{cat.blurb}</p>
          <span className="relative mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold-600">
            View {count} pieces <ArrowIcon className="transition group-hover:translate-x-1" />
          </span>
        </div>
      </a>
    </Reveal>
  );
}

export default function Collections({ onSelect }) {
  const { products, categories } = useStore();
  return (
    <section id="colecoes" className="section bg-cream-100 text-cocoa-800">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="h-display text-cocoa-900" style={{ fontSize: 'var(--fs-3xl)' }}>
            Four collections, one handcrafted standard of care
          </h2>
          <p className="mt-4 text-cocoa-600">Browse by category and discover pieces made to gift, or to mark a moment of your own.</p>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <CollectionCard
              key={c.id} cat={c} onSelect={onSelect} delay={i * 90}
              count={products.filter((p) => p.category === c.id).length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
