import { useId } from 'react';

/** Vector illustrations of jewellery (ring, necklace, earrings, bracelet). Light and crisp on any screen. */
export default function JewelryArt({ type = 'ring', gem = '#D9577F', className = '' }) {
  const id = useId().replace(/:/g, '');
  const gold = `g${id}`, gm = `m${id}`, shine = `s${id}`;

  const Gem = ({ d, ...p }) => (
    <g {...p}>
      <path d={d} fill={`url(#${gm})`} stroke="#fff" strokeOpacity=".55" strokeWidth=".8" />
      <path d={d} fill={`url(#${shine})`} />
    </g>
  );

  const art = {
    ring: (
      <>
        <ellipse cx="100" cy="128" rx="54" ry="52" fill="none" stroke={`url(#${gold})`} strokeWidth="10" />
        <ellipse cx="100" cy="128" rx="48" ry="46" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="1.2" />
        <path d="M84 78h32l8 12H76z" fill={`url(#${gold})`} />
        <Gem d="M80 44h40l12 16-32 34-32-34z" />
        <path d="M80 44l20 50M120 44l-20 50M68 60h64M90 44l-4 16 14 34M110 44l4 16-14 34" stroke="#fff" strokeOpacity=".5" strokeWidth=".9" fill="none" />
      </>
    ),
    necklace: (
      <>
        <path d="M28 34Q100 196 172 34" fill="none" stroke={`url(#${gold})`} strokeWidth="3.5" strokeDasharray="5 2.5" strokeLinecap="round" />
        <path d="M28 34Q100 196 172 34" fill="none" stroke="#fff" strokeOpacity=".3" strokeWidth=".8" />
        <circle cx="100" cy="118" r="5" fill="none" stroke={`url(#${gold})`} strokeWidth="3" />
        <path d="M100 126c-20 22-24 44 0 54 24-10 20-32 0-54z" fill={`url(#${gold})`} />
        <Gem d="M100 134c-14 17-17 33 0 41 17-8 14-24 0-41z" />
      </>
    ),
    earrings: [62, 138].map((x) => (
      <g key={x}>
        <circle cx={x} cy="42" r="7" fill={`url(#${gold})`} />
        <path d={`M${x} 49v22`} stroke={`url(#${gold})`} strokeWidth="3" />
        <path d={`M${x - 20} 100l20-30 20 30-20 62z`} fill={`url(#${gold})`} />
        <Gem d={`M${x - 14} 100l14-21 14 21-14 46z`} />
      </g>
    )),
    bracelet: (
      <g transform="rotate(-14 100 100)">
        <ellipse cx="100" cy="100" rx="72" ry="36" fill="none" stroke={`url(#${gold})`} strokeWidth="11" />
        <ellipse cx="100" cy="100" rx="72" ry="36" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="1" />
        {Array.from({ length: 7 }, (_, i) => {
          const a = (Math.PI / 8) * (i + 0.5) + 0.02;
          const cx = 100 + 72 * Math.cos(a), cy = 100 + 36 * Math.sin(a);
          return (<g key={i}>
            <circle cx={cx} cy={cy} r="9" fill={`url(#${gold})`} />
            <circle cx={cx} cy={cy} r="5.5" fill={`url(#${gm})`} stroke="#fff" strokeOpacity=".6" strokeWidth=".7" />
          </g>);
        })}
      </g>
    ),
  };

  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label={`Illustration of ${type}`}>
      <defs>
        <linearGradient id={gold} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F8EBCB" /><stop offset=".45" stopColor="#D4AF7A" /><stop offset=".75" stopColor="#B88A48" /><stop offset="1" stopColor="#8E6A31" />
        </linearGradient>
        <linearGradient id={gm} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" /><stop offset=".45" stopColor={gem} /><stop offset="1" stopColor={gem} stopOpacity=".55" />
        </linearGradient>
        <linearGradient id={shine} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".7" /><stop offset=".4" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {art[type]}
    </svg>
  );
}
