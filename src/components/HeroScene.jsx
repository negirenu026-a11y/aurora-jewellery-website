import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import JewelryArt from './JewelryArt.jsx';

/** Interactive 3D ring: reflective gold, faceted gem, floating pearls, sparkles, floor glow, camera drift. */
export default function HeroScene() {
  const mount = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = mount.current;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch { setFailed(true); return; }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallScreen = window.innerWidth < 768;
    const pixelRatio = isSmallScreen ? Math.min(window.devicePixelRatio, 1.25) : Math.min(window.devicePixelRatio, 1.75);

    renderer.setPixelRatio(pixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    el.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block';

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
    camera.position.set(0, 0.5, 7.6);

    /* Lighting — key, rim, and warm fill */
    const key = new THREE.DirectionalLight(0xfff0d6, 2.5); key.position.set(3, 5, 4); scene.add(key);
    const rim = new THREE.PointLight(0xd4af7a, 35, 14); rim.position.set(-4, 1, -2); scene.add(rim);
    const fill = new THREE.PointLight(0xffe8c8, 8, 10); fill.position.set(2, -2, 3); scene.add(fill);

    /* Gold material — rich and reflective */
    const gold = new THREE.MeshStandardMaterial({
      color: 0xdcb583, metalness: 1, roughness: 0.12, envMapIntensity: 1.5,
    });

    /* Gem material — richer refraction and glow */
    const gemMat = new THREE.MeshPhysicalMaterial({
      color: 0xffd6e0, metalness: 0, roughness: 0.02, flatShading: true,
      transmission: 0.6, thickness: 1.4, ior: 2.42, clearcoat: 1,
      envMapIntensity: 2.8, emissive: 0x8a2040, emissiveIntensity: 0.22,
      specularIntensity: 1.2, specularColor: new THREE.Color(0xffd0e0),
    });

    const pearlMat = new THREE.MeshPhysicalMaterial({
      color: 0xf7efe3, roughness: 0.2, metalness: 0.1, clearcoat: 1,
      sheen: 1, sheenColor: new THREE.Color(0xffecd2),
    });

    /* Cut gem (revolved profile, 8 facets) */
    const profile = [[0, -0.55], [0.5, 0.02], [0.62, 0.1], [0.42, 0.3], [0, 0.3]]
      .map(([x, y]) => new THREE.Vector2(x, y));
    const gemGeo = new THREE.LatheGeometry(profile, 8);

    /* Ring group */
    const ring = new THREE.Group();
    ring.add(new THREE.Mesh(new THREE.TorusGeometry(1.25, 0.17, 64, 160), gold));
    const head = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.22, 0.32, 8), gold);
    head.position.y = 1.5; ring.add(head);
    const big = new THREE.Mesh(gemGeo, gemMat); big.position.y = 1.86; big.scale.setScalar(0.85); ring.add(big);
    [-0.5, -0.3, 0.3, 0.5].forEach((a) => {
      const g = new THREE.Mesh(gemGeo, gemMat);
      g.position.set(Math.sin(a) * 1.4, Math.cos(a) * 1.4, 0);
      g.rotation.z = -a; g.scale.setScalar(0.13); ring.add(g);
    });
    ring.rotation.x = 0.18;
    scene.add(ring);

    /* Floor glow — a soft radial disc below the ring */
    const floorGeo = new THREE.PlaneGeometry(6, 6);
    const floorMat = new THREE.MeshBasicMaterial({
      color: 0xd4af7a, transparent: true, opacity: 0.15,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.8;
    scene.add(floor);

    /* Floating pearls */
    const pearlCount = isSmallScreen ? 4 : 7;
    const pearls = Array.from({ length: pearlCount }, (_, i) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.08 + (i % 3) * 0.05, 24, 24), pearlMat);
      const a = (i / pearlCount) * Math.PI * 2;
      m.userData = { a, r: 2.3 + (i % 3) * 0.4, y: Math.sin(i * 1.7) * 1.1, s: 0.3 + i * 0.06 };
      scene.add(m); return m;
    });

    /* Sparkles (particles) */
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const cx = c.getContext('2d'); const gr = cx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,240,205,1)'); gr.addColorStop(1, 'rgba(255,240,205,0)');
    cx.fillStyle = gr; cx.fillRect(0, 0, 64, 64);
    const sprite = new THREE.CanvasTexture(c);
    const N = isSmallScreen ? 45 : 90;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 2 + Math.random() * 2.6, t = Math.random() * 6.28, p = Math.acos(2 * Math.random() - 1);
      pos.set([r * Math.sin(p) * Math.cos(t), r * Math.cos(p) * 0.8, r * Math.sin(p) * Math.sin(t)], i * 3);
    }
    const sGeo = new THREE.BufferGeometry(); sGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const sparkles = new THREE.Points(sGeo, new THREE.PointsMaterial({
      size: 0.14, map: sprite, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.85,
    }));
    scene.add(sparkles);

    /* Resize handler */
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = el;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
      if (reduce) renderer.render(scene, camera);
    };
    const ro = new ResizeObserver(resize); ro.observe(el); resize();

    /* Mouse tracking for interactive rotation */
    const target = { x: 0, y: 0 };
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    /* Pause when off-screen */
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(el);

    /* Render loop with gentle camera drift */
    const clock = new THREE.Clock(); let raf, ry = 0, rx = 0.18;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      const t = clock.getElapsedTime();

      // Gentle camera drift
      camera.position.x = Math.sin(t * 0.15) * 0.2;
      camera.position.y = 0.5 + Math.cos(t * 0.12) * 0.1;
      camera.lookAt(0, 0.3, 0);

      // Interactive ring rotation with mouse and auto-spin
      ry += (target.x * 0.6 + t * 0.35 - ry) * 0.04;
      rx += (0.18 + target.y * 0.25 - rx) * 0.05;
      ring.rotation.y = ry; ring.rotation.x = rx;
      ring.position.y = Math.sin(t * 0.9) * 0.08;

      // Floor glow pulse
      floorMat.opacity = 0.12 + Math.sin(t * 1.5) * 0.04;

      // Pearls orbit
      pearls.forEach((m) => {
        const { a, r, y, s } = m.userData;
        m.position.set(Math.cos(a + t * s) * r, y + Math.sin(t + a) * 0.15, Math.sin(a + t * s) * r * 0.6);
      });

      sparkles.rotation.y = t * 0.03;
      renderer.render(scene, camera);
    };
    if (!reduce) loop();

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      window.removeEventListener('pointermove', onMove);
      scene.traverse((o) => { o.geometry?.dispose(); });
      [gold, gemMat, pearlMat, floorMat, sparkles.material, sprite, envTex].forEach((m) => m.dispose());
      pmrem.dispose(); renderer.dispose(); renderer.domElement.remove();
    };
  }, []);

  if (failed) return <JewelryArt type="ring" gem="#D9577F" className="mx-auto h-full w-full max-w-md animate-floaty" />;
  return <div ref={mount} className="h-full w-full" role="img" aria-label="Interactive 3D gold ring with a gemstone" />;
}
