document.getElementById('yr').textContent = new Date().getFullYear();
  (function(){
    var btn = document.getElementById('theme');
    var root = document.documentElement;
    btn.addEventListener('click', function(){
      var cur = root.getAttribute('data-theme');
      if (!cur) {
        cur = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      root.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
    });
  })();
const lb = document.getElementById('lightbox');
const lbImg = lb.querySelector('img');
document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('click', () => {
    lbImg.src = img.src;
    lb.classList.add('open');
  });
});
lb.addEventListener('click', () => lb.classList.remove('open'));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') lb.classList.remove('open');
});