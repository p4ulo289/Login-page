// SLIDESHOW
const slides = document.querySelectorAll('.slide');
const dotsEl = document.getElementById('dots');
let cur = 0, timer;

slides.forEach((_, i) => {
  const d = document.createElement('button');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.onclick = () => go(i);
  dotsEl.appendChild(d);
});

function go(n) {
  slides[cur].classList.remove('active');
  dotsEl.children[cur].classList.remove('active');
  cur = n;
  slides[cur].classList.add('active');
  dotsEl.children[cur].classList.add('active');
  clearInterval(timer);
  timer = setInterval(() => go((cur + 1) % slides.length), 5000);
}
timer = setInterval(() => go((cur + 1) % slides.length), 5000);