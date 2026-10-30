const hero = document.querySelector(".hero");
const mount = document.getElementById("fx");

// sin movimiento reducido: se queda la portada normal (sin canvas ni pin). React y three se cargan aparte para no retrasar el texto
if (hero && mount && !matchMedia("(prefers-reduced-motion:reduce)").matches) {
  Promise.all([import("react-dom/client"), import("./Hero.jsx")]).then(([{ createRoot }, { default: Hero }]) =>
    createRoot(mount).render(<Hero hero={hero} />));
}
