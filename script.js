/* ===== Leah Mae portfolio — script.js =====
   1) Light/dark theme toggle (remembers your choice)
   2) Footer year
   3) Gallery lightbox (click a photo to enlarge)
   4) Dreamy sparkles + cursor trail (light mode only, styled by dream.css) */

(function () {
  var root = document.documentElement;

  /* ---------- 1) Theme toggle ---------- */
  var btn = document.getElementById('theme');

  function systemDark() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function currentTheme() {
    var t = root.getAttribute('data-theme');
    return t || (systemDark() ? 'dark' : 'light');
  }

  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  } catch (e) {}

  if (btn) {
    btn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---------- 2) Footer year ---------- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- 3) Gallery lightbox ---------- */
  var lb = document.getElementById('lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    document.querySelectorAll('.gallery img').forEach(function (img) {
      img.addEventListener('click', function () {
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lb.classList.add('open');
      });
    });
    lb.addEventListener('click', function () { lb.classList.remove('open'); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') lb.classList.remove('open');
    });
  }

  /* ---------- 4) Dreamy sparkles ---------- */
  // Only run if dream.css is loaded (it defines --dream).
  if (getComputedStyle(root).getPropertyValue('--dream').trim() === '') return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var colors = ['#F49CC0', '#C6B4E6', '#FFC9B0', '#E27BAE', '#B79CE6'];
  var glyphs = ['✦', '✧', '✦', '⋆', '✶'];
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  var layer = document.createElement('div');
  layer.className = 'dream-layer';
  layer.setAttribute('aria-hidden', 'true');
  var count = window.innerWidth < 700 ? 22 : 44;
  for (var i = 0; i < count; i++) {
    var s = document.createElement('span');
    s.className = 'sparkle';
    s.textContent = pick(glyphs);
    s.style.left = (Math.random() * 100) + '%';
    s.style.top = (Math.random() * 100) + '%';
    s.style.color = pick(colors);
    s.style.setProperty('--s', (10 + Math.random() * 18) + 'px');
    s.style.setProperty('--t', (3 + Math.random() * 4) + 's');
    s.style.setProperty('--d', (-Math.random() * 6) + 's');
    layer.appendChild(s);
  }
  document.body.appendChild(layer);

  // Cursor sparkle trail (mouse only, skipped for reduced motion)
  if (reduce || !window.matchMedia('(pointer: fine)').matches) return;

  var trail = document.createElement('div');
  trail.className = 'trail-layer';
  trail.setAttribute('aria-hidden', 'true');
  document.body.appendChild(trail);

  var last = 0;
  window.addEventListener('pointermove', function (e) {
    var now = performance.now();
    if (now - last < 45) return;
    last = now;
    if (getComputedStyle(root).getPropertyValue('--dream').trim() === '0') return; // dark mode
    var t = document.createElement('span');
    t.className = 'trail';
    t.textContent = pick(glyphs);
    t.style.left = e.clientX + 'px';
    t.style.top = e.clientY + 'px';
    t.style.color = pick(colors);
    t.style.setProperty('--dx', (Math.random() * 40 - 20) + 'px');
    trail.appendChild(t);
    t.addEventListener('animationend', function () { t.remove(); });
  });
})();