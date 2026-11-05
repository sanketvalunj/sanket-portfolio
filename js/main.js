/* =========================================================
   Sanket Valunj — Portfolio
   GSAP + ScrollTrigger + Lenis (all bundled in js/vendor)
   ========================================================= */
gsap.registerPlugin(ScrollTrigger);

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const FINE = matchMedia("(pointer: fine)").matches;
const DESKTOP_MQ = "(min-width: 900px)";

/* ---------------- EDIT ME: rotating roles & stack data ---------------- */
const ROLES = ["Full-Stack Developer.", "LLM Systems Builder.", "Optimisation Nerd.", "Hackathon Finalist."];

const STACK_JSON = [
  ["{", "p"], ["\n  ", ""], ['"ai"', "k"], [": [", "p"], ['"LLMs"', "s"], [", ", "p"], ['"RAG"', "s"], [", ", "p"], ['"LangGraph"', "s"], ["],", "p"],
  ["\n  ", ""], ['"backend"', "k"], [": [", "p"], ['"FastAPI"', "s"], [", ", "p"], ['"Node"', "s"], ["],", "p"],
  ["\n  ", ""], ['"frontend"', "k"], [": [", "p"], ['"Next.js"', "s"], [", ", "p"], ['"React"', "s"], ["],", "p"],
  ["\n  ", ""], ['"data"', "k"], [": [", "p"], ['"PostgreSQL"', "s"], [", ", "p"], ['"Elastic"', "s"], ["],", "p"],
  ["\n  ", ""], ['"lang"', "k"], [": [", "p"], ['"Python"', "s"], [", ", "p"], ['"C++"', "s"], ["]", "p"],
  ["\n}", "p"],
];

const STACK = [
  { n: "Python", a: "Py", c: "#3776ab", t: "My default language for ML pipelines, FastAPI services and optimisation with OR-Tools." },
  { n: "C++", a: "C+", c: "#00599c", t: "Competitive programming on LeetCode, Codeforces and CodeChef, plus DSA fundamentals." },
  { n: "JavaScript", a: "JS", c: "#d4a106", t: "Interactive front ends and Node tooling, including this site." },
  { n: "SQL", a: "SQ", c: "#0f766e", t: "Schema design and queries across PostgreSQL and MySQL." },
  { n: "LLMs", a: "AI", c: "#8b5cf6", t: "Air-gapped LLM playbook generation in Garud-Drishti; advisory reasoning in Nex-AI." },
  { n: "RAG", a: "RG", c: "#7c3aed", t: "Grounding model answers in documents and telemetry instead of guesses." },
  { n: "LangGraph", a: "LG", c: "#1c3c3c", t: "Multi-agent orchestration: Risk, Compliance and Business Impact agents working together." },
  { n: "LangChain", a: "LC", c: "#2f855a", t: "Chains and tools behind Nex-AI's multilingual farmer advisory." },
  { n: "FastAPI", a: "FA", c: "#009688", t: "The backend for all three of my main projects: fast, typed, async APIs." },
  { n: "Next.js", a: "N", c: "#111111", t: "Dashboards for incident response and railway planning." },
  { n: "React", a: "Re", c: "#0ea5e9", t: "Component-driven UIs, including Vajra's planning interface." },
  { n: "Node.js", a: "No", c: "#3c873a", t: "JavaScript services and tooling around REST APIs." },
  { n: "PostgreSQL", a: "PG", c: "#336791", t: "The main relational store for Vajra and Garud-Drishti." },
  { n: "Elasticsearch", a: "ES", c: "#f04e98", t: "Indexing and searching multi-source security telemetry at speed." },
  { n: "OR-Tools", a: "OR", c: "#ea4335", t: "CP-SAT models that merged department requests and cut corridor closures from 3 to 1." },
  { n: "Git", a: "Gt", c: "#f05032", t: "Version control and collaboration on every team project and hackathon." },
];

/* ---------------- Smooth scroll ---------------- */
const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
lenis.stop();

/* ---------------- Split hero name into letters ---------------- */
(function split() {
  const h = $(".hero-name");
  const walk = node => {
    [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        [...n.textContent].forEach(ch => {
          const s = document.createElement("span");
          s.className = "ch"; s.textContent = ch; frag.appendChild(s);
        });
        n.replaceWith(frag);
      } else if (n.nodeName !== "BR") walk(n);
    });
  };
  walk(h);
})();

/* ---------------- Loader → intro ---------------- */
function runLoader() {
  const o = { v: 0 };
  const tl = gsap.timeline();
  tl.to(o, { v: 100, duration: 2, ease: "power2.inOut",
    onUpdate: () => { $("#loadNum").textContent = Math.round(o.v); $("#loadBar").style.width = o.v + "%"; } })
    .to(".loader-inner", { opacity: 0, y: -30, duration: .5, ease: "power2.in" })
    .to(".lp1", { yPercent: -100, duration: 1, ease: "expo.inOut" }, "<.2")
    .to(".lp2", { yPercent: 100, duration: 1, ease: "expo.inOut" }, "<")
    .add(() => { $("#loader").remove(); document.body.classList.remove("is-loading"); lenis.start(); ScrollTrigger.refresh(); })
    .add(intro(), "-=.7");
}

function intro() {
  const tl = gsap.timeline();
  tl.from("#heroImg", { scale: 1.25, filter: "blur(12px) brightness(.4)", duration: 2, ease: "expo.out" })
    .from(".nav", { y: -90, opacity: 0, duration: 1, ease: "expo.out" }, "<.2")
    .from(".hello", { y: 20, opacity: 0, duration: .7 }, "<.2")
    .from(".hero-name .ch", { yPercent: 120, rotateX: -90, opacity: 0, stagger: .045, duration: 1, ease: "expo.out" }, "<.1")
    .from(".hero-role", { y: 30, opacity: 0, duration: .8, ease: "expo.out" }, "-=.6")
    .from(".hero-line", { y: 24, opacity: 0, stagger: .12, duration: .8, ease: "expo.out" }, "-=.5")
    .from(".hero-cta > *, .hero-social", { y: 20, opacity: 0, stagger: .1, duration: .7 }, "-=.5")
    .from("#terminal", { x: 80, opacity: 0, rotateY: -25, duration: 1.2, ease: "expo.out", onComplete: typeTerminal }, "-=1")
    .from(".scroll-cue", { opacity: 0, duration: .6 }, "-=.4")
    .add(rolesLoop);
  return tl;
}

/* ---------------- Rotating roles ---------------- */
function rolesLoop() {
  const box = $("#roleSwap");
  let i = 0;
  setInterval(() => {
    i = (i + 1) % ROLES.length;
    const old = box.firstElementChild;
    const nu = document.createElement("span");
    nu.textContent = ROLES[i];
    nu.style.position = "absolute"; nu.style.left = 0; nu.style.top = 0;
    box.appendChild(nu);
    gsap.timeline()
      .to(box, { width: measure(nu), duration: .6, ease: "expo.inOut" }, 0)
      .to(old, { yPercent: -110, opacity: 0, duration: .6, ease: "expo.inOut" }, 0)
      .fromTo(nu, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .6, ease: "expo.inOut" }, 0)
      .add(() => { old.remove(); nu.style.position = ""; });
  }, 2600);
  const measure = el => el.getBoundingClientRect().width;
  box.style.width = measure(box.firstElementChild) + "px";
}

/* ---------------- Terminal typing ---------------- */
function typeTerminal() {
  const cmd = "cat stack.json", cmdEl = $("#termCmd"), out = $("#termOut");
  let i = 0;
  const typeCmd = () => {
    cmdEl.textContent = cmd.slice(0, ++i);
    if (i < cmd.length) setTimeout(typeCmd, 70 + Math.random() * 60);
    else setTimeout(typeOut, 350);
  };
  let ti = 0, ci = 0, cur = null;
  const typeOut = () => {
    $("#cmdCursor").remove();
    out.insertAdjacentHTML("afterend", '<span class="t-cursor">▌</span>');
    const step = () => {
      if (ti >= STACK_JSON.length) return;
      const [txt, cls] = STACK_JSON[ti];
      if (!cur) { cur = document.createElement("span"); if (cls) cur.className = "tk-" + cls; out.appendChild(cur); }
      cur.textContent = txt.slice(0, ++ci);
      if (ci >= txt.length) { ti++; ci = 0; cur = null; }
      setTimeout(step, 14);
    };
    step();
  };
  typeCmd();
}

/* ---------------- Particles on hero ---------------- */
(function particles() {
  const cv = $("#particles"), ctx = cv.getContext("2d");
  let w, h, pts = [], mouse = { x: -999, y: -999 };
  const resize = () => {
    const dpr = Math.min(2, devicePixelRatio || 1);
    w = cv.offsetWidth; h = cv.offsetHeight; cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round((w * h) / 26000);
    pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, r: Math.random() * 1.6 + .4, c: Math.random() > .5 ? "139,92,246" : "34,211,238" }));
  };
  cv.parentElement.addEventListener("pointermove", e => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
  cv.parentElement.addEventListener("pointerleave", () => { mouse.x = mouse.y = -999; });
  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
      if (d < 120) { p.x += dx / d * 1.2; p.y += dy / d * 1.2; }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fillStyle = `rgba(${p.c},.8)`; ctx.fill();
      if (d < 160) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.strokeStyle = `rgba(${p.c},${(1 - d / 160) * .35})`; ctx.stroke(); }
    }
    requestAnimationFrame(draw);
  };
  addEventListener("resize", resize); resize(); draw();
})();

/* ---------------- Hero mouse parallax ---------------- */
if (FINE) {
  const hero = $("#home");
  const mx = gsap.quickTo("#heroMedia", "x", { duration: 1.2, ease: "power3" });
  const my = gsap.quickTo("#heroMedia", "y", { duration: 1.2, ease: "power3" });
  const tx = gsap.quickTo("#terminal", "rotateY", { duration: 1, ease: "power3" });
  const ty = gsap.quickTo("#terminal", "rotateX", { duration: 1, ease: "power3" });
  hero.addEventListener("pointermove", e => {
    const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
    mx(x * -30); my(y * -20); tx(x * 14); ty(y * -14);
  });
  gsap.set("#terminal", { transformPerspective: 900 });
}

/* ---------------- Stack grid ---------------- */
(function stack() {
  const grid = $("#stackGrid");
  STACK.forEach((s, i) => {
    const b = document.createElement("button");
    b.className = "tech reveal" + (i === 0 ? " on" : "");
    b.style.setProperty("--c", s.c);
    b.innerHTML = `<i>${s.a}</i><span>${s.n}</span>`;
    b.addEventListener("click", () => pick(s, b));
    if (FINE) b.addEventListener("mouseenter", () => pick(s, b));
    grid.appendChild(b);
  });
  function pick(s, b) {
    if (b.classList.contains("on")) return;
    $$(".tech").forEach(t => t.classList.remove("on")); b.classList.add("on");
    const d = $("#stackDetail");
    gsap.timeline()
      .to(d.children, { y: -10, opacity: 0, duration: .18, stagger: .04 })
      .add(() => { $("#sdIcon").textContent = s.a; $("#sdIcon").style.background = s.c; $("#sdName").textContent = s.n; $("#sdText").textContent = s.t; })
      .to(d.children, { y: 0, opacity: 1, duration: .35, stagger: .05, ease: "back.out(2)" });
  }
})();

/* ---------------- Animated project covers ---------------- */
(function covers() {
  const NS = "http://www.w3.org/2000/svg";
  const el = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent.appendChild(e); return e; };
  $$(".cover-svg").forEach(svg => {
    const kind = svg.dataset.kind;
    if (kind === "graph") {
      const nodes = Array.from({ length: 16 }, () => ({ x: 30 + Math.random() * 340, y: 25 + Math.random() * 170 }));
      nodes.forEach((a, i) => nodes.forEach((b, j) => { if (j > i && Math.hypot(a.x - b.x, a.y - b.y) < 110) el("line", { x1: a.x, y1: a.y, x2: b.x, y2: b.y, stroke: "rgba(196,181,253,.35)", "stroke-width": 1 }, svg); }));
      nodes.forEach((n, i) => {
        const c = el("circle", { cx: n.x, cy: n.y, r: i % 5 === 0 ? 6 : 3.5, fill: i % 5 === 0 ? "#f472b6" : "#c4b5fd" }, svg);
        gsap.to(c, { attr: { r: "+=3" }, opacity: .5, duration: 1 + Math.random(), repeat: -1, yoyo: true, ease: "sine.inOut", delay: Math.random() * 2 });
      });
    } else if (kind === "rail") {
      for (let k = 0; k < 5; k++) {
        const y = 40 + k * 36, d = `M -10 ${y} C 120 ${y - 30}, 260 ${y + 30}, 410 ${y}`;
        el("path", { d, stroke: "rgba(103,232,249,.25)", "stroke-width": 2, fill: "none" }, svg);
        const t = el("path", { d, stroke: k === 2 ? "#fbbf24" : "#67e8f9", "stroke-width": 4, fill: "none", "stroke-linecap": "round", "stroke-dasharray": "40 460" }, svg);
        gsap.fromTo(t, { attr: { "stroke-dashoffset": 500 } }, { attr: { "stroke-dashoffset": 0 }, duration: 2.5 + k * .6, repeat: -1, ease: "none" });
      }
    } else {
      for (let k = 0; k < 6; k++) {
        const p = el("path", { fill: "none", stroke: `rgba(110,231,183,${.15 + k * .1})`, "stroke-width": 1.5 }, svg);
        const o = { ph: k };
        gsap.to(o, { ph: k + Math.PI * 2, duration: 6 + k, repeat: -1, ease: "none", onUpdate: () => {
          let d = "";
          for (let x = 0; x <= 400; x += 10) d += (x ? "L" : "M") + x + " " + (110 + Math.sin(x / 45 + o.ph) * (18 + k * 6) + k * 8);
          p.setAttribute("d", d);
        } });
      }
    }
  });
})();

/* ---------------- Counters ---------------- */
let counted = false;
function runCounters() {
  if (counted) return; counted = true;
  $$("[data-count]").forEach(b => {
    const o = { v: 0 };
    gsap.to(o, { v: +b.dataset.count, duration: 1.8, ease: "power3.out", onUpdate: () => b.textContent = o.v.toFixed(+b.dataset.dec) });
  });
}

/* ---------------- Nav state ---------------- */
const panels = $$(".panel");
const navLinks = $$("#links a");
const pill = $(".pill");
let activeIdx = -1;
function setActive(i) {
  if (i === activeIdx || i < 0) return;
  activeIdx = i;
  navLinks.forEach((a, j) => a.classList.toggle("active", j === i));
  const a = navLinks[i];
  pill.style.left = a.offsetLeft + "px"; pill.style.width = a.offsetWidth + "px";
  a.parentElement.scrollTo({ left: a.offsetLeft - a.parentElement.clientWidth / 2 + a.offsetWidth / 2, behavior: "smooth" });
  $("#nav").classList.toggle("light", panels[i].dataset.theme !== "dark");
  if (panels[i].id === "about") runCounters();
  $$(".hl", panels[i]).forEach(h => h.classList.add("on"));
}

/* ---------------- Layouts ---------------- */
let goTo = () => {};
const mm = gsap.matchMedia();

// DESKTOP — vertical scroll drives a horizontal, rolling track
mm.add(DESKTOP_MQ, () => {
  const track = $("#track");
  const dist = () => track.scrollWidth - innerWidth;

  const scrollTween = gsap.to(track, {
    x: () => -dist(), ease: "none",
    scrollTrigger: {
      trigger: "#wrap", pin: true, scrub: 1, start: "top top", end: () => "+=" + dist(), invalidateOnRefresh: true,
      onUpdate: self => {
        $("#progress").style.width = self.progress * 100 + "%";
        const x = self.progress * dist();
        panels.forEach(p => {
          const o = gsap.utils.clamp(-1.1, 1.1, (p.offsetLeft - x) / innerWidth);
          gsap.set(p, { rotateY: -o * 24, scale: 1 - Math.abs(o) * .1, transformOrigin: o > 0 ? "left center" : "right center" });
        });
        setActive(Math.round(x / innerWidth));
      },
    },
  });

  // hero image drifts as it rolls away
  gsap.to("#heroImg", { xPercent: 12, scale: 1.12, ease: "none", scrollTrigger: { trigger: "#home", containerAnimation: scrollTween, start: "left left", end: "right left", scrub: true } });

  // reveal content as each panel enters
  panels.slice(1).forEach(p => {
    const items = $$(".reveal", p);
    if (!items.length) return;
    gsap.from(items, { y: 60, opacity: 0, rotateX: -12, stagger: .06, duration: 1, ease: "expo.out",
      scrollTrigger: { trigger: p, containerAnimation: scrollTween, start: "left 65%", toggleActions: "play none none reverse" } });
  });

  goTo = i => {
    const st = scrollTween.scrollTrigger;
    lenis.scrollTo(st.start + (panels[i].offsetLeft / dist()) * (st.end - st.start), { duration: 1.6 });
  };
  return () => { gsap.set(panels, { clearProps: "transform" }); };
});

// MOBILE — vertical sections with swipe rows
mm.add("(max-width: 899px)", () => {
  panels.forEach((p, i) => {
    ScrollTrigger.create({ trigger: p, start: "top 50%", end: "bottom 50%", onToggle: s => s.isActive && setActive(i) });
    const items = $$(".reveal", p);
    if (items.length) gsap.from(items, { y: 40, opacity: 0, stagger: .06, duration: .9, ease: "expo.out", scrollTrigger: { trigger: p, start: "top 75%" } });
  });
  ScrollTrigger.create({ start: 0, end: "max", onUpdate: s => $("#progress").style.width = s.progress * 100 + "%" });
  goTo = i => lenis.scrollTo(panels[i], { duration: 1.4 });
});

document.addEventListener("click", e => {
  const a = e.target.closest("[data-go]");
  if (!a) return;
  e.preventDefault();
  goTo(+a.dataset.go);
});

/* ---------------- Pointer effects (desktop) ---------------- */
if (FINE) {
  const dot = $(".cursor-dot"), ring = $(".cursor-ring"), label = $(".cursor-ring span");
  const dx = gsap.quickTo(dot, "x", { duration: .08 }), dy = gsap.quickTo(dot, "y", { duration: .08 });
  const rx = gsap.quickTo(ring, "x", { duration: .45, ease: "power3" }), ry = gsap.quickTo(ring, "y", { duration: .45, ease: "power3" });
  addEventListener("pointermove", e => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); });
  document.addEventListener("pointerover", e => {
    const v = e.target.closest("[data-cursor]");
    const h = e.target.closest("a, button");
    ring.classList.toggle("view", !!v);
    ring.classList.toggle("hover", !!h && !v);
    if (v) label.textContent = v.dataset.cursor;
  });

  // magnetic buttons
  $$(".magnetic").forEach(b => {
    const x = gsap.quickTo(b, "x", { duration: .5, ease: "elastic.out(1,.4)" }), y = gsap.quickTo(b, "y", { duration: .5, ease: "elastic.out(1,.4)" });
    b.addEventListener("pointermove", e => { const r = b.getBoundingClientRect(); x((e.clientX - r.left - r.width / 2) * .35); y((e.clientY - r.top - r.height / 2) * .45); });
    b.addEventListener("pointerleave", () => { x(0); y(0); });
  });

  // 3D tilt
  $$(".tilt, .proj").forEach(c => {
    gsap.set(c, { transformPerspective: 900 });
    c.addEventListener("pointermove", e => {
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      gsap.to(c, { rotateY: x * 14, rotateX: -y * 12, duration: .5, ease: "power3" });
      c.style.setProperty("--mx", (x + .5) * 100 + "%"); c.style.setProperty("--my", (y + .5) * 100 + "%");
    });
    c.addEventListener("pointerleave", () => gsap.to(c, { rotateY: 0, rotateX: 0, duration: .8, ease: "elastic.out(1,.5)" }));
  });
}

/* ---------------- Init ---------------- */
$("#year").textContent = new Date().getFullYear();
setActive(0);
addEventListener("resize", () => { const a = navLinks[activeIdx]; if (a) { pill.style.left = a.offsetLeft + "px"; pill.style.width = a.offsetWidth + "px"; } });
if (document.readyState === "complete") runLoader(); else addEventListener("load", runLoader);
