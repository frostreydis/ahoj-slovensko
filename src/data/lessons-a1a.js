/* A1, частина 1: уроки A1.1–A1.6 */
window.SK = window.SK || {};
SK.lessons = SK.lessons || [];
SK.lessons.push(
{
  id: 'a1-1', stage: 'a1', num: 'A1.1', title: 'Som, si, je — дієслово byť і знайомство', dur: '1 тиждень',
  goals: ['відмінювати byť', 'сказати, хто ви і звідки', 'будувати заперечення й питання'],
  theory: `
<h3>Особові займенники</h3>
<p>[[ja]] — я, [[ty]] — ти, [[on]] — він, [[ona]] — вона, [[ono]] — воно, [[my]] — ми, [[vy]] — ви, [[oni]] — вони (чоловіки або змішана група), [[ony]] — вони (жінки, предмети).</p>
<p>Займенник зазвичай <b>пропускають</b>, бо закінчення дієслова і так показує особу: [[Som z Ukrajiny.]] Кажіть «Ja som…», лише коли хочете наголосити.</p>
<h3>byť — бути. В українській воно випадає, у словацькій — ні!</h3>
<div class="tblwrap"><table><tr><th>однина</th><th></th><th>множина</th><th></th></tr>
<tr><td>ja</td><td>[[som]]</td><td>my</td><td>[[sme]]</td></tr>
<tr><td>ty</td><td>[[si]]</td><td>vy</td><td>[[ste]]</td></tr>
<tr><td>on / ona / ono</td><td>[[je]]</td><td>oni / ony</td><td>[[sú]]</td></tr></table></div>
<p>[[Som Ukrajinec.]] / [[Som Ukrajinka.]] — Я українець / українка. [[Si doma?]] — Ти вдома? [[Je to drahé.]] — Це дорого. [[Sme v Bratislave.]] [[Ste zo Slovenska?]] [[Sú doma.]]</p>
<h3>Заперечення й питання</h3>
<p>З byť заперечення пишеться <b>окремо</b>: [[nie som]], [[nie si]], [[nie je]], [[nie sme]], [[nie ste]], [[nie sú]]. Усі інші дієслова — разом: [[nerozumiem]].</p>
<p>Питання без питального слова ставлять інтонацією: [[Ste Slovák?]] З питальним словом: [[Kto je to?]] — Хто це? [[Čo je to?]] — Що це? [[Odkiaľ ste?]] — Звідки ви?</p>
<h3>Національності та мови</h3>
<p>[[Slovák]] / [[Slovenka]], [[Ukrajinec]] / [[Ukrajinka]], [[Čech]] / [[Češka]], [[Poliak]] / [[Poľka]]. Мовою: [[po slovensky]], [[po ukrajinsky]], [[po anglicky]]. [[Hovorím po ukrajinsky a trochu po slovensky.]]</p>
<p>Звідки: [[z Ukrajiny]], [[z Kyjeva]], [[zo Slovenska]] («zo» ставлять перед s, z, š, ž та деякими групами приголосних). Поки що вчіть це як готові фрази.</p>
<div class="tip"><b>Vykanie.</b> Одній людині ввічливо кажуть <b>vy + множина</b>: [[Vy ste pán Novák?]]</div>`,
  vocab: [['ja', 'я'], ['ty', 'ти'], ['on / ona / ono', 'він / вона / воно'], ['my', 'ми'], ['vy', 'ви'], ['oni / ony', 'вони'], ['byť', 'бути'],
    ['Slovák / Slovenka', 'словак / словачка'], ['Ukrajinec / Ukrajinka', 'українець / українка'], ['Odkiaľ ste?', 'Звідки ви?'], ['doma', 'вдома'],
    ['kto', 'хто'], ['čo', 'що'], ['kde', 'де'], ['ako', 'як'], ['trochu', 'трохи'], ['hovoriť', 'говорити'], ['po slovensky', 'словацькою'],
    ['a', 'і; а'], ['ale', 'але'], ['tu', 'тут'], ['tam', 'там']],
  ex: [
    { t: 'i', q: 'Вставте byť: Ja ___ z Ukrajiny.', a: 'som' },
    { t: 'i', q: 'Вставте byť: Ty ___ doma?', a: 'si' },
    { t: 'i', q: 'Вставте byť: My ___ v Bratislave.', a: 'sme' },
    { t: 'i', q: 'Вставте byť: Oni ___ zo Slovenska.', a: 'sú' },
    { t: 'i', q: 'Вставте byť: Vy ___ Slovák?', a: 'ste' },
    { t: 'c', q: '«Я не словак»', o: ['Nie som Slovák.', 'Nesom Slovák.', 'Som nie Slovák.'], e: 'З byť заперечення пишеться окремо: nie som.' },
    { t: 'c', q: 'Незнайомій людині: «Звідки ви?»', o: ['Odkiaľ ste?', 'Odkiaľ si?', 'Odkiaľ sú?'] },
    { t: 'c', q: 'Жінка з України каже:', o: ['Som Ukrajinka.', 'Som Ukrajinec.', 'Je Ukrajinka.'] },
    { t: 'c', q: '«Вони (жінки) вдома»', o: ['Ony sú doma.', 'Oni je doma.', 'Ony sme doma.'] },
    { t: 'o', q: 'Він не вдома.', a: ['On nie je doma.', 'On doma nie je.'] },
    { t: 'o', q: 'Ми зі Словаччини.', a: ['Sme zo Slovenska.', 'Zo Slovenska sme.'] },
    { t: 'l', a: 'Odkiaľ ste?', tr: 'Звідки ви?' },
    { t: 'l', a: 'Som z Ukrajiny.', tr: 'Я з України.' }
  ],
  say: [['Som z Ukrajiny.', 'Я з України.'], ['Odkiaľ ste?', 'Звідки ви?'], ['Nie som Slovák, som Ukrajinec.', 'Я не словак, я українець.'], ['Hovorím trochu po slovensky.', 'Я трохи говорю словацькою.'], ['Kto je to?', 'Хто це?']],
  speak: ['Представтеся в 4–5 реченнях: ім\'я, національність, звідки ви, якими мовами говорите.', 'Дайте відповідь уголос: Odkiaľ ste? Hovoríte po slovensky? Ste Slovák / Slovenka?'],
  mission: 'Представтеся словацькою комусь новому — сусідові, колезі, баристі: «Dobrý deň, som …, som z Ukrajiny.»'
},
{
  id: 'a1-2', stage: 'a1', num: 'A1.2', title: 'Ten, tá, to — рід і прикметники', dur: '1 тиждень',
  goals: ['визначати рід за закінченням', 'вживати ten / tá / to', 'узгоджувати прикметники'],
  theory: `
<p>Родів три, як в українській. Рід визначають за закінченням (називний відмінок однини):</p>
<div class="tblwrap"><table><tr><th>Рід</th><th>Закінчення</th><th>Приклади</th></tr>
<tr><td>чоловічий</td><td>приголосний (живі істоти — також -a)</td><td>[[dom]], [[obchod]] (магазин), [[muž]], [[kolega]]</td></tr>
<tr><td>жіночий</td><td>-a, -ia; -osť; деякі на приголосний</td><td>[[žena]], [[káva]], [[ulica]], [[radosť]], [[noc]], [[soľ]]</td></tr>
<tr><td>середній</td><td>-o, -e, -ie; -a/-ä у назвах малят</td><td>[[mesto]], [[auto]], [[more]], [[námestie]] (площа), [[dievča]], [[dieťa]]</td></tr></table></div>
<div class="note"><b>Рід не такий, як в українській:</b> [[byt]] — ч. р. (квартира — ж. р.), [[dievča]] і [[dieťa]] — с. р. (дівчина, дитина — ж. р.), [[stolička]] — ж. р. (стілець — ч. р.), [[posteľ]] — ж. р. (ліжко — с. р.).</div>
<h3>ten — tá — to</h3>
<p>[[ten obchod]], [[tá káva]], [[to mesto]]. Для будь-якого роду: [[To je…]] — «Це…»: [[To je môj byt.]]</p>
<h3>Прикметники</h3>
<p>Твердий тип: <b>-ý / -á / -é</b>: [[pekný byt]], [[pekná ulica]], [[pekné mesto]]. Після довгого складу закінчення коротке (ритмічний закон): [[krásny]], [[krásna]], [[krásne]].</p>
<p>М'який тип: <b>-í / -ia / -ie</b>: [[cudzí]] (чужий, іноземний), [[cudzia]], [[cudzie]].</p>
<p>Питання: [[Aký?]] [[Aká?]] [[Aké?]] — який / яка / яке. [[Aký je ten byt?]] — [[Je veľký a pekný.]]</p>`,
  vocab: [['obchod', 'магазин', 'не «обхід»'], ['mesto', 'місто'], ['auto', 'авто'], ['byt (m)', 'квартира'], ['izba', 'кімната'], ['dievča (s)', 'дівчина'],
    ['dieťa (s)', 'дитина'], ['stolička (ž)', 'стілець', 'не «столиця»'], ['posteľ (ž)', 'ліжко'], ['veľký', 'великий'], ['malý', 'малий'], ['nový', 'новий'],
    ['starý', 'старий'], ['drahý', 'дорогий'], ['lacný', 'дешевий'], ['dobrý', 'добрий, хороший'], ['zlý', 'поганий, злий'], ['pekný', 'гарний'],
    ['studený', 'холодний'], ['teplý', 'теплий'], ['aký / aká / aké', 'який / яка / яке']],
  ex: [
    { t: 'c', q: 'Який рід у слова «byt»?', o: ['чоловічий', 'жіночий', 'середній'] },
    { t: 'c', q: 'Який рід у слова «dievča»?', o: ['середній', 'жіночий', 'чоловічий'] },
    { t: 'c', q: 'Який рід у слова «posteľ»?', o: ['жіночий', 'середній', 'чоловічий'] },
    { t: 'i', q: '___ mesto (ten / tá / to)', a: 'to' },
    { t: 'i', q: '___ káva (ten / tá / to)', a: 'tá' },
    { t: 'i', q: '___ obchod (ten / tá / to)', a: 'ten' },
    { t: 'i', q: 'Узгодьте: pekný + ulica → ___ ulica', a: 'pekná' },
    { t: 'i', q: 'Узгодьте: nový + auto → ___ auto', a: 'nové' },
    { t: 'i', q: 'Узгодьте: krásny + mesto → ___ mesto', a: 'krásne', e: 'Ритмічний закон: після довгого «krá» закінчення коротке.' },
    { t: 'c', q: '«велика квартира»', o: ['veľký byt', 'veľká byt', 'veľké byt'] },
    { t: 'o', q: 'Це гарне місто.', a: ['To je pekné mesto.', 'Je to pekné mesto.'] },
    { t: 'o', q: 'Ця кава холодна.', a: 'Tá káva je studená.' },
    { t: 'l', a: 'Ten byt je veľký a pekný.', tr: 'Ця квартира велика й гарна.' }
  ],
  say: [['To je pekné mesto.', 'Це гарне місто.'], ['Aký je ten byt?', 'Яка ця квартира?'], ['Je malý, ale pekný.', 'Вона мала, але гарна.'], ['Tá káva je studená.', 'Ця кава холодна.']],
  speak: ['Опишіть свою квартиру або місто 3–5 прикметниками: «Môj byt je malý, ale pekný…»', 'Назвіть 10 предметів навколо себе з ten / tá / to і прикметником.'],
  mission: 'У супермаркеті назвіть подумки чи вголос 10 речей із ten / tá / to і прикметником: ten veľký melón, tá lacná káva…'
},
{
  id: 'a1-3', stage: 'a1', num: 'A1.3', title: 'Mám, nemám — mať і знахідний відмінок', dur: '1 тиждень',
  goals: ['відмінювати mať', 'ставити іменники в знахідний відмінок', 'розповідати про сім\'ю'],
  theory: `
<h3>mať — мати</h3>
<p>[[mám]], [[máš]], [[má]], [[máme]], [[máte]], [[majú]]. Заперечення: [[nemám]], [[nemáš]]… [[Mám brata.]] [[Nemám čas.]] [[Máte otázku?]]</p>
<h3>Знахідний відмінок (akuzatív): кого? що?</h3>
<div class="tblwrap"><table><tr><th>Тип</th><th>Зміна</th><th>Приклад</th></tr>
<tr><td>ж. р. на -a</td><td>-a → <b>-u</b></td><td>[[káva]] → [[Mám kávu.]] [[sestra]] → [[Mám sestru.]]</td></tr>
<tr><td>ж. р. на приголосний</td><td>без змін</td><td>[[posteľ]] → [[posteľ]]</td></tr>
<tr><td>с. р.</td><td>без змін</td><td>[[Mám auto.]] [[Mám dieťa.]]</td></tr>
<tr><td>ч. р. неживі</td><td>без змін</td><td>[[Mám byt.]] [[Mám telefón.]]</td></tr>
<tr><td>ч. р. живі</td><td><b>-a</b> (як «брата»); на -a → -u</td><td>[[Mám brata.]] [[syna]], [[pes]] → [[psa]] (е випадає), [[kolega]] → [[kolegu]]</td></tr></table></div>
<p>Прикметники в знахідному: ж. р. <b>-ú</b> — [[Mám novú prácu.]]; ч. р. живі <b>-ého</b> — [[Mám dobrého kamaráta.]] Решта — без змін.</p>
<h3>Сім'я</h3>
<p>[[rodina]] — сім'я, [[mama]], [[otec]], [[rodičia]] — батьки, [[brat]], [[sestra]], [[syn]], [[dcéra]], [[manžel]] — чоловік, [[manželka]] — дружина, [[dieťa]] → [[deti]], [[babka]], [[dedko]].</p>
<p>Вік: [[Koľko máte rokov?]] — Скільки вам років? [[Mám tridsať rokov.]] Як в українській, число змінює форму: 1 [[rok]], 2–4 [[roky]], 5+ [[rokov]].</p>`,
  vocab: [['mať', 'мати'], ['rodina', 'сім\'я'], ['mama', 'мама'], ['otec', 'батько'], ['rodičia', 'батьки'], ['brat', 'брат'], ['sestra', 'сестра'],
    ['syn', 'син'], ['dcéra', 'донька'], ['manžel', 'чоловік (у шлюбі)'], ['manželka', 'дружина'], ['dieťa / deti', 'дитина / діти'], ['babka', 'бабуся'],
    ['dedko', 'дідусь'], ['pes', 'собака, пес'], ['mačka', 'кішка'], ['práca', 'робота'], ['čas', 'час'], ['rok', 'рік'],
    ['kamarát / kamarátka', 'приятель / приятелька'], ['otázka', 'питання']],
  ex: [
    { t: 'i', q: 'Ja ___ (mať) brata.', a: 'mám' },
    { t: 'i', q: 'Oni ___ (mať) dve deti.', a: 'majú' },
    { t: 'i', q: 'My ___ (mať) čas.', a: 'máme' },
    { t: 'i', q: 'Ty ___ (mať) psa?', a: 'máš' },
    { t: 'i', q: 'Mám (sestra) → Mám ___.', a: 'sestru' },
    { t: 'i', q: 'Mám (brat) → Mám ___.', a: 'brata' },
    { t: 'i', q: 'Mám (auto) → Mám ___.', a: 'auto' },
    { t: 'i', q: 'Mám (pes) → Mám ___.', a: 'psa', e: 'pes → psa: «е» випадає.' },
    { t: 'c', q: '«Я не маю часу»', o: ['Nemám čas.', 'Nie mám čas.', 'Mám nie čas.'] },
    { t: 'c', q: 'Чому в реченні «Mám novú prácu» стоїть «novú»?', o: ['прикметник ж. р. у знахідному: -á → -ú', 'це помилка', 'це множина'] },
    { t: 'o', q: 'У мене є брат і сестра.', a: 'Mám brata a sestru.' },
    { t: 'o', q: 'Скільки вам років?', a: ['Koľko máte rokov?', 'Koľko rokov máte?'] },
    { t: 'l', a: 'Mám manželku a dve deti.', tr: 'У мене є дружина і двоє дітей.' }
  ],
  say: [['Mám brata a sestru.', 'У мене є брат і сестра.'], ['Nemám čas.', 'Я не маю часу.'], ['Koľko máte rokov?', 'Скільки вам років?'], ['Mám novú prácu.', 'У мене нова робота.']],
  speak: ['Розкажіть про свою сім\'ю в 5 реченнях: «Mám…, Nemám…, Môj brat je…»'],
  mission: 'Розкажіть комусь 2–3 речення про свою сім\'ю — колезі, сусідові чи в мовному клубі. Або надиктуйте собі голосове повідомлення.'
},
{
  id: 'a1-4', stage: 'a1', num: 'A1.4', title: 'Čo robíš? — теперішній час', dur: '1 тиждень',
  goals: ['відмінювати дієслова трьох основних типів', 'розповідати про свій день', 'запитати, де людина живе й працює'],
  theory: `
<div class="good"><b>Добра новина:</b> у 1-й особі однини дієслово <b>завжди закінчується на -m</b>: robím, volám, píšem, pracujem, idem.</div>
<div class="tblwrap"><table><tr><th></th><th>-ám: volať (дзвонити, кликати)</th><th>-ím: robiť (робити)</th><th>-em: písať (писати)</th><th>-ujem: pracovať</th></tr>
<tr><td>ja</td><td>volám</td><td>robím</td><td>píšem</td><td>pracujem</td></tr>
<tr><td>ty</td><td>voláš</td><td>robíš</td><td>píšeš</td><td>pracuješ</td></tr>
<tr><td>on/ona</td><td>volá</td><td>robí</td><td>píše</td><td>pracuje</td></tr>
<tr><td>my</td><td>voláme</td><td>robíme</td><td>píšeme</td><td>pracujeme</td></tr>
<tr><td>vy</td><td>voláte</td><td>robíte</td><td>píšete</td><td>pracujete</td></tr>
<tr><td>oni</td><td>volajú</td><td>robia</td><td>píšu</td><td>pracujú</td></tr></table></div>
<p>Усі дієслова на <b>-ovať</b> мають форму <b>-ujem</b>: [[pracovať]] → [[pracujem]], [[kupovať]] → [[kupujem]], [[potrebovať]] → [[potrebujem]] (мені потрібно).</p>
<p>Тип <b>-iem</b>: [[rozumieť]] → [[rozumiem]], [[rozumieš]], [[rozumie]], [[rozumieme]], [[rozumiete]], [[rozumejú]].</p>
<p>Ритмічний закон: після довгого складу закінчення коротке — [[čítam]] (а не «čítám»), [[vrátim]].</p>
<p>Заперечення пишемо разом: [[nerobím]], [[nepracujem]], [[nerozumiem]].</p>
<div class="note"><b>Неправильне дієслово:</b> jesť (їсти) — [[jem]], [[ješ]], [[je]], [[jeme]], [[jete]], [[jedia]].</div>
<p>[[Kde bývate?]] — Де ви живете? [[Bývam v Bratislave.]] [[Kde pracujete?]] — [[Pracujem v obchode.]] [[Čo robíš večer?]]</p>`,
  vocab: [['robiť', 'робити'], ['hovoriť', 'говорити'], ['rozumieť', 'розуміти'], ['bývať', 'жити, мешкати'], ['pracovať', 'працювати'],
    ['potrebovať', 'потребувати'], ['čítať', 'читати'], ['písať', 'писати'], ['volať', 'дзвонити; кликати'], ['hľadať', 'шукати', 'не «дивитися»!'],
    ['počúvať', 'слухати'], ['pozerať', 'дивитися'], ['variť', 'варити, готувати'], ['platiť', 'платити'], ['vidieť', 'бачити'], ['kupovať', 'купувати'],
    ['piť', 'пити (pijem)'], ['jesť', 'їсти (jem)']],
  ex: [
    { t: 'i', q: 'robiť → ja ___', a: 'robím' },
    { t: 'i', q: 'volať → oni ___', a: 'volajú' },
    { t: 'i', q: 'písať → ty ___', a: 'píšeš' },
    { t: 'i', q: 'pracovať → my ___', a: 'pracujeme' },
    { t: 'i', q: 'rozumieť, заперечення → ja ___', a: 'nerozumiem' },
    { t: 'i', q: 'bývať → vy ___', a: 'bývate' },
    { t: 'i', q: 'čítať → ja ___ (обережно з ритмічним законом)', a: 'čítam' },
    { t: 'i', q: 'hovoriť → oni ___', a: 'hovoria' },
    { t: 'c', q: 'Що означає «hľadať»?', o: ['шукати', 'дивитися', 'гладити'] },
    { t: 'c', q: '«Kde bývate?» означає…', o: ['Де ви живете?', 'Де ви буваєте?', 'Де ви працюєте?'] },
    { t: 'o', q: 'Я живу в Братиславі і працюю в магазині.', a: 'Bývam v Bratislave a pracujem v obchode.' },
    { t: 'o', q: 'Мені потрібна допомога.', a: 'Potrebujem pomoc.' },
    { t: 'l', a: 'Čo robíš večer?', tr: 'Що ти робиш увечері?' },
    { t: 'l', a: 'Nerozumiem, hovorte pomaly.', tr: 'Не розумію, говоріть повільно.' }
  ],
  say: [['Kde bývate?', 'Де ви живете?'], ['Bývam v Bratislave.', 'Я живу в Братиславі.'], ['Kde pracujete?', 'Де ви працюєте?'], ['Potrebujem pomoc.', 'Мені потрібна допомога.'], ['Ráno pijem kávu.', 'Вранці я п\'ю каву.']],
  speak: ['Розкажіть про свій звичайний день, використавши 5–6 дієслів: «Ráno pijem kávu, potom pracujem…»', 'Дайте відповідь уголос: Kde bývate? Kde pracujete? Čo robíte večer?'],
  mission: 'В аптеці чи магазині скажіть, що вам потрібно: «Potrebujem…» + слово (знайдіть його заздалегідь).'
},
{
  id: 'a1-5', stage: 'a1', num: 'A1.5', title: 'Kde? — v / na + місцевий відмінок', dur: '1 тиждень',
  goals: ['сказати, де щось знаходиться', 'утворювати місцевий відмінок однини', 'зрозуміти пояснення дороги'],
  theory: `
<p><b>Kde?</b> → <b>v / na + місцевий відмінок (lokál)</b>, як в українській.</p>
<p><b>v</b> — всередині (будівля, місто, країна): [[v obchode]], [[v Bratislave]]. <b>na</b> — на поверхні, а також з частиною установ і заходів: [[na pošte]], [[na úrade]], [[na stanici]], [[na ulici]], [[na koncerte]].</p>
<div class="note"><b>Не як в українській:</b> «на роботі» → [[v práci]]; «у Словаччині» → [[na Slovensku]]; «в Україні» → традиційно [[na Ukrajine]].</div>
<h3>Закінчення місцевого відмінка однини</h3>
<div class="tblwrap"><table><tr><th>Тип</th><th>Закінчення</th><th>Приклади</th></tr>
<tr><td>ч. р. неживі</td><td>-e; після k, g, h, ch — -u; м'які — -i</td><td>[[v obchode]], [[na stole]], [[v parku]], [[na trhu]], [[v hoteli]]</td></tr>
<tr><td>ж. р. на -a</td><td>-e; м'які (-ca, -ia, -ňa) — -i</td><td>[[v škole]], [[na pošte]], [[v práci]], [[na ulici]], [[v kuchyni]]</td></tr>
<tr><td>с. р.</td><td>-e (після k, g, h, ch — -u); -ie → -í</td><td>[[v meste]], [[v aute]], [[na námestí]]</td></tr></table></div>
<p>Без прийменника: [[doma]] — вдома.</p>
<h3>Як знайти дорогу</h3>
<p>[[Kde je pošta?]] — [[Pošta je na námestí.]] [[Je to ďaleko?]] — [[Nie, je to blízko.]]
[[vľavo]] — ліворуч, [[vpravo]] — праворуч, [[rovno]] — прямо, [[za rohom]] — за рогом.</p>`,
  vocab: [['pošta', 'пошта'], ['lekáreň', 'аптека'], ['potraviny', 'продуктовий магазин'], ['stanica', 'станція, вокзал'], ['zastávka', 'зупинка'],
    ['námestie', 'площа'], ['úrad', 'установа, відомство'], ['nemocnica', 'лікарня'], ['banka', 'банк'], ['trh', 'ринок'], ['vľavo', 'ліворуч'],
    ['vpravo', 'праворуч'], ['rovno', 'прямо'], ['blízko', 'близько'], ['ďaleko', 'далеко'], ['v práci', 'на роботі'], ['na Slovensku', 'у Словаччині']],
  ex: [
    { t: 'i', q: 'v (obchod) → v ___', a: 'obchode' },
    { t: 'i', q: 'na (pošta) → na ___', a: 'pošte' },
    { t: 'i', q: 'v (práca) → v ___', a: 'práci' },
    { t: 'i', q: 'v (mesto) → v ___', a: 'meste' },
    { t: 'i', q: 'na (ulica) → na ___', a: 'ulici' },
    { t: 'i', q: 'v (park) → v ___', a: 'parku', e: 'Після k, g, h, ch закінчення -u.' },
    { t: 'c', q: '«Я на роботі»', o: ['Som v práci.', 'Som na práci.', 'Som na prácu.'] },
    { t: 'c', q: '«Я живу в Словаччині»', o: ['Bývam na Slovensku.', 'Bývam v Slovensku.', 'Bývam v Slovensko.'] },
    { t: 'c', q: 'Що означає «zastávka»?', o: ['зупинка', 'застава', 'затримка'] },
    { t: 'o', q: 'Де тут аптека?', a: ['Kde je tu lekáreň?', 'Kde tu je lekáreň?'] },
    { t: 'o', q: 'Пошта на площі, ліворуч.', a: 'Pošta je na námestí, vľavo.' },
    { t: 'l', a: 'Je to ďaleko? Nie, je to blízko.', tr: 'Це далеко? Ні, це близько.' }
  ],
  say: [['Prepáčte, kde je tu lekáreň?', 'Вибачте, де тут аптека?'], ['Je to ďaleko?', 'Це далеко?'], ['Choďte rovno a potom vľavo.', 'Ідіть прямо, а потім ліворуч.'], ['Som v práci.', 'Я на роботі.'], ['Bývam na Slovensku.', 'Я живу в Словаччині.']],
  speak: ['Опишіть свій район: «Obchod je blízko, pošta je na námestí…»', 'Поясніть, як дійти від дому до найближчої зупинки (vľavo, vpravo, rovno).'],
  mission: 'Запитайте на вулиці дорогу, навіть якщо знаєте її: «Prepáčte, kde je tu pošta / lekáreň?» — і зрозумійте відповідь.'
},
{
  id: 'a1-6', stage: 'a1', num: 'A1.6', title: 'Kam? — ísť, do / na, транспорт', dur: '1 тиждень',
  goals: ['відмінювати ísť', 'сказати, куди йдете (do + родовий, na + знахідний)', 'їздити громадським транспортом'],
  theory: `
<h3>ísť — іти або їхати (один раз, зараз)</h3>
<p>[[idem]], [[ideš]], [[ide]], [[ideme]], [[idete]], [[idú]]. [[Idem domov.]] [[Kam ideš?]] Регулярно — [[chodiť]]: [[Každý deň chodím do práce.]]</p>
<h3>Kam? Логіка проста: де «v» → куди «do»; де «na» → куди «na»</h3>
<div class="tblwrap"><table><tr><th>Kde? (місцевий)</th><th>Kam?</th></tr>
<tr><td>v obchode, v práci, v škole, v meste</td><td><b>do + родовий</b>: [[do obchodu]], [[do práce]], [[do školy]], [[do mesta]], [[do Bratislavy]]</td></tr>
<tr><td>na pošte, na stanici, na úrade, na Slovensku</td><td><b>na + знахідний</b>: [[na poštu]], [[na stanicu]], [[na úrad]], [[na Slovensko]]</td></tr>
<tr><td>doma</td><td>[[domov]] (без прийменника)</td></tr></table></div>
<p>Родовий однини: ж. р. -a → <b>-y</b> (škola → školy), м'які -ca → <b>-e</b> (práca → práce); с. р. -o → <b>-a</b> (mesto → mesta); ч. р. неживі — переважно <b>-u</b> (obchod → obchodu).</p>
<h3>Транспорт (MHD)</h3>
<p>Транспортом — орудний відмінок, а дієслово те саме: [[ísť autobusom]], [[električkou]] (трамваєм), [[vlakom]], [[autom]]; пішки — [[pešo]].</p>
<p>[[lístok]] — квиток, [[nastúpiť]] — сісти, [[vystúpiť]] — вийти, [[prestúpiť]] — пересісти. [[Ide tento autobus na stanicu?]] [[Kde mám vystúpiť?]] [[Jeden lístok, prosím.]] [[Ďalšia zastávka…]] — наступна зупинка…</p>`,
  vocab: [['ísť', 'іти, їхати'], ['kam', 'куди'], ['domov', 'додому'], ['chodiť', 'ходити (регулярно)'], ['autobus', 'автобус'], ['električka', 'трамвай'],
    ['vlak', 'поїзд'], ['lístok', 'квиток'], ['nastúpiť', 'сісти (в транспорт)'], ['vystúpiť', 'вийти (з транспорту)'], ['prestúpiť', 'пересісти'],
    ['pešo', 'пішки'], ['rýchlo', 'швидко'], ['pomaly', 'повільно'], ['teraz', 'зараз'], ['každý deň', 'щодня'], ['cesta', 'дорога; подорож']],
  ex: [
    { t: 'i', q: 'ísť → my ___', a: 'ideme' },
    { t: 'i', q: 'ísť → oni ___', a: 'idú' },
    { t: 'i', q: 'Kam? do (obchod) → do ___', a: 'obchodu' },
    { t: 'i', q: 'Kam? do (škola) → do ___', a: 'školy' },
    { t: 'i', q: 'Kam? do (mesto) → do ___', a: 'mesta' },
    { t: 'i', q: 'Kam? na (pošta) → na ___', a: 'poštu' },
    { t: 'c', q: '«Я йду на роботу»', o: ['Idem do práce.', 'Idem na prácu.', 'Idem v práci.'] },
    { t: 'c', q: '«Їду трамваєм»', o: ['Idem električkou.', 'Idem na električke.', 'Idem s električka.'] },
    { t: 'c', q: '«Я йду додому»', o: ['Idem domov.', 'Idem doma.'] },
    { t: 'o', q: 'Де мені вийти?', a: 'Kde mám vystúpiť?' },
    { t: 'o', q: 'Один квиток, будь ласка.', a: ['Jeden lístok, prosím.', 'Prosím, jeden lístok.'] },
    { t: 'l', a: 'Ide tento autobus na stanicu?', tr: 'Цей автобус їде на вокзал?' }
  ],
  say: [['Ide tento autobus na stanicu?', 'Цей автобус їде на вокзал?'], ['Kde mám vystúpiť?', 'Де мені вийти?'], ['Idem do práce električkou.', 'Я їду на роботу трамваєм.'], ['Jeden lístok, prosím.', 'Один квиток, будь ласка.']],
  speak: ['Розкажіть, як ви добираєтеся на роботу або до магазину: «Ráno idem autobusom do práce…»'],
  mission: 'На зупинці чи в транспорті запитайте: «Ide tento autobus / táto električka na …?» Або купіть квиток словацькою.'
}
);
