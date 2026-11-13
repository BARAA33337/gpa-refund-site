(function () {
  var nav = document.querySelector('.nav');
  var onScroll = function () { if (nav) nav.classList.toggle('scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  var btn = document.querySelector('.menu-btn'), links = document.querySelector('.nav-links');
  if (btn && links) {
    btn.addEventListener('click', function () { var o = links.classList.toggle('open'); btn.setAttribute('aria-expanded', String(o)); });
    links.addEventListener('click', function (e) { if (e.target.closest('a')) { links.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); } });
  }
  var els = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else els.forEach(function (el) { el.classList.add('in'); });
  // play videos only when visible
  document.querySelectorAll('video[data-lazy]').forEach(function (v) {
    if (!('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (es) { es.forEach(function (e) { if (!e.isIntersecting && !v.paused) v.pause(); }); }).observe(v);
  });
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
})();
