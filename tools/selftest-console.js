/*
 * Самоперевірка тренажера в браузері.
 * 1) Відкрийте тренажер: локально — `python -m http.server 8000 -d docs` і http://127.0.0.1:8000/, або сайт на GitHub Pages;
 * 2) F12 → Console; 3) вставте цей файл повністю й натисніть Enter.
 * Скрипт відкриває всі екрани й проходить УСІ вправи всіх уроків (і тренажера чисел) правильними
 * відповідями через справжній інтерфейс, а тоді показує таблицю результатів.
 * Поточну вправу бере з SK._exCurrent (його виставляє exercises.js). Ваш прогрес зберігається перед тестом і відновлюється після нього.
 */
(async () => {
  const backup = JSON.stringify(SK.S);
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const first = (a) => (Array.isArray(a) ? a[0] : a);
  const report = {};

  async function solveAll(label) {
    const bad = []; let fin = '';
    for (let step = 0; step < 300; step++) {
      const box = document.querySelector('.ex-box'); if (!box) { bad.push('немає вправи'); break; }
      if (box.querySelector('.again')) { fin = box.querySelector('.stat').textContent; break; }
      const it = SK._exCurrent;
      try {
        if (it.t === 'c') {
          [...box.querySelectorAll('.opt')].find((o) => o.dataset.v === it.o[it.a || 0]).click();
        } else if (it.t === 'o') {
          for (const w of first(it.a).split(' ')) [...box.querySelectorAll('.pool .tok')].find((t) => t.textContent === w).click();
          box.querySelector('.act').click();
        } else {
          box.querySelector('.ans').value = first(it.a);
          box.querySelector('.act').click();
        }
      } catch (e) { bad.push(it.t + ' «' + String(it.q || it.say || '').slice(0, 40) + '»: ' + e.message); break; }
      const fb = box.querySelector('.feedback');
      if (!fb || !fb.classList.contains('ok')) bad.push(it.t + ' «' + String(it.q || it.say || '').replace(/<[^>]+>/g, '').slice(0, 40) + '»');
      box.querySelector('.act').click(); await wait(10);
    }
    report[label] = bad.length ? 'ПРОБЛЕМИ: ' + bad.join('; ') : fin;
  }

  // Сценарії прогресу: продовження підходу, пропуск завдання й уроку, «почати з цього уроку», «пройти наново»
  async function scenarios() {
    const go = async (h, ms) => { location.hash = '#/today'; await wait(30); location.hash = h; await wait(ms || 150); };
    const answer = async () => { const box = document.querySelector('.ex-box'); const it = SK._exCurrent;
      if (it.t === 'c') [...box.querySelectorAll('.opt')].find((o) => o.dataset.v === it.o[it.a || 0]).click();
      else if (it.t === 'o') { for (const w of first(it.a).split(' ')) [...box.querySelectorAll('.pool .tok')].find((t) => t.textContent === w).click(); box.querySelector('.act').click(); }
      else { box.querySelector('.ans').value = first(it.a); box.querySelector('.act').click(); }
      box.querySelector('.act').click(); await wait(20); };
    const res = {};
    await go('#/lesson/a1-1/ex'); await answer(); await answer();
    await go('#/lesson/a1-1/ex');
    const cont = document.querySelector('.ex-box .cont');
    res['продовження: є запит'] = !!cont;
    if (cont) { cont.click(); await wait(50); res['продовження: з 3-го завдання'] = /Завдання 3 з/.test(document.querySelector('.ex-box').textContent); }
    document.querySelector('.ex-box .skip').click(); await wait(20);
    res['пропуск завдання'] = /Пропущено/.test(document.querySelector('.fb').textContent) && !!SK.S.lessons['a1-1'].run.sk[SK._exCurrent._i];
    await go('#/lesson/a0-1');
    document.getElementById('lc-skip').click(); await wait(100);
    res['пропуск уроку'] = SK.lessonSkipped('a0-1') && SK.currentLesson().id !== 'a0-1';
    await go('#/lesson/a1-3');
    const from = document.getElementById('lc-from'); from.click(); from.click(); await wait(100);
    res['почати з уроку'] = SK.currentLesson().id === 'a1-3' && SK.lessons.slice(0, SK.lessons.findIndex((l) => l.id === 'a1-3')).every((l) => SK.lessonClosed(l.id));
    await go('#/lesson/a1-1');
    const rs = document.getElementById('lc-reset'); rs.click(); rs.click(); await wait(100);
    res['пройти наново'] = !SK.S.lessons['a1-1'].run && !SK.S.lessons['a1-1'].skipped && !SK.S.lessons['a1-1'].ex;
    // Сховище: збій запису має бути помічений, а зміни з іншої вкладки — перечитані, навіть якщо в них шкідливі дані
    const setItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function () { throw new DOMException('самоперевірка', 'QuotaExceededError'); };
    try { SK.save(); } finally { Storage.prototype.setItem = setItem; }
    res['збій запису помічено'] = !!SK.store.failed;
    SK.save();
    res['запис після збою'] = !SK.store.failed;
    const fromTab = (mutate) => {
      const raw = mutate(JSON.parse(localStorage.getItem(SK.store.key)));
      localStorage.setItem(SK.store.key, typeof raw === 'string' ? raw : JSON.stringify(raw));
      window.dispatchEvent(new StorageEvent('storage', { key: SK.store.key }));
    };
    fromTab((s) => { s.custom = [{ sk: 'selftest', uk: 'тест' }]; return s; });
    res['зміна з іншої вкладки'] = SK.S.custom.length === 1 && SK.S.custom[0].sk === 'selftest';
    fromTab((s) => { s.settings.rate = '<img src=x onerror=alert(1)>'; return JSON.stringify(s).replace('{', '{"__proto__":{"polluted":1},'); });
    res['шкідливі дані знешкоджено'] = typeof SK.S.settings.rate === 'number' && ({}).polluted === undefined;
    for (const [k, v] of Object.entries(res)) report['стан: ' + k] = v ? 'ok' : 'ПОМИЛКА';
    SK.resetState();
  }

  // Без звуку: сотні диктантів підряд — це сотні запитів до онлайн-голосу, сервіс може тимчасово заблокувати
  const say = SK.TTS.say;
  SK.TTS.say = () => {};
  try {
    SK.resetState(); // тест іде на чистому стані; ваш прогрес повернеться в кінці
    await scenarios();
    for (const p of ['today', 'program', 'lessons', 'words', 'words/list', 'words/my', 'speak', 'ref', 'settings', 'drill']) {
      location.hash = '#/' + p; await wait(120);
      report['екран ' + p] = document.querySelector('#view pre') ? 'ПОМИЛКА: ' + document.querySelector('#view pre').textContent.slice(0, 150) : 'ok';
    }
    for (const L of SK.lessons) {
      for (const tab of ['theory', 'words', 'speak', 'mission']) {
        location.hash = '#/lesson/' + L.id + '/' + tab; await wait(40);
        if (document.querySelector('#view pre')) report[L.id + ' ' + tab] = 'ПОМИЛКА екрана';
      }
      location.hash = '#/today'; await wait(30);
      location.hash = '#/lesson/' + L.id + '/ex'; await wait(120);
      await solveAll(L.id + ' вправи');
    }
    for (const mode of ['n20', 'n100', 'n999', 'year', 'price', 'time', 'date', 'nw', 'tw', 'dw', 'mix']) {
      location.hash = '#/today'; await wait(30);
      location.hash = '#/drill/' + mode; await wait(120);
      await solveAll('тренажер ' + mode);
    }
  } finally {
    SK.TTS.say = say;
    SK.TTS.stop();
    SK.replaceState(JSON.parse(backup));
    location.hash = '#/today';
  }
  console.table(report);
  const problems = Object.entries(report).filter(([, v]) => v !== 'ok' && v !== '100%');
  console.log(problems.length ? '❌ Знайдено проблем: ' + problems.length : '✅ Усе гаразд: усі екрани відкриваються, усі вправи розв\'язуються.');
  return problems;
})();
