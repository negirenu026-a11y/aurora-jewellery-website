import { lazy, Suspense } from 'react';
import { siteConfig, whatsappLink } from '../config/site.js';
import { ArrowIcon, WhatsAppIcon } from './Icons.jsx';
import JewelryArt from './JewelryArt.jsx';

const HeroScene = lazy(() => import('./HeroScene.jsx'));

export default function Hero() {
  return (
    <section id="inicio" className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28"
      style={{
        background: 'radial-gradient(80% 70% at 72% 45%, #4A3326 0%, #21150F 55%, #150C08 100%)',
        paddingLeft: 'clamp(1.25rem, 4vw, 2rem)',
        paddingRight: 'clamp(1.25rem, 4vw, 2rem)',
      }}>

      {/* Gold glow accent */}
      <div className="pointer-events-none absolute -right-24 top-1/4 -z-10 h-[34rem] w-[34rem] rounded-full bg-gold-400/20 blur-[120px]" />
      <div className="pointer-events-none absolute -left-32 bottom-1/3 -z-10 h-[20rem] w-[20rem] rounded-full bg-gold-400/10 blur-[100px]" />

      <div className="container-x grid items-center gap-6 lg:grid-cols-[1.05fr_1fr]">
        <div className="relative z-10 order-2 lg:order-1">
          <p className="mb-5 text-sm tracking-widest text-gold-300/90 uppercase">18k gold · Brazilian gemstones · Handmade</p>
          <h1 className="h-display text-gold-gradient" style={{ fontSize: 'var(--fs-hero)' }}>
            Jewellery that holds the brilliance of Brazil.
          </h1>
          <p className="mt-6 max-w-lg leading-relaxed text-cream-200/80" style={{ fontSize: 'var(--fs-lg)' }}>
            Signature pieces in 18k gold with tourmalines, topazes and emeralds, cut by master jewellers. Every piece is made to last for generations.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#colecoes" className="btn-gold">Explore collection <ArrowIcon /></a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-ghost"><WhatsAppIcon /> Chat on WhatsApp</a>
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            {['Certificate of authenticity', 'Gift packaging', 'Insured shipping'].map((t) => (
              <span key={t} className="glass rounded-full px-4 py-2 text-xs text-cream-200/90">{t}</span>
            ))}
          </div>
        </div>

        <div className="relative order-1 mx-auto h-[20rem] w-full max-w-xl sm:h-[28rem] lg:order-2 lg:h-[38rem]">
          <Suspense fallback={
            <div className="flex h-full w-full items-center justify-center">
              <JewelryArt type="ring" gem="#D9577F" className="mx-auto h-full w-full max-w-sm animate-floaty opacity-90" />
            </div>
          }>
            <HeroScene />
          </Suspense>
        </div>
      </div>

      <div className="shimmer-line absolute bottom-0 left-0 h-px w-full" aria-hidden />
    </section>
  );
}
