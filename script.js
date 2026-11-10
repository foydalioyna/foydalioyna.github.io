/* =====================================================
   Foydali Oyna — script.js
   O'zbekiston uchun foydali portal (uz / en)
   Manbalar: Open-Meteo, O'zbekiston Markaziy banki,
   Aladhan API, Leaflet + OpenStreetMap
   ===================================================== */

   'use strict';

   /* ---------- 1. Tillar (i18n) ---------- */
   const I18N = {
       uz: {
           'nav.dashboard': 'Asosiy',
           'nav.map': 'Xarita',
           'nav.services': 'Xizmatlar',
           'nav.info': "Ma'lumotlar",
           'nav.tools': 'Kalkulyator',
           'nav.help': 'Favqulodda',
           'nav.newcomers': 'Yangi kelganlar',
           'nav.aria': 'Asosiy menyu',
           'lang.aria': 'Tilni almashtirish',
           'theme.aria': 'Rejimni almashtirish',
           'menu.aria': 'Menyu',
           'top.aria': 'Yuqoriga',
           'city.aria': 'Shahar',
           'swap.title': 'Almashtirish',
           'hero.title': "O'zbekiston uchun foydali ma'lumotlar",
           'hero.subtitle': "Ob-havo, valyuta kursi, namoz vaqtlari va davlat xizmatlari — hammasi bitta joyda va bepul.",
           'search.placeholder': 'Internetdan qidirish...',
           'search.btn': 'Qidirish',
           'hero.nowIn': "Hozir O'zbekistonda",
           'hero.zone': 'Toshkent vaqti (UTC+5)',
           'dash.title': "Bugungi ma'lumotlar",
           'dash.subtitle': "Real vaqtda yangilanadigan foydali ko'rsatkichlar",
           'weather.title': 'Ob-havo',
           'currency.title': 'Valyuta kursi',
           'prayer.title': 'Namoz vaqtlari',
           'map.title': "O'zbekiston xaritasi",
           'map.subtitle': "Shaharni bosing — ob-havo va namoz vaqtlari shu shaharga o'tadi",
           'map.loading': 'Xarita yuklanmoqda...',
           'services.title': 'Foydali xizmatlar',
           'services.subtitle': "Ko'p ishlatiladigan rasmiy va kundalik havolalar",
           'info.title': "Foydali ma'lumotlar",
           'info.subtitle': "O'zbekiston haqida qisqacha va bayramlar",
           'info.about': "O'zbekiston haqida",
           'info.holidays': 'Bayramlar',
           'banner.title': "Yangi kelganlar uchun qo'llanma",
           'banner.text': "Viza, SIM karta, to'lovlar, transport va boshqa zarur ma'lumotlar",
           'banner.btn': 'Ochish →',
           'tools.title': 'Valyuta kalkulyatori',
           'tools.subtitle': 'Kurslar asosida tez hisob-kitob qiling',
           'conv.amount': 'Miqdor',
           'conv.from': 'Valyutadan',
           'conv.to': 'Valyutaga',
           'em.title': 'Favqulodda raqamlar',
           'em.subtitle': "Muammo bo'lsa darhol qo'ng'iroq qiling — bepul",
           'footer.tagline': "O'zbekiston uchun foydali sayt",
           'footer.note': "Ma'lumotlar ochiq manbalardan olinadi. Rasmiy xizmatlar uchun tegishli davlat saytlariga murojaat qiling.",
           'meta.title': "Foydali Oyna — O'zbekiston uchun portal",
           'meta.desc': "O'zbekiston uchun foydali portal: ob-havo, valyuta kursi, namoz vaqtlari, xarita, foydali ma'lumotlar va yangi kelganlar uchun qo'llanma.",
           'greet.morning': 'Xayrli tong!',
           'greet.day': 'Xayrli kun!',
           'greet.evening': 'Xayrli kech!',
           'greet.night': 'Xayrli tun!',
           'state.error': "Ma'lumotni yuklab bo'lmadi.",
           'state.retry': 'Qayta urinish',
           'weather.feels': 'His qilinadi',
           'weather.humidity': 'Namlik',
           'weather.wind': 'Shamol',
           'weather.error': "Ob-havoni yuklab bo'lmadi.",
           'currency.error': "Valyuta kursini yuklab bo'lmadi.",
           'currency.unit': "so'm",
           'prayer.error': "Namoz vaqtlarini yuklab bo'lmadi.",
           'prayer.next': 'Keyingi namoz',
           'prayer.hour': 'soat',
           'prayer.min': 'daqiqa',
           'conv.rate': '1 {from} = {rate} {to}',
           'conv.error': 'Kurslar yuklanmagan',
           'fajr': 'Bomdod', 'sunrise': 'Quyosh', 'dhuhr': 'Peshin',
           'asr': 'Asr', 'maghrib': 'Shom', 'isha': 'Xufton',
           'up': "ko'tarildi", 'down': 'tushdi'
       },
       en: {
           'nav.dashboard': 'Home',
           'nav.map': 'Map',
           'nav.services': 'Services',
           'nav.info': 'Info',
           'nav.tools': 'Converter',
           'nav.help': 'Emergency',
           'nav.newcomers': 'Newcomers',
           'nav.aria': 'Main menu',
           'lang.aria': 'Switch language',
           'theme.aria': 'Toggle theme',
           'menu.aria': 'Menu',
           'top.aria': 'To top',
           'city.aria': 'City',
           'swap.title': 'Swap',
           'hero.title': 'Useful information for Uzbekistan',
           'hero.subtitle': 'Weather, exchange rates, prayer times and public services — all in one free place.',
           'search.placeholder': 'Search the web...',
           'search.btn': 'Search',
           'hero.nowIn': 'Right now in Uzbekistan',
           'hero.zone': 'Tashkent time (UTC+5)',
           'dash.title': 'Today at a glance',
           'dash.subtitle': 'Useful figures that update in real time',
           'weather.title': 'Weather',
           'currency.title': 'Exchange rates',
           'prayer.title': 'Prayer times',
           'map.title': 'Map of Uzbekistan',
           'map.subtitle': 'Click a city — weather and prayer times switch to it',
           'map.loading': 'Loading map...',
           'services.title': 'Useful services',
           'services.subtitle': 'Frequently used official and everyday links',
           'info.title': 'Useful information',
           'info.subtitle': 'Quick facts about Uzbekistan and holidays',
           'info.about': 'About Uzbekistan',
           'info.holidays': 'Holidays',
           'banner.title': 'Newcomers guide',
           'banner.text': 'Visa, SIM card, payments, transport and other essentials',
           'banner.btn': 'Open →',
           'tools.title': 'Currency converter',
           'tools.subtitle': 'Quick conversions based on the latest rates',
           'conv.amount': 'Amount',
           'conv.from': 'From',
           'conv.to': 'To',
           'em.title': 'Emergency numbers',
           'em.subtitle': 'Call immediately in case of emergency — free',
           'footer.tagline': 'A useful site for Uzbekistan',
           'footer.note': 'Data is fetched from open sources. For official services please visit the relevant government websites.',
           'meta.title': 'Foydali Oyna — A portal for Uzbekistan',
           'meta.desc': 'A useful portal for Uzbekistan: weather, exchange rates, prayer times, a map, useful information and a guide for newcomers.',
           'greet.morning': 'Good morning!',
           'greet.day': 'Good afternoon!',
           'greet.evening': 'Good evening!',
           'greet.night': 'Good night!',
           'state.error': 'Could not load the data.',
           'state.retry': 'Retry',
           'weather.feels': 'Feels like',
           'weather.humidity': 'Humidity',
           'weather.wind': 'Wind',
           'weather.error': 'Could not load the weather.',
           'currency.error': 'Could not load exchange rates.',
           'currency.unit': 'UZS',
           'prayer.error': 'Could not load prayer times.',
           'prayer.next': 'Next prayer',
           'prayer.hour': 'h',
           'prayer.min': 'min',
           'conv.rate': '1 {from} = {rate} {to}',
           'conv.error': 'Rates not loaded',
           'fajr': 'Fajr', 'sunrise': 'Sunrise', 'dhuhr': 'Dhuhr',
           'asr': 'Asr', 'maghrib': 'Maghrib', 'isha': 'Isha',
           'up': 'up', 'down': 'down'
       }
   };
   
   const state = {
       lang: localStorage.getItem('fo-lang') || 'uz',
       city: localStorage.getItem('fo-city') || 'tashkent',
       prayerCity: localStorage.getItem('fo-prayer-city') || 'tashkent',
       weather: null,
       currency: null,
       prayer: null,
       map: null,
       markers: {}
   };
   
   const t = (key) => (I18N[state.lang][key] ?? I18N.uz[key] ?? key);
   
   /* ---------- 1b. Sana va hafta kunlari ---------- */
   const MONTHS = {
       uz: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'],
       en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
   };
   const WEEKDAYS = {
       uz: ['yakshanba', 'dushanba', 'seshanba', 'chorshanba', 'payshanba', 'juma', 'shanba'],
       en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
   };
   const WEEKDAYS_SHORT = {
       uz: ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan'],
       en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
   };
   
   function fmtDate(d) {
       const wd = WEEKDAYS[state.lang][d.getDay()];
       const mon = MONTHS[state.lang][d.getMonth()];
       return `${wd}, ${d.getDate()} ${mon} ${d.getFullYear()}`;
   }
   function fmtWeekdayShort(d) {
       return WEEKDAYS_SHORT[state.lang][d.getDay()];
   }
   
   /* ---------- 2. Shaharlar ---------- */
   const CITIES = {
       tashkent:  { uz: 'Toshkent',  en: 'Tashkent',  lat: 41.2995, lon: 69.2401 },
       samarkand: { uz: 'Samarqand', en: 'Samarkand', lat: 39.6542, lon: 66.9597 },
       bukhara:   { uz: 'Buxoro',    en: 'Bukhara',   lat: 39.7747, lon: 64.4286 },
       andijan:   { uz: 'Andijon',   en: 'Andijan',   lat: 40.7829, lon: 72.3442 },
       namangan:  { uz: 'Namangan',  en: 'Namangan',  lat: 40.9983, lon: 71.6726 },
       fergana:   { uz: "Farg'ona",  en: 'Fergana',   lat: 40.3864, lon: 71.7864 },
       nukus:     { uz: 'Nukus',     en: 'Nukus',     lat: 42.4531, lon: 59.6103 },
       qarshi:    { uz: 'Qarshi',    en: 'Qarshi',    lat: 38.8606, lon: 65.7891 },
       termez:    { uz: 'Termiz',    en: 'Termez',    lat: 37.2242, lon: 67.2783 },
       urgench:   { uz: 'Urganch',   en: 'Urgench',   lat: 41.5500, lon: 60.6333 },
       navoiy:    { uz: 'Navoiy',    en: 'Navoiy',    lat: 40.0844, lon: 65.3792 },
       jizzakh:   { uz: 'Jizzax',    en: 'Jizzakh',   lat: 40.1158, lon: 67.8422 },
       gulistan:  { uz: 'Guliston',  en: 'Gulistan',  lat: 40.4897, lon: 68.7842 }
   };
   
   /* ---------- 3. Ob-havo kodlari ---------- */
   function weatherInfo(code, isDay = 1) {
       const map = {
           0:  { uz: 'Ochiq osmon',        en: 'Clear sky',        i: isDay ? '☀️' : '🌙' },
           1:  { uz: 'Asosan ochiq',       en: 'Mainly clear',     i: isDay ? '🌤️' : '🌙' },
           2:  { uz: 'Qisman bulutli',     en: 'Partly cloudy',    i: '⛅' },
           3:  { uz: 'Bulutli',            en: 'Overcast',         i: '☁️' },
           45: { uz: 'Tuman',              en: 'Fog',              i: '🌫️' },
           48: { uz: 'Muzli tuman',        en: 'Depositing rime',  i: '🌫️' },
           51: { uz: "Yengil yomg'ir",     en: 'Light drizzle',    i: '🌦️' },
           53: { uz: "Yomg'ir",            en: 'Drizzle',          i: '🌦️' },
           55: { uz: "Kuchli yomg'ir",     en: 'Dense drizzle',    i: '🌧️' },
           61: { uz: "Kuchsiz yomg'ir",    en: 'Slight rain',      i: '🌦️' },
           63: { uz: "Yomg'ir",            en: 'Rain',             i: '🌧️' },
           65: { uz: "Kuchli yomg'ir",     en: 'Heavy rain',       i: '🌧️' },
           66: { uz: "Muzli yomg'ir",      en: 'Freezing rain',    i: '🌧️' },
           67: { uz: "Kuchli muzli yomg'ir", en: 'Freezing rain',  i: '🌧️' },
           71: { uz: 'Kuchsiz qor',        en: 'Slight snow',      i: '🌨️' },
           73: { uz: 'Qor',                en: 'Snow',             i: '❄️' },
           75: { uz: 'Kuchli qor',         en: 'Heavy snow',       i: '❄️' },
           77: { uz: 'Qor donalari',       en: 'Snow grains',      i: '🌨️' },
           80: { uz: "Yomg'ir yog'ishi",   en: 'Rain showers',     i: '🌦️' },
           81: { uz: "Kuchli yomg'ir",     en: 'Rain showers',     i: '🌧️' },
           82: { uz: "Juda kuchli yomg'ir", en: 'Violent showers', i: '⛈️' },
           85: { uz: "Qor yog'ishi",       en: 'Snow showers',     i: '🌨️' },
           86: { uz: 'Kuchli qor',         en: 'Snow showers',     i: '❄️' },
           95: { uz: 'Momaqaldiroq',       en: 'Thunderstorm',     i: '⛈️' },
           96: { uz: "Do'l bilan momaqaldiroq", en: 'Thunderstorm', i: '⛈️' },
           99: { uz: "Kuchli do'l",        en: 'Thunderstorm',     i: '⛈️' }
       };
       return map[code] || { uz: '—', en: '—', i: '🌡️' };
   }
   
   /* ---------- 4. Valyuta ---------- */
   const CURRENCIES = {
       USD: { flag: '🇺🇸', uz: 'AQSh dollari', en: 'US Dollar' },
       EUR: { flag: '🇪🇺', uz: 'Yevro', en: 'Euro' },
       RUB: { flag: '🇷🇺', uz: 'Rossiya rubli', en: 'Russian Ruble' },
       GBP: { flag: '🇬🇧', uz: 'Angliya funti', en: 'British Pound' },
       JPY: { flag: '🇯🇵', uz: 'Yaponiya iyenasi', en: 'Japanese Yen' },
       CNY: { flag: '🇨🇳', uz: 'Xitoy yuani', en: 'Chinese Yuan' },
       KZT: { flag: '🇰🇿', uz: "Qozog'iston tengesi", en: 'Kazakh Tenge' },
       TRY: { flag: '🇹🇷', uz: 'Turk lirasi', en: 'Turkish Lira' },
       AED: { flag: '🇦🇪', uz: 'BAA dirhami', en: 'UAE Dirham' },
       KRW: { flag: '🇰🇷', uz: 'Koreya voni', en: 'South Korean Won' },
       UZS: { flag: '🇺🇿', uz: "O'zbek so'mi", en: 'Uzbek Som' }
   };
   const PRIORITY = ['USD', 'EUR', 'RUB', 'GBP', 'CNY', 'JPY', 'KZT', 'TRY', 'AED', 'KRW'];
   
   /* ---------- 5. Foydali xizmatlar ---------- */
   const SERVICES = [
       { ico: '🏛️', name: { uz: 'Davlat xizmatlari', en: 'Public services' }, cat: { uz: 'my.gov.uz', en: 'my.gov.uz' }, url: 'https://my.gov.uz' },
       { ico: '🧾', name: { uz: 'Soliq xizmati', en: 'Tax service' }, cat: { uz: 'soliq.uz', en: 'soliq.uz' }, url: 'https://soliq.uz' },
       { ico: '🏦', name: { uz: 'Markaziy bank', en: 'Central Bank' }, cat: { uz: 'cbu.uz', en: 'cbu.uz' }, url: 'https://cbu.uz' },
       { ico: '📮', name: { uz: "Pochta (O'zbekiston)", en: 'Post (Uzbekistan)' }, cat: { uz: 'pochta.uz', en: 'pochta.uz' }, url: 'https://pochta.uz' },
       { ico: '💳', name: { uz: 'Payme', en: 'Payme' }, cat: { uz: "To'lovlar", en: 'Payments' }, url: 'https://payme.uz' },
       { ico: '💳', name: { uz: 'Click', en: 'Click' }, cat: { uz: "To'lovlar", en: 'Payments' }, url: 'https://click.uz' },
       { ico: '🛒', name: { uz: 'Uzum Market', en: 'Uzum Market' }, cat: { uz: 'Online bozor', en: 'Online market' }, url: 'https://uzum.uz' },
       { ico: '🎫', name: { uz: 'Aviachiptalar', en: 'Air tickets' }, cat: { uz: 'Sayohat', en: 'Travel' }, url: 'https://uzairways.com' },
       { ico: '🚆', name: { uz: "Temiryo'l chiptalari", en: 'Railway tickets' }, cat: { uz: 'railway.uz', en: 'railway.uz' }, url: 'https://railway.uz' },
       { ico: '🏥', name: { uz: "Sog'liqni saqlash", en: 'Healthcare' }, cat: { uz: 'ssv.uz', en: 'ssv.uz' }, url: 'https://ssv.uz' },
       { ico: '🎓', name: { uz: "Ta'lim vazirligi", en: 'Ministry of Education' }, cat: { uz: 'gov.uz', en: 'gov.uz' }, url: 'https://gov.uz' },
       { ico: '📰', name: { uz: 'Yangiliklar', en: 'News' }, cat: { uz: 'kun.uz', en: 'kun.uz' }, url: 'https://kun.uz' },
       { ico: '🌦️', name: { uz: 'Ob-havo (rasmiy)', en: 'Weather (official)' }, cat: { uz: 'meteo.uz', en: 'meteo.uz' }, url: 'https://meteo.uz' },
       { ico: '🗺️', name: { uz: 'Xarita', en: 'Maps' }, cat: { uz: 'Yandex Maps', en: 'Yandex Maps' }, url: 'https://yandex.uz/maps' },
       { ico: '📚', name: { uz: 'Vikipediya', en: 'Wikipedia' }, cat: { uz: 'Bilim', en: 'Knowledge' }, url: 'https://uz.wikipedia.org' },
       { ico: '🌐', name: { uz: 'Google', en: 'Google' }, cat: { uz: 'Qidiruv', en: 'Search' }, url: 'https://google.com' }
   ];
   
   /* ---------- 6. Favqulodda raqamlar ---------- */
   const EMERGENCY = [
       { ico: '🚒', num: '101', name: { uz: "Yong'in xavfsizligi", en: 'Fire service' } },
       { ico: '🚓', num: '102', name: { uz: 'Politsiya', en: 'Police' } },
       { ico: '🚑', num: '103', name: { uz: 'Tez tibbiy yordam', en: 'Ambulance' } },
       { ico: '🔥', num: '104', name: { uz: 'Gaz xizmati', en: 'Gas service' } },
       { ico: '🆘', num: '112', name: { uz: 'Yagona qutqaruv xizmati', en: 'Unified emergency' } },
       { ico: '🧒', num: '1115', name: { uz: 'Bolalar ishonch raqami', en: "Children's helpline" } }
   ];
   
   /* ---------- 6b. O'zbekiston haqida faktlar ---------- */
   const FACTS = [
       { ico: '🏛️', label: { uz: 'Poytaxt', en: 'Capital' }, value: { uz: 'Toshkent', en: 'Tashkent' } },
       { ico: '👥', label: { uz: 'Aholi', en: 'Population' }, value: { uz: '~37 million', en: '~37 million' } },
       { ico: '📐', label: { uz: 'Maydon', en: 'Area' }, value: { uz: '448 978 km²', en: '448,978 km²' } },
       { ico: '💰', label: { uz: 'Pul birligi', en: 'Currency' }, value: { uz: "so'm (UZS)", en: 'Uzbek som (UZS)' } },
       { ico: '🗣️', label: { uz: 'Rasmiy til', en: 'Official language' }, value: { uz: "o'zbek tili", en: 'Uzbek' } },
       { ico: '🕐', label: { uz: 'Vaqt mintaqasi', en: 'Time zone' }, value: { uz: 'UTC+5', en: 'UTC+5' } },
       { ico: '📞', label: { uz: 'Xalqaro kod', en: 'Dialing code' }, value: { uz: '+998', en: '+998' } },
       { ico: '🏙️', label: { uz: "Ma'muriy tuzilma", en: 'Administrative' }, value: { uz: "12 viloyat, Qoraqalpog'iston va Toshkent", en: '12 regions, Karakalpakstan and Tashkent' } }
   ];
   
   /* ---------- 6c. Bayramlar ---------- */
   const HOLIDAYS = [
       { d: { uz: '1-yanvar', en: 'January 1' }, n: { uz: 'Yangi yil', en: 'New Year' } },
       { d: { uz: '8-mart', en: 'March 8' }, n: { uz: 'Xotin-qizlar kuni', en: "Women's Day" } },
       { d: { uz: '21-mart', en: 'March 21' }, n: { uz: "Navro'z bayrami", en: 'Navruz' } },
       { d: { uz: '9-may', en: 'May 9' }, n: { uz: 'Xotira va qadrlash kuni', en: 'Day of Memory and Honor' } },
       { d: { uz: '1-sentabr', en: 'September 1' }, n: { uz: 'Mustaqillik kuni', en: 'Independence Day' } },
       { d: { uz: '1-oktabr', en: 'October 1' }, n: { uz: "O'qituvchi va murabbiylar kuni", en: "Teachers' and Mentors' Day" } },
       { d: { uz: '8-dekabr', en: 'December 8' }, n: { uz: 'Konstitutsiya kuni', en: 'Constitution Day' } },
       { d: { uz: "har yili o'zgaradi", en: 'varies yearly' }, n: { uz: "Ro'za hayit, Qurbon hayit", en: 'Eid al-Fitr, Eid al-Adha' } }
   ];
   
   /* ---------- 7. Yordamchilar ---------- */
   const $ = (sel) => document.querySelector(sel);
   
   function escapeHtml(str) {
       return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
   }
   
   function fmtNum(n, digits = 0) {
       if (!isFinite(n)) return '—';
       const neg = n < 0;
       const fixed = Math.abs(n).toFixed(digits);
       const parts = fixed.split('.');
       let int = parts[0];
       const dec = parts[1];
       if (state.lang === 'uz') {
           int = int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
           return (neg ? '-' : '') + int + (dec !== undefined ? ',' + dec : '');
       }
       int = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
       return (neg ? '-' : '') + int + (dec !== undefined ? '.' + dec : '');
   }
   
   async function fetchJson(url, timeout = 9000) {
       const ctrl = new AbortController();
       const id = setTimeout(() => ctrl.abort(), timeout);
       try {
           const res = await fetch(url, { signal: ctrl.signal, headers: { Accept: 'application/json' } });
           if (!res.ok) throw new Error('HTTP ' + res.status);
           return await res.json();
       } finally {
           clearTimeout(id);
       }
   }
   
   /* ---------- 8. Statik matnlar ---------- */
   function applyStaticTexts() {
       document.documentElement.lang = state.lang;
       document.querySelectorAll('[data-i18n]').forEach((el) => {
           const key = el.getAttribute('data-i18n');
           if (I18N[state.lang][key]) el.textContent = t(key);
       });
       document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
           el.getAttribute('data-i18n-attr').split(';').forEach((pair) => {
               const idx = pair.indexOf(':');
               if (idx < 0) return;
               const attr = pair.slice(0, idx).trim();
               const key = pair.slice(idx + 1).trim();
               if (attr && key) el.setAttribute(attr, t(key));
           });
       });
       document.title = t('meta.title');
       const metaDesc = document.querySelector('meta[name="description"]');
       if (metaDesc) metaDesc.setAttribute('content', t('meta.desc'));
       $('#langLabel').textContent = state.lang === 'uz' ? 'EN' : 'UZ';
       updateGreeting();
   }
   
   function updateGreeting() {
       const h = new Date().getHours();
       const key = h < 6 ? 'greet.night' : h < 12 ? 'greet.morning' : h < 18 ? 'greet.day' : 'greet.evening';
       $('#greeting').textContent = t(key);
   }
   
   /* ---------- 9. Soat va sana ---------- */
   function tickClock() {
       const now = new Date();
       const uzb = new Date(now.getTime() + (5 * 60 + now.getTimezoneOffset()) * 60000);
       const pad = (n) => String(n).padStart(2, '0');
       $('#clock').textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
       $('#uzbTime').textContent = `${pad(uzb.getHours())}:${pad(uzb.getMinutes())}`;
       $('#todayDate').textContent = fmtDate(now);
   }
   
   /* ---------- 10. Ob-havo ---------- */
   async function loadWeather() {
       const box = $('#weatherBody');
       box.innerHTML = `<div class="skeleton-line" style="width:60%"></div><div class="skeleton-line" style="width:40%"></div><div class="skeleton-line" style="width:75%"></div>`;
       const c = CITIES[state.city];
       const url = `https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}` +
           `&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m` +
           `&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=4`;
       try {
           state.weather = await fetchJson(url);
           renderWeather();
       } catch (e) {
           console.warn('weather', e);
           box.innerHTML = errorBox(t('weather.error'), loadWeather);
       }
   }
   
   function renderWeather() {
       const w = state.weather;
       const box = $('#weatherBody');
       if (!w) return;
       const cur = w.current;
       const info = weatherInfo(cur.weather_code, cur.is_day);
       const desc = info[state.lang];
       const cityName = CITIES[state.city][state.lang];
   
       let forecast = '';
       w.daily.time.slice(0, 4).forEach((d, i) => {
           const di = weatherInfo(w.daily.weather_code[i], 1);
           const dayName = fmtWeekdayShort(new Date(d));
           forecast += `<div class="forecast-day">
               <div class="d">${escapeHtml(dayName)}</div>
               <div class="i">${di.i}</div>
               <div class="t">${Math.round(w.daily.temperature_2m_max[i])}° / ${Math.round(w.daily.temperature_2m_min[i])}°</div>
           </div>`;
       });
   
       box.innerHTML = `
           <div class="weather-main">
               <div class="weather-icon">${info.i}</div>
               <div>
                   <div class="weather-temp">${Math.round(cur.temperature_2m)}°C</div>
                   <div class="weather-desc">${escapeHtml(desc)}, ${escapeHtml(cityName)}</div>
               </div>
           </div>
           <div class="weather-stats">
               <span>🌡️ ${t('weather.feels')}: ${Math.round(cur.apparent_temperature)}°C</span>
               <span>💧 ${t('weather.humidity')}: ${cur.relative_humidity_2m}%</span>
               <span>💨 ${t('weather.wind')}: ${Math.round(cur.wind_speed_10m)} km/h</span>
           </div>
           <div class="forecast">${forecast}</div>`;
   }
   
   /* ---------- 11. Valyuta kurslari ---------- */
   async function loadCurrency() {
       const box = $('#currencyBody');
       box.innerHTML = `<div class="skeleton-line" style="width:80%"></div><div class="skeleton-line" style="width:55%"></div><div class="skeleton-line" style="width:70%"></div>`;
       try {
           const data = await fetchJson('https://cbu.uz/uz/arkhiv-kursov-valyut/json/', 10000);
           const rates = {};
           data.forEach((item) => {
               const nominal = Number(item.Nominal) || 1;
               rates[item.Ccy] = { value: Number(item.Rate) / nominal, diff: Number(item.Diff) };
           });
           state.currency = { provider: 'CBU', rates };
           renderCurrency();
       } catch (e) {
           console.warn('CBU failed, falling back', e);
           await loadCurrencyFallback();
       }
   }
   
   async function loadCurrencyFallback() {
       try {
           const data = await fetchJson('https://open.er-api.com/v6/latest/UZS', 10000);
           const rates = {};
           if (data && data.rates) {
               Object.keys(data.rates).forEach((code) => {
                   const perUzs = data.rates[code];
                   if (perUzs > 0) rates[code] = { value: 1 / perUzs, diff: null };
               });
           }
           state.currency = { provider: 'ER-API', rates };
           renderCurrency();
       } catch (e) {
           console.warn('fallback failed', e);
           $('#currencyBody').innerHTML = errorBox(t('currency.error'), loadCurrency);
       }
   }
   
   function renderCurrency() {
       const box = $('#currencyBody');
       const c = state.currency;
       if (!c) return;
       $('#currencySource').textContent = c.provider + ' · ' + t('currency.unit');
   
       const codes = PRIORITY.filter((code) => c.rates[code]);
       if (!codes.length) {
           box.innerHTML = errorBox(t('currency.error'), loadCurrency);
           return;
       }
       box.innerHTML = codes.slice(0, 6).map((code) => {
           const meta = CURRENCIES[code] || { flag: '🏳️', uz: code, en: code };
           const r = c.rates[code];
           let diffHtml = '';
           if (r.diff) {
               const cls = r.diff > 0 ? 'up' : 'down';
               const sign = r.diff > 0 ? '▲' : '▼';
               diffHtml = `<span class="rate-diff ${cls}" title="${t(r.diff > 0 ? 'up' : 'down')}">${sign} ${fmtNum(Math.abs(r.diff), 1)}</span>`;
           }
           return `<div class="rate-row">
               <div class="rate-cur">
                   <span class="rate-flag">${meta.flag}</span>
                   <div>
                       <div>${escapeHtml(meta[state.lang])}</div>
                       <div class="rate-code">1 ${code}</div>
                   </div>
               </div>
               <div style="text-align:right">
                   <div class="rate-val">${fmtNum(r.value)}</div>
                   ${diffHtml}
               </div>
           </div>`;
       }).join('');
       updateConverterOptions();
   }
   
   /* ---------- 12. Namoz vaqtlari ---------- */
   async function loadPrayer() {
       const box = $('#prayerBody');
       box.innerHTML = `<div class="skeleton-line" style="width:65%"></div><div class="skeleton-line" style="width:80%"></div><div class="skeleton-line" style="width:50%"></div>`;
       const c = CITIES[state.prayerCity];
       const url = `https://api.aladhan.com/v1/timings?latitude=${c.lat}&longitude=${c.lon}&method=3`;
       try {
           const data = await fetchJson(url, 10000);
           const timings = data.data.timings;
           const clean = (s) => String(s).split(' ')[0];
           const order = [
               ['fajr', 'Fajr'], ['sunrise', 'Sunrise'], ['dhuhr', 'Dhuhr'],
               ['asr', 'Asr'], ['maghrib', 'Maghrib'], ['isha', 'Isha']
           ];
           state.prayer = {
               timezone: data.data.meta.timezone,
               times: order.map(([key, api]) => ({ key, time: clean(timings[api]) }))
           };
           renderPrayer();
       } catch (e) {
           console.warn('prayer', e);
           box.innerHTML = errorBox(t('prayer.error'), loadPrayer);
       }
   }
   
   function minsFromHM(hm) {
       const [h, m] = hm.split(':').map(Number);
       return h * 60 + m;
   }
   
   function nowMinutesInZone(tz) {
       try {
           const parts = new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
           const h = Number(parts.find((p) => p.type === 'hour').value);
           const m = Number(parts.find((p) => p.type === 'minute').value);
           return h * 60 + m;
       } catch {
           return new Date().getHours() * 60 + new Date().getMinutes();
       }
   }
   
   function renderPrayer() {
       const p = state.prayer;
       const box = $('#prayerBody');
       if (!p) return;
   
       const nowMin = nowMinutesInZone(p.timezone || 'Asia/Tashkent');
       const withMin = p.times.map((x) => ({ ...x, min: minsFromHM(x.time) }));
       let next = withMin.find((x) => x.min > nowMin);
       if (!next) next = withMin[0];
   
       let remain = next.min - nowMin;
       if (remain < 0) remain += 24 * 60;
       const rh = Math.floor(remain / 60);
       const rm = remain % 60;
       const remainText = rh > 0 ? `${rh} ${t('prayer.hour')} ${rm} ${t('prayer.min')}` : `${rm} ${t('prayer.min')}`;
   
       const rows = p.times.map((x) => {
           const active = x.key === next.key ? ' active' : '';
           return `<div class="prayer-row${active}">
               <span>${t(x.key)}</span>
               <span class="t">${x.time}</span>
           </div>`;
       }).join('');
   
       box.innerHTML = `
           <div class="prayer-next">
               <div>
                   <div class="muted" style="font-size:.78rem">${t('prayer.next')}</div>
                   <b>${t(next.key)}</b>
               </div>
               <div style="text-align:right">
                   <div class="time">${next.time}</div>
                   <div class="muted" style="font-size:.75rem">${remainText}</div>
               </div>
           </div>
           <div class="prayer-list">${rows}</div>`;
   }
   
   /* ---------- 13. Xizmatlar, favqulodda, ma'lumotlar ---------- */
   function renderServices() {
       $('#servicesGrid').innerHTML = SERVICES.map((s) => `
           <a class="service" href="${s.url}" target="_blank" rel="noopener">
               <span class="service-ico" aria-hidden="true">${s.ico}</span>
               <span>
                   <span class="service-name">${escapeHtml(s.name[state.lang])}</span><br>
                   <span class="service-cat">${escapeHtml(s.cat[state.lang])}</span>
               </span>
           </a>`).join('');
   }
   
   function renderEmergency() {
       $('#emergencyGrid').innerHTML = EMERGENCY.map((e) => `
           <a class="em-item" href="tel:${e.num}">
               <span class="em-ico" aria-hidden="true">${e.ico}</span>
               <span>
                   <span class="em-num">${e.num}</span><br>
                   <span class="em-name">${escapeHtml(e.name[state.lang])}</span>
               </span>
           </a>`).join('');
   }
   
   function renderFacts() {
       $('#factsList').innerHTML = FACTS.map((f) => `
           <div class="fact-row">
               <span class="lbl">${f.ico} ${escapeHtml(f.label[state.lang])}</span>
               <span class="val">${escapeHtml(f.value[state.lang])}</span>
           </div>`).join('');
   }
   
   function renderHolidays() {
       $('#holidaysList').innerHTML = HOLIDAYS.map((h) => `
           <div class="holiday-row">
               <span class="date">${escapeHtml(h.d[state.lang])}</span>
               <span>${escapeHtml(h.n[state.lang])}</span>
           </div>`).join('');
   }

   /* ---------- 14. Xarita (Leaflet) ---------- */
   function initMap() {
       const el = document.getElementById('uzbMap');
       if (!el) return;
       if (typeof L === 'undefined') {
           el.innerHTML = `<div class="map-fallback"><span>🗺️</span><p>${escapeHtml(t('map.error') || 'Map unavailable')}</p></div>`;
           return;
       }
       const fallback = document.getElementById('mapFallback');
       if (fallback) fallback.remove();
   
       const map = L.map('uzbMap', { scrollWheelZoom: false }).setView([41.4, 64.5], 5);
       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
           maxZoom: 18,
           attribution: '&copy; OpenStreetMap'
       }).addTo(map);
   
       state.map = map;
       state.markers = {};
       Object.entries(CITIES).forEach(([key, c]) => {
           const marker = L.marker([c.lat, c.lon]).addTo(map);
           marker.bindPopup(`<b>${escapeHtml(c[state.lang])}</b>`);
           marker.on('click', () => selectCity(key));
           state.markers[key] = marker;
       });
   
       if (CITIES[state.city]) {
           map.setView([CITIES[state.city].lat, CITIES[state.city].lon], 6);
       }
   }
   
   function updateMapPopups() {
       Object.entries(state.markers).forEach(([key, marker]) => {
           marker.setPopupContent(`<b>${escapeHtml(CITIES[key][state.lang])}</b>`);
       });
   }
   
   function selectCity(key) {
       if (!CITIES[key]) return;
       state.city = key;
       state.prayerCity = key;
       localStorage.setItem('fo-city', key);
       localStorage.setItem('fo-prayer-city', key);
       const wSel = $('#citySelect');
       const pSel = $('#prayerCitySelect');
       if (wSel) wSel.value = key;
       if (pSel) pSel.value = key;
       loadWeather();
       loadPrayer();
   }
   
   /* ---------- 15. Konverter ---------- */
   function currencyCodes() {
       if (!state.currency) return ['USD', 'UZS'];
       const codes = ['USD', 'EUR', 'RUB'].filter((c) => state.currency.rates[c]);
       Object.keys(state.currency.rates).forEach((c) => { if (!codes.includes(c)) codes.push(c); });
       if (!codes.includes('UZS')) codes.push('UZS');
       return codes;
   }
   
   function ratePerUnit(code) {
       if (code === 'UZS') return 1;
       if (state.currency && state.currency.rates[code]) return state.currency.rates[code].value;
       return null;
   }
   
   function updateConverterOptions() {
       const codes = currencyCodes();
       const from = $('#convFrom');
       const to = $('#convTo');
       const keepFrom = from.value || 'USD';
       const keepTo = to.value || 'UZS';
       const opts = codes.map((c) => `<option value="${c}">${c} — ${escapeHtml((CURRENCIES[c] || {})[state.lang] || c)}</option>`).join('');
       from.innerHTML = opts;
       to.innerHTML = opts;
       from.value = codes.includes(keepFrom) ? keepFrom : 'USD';
       to.value = codes.includes(keepTo) ? keepTo : 'UZS';
       convert();
   }
   
   function convert() {
       const amount = parseFloat($('#convAmount').value) || 0;
       const from = $('#convFrom').value;
       const to = $('#convTo').value;
       const rf = ratePerUnit(from);
       const rt = ratePerUnit(to);
       const out = $('#convResult');
       const rateLine = $('#convRate');
       if (rf == null || rt == null) {
           out.textContent = '—';
           rateLine.textContent = t('conv.error');
           return;
       }
       const result = (amount * rf) / rt;
       const isBig = result >= 1000;
       out.textContent = `${fmtNum(result, isBig ? 0 : 2)} ${to}`;
       const unitRate = rf / rt;
       const rateDigits = unitRate >= 100 ? 0 : unitRate >= 1 ? 2 : 4;
       rateLine.textContent = t('conv.rate')
           .replace('{from}', from)
           .replace('{to}', to)
           .replace('{rate}', fmtNum(unitRate, rateDigits));
   }
   
   /* ---------- 16. Xatolik oynasi ---------- */
   function errorBox(msg, retry) {
       const id = 'retry-' + Math.random().toString(36).slice(2, 8);
       setTimeout(() => {
           const btn = document.getElementById(id);
           if (btn) btn.addEventListener('click', retry);
       }, 0);
       return `<div class="error-box">⚠️ ${escapeHtml(msg)}<br>
           <button id="${id}" type="button">${t('state.retry')}</button></div>`;
   }
   
   /* ---------- 17. Boshqaruv ---------- */
   function setupControls() {
       $('#langToggle').addEventListener('click', () => {
           state.lang = state.lang === 'uz' ? 'en' : 'uz';
           localStorage.setItem('fo-lang', state.lang);
           applyStaticTexts();
           renderCityOptions();
           renderServices();
           renderEmergency();
           renderFacts();
           renderHolidays();
           updateMapPopups();
           if (state.weather) renderWeather();
           if (state.currency) renderCurrency();
           if (state.prayer) renderPrayer();
           updateConverterOptions();
           tickClock();
       });
   
       const savedTheme = localStorage.getItem('fo-theme');
       if (savedTheme === 'dark') document.body.setAttribute('data-theme', 'dark');
       syncThemeIcon();
       $('#themeToggle').addEventListener('click', () => {
           const dark = document.body.getAttribute('data-theme') === 'dark';
           if (dark) document.body.removeAttribute('data-theme');
           else document.body.setAttribute('data-theme', 'dark');
           localStorage.setItem('fo-theme', dark ? 'light' : 'dark');
           syncThemeIcon();
       });
   
       $('#navToggle').addEventListener('click', () => {
           const nav = $('#mainNav');
           const open = nav.classList.toggle('open');
           $('#navToggle').setAttribute('aria-expanded', String(open));
       });
       document.querySelectorAll('#mainNav a').forEach((a) =>
           a.addEventListener('click', () => $('#mainNav').classList.remove('open')));
   
       $('#searchForm').addEventListener('submit', (e) => {
           e.preventDefault();
           const q = $('#searchInput').value.trim();
           if (q) window.open('https://www.google.com/search?q=' + encodeURIComponent(q), '_blank', 'noopener');
       });
   
       const toTop = $('#toTop');
       window.addEventListener('scroll', () => {
           toTop.classList.toggle('show', window.scrollY > 500);
       });
       toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
   
       $('#convAmount').addEventListener('input', convert);
       $('#convFrom').addEventListener('change', convert);
       $('#convTo').addEventListener('change', convert);
       $('#swapBtn').addEventListener('click', () => {
           const f = $('#convFrom').value;
           $('#convFrom').value = $('#convTo').value;
           $('#convTo').value = f;
           convert();
       });
   }
   
   function syncThemeIcon() {
       $('#themeIcon').textContent = document.body.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
   }
   
   function renderCityOptions() {
       const options = Object.entries(CITIES)
           .map(([key, c]) => `<option value="${key}">${escapeHtml(c[state.lang])}</option>`)
           .join('');
       const wSel = $('#citySelect');
       const pSel = $('#prayerCitySelect');
       wSel.innerHTML = options;
       pSel.innerHTML = options;
       wSel.value = state.city;
       pSel.value = state.prayerCity;
   }
   
   function setupCitySelects() {
       const wSel = $('#citySelect');
       const pSel = $('#prayerCitySelect');
       renderCityOptions();
   
       wSel.addEventListener('change', () => {
           state.city = wSel.value;
           localStorage.setItem('fo-city', state.city);
           loadWeather();
           if (state.map && CITIES[state.city]) state.map.setView([CITIES[state.city].lat, CITIES[state.city].lon], 8);
       });
       pSel.addEventListener('change', () => {
           state.prayerCity = pSel.value;
           localStorage.setItem('fo-prayer-city', state.prayerCity);
           loadPrayer();
       });
   }
   
   /* ---------- 18. Ishga tushirish ---------- */
   function init() {
       setupControls();
       setupCitySelects();
       applyStaticTexts();
       renderServices();
       renderEmergency();
       renderFacts();
       renderHolidays();
       tickClock();
       setInterval(tickClock, 1000);
   
       initMap();
   
       loadWeather();
       loadCurrency();
       loadPrayer();
   }
   
   document.addEventListener('DOMContentLoaded', init);

   /* ---------- 19. Service Worker (oflayn + ilova) ---------- */
   if ('serviceWorker' in navigator && location.protocol === 'https:') {
       window.addEventListener('load', () => {
           navigator.serviceWorker.register('sw.js').catch((e) => console.warn('SW', e));
       });
   }
