import { useEffect, useRef } from "react";
import * as THREE from "three";

const N = 6500;
const textRect = el => { const r = document.createRange(); r.selectNodeContents(el); return r.getBoundingClientRect(); };

// puntos del texto: se pinta el nombre en un canvas 2D y se muestrean los píxeles rellenos
function sampleText(text, font, spacing, w, h) {
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  const g = c.getContext("2d"); g.font = font; if ("letterSpacing" in g) g.letterSpacing = spacing;
  g.textAlign = "left"; // el texto empieza en el borde izquierdo, igual que el h1
  g.textBaseline = "middle"; g.fillStyle = "#fff";
  g.fillText(text, 0, h / 2);
  const d = g.getImageData(0, 0, w, h).data, pts = [];
  for (let y = 0; y < h; y += 2) for (let x = 0; x < w; x += 2) if (d[(y * w + x) * 4 + 3] > 128) pts.push(x, h / 2 - y);
  return pts;
}

const vert = `
uniform float uP, uT, uSize;
attribute vec2 aText; attribute vec2 aScat; attribute float aSeed;
varying float vA; varying float vC;
void main(){
  float e = smoothstep(0., 1., clamp(uP * 1.6 - aSeed * .6, 0., 1.));
  vec2 wob = vec2(sin(uT * .7 + aSeed * 40.), cos(uT * .6 + aSeed * 31.));
  vec2 pos = mix(aText + wob * 1.2, aScat + wob * 14., e);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 0., 1.);
  gl_PointSize = uSize * (1. + .8 * e * aSeed);
  vA = mix(1., .25 + .45 * aSeed, e); vC = aSeed;
}`;
const frag = `
uniform vec3 uA, uB; varying float vA; varying float vC;
void main(){
  float d = length(gl_PointCoord - .5); if (d > .5) discard;
  gl_FragColor = vec4(mix(uA, uB, vC), vA * smoothstep(.5, .15, d));
}`;

export default function Hero({ hero }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current, stick = hero.querySelector(".hero-stick"), h1 = hero.querySelector("h1");
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" }); } catch { return; }
    const dpr = Math.min(devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    const scene = new THREE.Scene(), cam = new THREE.OrthographicCamera(0, 1, 1, 0, -1, 1);
    const css = getComputedStyle(document.documentElement);
    const col = v => new THREE.Color(css.getPropertyValue(v).trim() || "#38bdf8");
    const mat = new THREE.ShaderMaterial({
      vertexShader: vert, fragmentShader: frag, transparent: true, depthTest: false,
      uniforms: { uP: { value: 0 }, uT: { value: 0 }, uSize: { value: 2.2 * dpr }, uA: { value: col("--cyan") }, uB: { value: col("--violet") } },
    });
    let points, W = 0, H = 0, w0 = 0;

    function build() {
      const r = stick.getBoundingClientRect(), hr = textRect(h1), cs = getComputedStyle(h1);
      W = r.width; H = r.height; w0 = W;
      renderer.setSize(W, H, false);
      cam.left = -W / 2; cam.right = W / 2; cam.top = H / 2; cam.bottom = -H / 2; cam.updateProjectionMatrix();
      const fs = parseFloat(cs.fontSize), text = "Javier Serrano.";
      const SW = Math.ceil(hr.width * 1.15), SH = Math.ceil(fs * 1.5);
      const raw = sampleText(text, `${cs.fontWeight} ${fs}px ${cs.fontFamily}`, cs.letterSpacing, SW, SH);
      const cx = hr.left - r.left - W / 2, cy = H / 2 - (hr.top - r.top + hr.height / 2);
      const n = Math.min(N, raw.length / 2), tx = new Float32Array(n * 2), sc = new Float32Array(n * 2), sd = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        const k = Math.floor(Math.random() * (raw.length / 2)) * 2;
        tx[i * 2] = raw[k] + cx; tx[i * 2 + 1] = raw[k + 1] + cy;
        sc[i * 2] = (Math.random() - .5) * W * 1.1; sc[i * 2 + 1] = (Math.random() - .5) * H * 1.1; sd[i] = Math.random();
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
      g.setAttribute("aText", new THREE.BufferAttribute(tx, 2));
      g.setAttribute("aScat", new THREE.BufferAttribute(sc, 2));
      g.setAttribute("aSeed", new THREE.BufferAttribute(sd, 1));
      if (points) { scene.remove(points); points.geometry.dispose(); }
      points = new THREE.Points(g, mat); points.frustumCulled = false; scene.add(points);
    }

    let p = 0, raf = 0, visible = true, t0 = performance.now();
    function target() { const span = hero.offsetHeight - innerHeight; return span > 0 ? Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / span)) : 0; }
    function frame() {
      raf = 0;
      p += (target() - p) * .18; // suaviza el avance para que no vaya a saltos
      hero.style.setProperty("--p", p.toFixed(4));
      hero.classList.toggle("late", p > .5);
      mat.uniforms.uP.value = p; mat.uniforms.uT.value = (performance.now() - t0) / 1000;
      renderer.render(scene, cam);
      if (visible) raf = requestAnimationFrame(frame);
    }
    const start = () => { if (!raf) raf = requestAnimationFrame(frame); };

    let ro, io;
    document.fonts.ready.then(() => {
      build(); hero.classList.add("fx-on"); start();
      // solo se reconstruye si cambia el ancho (la barra de Safari cambia el alto al hacer scroll)
      ro = new ResizeObserver(() => { if (Math.abs(stick.getBoundingClientRect().width - w0) > 1) build(); }); ro.observe(stick);
      io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }); io.observe(hero);
    });
    return () => { cancelAnimationFrame(raf); ro?.disconnect(); io?.disconnect(); hero.classList.remove("fx-on", "late"); renderer.dispose(); };
  }, [hero]);

  return <canvas ref={ref} aria-hidden="true" />;
}
