import { useState, useMemo } from 'react';
import { categories } from '../config/site.js';
import { useStore } from '../context/StoreContext.jsx';
import ProductCard from './ProductCard.jsx';
import QuickViewModal from './QuickViewModal.jsx';
import Reveal from './Reveal.jsx';

export default function Products() {
  const { products, categoryFilter, setCategoryFilter } = useStore();
  const [quickView, setQuickView] = useState(null);

  const tabs = useMemo(() => [{ id: 'all', label: 'All' }, ...categories], []);
  const list = useMemo(
    () => categoryFilter === 'all' ? products : products.filter((p) => p.category === categoryFilter),
    [products, categoryFilter],
  );

  return (
    <section id="produtos" className="section bg-cream-50 text-cocoa-800">
      <div className="container-x">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="h-display text-cocoa-900" style={{ fontSize: 'var(--fs-3xl)' }}>Featured pieces</h2>
            <p className="mt-3 max-w-xl text-cocoa-600" style={{ fontSize: 'var(--fs-base)' }}>
              Tap &ldquo;Enquire&rdquo; to chat with our team on WhatsApp. The message is pre-filled for you.
            </p>
          </div>
          <div role="tablist" aria-label="Filter by category" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {tabs.map((t) => (
              <button key={t.id} role="tab" aria-selected={categoryFilter === t.id}
                onClick={() => setCategoryFilter(t.id)}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm transition ${
                  categoryFilter === t.id
                    ? 'border-cocoa-900 bg-cocoa-900 text-cream-50'
                    : 'border-gold-300 bg-white/50 text-cocoa-700 hover:border-gold-500'
                }`}>
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Product grid with fade-in on category change */}
        <div key={categoryFilter} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onQuickView={setQuickView} />
          ))}
        </div>
        {list.length === 0 && (
          <p className="mt-12 text-center text-cocoa-600">No pieces found in this category.</p>
        )}
        <p className="mt-8 text-center text-xs text-cocoa-600">
          {list.length} {list.length === 1 ? 'piece' : 'pieces'} · Prices subject to change. Every piece can be customised.
        </p>
      </div>

      {quickView && <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />}
    </section>
  );
}
