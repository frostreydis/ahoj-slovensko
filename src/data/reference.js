/* Довідник: вимова, фальшиві друзі, відмінки, зразки відмінювання, займенники, дієслова */
window.SK = window.SK || {};
(function (SK) {
  const tbl = (head, rows) => '<div class="tblwrap"><table><tr>' + head.map((h) => '<th>' + h + '</th>').join('') + '</tr>' +
    rows.map((r) => '<tr>' + r.map((c) => '<td>' + c + '</td>').join('') + '</tr>').join('') + '</table></div>';
  const say = (s) => '[[' + s + ']]';

  const ff = [
    ['ovocie', 'фрукти', 'овочі = zelenina'], ['život', 'життя', 'живіт = brucho'], ['chytrý', 'розумний, кмітливий', 'хитрий = prefíkaný'],
    ['úžasný', 'чудовий, дивовижний', 'жахливий = hrozný (рос. «ужасный»)'], ['čudný', 'дивний', 'чудовий = úžasný, skvelý'],
    ['zápach', 'сморід', 'запах = vôňa (приємний), pach'], ['vôňa', 'аромат, приємний запах', 'рос. «вонь» = zápach'],
    ['páchnuť', 'смердіти', 'пахнути (приємно) = voňať'], ['jahoda', 'полуниця', 'ягода = bobuľa'], ['kúriť', 'опалювати', 'курити = fajčiť'],
    ['byt', 'квартира', 'бути = byť'], ['hľadať', 'шукати', 'дивитися = pozerať (sa)'], ['hrad', 'замок, фортеця', 'град = krupobitie'],
    ['čerstvý', 'свіжий', 'черствий = tvrdý, starý'], ['pozor', 'увага!', 'ганьба = hanba'], ['dôvod', 'причина', 'довід = argument'],
    ['stolička', 'стілець', 'столиця = hlavné mesto'], ['topánky', 'черевики, взуття', 'тапки = papuče'], ['noviny', 'газета', 'новини = správy'],
    ['smotana', 'вершки', 'сметана = kyslá smotana'], ['syr', 'твердий сир', 'кисломолочний сир = tvaroh'], ['úrok', 'відсоток (у банку)', 'урок = hodina, lekcia'],
    ['hodina', 'година; урок', ''], ['starosť', 'турбота, клопіт', 'старість = staroba'], ['pokoj', 'спокій', 'кімната = izba'],
    ['farba', 'колір; фарба', 'Akú farbu? = Якого кольору?'], ['výlet', 'поїздка, екскурсія', 'виліт = odlet'], ['skúška', 'іспит, проба', 'рос. «скучно» = nudno'],
    ['plat', 'зарплата', 'плата = platba, poplatok'], ['pivnica', 'підвал, льох', 'пивна = krčma, piváreň'], ['hora', 'гора; також ліс', ''],
    ['obchod', 'магазин', 'обхід = obchádzka'], ['ľúbiť', 'кохати', 'любити щось = mať rád'], ['rád / rada', 'охоче; «люблю (робити)»', 'Rád čítam = Я люблю читати'],
    ['krk', 'шия', 'крик = krik'], ['čas', 'час', 'рос. «час» (година) = hodina'], ['časopis', 'журнал', 'газета = noviny'], ['pitný režim', 'достатньо пити воду', '']
  ];

  const alphabet = [
    ['a / á', 'а / а:', 'mama, máj'], ['ä', 'е', 'mäso, päť'], ['b', 'б (у кінці — п)', 'brat, dub'], ['c', 'ц', 'cukor'], ['č', 'ч', 'čaj'],
    ['d / ď', 'д / дь', 'dom, ďakujem'], ['dz / dž', 'дз / дж', 'medzi, džús'], ['e / é', 'е / е:', 'pero, pekné'], ['f', 'ф', 'film'],
    ['g', 'ґ', 'guma'], ['h', 'г (українське)', 'hora'], ['ch', 'х', 'chlieb'], ['i / í', 'і / і:', 'iný, prosím'], ['j', 'й', 'jablko'],
    ['k', 'к', 'kniha'], ['l / ĺ / ľ', 'л / л: / ль', 'lampa, vĺča, soľ'], ['m', 'м', 'mesto'], ['n / ň', 'н / нь', 'noc, deň'],
    ['o / ó / ô', 'о / о: / уо', 'voda, móda, stôl'], ['p', 'п', 'pivo'], ['r / ŕ', 'р / р:', 'ruka, vŕba'], ['s / š', 'с / ш', 'syn, škola'],
    ['t / ť', 'т / ть', 'tam, ťažký'], ['u / ú', 'у / у:', 'ulica, súd'], ['v', 'в; у кінці складу — ў', 'voda, domov'], ['x', 'кс', 'taxík'],
    ['y / ý', 'і / і:', 'syn, pekný'], ['z / ž', 'з / ж', 'zima, žena']
  ];

  const cases = [
    ['1. nominatív (N)', 'kto? čo?', '—', 'To je <b>žena</b>.'],
    ['2. genitív (G)', 'koho? čoho?', 'bez, do, od, u, z, okrem, počas, vedľa', 'Idem <b>do školy</b>. Som <b>z Kyjeva</b>.'],
    ['3. datív (D)', 'komu? čomu?', 'k, proti, vďaka, kvôli', 'Idem <b>k lekárovi</b>. Volám <b>mame</b>.'],
    ['4. akuzatív (A)', 'koho? čo?', 'cez, pre, na (kam?), za (за — заміна, час), o (на скільки)', 'Mám <b>sestru</b>. Idem <b>na poštu</b>.'],
    ['6. lokál (L)', 'o kom? o čom? kde?', 'v, na (kde?), o (про), po, pri', 'Som <b>v práci</b>. Hovoríme <b>o filme</b>.'],
    ['7. inštrumentál (I)', 's kým? s čím?', 's, pred, za (де?), nad, pod, medzi', 'Idem <b>s kamarátom</b>. Idem <b>autobusom</b>.']
  ];

  const vzory = {
    m: [['', 'chlap (живі)', 'hrdina (живі на -a)', 'dub (неживі, тверді)', 'stroj (неживі, м\'які)'],
      ['N', 'chlap', 'hrdina', 'dub', 'stroj'], ['G', 'chlapa', 'hrdinu', 'duba', 'stroja'], ['D', 'chlapovi', 'hrdinovi', 'dubu', 'stroju'],
      ['A', 'chlapa', 'hrdinu', 'dub', 'stroj'], ['L', '(o) chlapovi', '(o) hrdinovi', '(o) dube', '(o) stroji'], ['I', '(s) chlapom', '(s) hrdinom', '(s) dubom', '(so) strojom'],
      ['N мн.', 'chlapi', 'hrdinovia', 'duby', 'stroje'], ['G мн.', 'chlapov', 'hrdinov', 'dubov', 'strojov'], ['D мн.', 'chlapom', 'hrdinom', 'dubom', 'strojom'],
      ['A мн.', 'chlapov', 'hrdinov', 'duby', 'stroje'], ['L мн.', '(o) chlapoch', '(o) hrdinoch', '(o) duboch', '(o) strojoch'], ['I мн.', 'chlapmi', 'hrdinami', 'dubmi', 'strojmi']],
    f: [['', 'žena', 'ulica (м\'які на -a)', 'dlaň (на м\'який приголосний)', 'kosť (на -sť, -c…)'],
      ['N', 'žena', 'ulica', 'dlaň', 'kosť'], ['G', 'ženy', 'ulice', 'dlane', 'kosti'], ['D', 'žene', 'ulici', 'dlani', 'kosti'],
      ['A', 'ženu', 'ulicu', 'dlaň', 'kosť'], ['L', '(o) žene', '(o) ulici', '(o) dlani', '(o) kosti'], ['I', 'ženou', 'ulicou', 'dlaňou', 'kosťou'],
      ['N мн.', 'ženy', 'ulice', 'dlane', 'kosti'], ['G мн.', 'žien', 'ulíc', 'dlaní', 'kostí'], ['D мн.', 'ženám', 'uliciam', 'dlaniam', 'kostiam'],
      ['A мн.', 'ženy', 'ulice', 'dlane', 'kosti'], ['L мн.', '(o) ženách', '(o) uliciach', '(o) dlaniach', '(o) kostiach'], ['I мн.', 'ženami', 'ulicami', 'dlaňami', 'kosťami']],
    n: [['', 'mesto', 'srdce', 'vysvedčenie', 'dievča (малята)'],
      ['N', 'mesto', 'srdce', 'vysvedčenie', 'dievča'], ['G', 'mesta', 'srdca', 'vysvedčenia', 'dievčaťa'], ['D', 'mestu', 'srdcu', 'vysvedčeniu', 'dievčaťu'],
      ['A', 'mesto', 'srdce', 'vysvedčenie', 'dievča'], ['L', '(o) meste', '(o) srdci', '(o) vysvedčení', '(o) dievčati'], ['I', 'mestom', 'srdcom', 'vysvedčením', 'dievčaťom'],
      ['N мн.', 'mestá', 'srdcia', 'vysvedčenia', 'dievčatá'], ['G мн.', 'miest', 'sŕdc', 'vysvedčení', 'dievčat'], ['D мн.', 'mestám', 'srdciam', 'vysvedčeniam', 'dievčatám'],
      ['A мн.', 'mestá', 'srdcia', 'vysvedčenia', 'dievčatá'], ['L мн.', '(o) mestách', '(o) srdciach', '(o) vysvedčeniach', '(o) dievčatách'], ['I мн.', 'mestami', 'srdcami', 'vysvedčeniami', 'dievčatami']]
  };
  const vz = (rows) => tbl(rows[0], rows.slice(1).map((r) => ['<b>' + r[0] + '</b>'].concat(r.slice(1))));

  const adj = [['', 'ч. р.', 'ж. р.', 'с. р.', 'мн.'],
    ['N', 'pekný / cudzí', 'pekná / cudzia', 'pekné / cudzie', 'pekní* / pekné; cudzí* / cudzie'],
    ['G', 'pekného / cudzieho', 'peknej / cudzej', 'pekného / cudzieho', 'pekných / cudzích'],
    ['D', 'peknému / cudziemu', 'peknej / cudzej', 'peknému / cudziemu', 'pekným / cudzím'],
    ['A', 'pekného* / pekný; cudzieho* / cudzí', 'peknú / cudziu', 'pekné / cudzie', 'pekných* / pekné; cudzích* / cudzie'],
    ['L', '(o) peknom / cudzom', '(o) peknej / cudzej', '(o) peknom / cudzom', '(o) pekných / cudzích'],
    ['I', 'pekným / cudzím', 'peknou / cudzou', 'pekným / cudzím', 'peknými / cudzími']];

  const pron = [['', 'ja', 'ty', 'on / ono', 'ona', 'my', 'vy', 'oni / ony', 'sa (себе)'],
    ['G', 'mňa, ma', 'teba, ťa', 'jeho, ho, neho', 'jej, nej', 'nás', 'vás', 'ich, nich', 'seba'],
    ['D', 'mne, mi', 'tebe, ti', 'jemu, mu, nemu', 'jej, nej', 'nám', 'vám', 'im, nim', 'sebe, si'],
    ['A', 'mňa, ma', 'teba, ťa', 'jeho, ho, neho', 'ju, ňu', 'nás', 'vás', 'ich, nich / ne', 'seba, sa'],
    ['L', '(o) mne', '(o) tebe', '(o) ňom', '(o) nej', '(o) nás', '(o) vás', '(o) nich', '(o) sebe'],
    ['I', 'mnou', 'tebou', 'ním', 'ňou', 'nami', 'vami', 'nimi', 'sebou']];

  const verbs = [['', 'ja', 'ty', 'on/ona', 'my', 'vy', 'oni', 'мин. (ч.)'],
    ['byť', 'som', 'si', 'je', 'sme', 'ste', 'sú', 'bol'], ['mať', 'mám', 'máš', 'má', 'máme', 'máte', 'majú', 'mal'],
    ['ísť', 'idem', 'ideš', 'ide', 'ideme', 'idete', 'idú', 'išiel / šiel'], ['chcieť', 'chcem', 'chceš', 'chce', 'chceme', 'chcete', 'chcú', 'chcel'],
    ['môcť', 'môžem', 'môžeš', 'môže', 'môžeme', 'môžete', 'môžu', 'mohol'], ['vedieť', 'viem', 'vieš', 'vie', 'vieme', 'viete', 'vedia', 'vedel'],
    ['jesť', 'jem', 'ješ', 'je', 'jeme', 'jete', 'jedia', 'jedol'], ['piť', 'pijem', 'piješ', 'pije', 'pijeme', 'pijete', 'pijú', 'pil'],
    ['spať', 'spím', 'spíš', 'spí', 'spíme', 'spíte', 'spia', 'spal'], ['brať', 'beriem', 'berieš', 'berie', 'berieme', 'beriete', 'berú', 'bral'],
    ['povedať', 'poviem', 'povieš', 'povie', 'povieme', 'poviete', 'povedia', 'povedal'], ['dať', 'dám', 'dáš', 'dá', 'dáme', 'dáte', 'dajú', 'dal'],
    ['stáť', 'stojím', 'stojíš', 'stojí', 'stojíme', 'stojíte', 'stoja', 'stál'], ['vidieť', 'vidím', 'vidíš', 'vidí', 'vidíme', 'vidíte', 'vidia', 'videl'],
    ['prísť', 'prídem', 'prídeš', 'príde', 'prídeme', 'prídete', 'prídu', 'prišiel']];

  const types = [['Тип (1-а ос.)', 'Зразок', 'ja … oni', 'Ще дієслова'],
    ['-ám', 'volať', 'volám, voláš, volá, voláme, voláte, volajú', 'čítať, hľadať, bývať, počúvať, mať'],
    ['-ím', 'robiť', 'robím, robíš, robí, robíme, robíte, robia', 'hovoriť, variť, platiť, vidieť, musieť'],
    ['-iem', 'rozumieť', 'rozumiem, rozumieš, rozumie, rozumieme, rozumiete, rozumejú', 'vedieť (viem…vedia), niesť (nesiem…nesú)'],
    ['-ujem', 'pracovať', 'pracujem, pracuješ, pracuje, pracujeme, pracujete, pracujú', 'усі на -ovať: kupovať, potrebovať, študovať'],
    ['-em', 'písať', 'píšem, píšeš, píše, píšeme, píšete, píšu', 'česať (češem), plakať (plačem)']];

  const nums = [['1–10', 'jeden/jedna/jedno, dva/dve, tri, štyri, päť, šesť, sedem, osem, deväť, desať'],
    ['11–19', 'jedenásť, dvanásť, trinásť, štrnásť, pätnásť, šestnásť, sedemnásť, osemnásť, devätnásť'],
    ['десятки', 'dvadsať, tridsať, štyridsať, päťdesiat, šesťdesiat, sedemdesiat, osemdesiat, deväťdesiat'],
    ['сотні', 'sto, dvesto, tristo, štyristo, päťsto … tisíc, milión'],
    ['порядкові', 'prvý, druhý, tretí, štvrtý, piaty, šiesty, siedmy, ôsmy, deviaty, desiaty'],
    ['чоловіки (живі)', 'dvaja, traja, štyria muži — але päť mužov']];

  SK.ref = [
    { id: 'pron', title: 'Абетка і вимова', html: tbl(['Літера', 'Звук', 'Приклад'], alphabet.map((r) => ['<b>' + r[0] + '</b>', r[1], r[2].split(', ').map(say).join(', ')])) +
      '<ul><li>Наголос — <b>завжди на першому складі</b>; односкладовий прийменник забирає його на себе (DO-práce).</li><li>Довгота (´) — це не наголос.</li>' +
      '<li>de, te, ne, le, di, ti, ni, li звучать м\'яко (крім запозичень і слів ten, teraz, kedy…).</li><li>Дзвінкі в кінці слова оглушуються: dub → «дуп».</li>' +
      '<li>Ритмічний закон: два довгі склади поспіль зазвичай не стоять (krásny, а не krásný).</li></ul>' },
    { id: 'ff', title: 'Фальшиві друзі', html: tbl(['Словацьке слово', 'Означає', 'А «схоже» українське (рос.) — це…'], ff.map((r) => [say(r[0]), r[1], r[2]])) },
    { id: 'cases', title: 'Відмінки та прийменники', html: tbl(['Відмінок', 'Питання', 'Прийменники', 'Приклад'], cases) +
      '<p class="small muted">У сучасній словацькій 6 відмінків; кличний (5-й) лишився хіба в окремих формах (pane, bože, chlapče).</p>' },
    { id: 'vzory-m', title: 'Іменники: чоловічий рід', html: vz(vzory.m) + '<p class="small muted">Живі на -a (hrdina, kolega, turista) відмінюються за «hrdina».</p>' },
    { id: 'vzory-f', title: 'Іменники: жіночий рід', html: vz(vzory.f) },
    { id: 'vzory-n', title: 'Іменники: середній рід', html: vz(vzory.n) },
    { id: 'adj', title: 'Прикметники (pekný / cudzí)', html: vz(adj) + '<p class="small muted">* — форма для чоловічого роду, живих (pekní muži, vidím pekného psa). Після довгого складу закінчення коротке: krásny, krásna.</p>' },
    { id: 'pronouns', title: 'Особові займенники у відмінках', html: vz(pron) + '<p class="small muted">Короткі форми (ma, ťa, mi, ti, ho, mu, sa, si) — клітики, ставляться на другу позицію. Довгі (mňa, teba, jeho…) — для наголосу та після прийменників (pre mňa, k nemu, o ňom).</p>' },
    { id: 'verbs', title: 'Дієслова: типи відмінювання', html: tbl(types[0], types.slice(1)) +
      '<p><b>Минулий час:</b> -l / -la / -lo / -li + som, si, sme, ste (у 3-й особі без них). <b>Майбутній:</b> budem + недоконаний інфінітив, або доконане дієслово в теперішній формі. <b>Умовний:</b> -l + by + som…: robil by som.</p>' },
    { id: 'irreg', title: 'Найважливіші неправильні дієслова', html: vz(verbs) },
    { id: 'nums', title: 'Числа', html: tbl(['', ''], nums.map((r) => ['<b>' + r[0] + '</b>', r[1]])) + '<p>1 euro · 2–4 eurá · 5+ eur. 1 rok · 2–4 roky · 5+ rokov.</p>' }
  ];
})(window.SK);
