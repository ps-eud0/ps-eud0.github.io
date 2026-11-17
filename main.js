/* ============================================================
   MATRIX PORTFOLIO — main.js
   ============================================================ */

/* ---- Matrix Rain ---- */
class MatrixRain {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.chars = ('アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピ' +
                  'ウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペ' +
                  'オォコソトノホモヨョロヲゴゾドボポヴッン' +
                  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ').split('');
    this.fs = 14;
    this.drops = [];
    this._resize();
    window.addEventListener('resize', () => this._resize());
  }

  _resize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.cols = Math.floor(this.canvas.width / this.fs);
    this.drops = Array.from({ length: this.cols }, () => Math.random() * -50);
  }

  _frame() {
    this.ctx.fillStyle = 'rgba(13,13,13,0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = this.fs + 'px Share Tech Mono, monospace';

    for (let i = 0; i < this.drops.length; i++) {
      const ch = this.chars[(Math.random() * this.chars.length) | 0];
      const y  = this.drops[i] * this.fs;
      this.ctx.fillStyle = (this.drops[i] < 5) ? '#39ff14' : '#00ff41';
      this.ctx.fillText(ch, i * this.fs, y);
      if (y > this.canvas.height && Math.random() > 0.975) this.drops[i] = 0;
      this.drops[i]++;
    }
  }

  start() { this._id = setInterval(() => this._frame(), 48); }
}

/* ---- Loader ---- */
function runLoader() {
  const pre    = document.getElementById('loader-text');
  const fill   = document.getElementById('loader-fill');
  const pct    = document.getElementById('loader-pct');
  const status = document.getElementById('loader-status');

  const lines = [
    'MATRIX NEURAL INTERFACE v3.11',
    '================================',
    '',
    '[SYS]  Initializing core modules......... OK',
    '[AUTH] Loading identity profile........... OK',
    '[CRPT] Decrypting credentials............. OK',
    '[NET]  Connecting to mainframe............ OK',
    '[SYNC] Synchronizing data streams......... OK',
    '',
    '████████████████████ ACCESS GRANTED',
    '',
    'Welcome, Aarushi.',
  ];

  const statuses = [
    'Initializing...', 'Loading profile...', 'Decrypting...',
    'Connecting...', 'Syncing...', 'ACCESS GRANTED',
  ];

  return new Promise(resolve => {
    let idx = 0;
    let txt = '';

    const tick = () => {
      if (idx >= lines.length) {
        fill.style.width = '100%';
        pct.textContent  = '100';
        status.textContent = 'ACCESS GRANTED';
        setTimeout(resolve, 500);
        return;
      }
      txt += (idx > 0 ? '\n' : '') + lines[idx];
      pre.textContent = txt;
      const p = Math.round((idx / lines.length) * 100);
      fill.style.width = p + '%';
      pct.textContent  = p;
      const si = Math.min(Math.floor((idx / lines.length) * statuses.length), statuses.length - 1);
      status.textContent = statuses[si];
      idx++;
      setTimeout(tick, 100 + Math.random() * 120);
    };
    tick();
  });
}

/* ---- Hero Typer ---- */
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function runHeroTyper(container) {
  const addDiv = (cls, style) => {
    const d = document.createElement('div');
    if (cls) d.className = cls;
    if (style) Object.assign(d.style, style);
    container.appendChild(d);
    return d;
  };

  const typeInto = async (el, text, spd) => {
    for (const ch of text) {
      el.textContent += ch;
      await sleep(spd + Math.random() * spd * 0.4);
    }
  };

  const cmdStyle = { color: 'rgba(0,255,65,0.52)', fontSize: '.88rem' };

  const d1 = addDiv(null, cmdStyle); await typeInto(d1, '$ wake_up neo...', 38); await sleep(380);
  const d2 = addDiv(null, cmdStyle); await typeInto(d2, '$ the matrix has you...', 38); await sleep(380);
  const d3 = addDiv(null, cmdStyle); await typeInto(d3, '$ follow the white rabbit.', 38); await sleep(600);

  addDiv(null, { height: '.5rem' });

  const d4 = addDiv(null, { color: 'rgba(0,255,65,0.65)', fontSize: '.86rem' });
  await typeInto(d4, '> LOADING IDENTITY PROFILE...', 28); await sleep(500);

  addDiv(null, { height: '.5rem' });

  const name = addDiv('hero-name');
  await typeInto(name, 'AARUSHI SAINI', 60); await sleep(350);

  addDiv(null, { height: '.35rem' });

  const role = addDiv('hero-role');
  await typeInto(role, 'SOFTWARE ENGINEER', 48); await sleep(250);

  addDiv(null, { height: '.35rem' });

  const sub = addDiv(null, { color: 'rgba(0,255,65,0.42)', fontSize: '.8rem' });
  await typeInto(sub, '// Backend · Cloud · Distributed Systems', 22);
  const cur = document.createElement('span');
  cur.className = 'cursor';
  sub.appendChild(cur);
}

/* ---- Scroll fade-ins ---- */
function initFadeIns() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.delay || '0');
        setTimeout(() => e.target.classList.add('vis'), delay);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.sec').forEach(sec => {
    sec.querySelectorAll('.fi').forEach((el, i) => {
      el.dataset.delay = i * 110;
      obs.observe(el);
    });
  });
}

/* ---- Active nav on scroll ---- */
function initNavActive() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const a = document.querySelector(`.nav-link[data-sec="${e.target.id}"]`);
        if (a) a.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => obs.observe(s));
}

/* ---- Mobile nav toggle ---- */
function initNavToggle() {
  const btn   = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  btn.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

/* ---- Boot ---- */
async function boot() {
  const rain = new MatrixRain(document.getElementById('matrix-canvas'));
  rain.start();

  await runLoader();

  const loader = document.getElementById('loader');
  loader.classList.add('out');
  setTimeout(() => { loader.style.display = 'none'; }, 700);

  const nav = document.getElementById('navbar');
  nav.classList.remove('nav-hidden');

  await runHeroTyper(document.getElementById('hero-body'));

  const cta = document.getElementById('hero-cta');
  cta.style.display = 'flex';
  cta.style.opacity = '0';
  cta.style.transition = 'opacity .6s ease';
  requestAnimationFrame(() => requestAnimationFrame(() => { cta.style.opacity = '1'; }));

  initFadeIns();
  initNavActive();
  initNavToggle();
}

boot();
