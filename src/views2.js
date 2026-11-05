/* Екрани: слова, розмова, довідник, налаштування; маршрутизація та запуск */
(function (SK) {
  'use strict';
  const esc = SK.esc, $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const view = () => document.getElementById('view');
  SK.sayText = (s) => String(s).replace(/\s*\((m|ž|s)\)/g, '').replace(/\s\/\s/g, ', ').replace(/\s*\([^)]*\)/g, '');

  // ---------- Слова (інтервальне повторення) ----------
  function renderWords(sub) {
    sub = sub || 'review';
    const c = SK.srsCounts();
    view().innerHTML = SK.views.voiceBanner() + '<div class="card"><h1>🃏 Слова</h1><div class="row small"><span class="pill">' + c.due + ' на повторення</span><span class="pill green">' + c.known + ' у пам\'яті</span><span class="pill gray">' + c.unseen + ' нових чекають</span></div>' +
      '<div class="subtabs"><button data-s="review" class="' + (sub === 'review' ? 'active' : '') + '">Повторення</button><button data-s="list" class="' + (sub === 'list' ? 'active' : '') + '">Усі слова</button><button data-s="my" class="' + (sub === 'my' ? 'active' : '') + '">Мої слова</button></div></div><div id="w-body"></div>';
    $$('[data-s]').forEach((b) => b.onclick = () => { location.hash = '#/words/' + b.dataset.s; });
    const body = $('#w-body');
    if (sub === 'review') review(body);
    else if (sub === 'list') wordList(body);
    else myWords(body);
  }
  function review(body) {
    const q = SK.srsQueue();
    const queue = q.due.concat(q.fresh);
    if (!queue.length) {
      body.innerHTML = '<div class="card center"><h2>🎉 На сьогодні все!</h2><p class="muted">' + (SK.srsCounts().all ? 'Повертайтеся завтра. Нові слова з\'являються, коли ви відкриваєте нові уроки або додаєте власні.' : 'Відкрийте перший урок, щоб у вас з\'явилися слова.') + '</p><a class="btn primary" href="#/lesson/' + SK.currentLesson().id + '">До уроку</a></div>';
      return;
    }
    let i = 0;
    const again = [];
    const show = () => {
      const w = queue[i] || again.shift();
      if (!w) return review(body);
      const dirSet = SK.S.settings.dir;
      const toSk = dirSet === 'uk' ? true : dirSet === 'sk' ? false : Math.random() < 0.5;
      const isNew = !SK.S.cards[w.id];
      body.innerHTML = '<div class="card ex-box"><div class="row small muted"><span>' + (isNew ? '<span class="pill amber">нове</span>' : '') + ' ' + (toSk ? 'Як це словацькою?' : 'Що це означає?') + '</span><span class="spacer"></span>залишилось: ' + (queue.length - i + again.length) + '</div>' +
        '<div class="flash"><div class="front">' + (toSk ? esc(w.uk) : esc(w.sk)) + '</div><div class="back" style="display:none"><div class="big-phrase">' + esc(w.sk) + '</div>' + (toSk ? '' : '<div>' + esc(w.uk) + '</div>') + (w.note ? '<div class="small muted">' + esc(w.note) + '</div>' : '') + '</div></div>' +
        '<div class="row" style="justify-content:center"><button class="btn" id="fl-say">🔊</button><button class="btn primary" id="fl-show">Показати відповідь<span class="kbd"> (пробіл)</span></button></div>' +
        '<div class="srs-btns" style="display:none">' + [[1, 'Знову'], [2, 'Важко'], [3, 'Добре'], [4, 'Легко']].map((g) => '<button class="btn" data-g="' + g[0] + '">' + g[1] + '<small>' + SK.nextIntervalLabel(w, g[0]) + '<span class="kbd"> · ' + g[0] + '</span></small></button>').join('') + '</div></div>';
      const reveal = () => { $('.back', body).style.display = ''; $('#fl-show').style.display = 'none'; $('.srs-btns', body).style.display = ''; SK.TTS.say(SK.sayText(w.sk)); };
      $('#fl-say').onclick = () => SK.TTS.say(SK.sayText(w.sk));
      if (!toSk) SK.TTS.say(SK.sayText(w.sk));
      $('#fl-show').onclick = reveal;
      $$('[data-g]', body).forEach((b) => b.onclick = () => grade(+b.dataset.g));
      const grade = (g) => { SK.srsGrade(w, g); if (g === 1) again.push(w); if (queue[i] === w) i++; show(); };
      body._key = (e) => {
        if (e.code === 'Space' && $('#fl-show') && $('#fl-show').style.display !== 'none') { e.preventDefault(); reveal(); }
        else if (/^[1-4]$/.test(e.key) && $('.srs-btns', body).style.display !== 'none') grade(+e.key);
      };
    };
    document.onkeydown = (e) => { if (body._key && document.activeElement.tagName !== 'INPUT') body._key(e); };
    show();
  }
  function wordList(body) {
    const words = SK.allWords();
    body.innerHTML = '<div class="card"><input type="text" id="w-q" placeholder="Пошук словацькою чи українською…"><div class="tblwrap" style="margin-top:10px"><table id="w-t"><tr><th>Словацькою</th><th>Українською</th><th>Наступне повторення</th></tr>' +
      words.map((w) => { const c = SK.S.cards[w.id]; const d = c ? c.due - SK.today() : null;
        return '<tr><td>' + SK.rich('[[' + esc(w.sk) + '|' + esc(SK.sayText(w.sk)) + ']]') + '</td><td>' + esc(w.uk) + '</td><td class="small muted">' + (c ? (d <= 0 ? 'сьогодні' : 'через ' + d + ' дн.') : 'нове') + '</td></tr>'; }).join('') +
      '</table></div>' + (words.length ? '' : '<p class="muted">Поки порожньо — відкрийте урок.</p>') + '</div>';
    $('#w-q').oninput = (e) => { const v = e.target.value.toLowerCase(); $$('#w-t tr').slice(1).forEach((tr) => { tr.style.display = tr.textContent.toLowerCase().includes(v) ? '' : 'none'; }); };
  }
  function myWords(body) {
    body.innerHTML = '<div class="card"><h3>Додати слово, яке почули в житті</h3><p class="small muted">Почули на роботі, в магазині, по радіо? Додайте його сюди — воно потрапить у повторення.</p>' +
      '<div class="grid g2"><div><input type="text" id="my-sk" lang="sk" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="словацькою, напр. bloček"></div><div><input type="text" id="my-uk" lang="uk" autocomplete="off" placeholder="переклад, напр. чек"></div></div><div id="my-dia"></div>' +
      '<button class="btn primary" id="my-add">Додати</button></div>' +
      '<div class="card"><h3>Мої слова (' + SK.S.custom.length + ')</h3>' + (SK.S.custom.length ? '<div class="tblwrap"><table>' + SK.S.custom.map((w, k) => '<tr><td>' + SK.rich('[[' + esc(w.sk) + ']]') + '</td><td>' + esc(w.uk) + '</td><td><button class="btn small danger" data-del="' + k + '">✕</button></td></tr>').join('') + '</table></div>' : '<p class="muted">Ще немає.</p>') + '</div>';
    let last = $('#my-sk');
    $('#my-sk').onfocus = (e) => { last = e.target; };
    $('#my-dia').appendChild(SK.diaKeyboard(() => last));
    $('#my-add').onclick = () => {
      const sk = $('#my-sk').value.trim(), uk = $('#my-uk').value.trim();
      if (!sk || !uk) { SK.toast('Заповніть обидва поля'); return; }
      if (SK.S.custom.some((w) => w.sk === sk)) { SK.toast('Таке слово вже є'); return; }
      SK.S.custom.push({ sk, uk }); SK.save(); SK.toast('Додано ✓'); renderWords('my');
    };
    $$('[data-del]').forEach((b) => b.onclick = () => { const w = SK.S.custom.splice(+b.dataset.del, 1)[0]; delete SK.S.cards[SK.cardId('my', w.sk)]; SK.save(); renderWords('my'); });
  }

  // ---------- Тренажер чисел, цін, часу й дат (вправи з gen.js) ----------
  const DRILLS = [
    ['n20', '🎧 Числа 0–20 на слух', { g: 'numListen', min: 0, max: 20 }],
    ['n100', '🎧 Числа 20–100 на слух', { g: 'numListen', min: 20, max: 100 }],
    ['n999', '🎧 Числа 100–999 на слух', { g: 'numListen', min: 100, max: 999 }],
    ['year', '🎧 Роки й тисячі на слух', { g: 'numListen', min: 1000, max: 2100 }],
    ['price', '🎧 Ціни на слух', { g: 'priceListen', min: 1, max: 99 }],
    ['time', '🎧 Час на слух («о котрій»)', { g: 'timeListen' }],
    ['date', '🎧 Дати на слух', { g: 'dateListen' }],
    ['nw', '✍️ Число → словами', { g: 'numWords', min: 0, max: 999 }],
    ['tw', '✍️ Час → словами', { g: 'timeWords' }],
    ['dw', '✍️ Дата → словами', { g: 'dateWords' }],
    ['mix', '🎲 Мікс усього', null]
  ];
  function renderDrill(mode) {
    view().innerHTML = SK.views.voiceBanner() + '<div class="card"><div class="row small muted"><a href="#/lesson/a1-8b">← Урок A1.8b</a></div><h1>🔢 Тренажер чисел, цін, часу й дат</h1>' +
      '<p class="muted">Вправи щоразу нові, по 10 за підхід. На слух — записуєте цифрами, «словами» — пишете словацькою (пробіли не важливі). Почніть із «Числа 0–20» і «Ціни».</p>' +
      '<div class="row">' + DRILLS.map((d) => '<a class="btn small' + (d[0] === mode ? ' primary' : '') + '" href="#/drill/' + d[0] + '">' + d[1] + '</a>').join('') + '</div></div><div id="dr-body"></div>';
    const d = DRILLS.find((x) => x[0] === mode);
    if (!d) { $('#dr-body').innerHTML = '<div class="card center muted">Виберіть режим угорі.</div>'; return; }
    const pool = DRILLS.filter((x) => x[2]).map((x) => x[2]);
    const specs = Array.from({ length: 10 }, () => Object.assign({ t: 'g' }, d[2] || pool[Math.floor(Math.random() * pool.length)]));
    SK.runExercises($('#dr-body'), specs, { drill: true });
  }

  // ---------- Розмова ----------
  function renderSpeak() {
    const opened = SK.lessons.filter((l) => SK.S.lessons[l.id] && SK.S.lessons[l.id].opened);
    const pool = (opened.length ? opened : SK.lessons.slice(0, 1));
    const phrases = pool.flatMap((l) => l.say.map((p) => ({ sk: p[0], uk: p[1], l: l.num })));
    const prompts = pool.flatMap((l) => l.speak.map((s) => ({ s, l: l.num })));
    view().innerHTML = SK.views.voiceBanner() + '<div class="card"><h1>🎙️ Розмова</h1><p class="muted">Розмова — ваш пріоритет №1. Тут фрази з уроків, які ви вже відкрили. Слухайте, повторюйте, записуйте себе й порівнюйте з диктором.</p></div>' +
      '<div class="card"><h3>🔁 Shadowing</h3><div class="center"><div class="big-phrase" id="sh-sk"></div><div class="muted" id="sh-uk"></div><div class="small muted" id="sh-l"></div></div>' +
      '<div class="row" style="justify-content:center;margin-top:10px"><button class="btn" id="sh-play">🔊 Слухати</button><button class="btn" id="sh-slow">🐢 Повільно</button><span id="sh-rec"></span><button class="btn primary" id="sh-next">Наступна →</button></div>' +
      '<p class="small muted center">Схема: послухайте 2 рази → скажіть разом із диктором → скажіть самі → запишіть → порівняйте.</p></div>' +
      '<div class="card"><h3>🗣️ Говоріть 1 хвилину</h3><p id="pr-text" style="font-size:1.1rem"></p><div class="row"><span class="timer" id="pr-t">1:00</span><button class="btn primary" id="pr-go">▶ Старт</button><button class="btn" id="pr-next">Інше завдання</button><span id="pr-rec"></span></div>' +
      '<p class="small muted">Не зупиняйтеся, навіть якщо помиляєтеся. Забули слово — опишіть його іншими словами.</p></div>' +
      '<div class="card"><h3>🎯 Мої місії</h3>' + SK.lessons.map((l) => '<div class="lesson-item"><span class="num">' + esc(l.num) + '</span><span class="small">' + SK.rich(l.mission) + '</span><span class="spacer"></span>' + (SK.S.lessons[l.id] && SK.S.lessons[l.id].mission ? '<span class="done-mark">✓</span>' : '<a class="btn small" href="#/lesson/' + l.id + '/mission">→</a>') + '</div>').join('') + '</div>';
    let k = 0; const order = SK.shuffle(phrases);
    const drawPh = () => { const p = order[k % order.length]; $('#sh-sk').textContent = p.sk; $('#sh-uk').textContent = p.uk; $('#sh-l').textContent = 'урок ' + p.l; };
    drawPh();
    $('#sh-play').onclick = () => SK.TTS.say(order[k % order.length].sk);
    $('#sh-slow').onclick = () => SK.TTS.say(order[k % order.length].sk, 0.6);
    $('#sh-next').onclick = () => { k++; drawPh(); SK.TTS.say(order[k % order.length].sk); };
    SK.recorderWidget($('#sh-rec'));
    SK.recorderWidget($('#pr-rec'));
    let pk = Math.floor(Math.random() * prompts.length), pInt = null;
    const drawPr = () => { $('#pr-text').textContent = prompts[pk % prompts.length].s; };
    drawPr();
    $('#pr-next').onclick = () => { pk++; drawPr(); };
    $('#pr-go').onclick = () => {
      clearInterval(pInt); const end = Date.now() + 60000, el = $('#pr-t');
      // Рахуємо від часу старту: на телефоні з вимкненим екраном тики setInterval зупиняються
      pInt = setInterval(() => {
        const left = Math.max(0, Math.ceil((end - Date.now()) / 1000));
        el.textContent = Math.floor(left / 60) + ':' + String(left % 60).padStart(2, '0');
        if (left <= 0) { clearInterval(pInt); SK.toast('Хвилина минула! 👏'); SK.logActivity('speak'); }
      }, 250);
    };
  }

  // ---------- Довідник ----------
  function renderRef() {
    view().innerHTML = '<div class="card"><h1>📚 Довідник</h1><input type="text" id="r-q" placeholder="Пошук у таблицях: напр. «ovocie», «родовий», «môcť»…">' +
      '<div class="row small" style="margin-top:8px">' + SK.ref.map((r) => '<a href="#/ref" data-jump="' + r.id + '">' + esc(r.title) + '</a>').join(' · ') + '</div></div>' +
      SK.ref.map((r) => '<div class="card" id="ref-' + r.id + '"><h2>' + esc(r.title) + '</h2>' + SK.rich(r.html) + '</div>').join('');
    $$('[data-jump]').forEach((a) => a.onclick = (e) => { e.preventDefault(); document.getElementById('ref-' + a.dataset.jump).scrollIntoView({ behavior: 'smooth' }); });
    $('#r-q').oninput = (e) => {
      const v = SK.stripDia(e.target.value.toLowerCase());
      $$('#view table tr').forEach((tr) => { if (tr.querySelector('th')) return; tr.style.display = !v || SK.stripDia(tr.textContent.toLowerCase()).includes(v) ? '' : 'none'; });
    };
  }

  // ---------- Налаштування ----------
  function renderSettings() {
    const s = SK.S.settings;
    const voices = SK.TTS.voices, ONLINE = SK.TTS.ONLINE;
    const known = s.voice === ONLINE || voices.some((v) => v.name === s.voice);
    const opt = (val, label, sel) => '<option value="' + esc(val) + '"' + (sel ? ' selected' : '') + '>' + esc(label) + '</option>';
    view().innerHTML = '<div class="card"><h1>⚙️ Налаштування</h1>' +
      '<h3>🔊 Голос</h3><select id="st-voice">' +
        opt('', 'Автоматично: ' + (voices.length ? 'словацький голос системи' : 'онлайн-голос Google'), !known) +
        voices.map((v) => opt(v.name, v.name + (v.localService === false && !/online/i.test(v.name) ? ' (онлайн)' : ''), known && v.name === s.voice)).join('') +
        opt(ONLINE, 'Google — словацький, онлайн', s.voice === ONLINE) + '</select>' +
      '<p class="small muted" style="margin:6px 0 0">Зараз говорить: <b>' + esc(SK.TTS.label()) + '</b>. ' +
        (voices.length ? '' : 'Словацького голосу в цій системі немає, тому говорить онлайн-голос Google — потрібен інтернет. ') +
        'Онлайн-голосу надсилається лише словацький текст, який треба озвучити.</p>' +
      '<details class="small" style="margin-top:6px"' + (voices.length ? '' : ' open') + '><summary>Як додати словацький голос у систему (працює без інтернету)</summary><ul>' +
        '<li><b>Mac</b>: Системні параметри → Доступність → Вміст мовлення (Spoken Content) → Системний голос → «Керувати голосами…» (Manage Voices) → Slovak → <b>Laura</b> → завантажити. Потім перезапустіть браузер.</li>' +
        '<li><b>Microsoft Edge</b> на Windows: зазвичай уже має голоси «Microsoft Lukas / Viktoria Online (Natural) — Slovak» (потрібен інтернет).</li>' +
        '<li><b>Windows</b>: Параметри → Час і мова → Мовлення → Додати голоси → Slovenčina.</li>' +
        '<li><b>Android</b>: Налаштування → Спеціальні можливості → Синтез мовлення → Google → встановіть словацьку.</li>' +
        '<li><b>iPhone / iPad</b>: Параметри → Універсальний доступ → Усний вміст → Голоси → Словацька → Laura.</li></ul></details>' +
      '<div class="row" style="margin-top:8px"><label>Швидкість: <b id="st-rate-v">' + esc(s.rate) + '</b></label><input type="range" id="st-rate" min="0.5" max="1.2" step="0.05" value="' + esc(s.rate) + '" style="flex:1"><button class="btn small" id="st-test">Перевірити</button></div>' +
      '<h3>✍️ Вправи</h3><label class="row"><input type="checkbox" id="st-strict"' + (s.strict ? ' checked' : '') + '> Суворо перевіряти діакритику (без гачків і рисок відповідь не зараховується)</label>' +
      '<h3>🃏 Слова</h3><div class="row"><label>Нових слів на день:</label><input type="number" id="st-new" min="0" max="50" value="' + esc(s.newPerDay) + '" style="width:90px"></div>' +
      '<div class="row" style="margin-top:8px"><label>Напрям карток:</label><select id="st-dir" style="width:auto"><option value="mix">мікс</option><option value="sk">словацька → українська</option><option value="uk">українська → словацька</option></select></div>' +
      '</div><div class="card"><h3>💾 Збереження прогресу</h3><p class="small muted">Прогрес зберігається в Chrome на цьому пристрої (у сховищі цього сайту). На іншому пристрої чи в іншому браузері прогрес окремий.</p>' +
      storageStatus() +
      progressSummary() +
      '<h3>↺ Почати наново</h3><p class="small muted">Скидання не можна скасувати. Кожна кнопка просить підтвердження (друге натискання).</p>' +
      '<div class="row"><button class="btn" id="st-rl" title="Уроки, вправи, місії, пропуски й позначки модулів">Скинути уроки</button><button class="btn" id="st-rw" title="Інтервали повторення; самі слова й «Мої слова» лишаються">Скинути повторення слів</button>' +
      '<span class="spacer"></span><button class="btn danger" id="st-reset" title="Усе, крім налаштувань голосу">Почати навчання з нуля</button></div></div>' +
      '<div class="card"><h3>📲 Встановити як додаток</h3>' + (SK.isInstalled() ? '<p class="small"><span class="done-mark">✓</span> Тренажер відкрито як встановлений додаток.</p>' : installHelp()) +
      '<p class="small muted" style="margin:8px 0 0">Версія тренажера: ' + esc(SK.BUILD || 'розробка (src/)') + '</p></div>';
    $('#st-dir').value = s.dir;
    $('#st-voice').onchange = (e) => { s.voice = e.target.value; SK.save(); renderSettings(); SK.TTS.say('Dobrý deň, ako sa máte?'); };
    $('#st-rate').oninput = (e) => { s.rate = +e.target.value; $('#st-rate-v').textContent = s.rate; SK.save(); };
    $('#st-test').onclick = () => SK.TTS.say('Dobrý deň! Volám sa Lukáš. Učíme sa po slovensky.');
    $('#st-strict').onchange = (e) => { s.strict = e.target.checked; SK.save(); };
    $('#st-new').onchange = (e) => { s.newPerDay = Math.max(0, Math.min(50, +e.target.value || 0)); SK.save(); };
    $('#st-dir').onchange = (e) => { s.dir = e.target.value; SK.save(); };
    bindInstall(view());
    const per = $('#st-persist');
    if (per) per.onclick = () => SK.Storage.check(true).then((p) => { SK.toast(p ? 'Постійне сховище увімкнено ✓' : 'Chrome поки не дозволив. Встановіть тренажер як додаток — це найнадійніше.', 5000); renderSettings(); });
    SK.confirmClick($('#st-rl'), 'Точно скинути уроки?', () => { SK.resetLessons(); SK.toast('Прогрес уроків скинуто'); renderSettings(); });
    SK.confirmClick($('#st-rw'), 'Точно скинути повторення?', () => { SK.resetWords(); SK.toast('Повторення слів скинуто'); renderSettings(); });
    SK.confirmClick($('#st-reset'), 'Точно почати з нуля?', () => {
      const keep = SK.S.settings; SK.resetState(); SK.S.settings = keep; SK.save();
      SK.toast('Прогрес скинуто — починаємо спочатку!'); location.hash = '#/today';
    });
  }
  function storageStatus() {
    const p = SK.Storage.persisted, st = SK.store;
    const row = (k, v) => '<tr><td>' + k + '</td><td>' + v + '</td></tr>';
    const ok = '<span class="done-mark">✓</span> ';
    return '<div class="tblwrap"><table>' +
      row('Постійне сховище', p === true ? ok + 'увімкнено: Chrome не видалить прогрес сам'
        : p === false ? '⚠️ ні: Chrome може видалити дані сайту, коли на пристрої забракне місця. Найнадійніше — встановити тренажер як додаток (див. нижче). <button class="btn small" id="st-persist">Спробувати ввімкнути</button>'
          : 'невідомо: браузер про це не повідомляє') +
      row('Запис', st.newer ? '⚠️ прогрес записала новіша версія тренажера. Оновіть сторінку з інтернетом; доти зміни тут не зберігаються.'
        : st.failed ? '⚠️ останнє збереження не вдалося (' + esc(st.failed.name || st.failed) + '). Перевірте, чи не заблоковано для сайту файли cookie й дані сайтів і чи є місце на пристрої.'
          : st.broken ? '⚠️ збережений прогрес не вдалося прочитати (' + esc(st.broken.name || st.broken.message || st.broken) + '). Якщо він був, його копія лежить у сховищі сайту під ключем <code>' + esc(st.key) + '-broken</code>.'
            : ok + 'працює') +
      '</table></div><p class="small muted">Прогрес зникне, якщо в Chrome очистити «Файли cookie та інші дані сайтів» для цього сайту.</p>';
  }
  function installHelp() {
    return '<p class="small">Встановлений тренажер відкривається з головного екрана чи меню «Пуск» в окремому вікні й працює без інтернету (крім онлайн-голосу), а Chrome надійніше зберігає його прогрес.</p>' +
      (SK.Install.prompt ? '<button class="btn primary install-btn">📲 Встановити</button>' : '') +
      '<ul class="small"><li><b>Android (Chrome)</b>: меню ⋮ → «Додати на головний екран» → «Установити».</li>' +
      '<li><b>Комп\'ютер (Chrome / Edge)</b>: значок «Установити» праворуч в адресному рядку (або в меню ⋮).</li>' +
      '<li><b>iPhone / iPad</b>: кнопка «Поділитися» → «На екран „Додому“».</li></ul>';
  }
  function bindInstall(root) {
    $$('.install-btn', root).forEach((b) => { b.onclick = () => SK.Install.run(); });
  }
  // persisted === null означає «ще не відповів або не підтримує» — тоді порада була б зайвим нагадуванням
  SK.fillInstallTip = function () {
    const el = document.getElementById('install-tip'); if (!el) return;
    const show = SK.S.ui.installTip && !SK.isInstalled() && SK.Storage.persisted === false;
    el.innerHTML = show ? '<div class="tip" style="margin:0 0 14px"><div class="row"><b>📲 Встановіть тренажер як додаток</b><span class="spacer"></span><button class="btn small" id="it-hide" title="Більше не показувати">✕</button></div>' +
      '<p class="small" style="margin:6px 0">Так Chrome не видалить ваш прогрес, коли на пристрої забракне місця, а тренажер відкриватиметься з головного екрана й без інтернету.</p>' +
      (SK.Install.prompt ? '<button class="btn primary small install-btn">📲 Встановити</button>'
        : '<p class="small muted" style="margin:0">Chrome: меню ⋮ → «Додати на головний екран» (телефон) або значок «Установити» в адресному рядку (комп\'ютер). Докладніше — у ⚙️ «Налаштування».</p>') + '</div>' : '';
    if (!show) return;
    bindInstall(el);
    $('#it-hide', el).onclick = () => { SK.S.ui.installTip = false; SK.save(); el.innerHTML = ''; };
  };

  // Що саме зараз збережено
  function progressSummary() {
    const L = SK.lessons;
    const done = L.filter((l) => SK.lessonDone(l.id)).length, skipped = L.filter((l) => SK.lessonSkipped(l.id)).length;
    const runs = L.filter((l) => SK.S.lessons[l.id] && SK.S.lessons[l.id].run).length;
    const c = SK.srsCounts();
    const days = Object.keys(SK.S.days).length;
    return '<div class="tblwrap" style="margin-top:10px"><table><tr><th colspan="2">Що збережено зараз</th></tr>' +
      '<tr><td>Уроки</td><td>пройдено ' + done + ', пропущено ' + skipped + ' з ' + L.length + (runs ? '; незавершених підходів до вправ: ' + runs : '') + '</td></tr>' +
      '<tr><td>Поточний урок</td><td>' + esc(SK.currentLesson().num + ' · ' + SK.currentLesson().title) + '</td></tr>' +
      '<tr><td>Слова</td><td>у повторенні ' + c.known + ', на сьогодні ' + c.due + ', нових чекають ' + c.unseen + ', моїх слів ' + SK.S.custom.length + '</td></tr>' +
      '<tr><td>Модулі A2–B2</td><td>позначено ' + Object.values(SK.S.modules).filter(Boolean).length + '</td></tr>' +
      '<tr><td>Активність</td><td>днів із заняттями: ' + days + ', серія: ' + SK.streak() + '</td></tr></table></div>';
  }

  // ---------- Маршрутизація ----------
  function route(keepScroll) {
    const y = window.scrollY;
    document.onkeydown = null;
    if (SK.Rec.active()) SK.Rec.stop();
    const parts = (location.hash || '#/today').replace(/^#\//, '').split('/');
    const page = parts[0] || 'today';
    $$('nav.tabs a').forEach((a) => a.classList.toggle('active', a.dataset.page === page || ((page === 'lesson' || page === 'drill') && a.dataset.page === 'lessons')));
    const V = SK.views;
    try {
      if (page === 'program') V.renderProgram();
      else if (page === 'lessons') V.renderLessons();
      else if (page === 'lesson') V.renderLesson(parts[1], parts[2]);
      else if (page === 'words') renderWords(parts[1]);
      else if (page === 'speak') renderSpeak();
      else if (page === 'drill') renderDrill(parts[1]);
      else if (page === 'ref') renderRef();
      else if (page === 'settings') renderSettings();
      else V.renderToday();
    } catch (e) {
      console.error(e);
      view().innerHTML = '<div class="card"><h2>Щось пішло не так</h2><pre class="small">' + esc(e && e.stack || e) + '</pre></div>';
    }
    window.scrollTo(0, keepScroll ? y : 0);
  }
  const currentPage = () => (location.hash || '').replace(/^#\//, '').split('/')[0];

  // Нова версія вже керує сторінкою (sw.js робить skipWaiting), але відкритий екран ще зі старим кодом
  function showUpdateBar() {
    if (document.querySelector('.update-bar')) return;
    const bar = document.createElement('div');
    bar.className = 'update-bar';
    bar.innerHTML = '🔄 Вийшла нова версія тренажера <button class="btn small primary">Оновити</button>';
    bar.querySelector('button').onclick = () => location.reload();
    document.body.appendChild(bar);
  }
  // У src/ (розробка) SK.BUILD немає: там service worker закешував би окремі файли й ховав би свіжі правки
  function registerWorker() {
    if (!SK.BUILD || !('serviceWorker' in navigator) || !/^https?:$/.test(location.protocol)) return;
    navigator.serviceWorker.addEventListener('message', (e) => {
      if (e.data && e.data.type === 'activated' && e.data.version !== SK.BUILD) showUpdateBar();
    });
    navigator.serviceWorker.register('sw.js').then((reg) => {
      // Встановлений додаток на телефоні може жити днями без перезавантаження — перевіряємо оновлення при кожному поверненні
      document.addEventListener('visibilitychange', () => { if (!document.hidden) reg.update().catch(() => {}); });
    }).catch((e) => console.warn('Service worker не зареєстровано', e));
  }

  function init() {
    // Іконка вкладки береться з прапора в шапці (index.html), щоб малюнок прапора був лише в одному місці
    const flag = document.querySelector('.flag svg'), icon = document.querySelector('link[rel="icon"]');
    if (flag && icon) icon.href = 'data:image/svg+xml,' + encodeURIComponent(flag.outerHTML);
    document.getElementById('nav').innerHTML = SK.views.NAV.map((n) => '<a href="#/' + n[0] + '" data-page="' + n[0] + '" title="' + n[2] + '"><span>' + n[1] + '</span> <span class="lbl">' + n[2] + '</span><span class="lbl-s">' + n[3] + '</span></a>').join('');
    document.addEventListener('click', (e) => {
      const el = e.target.closest('.sk');
      if (el) SK.TTS.say(el.dataset.say);
    });
    // Список голосів і інтернет з'являються/зникають після рендеру. Повний перерендер — лише в налаштуваннях:
    // на інших екранах він збив би таймер або вправу, тож там лише додаємо чи прибираємо банер.
    let lastState = null;
    SK.TTS.listeners.push(() => {
      const state = SK.TTS.voices.length + ':' + (SK.TTS.settled ? 1 : 0) + ':' + navigator.onLine;
      if (lastState === null) { lastState = state; return; }
      if (state === lastState) return;
      lastState = state;
      if (currentPage() === 'settings') { route(true); return; }
      const b = document.querySelector('.voice-banner'), show = SK.TTS.silent();
      if (show && !b) view().insertAdjacentHTML('afterbegin', SK.views.voiceBanner());
      else if (!show && b) b.remove();
    });
    SK.TTS.init();
    // Відповідь Chrome про сховище й можливість встановлення приходять уже після першого рендеру
    const envChanged = () => { if (currentPage() === 'settings') route(true); else SK.fillInstallTip(); };
    SK.Storage.listeners.push(envChanged);
    SK.Install.listeners.push(envChanged);
    // Прогрес змінився в іншій вкладці. Прихована вкладка перемальовується, лише коли до неї повернуться:
    // інакше вона, наприклад, почала б озвучувати картку слова у фоні
    let stale = false;
    SK.onExternalChange = () => { if (document.hidden) stale = true; else route(true); };
    document.addEventListener('visibilitychange', () => { if (!document.hidden && stale) { stale = false; route(true); } });
    window.addEventListener('hashchange', () => route());
    if (!SK.S.start) { SK.S.start = SK.today(); SK.save(); }
    route();
    SK.Storage.check(true);
    registerWorker();
  }
  document.addEventListener('DOMContentLoaded', init);
})(window.SK);
