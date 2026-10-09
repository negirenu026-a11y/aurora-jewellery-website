import { useMemo } from 'react';
import { StoreProvider, useStore } from './context/StoreContext.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Collections from './components/Collections.jsx';
import Products from './components/Products.jsx';
import About from './components/About.jsx';
import Social from './components/Social.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';
import AdminPanel from './components/AdminPanel.jsx';

function Site() {
  const { setCategoryFilter } = useStore();
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Collections onSelect={setCategoryFilter} />
        <Products />
        <About />
        <Social />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

export default function App() {
  const isAdmin = useMemo(() => {
    try { return new URLSearchParams(window.location.search).get('admin') === '1'; }
    catch { return false; }
  }, []);

  return (
    <StoreProvider>
      {isAdmin ? <AdminPanel /> : <Site />}
    </StoreProvider>
  );
}
