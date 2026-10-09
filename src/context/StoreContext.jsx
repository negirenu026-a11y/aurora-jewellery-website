import { createContext, useContext, useMemo, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage.js';
import { products as defaultProducts, categories } from '../config/site.js';

const StoreContext = createContext(null);

/** Global store provider: products, wishlist, enquiries, and category filter — all localStorage-backed. */
export function StoreProvider({ children }) {
  // Seed products from config on first load, then read from storage
  const [products, setProducts] = useLocalStorage('products', defaultProducts);
  const [wishlist, setWishlist] = useLocalStorage('wishlist', []);
  const [enquiries, setEnquiries] = useLocalStorage('enquiries', []);
  const [categoryFilter, setCategoryFilter] = useLocalStorage('categoryFilter', 'all');

  const toggleWishlist = useCallback(
    (productId) =>
      setWishlist((prev) =>
        prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
      ),
    [setWishlist],
  );

  const addEnquiry = useCallback(
    (data) =>
      setEnquiries((prev) => [...prev, { ...data, timestamp: new Date().toISOString() }]),
    [setEnquiries],
  );

  const clearEnquiries = useCallback(() => setEnquiries([]), [setEnquiries]);

  /* Product CRUD */
  const addProduct = useCallback(
    (product) => setProducts((prev) => [...prev, { ...product, id: product.id || `custom-${Date.now()}` }]),
    [setProducts],
  );
  const updateProduct = useCallback(
    (id, patch) => setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p))),
    [setProducts],
  );
  const deleteProduct = useCallback(
    (id) => setProducts((prev) => prev.filter((p) => p.id !== id)),
    [setProducts],
  );
  const resetProducts = useCallback(() => setProducts(defaultProducts), [setProducts]);

  const value = useMemo(
    () => ({
      products, wishlist, enquiries, categoryFilter,
      setCategoryFilter, toggleWishlist, addEnquiry, clearEnquiries,
      addProduct, updateProduct, deleteProduct, resetProducts,
      categories,
    }),
    [products, wishlist, enquiries, categoryFilter, setCategoryFilter, toggleWishlist, addEnquiry, clearEnquiries, addProduct, updateProduct, deleteProduct, resetProducts],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>');
  return ctx;
}
