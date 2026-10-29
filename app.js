const T = {
  en: {
    skip:"Skip to content","nav.aria":"Main","nav.about":"About","nav.exp":"Experience","nav.projects":"Projects","nav.ai":"AI","nav.contact":"Contact",
    "meta.title":"Javier Serrano · Java/Spring Backend",
    "meta.desc":"Java/Spring backend developer with three years of experience: REST APIs, integrations and systems that cannot go down.",
    "hero.eyebrow":"Valencia · Open to offers",
    "hero.tagline":"I do backend in Java. I try to keep it up in production.",
    "hero.lead":"Three years of backend: I started with PHP and jQuery on custom CRMs and now write Java with Spring Boot. I like clear APIs and tests that fail before production does.",
    "hero.cta1":"See projects","hero.cv":"Download CV",
    "about.h":"Who I am",
    "about.p1":"I started on a custom CRM with PHP, jQuery and MySQL. Today I write Java with Spring Boot at Adding: batch processes, REST endpoints and integrations with REST, SOAP and OAuth2 services.",
    "about.p2":"In between: a networking course, a web development one, and an internship on a ticketing system serving live events. That's where I learned what a system that can't go down in the middle of an event looks like.",
    "about.p3":"Outside work I automate whatever I can and run my own Arch Linux. Yes, on purpose.",
    "about.f1k":"Education","about.f1v":"Higher Vocational Web Dev · CIPFP Mislata (2024–26)","about.f5k":"Before","about.f5v":"Networking · IES La Sénia (2022–24)",
    "about.f2k":"Location","about.f2v":"Valencia, Spain","about.f4k":"Languages","about.f4v":"Spanish · English B1–B2",
    "exp.h":"Where I've worked",
    "exp.1.role":"Java Developer","exp.1.date":"Jul 2026 – present","exp.1.desc":"Java with Spring Boot across several backend layers.",
    "exp.1.l1":"Batch processes that consume REST and SOAP services, process the data and persist it in a database.",
    "exp.1.l2":"HTTP client with OAuth2 to consume an external API.",
    "exp.1.l3":"Migration of a service from SOAP to REST.",
    "exp.1.l4":"Forms and data-submission services in Angular on an existing application.",
    "exp.2.role":"Backend Developer · internship","exp.2.date":"Apr – Jun 2026","exp.2.desc":"Ticketing, access control and cashless platform, in production during real events. Over thirty tasks closed in three months.",
    "exp.2.l1":"Evolutions of the cashless backend panel: top-ups and balance packs, products and taxes, capacity and role permissions.",
    "exp.2.l2":"Integration endpoints (capacity, access, events per promoter), designed with the mobile teams consuming them.",
    "exp.2.l3":"Validated the migration of image storage from EC2 to Amazon S3 through an interface abstraction.",
    "exp.2.l4":"Automatic alert for overlapping time slots: fix the cause, not the symptom.",
    "exp.2.l5":"Panel internationalisation, documentation, code review and technical support during events.",
    "exp.3.role":"Web Developer","exp.3.date":"Jul 2023 – Oct 2025","exp.3.desc":"Features for custom CRMs with PHP, JavaScript (jQuery) and MySQL, per each project's requirements.",
    "ref.q1":"He took on real product work very early and closed more than thirty tasks in just three months.",
    "ref.q2":"He asked why things were done and proposed alternatives instead of executing the first solution.",
    "ref.cap":"· Recommendation letter, September 2026. Available on request.",
    "proj.h":"Projects","proj.problem":"Challenge","proj.solution":"Solution",
    "proj.tm.tag":"Bank + store · team project",
    "proj.tm.desc":"Two Spring Boot backends talking over HTTP: an online store that charges cards against our own banking API, each with an Angular frontend. My part was mostly the backend.",
    "proj.tm.problem":"Each backend in layers with the domain at the centre, persistence and the HTTP client behind interfaces, and payments testable without the real bank.",
    "proj.tm.s1":"Bank: controller · usecase · domain · persistence, with use cases for card payment and transfer, JWT and IBAN validation.",
    "proj.tm.s2":"Store: controller · domain · persistence and an integration module (HTTP client and payment against the bank); sessions with a Bearer token in the database.",
    "proj.tm.s3":"Both: repositories as domain interfaces, hashed passwords (password4j) and Bean Validation.",
    "proj.tm.s4":"Flyway, DAO tests with Testcontainers (MariaDB) and the store's payment tested with mocks.",
    "stack.h":"What I work with","stack.tools":"Data & tools",
    "ai.h":"AI, on a short leash","ai.tag":"Agents with Claude Code · private code",
    "ai.lead":"A system that organises my coursework with AI agents. Claude writes, but it doesn't merge its own work or hand in my assignments.",
    "ai.c1":"What it does",
    "ai.c1.1":"Daily phone summary of deadlines and dates, written with Claude from the Moodle API, and tasks in Google Calendar.",
    "ai.c1.2":"Prepares each task's environment (repo, material, brief) and generates notes with Anki cards.",
    "ai.c1.3":"Runs on its own with a systemd timer.",
    "ai.c2":"How I control it",
    "ai.c2.1":"Specs first: each task carries a brief and a verifiable acceptance checklist.",
    "ai.c2.2":"Deterministic before the model: scripts check whatever can be checked and an independent second validator agent judges the rest.",
    "ai.c2.3":"Every change goes through a pull request and the AI never pushes to main. Credentials only in <code>.env</code>, and platform text is treated as untrusted.",
    "contact.h":"Shall we talk?","contact.p":"Open to offers of any kind. Write to me and we'll talk over a coffee.",
    "foot":"© 2026 Javier Serrano Gómez · Handmade, no frameworks."
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

// aparición al hacer scroll
const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: .12 });
document.querySelectorAll(".card,.timeline>li,.quote,.stack div").forEach(e => { e.classList.add("reveal"); io.observe(e); });
