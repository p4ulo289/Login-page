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

// PASSWORD TOGGLE
const passEl = document.getElementById('pass');
document.getElementById('eye').addEventListener('click', function () {
  const show = passEl.type === 'text';
  passEl.type = show ? 'password' : 'text';
  this.textContent = show ? '👁' : '🙈';
});

// PASSWORD STRENGTH
passEl.addEventListener('input', function () {
  const v = this.value;
  const bar = document.getElementById('sbar');
  const fill = document.getElementById('sfill');
  if (!v) { bar.classList.remove('show'); return; }
  bar.classList.add('show');
  let s = 0;
  if (v.length >= 6) s++;
  if (v.length >= 10) s++;
  if (/[A-Z]/.test(v)) s++;
  if (/[0-9]/.test(v)) s++;
  if (/\W/.test(v)) s++;
  fill.style.width = (s / 5 * 100) + '%';
  fill.style.background = ['#f55', '#f80', '#fc0', '#8d4', '#4d4'][s - 1] || '#f55';
});

// VALIDAÇÃO
const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function setField(inp, errId, ok) {
  inp.classList.toggle('error', !ok);
  inp.classList.toggle('ok', ok);
  document.getElementById(errId).classList.toggle('show', !ok);
}

// LOGIN / CADASTRO (com localStorage)
const LS_KEY_AUTH = 'jovi_auth';
const LS_KEY_USERS = 'jovi_users';


function renderLoggedIn(email) {
  toast('Login realizado! Bem-vindo à JOVI.', 'success', 4000);
  const firstName = (email || '').split('@')[0] || 'Cliente';
  document.getElementById('form').innerHTML = `
    <div style="text-align:center;padding:32px 0">
      <div style="font-size:56px;margin-bottom:14px">🎉</div>
      <div style="font-family:'Bebas Neue',sans-serif;font-size:34px;margin-bottom:8px">Você entrou!</div>
      <div style="color:var(--muted);font-size:13px">Bem-vindo(a), ${firstName}.</div>
      <button class="btn" style="margin-top:28px;max-width:180px" onclick="handleLogout()">SAIR</button>
    </div>`;
}

