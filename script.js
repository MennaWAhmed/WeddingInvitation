/* ===================================================
   WEDDING INVITATION — SCRIPT.JS (Arabic Version)
   اسم العريس & اسم العروس · ١٢ نوفمبر ٢٠٢٦
   =================================================== */
'use strict';

/* ── Default wishes ── */
const DEFAULT_WISHES = [
  { name: 'مامت العروسة', msg: 'حبيبتي ربنا يسعدك ويفرح قلبك ويهنيكم' },
  { name: 'Judy wael', msg: 'احلي عروسه ف الدنيا كلهااا بحبك اوي ي منونتي م عارف ازي هقعد من غيرك بعد كدا ربنا يتمملك ع خير ي عيونييي بحبككك اويييييييي' },
  { name: 'شهضوض', msg: 'الف مبروك ي منون ربنا يتمملك على خير, فرحتي 🤍🤍🤍🤍🤍بيك ماتتوصفش بجد بحبك اوووي' },
  { name: 'شيماء 😍', msg: 'مبارك ي منون و ي احمد ربنا يتملكو ع خير و يسعدكم و يكتبلكو كل الخير يارب 😍😍😘😘😘😘😘🫂🫂🫂🫂' },
  { name: 'Adhm Halawa', msg: 'ألف مليون مبروك يا أجمل واحلي عريس في الدنيا وربنا يتمملك علي خير ❤️❤️❤️❤️❤️😘😘' },
  { name: 'Hind Mohammed', msg: 'عروستنا الحلوه ربي يكتب لك العمر الحلو ويسعدك في حياتك الجديده ✨️ مبارك من قلب يحبك وأسأل الله أن يجعل السعادة داركم دامت السعادة في دنياكِ ودُمتِ أحلى عروسة♥️' },
  { name: 'Noor', msg: 'انا مش مصدقه عيني وحاسه ان اجحنتي لا تسع اي مكان من الفرحه بجد ربنا يتمملكو على خير واشوفك احلى عروسه في الدنيا يا منونتي وربنا يكتبلكو كل الخير والفرحه الي في الدنيا وبكتب المسج دي وانا بتشقلب حرفيا من كتر الانبساط 😭❤️❤️❤️❤️❤️🫂' },
  { name: 'Huda', msg: 'الف مبروك يا منون مش مصدقة انك بقيتي عروسة يا روحي 🥹 ربنا يتمملك على خير و يسعدك 😘❤️' },
  { name: 'Shymaa 🤍', msg: 'تبارك الله اللهم بارك ما شاء الله ياعيوووووني مبارك ياحبيبة قلبي باذن الله هتكوني اجمل واحلي عروسه ف الدنيا بحالها 🥹♥️♥️♥️♥️ مش مصدقة بجد 🥹🫶🫂♥️' },
  { name: 'حبيبه', msg: 'اللهم بارك اللهم باارك ربنا يتمملك عليخير يارب ياروحي كل ما افتكر انك هطليعلينا بالابيض عيني تدمع ربنا يجعله زوج صالح مصلح دنيا واخره يارب 🥹🤍🤍' },
  { name: 'Dina', msg: 'اللهم باااارك مبروك وربنا يتملكم ع خير يااارب 🥰❤️❤️❤️❤️❤️' },
  { name: 'Norhan Mhana', msg: 'الف الف مبروووك ياموووون انت واحمد ربنا يكملهالكم ع خير يارب ويرزقكم الذريه الصالحه يارب هتبقو احلى عريس وعروسه ان شاء الله ربنا يحفظكم يارب بحبكم ❤️❤️❤️❤️' },
];

const LEGACY_WISHES = [
  { name: 'أم العريس', msg: 'بالرفاه والبنين، ويجمعكم الله دائماً على المحبة والسعادة 💙' },
  { name: 'عائلة الخير', msg: 'ألف مبروك! تبارك الله لكما وبارك عليكما وجمع بينكما في خير.' },
  { name: 'A', msg: 'Congrats' },
];

/* =========================================================
   1. COVER SCREEN → OPEN INVITATION
   ========================================================= */
(function initCover() {
  const coverScreen = document.getElementById('cover-screen');
  const openBtn     = document.getElementById('openBtn');
  const mainInvite  = document.getElementById('main-invite');

  if (!coverScreen || !openBtn || !mainInvite) return;

  openBtn.addEventListener('click', open);
  coverScreen.addEventListener('click', function(e) {
    if (e.target === coverScreen) open();
  });

  function open() {
    initMusic();
    coverScreen.classList.add('exit');
    setTimeout(() => {
      coverScreen.style.display = 'none';
      mainInvite.classList.remove('hidden');
      initScrollReveal();
      initWishes();
    }, 750);
  }
})();

/* =========================================================
   1b. SINGLE HERO PHOTO PICKER
   ========================================================= */


/* ── Wedding photo gallery ── */
/* ── Wedding photo gallery ── */
(function initGallery() {
  const cards = {
    left: document.querySelector('.gallery-card-left'),
    center: document.querySelector('.gallery-card-center'),
    right: document.querySelector('.gallery-card-right'),
  };
  const dots = document.getElementById('galleryDots');
  const hint = document.getElementById('galleryHint');
  if (!cards.left || !cards.center || !cards.right || !dots || !hint) return;

  // Put your own image paths here (relative to index.html)
  const photos = [
    'images/photo1.jpg',
    'images/photo2.jpg',
    'images/photo3.jpg',
    'images/photo4.jpg',
    'images/photo5.jpg',
  ];

  let activeIndex = 0;
  let transitionTimer = 0;
  let isPaused = false;

  function render() {
    const count = photos.length;
    const offsets = { left: -1, center: 0, right: 1 };

    Object.keys(offsets).forEach(position => {
      const card = document.querySelector(`.gallery-card-${position}`);
      const photoIndex = (activeIndex + offsets[position] + count) % count;
      card.replaceChildren();
      card.setAttribute('aria-label', `عرض الصورة ${photoIndex + 1}`);

      const image = document.createElement('img');
      image.src = photos[photoIndex];
      image.alt = `صورة زفاف ${photoIndex + 1}`;
      card.append(image);
    });

    dots.replaceChildren();
    for (let index = 0; index < count; index += 1) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'gallery-dot';
      dot.setAttribute('aria-label', `الصورة ${index + 1}`);
      dot.setAttribute('aria-current', String(index === activeIndex));
      dot.addEventListener('click', () => {
        activeIndex = index;
        render();
      });
      dots.append(dot);
    }

    hint.textContent = `الصورة ${activeIndex + 1} من ${count}`;
  }

  function moveGallery(direction) {
    if (photos.length < 2) return;

    const leftCard = document.querySelector('.gallery-card-left');
    const centerCard = document.querySelector('.gallery-card-center');
    const rightCard = document.querySelector('.gallery-card-right');

    if (direction > 0) {
      leftCard.classList.add('gallery-card-teleport');
      leftCard.classList.replace('gallery-card-left', 'gallery-card-right');
      centerCard.classList.replace('gallery-card-center', 'gallery-card-left');
      rightCard.classList.replace('gallery-card-right', 'gallery-card-center');
      requestAnimationFrame(() => leftCard.classList.remove('gallery-card-teleport'));
    } else {
      rightCard.classList.add('gallery-card-teleport');
      rightCard.classList.replace('gallery-card-right', 'gallery-card-left');
      centerCard.classList.replace('gallery-card-center', 'gallery-card-right');
      leftCard.classList.replace('gallery-card-left', 'gallery-card-center');
      requestAnimationFrame(() => rightCard.classList.remove('gallery-card-teleport'));
    }

    activeIndex = (activeIndex + direction + photos.length) % photos.length;
    window.clearTimeout(transitionTimer);
    transitionTimer = window.setTimeout(render, 720);
  }

  Object.values(cards).forEach(card => {
    card.addEventListener('click', () => {
      moveGallery(card.classList.contains('gallery-card-left') ? -1 : 1);
    });
  });

  const galleryStage = document.getElementById('galleryStage');
  galleryStage.addEventListener('focusin', event => {
    if (event.target.matches('.gallery-card, .gallery-dot')) isPaused = true;
  });
  galleryStage.addEventListener('focusout', event => {
    if (!galleryStage.contains(event.relatedTarget)) isPaused = false;
  });
  window.setInterval(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isPaused && !document.hidden && !reducedMotion) moveGallery(1);
  }, 3200);

  render();
})();

/* ── Reception date and calendar ── */
(function initReception() {
  const calendar = document.getElementById('receptionCalendar');
  const countdown = document.getElementById('receptionCountdown');
  if (!calendar || !countdown) return;

  const targetDate = new Date(2026, 10, 12, 18, 30, 0);
  const firstDayOfMonth = new Date(2026, 10, 1);
  const dayOffset = (firstDayOfMonth.getDay() + 1) % 7;
  const daysInMonth = new Date(2026, 11, 0).getDate();

  for (let index = 0; index < dayOffset; index += 1) {
    const emptyDay = document.createElement('span');
    emptyDay.className = 'calendar-day-empty';
    emptyDay.setAttribute('aria-hidden', 'true');
    calendar.append(emptyDay);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const calendarDay = document.createElement('span');
    if (day === 12) {
      calendarDay.className = 'calendar-day-highlight';
      calendarDay.setAttribute('aria-label', 'الخميس 12 نوفمبر 2026، موعد الحفل');
      const dayNumber = document.createElement('span');
      dayNumber.textContent = String(day);
      calendarDay.append(dayNumber);
    } else {
      calendarDay.textContent = String(day);
    }
    calendar.append(calendarDay);
  }

  const arabicNumber = new Intl.NumberFormat('ar-EG');
  function updateCountdown() {
    const remaining = Math.max(0, targetDate.getTime() - Date.now());
    const seconds = Math.floor(remaining / 1000);
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const restSeconds = seconds % 60;
    countdown.textContent = `${arabicNumber.format(days)} يوم ${arabicNumber.format(hours)} ساعة ${arabicNumber.format(minutes)} دقيقة ${arabicNumber.format(restSeconds)} ثانية`;
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
})();

/* =========================================================
   2. SECTION SCROLL / NEXT BUTTON
   ========================================================= */
(function initNext() {
  const btn = document.getElementById('nextToDate');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const target = document.getElementById('sec-date');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  const rsvpBtn = document.getElementById('rsvpTrigger');
  if (rsvpBtn) {
    rsvpBtn.addEventListener('click', () => {
      const target = document.getElementById('sec-wishes');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
})();

/* =========================================================
   3. SCROLL REVEAL
   ========================================================= */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.navy-content > *, .cream-content > *, .footer-inner > *'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('vis');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => obs.observe(el));
}

/* =========================================================
   4. WISHES FORM
   ========================================================= */
function initWishes() {
  const SUPABASE_URL = 'https://vfycasjwudqofiqmdemh.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmeWNhc2p3dWRxb2ZpcW1kZW1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI4MDkzNDQsImV4cCI6MjEwODM4NTM0NH0.CNaZoxHgJbfoQr1bFEJCX9lYXOT6WFHatn2zlvn1VJ0';
  const API = `${SUPABASE_URL}/rest/v1/wishes`;
  const HEADERS = { apikey: SUPABASE_KEY, 'Content-Type': 'application/json' };

  const form   = document.getElementById('wishForm');
  const list   = document.getElementById('wishesList');
  const noMsg  = document.getElementById('noWishesMsg');
  const inspireBtn = document.getElementById('wishInspire');
  const messageInput = document.getElementById('wish-msg');
  const submitBtn = form ? form.querySelector('.wish-submit') : null;
  if (!form || !list) return;

  // Load wishes from the database, then the default ones
  async function loadWishes() {
    let online = [];
    try {
      const res = await fetch(`${API}?select=name,msg,created_at&order=created_at.desc&limit=300`, { headers: HEADERS });
      if (res.ok) online = await res.json();
    } catch (err) {
      console.error('Could not load wishes:', err);
    }
    const all = [
  ...online.map(w => ({ name: w.name, msg: w.msg, date: w.created_at })),
  ...DEFAULT_WISHES,
  ...LEGACY_WISHES,
    ];
    if (all.length > 0 && noMsg) noMsg.style.display = 'none';
    all.forEach((w, i) => renderWish(w.name, w.msg, Math.min(i, 10) * 80, false, w.date));
  }
  loadWishes();

  if (inspireBtn && messageInput) {
    const greetings = [
      'بارك الله لكما وبارك عليكما وجمع بينكما في خير.',
      'ألف مبارك، نتمنى لكما حياة مليئة بالمودة والسعادة.',
      'دامت أفراحكما، وجعل الله أيامكما كلها حباً وسروراً.',
      'أجمل التهاني للعروسين، بارك الله لكما وأسعد قلبكما.',
    ];
    inspireBtn.addEventListener('click', () => {
      messageInput.value = greetings[Math.floor(Math.random() * greetings.length)];
      messageInput.focus();
    });
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const name = document.getElementById('wish-name').value.trim();
    const msg  = document.getElementById('wish-msg').value.trim();

    if (!name) { shake('wish-name'); return; }
    if (!msg)  { shake('wish-msg');  return; }

    if (submitBtn) submitBtn.disabled = true;
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { ...HEADERS, Prefer: 'return=minimal' },
        body: JSON.stringify({ name, msg }),
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);

      if (noMsg) noMsg.style.display = 'none';
      renderWish(name, msg, 0, true, new Date().toISOString());
      form.reset();
    } catch (err) {
      console.error('Could not save wish:', err);
      alert('حدث خطأ أثناء إرسال التهنئة، حاول مرة أخرى.');
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });

  function renderWish(name, msg, delay = 0, prepend = false, date = new Date().toISOString()) {
    const el = document.createElement('div');
    el.className = 'wish-item';
    el.style.animationDelay = delay + 'ms';
    const dateText = new Intl.DateTimeFormat('en-CA', {
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true,
    }).format(new Date(date));
    el.innerHTML = `
      <div class="wish-item-header">
        <div class="wish-item-name">${esc(name)}</div>
        <time class="wish-item-date" datetime="${esc(date)}">${esc(dateText)}</time>
      </div>
      <div class="wish-item-msg">${esc(msg)}</div>
    `;
    if (prepend) list.insertBefore(el, list.firstChild);
    else         list.appendChild(el);
  }

  function shake(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.animation = 'none';
    requestAnimationFrame(() => { el.style.animation = 'shakeEl .4s ease'; });
    el.focus();
  }
}

  
/* =========================================================
   5. WEDDING MUSIC
   ========================================================= */
function initMusic() {
  const audio = document.getElementById('bgMusic');
  if (!audio) return;

  const playback = audio.play();
  if (playback) playback.catch(error => console.error('Unable to play wedding music:', error));
}

/* =========================================================
   UTILITIES
   ========================================================= */
function esc(s) {
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* Inject shake keyframe */
(function() {
  const s = document.createElement('style');
  s.textContent = `
    @keyframes shakeEl {
      0%,100%{transform:translateX(0)}
      25%    {transform:translateX(-5px)}
      75%    {transform:translateX(5px)}
    }
  `;
  document.head.appendChild(s);
})();
