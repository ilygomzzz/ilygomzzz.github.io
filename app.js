const T = {
  en: {
    skip:"Skip to content","nav.about":"About","nav.projects":"Projects","nav.stack":"Stack","nav.contact":"Contact",
    "hero.eyebrow":"Java Developer · Valencia","nav.exp":"Experience",
    "hero.lead":"Backend developer with 3 years of experience: from custom PHP CRMs to Java APIs with hexagonal architecture, integrations and REST endpoints.",
    "hero.cta1":"See projects","hero.cta2":"Email me","hero.cv":"Download CV",
    "about.h":"About me",
    "about.p1":"Software developer with backend experience, from custom CRM systems in PHP, JavaScript (jQuery) and MySQL to designing APIs under hexagonal architecture with object-oriented programming.",
    "about.p2":"I now develop in Java across several backend layers: REST endpoints, integrations and other ecosystem components. I work in agile environments with Scrum and collaborate on product projects.",
    "about.f1k":"Education","about.f1v":"Higher Vocational Web Dev · CIPFP Mislata (2024–26)","about.f2k":"Location","about.f2v":"Valencia, Spain",
    "about.f3k":"Environment","about.f3v":"Linux (Arch) · Git · Maven",
    "exp.h":"Experience",
    "exp.1.role":"Java Developer","exp.1.date":"Jun 2026 – present","exp.1.desc":"Java development across several backend layers: REST endpoints, integrations and ecosystem components, in an agile Scrum team.",
    "exp.2.role":"Backend Developer · internship","exp.2.date":"Apr – Jun 2026","exp.2.desc":"Ticketing, access control and cashless platform team, in production during real events. Over thirty tasks closed in three months.",
    "exp.2.l1":"Evolutions of the cashless backend panel: top-ups and balance packs, products and taxes, capacity and role permissions.",
    "exp.2.l2":"Designed and built integration endpoints (capacity, access, events per promoter) with the mobile teams consuming them.",
    "exp.2.l3":"Validated the migration of image storage from EC2 to Amazon S3 through an interface abstraction.",
    "exp.2.l4":"Automatic alert for overlapping time slots, fixing the cause rather than the symptom.",
    "exp.2.l5":"Panel internationalisation, documentation, code review and technical support during events.",
    "ref.h":"References",
    "ref.q1":"He took on real product work very early and closed more than thirty tasks in just three months.",
    "ref.q2":"His autonomy, reliability and judgement: he asked why things were done and proposed alternatives instead of executing the first solution.",
    "ref.q3":"Any organisation that hires him will gain a serious, capable professional with a lot of road ahead.",
    "ref.cap":"· Recommendation letter, September 2026. Available on request.",
    "exp.3.role":"Web Developer","exp.3.date":"Jul 2023 – Oct 2025","exp.3.desc":"Features for custom CRM systems with PHP, JavaScript (jQuery) and MySQL, delivering each project's requirements.",
    "proj.h":"Projects","proj.problem":"Challenge","proj.solution":"Solution",
    "proj.tm.tag":"Bank + store · team project","proj.tm.priv":"Open source · team project",
    "proj.tm.desc":"Two Spring Boot backends talking over HTTP: an online store that charges cards against our own banking API, each with an Angular frontend.",
    "proj.tm.problem":"Keep the domain apart from infrastructure so the database or HTTP client can change without touching business rules, and test payments without the real bank.",
    "proj.tm.s1":"controller · usecase · domain · persistence layers, with repositories as domain interfaces.",
    "proj.tm.s2":"JWT authentication, hashed passwords (password4j) and input validation.",
    "proj.tm.s3":"Flyway migrations and integration tests with Testcontainers (MariaDB).",
    "proj.tm.s4":"Dedicated integration module in the store for payments and the HTTP client, isolated and testable.",
    "proj.sud.tag":"My first steps in programming",
    "proj.sud.desc":"A text-based role-playing game in Bash (about 2,500 lines): a world with zones, enemies and loot stored in SQLite, ASCII art and music. The published code is an earlier version; the final one was lost.",
    "proj.auto.h":"Personal automation","proj.auto.priv":"Personal use",
    "proj.auto.desc":"Scripts and tools that save me work: task summaries and alerts, calendar sync, and a notes vault replicable on any machine with one script.",
    "stack.h":"Stack","stack.tools":"Data & tools",
    "contact.h":"Let's talk","contact.p":"A project, an opportunity or a technical question? Write to me."
  }
};
const es = {};
document.querySelectorAll("[data-i18n]").forEach(e => es[e.dataset.i18n] = e.textContent);
T.es = es;
const btn = document.getElementById("lang");
function setLang(l){
  document.documentElement.lang = l;
  document.querySelectorAll("[data-i18n]").forEach(e => { const v = T[l][e.dataset.i18n]; if (v) e.textContent = v; });
  btn.textContent = l === "es" ? "EN" : "ES";
  try { localStorage.setItem("lang", l); } catch {}
}
let saved; try { saved = localStorage.getItem("lang"); } catch {}
const start = saved || (navigator.language.startsWith("es") ? "es" : "en");
if (start !== "es") setLang(start);
btn.onclick = () => setLang(document.documentElement.lang === "es" ? "en" : "es");

// especular de cristal que sigue al puntero
document.addEventListener("pointermove", e => {
  const g = e.target.closest?.(".glass"); if (!g) return;
  const r = g.getBoundingClientRect();
  g.style.setProperty("--mx", (e.clientX - r.left) + "px"); g.style.setProperty("--my", (e.clientY - r.top) + "px");
});

// aparición al hacer scroll
const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: .12 });
document.querySelectorAll(".card,h2").forEach(e => { e.classList.add("reveal"); io.observe(e); });
