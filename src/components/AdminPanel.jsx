import { useState } from 'react';
import { categories, gems } from '../config/site.js';
import { useStore } from '../context/StoreContext.jsx';
import { EditIcon, PlusIcon, ResetIcon, TrashIcon } from './Icons.jsx';

const field = 'mt-1 w-full rounded-lg border border-cocoa-600/30 bg-cream-50 px-3 py-2.5 text-cocoa-900 text-sm focus:border-gold-400 focus:outline-none';

const emptyProduct = { name: '', category: 'rings', material: '', price: '', description: '', image: '', gem: gems.tourmaline };

/** Demo admin panel, reached at /?admin=1 */
export default function AdminPanel() {
  const { products, enquiries, addProduct, updateProduct, deleteProduct, resetProducts, clearEnquiries } = useStore();
  const [tab, setTab] = useState('products');
  const [editing, setEditing] = useState(null); // null | 'new' | product id
  const [form, setForm] = useState(emptyProduct);

  const startEdit = (p) => {
    setEditing(p.id);
    setForm({ ...p, price: p.price ?? '' });
  };
  const startNew = () => {
    setEditing('new');
    setForm(emptyProduct);
  };
  const cancel = () => { setEditing(null); setForm(emptyProduct); };

  const save = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      price: form.price === '' ? null : Number(form.price),
      id: editing === 'new' ? `custom-${Date.now()}` : editing,
    };
    if (editing === 'new') addProduct(data);
    else updateProduct(editing, data);
    cancel();
  };

  const tabs = [
    { id: 'products', label: `Products (${products.length})` },
    { id: 'enquiries', label: `Enquiries (${enquiries.length})` },
  ];

  return (
    <div className="min-h-screen bg-cream-50 text-cocoa-900">
      {/* Header */}
      <header className="border-b border-gold-300/30 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl text-gold-gradient font-medium">Áurea Admin</h1>
            <p className="text-xs text-cocoa-600">Demo admin: data is stored only in this browser</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { resetProducts(); }} className="inline-flex items-center gap-2 rounded-full border border-cocoa-900/20 px-4 py-2 text-sm transition hover:bg-cocoa-900 hover:text-cream-50">
              <ResetIcon width={16} height={16} /> Reset demo data
            </button>
            <a href="/" className="rounded-full bg-cocoa-900 px-4 py-2 text-sm text-cream-50 transition hover:bg-cocoa-800">
              ← Back to site
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-8">
        {/* Tabs */}
        <div className="flex gap-2 border-b border-gold-300/20 pb-3">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                tab === t.id ? 'bg-cocoa-900 text-cream-50' : 'text-cocoa-700 hover:bg-cocoa-900/10'
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Products tab ── */}
        {tab === 'products' && (
          <div className="mt-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-xl">Product catalogue</h2>
              <button onClick={startNew} className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-4 py-2 text-sm font-medium text-cocoa-950 transition hover:bg-gold-300">
                <PlusIcon width={16} height={16} /> Add product
              </button>
            </div>

            {/* Edit / Add form */}
            {editing !== null && (
              <form onSubmit={save} className="mb-8 rounded-2xl border border-gold-300/30 bg-white p-5 shadow-sm">
                <h3 className="font-display text-lg mb-4">{editing === 'new' ? 'New product' : 'Edit product'}</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-xs text-cocoa-600">Name *
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} />
                  </label>
                  <label className="text-xs text-cocoa-600">Category
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={field}>
                      {categories.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                  </label>
                  <label className="text-xs text-cocoa-600">Material
                    <input value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} className={field} placeholder="e.g. 18k gold · Emerald" />
                  </label>
                  <label className="text-xs text-cocoa-600">Price (BRL, blank = &ldquo;on request&rdquo;)
                    <input type="number" min="0" step="1" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={field} />
                  </label>
                  <label className="text-xs text-cocoa-600 sm:col-span-2">Description
                    <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className={field} />
                  </label>
                  <label className="text-xs text-cocoa-600 sm:col-span-2">Image URL (blank = uses illustration)
                    <input type="url" value={form.image || ''} onChange={(e) => setForm({ ...form, image: e.target.value || null })} className={field} placeholder="https://…" />
                  </label>
                </div>
                <div className="mt-5 flex gap-2">
                  <button type="submit" className="rounded-full bg-cocoa-900 px-5 py-2 text-sm text-cream-50 transition hover:bg-cocoa-800">
                    {editing === 'new' ? 'Add' : 'Save'}
                  </button>
                  <button type="button" onClick={cancel} className="rounded-full border border-cocoa-900/20 px-5 py-2 text-sm transition hover:bg-cocoa-900/5">
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Product list */}
            <div className="space-y-2">
              {products.map((p) => (
                <div key={p.id} className="flex items-center gap-4 rounded-xl border border-gold-300/20 bg-white px-4 py-3 transition hover:border-gold-300/40">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-cream-100 grid place-items-center text-xs text-cocoa-600">
                    {p.image ? '📷' : '💎'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{p.name}</p>
                    <p className="text-xs text-cocoa-600 truncate">{p.material} · {p.price ? `R$ ${p.price}` : 'On request'}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => startEdit(p)} className="grid h-9 w-9 place-items-center rounded-lg text-cocoa-600 transition hover:bg-gold-300/20 hover:text-cocoa-900"
                      aria-label={`Edit ${p.name}`}>
                      <EditIcon width={16} height={16} />
                    </button>
                    <button onClick={() => { if (window.confirm(`Delete "${p.name}"?`)) deleteProduct(p.id); }}
                      className="grid h-9 w-9 place-items-center rounded-lg text-cocoa-600 transition hover:bg-red-100 hover:text-red-600"
                      aria-label={`Delete ${p.name}`}>
                      <TrashIcon width={16} height={16} />
                    </button>
                  </div>
                </div>
              ))}
              {products.length === 0 && <p className="py-8 text-center text-cocoa-600">No products. Click &ldquo;Reset demo data&rdquo; to restore defaults.</p>}
            </div>
          </div>
        )}

        {/* ── Enquiries tab ── */}
        {tab === 'enquiries' && (
          <div className="mt-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-xl">Saved enquiries</h2>
              {enquiries.length > 0 && (
                <button onClick={() => { if (window.confirm('Clear all enquiries?')) clearEnquiries(); }}
                  className="inline-flex items-center gap-2 rounded-full border border-red-300 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50">
                  <TrashIcon width={14} height={14} /> Clear all
                </button>
              )}
            </div>
            {enquiries.length === 0 && <p className="py-8 text-center text-cocoa-600">No enquiries saved yet. Submit the contact form to see them here.</p>}
            <div className="space-y-3">
              {enquiries.map((eq, i) => (
                <div key={i} className="rounded-xl border border-gold-300/20 bg-white p-4">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-medium text-sm">{eq.name}</p>
                    <p className="text-xs text-cocoa-600">{eq.timestamp ? new Date(eq.timestamp).toLocaleString() : '—'}</p>
                  </div>
                  <p className="mt-1 text-xs text-cocoa-600">Contact: {eq.contact} · Interested in: {eq.interest}</p>
                  <p className="mt-2 text-sm text-cocoa-700">{eq.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
