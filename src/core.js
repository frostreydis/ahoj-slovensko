/* Ahoj, Slovensko — тренажер словацької: стан, озвучення, запис, перевірка відповідей, інтервальне повторення */
window.SK = window.SK || {};
(function (SK) {
  'use strict';

  // ---------- Стан ----------
  // Увесь прогрес лежить у localStorage сайту під цим ключем. Ключ НЕ змінювати: інакше збережений прогрес не відкриється.
  const STORE_KEY = 'sk-trainer-v1';
  const VERSION = 1;   // версія схеми стану: змінили формат → +1 і крок у MIGRATIONS
  const DEFAULTS = {
    v: VERSION,
    start: null,
    settings: { voice: '', rate: 0.9, strict: false, newPerDay: 10, dir: 'mix' },
    lessons: {},   // id -> {opened, theory, ex:{best,done}, speak, mission}
    modules: {},   // id модуля програми -> true
    cards: {},     // id картки -> {due,int,ease,reps,lapses}
    custom: [],    // власні слова [{sk,uk}]
    days: {},      // номер дня -> {ex, cards, speak}
    newDay: { day: 0, count: 0 },
    ui: { installTip: true }   // показувати на «Сьогодні» пораду встановити тренажер як додаток
  };
  // MIGRATIONS[n](s) переводить стан версії n у версію n + 1 (змінює s на місці)
  const MIGRATIONS = {};
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const UNSAFE = new Set(['__proto__', 'constructor', 'prototype']);
  function merge(base, extra) {
    for (const k of Object.keys(extra || {})) {
      if (UNSAFE.has(k)) continue;
      if (extra[k] && typeof extra[k] === 'object' && !Array.isArray(extra[k]) && base[k] && typeof base[k] === 'object' && !Array.isArray(base[k])) merge(base[k], extra[k]);
      else base[k] = extra[k];
    }
    return base;
  }
  function migrate(s) {
    s.v = Math.floor(+s.v) || 1;
    while (s.v < VERSION && MIGRATIONS[s.v]) { MIGRATIONS[s.v](s); s.v++; }
    return s;
  }
  // Налаштування потрапляють у розмітку, тож вони мають бути саме числами й відомими рядками
  function tidy(s) {
    const st = s.settings;
    st.voice = String(st.voice || '');
    st.rate = Math.min(1.2, Math.max(0.5, +st.rate || 0.9));
    st.strict = !!st.strict;
    st.newPerDay = Math.min(50, Math.max(0, Math.round(+st.newPerDay) || 0));
    if (!['mix', 'sk', 'uk'].includes(st.dir)) st.dir = 'mix';
    if (!Array.isArray(s.custom)) s.custom = [];
    return s;
  }
  // newer — прогрес записала новіша версія тренажера: тоді нічого не записуємо, щоб старий код його не зіпсував;
  // broken — збережене не вдалося прочитати; failed — останній запис не вдався
  SK.store = { key: STORE_KEY, newer: false, broken: null, failed: null };
  function load() {
    let raw = null;
    try { raw = localStorage.getItem(STORE_KEY); } catch (e) { SK.store.broken = e; console.warn('Сховище недоступне', e); return clone(DEFAULTS); }
    if (!raw) return clone(DEFAULTS);
    try {
      const data = JSON.parse(raw);
      if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('не об\'єкт');
      SK.store.newer = (+data.v || 1) > VERSION;
      return tidy(merge(clone(DEFAULTS), migrate(data)));
    } catch (e) {
      // Наступне збереження затерло б пошкоджений запис, тому копія лишається поруч для ручного відновлення
      SK.store.broken = e;
      console.warn('Не вдалося прочитати прогрес; копію збережено під ключем ' + STORE_KEY + '-broken', e);
      try { localStorage.setItem(STORE_KEY + '-broken', raw); } catch (e2) { console.warn(e2); }
      return clone(DEFAULTS);
    }
  }
  SK.S = load();
  let warnedAt = 0;
  SK.save = function () {
    if (SK.store.newer) return;
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(SK.S));
      SK.store.failed = null;
    } catch (e) {
      SK.store.failed = e;
      console.warn('Прогрес не збережено', e);
      if (Date.now() - warnedAt > 60000 && document.body) {
        warnedAt = Date.now();
        SK.toast('⚠️ Прогрес не зберігся (' + (e && e.name || e) + '). Подробиці — у ⚙️ «Налаштування».', 6000);
      }
    }
  };
  // Зберігається завжди весь стан, тож без перечитування наступне збереження тут затерло б те, що записала
  // інша вкладка чи встановлений додаток. Екран перемальовує SK.onExternalChange (views2.js).
  window.addEventListener('storage', (e) => {
    if (e.key !== STORE_KEY && e.key !== null) return;   // null — сховище сайту очистили повністю
    SK.S = load();
    if (SK.onExternalChange) SK.onExternalChange();
  });

  // persisted: true — Chrome не видалить дані сайту сам, навіть коли забракне місця; false — може; null — невідомо.
  // Chrome вирішує без запитання: зазвичай дозволяє встановленим додаткам, закладкам і сайтам, якими часто користуються.
  SK.Storage = {
    persisted: null, listeners: [],
    async check(ask) {
      const st = navigator.storage;
      if (!st || !st.persisted) return this.persisted;
      try {
        let p = await st.persisted();
        if (!p && ask && st.persist) p = await st.persist();
        this.persisted = !!p;
      } catch (e) { this.persisted = null; }
      this.listeners.forEach((f) => f());
      return this.persisted;
    }
  };
  SK.isInstalled = () => !!(window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
  // Chrome віддає подію beforeinstallprompt один раз; зберігаємо її, щоб кнопка «Встановити» спрацювала пізніше
  SK.Install = {
    prompt: null, listeners: [],
    notify() { this.listeners.forEach((f) => f()); },
    async run() {
      const p = this.prompt; if (!p) return;
      this.prompt = null;
      p.prompt();
      try { await p.userChoice; } catch (e) { console.warn(e); }
      this.notify();
    }
  };
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); SK.Install.prompt = e; SK.Install.notify(); });
  window.addEventListener('appinstalled', () => { SK.Install.prompt = null; SK.Storage.check(true); SK.Install.notify(); });
  SK.replaceState = function (obj) { SK.S = merge(clone(DEFAULTS), obj); SK.save(); };
  SK.resetState = function () { SK.S = clone(DEFAULTS); SK.save(); };
  // Часткові скидання (зберігають налаштування)
  SK.resetLessons = function () { SK.S.lessons = {}; SK.S.modules = {}; SK.save(); };
  SK.resetWords = function () { SK.S.cards = {}; SK.S.newDay = { day: 0, count: 0 }; SK.save(); };

  // ---------- Дати ----------
  SK.today = function () {
    const d = new Date();
    return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000);
  };
  SK.dayOfWeek = function (dayNum) { return new Date(dayNum * 86400000).getUTCDay(); }; // 0 = неділя
  SK.logActivity = function (kind, n) {
    const t = SK.today();
    const d = SK.S.days[t] || (SK.S.days[t] = { ex: 0, cards: 0, speak: 0 });
    d[kind] = (d[kind] || 0) + (n || 1);
    if (!SK.S.start) SK.S.start = t;
    SK.save();
  };
  // Серія навчальних днів: вихідні не розривають серію
  SK.streak = function () {
    const t = SK.today();
    let day = t, count = 0;
    if (!SK.S.days[t]) day = t - 1;
    for (let i = 0; i < 800; i++, day--) {
      const active = !!SK.S.days[day];
      const wd = SK.dayOfWeek(day);
      if (active) count++;
      else if (wd === 0 || wd === 6) continue;
      else break;
    }
    return count;
  };

  // ---------- Утиліти ----------
  SK.esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  SK.shuffle = function (a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
  // [[текст]] або [[текст|що озвучити]] -> клікабельний словацький фрагмент
  SK.rich = function (html) {
    return String(html || '').replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (m, shown, said) =>
      '<span class="sk" data-say="' + SK.esc(said || shown) + '">' + shown + '</span>');
  };
  SK.toast = function (msg, ms) {
    let el = document.getElementById('toast');
    if (!el) { el = document.createElement('div'); el.id = 'toast'; el.className = 'toast'; document.body.appendChild(el); }
    el.textContent = msg; el.classList.add('show');
    clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('show'), ms || 2200);
  };
  // Телефон чи планшет: там екранна клавіатура закриває пів екрана, а підказки про клавіші не мають сенсу
  SK.touch = () => !!(window.matchMedia && matchMedia('(pointer: coarse)').matches);

  // ---------- Перевірка відповідей ----------
  SK.norm = (s) => String(s).toLowerCase().replace(/[.,!?;:"„“”'«»()…–—-]/g, ' ').replace(/\s+/g, ' ').trim();
  SK.stripDia = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
  // 'ok' | 'dia' (правильно, але без/з неправильною діакритикою) | 'bad'
  SK.check = function (input, answers) {
    const list = Array.isArray(answers) ? answers : [answers];
    const n = SK.norm(input);
    if (!n) return 'bad';
    if (list.some((a) => SK.norm(a) === n)) return 'ok';
    if (list.some((a) => SK.stripDia(SK.norm(a)) === SK.stripDia(n))) return 'dia';
    return 'bad';
  };

  // ---------- Озвучення (Web Speech API) ----------
  // Два рушії: 1) словацький голос системи (Web Speech API, працює й офлайн);
  // 2) словацький онлайн-голос Google (потрібен інтернет) — коли словацького голосу в системі немає
  // (macOS без завантаженого голосу Laura, Chrome на Windows без словацького мовлення тощо) або коли учень вибрав його сам.
  // Словацький текст ніколи не віддаємо несловацькому голосу: браузер прочитав би його з англійською вимовою.
  const ONLINE = '@online';   // значення settings.voice для онлайн-голосу; '' — вибір автоматично
  const ONLINE_URLS = [       // друга адреса — запасна, якщо перша не відповіла
    (q) => 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=sk&q=' + encodeURIComponent(q),
    (q) => 'https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=sk&q=' + encodeURIComponent(q)
  ];
  // Онлайн-сервіс приймає до ~200 символів за запит: ріжемо за реченнями, а задовгі речення — між словами
  SK.ttsChunks = function (text, max) {
    const out = [];
    let cur = '';
    for (const w of String(text).replace(/\s+/g, ' ').trim().split(' ')) {
      if (cur && (cur + ' ' + w).length > max) { out.push(cur); cur = w; } else cur = cur ? cur + ' ' + w : w;
      if (/[.!?…]$/.test(cur) && cur.length > max / 2) { out.push(cur); cur = ''; }
    }
    if (cur) out.push(cur);
    return out;
  };
  const natural = (v) => /natural/i.test(v.name);
  SK.TTS = {
    ONLINE,
    voices: [],
    ready: false, settled: false, listeners: [],
    system: 'speechSynthesis' in window,
    audio: null,
    token: 0,                 // події застарілого озвучення (після нового say) мають ігноруватися
    init() {
      const notify = () => this.listeners.forEach((f) => f());
      window.addEventListener('online', notify);
      window.addEventListener('offline', notify);
      if (!this.system) { this.ready = this.settled = true; notify(); return; }
      const load = () => {
        this.voices = speechSynthesis.getVoices().filter((v) => v && v.lang && /^sk([-_]|$)/i.test(v.lang) && v.name && v.name !== 'undefined');
        this.ready = true;
        notify();
      };
      load();
      speechSynthesis.onvoiceschanged = load;
      setTimeout(() => { this.settled = true; load(); }, 1500);
    },
    // Словацький голос системи, яким говоримо зараз, або null — тоді говорить онлайн-голос
    voice() {
      const v = this.voices, want = SK.S.settings.voice;
      if (want === ONLINE) return null;
      return v.find((x) => x.name === want) || v.find(natural) || v[0] || null;
    },
    label() { const v = this.voice(); return v ? v.name : 'Google — словацький, онлайн'; },
    // true — озвучити нічим: словацького голосу в системі немає, а інтернету для онлайн-голосу теж немає
    silent() { return this.settled && !this.voices.length && navigator.onLine === false; },
    stop() {
      this.token++;
      if (this.system) speechSynthesis.cancel();
      if (this.audio) this.audio.pause();
    },
    say(text, rate) {
      if (!text) return;
      this.stop();
      rate = rate || SK.S.settings.rate || 0.9;
      const v = this.voice();
      if (v) this.sayLocal(text, rate, v); else this.sayOnline(text, rate);
    },
    sayLocal(text, rate, v) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'sk-SK';
      u.voice = v;
      u.rate = rate;
      speechSynthesis.speak(u);
    },
    sayOnline(text, rate) {
      const parts = SK.ttsChunks(text, 180), token = this.token;
      // Один <audio> на всю сесію: Safari дозволяє вже «розблокованому» елементу грати без нового натискання
      const a = this.audio || (this.audio = new Audio());
      let i = 0, url = 0;
      const play = () => {
        a.src = ONLINE_URLS[url](parts[i]);
        a.defaultPlaybackRate = a.playbackRate = rate;   // нове src скидає швидкість, тому лише після нього
        a.play().catch((e) => { if (token === this.token && e && e.name === 'NotAllowedError') SK.toast('Натисніть 🔊, щоб послухати'); });
      };
      a.onended = () => { if (token === this.token && ++i < parts.length) play(); };
      a.onerror = () => {
        if (token !== this.token) return;
        if (++url < ONLINE_URLS.length) { play(); return; }
        const v = this.voices.find(natural) || this.voices[0];
        if (v) { this.sayLocal(parts.slice(i).join(' '), rate, v); return; }   // без інтернету рятує системний голос, якщо він є
        SK.toast('🔇 Онлайн-голос недоступний (немає інтернету?), а словацького голосу в системі немає. Див. ⚙️ «Налаштування».');
      };
      play();
    }
  };

  // ---------- Запис власного голосу ----------
  SK.Rec = {
    mr: null, url: null,
    supported: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder),
    async start(onStop, onError) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const chunks = [];
        this.mr = new MediaRecorder(stream);
        this.mr.ondataavailable = (e) => chunks.push(e.data);
        this.mr.onstop = () => {
          stream.getTracks().forEach((t) => t.stop());
          if (this.url) URL.revokeObjectURL(this.url);
          this.url = URL.createObjectURL(new Blob(chunks, { type: this.mr.mimeType || 'audio/webm' }));
          onStop(this.url);
        };
        this.mr.start();
      } catch (e) { onError(e); }
    },
    stop() { if (this.mr && this.mr.state !== 'inactive') this.mr.stop(); },
    active() { return !!(this.mr && this.mr.state === 'recording'); }
  };

  // Віджет: кнопка запису + програвач
  SK.recorderWidget = function (container) {
    if (!SK.Rec.supported) {
      container.innerHTML = '<span class="small muted">Запис голосу недоступний у цьому браузері.</span>';
      return;
    }
    container.innerHTML = '<button class="btn rec-btn">● Записати себе</button> <audio class="rec-audio" controls style="display:none;vertical-align:middle;max-width:260px"></audio>';
    const btn = container.querySelector('.rec-btn');
    const audio = container.querySelector('.rec-audio');
    btn.onclick = () => {
      if (SK.Rec.active()) { SK.Rec.stop(); return; }
      SK.Rec.start((url) => {
        btn.textContent = '● Записати ще раз';
        audio.src = url; audio.style.display = '';
        SK.logActivity('speak');
      }, (e) => {
        btn.textContent = '● Записати себе';
        SK.toast('Немає доступу до мікрофона: ' + (e && e.name ? e.name : e));
      });
      btn.textContent = '■ Зупинити запис';
    };
  };

  // ---------- Уроки ----------
  SK.lessons = SK.lessons || [];
  SK.lessonById = (id) => SK.lessons.find((l) => l.id === id);
  SK.lessonState = function (id) { return SK.S.lessons[id] || (SK.S.lessons[id] = {}); };
  // Стан уроку: {opened, theory, ex:{best,done}, speak, mission, skipped, run}
  //   done    — вправи виконано на ≥ 80%;  skipped — учень пропустив урок («вже знаю» / «почати з іншого уроку»);
  //   run     — незавершений підхід до вправ (див. exercises.js), щоб продовжити пізніше
  SK.lessonDone = (id) => !!(SK.S.lessons[id] && SK.S.lessons[id].ex && SK.S.lessons[id].ex.done);
  SK.lessonSkipped = (id) => !!(SK.S.lessons[id] && SK.S.lessons[id].skipped) && !SK.lessonDone(id);
  SK.lessonClosed = (id) => SK.lessonDone(id) || SK.lessonSkipped(id);
  SK.currentLesson = function () { return SK.lessons.find((l) => !SK.lessonClosed(l.id)) || SK.lessons[SK.lessons.length - 1]; };
  SK.skipLesson = function (id, on) { const st = SK.lessonState(id); if (on) st.skipped = true; else delete st.skipped; SK.save(); };
  // Пройти урок наново: скидаються позначки й вправи; слова уроку лишаються в повторенні
  SK.resetLesson = function (id) { const st = SK.lessonState(id); ['theory', 'ex', 'speak', 'mission', 'skipped', 'run'].forEach((k) => delete st[k]); SK.save(); };
  // Почати з уроку id: усі попередні незавершені уроки позначаються як пропущені
  SK.startFrom = function (id) {
    for (const l of SK.lessons) { if (l.id === id) break; if (!SK.lessonDone(l.id)) SK.lessonState(l.id).skipped = true; }
    delete SK.lessonState(id).skipped;
    SK.save();
  };

  // ---------- Інтервальне повторення ----------
  SK.cardId = (lessonId, sk) => lessonId + '|' + sk;
  // Усі слова з відкритих уроків + власні
  SK.allWords = function () {
    const out = [];
    SK.lessons.forEach((l) => {
      if (!(SK.S.lessons[l.id] && SK.S.lessons[l.id].opened)) return;
      (l.vocab || []).forEach((w) => out.push({ id: SK.cardId(l.id, w[0]), sk: w[0], uk: w[1], note: w[2] || '', lesson: l.id }));
    });
    SK.S.custom.forEach((w) => out.push({ id: SK.cardId('my', w.sk), sk: w.sk, uk: w.uk, note: w.note || '', lesson: 'my' }));
    return out;
  };
  SK.srsQueue = function () {
    const t = SK.today();
    const words = SK.allWords();
    const due = SK.shuffle(words.filter((w) => SK.S.cards[w.id] && SK.S.cards[w.id].due <= t));
    if (SK.S.newDay.day !== t) SK.S.newDay = { day: t, count: 0 };
    const room = Math.max(0, (SK.S.settings.newPerDay || 10) - SK.S.newDay.count);
    const fresh = words.filter((w) => !SK.S.cards[w.id]).slice(0, room);
    return { due, fresh, total: due.length + fresh.length };
  };
  SK.srsCounts = function () {
    const t = SK.today();
    const words = SK.allWords();
    const due = words.filter((w) => SK.S.cards[w.id] && SK.S.cards[w.id].due <= t).length;
    const known = words.filter((w) => SK.S.cards[w.id] && SK.S.cards[w.id].reps > 0).length;
    const unseen = words.filter((w) => !SK.S.cards[w.id]).length;
    return { due, known, unseen, all: words.length };
  };
  // grade: 1 знову, 2 важко, 3 добре, 4 легко
  SK.srsGrade = function (word, grade) {
    const t = SK.today();
    let c = SK.S.cards[word.id];
    if (!c) {
      c = SK.S.cards[word.id] = { due: t, int: 0, ease: 2.5, reps: 0, lapses: 0 };
      if (SK.S.newDay.day !== t) SK.S.newDay = { day: t, count: 0 };
      SK.S.newDay.count++;
    }
    if (grade === 1) {
      c.lapses++; c.reps = 0; c.int = 0; c.ease = Math.max(1.3, c.ease - 0.2); c.due = t;
    } else {
      let next;
      if (c.reps === 0) next = grade === 4 ? 3 : 1;
      else if (c.reps === 1) next = grade === 2 ? 2 : grade === 4 ? 6 : 4;
      else next = Math.round(c.int * (grade === 2 ? 1.2 : grade === 4 ? c.ease * 1.3 : c.ease));
      if (grade === 2) c.ease = Math.max(1.3, c.ease - 0.15);
      if (grade === 4) c.ease += 0.15;
      c.int = Math.max(1, next); c.reps++; c.due = t + c.int;
    }
    SK.logActivity('cards');
    SK.save();
  };
  SK.nextIntervalLabel = function (word, grade) {
    const c = SK.S.cards[word.id] || { int: 0, ease: 2.5, reps: 0 };
    if (grade === 1) return 'сьогодні';
    let next;
    if (c.reps === 0) next = grade === 4 ? 3 : 1;
    else if (c.reps === 1) next = grade === 2 ? 2 : grade === 4 ? 6 : 4;
    else next = Math.round(c.int * (grade === 2 ? 1.2 : grade === 4 ? c.ease * 1.3 : c.ease));
    next = Math.max(1, next);
    return next < 30 ? next + ' дн.' : Math.round(next / 30) + ' міс.';
  };
})(window.SK);
