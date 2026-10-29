const T = {
  en: {
    skip:"Skip to content","nav.about":"About","nav.refs":"References","nav.aria":"Main",
    "meta.title":"Javier Serrano · Java/Spring Backend",
    "meta.desc":"Java/Spring backend developer. Hexagonal architecture, REST APIs, integrations and 3 years of experience.",
    "hero.chips":"Main stack","nav.projects":"Projects","nav.stack":"Stack","nav.contact":"Contact",
    "hero.eyebrow":"Java Developer · Valencia · Open to offers","nav.exp":"Experience",
    "hero.lead":"Backend developer with 3 years of experience: from custom PHP CRMs to Java APIs with hexagonal architecture, integrations and REST endpoints.",
    "hero.cta1":"See projects","hero.cta2":"Email me","hero.cv":"Download CV",
    "about.h":"About me",
    "about.p1":"Software developer with backend experience, from custom CRM systems in PHP, JavaScript (jQuery) and MySQL to designing APIs under hexagonal architecture with object-oriented programming.",
    "about.p2":"I now develop in Java with Spring Boot: batch processes, REST endpoints and integrations with REST, SOAP and OAuth2 services. I work in Scrum teams.",
    "about.f1k":"Education","about.f1v":"Higher Vocational Web Dev · CIPFP Mislata (2024–26)","about.f2k":"Location","about.f2v":"Valencia, Spain",
    "about.f3k":"Environment","about.f3v":"Git · Maven · Docker · Linux","about.f4k":"Languages","about.f4v":"Spanish · English B1–B2",
    "exp.h":"Experience",
    "exp.1.role":"Java Developer","exp.1.date":"Jul 2026 – present","exp.1.desc":"Java development with Spring Boot across several backend layers.",
    "exp.1.l1":"Batch processes that consume REST and SOAP services, process the data and persist it in a database.",
    "exp.1.l2":"HTTP client with OAuth2 to consume an external API.",
    "exp.1.l3":"Migration of a service from SOAP to REST.",
    "exp.1.l4":"Forms and data-submission services in Angular on an existing application.",
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
    "proj.tm.desc":"Two Spring Boot backends talking over HTTP: an online store that charges cards against our own banking API, each with an Angular frontend. My part was mostly the backend.",
    "proj.tm.problem":"Organise each backend in layers with the domain at the centre, keep persistence and the HTTP client behind interfaces, and be able to test payments without the real bank.",
    "proj.tm.s1":"Bank: controller · usecase · domain · persistence layers, with use cases for card payment and transfer, JWT authentication and IBAN validation.",
    "proj.tm.s2":"Store: controller · domain · persistence layers plus an integration module (HTTP client and payment service against the bank); sessions with a Bearer token stored in the database.",
    "proj.tm.s3":"Both: repositories as domain interfaces implemented in persistence, hashed passwords (password4j) and Bean Validation.",
    "proj.tm.s4":"Flyway migrations, DAO tests against MariaDB with Testcontainers, and the store's payment tested with mocks.",
    "nav.ai":"AI",
    "ai.h":"Applied AI","ai.tag":"Agent system with Claude Code","ai.priv":"Private code · personal use",
    "ai.lead":"A system that automates my academic day-to-day with AI agents, and through which I learned to use AI with control: specifications, validation and clear limits.",
    "ai.c1":"What it does",
    "ai.c1.1":"Daily phone summary of deadlines and dates for each subject, written with Claude from the Moodle API, plus tasks in Google Calendar.",
    "ai.c1.2":"Prepares each task's environment (repo, material, brief) and generates notes with Anki cards.",
    "ai.c1.3":"Runs on its own with a systemd timer.",
    "ai.c2":"How I use AI",
    "ai.c2.1":"Specification-driven development: each task carries a brief and a verifiable acceptance checklist.",
    "ai.c2.2":"Agents specialised by workflow and by complexity level (search, writing, reasoning), with reusable skills.",
    "ai.c2.3":"Deterministic first: scripts check whatever can be checked and the model only judges what is semantic.",
    "ai.c3":"Safeguards",
    "ai.c3.1":"Publishing gate: automatic validation, an independent second validator agent (3 rounds max) and a pull request. The AI never pushes to main or merges its own work.",
    "ai.c3.2":"Credentials only in <code>.env</code>, outside git and logs; platform text is treated as untrusted (prompt injection).",
    "ai.c3.3":"Submitting assignments for me is outside the design.",
    "ai.env":"Replicable environment: all my projects share a global context for Claude Code, and a script clones and sets them up on a new PC.",
    "stack.h":"Stack","stack.tools":"Data & tools",
    "contact.h":"Let's talk","contact.p":"A project, an opportunity or a technical question? Write to me."
  }
};
const meta = document.querySelector('meta[name="description"]');
const es = { "meta.title": document.title, "meta.desc": meta.content };
document.querySelectorAll("[data-i18n]").forEach(e => es[e.dataset.i18n] = e.hasAttribute("data-html") ? e.innerHTML : e.textContent);
document.querySelectorAll("[data-i18n-aria]").forEach(e => es[e.dataset.i18nAria] = e.getAttribute("aria-label"));
T.es = es;
const btn = document.getElementById("lang");
function setLang(l){
  document.documentElement.lang = l;
  // innerHTML solo en claves marcadas con data-html: el texto sale de este diccionario, nunca de datos externos
  document.querySelectorAll("[data-i18n]").forEach(e => { const v = T[l][e.dataset.i18n]; if (v) e[e.hasAttribute("data-html") ? "innerHTML" : "textContent"] = v; });
  document.querySelectorAll("[data-i18n-aria]").forEach(e => e.setAttribute("aria-label", T[l][e.dataset.i18nAria]));
  document.title = T[l]["meta.title"]; meta.content = T[l]["meta.desc"];
  const next = l === "es" ? "en" : "es";
  btn.textContent = next.toUpperCase(); btn.lang = next; btn.title = next === "en" ? "Switch to English" : "Cambiar a español";
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
