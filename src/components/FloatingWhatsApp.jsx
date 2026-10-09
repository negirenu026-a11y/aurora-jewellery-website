import { whatsappLink } from '../config/site.js';
import { WhatsAppIcon } from './Icons.jsx';

export default function FloatingWhatsApp() {
  return (
    <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
      className="fixed right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,.7)] transition hover:scale-110"
      style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}>
      <WhatsAppIcon width={28} height={28} />
    </a>
  );
}
