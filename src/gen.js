/* Генератор вправ на числа, ціни, час і дати (без DOM — його також використовує validate.mjs).
 * У даних уроку: { t: 'g', g: '<назва>', min?, max? } — під час запуску перетворюється на звичайну вправу 'l' або 'i'. */
window.SK = window.SK || {};
(function (SK) {
  'use strict';
  const ONES = ['nula', 'jeden', 'dva', 'tri', 'štyri', 'päť', 'šesť', 'sedem', 'osem', 'deväť', 'desať', 'jedenásť', 'dvanásť', 'trinásť',
    'štrnásť', 'pätnásť', 'šestnásť', 'sedemnásť', 'osemnásť', 'devätnásť'];
  const TENS = ['', '', 'dvadsať', 'tridsať', 'štyridsať', 'päťdesiat', 'šesťdesiat', 'sedemdesiat', 'osemdesiat', 'deväťdesiat'];
  const HUND = ['', 'sto', 'dvesto', 'tristo', 'štyristo', 'päťsto', 'šesťsto', 'sedemsto', 'osemsto', 'deväťsto'];
  const THOU = ['', 'tisíc', 'dvetisíc', 'tritisíc', 'štyritisíc', 'päťtisíc', 'šesťtisíc', 'sedemtisíc', 'osemtisíc', 'deväťtisíc'];
  // «О котрій?» — порядкове числівник ж. р. у місцевому відмінку
  const HOUR_LOC = ['', 'jednej', 'druhej', 'tretej', 'štvrtej', 'piatej', 'šiestej', 'siedmej', 'ôsmej', 'deviatej', 'desiatej', 'jedenástej',
    'dvanástej', 'trinástej', 'štrnástej', 'pätnástej', 'šestnástej', 'sedemnástej', 'osemnástej', 'devätnástej', 'dvadsiatej',
    'dvadsiatej prvej', 'dvadsiatej druhej', 'dvadsiatej tretej'];
  // Дата: порядковий числівник у родовому відмінку
  const ORD_GEN = ['', 'prvého', 'druhého', 'tretieho', 'štvrtého', 'piateho', 'šiesteho', 'siedmeho', 'ôsmeho', 'deviateho', 'desiateho',
    'jedenásteho', 'dvanásteho', 'trinásteho', 'štrnásteho', 'pätnásteho', 'šestnásteho', 'sedemnásteho', 'osemnásteho', 'devätnásteho', 'dvadsiateho'];
  for (let d = 21; d <= 29; d++) ORD_GEN[d] = 'dvadsiateho ' + ORD_GEN[d - 20];
  ORD_GEN[30] = 'tridsiateho'; ORD_GEN[31] = 'tridsiateho prvého';
  const MONTH_GEN = ['', 'januára', 'februára', 'marca', 'apríla', 'mája', 'júna', 'júla', 'augusta', 'septembra', 'októbra', 'novembra', 'decembra'];
  const MONTH_DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  /** Число 0–9999 словами, складені — разом (dvadsaťpäť, stotridsaťštyri). g: 'm' (jeden, dva) | 'f' (jedna, dve) | 'n' (jedno, dve) */
  function words(n, g) {
    if (n === 0) return 'nula';
    if (n === 1) return g === 'f' ? 'jedna' : g === 'n' ? 'jedno' : 'jeden';
    if (n === 2) return g === 'f' || g === 'n' ? 'dve' : 'dva';
    const th = Math.floor(n / 1000), h = Math.floor((n % 1000) / 100), r = n % 100;
    let s = THOU[th] + HUND[h];
    if (r) s += r < 20 ? ONES[r] : TENS[Math.floor(r / 10)] + (r % 10 ? ONES[r % 10] : '');
    return s;
  }
  // Ціна: 1 euro / 2–4 eurá / 5+ eur (після складених чисел, написаних разом, — теж eur)
  function euros(e) {
    if (e === 1) return 'jedno euro';
    if (e >= 2 && e <= 4) return words(e, 'n') + ' eurá';
    return words(e) + ' eur';
  }
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const digits = (s) => String(s).replace(/[^\d]/g, '');

  const G = {
    // 🎧 число → цифрами
    numListen(sp) {
      const n = rnd(sp.min ?? 0, sp.max ?? 100);
      return { t: 'l', h: 'Прослухайте й запишіть цифрами', say: words(n), a: String(n), nodia: true, ph: 'цифрами, напр. 47',
        check: (v) => (digits(v) !== '' && Number(digits(v)) === n ? 'ok' : 'bad'), e: 'Словами: ' + words(n) };
    },
    // 🎧 ціна → цифрами
    priceListen(sp) {
      const e = rnd(sp.min ?? 1, sp.max ?? 49);
      const c = Math.random() < 0.25 ? 0 : rnd(10, 99);
      const say = euros(e) + (c ? ' ' + words(c) : '');
      const shown = e + ',' + String(c).padStart(2, '0') + ' €';
      return { t: 'l', h: 'Прослухайте ціну й запишіть цифрами', say, a: shown, nodia: true, ph: 'напр. 3,49',
        check: (v) => {
          const m = String(v).replace(/€|eur[aá]?/gi, '').replace(/\s+/g, '').replace(',-', '').replace(',', '.');
          return m !== '' && !isNaN(+m) && Math.round(+m * 100) === e * 100 + c ? 'ok' : 'bad';
        }, e: 'Словами: ' + say };
    },
    // 🎧 «о котрій» → цифрами
    timeListen() {
      const h = rnd(1, 23), m = Math.random() < 0.4 ? 0 : rnd(10, 59);
      const say = 'o ' + HOUR_LOC[h] + (m ? ' ' + words(m) : '');
      const shown = h + ':' + String(m).padStart(2, '0');
      return { t: 'l', h: 'Прослухайте час і запишіть цифрами', say, a: shown, nodia: true, ph: 'напр. 14:30',
        check: (v) => {
          // Кома — бо на телефоні цифрова клавіатура (inputmode="decimal") у словацькій і українській локалі має кому, а не двокрапку
          const p = String(v).trim().match(/^(\d{1,2})(?:\s*[:.,\s]\s*(\d{2}))?$/);
          if (!p) return 'bad';
          const hh = +p[1], mm = p[2] ? +p[2] : 0;
          return mm === m && (hh === h || (h <= 12 && hh === h + 12) || (h > 12 && hh === h - 12)) ? 'ok' : 'bad';
        }, e: 'Словами: ' + say + (h <= 12 ? ' (можна і ' + (h + 12) + ':' + String(m).padStart(2, '0') + ')' : '') };
    },
    // 🎧 дата → цифрами
    dateListen() {
      const mo = rnd(1, 12), d = rnd(1, MONTH_DAYS[mo]);
      const say = ORD_GEN[d] + ' ' + MONTH_GEN[mo];
      return { t: 'l', h: 'Прослухайте дату й запишіть цифрами (день. місяць.)', say, a: d + '. ' + mo + '.', nodia: true, ph: 'напр. 24. 8.',
        check: (v) => { const p = String(v).match(/(\d{1,2})\D+(\d{1,2})/); return p && +p[1] === d && +p[2] === mo ? 'ok' : 'bad'; },
        e: 'Словами: ' + say };
    },
    // ✍️ число → словами
    numWords(sp) {
      const n = rnd(sp.min ?? 0, sp.max ?? 100);
      const a = [words(n)];
      if (n === 1) a.push('jedna', 'jedno');
      if (n === 2) a.push('dve');
      return { t: 'i', q: 'Напишіть словами число <b>' + n + '</b>', a, nospace: true, say: words(n), e: 'Складені числа пишуть разом: [[' + words(n) + ']]' };
    },
    // ✍️ час → словами
    timeWords() {
      const h = rnd(1, 23), m = Math.random() < 0.6 ? 0 : [15, 20, 30, 45][rnd(0, 3)];
      const ans = 'o ' + HOUR_LOC[h] + (m ? ' ' + words(m) : '');
      return { t: 'i', q: 'О котрій? Напишіть словами: <b>' + h + ':' + String(m).padStart(2, '0') + '</b>', a: [ans, ans.slice(2)], nospace: true, e: '[[' + ans + ']]' };
    },
    // ✍️ дата → словами
    dateWords() {
      const mo = rnd(1, 12), d = rnd(1, MONTH_DAYS[mo]);
      const ans = ORD_GEN[d] + ' ' + MONTH_GEN[mo];
      return { t: 'i', q: 'Напишіть дату словами: <b>' + d + '. ' + mo + '.</b>', a: ans, nospace: true, e: '[[' + ans + ']] — день у родовому відмінку + місяць у родовому' };
    }
  };

  SK.gen = {
    words, euros, HOUR_LOC, ORD_GEN, MONTH_GEN, list: G,
    make(spec) {
      const f = G[spec.g];
      if (!f) throw new Error('Невідомий генератор вправ: ' + spec.g);
      return f(spec);
    }
  };
})(window.SK);
