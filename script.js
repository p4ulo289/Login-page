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

// TOAST
function toast(msg, type = 'info', ms = 3200) {
  const t = document.createElement('div');
  t.className = 'toast ' + type;
  t.textContent = msg;
  document.getElementById('toasts').appendChild(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 320); }, ms);
}

// ── MODAL ──
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
document.querySelectorAll('.overlay').forEach(o =>
  o.addEventListener('click', e => { if (e.target === o) o.classList.remove('open'); })
);