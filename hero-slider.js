// Hero slideshow — crossfades between recent jobs every 6s
(function () {
  const wrap = document.getElementById('heroSlides');
  if (!wrap) return;
  const slides = [...wrap.querySelectorAll('.hero2-slide')];
  const dots = [...document.querySelectorAll('#heroDots .hero2-dot')];
  const capTitle = document.getElementById('heroCapTitle');
  const capSub = document.getElementById('heroCapSub');
  const DURATION = 6000;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let i = 0, timer = null;

  // Load the rest of the photos only after the first one is up
  const loadAll = () => slides.forEach(s => { if (s.dataset.src) { s.src = s.dataset.src; delete s.dataset.src; } });
  if (document.readyState === 'complete') loadAll(); else window.addEventListener('load', loadAll);

  function go(n) {
    const prev = slides[i];
    i = (n + slides.length) % slides.length;
    const next = slides[i];
    if (next.dataset.src) { next.src = next.dataset.src; delete next.dataset.src; }
    prev.classList.remove('is-active');
    // restart the zoom animation on the incoming slide
    next.classList.remove('is-active'); void next.offsetWidth; next.classList.add('is-active');
    dots.forEach((d, k) => d.classList.toggle('is-active', k === i));
    capTitle.textContent = next.dataset.title;
    capSub.textContent = next.dataset.sub;
    restart();
  }
  function restart() {
    clearTimeout(timer);
    if (!reduced) timer = setTimeout(() => go(i + 1), DURATION);
  }

  dots.forEach((d, k) => d.addEventListener('click', () => go(k)));

  // Swipe on phones
  let x0 = null;
  wrap.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  wrap.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
    x0 = null;
  });

  // Pause when the tab isn't visible
  document.addEventListener('visibilitychange', () => document.hidden ? clearTimeout(timer) : restart());
  restart();
})();
