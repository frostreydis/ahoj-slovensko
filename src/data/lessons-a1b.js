/* A1, частина 2: уроки A1.7–A1.13 */
window.SK = window.SK || {};
SK.lessons = SK.lessons || [];
SK.lessons.push(
{
  id: 'a1-7', stage: 'a1', num: 'A1.7', title: 'Koľko to stojí? — числа, ціни, магазин', dur: '1 тиждень',
  goals: ['числа до 1000', 'ціни: euro / eurá / eur', 'купувати на прилавку й платити'],
  theory: `
<h3>Числа 20–1000</h3>
<p>20 [[dvadsať]], 30 [[tridsať]], 40 [[štyridsať]], 50 [[päťdesiat]], 60 [[šesťdesiat]], 70 [[sedemdesiat]], 80 [[osemdesiat]], 90 [[deväťdesiat]], 100 [[sto]], 200 [[dvesto]], 300 [[tristo]], 500 [[päťsto]], 1000 [[tisíc]].</p>
<p>Складені числа пишуть разом: 25 [[dvadsaťpäť]], 134 [[stotridsaťštyri]].</p>
<h3>1 / 2–4 / 5+ — як в українській</h3>
<div class="tblwrap"><table><tr><th>1</th><th>2–4</th><th>5 і більше</th></tr>
<tr><td>[[jedno euro]]</td><td>[[dve eurá]]</td><td>[[päť eur]]</td></tr>
<tr><td>[[jeden cent]]</td><td>[[tri centy]]</td><td>[[desať centov]]</td></tr>
<tr><td>[[jedna káva]]</td><td>[[dve kávy]]</td><td>[[päť káv]]</td></tr></table></div>
<p>[[Koľko to stojí?]] — Скільки це коштує? [[Stojí to päť eur.]] Ціну 2,50 € кажуть так: [[dve eurá päťdesiat]].</p>
<h3>У магазині</h3>
<p>[[Prosím si…]] — «Дайте, будь ласка…» (найчастіше на прилавку). [[Chcel by som…]] / [[Chcela by som…]] — Я хотів би / хотіла б…
[[Máte…?]] — У вас є…? [[Ešte niečo?]] — Щось іще? [[To je všetko.]] — Це все. [[Môžem platiť kartou?]] — Можна заплатити карткою? [[v hotovosti]] — готівкою. [[Potrebujete tašku?]] — Потрібен пакет?</p>
<div class="tip"><b>Вага по-словацьки:</b> [[deka]] = 10 грамів. [[Prosím si dvadsať deka šunky.]] = 200 г шинки. Також [[pol kila]] — пів кіло, [[kus]] — штука.</div>
<div class="note"><b>Пастки:</b> [[ovocie]] — фрукти (овочі — [[zelenina]]); [[paradajka]] — помідор; [[syr]] — твердий сир, а кисломолочний — [[tvaroh]]; [[smotana]] — вершки (сметана — [[kyslá smotana]]).</div>`,
  vocab: [['koľko', 'скільки'], ['stáť (stojí)', 'коштувати'], ['euro / eurá / eur', 'євро'], ['pokladnica', 'каса'], ['kartou', 'карткою'],
    ['v hotovosti', 'готівкою'], ['rožok', 'булочка (рогалик)'], ['maslo', 'масло'], ['syr', 'сир (твердий)'], ['tvaroh', 'кисломолочний сир'],
    ['šunka', 'шинка'], ['vajce', 'яйце'], ['zelenina', 'овочі'], ['ovocie', 'фрукти', 'не «овочі»!'], ['paradajka', 'помідор'], ['uhorka', 'огірок'],
    ['zemiaky', 'картопля'], ['deka', '10 грамів'], ['sto', 'сто'], ['tisíc', 'тисяча']],
  ex: [
    { t: 'i', q: 'Напишіть словами: <b>30</b>', a: 'tridsať' },
    { t: 'i', q: 'Напишіть словами: <b>50</b>', a: 'päťdesiat' },
    { t: 'i', q: 'Напишіть словами: <b>100</b>', a: 'sto' },
    { t: 'i', q: '2 € → dve ___', a: 'eurá' },
    { t: 'i', q: '5 € → päť ___', a: 'eur' },
    { t: 'c', q: '«Ovocie» — це…', o: ['фрукти', 'овочі', 'вівці'] },
    { t: 'c', q: '«Paradajka» — це…', o: ['помідор', 'паради', 'перець'] },
    { t: 'c', q: 'Як попросити на прилавку «Дайте, будь ласка, хліб»?', o: ['Prosím si chlieb.', 'Daj chlieb.', 'Chcem chleba.'] },
    { t: 'c', q: '«10 deka» — це…', o: ['100 грамів', '10 грамів', '1 кілограм'] },
    { t: 'o', q: 'Скільки це коштує?', a: 'Koľko to stojí?' },
    { t: 'o', q: 'Можна заплатити карткою?', a: 'Môžem platiť kartou?' },
    { t: 'l', a: 'To je všetko, ďakujem.', tr: 'Це все, дякую.' },
    { t: 'l', a: 'Stojí to sedem eur.', tr: 'Це коштує сім євро.' }
  ],
  say: [['Prosím si dvadsať deka šunky.', 'Дайте, будь ласка, 200 грамів шинки.'], ['Koľko to stojí?', 'Скільки це коштує?'], ['Môžem platiť kartou?', 'Можна заплатити карткою?'], ['To je všetko, ďakujem.', 'Це все, дякую.'], ['Chcela by som dva rožky.', 'Я хотіла б дві булочки.']],
  speak: ['Розіграйте сценку в магазині: попросіть 3 продукти з кількістю, запитайте ціну і як можна заплатити.'],
  mission: 'Купіть щось на прилавку словацькою: «Dobrý deň, prosím si dvadsať deka šunky.» І запитайте: «Môžem platiť kartou?»'
},
{
  id: 'a1-8', stage: 'a1', num: 'A1.8', title: 'Koľko je hodín? — час, дні, місяці', dur: '1 тиждень',
  goals: ['дні тижня і місяці', 'котра година, о котрій', 'читати години роботи'],
  theory: `
<h3>Дні тижня. Коли? → v + знахідний</h3>
<p>[[pondelok]], [[utorok]], [[streda]], [[štvrtok]], [[piatok]], [[sobota]], [[nedeľa]].
Коли: [[v pondelok]], [[v utorok]], [[v stredu]], [[vo štvrtok]], [[v piatok]], [[v sobotu]], [[v nedeľu]]; на вихідних — [[cez víkend]].</p>
<p>[[dnes]] — сьогодні, [[zajtra]] — завтра, [[včera]] — вчора. [[ráno]] — вранці, [[dopoludnia]] — до обіду, [[popoludní]] — після обіду, [[večer]] — увечері, [[v noci]] — вночі.</p>
<h3>Котра година?</h3>
<p>[[Koľko je hodín?]] — [[Je jedna hodina.]] [[Sú dve hodiny.]] [[Sú tri hodiny.]] [[Je päť hodín.]] (знову 1 / 2–4 / 5+).</p>
<p>О котрій? [[O koľkej?]] — [[o jednej]], [[o druhej]], [[o tretej]], [[o štvrtej]], [[o piatej]], [[o šiestej]], [[o siedmej]], [[o ôsmej]], [[o deviatej]], [[o desiatej]], [[o jedenástej]], [[o dvanástej]].</p>
<div class="good">Як в українській: [[o pol tretej]] = о пів на третю (2:30).</div>
<h3>Місяці. У якому місяці?</h3>
<p>[[január]], [[február]], [[marec]], [[apríl]], [[máj]], [[jún]], [[júl]], [[august]], [[september]], [[október]], [[november]], [[december]].
[[v januári]], [[vo februári]], [[v marci]], [[v máji]], [[v júni]], [[v auguste]], [[v decembri]].</p>
<h3>Години роботи</h3>
<p>[[otvorené]] — відчинено, [[zatvorené]] — зачинено, [[otváracie hodiny]] — години роботи. Скорочення днів: Po, Ut, St, Št, Pi, So, Ne.</p>`,
  vocab: [['pondelok', 'понеділок'], ['utorok', 'вівторок'], ['streda', 'середа'], ['štvrtok', 'четвер'], ['piatok', 'п\'ятниця'], ['sobota', 'субота'],
    ['nedeľa', 'неділя'], ['víkend', 'вихідні'], ['dnes', 'сьогодні'], ['zajtra', 'завтра'], ['včera', 'вчора'], ['ráno', 'ранок; вранці'],
    ['hodina', 'година; урок'], ['minúta', 'хвилина'], ['týždeň', 'тиждень'], ['mesiac', 'місяць'], ['otvorené', 'відчинено'], ['zatvorené', 'зачинено'],
    ['O koľkej?', 'О котрій?']],
  ex: [
    { t: 'c', q: 'Коли? «у середу»', o: ['v stredu', 'v streda', 'v strede'] },
    { t: 'c', q: 'Коли? «у четвер»', o: ['vo štvrtok', 'v štvrtok', 'na štvrtok'] },
    { t: 'i', q: 'Напишіть словацькою: <b>субота</b>', a: 'sobota' },
    { t: 'i', q: 'Напишіть словацькою: <b>завтра</b>', a: 'zajtra' },
    { t: 'c', q: '«Котра година?»', o: ['Koľko je hodín?', 'Koľko hodina?', 'Aká je hodina?'] },
    { t: 'c', q: '3:00 — як правильно?', o: ['Sú tri hodiny.', 'Je tri hodín.', 'Sú tri hodín.'] },
    { t: 'i', q: 'О котрій? О 5:00 → o ___', a: 'piatej' },
    { t: 'i', q: 'О котрій? О 8:00 → o ___', a: 'ôsmej' },
    { t: 'c', q: '«o pol tretej» — це…', o: ['2:30', '3:30', '3:15'] },
    { t: 'o', q: 'У неділю магазин зачинений.', a: ['V nedeľu je obchod zatvorený.', 'Obchod je v nedeľu zatvorený.'] },
    { t: 'l', a: 'Zajtra o siedmej večer.', tr: 'Завтра о сьомій вечора.' }
  ],
  say: [['Koľko je hodín?', 'Котра година?'], ['O koľkej?', 'О котрій?'], ['V pondelok o deviatej.', 'У понеділок о дев\'ятій.'], ['Cez víkend je zatvorené.', 'На вихідних зачинено.']],
  speak: ['Опишіть свій тиждень: «V pondelok pracujem, v sobotu idem na trh…»', 'Кілька разів за день назвіть уголос, котра година.'],
  mission: 'Знайдіть години роботи пошти чи магазину поруч і прочитайте їх уголос. Або домовтеся словацькою про час зустрічі.'
},
{
  id: 'a1-8b', stage: 'a1', num: 'A1.8b', title: 'Числа, дати, пори року й кольори', dur: '1 тиждень',
  goals: ['впевнено розуміти на слух ціни, числа й час', 'називати місяці й дати, казати про день народження', 'пори року й кольори'],
  theory: `
<div class="tip"><b>🔢 Головна практика цього уроку — тренажер чисел.</b> Голос називає випадкове число, ціну, час або дату, а ви записуєте цифрами. І навпаки: бачите цифри й пишете словами. Вправи щоразу нові.<br><a class="btn primary small" href="#/drill" style="margin-top:6px">Відкрити тренажер чисел, цін, часу й дат</a></div>
<h3>Числа до 9999</h3>
<div class="tblwrap"><table><tr><th>одиниці</th><th>десятки</th><th>сотні</th><th>тисячі</th></tr>
<tr><td>11 [[jedenásť]]</td><td>20 [[dvadsať]]</td><td>100 [[sto]]</td><td>1000 [[tisíc]]</td></tr>
<tr><td>12 [[dvanásť]]</td><td>30 [[tridsať]]</td><td>200 [[dvesto]]</td><td>2000 [[dvetisíc]]</td></tr>
<tr><td>13 [[trinásť]]</td><td>40 [[štyridsať]]</td><td>300 [[tristo]]</td><td>3000 [[tritisíc]]</td></tr>
<tr><td>14 [[štrnásť]]</td><td>50 [[päťdesiat]]</td><td>400 [[štyristo]]</td><td>5000 [[päťtisíc]]</td></tr>
<tr><td>15 [[pätnásť]]</td><td>60 [[šesťdesiat]]</td><td>500 [[päťsto]]</td><td></td></tr>
<tr><td>16 [[šestnásť]]</td><td>70 [[sedemdesiat]]</td><td>600 [[šesťsto]]</td><td></td></tr>
<tr><td>17 [[sedemnásť]]</td><td>80 [[osemdesiat]]</td><td>700 [[sedemsto]]</td><td></td></tr>
<tr><td>18 [[osemnásť]]</td><td>90 [[deväťdesiat]]</td><td>800 [[osemsto]]</td><td></td></tr>
<tr><td>19 [[devätnásť]]</td><td></td><td>900 [[deväťsto]]</td><td></td></tr></table></div>
<p>Складені числа пишуть <b>разом</b>: 25 [[dvadsaťpäť]], 134 [[stotridsaťštyri]], 2026 [[dvetisícdvadsaťšesť]].</p>
<div class="note"><b>Пастки:</b> «-desiat» є тільки в 50–90 (päťdesiat), а 20, 30, 40 закінчуються на «-dsať» (dvadsať, tridsať, štyridsať). 200 і 2000 — через «dve»: [[dvesto]], [[dvetisíc]].</div>
<p>Іменник після числа — як в українській: 1 / 2–4 / 5+ ([[jedno euro]], [[dve eurá]], [[päť eur]]). Після складених чисел, написаних разом (21, 22, 23…), іменник стоїть як після 5+: [[dvadsaťjeden eur]], [[tridsaťdva rokov]].</p>
<p>Ціни: 3,49 € — [[tri eurá štyridsaťdeväť]]; 12,90 € — [[dvanásť eur deväťdesiat]].</p>
<h3>Порядкові числа і поверхи</h3>
<p>[[prvý]], [[druhý]], [[tretí]], [[štvrtý]], [[piaty]], [[šiesty]], [[siedmy]], [[ôsmy]], [[deviaty]], [[desiaty]]… 20. [[dvadsiaty]], 21. [[dvadsiaty prvý]] (складені порядкові пишуть <b>окремо</b>).</p>
<div class="note"><b>Поверхи рахують інакше!</b> Наш перший поверх — [[prízemie]] ([[na prízemí]]). Словацьке [[prvé poschodie]] — це наш <b>другий</b> поверх. «Живу на 4-му поверсі» (за українським рахунком) = [[Bývam na treťom poschodí.]]</div>
<h3>Місяці</h3>
<p>Назви місяців латинські, як в англійській, а не «січень / лютий».</p>
<div class="tblwrap"><table><tr><th>Місяць</th><th>У якому? (v + місцевий)</th><th>Дата (родовий)</th></tr>
<tr><td>[[január]] — січень</td><td>[[v januári]]</td><td>[[januára]]</td></tr>
<tr><td>[[február]] — лютий</td><td>[[vo februári]]</td><td>[[februára]]</td></tr>
<tr><td>[[marec]] — березень</td><td>[[v marci]]</td><td>[[marca]]</td></tr>
<tr><td>[[apríl]] — квітень</td><td>[[v apríli]]</td><td>[[apríla]]</td></tr>
<tr><td>[[máj]] — травень</td><td>[[v máji]]</td><td>[[mája]]</td></tr>
<tr><td>[[jún]] — червень</td><td>[[v júni]]</td><td>[[júna]]</td></tr>
<tr><td>[[júl]] — липень</td><td>[[v júli]]</td><td>[[júla]]</td></tr>
<tr><td>[[august]] — серпень</td><td>[[v auguste]]</td><td>[[augusta]]</td></tr>
<tr><td>[[september]] — вересень</td><td>[[v septembri]]</td><td>[[septembra]]</td></tr>
<tr><td>[[október]] — жовтень</td><td>[[v októbri]]</td><td>[[októbra]]</td></tr>
<tr><td>[[november]] — листопад</td><td>[[v novembri]]</td><td>[[novembra]]</td></tr>
<tr><td>[[december]] — грудень</td><td>[[v decembri]]</td><td>[[decembra]]</td></tr></table></div>
<h3>Дати й дні народження</h3>
<p>Дату пишуть так: <b>24. 8. 2026</b>. Читають порядковим числом і місяцем — обидва в родовому відмінку: [[dvadsiateho štvrtého augusta]], [[prvého mája]], [[tridsiateho prvého decembra]].</p>
<p>[[Koľkého je dnes?]] — Котре сьогодні число? [[Dnes je dvadsiateho štvrtého augusta.]]<br>
[[Kedy máš narodeniny?]] — Коли в тебе день народження? [[Mám narodeniny pätnásteho marca.]]<br>
Рік: [[Narodil som sa v roku tisícdeväťstodeväťdesiat.]] / [[Narodila som sa…]]</p>
<h3>Пори року</h3>
<p>[[jar]] (ж. р.) — весна, [[leto]] — літо, [[jeseň]] (ж. р.) — осінь, [[zima]] — зима.<br>
Коли: [[na jar]] — навесні, [[v lete]] — влітку, [[na jeseň]] — восени, [[v zime]] — взимку.</p>
<h3>Кольори</h3>
<p>[[biely]] білий, [[čierny]] чорний, [[sivý]] сірий, [[červený]] червоний, [[modrý]] синій / блакитний, [[zelený]] зелений, [[žltý]] жовтий, [[oranžový]] помаранчевий, [[ružový]] рожевий, [[fialový]] фіолетовий, [[hnedý]] коричневий.<br>
Відтінки пишуть разом: [[svetlomodrý]] — світло-синій, [[tmavozelený]] — темно-зелений.</p>
<p>Кольори — це прикметники типу pekný: [[červený autobus]], [[červená taška]], [[červené auto]]. [[Akej farby je tvoje auto?]] — Якого кольору твоя машина? (<b>farba</b> = колір.)</p>`,
  vocab: [['tridsať', 'тридцять'], ['štyridsať', 'сорок'], ['päťdesiat', 'п\'ятдесят'], ['šesťdesiat', 'шістдесят'], ['sedemdesiat', 'сімдесят'],
    ['osemdesiat', 'вісімдесят'], ['deväťdesiat', 'дев\'яносто'], ['január', 'січень'], ['február', 'лютий'], ['marec', 'березень'], ['apríl', 'квітень'],
    ['máj', 'травень'], ['jún', 'червень'], ['júl', 'липень'], ['august', 'серпень'], ['september', 'вересень'], ['október', 'жовтень'],
    ['november', 'листопад'], ['december', 'грудень'], ['jar (ž)', 'весна'], ['leto', 'літо'], ['jeseň (ž)', 'осінь'], ['zima', 'зима'],
    ['biely', 'білий'], ['čierny', 'чорний'], ['sivý', 'сірий'], ['červený', 'червоний'], ['modrý', 'синій, блакитний'], ['zelený', 'зелений'],
    ['žltý', 'жовтий'], ['hnedý', 'коричневий'], ['ružový', 'рожевий'], ['farba', 'колір; фарба'], ['narodeniny', 'день народження'],
    ['prízemie', 'перший поверх (наш)'], ['poschodie', 'поверх (рахують від другого)']],
  ex: [
    { t: 'c', q: '«березень» словацькою', o: ['marec', 'máj', 'apríl'] },
    { t: 'c', q: '«у лютому»', o: ['vo februári', 'v februári', 'na februári'] },
    { t: 'i', q: 'У якому місяці? липень → v ___', a: 'júli' },
    { t: 'i', q: 'Дата: 1. 5. → prvého ___', a: 'mája' },
    { t: 'i', q: 'Напишіть словами: <b>40</b>', a: 'štyridsať' },
    { t: 'i', q: 'Напишіть словами: <b>200</b>', a: 'dvesto' },
    { t: 'c', q: 'Ви живете на 2-му поверсі (за українським рахунком). Словацькою:', o: ['na prvom poschodí', 'na druhom poschodí', 'na prízemí'], e: 'Перший поверх — prízemie, тож наш 2-й поверх = [[prvé poschodie]].' },
    { t: 'i', q: '«влітку» → ___', a: 'v lete' },
    { t: 'c', q: 'Що означає «jar»?', o: ['весна', 'яр (балка)', 'жар'] },
    { t: 'i', q: 'Узгодьте колір: červený + auto → ___ auto', a: 'červené' },
    { t: 'i', q: 'Узгодьте колір: modrý + taška → ___ taška', a: 'modrá' },
    { t: 'c', q: '«Akej farby je to auto?» означає…', o: ['Якого кольору ця машина?', 'Чия це машина?', 'Скільки коштує ця машина?'] },
    { t: 'o', q: 'Котре сьогодні число?', a: 'Koľkého je dnes?' },
    { t: 'o', q: 'У мене день народження п\'ятнадцятого березня.', a: ['Mám narodeniny pätnásteho marca.', 'Narodeniny mám pätnásteho marca.', 'Pätnásteho marca mám narodeniny.'] },
    { t: 'g', g: 'numListen', min: 20, max: 99 },
    { t: 'g', g: 'numListen', min: 100, max: 999 },
    { t: 'g', g: 'priceListen' },
    { t: 'g', g: 'timeListen' },
    { t: 'g', g: 'dateListen' },
    { t: 'g', g: 'numWords', min: 20, max: 99 },
    { t: 'g', g: 'dateWords' }
  ],
  say: [['Koľkého je dnes?', 'Котре сьогодні число?'], ['Dnes je dvadsiateho štvrtého augusta.', 'Сьогодні двадцять четверте серпня.'], ['Mám narodeniny pätnásteho marca.', 'У мене день народження п\'ятнадцятого березня.'],
    ['Stojí to tri eurá štyridsaťdeväť.', 'Це коштує 3,49 €.'], ['Bývam na treťom poschodí.', 'Я живу на 3-му поверсі (за нашим рахунком — на 4-му).'], ['Na jar a v lete je tu krásne.', 'Навесні й улітку тут чудово.']],
  speak: ['Назвіть уголос сьогоднішню дату, дату свого народження і дати народження двох близьких людей.', 'Опишіть кольори 5 речей навколо себе: «Moja taška je čierna…»', 'Відкрийте тренажер чисел і 5 хвилин читайте ціни вголос.'],
  mission: 'У магазині прочитайте вголос (можна пошепки) 10 цінників: [[dve eurá deväťdesiatdeväť]]… А на касі спробуйте зрозуміти суму на слух, не дивлячись на екран.'
},
{
  id: 'a1-9', stage: 'a1', num: 'A1.9', title: 'Chcem, môžem, musím, viem + rád', dur: '1 тиждень',
  goals: ['модальні дієслова + інфінітив', 'різниця vedieť / poznať / môcť', 'сказати, що любите: rád robím, páči sa mi'],
  theory: `
<div class="tblwrap"><table><tr><th></th><th>chcieť (хотіти)</th><th>môcť (могти)</th><th>musieť (мусити)</th><th>vedieť (знати, вміти)</th></tr>
<tr><td>ja</td><td>chcem</td><td>môžem</td><td>musím</td><td>viem</td></tr>
<tr><td>ty</td><td>chceš</td><td>môžeš</td><td>musíš</td><td>vieš</td></tr>
<tr><td>on/ona</td><td>chce</td><td>môže</td><td>musí</td><td>vie</td></tr>
<tr><td>my</td><td>chceme</td><td>môžeme</td><td>musíme</td><td>vieme</td></tr>
<tr><td>vy</td><td>chcete</td><td>môžete</td><td>musíte</td><td>viete</td></tr>
<tr><td>oni</td><td>chcú</td><td>môžu</td><td>musia</td><td>vedia</td></tr></table></div>
<p>[[Musím ísť.]] [[Môžem sa opýtať?]] — Можна запитати? [[Neviem.]] — Не знаю. Ввічливіше, ніж «chcem»: [[Chcel by som…]] / [[Chcela by som…]]</p>
<div class="tip"><b>vedieť</b> — знати факт або вміти: [[Viem plávať.]] — Я вмію плавати. <b>poznať</b> — знати когось чи місце: [[Poznáš Petra?]] <b>môcť</b> — мати змогу або дозвіл.</div>
<h3>rád / rada — «люблю (робити)». Цього в українській немає!</h3>
<p><b>rád</b> (чоловік) / <b>rada</b> (жінка) / <b>radi</b> (множина: чоловіки або змішана група) / <b>rady</b> (множина: жінки) + дієслово: [[Rád čítam.]] / [[Rada čítam.]] — Я люблю читати. [[Radi cestujeme.]] Заперечення: [[Nerád varím.]] / [[Nerada varím.]]</p>
<p><b>mať rád / rada</b> + знахідний — любити щось чи когось: [[Mám rád kávu.]] [[Mám rada leto.]]</p>
<h3>páčiť sa — подобатися</h3>
<p>Як в українській «мені подобається»: [[Páči sa mi to.]] [[Bratislava sa mi páči.]] [[Páčia sa mi hory.]] mi — мені, ti — тобі, vám — вам.</p>
<p>[[treba]] — треба: [[Treba platiť.]] [[Netreba.]]</p>`,
  vocab: [['chcieť', 'хотіти'], ['môcť', 'могти'], ['musieť', 'мусити'], ['vedieť', 'знати, вміти'], ['poznať', 'знати (когось, щось)'],
    ['rád / rada', 'охоче; «люблю…»'], ['mať rád', 'любити (щось)'], ['páčiť sa', 'подобатися'], ['treba', 'треба'], ['plávať', 'плавати'],
    ['cestovať', 'подорожувати'], ['tancovať', 'танцювати'], ['spievať', 'співати'], ['hudba', 'музика'], ['kniha', 'книжка'], ['voľný čas', 'вільний час']],
  ex: [
    { t: 'i', q: 'chcieť → ja ___', a: 'chcem' },
    { t: 'i', q: 'môcť → oni ___', a: 'môžu' },
    { t: 'i', q: 'musieť → ty ___', a: 'musíš' },
    { t: 'i', q: 'vedieť, заперечення → ja ___', a: 'neviem' },
    { t: 'i', q: 'vedieť → oni ___', a: 'vedia' },
    { t: 'c', q: 'Жінка каже: «Я люблю готувати»', o: ['Rada varím.', 'Rád varím.', 'Mám rada variť.'] },
    { t: 'c', q: 'Чоловік каже: «Я люблю каву»', o: ['Mám rád kávu.', 'Som rád kávu.', 'Mám radi kávu.'] },
    { t: 'c', q: '«Мені подобається Братислава»', o: ['Bratislava sa mi páči.', 'Ja páčim Bratislavu.', 'Bratislava mi páči sa.'] },
    { t: 'c', q: '«Я вмію плавати»', o: ['Viem plávať.', 'Poznám plávať.', 'Mám plávať.'] },
    { t: 'o', q: 'Можна запитати?', a: 'Môžem sa opýtať?' },
    { t: 'o', q: 'Я мушу йти додому.', a: 'Musím ísť domov.' },
    { t: 'l', a: 'Čo rád robíš vo voľnom čase?', tr: 'Що ти любиш робити у вільний час?' }
  ],
  say: [['Môžem sa opýtať?', 'Можна запитати?'], ['Rád / Rada čítam.', 'Я люблю читати.'], ['Bratislava sa mi páči.', 'Мені подобається Братислава.'], ['Neviem, prepáčte.', 'Не знаю, вибачте.'], ['Čo rád robíš vo voľnom čase?', 'Що ти любиш робити у вільний час?']],
  speak: ['Скажіть 5 речень про те, що ви любите і не любите, з rád / rada, mám rád / rada і páči sa mi.'],
  mission: 'Запитайте колегу чи знайомого: «Čo rád / rada robíš vo voľnom čase?» — і розкажіть про себе.'
},
{
  id: 'a1-10', stage: 'a1', num: 'A1.10', title: 'Robil som — минулий час', dur: '1 тиждень',
  goals: ['утворювати минулий час', 'ставити som / si / sme / ste на друге місце', 'розповідати про вчорашній день і вихідні'],
  theory: `
<h3>Утворення: -l / -la / -lo / -li + som, si, sme, ste</h3>
<div class="tblwrap"><table><tr><th></th><th>чоловік</th><th>жінка</th></tr>
<tr><td>ja</td><td>robil som</td><td>robila som</td></tr>
<tr><td>ty</td><td>robil si</td><td>robila si</td></tr>
<tr><td>on / ona / ono</td><td>robil</td><td>robila / robilo</td></tr>
<tr><td>my / vy / oni</td><td colspan="2">robili sme / robili ste / robili</td></tr></table></div>
<p>У 3-й особі допоміжного дієслова немає: [[On pracoval.]] [[Ona bola doma.]] [[Oni boli v Košiciach.]]</p>
<p>byť: [[bol som]], [[bola som]], [[bolo]], [[boli sme]]… [[Bol som v práci.]] [[Kde si bola včera?]]</p>
<div class="note"><b>Неправильні форми:</b> ísť → [[išiel som]] / [[šiel som]], [[išla som]]; jesť → [[jedol som]]; môcť → [[mohol som]]; chcieť → [[chcel som]]; vedieť → [[vedel som]]; mať → [[mal som]]. Дієслова на -núť часто мають -ol: [[stretnúť]] → [[stretol]], [[zabudnúť]] → [[zabudol]].</div>
<h3>Порядок слів — головне правило уроку</h3>
<p><b>som / si / sme / ste</b> — клітики: вони стоять <b>на другому місці</b> в реченні.</p>
<p>[[Včera som pracoval.]] (а не «Včera pracoval som»). [[Kde si bol?]] [[V sobotu sme boli na trhu.]] [[Ja som bol doma.]]</p>
<p>Заперечення: [[Nebol som tam.]] Як в українській, заперечень може бути кілька: [[Nerobila som nič.]] — Я нічого не робила. Так само з [[nikto]] і [[nikdy]].</p>`,
  vocab: [['včera', 'вчора'], ['minulý týždeň', 'минулого тижня'], ['predtým', 'раніше'], ['potom', 'потім'], ['nič', 'нічого'], ['nikto', 'ніхто'],
    ['nikdy', 'ніколи'], ['už', 'вже'], ['ešte', 'ще'], ['ešte nie', 'ще ні'], ['dovolenka', 'відпустка'], ['stretnúť', 'зустріти'], ['zabudnúť', 'забути'],
    ['kúpiť', 'купити'], ['zavolať', 'подзвонити'], ['urobiť', 'зробити']],
  ex: [
    { t: 'i', q: 'robiť → (ja, чоловік) ___ som', a: 'robil' },
    { t: 'i', q: 'byť → (ona) ___ doma', a: 'bola' },
    { t: 'i', q: 'pracovať → (my) ___ sme', a: 'pracovali' },
    { t: 'i', q: 'mať → (ty, жінка) ___ si', a: 'mala' },
    { t: 'i', q: 'ísť → (ja, чоловік) ___ som (одна з двох форм)', a: ['išiel', 'šiel'] },
    { t: 'i', q: 'môcť → (on) ___', a: 'mohol' },
    { t: 'c', q: 'Який порядок слів правильний?', o: ['Včera som pracoval.', 'Včera pracoval som.', 'Som včera pracoval.'] },
    { t: 'c', q: '«Вона була вдома»', o: ['Ona bola doma.', 'Ona je bola doma.', 'Ona bola je doma.'] },
    { t: 'c', q: '«Я нічого не робив»', o: ['Nerobil som nič.', 'Robil som nič.', 'Nerobil som niečo.'] },
    { t: 'o', q: 'Де ти був учора?', a: ['Kde si bol včera?', 'Kde si včera bol?'] },
    { t: 'o', q: 'У суботу ми були на ринку.', a: ['V sobotu sme boli na trhu.', 'Boli sme v sobotu na trhu.', 'Na trhu sme boli v sobotu.'] },
    { t: 'l', a: 'Minulý týždeň som bol v Košiciach.', tr: 'Минулого тижня я був у Кошицях.' }
  ],
  say: [['Včera som pracoval / pracovala.', 'Вчора я працював / працювала.'], ['Kde si bol včera?', 'Де ти був учора?'], ['Cez víkend sme boli na výlete.', 'На вихідних ми їздили на екскурсію.'], ['Zabudol som.', 'Я забув.']],
  speak: ['Розкажіть у 6 реченнях, що ви робили вчора або на вихідних.'],
  mission: 'У понеділок розкажіть колезі чи знайомому 2–3 речення про вихідні: «Cez víkend som bol / bola…»'
},
{
  id: 'a1-11', stage: 'a1', num: 'A1.11', title: 'Sa і si — зворотні дієслова, кав\'ярня', dur: '1 тиждень',
  goals: ['вживати sa / si', 'знати порядок клітик', 'замовити в кав\'ярні'],
  theory: `
<p><b>sa</b> = «-ся», але це окреме слово: [[volám sa]] (мене звати), [[učím sa]] (вчуся), [[mám sa dobre]] (у мене все добре), [[bojím sa]] (боюся), [[smejem sa]] (сміюся), [[vrátim sa]] (повернуся), [[stretneme sa]] (зустрінемося).</p>
<p><b>si</b> = «собі»: [[dám si kávu]] (я візьму каву), [[kúpim si…]] (куплю собі), [[sadnite si]] (сідайте), [[myslím si]] (я думаю, вважаю), [[pamätám si]] (пам'ятаю).</p>
<div class="note">Часом зворотність не збігається з українською: [[pozerať sa]] — дивитися, [[myslieť si]] — вважати, [[pamätať si]] — пам'ятати.</div>
<h3>Порядок клітик (друга позиція в реченні)</h3>
<p><b>by → som/si/sme/ste → sa/si → mi/ti/mu… → ma/ťa/ho…</b></p>
<p>[[Včera som sa učil.]] (а не «Včera sa som učil»). [[Kúpil som si nový telefón.]] [[Chcel by som sa opýtať…]] — Я хотів би запитати…</p>
<h3>У кав'ярні й ресторані</h3>
<p>[[Čo si dáte?]] — Що будете? [[Dám si kávu s mliekom.]] [[Dáte si ešte niečo?]] [[Dobrú chuť!]] — Смачного! [[Na zdravie!]] — Будьмо!
[[Zaplatím, prosím.]] — Рахунок, будь ласка. [[Spolu alebo zvlášť?]] — Разом чи окремо?</p>`,
  vocab: [['učiť sa', 'вчитися'], ['báť sa (bojím sa)', 'боятися'], ['smiať sa (smejem sa)', 'сміятися'], ['vrátiť sa', 'повернутися'],
    ['stretnúť sa', 'зустрітися'], ['dať si', 'взяти (замовити) собі'], ['kúpiť si', 'купити собі'], ['myslieť si', 'думати, вважати'],
    ['pamätať si', 'пам\'ятати'], ['sadnúť si', 'сісти'], ['pozerať sa', 'дивитися'], ['Dobrú chuť!', 'Смачного!'], ['Na zdravie!', 'Будьмо! На здоров\'я!'],
    ['spolu', 'разом'], ['zvlášť', 'окремо'], ['s mliekom', 'з молоком']],
  ex: [
    { t: 'c', q: '«Вчора я вчився»', o: ['Včera som sa učil.', 'Včera sa som učil.', 'Včera učil som sa.'] },
    { t: 'c', q: 'У кафе: «Я візьму каву»', o: ['Dám si kávu.', 'Dám sa kávu.', 'Dám kávu si.'] },
    { t: 'i', q: 'sa чи si? Ako ___ voláte?', a: 'sa' },
    { t: 'i', q: 'sa чи si? Myslím ___, že je to dobré.', a: 'si' },
    { t: 'i', q: 'sa чи si? Učím ___ po slovensky.', a: 'sa' },
    { t: 'i', q: 'sa чи si? Kúpil som ___ nový telefón.', a: 'si' },
    { t: 'c', q: '«Рахунок, будь ласка»', o: ['Zaplatím, prosím.', 'Platím si sa.', 'Dám si platiť.'] },
    { t: 'c', q: '«Смачного!»', o: ['Dobrú chuť!', 'Na zdravie!', 'Dobrý deň!'] },
    { t: 'o', q: 'Я хотів би запитати.', a: 'Chcel by som sa opýtať.' },
    { t: 'o', q: 'Ми зустрінемося завтра.', a: ['Stretneme sa zajtra.', 'Zajtra sa stretneme.'] },
    { t: 'l', a: 'Čo si dáte? Dám si čaj s citrónom.', tr: 'Що будете? Я візьму чай із лимоном.' }
  ],
  say: [['Dám si kávu s mliekom.', 'Я візьму каву з молоком.'], ['Zaplatím, prosím.', 'Рахунок, будь ласка.'], ['Chcel / Chcela by som sa opýtať…', 'Я хотів / хотіла б запитати…'], ['Učím sa po slovensky.', 'Я вчу словацьку.']],
  speak: ['Розіграйте сценку в кафе: замовте напій і щось поїсти, а тоді попросіть рахунок.'],
  mission: 'Замовте в кав\'ярні словацькою — «Dám si…» — а наприкінці скажіть «Zaplatím, prosím.»'
},
{
  id: 'a1-12', stage: 'a1', num: 'A1.12', title: 'Budem і urobím — майбутній час і вид', dur: '1 тиждень',
  goals: ['розрізняти доконаний і недоконаний вид', 'утворювати майбутній час', 'розповідати про плани'],
  theory: `
<p>Вид дієслова — як в українській: <b>недоконаний</b> (процес, повтор): robiť, písať, kupovať; <b>доконаний</b> (результат): urobiť, napísať, kúpiť.</p>
<h3>Майбутній час</h3>
<p><b>Недоконаний:</b> budem / budeš / bude / budeme / budete / budú + інфінітив: [[Zajtra budem pracovať.]]</p>
<p><b>Доконаний:</b> форма теперішнього часу вже означає майбутнє, як в українській «зроблю»: [[Urobím to zajtra.]] [[Zavolám ti.]] [[Kúpim chlieb.]]</p>
<p>byť: [[budem]], [[budeš]], [[bude]]… [[Budem doma.]] ísť → [[pôjdem]] (піду, поїду): [[Pôjdeme na výlet.]]</p>
<div class="note"><b>Помилка:</b> «budem urobiť» — budem з доконаним видом не вживають, так само як в українській не кажуть «буду зробити».</div>
<h3>Вчіть парами</h3>
<div class="tblwrap"><table><tr><th>недоконаний</th><th>доконаний</th><th>значення</th></tr>
<tr><td>robiť</td><td>urobiť</td><td>робити / зробити</td></tr><tr><td>písať</td><td>napísať</td><td>писати / написати</td></tr>
<tr><td>čítať</td><td>prečítať</td><td>читати / прочитати</td></tr><tr><td>kupovať</td><td>kúpiť</td><td>купувати / купити</td></tr>
<tr><td>volať</td><td>zavolať</td><td>дзвонити / подзвонити</td></tr><tr><td>piť</td><td>vypiť</td><td>пити / випити</td></tr>
<tr><td>jesť</td><td>zjesť</td><td>їсти / з'їсти</td></tr><tr><td>platiť</td><td>zaplatiť</td><td>платити / заплатити</td></tr>
<tr><td>variť</td><td>uvariť</td><td>готувати / приготувати</td></tr><tr><td>učiť sa</td><td>naučiť sa</td><td>вчити / вивчити</td></tr>
<tr><td>pozerať (sa)</td><td>pozrieť (sa)</td><td>дивитися / подивитися</td></tr><tr><td>dávať</td><td>dať</td><td>давати / дати</td></tr>
<tr><td>brať</td><td>zobrať</td><td>брати / взяти</td></tr></table></div>
<p>[[Čo budeš robiť cez víkend?]] — [[V sobotu pôjdem na nákup a v nedeľu budem odpočívať.]]</p>`,
  vocab: [['urobiť', 'зробити'], ['napísať', 'написати'], ['prečítať', 'прочитати'], ['kúpiť', 'купити'], ['zavolať', 'подзвонити'], ['vypiť', 'випити'],
    ['zjesť', 'з\'їсти'], ['zaplatiť', 'заплатити'], ['uvariť', 'приготувати'], ['naučiť sa', 'вивчити'], ['pozrieť sa', 'подивитися'], ['dať', 'дати'],
    ['zobrať', 'взяти'], ['odpočívať', 'відпочивати'], ['výlet', 'поїздка, екскурсія', 'не «виліт» (виліт — odlet)'], ['nákup', 'покупки']],
  ex: [
    { t: 'i', q: 'byť (майбутній) → ja ___', a: 'budem' },
    { t: 'i', q: 'ísť (майбутній) → my ___', a: 'pôjdeme' },
    { t: 'i', q: 'Видова пара: robiť → ___', a: 'urobiť' },
    { t: 'i', q: 'Видова пара: písať → ___', a: 'napísať' },
    { t: 'i', q: 'Видова пара: kupovať → ___', a: 'kúpiť' },
    { t: 'c', q: '«Я зроблю це завтра»', o: ['Urobím to zajtra.', 'Budem urobiť to zajtra.', 'Robím to zajtra urobiť.'] },
    { t: 'c', q: '«Завтра я працюватиму»', o: ['Zajtra budem pracovať.', 'Zajtra pracujem bude.', 'Zajtra budem pracoval.'] },
    { t: 'c', q: 'Котрий варіант — помилка?', o: ['Budem zavolať.', 'Budem volať.', 'Zavolám.'], e: 'budem + доконаний вид не вживають.' },
    { t: 'i', q: 'zavolať → ja ___ ti zajtra', a: 'zavolám' },
    { t: 'o', q: 'Що ти робитимеш на вихідних?', a: ['Čo budeš robiť cez víkend?', 'Čo budeš cez víkend robiť?'] },
    { t: 'o', q: 'Я подзвоню тобі ввечері.', a: ['Zavolám ti večer.', 'Večer ti zavolám.'] },
    { t: 'l', a: 'V sobotu pôjdeme na výlet.', tr: 'У суботу ми поїдемо на екскурсію.' }
  ],
  say: [['Čo budeš robiť cez víkend?', 'Що робитимеш на вихідних?'], ['Zajtra budem pracovať.', 'Завтра я працюватиму.'], ['Zavolám vám zajtra.', 'Я подзвоню вам завтра.'], ['Pôjdem domov.', 'Я піду додому.']],
  speak: ['Розкажіть у 6 реченнях про плани на вихідні й наступний тиждень, чергуючи budem + інфінітив і доконаний вид.'],
  mission: 'Домовтеся про щось на майбутнє словацькою — в розмові чи повідомленні колезі або сусідові: «Zavolám vám zajtra», «Prídem v piatok».'
},
{
  id: 'a1-13', stage: 'a1', num: 'A1.13', title: 'Повторення і контрольна точка A1', dur: '1 тиждень',
  goals: ['повторити все з рівня A1', 'скласти підсумковий тест на ≥ 80%', 'провести 3-хвилинну розмову словацькою'],
  theory: `
<p>Цей тиждень — для повторення. Ось план:</p>
<ol><li><b>Пн–Вт:</b> пройдіть ще раз вправи уроків, де найнижчий бал (див. «Уроки»).</li>
<li><b>Ср:</b> «Розмова» → 5 випадкових завдань із таймером, кожне з записом себе.</li>
<li><b>Чт:</b> підсумковий тест — це вправи цього уроку, зібрані з усього A1.</li>
<li><b>Пт:</b> «живий тест» — 3 хвилини розмови словацькою: знайомство, сім'я, робота, вчорашній день, плани.</li></ol>
<h3>Самооцінка: я вмію…</h3>
<ul class="check"><li>привітатися, представитися, сказати, звідки я</li><li>розповісти про сім'ю, роботу і свій день</li><li>купити продукти, запитати ціну, заплатити</li>
<li>запитати дорогу і поїхати громадським транспортом</li><li>сказати, котра година, і домовитися про час</li><li>замовити в кафе</li>
<li>розповісти, що робив учора і що робитиму завтра</li><li>попросити повторити або говорити повільніше</li></ul>
<div class="good">Якщо більшість пунктів — «так», переходьте до A2 у вкладці «Програма».</div>`,
  vocab: [],
  ex: [
    { t: 'i', q: 'Вставте byť: Oni ___ doma.', a: 'sú' },
    { t: 'c', q: '«Я не словак»', o: ['Nie som Slovák.', 'Nesom Slovák.', 'Som nie Slovák.'] },
    { t: 'i', q: 'Узгодьте: krásny + ulica → ___ ulica', a: 'krásna' },
    { t: 'i', q: 'Mám (sestra) → Mám ___.', a: 'sestru' },
    { t: 'i', q: 'pracovať → oni ___', a: 'pracujú' },
    { t: 'c', q: '«Я на роботі»', o: ['Som v práci.', 'Som na práci.', 'Som na prácu.'] },
    { t: 'i', q: 'Kam? do (mesto) → do ___', a: 'mesta' },
    { t: 'i', q: '5 € → päť ___', a: 'eur' },
    { t: 'c', q: '«у середу»', o: ['v stredu', 'v streda', 'v strede'] },
    { t: 'c', q: 'Жінка каже: «Я люблю читати»', o: ['Rada čítam.', 'Rád čítam.', 'Mám rada čítať.'] },
    { t: 'c', q: 'Який порядок слів правильний?', o: ['Včera som sa učil.', 'Včera sa som učil.', 'Včera učil som sa.'] },
    { t: 'c', q: '«Я зроблю це завтра»', o: ['Urobím to zajtra.', 'Budem urobiť to zajtra.', 'Robím to zajtra urobiť.'] },
    { t: 'c', q: '«Ovocie» — це…', o: ['фрукти', 'овочі', 'вівці'] },
    { t: 'c', q: 'Що означає «hľadať»?', o: ['шукати', 'дивитися', 'гладити'] },
    { t: 'o', q: 'Де мені вийти?', a: 'Kde mám vystúpiť?' },
    { t: 'o', q: 'Можна заплатити карткою?', a: 'Môžem platiť kartou?' },
    { t: 'o', q: 'Де ти була вчора?', a: ['Kde si bola včera?', 'Kde si včera bola?'] },
    { t: 'i', q: 'О котрій? О 7:00 → o ___', a: 'siedmej' },
    { t: 'l', a: 'Hovorte pomaly, prosím.', tr: 'Говоріть повільно, будь ласка.' },
    { t: 'l', a: 'Čo budeš robiť cez víkend?', tr: 'Що робитимеш на вихідних?' }
  ],
  say: [],
  speak: ['3 хвилини без пауз: представтеся, розкажіть про сім\'ю, роботу, вчорашній день і плани на вихідні. Запишіть себе й послухайте.'],
  mission: '«Живий тест»: проведіть 3–5-хвилинну розмову словацькою з реальною людиною — колегою, сусідом, у мовному клубі чи через HelloTalk.'
}
);
