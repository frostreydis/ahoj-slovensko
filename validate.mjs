// Перевірка даних уроків: структура вправ, дублікати, дужки [[ ]], порожні поля
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const src = join(dirname(fileURLToPath(import.meta.url)), 'src');
const ctx = { window: {} };
ctx.SK = ctx.window.SK = {};
vm.createContext(ctx);
vm.runInContext(readFileSync(join(src, 'gen.js'), 'utf8'), ctx, { filename: 'gen.js' });
// Беремо всі файли даних у тому порядку, у якому їх підключає src/index.html
const dataFiles = [...readFileSync(join(src, 'index.html'), 'utf8').matchAll(/<script src="(data\/[^"]+)"><\/script>/g)].map((m) => m[1]);
for (const f of dataFiles) {
  vm.runInContext(readFileSync(join(src, f), 'utf8'), ctx, { filename: f });
}
const SK = ctx.window.SK;
const errs = [];
const ids = new Set();
const brackets = (s, where) => {
  const open = (s.match(/\[\[/g) || []).length, close = (s.match(/\]\]/g) || []).length;
  if (open !== close) errs.push(where + ': [[ ]] не збалансовано (' + open + '/' + close + ')');
};
let exCount = 0, vocabCount = 0;
for (const l of SK.lessons) {
  const w = 'урок ' + l.id;
  if (ids.has(l.id)) errs.push(w + ': дубль id');
  if (!SK.program.stages.some((s) => s.id === l.stage)) errs.push(w + ': невідомий stage ' + l.stage);
  ids.add(l.id);
  for (const k of ['id', 'stage', 'num', 'title', 'dur', 'goals', 'theory', 'vocab', 'ex', 'say', 'speak', 'mission']) if (l[k] == null) errs.push(w + ': немає поля ' + k);
  brackets(l.theory, w + ' теорія');
  const seen = new Set();
  for (const v of l.vocab) {
    vocabCount++;
    if (!Array.isArray(v) || v.length < 2 || !v[0] || !v[1]) errs.push(w + ': погане слово ' + JSON.stringify(v));
    if (seen.has(v[0])) errs.push(w + ': дубль слова ' + v[0]);
    seen.add(v[0]);
  }
  l.ex.forEach((e, i) => {
    exCount++;
    const we = w + ' вправа ' + (i + 1);
    if (!['c', 'i', 'o', 'l', 'g'].includes(e.t)) errs.push(we + ': невідомий тип ' + e.t);
    if (e.t === 'g') {
      if (!SK.gen.list[e.g]) errs.push(we + ': невідомий генератор ' + e.g);
    } else if (e.t === 'c') {
      if (!Array.isArray(e.o) || e.o.length < 2) errs.push(we + ': мало варіантів');
      else if (new Set(e.o).size !== e.o.length) errs.push(we + ': однакові варіанти');
      if (!e.q) errs.push(we + ': немає питання');
    } else {
      const a = Array.isArray(e.a) ? e.a : [e.a];
      if (!a.length || a.some((x) => !x || typeof x !== 'string')) errs.push(we + ': немає відповіді');
      if ((e.t === 'i' || e.t === 'o') && !e.q) errs.push(we + ': немає питання');
      if (e.t === 'o' && a[0].split(' ').length < 2) errs.push(we + ': замало слів для порядку');
      if (e.t === 'o') {
        const sortTok = (s) => s.split(' ').map((t) => t.toLowerCase().replace(/[.,!?]/g, '')).sort().join('|');
        a.slice(1).forEach((alt) => { if (sortTok(alt) !== sortTok(a[0])) errs.push(we + ': альтернатива має інші слова: ' + alt); });
      }
    }
    if (e.e) brackets(e.e, we + ' пояснення');
  });
  l.say.forEach((p, i) => { if (!Array.isArray(p) || p.length !== 2) errs.push(w + ': say[' + i + '] має бути [sk, uk]'); });
  brackets(l.mission, w + ' місія');
}
for (const r of SK.ref) brackets(r.html, 'довідник ' + r.id);

// Генератор чисел: еталонні форми + кожна згенерована вправа приймає власну відповідь
const W = SK.gen.words, E = SK.gen.euros;
const golden = [[0, 'nula'], [2, 'dva'], [19, 'devätnásť'], [25, 'dvadsaťpäť'], [40, 'štyridsať'], [58, 'päťdesiatosem'], [99, 'deväťdesiatdeväť'],
  [100, 'sto'], [134, 'stotridsaťštyri'], [200, 'dvesto'], [1990, 'tisícdeväťstodeväťdesiat'], [2026, 'dvetisícdvadsaťšesť']];
golden.forEach(([n, s]) => { if (W(n) !== s) errs.push('gen.words(' + n + ') = ' + W(n) + ', очікувалось ' + s); });
[[1, 'jedno euro'], [3, 'tri eurá'], [5, 'päť eur'], [22, 'dvadsaťdva eur']].forEach(([n, s]) => { if (E(n) !== s) errs.push('gen.euros(' + n + ') = ' + E(n)); });
for (const g of Object.keys(SK.gen.list)) {
  for (let k = 0; k < 300; k++) {
    const it = SK.gen.make({ g, min: 0, max: 2100 });
    if (!['l', 'i'].includes(it.t) || !it.a) { errs.push('генератор ' + g + ': погана вправа'); break; }
    if (it.check && it.check(Array.isArray(it.a) ? it.a[0] : it.a) !== 'ok') { errs.push('генератор ' + g + ': не приймає власну відповідь ' + it.a); break; }
    if (it.t === 'l' && !/^[a-záäčďéíĺľňóôŕšťúýž ]+$/.test(it.say)) { errs.push('генератор ' + g + ': дивний текст для озвучення «' + it.say + '»'); break; }
  }
}
for (const s of SK.program.stages) (s.modules || []).forEach((m) => {
  for (const k of ['id', 'title', 'weeks', 'grammar', 'vocab', 'speak', 'listen', 'read', 'write', 'mission']) if (!m[k]) errs.push('модуль ' + m.id + ': немає ' + k);
  if (m.lesson) {
    const l = SK.lessons.find((x) => x.id === m.lesson);
    if (!l) errs.push('модуль ' + m.id + ': lesson «' + m.lesson + '» не знайдено (файл підключено в index.html?)');
    else if (l.stage !== s.id) errs.push('модуль ' + m.id + ': урок ' + l.id + ' має stage ' + l.stage + ', а модуль — у ' + s.id);
  }
});

console.log('Уроків: ' + SK.lessons.length + ', вправ: ' + exCount + ', слів: ' + vocabCount + ', розділів довідника: ' + SK.ref.length);
if (errs.length) { console.log('ПОМИЛКИ:\n' + errs.join('\n')); process.exit(1); }
console.log('Дані в порядку ✓');
