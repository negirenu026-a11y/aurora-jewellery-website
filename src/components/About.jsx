import Reveal from './Reveal.jsx';

const values = [
  ['Certified 18k gold', 'Every piece carries the 750 hallmark and a certificate of authenticity.'],
  ['Gemstones from Brazil', 'Tourmalines, topazes and emeralds from mines and cooperatives with traceable origin.'],
  ['Handmade', 'Each piece passes through the hands of a single master, from wax model to final polish.'],
];

export default function About() {
  return (
    <section id="sobre" className="section overflow-hidden" style={{ background: 'radial-gradient(70% 80% at 20% 40%, #4A3326 0%, #21150F 60%, #150C08 100%)' }}>
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <div className="relative mx-auto grid h-64 w-64 place-items-center sm:h-[26rem] sm:w-[26rem] [perspective:1100px]" aria-hidden>
            <div className="absolute inset-6 rounded-full bg-gold-400/25 blur-3xl" />
            <div className="relative h-full w-full [transform-style:preserve-3d]" style={{ animation: 'spin3d 28s linear infinite' }}>
              {Array.from({ length: 7 }, (_, i) => (
                <div key={i} className="absolute inset-4 rounded-full border border-gold-300/70"
                  style={{ transform: `rotateY(${i * (180 / 7)}deg)`, boxShadow: '0 0 18px rgba(212,175,122,.35), inset 0 0 18px rgba(212,175,122,.2)' }} />
              ))}
              <div className="absolute inset-4 rounded-full border border-gold-200/60" style={{ transform: 'rotateX(90deg)' }} />
            </div>
            <div className="glass absolute -bottom-2 right-0 rounded-2xl px-5 py-4 text-center sm:right-4">
              <p className="font-display text-3xl text-gold-gradient">18k</p>
              <p className="text-xs text-cream-200/80">750 gold</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="h-display text-cream-50" style={{ fontSize: 'var(--fs-3xl)' }}>A Brazilian jeweller, through and through</h2>
          <p className="mt-6 max-w-xl leading-relaxed text-cream-200/80">
            Áurea was born in the workshop of a family of São Paulo jewellers, with the wish to show the world the richness of our country&rsquo;s gemstones. We design only a few pieces per collection, so each one keeps the character of a unique work.
          </p>
          <ul className="mt-10 space-y-4">
            {values.map(([t, d]) => (
              <li key={t} className="glass rounded-2xl p-5 transition-all duration-300 hover:border-gold-400/30">
                <h3 className="font-display text-xl text-gold-200">{t}</h3>
                <p className="mt-1 text-sm text-cream-200/75">{d}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
