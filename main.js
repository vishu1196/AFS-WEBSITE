// AFS Website v2 — Enhanced JS

// ===== HAMBURGER =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  // close on outside click
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });
}

// ===== ACTIVE NAV =====
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== BACK TO TOP =====
const btt = document.getElementById('backToTop');
if (btt) {
  window.addEventListener('scroll', () => {
    btt.classList.toggle('show', window.scrollY > 400);
  });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== NAVBAR SHADOW ON SCROLL =====
const nav = document.querySelector('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 20 ? '0 4px 24px rgba(15,32,68,0.12)' : '';
  });
}

// ===== SMOOTH HASH SCROLL =====
document.querySelectorAll('a[href*="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const hash = this.getAttribute('href').split('#')[1];
    const target = document.getElementById(hash);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  let current = 0;
  const step = Math.ceil(target / 50);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + suffix;
    if (current >= target) clearInterval(timer);
  }, 30);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.animated) {
      e.target.dataset.animated = true;
      animateCounter(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ===== SMART IMAGE FALLBACKS =====
// Map of image filenames to Unsplash URLs
const IMAGE_MAP = {
  // Pages
  "hero-banner.jpg":        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80",
  "about-team.jpg":         "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80",
  // Services
  "service-cleaning.jpg":   "https://images.unsplash.com/photo-1594818898109-44104f5b5e97?w=700&q=80",
  "service-spiderman.jpg":  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80",
  "service-bmu.jpg":        "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=700&q=80",
  "service-restoration.jpg":"https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=700&q=80",
  "service-maintenance.jpg":"https://images.unsplash.com/photo-1562516155-e0c1ee44059b?w=700&q=80",
  "service-safety.jpg":     "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=700&q=80",
  // Factory
  "factory-1.jpg": "https://images.unsplash.com/photo-1581091870627-5b15e7c10d87?w=400&q=75",
  "factory-2.jpg": "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400&q=75",
  "factory-3.jpg": "https://images.unsplash.com/photo-1609803384069-19f3fd6b0a04?w=400&q=75",
  "factory-4.jpg": "https://images.unsplash.com/photo-1581091870621-f12e4aa2d6aa?w=400&q=75",
  "factory-5.jpg": "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&q=75",
  "factory-6.jpg": "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=75",
  "factory-7.jpg": "https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=400&q=75",
  "factory-8.jpg": "https://images.unsplash.com/photo-1581092916357-7da75cc99d14?w=400&q=75",
  // Access equipment
  "bmu-trolley.jpg":     "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400&q=75",
  "solo-cradle.jpg":     "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=75",
  "power-cradle.jpg":    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=75",
  "motorised-davit.jpg": "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&q=75",
  "parapet-davit.jpg":   "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&q=75",
  "roof-davit.jpg":      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=75",
  "praphet-jib.jpg":     "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400&q=75",
  "monorail.jpg":        "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&q=75",
  "eyebolt.jpg":         "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&q=75",
  // Cleaning methods
  "cleaning-water.jpg":  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=75",
  "cleaning-steam.jpg":  "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&q=75",
};

// Auto-replace any images/xxx.jpg src that failed or is local
document.querySelectorAll('img[src^="images/"]').forEach(img => {
  const filename = img.src.split('/').pop();
  if (IMAGE_MAP[filename]) {
    img.src = IMAGE_MAP[filename];
  }
});
