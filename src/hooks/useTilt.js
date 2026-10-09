import { useRef, useCallback } from 'react';

/** 3D tilt effect that follows the mouse, without React re-renders. */
export default function useTilt(max = 10) {
  const ref = useRef(null);
  const onMouseMove = useCallback((e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg)`;
  }, [max]);
  const onMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
  }, []);
  return { ref, onMouseMove, onMouseLeave, style: { transition: 'transform .35s ease-out', willChange: 'transform' } };
}
