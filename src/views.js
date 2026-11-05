/* Екрани тренажера і маршрутизація */
(function (SK) {
  'use strict';
  const esc = SK.esc, $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const view = () => document.getElementById('view');
  const P = SK.program;

  const NAV = [['today', '🏠', 'Сьогодні', 'Сьогодні'], ['program', '🗺️', 'Програма', 'План'], ['lessons', '📘', 'Уроки', 'Уроки'], ['words', '🃏', 'Слова', 'Слова'],
    ['speak', '🎙️', 'Розмова', 'Мова'], ['ref', '📚', 'Довідник', 'Довідка'], ['settings', '⚙️', 'Налаштування', 'Опції']];

  function stageOf(id) { return P.stages.find((s) => s.id === id); }
  // Модуль програми може мати поле lesson: 'a2-1' — тоді він виконаний, коли пройдено урок
  const modLesson = (m) => (m.lesson && SK.lessonById(m.lesson)) || null;
  const modDone = (m) => (modLesson(m) ? SK.lessonClosed(m.lesson) : !!SK.S.modules[m.id]);
  function overall() {
    let done = 0, total = 0;
    P.stages.forEach((s) => {
      if (s.built) SK.lessons.filter((l) => l.stage === s.id).forEach((l) => { total++; if (SK.lessonClosed(l.id)) done++; });
      else (s.modules || []).forEach((m) => { total++; if (modDone(m)) done++; });
    });
    return { done, total, pct: Math.round((done / total) * 100) };
  }
  // Що прогрес не зберігається, учень має побачити на будь-якому екрані, а не лише в налаштуваннях
  function voiceBanner() {
    let h = '';
    if (SK.store.newer) h += '<div class="warn-banner">⚠️ Ваш прогрес збережено новішою версією тренажера. Оновіть сторінку з інтернетом — доти зміни не зберігаються.</div>';
    else if (SK.store.broken) h += '<div class="warn-banner">⚠️ Не вдалося прочитати збережений прогрес. Подробиці — у ⚙️ «Налаштування».</div>';
    if (SK.TTS.silent()) h += '<div class="warn-banner voice-banner">🔇 Немає інтернету, а словацького голосу в цій системі немає, тому озвучення не працюватиме. Як додати словацький голос, що працює без інтернету, — див. ⚙️ «Налаштування».</div>';
    return h;
  }

  // ---------- Сьогодні ----------
  function renderToday() {
    const t = SK.today(), wd = SK.dayOfWeek(t);
    const cur = SK.currentLesson();
    const counts = SK.srsCounts();
    const q = SK.srsQueue();
    const o = overall();
    const isA0 = cur && cur.stage === 'a0';
    const plan = P.week.find((w) => w.d === wd);
    const date = new Date().toLocaleDateString('uk-UA', { weekday: 'long', day: 'numeric', month: 'long' });
    view().innerHTML = voiceBanner() + '<div id="install-tip"></div>' +
      '<div class="card"><div class="row"><div><h1>Ahoj! 👋</h1><div class="muted">' + esc(date) + '</div></div><span class="spacer"></span>' +
      '<div class="center"><div class="stat">🔥 ' + SK.streak() + '</div><div class="small muted">днів поспіль<br>(вихідні не рахуються)</div></div></div></div>' +
      '<div class="grid g2">' +
      '<div class="card"><h3>📌 План на сьогодні</h3>' +
      (plan ? '<p><b>' + plan.name + ':</b> ' + esc(isA0 ? P.weekA0 : plan.full) + '</p><p class="small muted">Якщо є лише 15 хв: ' + esc(isA0 ? 'половина уроку' : plan.min) + '.</p>'
        : '<p>Вихідний 🙂 Навчання за бажанням: словацьке радіо фоном, серіал, прогулянка з читанням вивісок.</p>') +
      '<p class="small">' + esc(P.daily) + '</p>' +
      '<div class="row"><a class="btn primary" href="#/lesson/' + cur.id + '">📘 Урок ' + esc(cur.num) + '</a>' +
      '<a class="btn" href="#/words">🃏 Слова (' + q.total + ')</a><a class="btn" href="#/speak">🎙️ Розмова</a><a class="btn" href="#/drill">🔢 Числа</a></div></div>' +
      '<div class="card"><h3>⏱️ Таймер заняття</h3><div class="row"><span class="timer" id="tmr">15:00</span><span class="spacer"></span>' +
      '<button class="btn small" data-min="15">15 хв</button><button class="btn small" data-min="30">30 хв</button><button class="btn small" id="tmr-stop">Стоп</button></div>' +
      '<p class="small muted">Коротко, але щодня — це краще, ніж довго раз на тиждень.</p></div></div>' +
      '<div class="card"><h3>Поточний урок: ' + esc(cur.num + ' · ' + cur.title) + '</h3>' + lessonChecks(cur) + '</div>' +
      '<div class="grid g3">' +
      '<div class="card center"><div class="stat">' + o.pct + '%</div><div class="small muted">програми до B2 (' + o.done + ' з ' + o.total + ' кроків)</div><div class="bar" style="margin-top:8px"><i style="width:' + o.pct + '%"></i></div></div>' +
      '<div class="card center"><div class="stat">' + counts.known + '</div><div class="small muted">слів у повторенні</div></div>' +
      '<div class="card center"><div class="stat">' + counts.due + '</div><div class="small muted">слів на повторення сьогодні</div></div></div>';
    timerInit();
    if (SK.fillInstallTip) SK.fillInstallTip();
  }
  let tmrInt = null;
  function timerInit() {
    const el = $('#tmr'); if (!el) return;
    $$('[data-min]').forEach((b) => b.onclick = () => {
      clearInterval(tmrInt);
      // Рахуємо від часу старту: на телефоні з вимкненим екраном тики setInterval зупиняються
      const end = Date.now() + b.dataset.min * 60000;
      const draw = () => {
        const left = Math.max(0, Math.ceil((end - Date.now()) / 1000));
        el.textContent = String(Math.floor(left / 60)).padStart(2, '0') + ':' + String(left % 60).padStart(2, '0');
        return left;
      };
      draw();
      tmrInt = setInterval(() => { if (draw() <= 0) { clearInterval(tmrInt); SK.toast('⏰ Час вийшов! Výborne — чудова робота!'); SK.TTS.say('Výborne!'); } }, 250);
    });
    $('#tmr-stop').onclick = () => { clearInterval(tmrInt); el.textContent = '15:00'; };
  }
  function lessonChecks(l) {
    const s = SK.S.lessons[l.id] || {};
    const mk = (ok, txt) => '<span class="pill ' + (ok ? 'green' : 'gray') + '">' + (ok ? '✓ ' : '○ ') + txt + '</span>';
    const run = s.run && s.run.ft ? ' <span class="pill amber">⏸ вправи: ' + Object.keys(s.run.ft).length + ' з ' + (+s.run.n || 0) + '</span>' : '';
    return '<div class="row lesson-checks">' + (SK.lessonSkipped(l.id) ? '<span class="pill amber">⏭ пропущено</span>' : '') + mk(s.theory, 'Теорія') +
      mk(s.ex && s.ex.done, 'Вправи ≥ 80%' + (s.ex && s.ex.best != null ? ' (' + s.ex.best + '%)' : '')) + run +
      mk(s.speak, 'Розмова') + mk(s.mission, 'Місія') + '</div>';
  }
  // Статус уроку в списках
  function lessonBadge(l) {
    const st = SK.S.lessons[l.id] || {};
    if (SK.lessonDone(l.id)) return '<span class="pill green">✓ пройдено</span>';
    if (SK.lessonSkipped(l.id)) return '<span class="pill gray">⏭ пропущено</span>';
    if (st.run && st.run.ft) return '<span class="pill amber">⏸ ' + Object.keys(st.run.ft).length + '/' + (+st.run.n || 0) + '</span>';
    return st.opened ? '<span class="pill amber">у процесі</span>' : '';
  }

  // ---------- Програма ----------
  function renderProgram() {
    const h = [];
    h.push('<div class="card"><h1>🗺️ Програма: від нуля до B2</h1><p>' + esc(P.intro) + '</p><p class="muted">' + esc(P.estimate) + '</p>' +
      '<button class="btn small no-print" onclick="window.print()">🖨️ Надрукувати / зберегти як PDF</button></div>');
    h.push('<div class="card"><h2>Принципи</h2><div class="grid g2">' + P.principles.map((p) => '<div><b>' + esc(p[0]) + '.</b> ' + esc(p[1]) + '</div>').join('') + '</div></div>');
    const wd = SK.dayOfWeek(SK.today());
    h.push('<div class="card"><h2>Тижневий ритм (15–30 хв)</h2><p class="small">' + esc(P.daily) + '</p><div class="tblwrap"><table class="week-plan"><tr><th>День</th><th>Повний варіант (30 хв)</th><th>Мінімум (15 хв)</th></tr>' +
      P.week.map((w) => '<tr' + (w.d === wd ? ' class="today-row"' : '') + '><td>' + w.name + '</td><td>' + esc(w.full) + '</td><td>' + esc(w.min) + '</td></tr>').join('') +
      '<tr><td>Сб–Нд</td><td colspan="2">Вільно. За бажанням — пасивне занурення.</td></tr></table></div><p class="small muted">' + esc(P.weekA0) + '</p></div>');
    P.stages.forEach((s, i) => {
      const items = s.built ? SK.lessons.filter((l) => l.stage === s.id) : s.modules;
      const done = s.built ? items.filter((l) => SK.lessonClosed(l.id)).length : items.filter(modDone).length;
      const anyBuilt = !s.built && items.some(modLesson);
      h.push('<details class="stage card"' + (i < 2 || done < items.length && done > 0 ? ' open' : '') + '><summary><div class="row"><span class="pill">' + esc(s.level) + '</span><h2 style="margin:0">' + esc(s.title) + '</h2><span class="spacer"></span><span class="small muted">тижні ' + esc(s.weeks) + ' · ' + done + '/' + items.length + '</span></div></summary>' +
        '<p><b>Після етапу я вмію:</b></p><ul class="check">' + s.cando.map((c) => '<li>' + esc(c) + '</li>').join('') + '</ul>' +
        (s.checkpoint ? '<p class="tip"><b>Контрольна точка:</b> ' + esc(s.checkpoint) + '</p>' : '') +
        (s.built ? items.map((l) => '<a class="lesson-item" href="#/lesson/' + l.id + '"><span class="num">' + esc(l.num) + '</span><span>' + esc(l.title) + '<br><span class="small muted">' + esc(l.dur) + ' · ' + esc(l.goals.join('; ')) + '</span></span><span class="spacer"></span>' + lessonBadge(l) + '</a>').join('')
          : (anyBuilt ? '' : '<p class="small note">Інтерактивні уроки для цих модулів з\'являться в наступних версіях тренажера. Поки що працюйте за планом нижче і позначайте виконані модулі.</p>') +
            items.map((m) => '<details class="mod"><summary>' + (modDone(m) ? '<span class="done-mark">✓</span> ' : '') + esc(m.title) + ' <span class="small muted">· тижні ' + esc(m.weeks) + '</span>' + (modLesson(m) ? ' <span class="pill green">є урок</span>' : '') + '</summary><div class="kv">' +
              [['Граматика', m.grammar], ['Лексика', m.vocab], ['Розмова', m.speak], ['Слухання', m.listen], ['Читання', m.read], ['Письмо', m.write], ['Місія', m.mission]].map((r) => '<b>' + r[0] + '</b><span>' + esc(r[1]) + '</span>').join('') +
              '</div>' + (modLesson(m) ? '<div class="row" style="margin-top:8px"><a class="btn primary small" href="#/lesson/' + m.lesson + '">📘 Відкрити урок ' + esc(modLesson(m).num) + '</a></div>'
                : '<label class="row" style="margin-top:8px"><input type="checkbox" data-mod="' + m.id + '"' + (SK.S.modules[m.id] ? ' checked' : '') + '> Модуль виконано</label>') + '</details>').join('')) +
        '</details>');
    });
    h.push('<div class="card"><h2>🪪 Мова і ВНЖ</h2><div class="tblwrap"><table>' + SK.residence.items.map((r) => '<tr><td><b>' + esc(r[0]) + '</b></td><td>' + r[1] + '</td></tr>').join('') + '</table></div>' +
      '<p class="small muted">' + esc(SK.residence.note) + ' Перевірено: ' + esc(SK.residence.checked) + '. ' + SK.residence.links.map((l) => '<a href="' + l[1] + '" target="_blank" rel="noopener">' + esc(l[0]) + '</a>').join(' · ') + '</p></div>');
    h.push('<div class="card"><h2>🎓 Іспит і сертифікат</h2><p>' + esc(SK.exam.text) + '</p><p>' + SK.exam.links.map((l) => '<a href="' + l[1] + '" target="_blank" rel="noopener">' + esc(l[0]) + '</a>').join(' · ') + '</p></div>');
    h.push('<div class="card"><h2>🔗 Ресурси</h2>' + SK.resources.map((g) => '<h3>' + esc(g.cat) + '</h3><ul>' + g.items.map((r) => '<li><a href="' + r[1] + '" target="_blank" rel="noopener"><b>' + esc(r[0]) + '</b></a> <span class="pill gray">' + esc(r[3]) + '</span> — ' + esc(r[2]) + '</li>').join('') + '</ul>').join('') + '</div>');
    view().innerHTML = h.join('');
    $$('[data-mod]').forEach((c) => c.onchange = () => { SK.S.modules[c.dataset.mod] = c.checked; SK.save(); SK.toast(c.checked ? 'Модуль позначено ✓' : 'Позначку знято'); });
  }

  // ---------- Список уроків ----------
  function renderLessons() {
    const groups = P.stages.filter((s) => SK.lessons.some((l) => l.stage === s.id));
    view().innerHTML = '<div class="card"><h1>📘 Уроки</h1><p class="muted">Кожен урок складається з теорії з озвученням, слів, вправ, розмовної практики й місії в реальному житті. Урок зараховано, коли вправи виконано на ≥ 80%.</p>' +
      '<p class="small">Будь-який урок можна відкрити в будь-який момент. Усередині уроку є кнопки <b>«Пропустити урок»</b> (якщо тему вже знаєте), <b>«Почати з цього уроку»</b> (попередні позначаться як пропущені) і <b>«Пройти наново»</b>. Почати все з нуля можна в ⚙️ «Налаштуваннях».</p></div>' +
      groups.map((s) => '<div class="card"><h2>' + esc(s.level + ' · ' + s.title) + '</h2>' + SK.lessons.filter((l) => l.stage === s.id).map((l) => {
        const st = SK.S.lessons[l.id] || {};
        const best = st.ex && st.ex.best != null ? st.ex.best + '%' : '—';
        return '<a class="lesson-item" href="#/lesson/' + l.id + '"><span class="num">' + esc(l.num) + '</span><span>' + esc(l.title) + '<br><span class="small muted">' + esc(l.dur) + ' · найкращий результат: ' + best + '</span></span><span class="spacer"></span>' +
          lessonBadge(l) + '</a>';
      }).join('') + '</div>').join('') +
      '<a class="card lesson-item" href="#/drill" style="text-decoration:none"><span class="num">🔢</span><span><b>Тренажер чисел, цін, часу й дат</b><br><span class="small muted">нескінченні диктанти на слух і письмо словами — для каси, транспорту, лікаря</span></span></a>' +
      '<div class="card"><h3>Далі: A2 → B1 → B2</h3><p>План наступних рівнів — у вкладці <a href="#/program">«Програма»</a>. Уроки для них з\'являться в наступних версіях тренажера.</p></div>';
  }

  // ---------- Керування прогресом уроку ----------
  function lessonControls(l, idx) {
    const done = SK.lessonDone(l.id), skipped = SK.lessonSkipped(l.id);
    const st = SK.S.lessons[l.id] || {};
    const hasProgress = st.theory || st.ex || st.speak || st.mission || st.run || st.skipped;
    const earlierOpen = SK.lessons.slice(0, idx).some((x) => !SK.lessonClosed(x.id));
    return '<div class="row small" style="margin-top:8px">' +
      (!done && !skipped ? '<button class="btn small" id="lc-skip" title="Тему вже знаю — перейти до наступного уроку">⏭ Пропустити урок</button>' : '') +
      (skipped ? '<button class="btn small" id="lc-unskip">↩ Повернути урок</button>' : '') +
      (earlierOpen ? '<button class="btn small" id="lc-from" title="Усі попередні незавершені уроки позначаться як пропущені">▶ Почати з цього уроку</button>' : '') +
      (hasProgress ? '<button class="btn small" id="lc-reset" title="Скинути позначки й вправи цього уроку (слова лишаються)">↺ Пройти урок наново</button>' : '') +
      '</div>';
  }
  function confirmClick(btn, label, action) {
    if (!btn) return;
    const orig = btn.textContent;
    btn.onclick = () => {
      if (!btn.dataset.sure) { btn.dataset.sure = '1'; btn.textContent = label; setTimeout(() => { btn.dataset.sure = ''; btn.textContent = orig; }, 3500); return; }
      action();
    };
  }
  SK.confirmClick = confirmClick;
  function bindLessonControls(l, tab, next) {
    const reload = () => renderLesson(l.id, tab);
    const sk = $('#lc-skip');
    if (sk) sk.onclick = () => { SK.skipLesson(l.id, true); SK.toast('Урок ' + l.num + ' пропущено'); location.hash = next ? '#/lesson/' + next.id : '#/lessons'; };
    const un = $('#lc-unskip');
    if (un) un.onclick = () => { SK.skipLesson(l.id, false); SK.toast('Урок повернуто в план'); reload(); };
    confirmClick($('#lc-from'), '▶ Так, попередні — пропустити', () => { SK.startFrom(l.id); SK.toast('Тепер навчання починається з уроку ' + l.num); reload(); });
    confirmClick($('#lc-reset'), '↺ Точно скинути прогрес уроку?', () => { SK.resetLesson(l.id); SK.toast('Прогрес уроку скинуто. Слова лишаються в повторенні.'); reload(); });
  }

  // ---------- Урок ----------
  function renderLesson(id, tab) {
    const l = SK.lessonById(id);
    if (!l) { location.hash = '#/lessons'; return; }
    const st = SK.lessonState(id);
    if (!st.opened) { st.opened = true; SK.save(); }
    tab = tab || 'theory';
    const idx = SK.lessons.indexOf(l);
    const prev = SK.lessons[idx - 1], next = SK.lessons[idx + 1];
    const tabs = [['theory', 'Теорія'], ['words', 'Слова (' + l.vocab.length + ')'], ['ex', 'Вправи (' + l.ex.length + ')'], ['speak', 'Розмова'], ['mission', 'Місія']];
    // На телефоні повна шапка уроку займала б увесь перший екран, і вправа опинялася б під екранною клавіатурою
    const narrow = window.matchMedia && matchMedia('(max-width:700px)').matches;
    view().innerHTML = voiceBanner() + '<div class="card lesson-head tab-' + tab + '"><div class="row small muted"><a href="#/lessons">← Уроки</a><span class="spacer"></span>' + esc(stageOf(l.stage).level) + ' · ' + esc(l.dur) + '</div>' +
      '<h1>' + esc(l.num + ' · ' + l.title) + '</h1><p class="small lesson-goals"><b>Мета:</b> ' + esc(l.goals.join(' · ')) + '</p>' + lessonChecks(l) +
      (narrow ? '<details class="lc-more"><summary class="small muted">⋯ Керування уроком</summary>' + lessonControls(l, idx) + '</details>' : lessonControls(l, idx)) +
      '<div class="subtabs">' + tabs.map((t) => '<button data-tab="' + t[0] + '" class="' + (t[0] === tab ? 'active' : '') + '">' + t[1] + '</button>').join('') + '</div></div>' +
      '<div id="lesson-body"></div>' +
      '<div class="row" style="margin-top:6px">' + (prev ? '<a class="btn" href="#/lesson/' + prev.id + '">← ' + esc(prev.num) + '</a>' : '') + '<span class="spacer"></span>' + (next ? '<a class="btn" href="#/lesson/' + next.id + '">' + esc(next.num) + ' →</a>' : '') + '</div>';
    $$('.subtabs button').forEach((b) => b.onclick = () => { location.hash = '#/lesson/' + id + '/' + b.dataset.tab; });
    bindLessonControls(l, tab, next);
    const body = $('#lesson-body');
    if (tab === 'theory') {
      body.innerHTML = '<div class="card">' + SK.rich(l.theory) + '<div class="row" style="margin-top:12px"><span class="spacer"></span><button class="btn primary" id="th-done">' + (st.theory ? '✓ Прочитано' : 'Прочитав(ла) → до слів') + '</button></div></div>';
      $('#th-done').onclick = () => { st.theory = true; SK.save(); location.hash = '#/lesson/' + id + '/words'; };
    } else if (tab === 'words') {
      body.innerHTML = '<div class="card">' + (l.vocab.length ? '<p class="small muted">Ці слова вже додано до «Слів» — вони з\'являтимуться на повторення (до ' + (+SK.S.settings.newPerDay || 0) + ' нових на день).</p><div class="tblwrap"><table><tr><th>Словацькою</th><th>Українською</th><th>Примітка</th></tr>' +
        l.vocab.map((w) => '<tr><td>' + SK.rich('[[' + w[0] + '|' + SK.sayText(w[0]) + ']]') + '</td><td>' + esc(w[1]) + '</td><td class="small muted">' + esc(w[2] || '') + '</td></tr>').join('') + '</table></div>' : '<p>У цьому уроці немає нових слів — повторіть слова попередніх уроків.</p>') +
        '<div class="row"><a class="btn" href="#/words">🃏 Повторювати слова</a><span class="spacer"></span><a class="btn primary" href="#/lesson/' + id + '/ex">До вправ →</a></div></div>';
    } else if (tab === 'ex') {
      SK.runExercises(body, l.ex, { saveKey: id, onFinish: (score) => {
        st.ex = st.ex || {};
        st.ex.best = Math.max(st.ex.best || 0, score);
        if (score >= 80) st.ex.done = true;
        SK.save();
        const checks = $('.lesson-checks'); if (checks) checks.outerHTML = lessonChecks(l);
      } });
    } else if (tab === 'speak') {
      body.innerHTML = '<div class="card"><h3>🔁 Shadowing: слухайте → повторюйте → записуйте себе</h3>' +
        (l.say.length ? l.say.map((p, k) => '<div class="lesson-item" style="flex-wrap:wrap"><span>' + SK.rich('[[' + p[0] + ']]') + '<br><span class="small muted">' + esc(p[1]) + '</span></span><span class="spacer"></span><button class="btn small" data-slow="' + k + '">🐢</button><span class="rec" data-k="' + k + '"></span></div>').join('') : '<p class="muted">Візьміть фрази з попередніх уроків у вкладці «Розмова».</p>') +
        '<h3 style="margin-top:16px">🗣️ Говоріть уголос</h3><ul>' + l.speak.map((s) => '<li>' + esc(s) + '</li>').join('') + '</ul>' +
        '<div class="row"><span class="rec-free"></span><span class="spacer"></span><button class="btn primary" id="sp-done">' + (st.speak ? '✓ Розмову виконано' : 'Позначити як виконане') + '</button></div></div>';
      $$('.rec', body).forEach((el) => SK.recorderWidget(el));
      SK.recorderWidget($('.rec-free', body));
      $$('[data-slow]', body).forEach((b) => b.onclick = () => SK.TTS.say(l.say[+b.dataset.slow][0], 0.6));
      $('#sp-done').onclick = () => { st.speak = true; SK.save(); SK.logActivity('speak'); renderLesson(id, 'speak'); };
    } else if (tab === 'mission') {
      body.innerHTML = '<div class="card"><h3>🎯 Місія в реальному житті</h3><p style="font-size:1.1rem">' + SK.rich(l.mission) + '</p>' +
        '<p class="small muted">Не вийшло з першого разу? Це нормально — спробуйте ще раз наступного тижня. Головне — що ви спробували говорити.</p>' +
        '<div class="row"><span class="spacer"></span><button class="btn primary" id="ms-done">' + (st.mission ? '✓ Місію виконано' : 'Я це зробив(ла)!') + '</button></div></div>';
      $('#ms-done').onclick = () => { st.mission = true; SK.save(); SK.toast('Výborne! 🎉'); renderLesson(id, 'mission'); };
    }
  }

  SK.views = { NAV, renderToday, renderProgram, renderLessons, renderLesson, voiceBanner };
})(window.SK);
