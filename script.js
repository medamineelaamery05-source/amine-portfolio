// ===== Mobile Menu =====
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

burger.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach(a => {
  a.addEventListener("click", () => nav.classList.remove("open"));
});

// ===== Typing Effect =====
const typingEl = document.getElementById("typing");
const words = ["Développeur Web / App", "Développeur Android", "Développeur Web Junior"];
let w = 0, i = 0, deleting = false;

function typeLoop(){
  const word = words[w];
  if(!deleting){
    typingEl.textContent = word.slice(0, i++);
    if(i > word.length){
      deleting = true;
      setTimeout(typeLoop, 900);
      return;
    }
  } else {
    typingEl.textContent = word.slice(0, i--);
    if(i < 0){
      deleting = false;
      w = (w + 1) % words.length;
      i = 0;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 70);
}
typeLoop();

// ===== Reveal on Scroll =====
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting) e.target.classList.add("show");
  });
},{threshold:0.12});
reveals.forEach(el => io.observe(el));

// ===== Active Link =====
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function setActive(){
  let current = "home";
  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 120;
    const height = sec.offsetHeight;
    if(top >= offset && top < offset + height){
      current = sec.getAttribute("id");
    }
  });

  navLinks.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
  });
}
window.addEventListener("scroll", setActive);
setActive();

// ===== Skills animation =====
const skillBoxes = document.querySelectorAll(".skills-box");
const skillIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(!e.isIntersecting) return;

    e.target.querySelectorAll(".fill").forEach(fill => {
      fill.style.width = getComputedStyle(fill).getPropertyValue("--w");
    });

    e.target.querySelectorAll(".circle").forEach(c => {
      const p = Number(c.dataset.p || 0);
      const deg = Math.round((p / 100) * 360);
      const ring = c.querySelector(".ring");
      ring.style.background = `conic-gradient(var(--accent) ${deg}deg, rgba(255,255,255,.08) 0deg)`;
    });

    skillIO.unobserve(e.target);
  });
},{threshold:0.2});
skillBoxes.forEach(b => skillIO.observe(b));

// ===== Contact demo =====
const form = document.getElementById("contactForm");
const msg = document.getElementById("formMsg");

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  msg.textContent = "Message envoyé ✅ (démo فقط)";
  form.reset();
  setTimeout(() => (msg.textContent = ""), 2500);
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();