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
