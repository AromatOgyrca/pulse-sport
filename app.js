/* ===================================================================
 * PULSE — SPA «Система онлайн-записи в спортивный центр» (Этап 4+)
 * =================================================================== */
(() => {
'use strict';

/* ==================== 0. THEME & FULL I18N (RU / KZ / EN) ==================== */
const Theme = {
  KEY: 'pulse_theme',
  current: 'light',
  init() {
    let saved = 'light';
    try { saved = localStorage.getItem(this.KEY) || 'light'; } catch {}
    this.apply(saved === 'dark' ? 'dark' : 'light');
  },
  apply(mode) {
    this.current = mode;
    document.documentElement.setAttribute('data-theme', mode);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', mode === 'dark' ? '#0b1120' : '#f4f7fb');
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.innerHTML = `<svg class="ico" aria-hidden="true"><use href="#i-${mode === 'dark' ? 'sun' : 'moon'}"/></svg>`;
    }
  },
  toggle() {
    const next = this.current === 'dark' ? 'light' : 'dark';
    this.apply(next);
    try { localStorage.setItem(this.KEY, next); } catch {}
  }
};
Theme.init();

const I18N = {
  ru: {
    nav_home: 'Расписание',
    nav_equip: 'Тренажёры и залы',
    nav_about: 'О нас и локации',
    nav_profile: 'Кабинет',
    nav_admin: 'Админ',
    login_btn: 'Войти',
    hero_eyebrow: 'Спортивный комплекс PULSE · Караганда',
    hero_title_1: 'Тренировки и залы в',
    hero_title_2: 'один клик',
    hero_desc: 'Выбирайте утренний или вечерний зал, удобный абонемент с сауной и записывайтесь к тренеру за 3 простых шага.',
    hero_cta_1: 'Выбрать тренировку',
    hero_cta_2: 'Тарифы абонементов',
    stat_1: 'Направлений спорта',
    stat_2: 'Единиц тренажёров',
    stat_3_val: '2 зала',
    stat_3: 'Утренний и вечерний',
    stat_4_val: 'Сауна',
    stat_4: 'Финская парная 90°C',
    sec_sports: 'Виды спорта и секции',
    sec_sports_sub: 'Кликните по карточке, чтобы отфильтровать расписание',
    reset_filter: 'Сбросить фильтр',
    watch_sched: 'Смотреть расписание',
    selected_sched: 'Выбрано в расписании',
    sec_halls: 'Утренний и вечерний залы',
    sec_halls_sub: 'Настройте свой маршрут: выберите локацию для утренних и вечерних тренировок',
    equip_sauna_btn: 'Тренажёры и сауна',
    morning_lbl: 'Утром (до 15:00):',
    evening_lbl: 'Вечером (после 15:00):',
    choose_all_hall: 'Выбрать для всех тренировок',
    on_map: 'На карте',
    sec_plans: 'Абонементы и клубные карты',
    sec_plans_sub: 'В каждый абонемент включены сауна, раздевалки и гостевые визиты',
    per_30_days: '/ 30 дней',
    buy_plan_btn: 'Оформить абонемент',
    cur_plan_btn: 'Ваш текущий тариф (Продлить)',
    sec_schedule: 'Расписание тренировок',
    actual_slots: 'Актуальные слоты на 7 дней',
    all_dirs: 'Все направления',
    today: 'Сегодня',
    until: 'до',
    min: 'мин',
    free_of: 'Свободно {left} из {cap}',
    left_hot: 'Осталось мест: {left}!',
    full_spots: 'Все места заняты',
    closed_book: 'Запись закрыта',
    booked_cancel: 'Вы записаны · Отменить',
    no_sessions: 'В этот день тренировок по выбранному направлению нет',
    sec_reviews: 'Отзывы клиентов PULSE',
    sec_reviews_sub: 'Реальные оценки посетителей утреннего и вечернего залов',
    no_reviews: 'Пока нет отзывов. Станьте первым!',
    leave_rev: 'Оставить отзыв',
    your_rating: 'Ваша оценка',
    rate_5: '★★★★★ — Отлично (5)',
    rate_4: '★★★★☆ — Хорошо (4)',
    rate_3: '★★★☆☆ — Нормально (3)',
    rate_2: '★★☆☆☆ — Слабо (2)',
    rate_1: '★☆☆☆☆ — Плохо (1)',
    rev_comment: 'Комментарий',
    rev_placeholder: 'Поделитесь впечатлениями о залах, тренерах или сауне...',
    rev_submit: 'Опубликовать отзыв',
    btn_book: 'Записаться',
    btn_open_map: 'Открыть на карте',
    footer_city: 'г. Караганда · Утренний и вечерний залы',
    footer_reg: 'Регистратура и связь',
    footer_support: 'Почта и техподдержка',
    footer_bug: 'Нашли баг:',
    equip_title: 'Парк тренажёров PULSE',
    equip_sub: 'Точное количество оборудования в залах — без долгих очередей в час пик',
    to_sched: 'К расписанию',
    infra_title: 'Раздевалки и финская сауна',
    infra_sub: 'Комфортная инфраструктура в утреннем и вечернем залах',
    about_title: 'О комплексе PULSE',
    about_sub: 'Современная сеть спортивных залов в Караганде',
    nearby_title: 'Рядом со мной · Наши локации',
    nearby_sub: 'Ближайшие залы PULSE в Караганде',
    work_hours: 'Режим работы:',
    route_map: 'Маршрут на карте',
    wiz_title: 'Запись на тренировку',
    wiz_s1: '1. Зал и тренер',
    wiz_s2: '2. Тариф',
    wiz_s3: '3. Оплата',
    wiz_choose_hall: 'Выберите зал для тренировки',
    wiz_trainer_str: 'Выберите персонального тренера (силовой зал)',
    wiz_trainer_grp: 'Тренер занятия',
    wiz_next_1: 'Далее: выбор тарифа →',
    wiz_visit_type: 'Способ посещения',
    wiz_single: 'Разовое посещение (зал + сауна) — 3 500 ₸',
    wiz_back: '← Назад',
    wiz_next_2: 'Перейти к оплате →',
    wiz_confirm: 'Подтвердить запись',
    wiz_pay_btn: 'Оплатить и записаться',
    cancel: 'Отмена'
  },
  kz: {
    nav_home: 'Кесте',
    nav_equip: 'Жаттығу залдары',
    nav_about: 'Біз туралы',
    nav_profile: 'Кабинет',
    nav_admin: 'Админ',
    login_btn: 'Кіру',
    hero_eyebrow: 'PULSE спорт кешені · Қарағанды',
    hero_title_1: 'Жаттығулар мен залдар',
    hero_title_2: 'бір батырмада',
    hero_desc: 'Таңғы немесе кешкі залды, саунасы бар тиімді абонементті таңдап, жаттықтырушыға 3 қадаммен жазылыңыз.',
    hero_cta_1: 'Жаттығу таңдау',
    hero_cta_2: 'Абонементтер',
    stat_1: 'Спорт бағыты',
    stat_2: 'Жаттығу құрылғысы',
    stat_3_val: '2 зал',
    stat_3: 'Таңғы және кешкі',
    stat_4_val: 'Сауна',
    stat_4: 'Фин парнаясы 90°C',
    sec_sports: 'Спорт түрлері мен секциялар',
    sec_sports_sub: 'Кестені сүзу үшін бағытты басыңыз',
    reset_filter: 'Сүзгіні тазалау',
    watch_sched: 'Кестені көру',
    selected_sched: 'Кестеде таңдалды',
    sec_halls: 'Таңғы және кешкі залдар',
    sec_halls_sub: 'Таңертең және кешке қай залға баратыныңызды өзіңіз таңдаңыз',
    equip_sauna_btn: 'Тренажерлар мен сауна',
    morning_lbl: 'Таңертең (15:00-ге дейін):',
    evening_lbl: 'Кешке (15:00-ден кейін):',
    choose_all_hall: 'Барлық жаттығуларға таңдау',
    on_map: 'Картада',
    sec_plans: 'Абонементтер мен клуб карталары',
    sec_plans_sub: 'Әр абонементке фин саунасы, киім ауыстыру бөлмесі және қонақ билеттері кіреді',
    per_30_days: '/ 30 күн',
    buy_plan_btn: 'Абонемент рәсімдеу',
    cur_plan_btn: 'Ағымдағы тариф (Ұзарту)',
    sec_schedule: 'Жаттығу кестесі',
    actual_slots: '7 күнге арналған өзекті уақыттар',
    all_dirs: 'Барлық бағыттар',
    today: 'Бүгін',
    until: 'дейін',
    min: 'мин',
    free_of: '{cap} орыннан {left} бос',
    left_hot: 'Қалған орын: {left}!',
    full_spots: 'Барлық орын бос емес',
    closed_book: 'Жазылу жабық',
    booked_cancel: 'Сіз жазылдыңыз · Бас тарту',
    no_sessions: 'Бұл күні таңдалған бағыт бойынша жаттығулар жоқ',
    sec_reviews: 'PULSE клиенттерінің пікірлері',
    sec_reviews_sub: 'Таңғы және кешкі зал келушілерінің нақты бағалары',
    no_reviews: 'Әзірге пікірлер жоқ. Бірінші болыңыз!',
    leave_rev: 'Пікір қалдыру',
    your_rating: 'Сіздің бағаңыз',
    rate_5: '★★★★★ — Өте жақсы (5)',
    rate_4: '★★★★☆ — Жақсы (4)',
    rate_3: '★★★☆☆ — Орташа (3)',
    rate_2: '★★☆☆☆ — Әлсіз (2)',
    rate_1: '★☆☆☆☆ — Нашар (1)',
    rev_comment: 'Пікір мәтіні',
    rev_placeholder: 'Залдар, жаттықтырушылар немесе сауна туралы әсеріңізбен бөлісіңіз...',
    rev_submit: 'Пікір жариялау',
    btn_book: 'Жазылу',
    btn_open_map: 'Картадан ашу',
    footer_city: 'Қарағанды қ. · Таңғы және кешкі залдар',
    footer_reg: 'Тіркеу бөлімі және байланыс',
    footer_support: 'Пошта және қолдау',
    footer_bug: 'Қате тапсаңыз:',
    equip_title: 'PULSE жаттығу құрылғылары',
    equip_sub: 'Залдардағы жабдықтардың нақты саны — кезексіз жаттығу',
    to_sched: 'Кестеге өту',
    infra_title: 'Киім ауыстыру бөлмелері мен фин саунасы',
    infra_sub: 'Таңғы және кешкі залдардағы жайлы инфрақұрылым',
    about_title: 'PULSE кешені туралы',
    about_sub: 'Қарағандыдағы заманауи спорт залдары желісі',
    nearby_title: 'Маған жақын · Біздің локациялар',
    nearby_sub: 'Қарағандыдағы ең жақын PULSE залдары',
    work_hours: 'Жұмыс уақыты:',
    route_map: 'Картадағы бағыт',
    wiz_title: 'Жаттығуға жазылу',
    wiz_s1: '1. Зал және бапкер',
    wiz_s2: '2. Тариф',
    wiz_s3: '3. Төлем',
    wiz_choose_hall: 'Жаттығу залын таңдаңыз',
    wiz_trainer_str: 'Жеке жаттықтырушыны таңдаңыз (күш залы)',
    wiz_trainer_grp: 'Сабақ жаттықтырушысы',
    wiz_next_1: 'Келесі: тариф таңдау →',
    wiz_visit_type: 'Қатысу түрі',
    wiz_single: 'Бір реттік кіру (зал + сауна) — 3 500 ₸',
    wiz_back: '← Артқа',
    wiz_next_2: 'Төлемге өту →',
    wiz_confirm: 'Жазылуды растау',
    wiz_pay_btn: 'Төлеу және жазылу',
    cancel: 'Бас тарту'
  },
  en: {
    nav_home: 'Schedule',
    nav_equip: 'Equipment & Halls',
    nav_about: 'About & Map',
    nav_profile: 'Profile',
    nav_admin: 'Admin',
    login_btn: 'Log in',
    hero_eyebrow: 'PULSE Sports Complex · Karaganda',
    hero_title_1: 'Workouts & Halls in',
    hero_title_2: 'One Click',
    hero_desc: 'Pick your morning or evening club, choose a membership with Finnish sauna, and book a session in 3 easy steps.',
    hero_cta_1: 'Book a Workout',
    hero_cta_2: 'Memberships',
    stat_1: 'Sport disciplines',
    stat_2: 'Gym machines',
    stat_3_val: '2 halls',
    stat_3: 'Morning & evening',
    stat_4_val: 'Sauna',
    stat_4: 'Finnish sauna 90°C',
    sec_sports: 'Sports & Disciplines',
    sec_sports_sub: 'Click any card to filter the schedule below',
    reset_filter: 'Reset filter',
    watch_sched: 'View schedule',
    selected_sched: 'Selected in schedule',
    sec_halls: 'Morning & Evening Halls',
    sec_halls_sub: 'Customize your route: choose separate venues for morning and evening',
    equip_sauna_btn: 'Equipment & sauna',
    morning_lbl: 'Morning (before 15:00):',
    evening_lbl: 'Evening (after 15:00):',
    choose_all_hall: 'Select for all workouts',
    on_map: 'On map',
    sec_plans: 'Memberships & Passes',
    sec_plans_sub: 'Every pass includes sauna access, lockers, and guest invites',
    per_30_days: '/ 30 days',
    buy_plan_btn: 'Get membership',
    cur_plan_btn: 'Current plan (Renew)',
    sec_schedule: 'Training Schedule',
    actual_slots: 'Live slots for 7 days',
    all_dirs: 'All disciplines',
    today: 'Today',
    until: 'until',
    min: 'min',
    free_of: '{left} of {cap} spots free',
    left_hot: 'Only {left} spots left!',
    full_spots: 'Fully booked',
    closed_book: 'Booking closed',
    booked_cancel: 'Booked · Cancel',
    no_sessions: 'No workouts for this discipline on this day',
    sec_reviews: 'Member Reviews',
    sec_reviews_sub: 'Verified feedback from morning and evening hall visitors',
    no_reviews: 'No reviews yet. Be the first!',
    leave_rev: 'Leave a review',
    your_rating: 'Your rating',
    rate_5: '★★★★★ — Excellent (5)',
    rate_4: '★★★★☆ — Good (4)',
    rate_3: '★★★☆☆ — Average (3)',
    rate_2: '★★☆☆☆ — Fair (2)',
    rate_1: '★☆☆☆☆ — Poor (1)',
    rev_comment: 'Comment',
    rev_placeholder: 'Share your thoughts about the halls, trainers, or sauna...',
    rev_submit: 'Publish review',
    btn_book: 'Book Now',
    btn_open_map: 'Open on Map',
    footer_city: 'Karaganda · Morning & Evening Halls',
    footer_reg: 'Reception & Contacts',
    footer_support: 'Email & Bug Reports',
    footer_bug: 'Found a bug:',
    equip_title: 'PULSE Gym Equipment',
    equip_sub: 'Exact number of machines in our halls — zero waiting lines at peak hours',
    to_sched: 'To schedule',
    infra_title: 'Locker Rooms & Finnish Sauna',
    infra_sub: 'Comfortable recovery facilities in both morning and evening halls',
    about_title: 'About PULSE Complex',
    about_sub: 'Modern fitness & sports network in Karaganda',
    nearby_title: 'Near Me · Our Locations',
    nearby_sub: 'Nearest PULSE clubs in Karaganda',
    work_hours: 'Working hours:',
    route_map: 'Route on map',
    wiz_title: 'Book a Workout',
    wiz_s1: '1. Hall & Trainer',
    wiz_s2: '2. Plan',
    wiz_s3: '3. Payment',
    wiz_choose_hall: 'Select a hall for your session',
    wiz_trainer_str: 'Choose a personal trainer (strength zone)',
    wiz_trainer_grp: 'Session trainer',
    wiz_next_1: 'Next: choose plan →',
    wiz_visit_type: 'Visit option',
    wiz_single: 'Single visit (gym + sauna) — 3 500 ₸',
    wiz_back: '← Back',
    wiz_next_2: 'Proceed to payment →',
    wiz_confirm: 'Confirm booking',
    wiz_pay_btn: 'Pay & Book',
    cancel: 'Cancel'
  }
};

const WD_I18N = {
  ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  kz: ['Жс', 'Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сб'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
};

const Lang = {
  KEY: 'pulse_lang',
  current: 'ru',
  init() {
    let saved = 'ru';
    try { saved = localStorage.getItem(this.KEY) || 'ru'; } catch {}
    this.current = I18N[saved] ? saved : 'ru';
  },
  t(key, vars = null) {
    let str = I18N[this.current]?.[key] || I18N.ru[key] || key;
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => { str = str.replace(`{${k}}`, v); });
    }
    return str;
  },
  pick(obj, baseField) {
    if (!obj) return '';
    return obj[`${baseField}_${this.current}`] || obj[baseField] || '';
  },
  applyStatic() {
    $$('[data-i18n]').forEach(el => {
      el.textContent = this.t(el.dataset.i18n);
    });
    $$('.lang-btn').forEach(b => {
      b.classList.toggle('is-active', b.dataset.lang === this.current);
    });
  },
  set(code) {
    if (!I18N[code]) return;
    this.current = code;
    try { localStorage.setItem(this.KEY, code); } catch {}
    this.applyStatic();
    Router.render();
  }
};
Lang.init();

/* ==================== 1. CONFIG & LOCALIZED DATA ==================== */
const CONFIG = {
  SESSION_KEY: 'pulse_token_v1',
  SCHEDULE_DAYS: 7,
};

const CATS = {
  strength: { label: 'Силовые и Кроссфит', label_kz: 'Күш және Кроссфит', label_en: 'Strength & CrossFit' },
  mind:     { label: 'Йога и Пилатес',     label_kz: 'Йога және Пилатес', label_en: 'Yoga & Pilates' },
  fight:    { label: 'Карате и Бокс',      label_kz: 'Каратэ және Бокс',  label_en: 'Karate & Boxing' },
  cardio:   { label: 'Аэробика и Кардио',  label_kz: 'Аэробика және Кардио', label_en: 'Aerobics & Cardio' },
  water:    { label: 'Бассейн и Аква',     label_kz: 'Бассейн және Аква', label_en: 'Pool & Aqua' },
};

const SESSION_TITLE_I18N = {
  'Йога & Flex': { kz: 'Йога & Flex', en: 'Yoga & Flex' },
  'Кроссфит & Сила': { kz: 'Кроссфит және Күш', en: 'CrossFit & Strength' },
  'Карате Do': { kz: 'Каратэ Do', en: 'Karate Do' },
  'Аэробика & Dance': { kz: 'Аэробика & Dance', en: 'Aerobics & Dance' },
  'Аквафитнес': { kz: 'Аквафитнес', en: 'Aqua Fitness' }
};
function trSessionTitle(title) {
  if (Lang.current === 'ru') return title;
  return SESSION_TITLE_I18N[title]?.[Lang.current] || title;
}

const TRAINERS_POOL = [
  { name: 'Марат Сейтов', spec: 'Силовые и Кроссфит', spec_kz: 'Күш және Кроссфит', spec_en: 'Strength & CrossFit' },
  { name: 'Данияр Омаров', spec: 'Силовой тренинг', spec_kz: 'Күш жаттығулары', spec_en: 'Powerlifting & Strength' },
  { name: 'Елена Мартынова', spec: 'Йога, Пилатес и Flex', spec_kz: 'Йога, Пилатес және Flex', spec_en: 'Yoga, Pilates & Flex' },
  { name: 'Руслан Касымов', spec: 'Карате Do и ударная техника', spec_kz: 'Каратэ Do және соққы техникасы', spec_en: 'Karate Do & Striking' },
  { name: 'Алия Нурланова', spec: 'Аэробика, HIIT и кардио', spec_kz: 'Аэробика, HIIT және кардио', spec_en: 'Aerobics, HIIT & Cardio' },
  { name: 'Светлана Ким', spec: 'Бассейн и Аквафитнес', spec_kz: 'Бассейн және Аквафитнес', spec_en: 'Pool & Aqua Fitness' }
];

const MEMBERSHIP_PLANS = [
  {
    id: 'start',
    name: 'PULSE Start',
    badge: 'Базовый · 1 зал',
    badge_kz: 'Базалық · 1 зал',
    badge_en: 'Basic · 1 hall',
    price: 14900,
    popular: false,
    perks: [
      'Безлимит в 1 выбранный зал (Утро или Вечер)',
      'Тренажёрный зал + групповые секции',
      '1 бесплатный гостевой визит для друга',
      'Финская сауна по выходным дням'
    ],
    perks_kz: [
      'Таңдалған 1 залға шексіз кіру (Таңғы немесе Кешкі)',
      'Тренажер залы + топтық секциялар',
      'Досыңызға 1 тегін қонақ билеті',
      'Демалыс күндері фин саунасы'
    ],
    perks_en: [
      'Unlimited access to 1 chosen hall (Morning or Evening)',
      'Gym floor + group fitness classes',
      '1 free guest pass for a friend',
      'Finnish sauna access on weekends'
    ]
  },
  {
    id: 'pro',
    name: 'PULSE Pro',
    badge: 'Хит продаж · 2 зала',
    badge_kz: 'Ең танымал · 2 зал',
    badge_en: 'Most Popular · 2 halls',
    price: 22900,
    popular: true,
    perks: [
      'Доступ в ОБА зала (PULSE Север + PULSE Центр)',
      'Безлимитная финская сауна и зона отдыха',
      '3 гостевых визита для друзей в месяц',
      'Заморозка абонемента до 14 дней бесплатно'
    ],
    perks_kz: [
      'ЕКІ залға да кіру (PULSE Солтүстік + PULSE Орталық)',
      'Шексіз фин саунасы және демалыс аймағы',
      'Айына достарға 3 қонақ билеті',
      'Абонементті 14 күнге дейін тегін мұздату'
    ],
    perks_en: [
      'Access to BOTH clubs (PULSE North + PULSE Center)',
      'Unlimited Finnish sauna & relaxation lounge',
      '3 guest invites per month for friends',
      'Free membership freeze up to 14 days'
    ]
  },
  {
    id: 'vip',
    name: 'PULSE VIP',
    badge: 'Максимум привилегий',
    badge_kz: 'Максимум артықшылық',
    badge_en: 'All-Inclusive VIP',
    price: 34900,
    popular: false,
    perks: [
      'Безлимит 24/7 во все залы и бассейн',
      '2 персональные тренировки с тренером включены',
      '5 гостевых визитов + комплект полотенец',
      'Заморозка до 30 дней + приоритетная бронь'
    ],
    perks_kz: [
      'Барлық залдар мен бассейнге 24/7 шексіз кіру',
      'Жаттықтырушымен 2 жеке жаттығу кіреді',
      '5 қонақ билеті + сүлгілер жинағы',
      '30 күнге дейін мұздату + басым брондау'
    ],
    perks_en: [
      '24/7 unlimited access to all halls & pool',
      '2 personal training sessions included',
      '5 guest invites + fresh towel service',
      'Freeze up to 30 days + priority booking'
    ]
  }
];

const SPORTS_CARDS = [
  {
    cat: 'strength',
    title: 'Силовой зал и Кроссфит',
    title_kz: 'Күш залы және Кроссфит',
    title_en: 'Strength Gym & CrossFit',
    badge: 'Тренажёры + WOD',
    badge_kz: 'Тренажерлар + WOD',
    badge_en: 'Machines + WOD',
    trainerNote: 'Выбор тренера',
    trainerNote_kz: 'Бапкер таңдау',
    trainerNote_en: 'Choose trainer',
    desc: 'Свободные веса, блочные тренажёры и функциональные комплексы для набора силы.',
    desc_kz: 'Бос салмақтар, блоктық тренажерлар және күш жинауға арналған функционалдық кешендер.',
    desc_en: 'Free weights, cable machines, and functional rigs for strength conditioning.',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80'
  },
  {
    cat: 'mind',
    title: 'Йога, Пилатес и Flex',
    title_kz: 'Йога, Пилатес және Flex',
    title_en: 'Yoga, Pilates & Flex',
    badge: 'Mind & Body',
    badge_kz: 'Mind & Body',
    badge_en: 'Mind & Body',
    trainerNote: 'Групповой формат',
    trainerNote_kz: 'Топтық формат',
    trainerNote_en: 'Group format',
    desc: 'Восстановление осанки, глубокая растяжка, дыхательные практики и баланс.',
    desc_kz: 'Дене бітімін қалпына келтіру, терең созылу, тыныс алу жаттығулары және тепе-теңдік.',
    desc_en: 'Posture recovery, deep stretching, breathwork, and core balance.',
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80'
  },
  {
    cat: 'fight',
    title: 'Карате Do и Бокс',
    title_kz: 'Каратэ Do және Бокс',
    title_en: 'Karate Do & Boxing',
    badge: 'Единоборства',
    badge_kz: 'Жекпе-жек',
    badge_en: 'Martial Arts',
    trainerNote: 'Групповой формат',
    trainerNote_kz: 'Топтық формат',
    trainerNote_en: 'Group format',
    desc: 'Постановка ударной техники, спарринги, дисциплина и развитие реакции.',
    desc_kz: 'Соққы техникасын қою, спаррингтер, тәртіп және реакцияны дамыту.',
    desc_en: 'Striking technique, sparring drills, discipline, and agility training.',
    img: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=800&q=80'
  },
  {
    cat: 'cardio',
    title: 'Аэробика и HIIT Burn',
    title_kz: 'Аэробика және HIIT Burn',
    title_en: 'Aerobics & HIIT Burn',
    badge: 'Кардио',
    badge_kz: 'Кардио',
    badge_en: 'Cardio',
    trainerNote: 'Групповой формат',
    trainerNote_kz: 'Топтық формат',
    trainerNote_en: 'Group format',
    desc: 'Динамичные жиросжигающие тренировки под ритмичную музыку для выносливости.',
    desc_kz: 'Төзімділікті арттыруға арналған ырғақты музыкамен өтетін динамикалық жаттығулар.',
    desc_en: 'High-energy fat-burning workouts set to upbeat music for endurance.',
    img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80'
  },
  {
    cat: 'water',
    title: 'Бассейн и Аквафитнес',
    title_kz: 'Бассейн және Аквафитнес',
    title_en: 'Pool & Aqua Fitness',
    badge: 'Водная зона',
    badge_kz: 'Су аймағы',
    badge_en: 'Aqua Zone',
    trainerNote: 'Групповой формат',
    trainerNote_kz: 'Топтық формат',
    trainerNote_en: 'Group format',
    desc: 'Спортивное плавание, постановка техники кроля и щадящая аквааэробика.',
    desc_kz: 'Спорттық жүзу, кроль техникасын үйрену және буындарға жұмсақ аквааэробика.',
    desc_en: 'Lap swimming, freestyle stroke coaching, and low-impact water aerobics.',
    img: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80'
  }
];

const HALLS = {
  north: {
    id: 'north',
    name: 'Утренний зал «PULSE Север»',
    name_kz: 'Таңғы зал «PULSE Солтүстік»',
    name_en: 'Morning Hall «PULSE North»',
    shortName: 'PULSE Север (Утро)',
    shortName_kz: 'PULSE Солтүстік (Таң)',
    shortName_en: 'PULSE North (Morning)',
    hours: '06:00 – 16:00',
    address: 'г. Караганда, пр. Бухар-Жырау, 48',
    address_kz: 'Қарағанды қ., Бұқар Жырау даңғ., 48',
    address_en: 'Karaganda, Bukhar-Zhyrau Ave, 48',
    distance: '1.2 км от центра',
    distance_kz: 'Орталықтан 1.2 км',
    distance_en: '1.2 km from center',
    desc: 'Панорамные окна, максимум естественного света, кардио-линия у витражей и свободные стойки без утренних очередей.',
    desc_kz: 'Панорамалық терезелер, табиғи жарық, витраж жанындағы кардио аймағы және таңертең кезексіз бос жабдықтар.',
    desc_en: 'Panoramic windows, abundant daylight, window-side cardio line, and free squat racks with no morning queues.',
    img: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=80'
  },
  center: {
    id: 'center',
    name: 'Вечерний зал «PULSE Центр»',
    name_kz: 'Кешкі зал «PULSE Орталық»',
    name_en: 'Evening Hall «PULSE Center»',
    shortName: 'PULSE Центр (Вечер)',
    shortName_kz: 'PULSE Орталық (Кеш)',
    shortName_en: 'PULSE Center (Evening)',
    hours: '14:00 – 00:00',
    address: 'г. Караганда, ул. Ерубаева, 15',
    address_kz: 'Қарағанды қ., Ерубаев көш., 15',
    address_en: 'Karaganda, Yerubayev St, 15',
    distance: '2.4 км · Юго-Восток',
    distance_kz: '2.4 км · Оңтүстік-Шығыс',
    distance_en: '2.4 km · South-East',
    desc: 'Расширенная зона силовых тренажёров, зал единоборств, просторные раздевалки и финская сауна для восстановления после работы.',
    desc_kz: 'Кеңейтілген күш жаттығулары аймағы, жекпе-жек залы, кең киім ауыстыру бөлмелері және жұмыстан кейін демалуға арналған фин саунасы.',
    desc_en: 'Expanded strength floor, martial arts dojo, spacious locker rooms, and Finnish sauna for evening recovery.',
    img: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=900&q=80'
  }
};

const EQUIPMENT_LIST = [
  {
    name: 'Беговые дорожки Technogym Run',
    name_kz: 'Technogym Run жүгіру жолақтары',
    name_en: 'Technogym Run Treadmills',
    count: '14 шт.', count_kz: '14 дана', count_en: '14 units',
    zone: 'Кардио-зона · Оба зала', zone_kz: 'Кардио аймағы · Екі залда', zone_en: 'Cardio Zone · Both Halls',
    desc: 'Амортизирующее полотно, пульсометры и встроенные программы интервального бега.',
    desc_kz: 'Амортизациялық төсем, пульсометрлер және интервалды жүгіру бағдарламалары.',
    desc_en: 'Shock-absorbing deck, heart-rate sensors, and built-in interval running programs.',
    img: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Силовые рамы и жим лёжа',
    name_kz: 'Күш рамалары және жатып сығымдау',
    name_en: 'Power Racks & Bench Press',
    count: '8 шт.', count_kz: '8 дана', count_en: '8 racks',
    zone: 'Зона свободных весов', zone_kz: 'Бос салмақтар аймағы', zone_en: 'Free Weights Zone',
    desc: 'Олимпийские грифы 20 кг, страховочные упоры и калиброванные блины.',
    desc_kz: '20 кг олимпиадалық грифтер, сақтандыру тіректері және калибрленген дискілер.',
    desc_en: '20 kg Olympic barbells, safety spotter arms, and calibrated bumper plates.',
    img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Гантельный ряд (1–50 кг)',
    name_kz: 'Гантельдер қатары (1–50 кг)',
    name_en: 'Dumbbell Rack (1–50 kg)',
    count: '2 стойки (40 пар)', count_kz: '2 тірек (40 жұп)', count_en: '2 racks (40 pairs)',
    zone: 'Силовой сектор', zone_kz: 'Күш секторы', zone_en: 'Strength Sector',
    desc: 'Прорезиненные гексагональные гантели с шагом 2 кг и регулируемые скамьи.',
    desc_kz: '2 кг қадаммен резеңкеленген алтыбұрышты гантельдер және реттелетін орындықтар.',
    desc_en: 'Rubber-coated hex dumbbells in 2 kg increments with adjustable benches.',
    img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Кроссоверы и блочные тренажёры',
    name_kz: 'Кроссоверлер және блоктық тренажерлар',
    name_en: 'Cable Crossovers & Machines',
    count: '6 станций', count_kz: '6 станция', count_en: '6 stations',
    zone: 'Изолирующий тренинг', zone_kz: 'Оқшауланған жаттығулар', zone_en: 'Isolation Training',
    desc: 'Верхняя и нижняя тяги, баттерфляй, сгибание/разгибание ног и гравитрон.',
    desc_kz: 'Жоғарғы және төменгі тарту, баттерфляй, аяқ бүгу/жазу және гравитрон.',
    desc_en: 'Lat pulldowns, seated rows, pec fly, leg extensions, and assisted pull-up machines.',
    img: 'https://images.unsplash.com/photo-1596357395217-80de13130e92?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Гребные тренажёры Concept2',
    name_kz: 'Concept2 есу тренажерлары',
    name_en: 'Concept2 Rowing Machines',
    count: '5 шт.', count_kz: '5 дана', count_en: '5 units',
    zone: 'Кроссфит-зона', zone_kz: 'Кроссфит аймағы', zone_en: 'CrossFit Zone',
    desc: 'Профессиональные гребные эргометры для функционального и кардио-тренинга.',
    desc_kz: 'Функционалдық және кардио жаттығуларға арналған кәсіби есу эргометрлері.',
    desc_en: 'Competition-grade indoor rowers for functional conditioning and cardio.',
    img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Велотренажёры и эллипсоиды',
    name_kz: 'Велотренажерлар мен эллипсоидтар',
    name_en: 'Spin Bikes & Ellipticals',
    count: '10 шт.', count_kz: '10 дана', count_en: '10 units',
    zone: 'Кардио-линия', zone_kz: 'Кардио желісі', zone_en: 'Cardio Line',
    desc: 'Сайклы с магнитной нагрузкой и эллиптические тренажёры без ударной нагрузки на суставы.',
    desc_kz: 'Магнитті жүктемелі сайклдар және буындарға салмақ түсірмейтін эллиптикалық тренажерлар.',
    desc_en: 'Magnetic-resistance indoor bikes and low-impact elliptical cross-trainers.',
    img: 'https://images.unsplash.com/photo-1591291621164-25636774631f?auto=format&fit=crop&w=800&q=80'
  }
];

const INFRASTRUCTURE = [
  {
    title: 'Мужская и женская раздевалки',
    title_kz: 'Ерлер және әйелдер киім ауыстыру бөлмелері',
    title_en: 'Men’s & Women’s Locker Rooms',
    badge: '120 шкафчиков с браслетами',
    badge_kz: 'Білезікті 120 шкаф',
    badge_en: '120 smart-wristband lockers',
    desc: 'Индивидуальные шкафчики с электронными замками, тропические душевые кабины, фены и питьевые фонтанчики.',
    desc_kz: 'Электрондық құлыптары бар жеке шкафтар, тропикалық душ кабиналары, фендер және ауыз су бұрқақтары.',
    desc_en: 'Electronic smart lockers, rainfall showers, hairdryers, and filtered water stations.',
    img: 'https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Финская сауна и зона отдыха',
    title_kz: 'Фин саунасы және демалыс аймағы',
    title_en: 'Finnish Sauna & Lounge',
    badge: '90°C · Включено в абонементы',
    badge_kz: '90°C · Абонементке кіреді',
    badge_en: '90°C · Included in passes',
    desc: 'Отделка из канадского кедра, купель с холодной водой и мягкие шезлонги для восстановления мышц после тренировки.',
    desc_kz: 'Канадалық балқарағаймен қапталған сауна, салқын су хауызы және жаттығудан кейін демалуға арналған шезлонгтар.',
    desc_en: 'Canadian cedar sauna, cold plunge tub, and lounge chairs for post-workout recovery.',
    img: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80'
  }
];

const DEMO = {
  user:  { email: 'demo@pulse.kz',  password: 'Demo#2026' },
  admin: { email: 'admin@pulse.kz', password: 'Admin#2026' },
};

/* ==================== 2. UTILS ==================== */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const ESC_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '`': '&#96;' };
const esc = s => String(s ?? '').replace(/[&<>"'`]/g, c => ESC_MAP[c]);
const clean = (s, max = 120) => String(s ?? '').replace(/[\u0000-\u001F\u007F<>]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
const pad = n => String(n).padStart(2, '0');
const dateKey = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseLocal = s => { const [d, t = '00:00'] = s.split('T'); const [y, m, dd] = d.split('-').map(Number); const [h, mi] = t.split(':').map(Number); return new Date(y, m - 1, dd, h, mi); };
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const fmtTime = d => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
const fmtPrice = n => Number(n).toLocaleString('ru-RU') + ' ₸';
const MONTHS_GEN = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const fmtDay = d => `${d.getDate()} ${MONTHS_GEN[d.getMonth()]}`;
const initials = name => String(name).split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
const ico = (name) => `<svg class="ico" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const go = path => { location.hash = '#' + path; };
const busy = (btn, on) => { if (!btn) return; btn.disabled = on; btn.classList.toggle('is-loading', on); };

function paint(root = document) {
  $$('[data-d]', root).forEach(el => el.style.setProperty('--d', el.dataset.d + 'ms'));
  void document.body.offsetWidth;
  $$('[data-w]', root).forEach(el => { el.style.width = el.dataset.w + '%'; });
  $$('[data-count]', root).forEach(countUp);
}
function countUp(el) {
  const to = +el.dataset.count, suf = el.dataset.suffix || '';
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = to + suf; return; }
  const t0 = performance.now();
  const tick = now => {
    const k = Math.min(1, (now - t0) / 700);
    el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + suf;
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ==================== 3. VALIDATORS ==================== */
const V = {
  email: v => /^[^\s@]{1,64}@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Введите корректный e-mail',
  name:  v => /^\p{L}[\p{L}\s'’.-]{1,39}$/u.test(v) ? '' : 'Имя: 2–40 букв, без цифр и спецсимволов',
  phone: v => (/^\+?[\d\s()-]+$/.test(v) && v.replace(/\D/g, '').length >= 10 && v.replace(/\D/g, '').length <= 15) ? '' : 'Формат: +7 700 123 45 67',
};

function passwordStrength(pw) {
  const checks = {
    len: pw.length >= 8,
    case: /\p{Ll}/u.test(pw) && /\p{Lu}/u.test(pw),
    digit: /\d/.test(pw),
    symbol: /[^\p{L}\d]/u.test(pw),
  };
  let score = Object.values(checks).filter(Boolean).length;
  if (pw.length >= 12 && score < 4) score++;
  const weak = /(.)\1{2,}|1234|qwer|password|йцук|0000/i.test(pw);
  if (weak) score = Math.min(score, 1);
  const labels = ['Очень слабый', 'Слабый', 'Средний', 'Хороший', 'Надёжный'];
  return { checks, score, label: labels[score], ok: checks.len && checks.digit && checks.case && !weak && score >= 3 };
}

/* ==================== 4. API ==================== */
class ApiError extends Error {
  constructor(code, message, field = null) { super(message); this.name = 'ApiError'; this.code = code; this.field = field; }
}

const Api = {
  token: null,
  baseUrl: location.protocol.startsWith('http') ? '/api' : 'http://localhost:3000/api',
  onAuthLost: null,

  setToken(t) { this.token = t; },

  async request(action, payload = {}) {
    if (!navigator.onLine) throw new ApiError(0, 'Нет соединения с интернетом');

    try {
      const response = await fetch(`${this.baseUrl}/dispatch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.token ? { 'Authorization': `Bearer ${this.token}` } : {})
        },
        body: JSON.stringify({ action, payload })
      });

      const data = await response.json();

      if (!response.ok) {
        const err = new ApiError(response.status, data.message || 'Ошибка сервера', data.field);
        if (response.status === 401 && this.token && !action.startsWith('auth.')) this.onAuthLost?.();
        throw err;
      }

      return data;
    } catch (e) {
      if (e instanceof ApiError) throw e;
      throw new ApiError(500, 'Не удалось связаться с сервером (проверьте node server.js)');
    }
  },
};

/* ==================== 5. КЛИЕНТСКИЕ СЕРВИСЫ ==================== */
const State = {
  sessions: new Map(),
  reviews: [],
  day: dateKey(new Date()),
  cat: 'all',
  morningHall: 'north',
  eveningHall: 'center',
  pending: null,
  lastRoute: null,
};

const Auth = {
  user: null,
  isAdmin() { return this.user?.role === 'admin'; },
  _store(res) { this.user = res.user; Api.setToken(res.token); try { sessionStorage.setItem(CONFIG.SESSION_KEY, res.token); } catch {} },
  clear() { this.user = null; Api.setToken(null); try { sessionStorage.removeItem(CONFIG.SESSION_KEY); } catch {} },
  async restore() {
    let tk = null; try { tk = sessionStorage.getItem(CONFIG.SESSION_KEY); } catch {}
    if (!tk) return;
    Api.setToken(tk);
    try { this.user = (await Api.request('auth.me')).user; } catch { this.clear(); }
  },
  async login(login, password) { this._store(await Api.request('auth.login', { login, password })); },
  async register(data) { this._store(await Api.request('auth.register', data)); },
};

const Toast = {
  root: $('#toasts'), live: new Map(),
  show({ type = 'info', title, message = '', duration = 4500, action = null, key = null }) {
    key = key ?? (type === 'error' || type === 'warn' ? `${type}|${title}|${message}` : null);
    if (key && this.live.has(key)) return;
    if (this.root.children.length > 3) this.root.firstElementChild._close?.();
    const el = document.createElement('div');
    el.className = `toast toast--${type}`;
    el.setAttribute('role', type === 'error' ? 'alert' : 'status');
    el.innerHTML = `${ico({ success: 'check', error: 'alert', warn: 'alert', info: 'info' }[type])}
      <div class="toast__body"><b>${esc(title)}</b>${message ? `<span>${esc(message)}</span>` : ''}</div>
      ${action ? `<button class="toast__act" type="button">${esc(action.label)}</button>` : ''}
      <button class="toast__x" type="button" aria-label="Закрыть">${ico('x')}</button><i class="toast__bar"></i>`;
    el.style.setProperty('--t', duration + 'ms');
    let remaining = duration, started = Date.now(), timer = setTimeout(close, remaining);
    function close() {
      if (el._gone) return; el._gone = true; clearTimeout(timer);
      if (key) Toast.live.delete(key);
      el.classList.add('is-leaving'); setTimeout(() => el.remove(), 260);
    }
    el._close = close;
    el.addEventListener('mouseenter', () => { clearTimeout(timer); remaining -= Date.now() - started; el.classList.add('is-paused'); });
    el.addEventListener('mouseleave', () => { started = Date.now(); timer = setTimeout(close, Math.max(remaining, 900)); el.classList.remove('is-paused'); });
    $('.toast__x', el).addEventListener('click', close);
    $('.toast__act', el)?.addEventListener('click', () => { close(); action.run(); });
    if (key) this.live.set(key, el);
    this.root.append(el);
  },
};
['success', 'error', 'warn', 'info'].forEach(t => { Toast[t] = (title, message = '', opts = {}) => Toast.show({ type: t, title, message, ...opts }); });

const Modal = {
  el: $('#modal'), _onClose: null,
  open(html, { wide = false, onClose = null } = {}) {
    this.el.innerHTML = html; this.el.classList.toggle('modal--wide', wide); this._onClose = onClose;
    if (!this.el.open) (this.el.showModal ? this.el.showModal() : this.el.setAttribute('open', ''));
  },
  close() { if (this.el.open) this.el.close(); },
  confirm({ title, text, ok = 'Подтвердить', cancel = 'Отмена', danger = false }) {
    return new Promise(resolve => {
      let result = false;
      this.open(`<div class="modal__inner"><h3 id="modal-title">${esc(title)}</h3><p class="muted">${esc(text)}</p>
        <div class="modal__actions"><button class="btn btn--ghost" type="button" data-modal="no">${esc(cancel)}</button>
        <button class="btn ${danger ? 'btn--danger' : 'btn--primary'}" type="button" data-modal="yes">${esc(ok)}</button></div></div>`, { onClose: () => resolve(result) });
      $('[data-modal=yes]', this.el).addEventListener('click', () => { result = true; this.close(); });
      $('[data-modal=no]', this.el).addEventListener('click', () => this.close());
      $('[data-modal=no]', this.el).focus();
    });
  },
};
let isMouseDownOnBackdrop = false;
Modal.el.addEventListener('mousedown', e => { isMouseDownOnBackdrop = (e.target === Modal.el); });
Modal.el.addEventListener('click', e => { if (e.target === Modal.el && isMouseDownOnBackdrop) Modal.close(); });
Modal.el.addEventListener('close', () => { const cb = Modal._onClose; Modal._onClose = null; Modal.el.innerHTML = ''; cb?.(); });

function showMapModal() {
  Modal.open(`
    <div class="modal__inner">
      <button class="modal__x btn btn--ghost btn--sm btn--icon" type="button" data-action="close-modal" aria-label="Закрыть">${ico('x')}</button>
      <span class="eyebrow">Геолокация · Караганда</span>
      <h3 id="modal-title">Асықпасай, әлі ашылған жоқпыз! 🚧</h3>
      <p class="muted" style="margin-top:8px;">
        Строительная бригада ещё докручивает гантели и настраивает температуру в сауне.
      </p>
      <div class="note">
        <b>Планируемые точки на карте:</b><br>
        • ${esc(Lang.pick(HALLS.north, 'name'))}: ${esc(Lang.pick(HALLS.north, 'address'))}<br>
        • ${esc(Lang.pick(HALLS.center, 'name'))}: ${esc(Lang.pick(HALLS.center, 'address'))}
      </div>
      <div class="modal__actions">
        <button class="btn btn--primary" type="button" data-action="close-modal">Жарайды, күтеміз</button>
      </div>
    </div>
  `);
}

/* ----- Покупка абонемента отдельно ----- */
function openPlanPayment(planId) {
  if (!Auth.user) { openAuth('login', { reason: 'Войдите в аккаунт, чтобы оформить абонемент.' }); return; }
  const plan = MEMBERSHIP_PLANS.find(p => p.id === planId);
  if (!plan) return;

  let bank = 'kaspi';
  const render = () => {
    Modal.open(`
      <div class="modal__inner">
        <button class="modal__x btn btn--ghost btn--sm btn--icon" type="button" data-action="close-modal" aria-label="Закрыть">${ico('x')}</button>
        <span class="eyebrow">${esc(Lang.pick(plan, 'badge'))}</span>
        <h3 id="modal-title">${esc(plan.name)} — ${fmtPrice(plan.price)}</h3>
        <p class="muted" style="margin-bottom:14px;">30 дней · Kaspi.kz / Halyk Bank / Visa</p>

        <div class="pay-methods">
          <button type="button" class="pay-opt ${bank === 'kaspi' ? 'is-active' : ''}" data-pay-bank="kaspi">Kaspi.kz</button>
          <button type="button" class="pay-opt ${bank === 'halyk' ? 'is-active' : ''}" data-pay-bank="halyk">Halyk Bank</button>
          <button type="button" class="pay-opt ${bank === 'card' ? 'is-active' : ''}" data-pay-bank="card">Карта Visa/MC</button>
        </div>

        ${bank === 'kaspi' ? `
          <div class="kaspi-qr-box">
            <div class="qr-square" aria-hidden="true">${'<i></i>'.repeat(16)}</div>
            <div>
              <b>Kaspi QR / Pay</b>
              <div class="muted" style="font-size:13px;">Счёт на ${fmtPrice(plan.price)} → Kaspi.kz (<b>${esc(Auth.user.phone || '+7 700 000 00 00')}</b>)</div>
            </div>
          </div>
        ` : bank === 'halyk' ? `
          <div class="note">Halyk Homebank · 0% комиссия.</div>
        ` : `
          <div class="field"><label>Card</label><input class="input" value="4400 •••• •••• 8842" readonly></div>
        `}

        <div class="modal__actions">
          <button class="btn btn--ghost" type="button" data-action="close-modal">${esc(Lang.t('cancel'))}</button>
          <button class="btn btn--primary" type="button" id="confirm-plan-pay">${fmtPrice(plan.price)}</button>
        </div>
      </div>
    `);

    $$('[data-pay-bank]', Modal.el).forEach(b => b.addEventListener('click', () => { bank = b.dataset.payBank; render(); }));
    $('#confirm-plan-pay', Modal.el).addEventListener('click', async e => {
      busy(e.currentTarget, true);
      try {
        const res = await Api.request('membership.buy', { planId: plan.id });
        Auth.user = res.user;
        Modal.close();
        Toast.success('OK!', `${plan.name} → ${Auth.user.membership_until}`);
        Router.render();
      } catch (err) {
        handleError(err);
      } finally {
        busy(e.currentTarget, false);
      }
    });
  };
  render();
}

/* ----- Запись на тренировку в 3 шага ----- */
function openBookingWizard(sessionId) {
  if (!Auth.user) {
    State.pending = sessionId;
    openAuth('login', { reason: 'Войдите, чтобы перейти к выбору зала и оплате.' });
    return;
  }
  const s = State.sessions.get(sessionId);
  if (!s) return;

  const start = parseLocal(s.start);
  const defaultHallKey = start.getHours() < 15 ? State.morningHall : State.eveningHall;
  const hasActivePass = Auth.user.membership && Auth.user.membership !== 'none';

  const wiz = {
    step: 1,
    hallKey: defaultHallKey,
    trainer: s.trainer,
    tariff: hasActivePass ? 'pass' : 'single',
    bank: 'kaspi'
  };

  const getTariffPrice = () => {
    if (wiz.tariff === 'pass') return 0;
    if (wiz.tariff === 'single') return 3500;
    const p = MEMBERSHIP_PLANS.find(x => x.id === wiz.tariff);
    return p ? p.price : 3500;
  };

  const renderStep = () => {
    const chosenHall = HALLS[wiz.hallKey];
    const price = getTariffPrice();

    let bodyHtml = '';
    if (wiz.step === 1) {
      bodyHtml = `
        <div class="field">
          <label>${esc(Lang.t('wiz_choose_hall'))}</label>
          <select class="input" id="wiz-hall">
            <option value="north" ${wiz.hallKey === 'north' ? 'selected' : ''}>${esc(Lang.pick(HALLS.north, 'shortName'))} · ${esc(Lang.pick(HALLS.north, 'address'))}</option>
            <option value="center" ${wiz.hallKey === 'center' ? 'selected' : ''}>${esc(Lang.pick(HALLS.center, 'shortName'))} · ${esc(Lang.pick(HALLS.center, 'address'))}</option>
          </select>
        </div>
        <div class="field">
          <label>${esc(s.cat === 'strength' ? Lang.t('wiz_trainer_str') : Lang.t('wiz_trainer_grp'))}</label>
          <select class="input" id="wiz-trainer">
            ${TRAINERS_POOL.map(tr => `<option value="${esc(tr.name)}" ${wiz.trainer === tr.name ? 'selected' : ''}>${esc(tr.name)} — ${esc(Lang.pick(tr, 'spec'))}</option>`).join('')}
          </select>
        </div>
        <div class="note">
          <b>${esc(trSessionTitle(s.title))}</b> · ${fmtDay(start)}, ${fmtTime(start)} (${esc(s.room)})
        </div>
        <div class="modal__actions">
          <button class="btn btn--ghost" type="button" data-action="close-modal">${esc(Lang.t('cancel'))}</button>
          <button class="btn btn--primary" type="button" id="wiz-next-1">${esc(Lang.t('wiz_next_1'))}</button>
        </div>
      `;
    } else if (wiz.step === 2) {
      bodyHtml = `
        <div class="field">
          <label>${esc(Lang.t('wiz_visit_type'))}</label>
          <select class="input" id="wiz-tariff">
            ${hasActivePass ? `<option value="pass" ${wiz.tariff === 'pass' ? 'selected' : ''}>PULSE ${esc(Auth.user.membership.toUpperCase())} — 0 ₸</option>` : ''}
            <option value="single" ${wiz.tariff === 'single' ? 'selected' : ''}>${esc(Lang.t('wiz_single'))}</option>
            <option value="start" ${wiz.tariff === 'start' ? 'selected' : ''}>PULSE Start — 14 900 ₸</option>
            <option value="pro" ${wiz.tariff === 'pro' ? 'selected' : ''}>PULSE Pro — 22 900 ₸</option>
            <option value="vip" ${wiz.tariff === 'vip' ? 'selected' : ''}>PULSE VIP — 34 900 ₸</option>
          </select>
        </div>
        <div class="note">
          <b>${esc(Lang.pick(chosenHall, 'shortName'))}</b> · <b>${esc(wiz.trainer)}</b><br>
          Total: <b>${fmtPrice(price)}</b>
        </div>
        <div class="modal__actions">
          <button class="btn btn--ghost" type="button" id="wiz-back-2">${esc(Lang.t('wiz_back'))}</button>
          <button class="btn btn--primary" type="button" id="wiz-next-2">${esc(price === 0 ? Lang.t('wiz_confirm') : Lang.t('wiz_next_2'))}</button>
        </div>
      `;
    } else {
      bodyHtml = `
        <p class="muted" style="margin-bottom:10px;">Total: <b>${fmtPrice(price)}</b></p>
        <div class="pay-methods">
          <button type="button" class="pay-opt ${wiz.bank === 'kaspi' ? 'is-active' : ''}" data-wiz-bank="kaspi">Kaspi.kz</button>
          <button type="button" class="pay-opt ${wiz.bank === 'halyk' ? 'is-active' : ''}" data-wiz-bank="halyk">Halyk Bank</button>
          <button type="button" class="pay-opt ${wiz.bank === 'card' ? 'is-active' : ''}" data-wiz-bank="card">Visa / MC</button>
        </div>

        ${wiz.bank === 'kaspi' ? `
          <div class="kaspi-qr-box">
            <div class="qr-square" aria-hidden="true">${'<i></i>'.repeat(16)}</div>
            <div>
              <b>Kaspi Pay / QR</b>
              <div class="muted" style="font-size:13px;"><b>${fmtPrice(price)}</b></div>
            </div>
          </div>
        ` : wiz.bank === 'halyk' ? `
          <div class="note">Halyk Bank (0% commission)</div>
        ` : `
          <div class="field"><label>Card</label><input class="input" value="4400 •••• •••• 8842" readonly></div>
        `}

        <div class="modal__actions">
          <button class="btn btn--ghost" type="button" id="wiz-back-3">${esc(Lang.t('wiz_back'))}</button>
          <button class="btn btn--primary" type="button" id="wiz-finish">${esc(Lang.t('wiz_pay_btn'))}</button>
        </div>
      `;
    }

    Modal.open(`
      <div class="modal__inner">
        <button class="modal__x btn btn--ghost btn--sm btn--icon" type="button" data-action="close-modal" aria-label="Закрыть">${ico('x')}</button>
        <h3 id="modal-title">${esc(Lang.t('wiz_title'))}</h3>
        <div class="wizard-steps">
          <div class="w-step ${wiz.step === 1 ? 'is-active' : 'is-done'}">${esc(Lang.t('wiz_s1'))}</div>
          <div class="w-step ${wiz.step === 2 ? 'is-active' : wiz.step > 2 ? 'is-done' : ''}">${esc(Lang.t('wiz_s2'))}</div>
          <div class="w-step ${wiz.step === 3 ? 'is-active' : ''}">${esc(Lang.t('wiz_s3'))}</div>
        </div>
        ${bodyHtml}
      </div>
    `);

    if (wiz.step === 1) {
      $('#wiz-hall', Modal.el).addEventListener('change', e => { wiz.hallKey = e.target.value; });
      $('#wiz-trainer', Modal.el).addEventListener('change', e => { wiz.trainer = e.target.value; });
      $('#wiz-next-1', Modal.el).addEventListener('click', () => { wiz.step = 2; renderStep(); });
    } else if (wiz.step === 2) {
      $('#wiz-tariff', Modal.el).addEventListener('change', e => { wiz.tariff = e.target.value; renderStep(); });
      $('#wiz-back-2', Modal.el).addEventListener('click', () => { wiz.step = 1; renderStep(); });
      $('#wiz-next-2', Modal.el).addEventListener('click', async e => {
        if (getTariffPrice() === 0) {
          await submitBooking(e.currentTarget);
        } else {
          wiz.step = 3;
          renderStep();
        }
      });
    } else {
      $$('[data-wiz-bank]', Modal.el).forEach(b => b.addEventListener('click', () => { wiz.bank = b.dataset.wizBank; renderStep(); }));
      $('#wiz-back-3', Modal.el).addEventListener('click', () => { wiz.step = 2; renderStep(); });
      $('#wiz-finish', Modal.el).addEventListener('click', async e => { await submitBooking(e.currentTarget); });
    }
  };

  async function submitBooking(btn) {
    busy(btn, true);
    try {
      if (['start', 'pro', 'vip'].includes(wiz.tariff)) {
        const mRes = await Api.request('membership.buy', { planId: wiz.tariff });
        Auth.user = mRes.user;
      }
      const { session: updated } = await Api.request('booking.create', {
        sessionId: s.id,
        hall: HALLS[wiz.hallKey].shortName,
        trainer: wiz.trainer,
        plan: wiz.tariff,
        price: getTariffPrice()
      });
      upsert(updated);
      Modal.close();
      const st = parseLocal(updated.start);
      Toast.success('OK!', `${trSessionTitle(updated.title)} · ${Lang.pick(HALLS[wiz.hallKey], 'shortName')}, ${fmtTime(st)}`, {
        duration: 6000,
        action: { label: Lang.t('cancel'), run: () => cancelBooking(s.id, { ask: false }) }
      });
    } catch (err) {
      handleError(err);
    } finally {
      busy(btn, false);
    }
  }

  renderStep();
}

const Form = {
  field(f, v = '') {
    const id = `f_${f.name}`;
    const common = `id="${id}" name="${f.name}" class="input" aria-describedby="${id}_e"${f.placeholder ? ` placeholder="${esc(f.placeholder)}"` : ''}${f.maxlength ? ` maxlength="${f.maxlength}"` : ''}`;
    let control;
    if (f.type === 'select') {
      control = `<select ${common}>${f.options.map(o => `<option value="${esc(o.value)}"${String(o.value) === String(v) ? ' selected' : ''}>${esc(o.label)}</option>`).join('')}</select>`;
    } else if (f.type === 'password') {
      control = `<div class="pw"><input ${common} type="password" autocomplete="${f.autocomplete || 'current-password'}" spellcheck="false" autocapitalize="off"><button class="pw__btn" type="button" data-action="toggle-pw" aria-label="Показать пароль" aria-pressed="false">${ico('eye')}</button></div><small class="caps" hidden>⇪ Включён Caps Lock</small>`;
    } else {
      control = `<input ${common} type="${f.type || 'text'}" value="${esc(v)}"${f.autocomplete ? ` autocomplete="${f.autocomplete}"` : ''}${f.min != null ? ` min="${f.min}"` : ''}${f.max != null ? ` max="${f.max}"` : ''}${f.type === 'number' ? ' inputmode="numeric"' : ''}>`;
    }
    const meter = f.meter ? `<div class="strength" data-s="0" aria-hidden="true"><i></i><i></i><i></i><i></i></div><div class="strength__txt muted" aria-live="polite"></div><ul class="rules"><li data-r="len">8+ символов</li><li data-r="case">Aa</li><li data-r="digit">Цифра</li><li data-r="symbol">Символ</li></ul>` : '';
    return `<div class="field" data-field="${f.name}"><label for="${id}">${esc(f.label)}${f.required ? '' : ' <span class="muted">(необязательно)</span>'}</label>${control}${meter}<p class="field__error" id="${id}_e" role="alert"></p></div>`;
  },
  html(fields, values = {}) { return fields.map(f => this.field(f, values[f.name] ?? '')).join(''); },
  read(form, fields) {
    const out = {};
    fields.forEach(f => { const v = form.elements[f.name]?.value ?? ''; out[f.name] = f.type === 'password' ? v.slice(0, 128) : clean(v, f.maxlength || 120); });
    return out;
  },
  setError(form, name, msg) {
    const box = form.querySelector(`[data-field="${name}"]`); if (!box) return;
    box.classList.toggle('has-error', !!msg);
    $('.field__error', box).textContent = msg;
    form.elements[name]?.setAttribute('aria-invalid', msg ? 'true' : 'false');
  },
  validate(form, fields) {
    const values = this.read(form, fields); let first = null;
    fields.forEach(f => {
      const v = values[f.name]; let msg = '';
      if (f.required && !v) msg = 'Обязательное поле';
      else if (v && f.validate) msg = f.validate(v, values) || '';
      this.setError(form, f.name, msg);
      if (msg && !first) first = f.name;
    });
    if (first) form.elements[first].focus();
    return { ok: !first, values };
  },
  updateMeter(form, pw) {
    const r = passwordStrength(pw);
    $('.strength', form).dataset.s = pw ? r.score : 0;
    $('.strength__txt', form).textContent = pw ? `Надёжность: ${r.label}` : '';
    Object.entries(r.checks).forEach(([k, ok]) => $(`[data-r="${k}"]`, form)?.classList.toggle('ok', ok));
  },
  wire(form, fields, onSubmit) {
    const byName = Object.fromEntries(fields.map(f => [f.name, f]));
    form.addEventListener('input', e => {
      const f = byName[e.target.name]; if (!f) return;
      if (f.meter) this.updateMeter(form, e.target.value);
      if (form.querySelector(`[data-field="${f.name}"]`).classList.contains('has-error')) this.setError(form, f.name, '');
    });
    form.addEventListener('keyup', e => {
      if (e.target.type === 'password' && e.getModifierState) $('.caps', e.target.closest('.field')).hidden = !e.getModifierState('CapsLock');
    });
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = $('[type=submit]', form), { ok, values } = this.validate(form, fields);
      if (!ok) return;
      busy(btn, true);
      try { await onSubmit(values); }
      catch (err) {
        if (err instanceof ApiError && err.field && form.elements[err.field]) { this.setError(form, err.field, err.message); form.elements[err.field].focus(); }
        else handleError(err, { retry: () => form.requestSubmit() });
      } finally { busy(btn, false); }
    });
  },
};

function handleError(e, { retry } = {}) {
  if (e instanceof ApiError) {
    if (e.code === 401 && !Auth.user) return;
    Toast.error('Ошибка', e.message, e.code === 0 && retry ? { action: { label: 'Повторить', run: retry }, duration: 7000 } : {});
  } else {
    console.error(e);
    Toast.error('Ошибка', 'Попробуйте обновить страницу');
  }
}

/* ==================== 6. VIEWS ==================== */
const main = $('#main');
function setView(html) {
  main.innerHTML = html;
  Lang.applyStatic();
  paint(main);
  main.classList.remove('view--in'); void main.offsetWidth; main.classList.add('view--in');
}

function openAuth(mode = 'login', { reason = '' } = {}) {
  const login = mode === 'login';
  const fields = login ? [
    { name: 'login', label: 'Логин или E-mail', required: true, autocomplete: 'username', maxlength: 120 },
    { name: 'password', label: 'Пароль', type: 'password', required: true, autocomplete: 'current-password' },
  ] : [
    { name: 'name', label: 'Имя и фамилия', required: true, validate: V.name, autocomplete: 'name', maxlength: 40 },
    { name: 'username', label: 'Логин (username)', required: true, validate: v => /^[a-zA-Z0-9_]{3,20}$/.test(v) ? '' : 'От 3 до 20 латинских букв, цифр или _', maxlength: 20 },
    { name: 'email', label: 'E-mail', type: 'email', required: true, validate: V.email, autocomplete: 'email', maxlength: 120 },
    { name: 'phone', label: 'Телефон', type: 'tel', validate: V.phone, autocomplete: 'tel', placeholder: '+7 700 123 45 67', maxlength: 20 },
    { name: 'password', label: 'Пароль', type: 'password', required: true, meter: true, autocomplete: 'new-password', validate: v => passwordStrength(v).ok ? '' : 'Пароль слишком простой' },
  ];
  Modal.open(`<div class="modal__inner">
    <button class="modal__x btn btn--ghost btn--sm btn--icon" type="button" data-action="close-modal" aria-label="Закрыть">${ico('x')}</button>
    <div class="seg" role="tablist">
      <button type="button" role="tab" aria-selected="${login}" data-action="auth-tab" data-mode="login">Вход</button>
      <button type="button" role="tab" aria-selected="${!login}" data-action="auth-tab" data-mode="register">Регистрация</button>
    </div>
    <h3 id="modal-title">${login ? 'С возвращением' : 'Создать аккаунт'}</h3>
    ${reason ? `<p class="note">${esc(reason)}</p>` : ''}
    <form novalidate>${Form.html(fields)}<button class="btn btn--primary btn--block" type="submit">${login ? 'Войти' : 'Зарегистрироваться'}</button></form>
    ${login ? `<div class="demo"><span>Демо-доступ:</span><button class="btn btn--ghost btn--sm" type="button" data-action="demo-login" data-role="user">Клиент</button><button class="btn btn--ghost btn--sm" type="button" data-action="demo-login" data-role="admin">Администратор</button></div>` : ''}
  </div>`);
  const form = $('form', Modal.el);
  Form.wire(form, fields, async v => {
    if (login) await Auth.login(v.login, v.password); else await Auth.register(v);
    Modal.close();
    await afterAuth();
  });
  form.elements[fields[0].name].focus();
}

async function afterAuth() {
  renderChrome();
  Toast.success(`Привет, ${Auth.user.name.split(' ')[0]}!`, Auth.isAdmin() ? 'Администратор' : 'PULSE');
  const pending = State.pending; State.pending = null;
  if (Auth.isAdmin() && !pending && Router.parse().name === '') { go('/admin'); return; }
  await Router.render();
  if (pending) openBookingWizard(pending);
}

function renderChrome(route = Router.parse().name) {
  $$('#nav [data-nav]').forEach(a => {
    const k = a.dataset.nav;
    a.hidden = (k === 'profile' && !Auth.user) || (k === 'admin' && !Auth.isAdmin());
    ((k === 'home' && route === '') || k === route) ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current');
  });
  Lang.applyStatic();
  const u = Auth.user;
  $('#userbox').innerHTML = u
    ? `<a class="userchip" href="#/profile" title="Профиль"><span class="ava">${esc(initials(u.name))}</span><span class="userchip__name">${esc(u.name.split(' ')[0])}</span></a>
       <button class="btn btn--ghost btn--sm btn--icon" type="button" data-action="logout" aria-label="Выйти">${ico('logout')}</button>`
    : `<button class="btn btn--primary btn--sm" type="button" data-action="open-auth" data-mode="login">${ico('user')} ${esc(Lang.t('login_btn'))}</button>`;
}

function drawSports() {
  const box = $('#sports-grid');
  if (!box) return;
  box.innerHTML = SPORTS_CARDS.map(sp => {
    const active = State.cat === sp.cat;
    return `
      <article class="sport-card ${active ? 'is-selected' : ''}" data-action="select-sport" data-cat="${esc(sp.cat)}" tabindex="0" role="button" aria-pressed="${active}">
        <div class="sport-card__media">
          <img src="${esc(sp.img)}" alt="${esc(Lang.pick(sp, 'title'))}" loading="lazy">
          <span class="sport-card__badge">${esc(Lang.pick(sp, 'badge'))}</span>
          <span class="sport-card__trainer-pill">${esc(Lang.pick(sp, 'trainerNote'))}</span>
        </div>
        <div class="sport-card__body">
          <h3>${esc(Lang.pick(sp, 'title'))}</h3>
          <p>${esc(Lang.pick(sp, 'desc'))}</p>
          <div class="sport-card__foot">
            <span>${esc(active ? Lang.t('selected_sched') : Lang.t('watch_sched'))}</span>
            ${ico('arrow-right')}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function drawReviews() {
  const box = $('#reviews-list');
  if (!box) return;
  if (!State.reviews.length) {
    box.innerHTML = `<div class="review-card"><p class="muted">${esc(Lang.t('no_reviews'))}</p></div>`;
    return;
  }
  box.innerHTML = State.reviews.map(r => {
    const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
    const dateStr = r.created_at ? r.created_at.slice(0, 10) : '';
    return `
      <article class="review-card">
        <div class="review-head">
          <div>
            <b>${esc(r.user_name)}</b>
            <span class="muted" style="font-size:12px; margin-left:8px;">${esc(dateStr)}</span>
          </div>
          <span class="stars" aria-label="${r.rating}/5">${stars}</span>
        </div>
        <p class="muted">${esc(r.comment)}</p>
      </article>
    `;
  }).join('');
}

function resolveSessionHall(startStr) {
  const hour = parseLocal(startStr).getHours();
  const hallKey = hour < 15 ? State.morningHall : State.eveningHall;
  return Lang.pick(HALLS[hallKey], 'shortName') || 'PULSE';
}

function cardHtml(s, i = 0) {
  const start = parseLocal(s.start), end = new Date(start.getTime() + s.dur * 60000);
  const left = s.cap - s.booked, pct = Math.round(s.booked / s.cap * 100);
  const state = s.mine ? 'booked' : start <= new Date() ? 'past' : left <= 0 ? 'full' : 'open';
  const chosenHall = s.bookedHall || resolveSessionHall(s.start);
  const chosenTrainer = s.bookedTrainer || s.trainer;
  const catLabel = Lang.pick(CATS[s.cat], 'label') || s.cat;

  const btn = {
    open:   `<button class="btn btn--primary btn--block" type="button" data-action="book" data-id="${s.id}">${esc(Lang.t('btn_book'))}</button>`,
    booked: `<button class="btn btn--ghost btn--block" type="button" data-action="cancel-booking" data-id="${s.id}">${ico('check')} ${esc(Lang.t('booked_cancel'))}</button>`,
    full:   `<button class="btn btn--ghost btn--block" type="button" disabled>${esc(Lang.t('full_spots'))}</button>`,
    past:   `<button class="btn btn--ghost btn--block" type="button" disabled>${esc(Lang.t('closed_book'))}</button>`,
  }[state];

  const spotText = left <= 0
    ? Lang.t('full_spots')
    : left <= 3
      ? Lang.t('left_hot', { left })
      : Lang.t('free_of', { left, cap: s.cap });

  return `<article class="card glass c-${esc(s.cat)} is-${state}" data-card="${s.id}" data-d="${Math.min(i, 12) * 35}">
    <div class="card__top"><div class="time">${fmtTime(start)}<small>${esc(Lang.t('until'))} ${fmtTime(end)} · ${s.dur} ${esc(Lang.t('min'))}</small></div><span class="tag">${esc(catLabel)}</span></div>
    <h3>${esc(trSessionTitle(s.title))}</h3>
    <ul class="meta">
      <li>${ico('user')}${esc(chosenTrainer)}</li>
      <li>${ico('pin')}${esc(chosenHall)} · ${esc(s.room)}</li>
    </ul>
    <div><div class="meter ${left <= 3 ? 'is-hot' : ''}"><i data-w="${pct}"></i></div>
      <div class="spots"><span>${esc(spotText)}</span><span>${pct}%</span></div></div>
    ${btn}</article>`;
}
function dayList() { const t = new Date(); t.setHours(0, 0, 0, 0); return Array.from({ length: CONFIG.SCHEDULE_DAYS }, (_, i) => addDays(t, i)); }
function drawDays() {
  const box = $('#days'); if (!box) return;
  const wdArr = WD_I18N[Lang.current] || WD_I18N.ru;
  box.innerHTML = dayList().map((d, i) => {
    const k = dateKey(d), mine = [...State.sessions.values()].some(s => s.mine && s.start.startsWith(k));
    return `<button class="day ${k === State.day ? 'is-active' : ''}" type="button" role="tab" aria-selected="${k === State.day}" data-action="pick-day" data-day="${k}"><small>${i === 0 ? esc(Lang.t('today')) : wdArr[d.getDay()]}</small><b>${d.getDate()}</b>${mine ? '<i></i>' : ''}</button>`;
  }).join('');
}
function drawChips() {
  const box = $('#chips'); if (!box) return;
  box.innerHTML = [['all', Lang.t('all_dirs')], ...Object.entries(CATS).map(([k, v]) => [k, Lang.pick(v, 'label')])]
    .map(([k, l]) => `<button class="chip ${State.cat === k ? 'is-active' : ''}" type="button" data-action="pick-cat" data-cat="${k}">${esc(l)}</button>`).join('');
}
function drawCards() {
  const box = $('#cards'); if (!box) return;
  const list = [...State.sessions.values()].filter(s => s.start.startsWith(State.day) && (State.cat === 'all' || s.cat === State.cat)).sort((a, b) => a.start.localeCompare(b.start));
  box.innerHTML = list.length ? list.map(cardHtml).join('') : `<div class="empty glass">${ico('calendar')}<p>${esc(Lang.t('no_sessions'))}</p></div>`;
  paint(box);
}
function redrawCard(id) {
  const s = State.sessions.get(id), old = $(`[data-card="${id}"]`); if (!s || !old) return;
  const t = document.createElement('template'); t.innerHTML = cardHtml(s);
  old.replaceWith(t.content.firstElementChild); paint($(`[data-card="${id}"]`));
}
function upsert(session) { if (!session) return; State.sessions.set(session.id, session); redrawCard(session.id); drawDays(); }

async function cancelBooking(id, { ask = true } = {}) {
  const s = State.sessions.get(id); if (!s?.mine) return;
  const st = parseLocal(s.start);
  if (ask && !(await Modal.confirm({ title: Lang.t('cancel') + '?', text: `«${trSessionTitle(s.title)}», ${fmtDay(st)} · ${fmtTime(st)}`, ok: 'OK', cancel: Lang.t('cancel'), danger: true }))) return;
  try {
    const r = await Api.request('booking.cancel', { bookingId: s.mine });
    upsert(r.session);
    Toast.info('OK', trSessionTitle(s.title));
    if (Router.parse().name === 'profile') await Views.loadMyBookings();
  } catch (e) { handleError(e, { retry: () => cancelBooking(id, { ask: false }) }); }
}

const Views = {
  async home(id) {
    const userPlan = Auth.user?.membership && Auth.user.membership !== 'none' ? Auth.user.membership : null;

    setView(`
      <section class="hero">
        <div>
          <span class="eyebrow">${esc(Lang.t('hero_eyebrow'))}</span>
          <h1><span>${esc(Lang.t('hero_title_1'))}</span>&nbsp;<span class="grad">${esc(Lang.t('hero_title_2'))}</span></h1>
          <p>${esc(Lang.t('hero_desc'))}</p>
          <div class="hero__cta">
            <a href="#schedule-section" class="btn btn--primary">${esc(Lang.t('hero_cta_1'))}</a>
            <a href="#plans-section" class="btn btn--ghost">${esc(Lang.t('hero_cta_2'))}</a>
          </div>
        </div>
        <div class="hero__badges">
          <div class="hero-stat"><b>5</b><span>${esc(Lang.t('stat_1'))}</span></div>
          <div class="hero-stat"><b>45+</b><span>${esc(Lang.t('stat_2'))}</span></div>
          <div class="hero-stat"><b>${esc(Lang.t('stat_3_val'))}</b><span>${esc(Lang.t('stat_3'))}</span></div>
          <div class="hero-stat"><b>${esc(Lang.t('stat_4_val'))}</b><span>${esc(Lang.t('stat_4'))}</span></div>
        </div>
      </section>

      <section id="sports-section" class="section">
        <div class="section__head">
          <div>
            <h2>${esc(Lang.t('sec_sports'))}</h2>
            <p class="muted">${esc(Lang.t('sec_sports_sub'))}</p>
          </div>
          ${State.cat !== 'all' ? `<button class="btn btn--ghost btn--sm" type="button" data-action="pick-cat" data-cat="all">${esc(Lang.t('reset_filter'))}</button>` : ''}
        </div>
        <div id="sports-grid" class="sports-grid"></div>
      </section>

      <section id="halls-section" class="section">
        <div class="section__head">
          <div>
            <h2>${esc(Lang.t('sec_halls'))}</h2>
            <p class="muted">${esc(Lang.t('sec_halls_sub'))}</p>
          </div>
          <a href="#/equipment" class="btn btn--ghost btn--sm">${esc(Lang.t('equip_sauna_btn'))}</a>
        </div>

        <div class="hall-pref-bar glass">
          <div class="hall-pref-bar__group">
            <div class="hall-select-wrap">
              <span>${esc(Lang.t('morning_lbl'))}</span>
              <select data-action="change-morning-hall" aria-label="Morning hall">
                <option value="north" ${State.morningHall === 'north' ? 'selected' : ''}>${esc(Lang.pick(HALLS.north, 'shortName'))} (${esc(Lang.pick(HALLS.north, 'address'))})</option>
                <option value="center" ${State.morningHall === 'center' ? 'selected' : ''}>${esc(Lang.pick(HALLS.center, 'shortName'))} (${esc(Lang.pick(HALLS.center, 'address'))})</option>
              </select>
            </div>
            <div class="hall-select-wrap">
              <span>${esc(Lang.t('evening_lbl'))}</span>
              <select data-action="change-evening-hall" aria-label="Evening hall">
                <option value="center" ${State.eveningHall === 'center' ? 'selected' : ''}>${esc(Lang.pick(HALLS.center, 'shortName'))} (${esc(Lang.pick(HALLS.center, 'address'))})</option>
                <option value="north" ${State.eveningHall === 'north' ? 'selected' : ''}>${esc(Lang.pick(HALLS.north, 'shortName'))} (${esc(Lang.pick(HALLS.north, 'address'))})</option>
              </select>
            </div>
          </div>
          <button class="btn btn--ghost btn--sm" type="button" data-action="open-map">${ico('map')} <span>${esc(Lang.t('btn_open_map'))}</span></button>
        </div>

        <div class="halls-grid">
          ${Object.values(HALLS).map(h => `
            <article class="hall-card">
              <div class="hall-card__media">
                <img src="${esc(h.img)}" alt="${esc(Lang.pick(h, 'name'))}" loading="lazy">
                <span class="hall-card__time">${esc(h.hours)}</span>
              </div>
              <div class="hall-card__body">
                <h3>${esc(Lang.pick(h, 'name'))}</h3>
                <div class="muted">${ico('pin')} ${esc(Lang.pick(h, 'address'))} · <b>${esc(Lang.pick(h, 'distance'))}</b></div>
                <p class="muted">${esc(Lang.pick(h, 'desc'))}</p>
                <div class="hall-card__actions">
                  <button class="btn btn--ghost btn--sm" type="button" data-action="set-hall-both" data-hall="${esc(h.id)}">${esc(Lang.t('choose_all_hall'))}</button>
                  <button class="btn btn--ghost btn--sm" type="button" data-action="open-map">${esc(Lang.t('on_map'))}</button>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </section>

      <section id="plans-section" class="section">
        <div class="section__head">
          <div>
            <h2>${esc(Lang.t('sec_plans'))}</h2>
            <p class="muted">${esc(Lang.t('sec_plans_sub'))}</p>
          </div>
        </div>
        <div class="plans-grid">
          ${MEMBERSHIP_PLANS.map(p => {
            const isCurrent = userPlan === p.id;
            const perksList = p[`perks_${Lang.current}`] || p.perks;
            return `
              <article class="plan-card ${p.popular ? 'is-popular' : ''}">
                <span class="plan-badge">${esc(Lang.pick(p, 'badge'))}</span>
                <h3>${esc(p.name)}</h3>
                <div class="plan-price">${fmtPrice(p.price)} <small>${esc(Lang.t('per_30_days'))}</small></div>
                <ul class="plan-perks">
                  ${perksList.map(perk => `<li>${ico('check')}<span>${esc(perk)}</span></li>`).join('')}
                </ul>
                <button class="btn ${p.popular ? 'btn--primary' : 'btn--ghost'} btn--block" type="button" data-action="buy-plan" data-plan="${esc(p.id)}">
                  ${esc(isCurrent ? Lang.t('cur_plan_btn') : Lang.t('buy_plan_btn'))}
                </button>
              </article>
            `;
          }).join('')}
        </div>
      </section>

      <section id="schedule-section" class="section">
        <div class="section__head">
          <h2>${esc(Lang.t('sec_schedule'))}</h2>
          <span class="muted">${esc(Lang.t('actual_slots'))}</span>
        </div>
        <div class="controls glass">
          <div id="days" class="days" role="tablist"></div>
          <div id="chips" class="chips"></div>
        </div>
        <div id="cards" class="grid"></div>
      </section>

      <section id="reviews-section" class="section">
        <div class="section__head">
          <div>
            <h2>${esc(Lang.t('sec_reviews'))}</h2>
            <p class="muted">${esc(Lang.t('sec_reviews_sub'))}</p>
          </div>
        </div>
        <div class="reviews-layout">
          <div id="reviews-list" class="reviews-list"><p class="muted">...</p></div>
          <div class="glass review-form-box">
            <h3>${esc(Lang.t('leave_rev'))}</h3>
            <form id="review-form" novalidate>
              <div class="field">
                <label for="rev-rating">${esc(Lang.t('your_rating'))}</label>
                <select id="rev-rating" name="rating" class="input">
                  <option value="5">${esc(Lang.t('rate_5'))}</option>
                  <option value="4">${esc(Lang.t('rate_4'))}</option>
                  <option value="3">${esc(Lang.t('rate_3'))}</option>
                  <option value="2">${esc(Lang.t('rate_2'))}</option>
                  <option value="1">${esc(Lang.t('rate_1'))}</option>
                </select>
              </div>
              <div class="field">
                <label for="rev-comment">${esc(Lang.t('rev_comment'))}</label>
                <textarea id="rev-comment" name="comment" class="input" maxlength="400" placeholder="${esc(Lang.t('rev_placeholder'))}" required></textarea>
              </div>
              <button class="btn btn--primary btn--block" type="submit">${esc(Lang.t('rev_submit'))}</button>
            </form>
          </div>
        </div>
      </section>
    `);

    drawSports();
    drawDays();
    drawChips();
    if (State.reviews.length) drawReviews();

    const revForm = $('#review-form');
    revForm?.addEventListener('submit', async e => {
      e.preventDefault();
      if (!Auth.user) {
        openAuth('login', { reason: 'Войдите, чтобы оставить отзыв о комплексе.' });
        return;
      }
      const rating = revForm.elements.rating.value;
      const comment = revForm.elements.comment.value.trim();
      if (comment.length < 5) {
        Toast.warn('!', 'Минимум 5 символов');
        return;
      }
      const btn = $('[type=submit]', revForm);
      busy(btn, true);
      try {
        const res = await Api.request('reviews.add', { rating, comment });
        State.reviews = res.reviews || [];
        revForm.reset();
        drawReviews();
        Toast.success('OK!');
      } catch (err) {
        handleError(err);
      } finally {
        busy(btn, false);
      }
    });

    const days = dayList();
    const from = dateKey(days[0]);
    const to = dateKey(days[days.length - 1]);

    try {
      const [sessRes, revRes] = await Promise.all([
        Api.request('sessions.list', { from, to }),
        Api.request('reviews.list')
      ]);
      State.sessions.clear();
      sessRes.sessions.forEach(s => State.sessions.set(s.id, s));
      State.reviews = revRes.reviews || [];
      drawDays();
      drawCards();
      drawReviews();
    } catch (e) {
      handleError(e, { retry: () => Views.home(id) });
    }
  },

  async equipment() {
    setView(`
      <section class="section" style="margin-top:0;">
        <div class="section__head">
          <div>
            <h2>${esc(Lang.t('equip_title'))}</h2>
            <p class="muted">${esc(Lang.t('equip_sub'))}</p>
          </div>
          <a href="#/" class="btn btn--primary btn--sm">${esc(Lang.t('to_sched'))}</a>
        </div>
        <div class="equip-grid">
          ${EQUIPMENT_LIST.map(eq => `
            <article class="equip-card">
              <div class="equip-card__media">
                <img src="${esc(eq.img)}" alt="${esc(Lang.pick(eq, 'name'))}" loading="lazy">
                <span class="equip-count">${esc(Lang.pick(eq, 'count'))}</span>
              </div>
              <div class="equip-card__body">
                <span class="equip-zone">${esc(Lang.pick(eq, 'zone'))}</span>
                <h3>${esc(Lang.pick(eq, 'name'))}</h3>
                <p class="muted">${esc(Lang.pick(eq, 'desc'))}</p>
              </div>
            </article>
          `).join('')}
        </div>
      </section>

      <section class="section">
        <div class="section__head">
          <div>
            <h2>${esc(Lang.t('infra_title'))}</h2>
            <p class="muted">${esc(Lang.t('infra_sub'))}</p>
          </div>
        </div>
        <div class="halls-grid">
          ${INFRASTRUCTURE.map(inf => `
            <article class="hall-card">
              <div class="hall-card__media">
                <img src="${esc(inf.img)}" alt="${esc(Lang.pick(inf, 'title'))}" loading="lazy">
                <span class="hall-card__time">${esc(Lang.pick(inf, 'badge'))}</span>
              </div>
              <div class="hall-card__body">
                <h3>${esc(Lang.pick(inf, 'title'))}</h3>
                <p class="muted">${esc(Lang.pick(inf, 'desc'))}</p>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `);
  },

  async about() {
    setView(`
      <section class="section" style="margin-top:0;">
        <div class="section__head">
          <div>
            <h2>${esc(Lang.t('about_title'))}</h2>
            <p class="muted">${esc(Lang.t('about_sub'))}</p>
          </div>
        </div>

        <div class="about-grid">
          <div class="glass about-box">
            <h3>PULSE Sports Complex</h3>
            <p class="muted">
              ${Lang.current === 'kz'
                ? 'PULSE — уақытын бағалайтын және бір мекенжайға байланғысы келмейтіндерге арналған спорт желісі. Бірыңғай абонемент таңғы және кешкі залдарға, сондай-ақ фин саунасына жол ашады.'
                : Lang.current === 'en'
                  ? 'PULSE is built for members who value flexibility. One pass unlocks both our panoramic morning hall and our full-scale evening club with Finnish sauna.'
                  : 'PULSE создан для тех, кто ценит своё время и не хочет подстраиваться под один адрес. Единый абонемент даёт доступ сразу к двум локациям: утреннему залу с панорамным светом и вечернему клубу с расширенной силовой зоной и сауной.'}
            </p>
            <ul class="about-list">
              <li><b>2 400 м²</b> · PULSE North + PULSE Center</li>
              <li><b>06:00 – 00:00</b> · Morning & Evening schedule</li>
              <li><b>Technogym & Concept2</b> · 45+ machines</li>
              <li><b>Finnish Sauna 90°C</b> · Included in passes</li>
            </ul>
          </div>

          <div class="glass about-box">
            <h3>${esc(Lang.t('footer_reg'))}</h3>
            <div style="display:grid; gap:10px; margin-top:12px;">
              <div><b>Reception:</b> <a href="tel:+77212554433" style="color:var(--primary)">+7 (7212) 55-44-33</a></div>
              <div><b>WhatsApp:</b> <a href="tel:+77005553535" style="color:var(--primary)">+7 700 555-35-35</a></div>
              <div><b>Instagram:</b> <span style="color:var(--primary); font-weight:700;">@pulse.sport.krg</span></div>
              <div><b>E-mail:</b> <a href="mailto:info@pulse-krg.kz" style="color:var(--primary)">info@pulse-krg.kz</a></div>
              <div><b>${esc(Lang.t('footer_bug'))}</b> <button class="link-btn" type="button" data-action="copy-bug-email">bugs@pulse-krg.kz</button></div>
            </div>
            <button class="btn btn--primary btn--block mt" type="button" data-action="open-map">
              ${ico('map')} ${esc(Lang.t('btn_open_map'))}
            </button>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section__head">
          <div>
            <h2>${esc(Lang.t('nearby_title'))}</h2>
            <p class="muted">${esc(Lang.t('nearby_sub'))}</p>
          </div>
        </div>
        <div class="halls-grid">
          ${Object.values(HALLS).map(h => `
            <div class="nearby-card">
              <span class="dist-badge">${esc(Lang.pick(h, 'distance'))}</span>
              <h3>${esc(Lang.pick(h, 'name'))}</h3>
              <p class="muted">${ico('pin')} ${esc(Lang.pick(h, 'address'))}</p>
              <p class="muted">${esc(Lang.t('work_hours'))} <b>${esc(h.hours)}</b></p>
              <div style="display:flex; gap:8px; margin-top:8px;">
                <button class="btn btn--ghost btn--sm" type="button" data-action="open-map">${ico('map')} ${esc(Lang.t('route_map'))}</button>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `);
  },

  async profile() {
    if (!Auth.user) { go('/'); return; }
    const hasPass = Auth.user.membership && Auth.user.membership !== 'none';

    setView(`
      <section class="section">
        <h2>${esc(Lang.t('nav_profile'))}</h2>
        <div class="profile-grid">
          <div class="glass p-card">
            <h3>PULSE Pass</h3>
            <div class="note" style="margin-bottom:14px;">
              ${hasPass
                ? `Active: <b>PULSE ${esc(Auth.user.membership.toUpperCase())}</b> (${esc(Auth.user.membership_until || '—')})`
                : `No active pass · <a href="#/" style="text-decoration:underline;">${esc(Lang.t('hero_cta_2'))}</a>`}
            </div>
            <form id="profile-form" novalidate>
              ${Form.html([
                { name: 'name', label: 'Имя и фамилия', required: true, validate: V.name, maxlength: 40 },
                { name: 'email', label: 'E-mail', type: 'email', required: true, validate: V.email, maxlength: 120 },
                { name: 'phone', label: 'Телефон', type: 'tel', validate: V.phone, placeholder: '+7 700 123 45 67', maxlength: 20 },
              ], Auth.user)}
              <button class="btn btn--primary" type="submit">OK</button>
            </form>
          </div>
          <div class="glass p-card">
            <h3>${esc(Lang.t('nav_home'))}</h3>
            <div id="my-bookings" class="my-bookings"><p class="muted">...</p></div>
          </div>
        </div>
      </section>
    `);

    const form = $('#profile-form');
    if (form.elements.email) form.elements.email.disabled = true;

    Form.wire(form, [
      { name: 'name', label: 'Имя и фамилия', required: true, validate: V.name, maxlength: 40 },
      { name: 'phone', label: 'Телефон', type: 'tel', validate: V.phone, maxlength: 20 },
    ], async values => {
      const res = await Api.request('profile.update', values);
      Auth.user = res.user;
      renderChrome('profile');
      Toast.success('OK');
    });

    await Views.loadMyBookings();
  },

  async loadMyBookings() {
    const box = $('#my-bookings');
    if (!box) return;
    try {
      const { items } = await Api.request('bookings.mine');
      if (!items.length) {
        box.innerHTML = `<div class="empty-state"><p class="muted">0</p><a href="#/" class="btn btn--ghost btn--sm">${esc(Lang.t('hero_cta_1'))}</a></div>`;
        return;
      }
      items.forEach(({ session: s }) => State.sessions.set(s.id, s));
      box.innerHTML = items.map(({ session: s }) => {
        const st = parseLocal(s.start);
        return `<div class="b-item">
          <div>
            <b>${esc(trSessionTitle(s.title))}</b>
            <div class="muted">${fmtDay(st)}, ${fmtTime(st)} · ${esc(s.trainer)} (${esc(s.room)})</div>
          </div>
          <button class="btn btn--ghost btn--sm" type="button" data-action="cancel-booking" data-id="${s.id}">${esc(Lang.t('cancel'))}</button>
        </div>`;
      }).join('');
    } catch (e) {
      handleError(e, { retry: () => Views.loadMyBookings() });
    }
  },

  async admin() {
    if (!Auth.isAdmin()) { go('/'); return; }
    setView(`
      <section class="section">
        <div class="admin-header">
          <h2>${esc(Lang.t('nav_admin'))}</h2>
          <div class="admin-tabs" role="tablist">
            <button class="chip is-active" type="button" data-admin-tab="stats">KPI</button>
            <button class="chip" type="button" data-admin-tab="users">Users & Freeze</button>
            <button class="chip" type="button" data-admin-tab="sessions">Schedule</button>
          </div>
        </div>
        <div id="admin-content" class="admin-content"></div>
      </section>
    `);

    const tabs = $$('[data-admin-tab]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        Views.renderAdminTab(tab.dataset.adminTab);
      });
    });

    await Views.renderAdminTab('stats');
  },

  async renderAdminTab(tab) {
    const box = $('#admin-content');
    if (!box) return;
    box.innerHTML = '<p class="muted">...</p>';

    try {
      if (tab === 'stats') {
        const stats = await Api.request('admin.stats');
        box.innerHTML = `
          <div class="kpi-grid">
            <div class="glass kpi-card"><span>Clients</span><b data-count="${stats.kpi.users}">0</b></div>
            <div class="glass kpi-card"><span>Bookings</span><b data-count="${stats.kpi.upcoming}">0</b></div>
            <div class="glass kpi-card"><span>Load</span><b data-count="${stats.kpi.load}" data-suffix="%">0%</b></div>
            <div class="glass kpi-card"><span>Cancel rate</span><b data-count="${stats.kpi.cancelRate}" data-suffix="%">0%</b></div>
          </div>
        `;
        paint(box);
      } else if (tab === 'users') {
        const { users } = await Api.request('admin.users.list');
        box.innerHTML = `
          <div class="glass table-wrap">
            <table class="table">
              <thead>
                <tr><th>Name</th><th>Login</th><th>E-mail</th><th>Pass</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                ${users.map(u => `
                  <tr>
                    <td><b>${esc(u.name)}</b></td>
                    <td>${esc(u.username || '—')}</td>
                    <td>${esc(u.email)}</td>
                    <td>${esc((u.membership || 'none').toUpperCase())}</td>
                    <td>${u.status === 'frozen' ? `<span style="color:var(--warn);font-weight:700;">Frozen → ${esc(u.frozen_until)}</span>` : '<span style="color:var(--ok);font-weight:700;">Active</span>'}</td>
                    <td>
                      ${u.role === 'admin'
                        ? '<span class="badge badge--admin">Admin</span>'
                        : u.status === 'frozen'
                          ? `<button class="btn btn--ghost btn--sm" type="button" data-action="admin-unfreeze" data-uid="${esc(u.id)}">Unfreeze</button>`
                          : `<button class="btn btn--danger btn--sm" type="button" data-action="admin-freeze" data-uid="${esc(u.id)}">Freeze (7d)</button>`}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      } else if (tab === 'sessions') {
        const days = dayList();
        const { sessions } = await Api.request('sessions.list', { from: dateKey(days[0]), to: dateKey(days[days.length - 1]) });
        box.innerHTML = `
          <div class="glass table-wrap">
            <table class="table">
              <thead>
                <tr><th>Time</th><th>Title</th><th>Category</th><th>Trainer</th><th>Spots</th></tr>
              </thead>
              <tbody>
                ${sessions.map(s => `
                  <tr>
                    <td>${s.start.replace('T', ' ')}</td>
                    <td><b>${esc(trSessionTitle(s.title))}</b></td>
                    <td>${esc(Lang.pick(CATS[s.cat], 'label') || s.cat)}</td>
                    <td>${esc(s.trainer)}</td>
                    <td>${s.booked} / ${s.cap}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      }
    } catch (e) {
      handleError(e, { retry: () => Views.renderAdminTab(tab) });
    }
  }
};

/* ==================== 7. ACTIONS / ROUTER / BOOTSTRAP ==================== */
const Router = {
  parse() {
    const hash = location.hash.slice(1) || '/';
    const [name, query] = hash.split('?');
    return { name: name.replace(/^\//, ''), query: new URLSearchParams(query) };
  },
  async render() {
    const route = Router.parse();
    State.lastRoute = route.name;
    renderChrome(route.name);

    if (route.name === 'equipment') {
      await Views.equipment();
    } else if (route.name === 'about') {
      await Views.about();
    } else if (route.name === 'profile') {
      await Views.profile();
    } else if (route.name === 'admin') {
      await Views.admin();
    } else {
      await Views.home();
    }
  }
};

document.addEventListener('change', e => {
  const sel = e.target.closest('[data-action]');
  if (!sel) return;
  if (sel.dataset.action === 'change-morning-hall') {
    State.morningHall = sel.value;
    drawCards();
    Toast.info('OK', Lang.pick(HALLS[sel.value], 'shortName'));
  }
  if (sel.dataset.action === 'change-evening-hall') {
    State.eveningHall = sel.value;
    drawCards();
    Toast.info('OK', Lang.pick(HALLS[sel.value], 'shortName'));
  }
});

document.addEventListener('click', async e => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const act = btn.dataset.action;

  if (act === 'toggle-theme') Theme.toggle();
  if (act === 'set-lang') Lang.set(btn.dataset.lang);
  if (act === 'open-auth') openAuth(btn.dataset.mode || 'login');
  if (act === 'close-modal') Modal.close();
  if (act === 'open-map') showMapModal();
  if (act === 'buy-plan') openPlanPayment(btn.dataset.plan);
  if (act === 'copy-bug-email') {
    try { await navigator.clipboard.writeText('bugs@pulse-krg.kz'); } catch {}
    Toast.info('bugs@pulse-krg.kz');
  }
  if (act === 'set-hall-both') {
    const h = btn.dataset.hall;
    State.morningHall = h;
    State.eveningHall = h;
    const mSel = $('[data-action="change-morning-hall"]');
    const eSel = $('[data-action="change-evening-hall"]');
    if (mSel) mSel.value = h;
    if (eSel) eSel.value = h;
    drawCards();
    Toast.success('OK', Lang.pick(HALLS[h], 'name'));
  }
  if (act === 'auth-tab') openAuth(btn.dataset.mode);
  if (act === 'demo-login') {
    const creds = DEMO[btn.dataset.role];
    if (creds) {
      const form = $('form', Modal.el);
      if (form) {
        form.elements.login.value = creds.email;
        form.elements.password.value = creds.password;
        form.requestSubmit();
      }
    }
  }
  if (act === 'toggle-pw') {
    const input = $('input', btn.closest('.pw'));
    if (input) {
      const isText = input.type === 'text';
      input.type = isText ? 'password' : 'text';
      btn.setAttribute('aria-pressed', !isText);
    }
  }
  if (act === 'logout') {
    Auth.clear();
    renderChrome();
    go('/');
  }
  if (act === 'pick-day') {
    State.day = btn.dataset.day;
    drawDays();
    drawCards();
  }
  if (act === 'pick-cat') {
    State.cat = btn.dataset.cat;
    drawSports();
    drawChips();
    drawCards();
  }
  if (act === 'select-sport') {
    const chosen = btn.dataset.cat;
    State.cat = State.cat === chosen ? 'all' : chosen;
    drawSports();
    drawChips();
    drawCards();
    $('#schedule-section')?.scrollIntoView({ behavior: 'smooth' });
  }
  if (act === 'book') openBookingWizard(btn.dataset.id);
  if (act === 'cancel-booking') await cancelBooking(btn.dataset.id);

  if (act === 'admin-freeze') {
    busy(btn, true);
    try {
      const r = await Api.request('admin.users.freeze', { userId: btn.dataset.uid, days: 7 });
      Toast.warn('Frozen', `${r.frozen_until}`);
      await Views.renderAdminTab('users');
    } catch (err) { handleError(err); }
  }
  if (act === 'admin-unfreeze') {
    busy(btn, true);
    try {
      await Api.request('admin.users.unfreeze', { userId: btn.dataset.uid });
      Toast.success('Unfrozen');
      await Views.renderAdminTab('users');
    } catch (err) { handleError(err); }
  }
});

window.addEventListener('hashchange', () => Router.render());

(async () => {
  try {
    Api.onAuthLost = () => {
      Auth.clear();
      renderChrome();
      openAuth('login');
    };
    await Auth.restore();
    await Router.render();
  } catch (e) {
    console.error('Ошибка инициализации приложения:', e);
  }
})();

})();