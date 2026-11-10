/* =====================================================
   Foydali Oyna — ai-assistant.js
   Sayt ichidagi AI yordamchi: suhbat oynasi (uz / en)
   Statik sayt uchun: server talab qilinmaydi
   ===================================================== */

'use strict';

(function () {
    /* ---------- 1. Matnlar ---------- */
    const STR = {
        uz: {
            name: 'FoydaliBot',
            status: 'AI yordamchi · onlayn',
            placeholder: "Savolingizni yozing...",
            fabAria: 'AI yordamchini ochish',
            greeting: "Assalomu alaykum! 👋 Men <b>FoydaliBot</b> — Foydali Oyna saytining AI yordamchisi. Ob-havo, valyuta kursi, namoz vaqtlari, favqulodda raqamlar va O'zbekistonda hayot haqida savol bering.",
            fallback: "Kechirasiz, buni tushunmadim. 😔 Quyidagi mavzularda yordam bera olaman:",
            chips: ['Ob-havo', 'Valyuta kursi', 'Namoz vaqtlari', 'Favqulodda raqamlar', 'Yangi kelganlar uchun', 'Foydali iboralar'],
            a: {
                hello: "Assalomu alaykum! 👋 Savolingizni yozing yoki pastdagi mavzulardan birini tanlang.",
                weatherLive: "Hozir ob-havo: <b>{t}</b> ({d}). To'liq ma'lumot va 4 kunlik bashorat — sahifadagi «Ob-havo» blokida.",
                weatherNone: "Ob-havo ma'lumoti hozir yuklanmagan. Bosh sahifadagi «Ob-havo» blokini tekshiring.",
                ratesLive: "Markaziy bank kurslari: {r}. To'liq ro'yxat va kalkulyator — sahifadagi «Valyuta kursi» blokida.",
                ratesNone: "Valyuta kursi hozir yuklanmagan. Bosh sahifadagi «Valyuta kursi» blokini tekshiring.",
                prayer: "Bugungi namoz vaqtlari sahifadagi «Namoz vaqtlari» blokida — Bomdod, Quyosh, Peshin, Asr, Shom va Hufton. Shaharni ham tanlash mumkin. Bosh sahifaga qaytib ko'ring.",
                emergency: "Favqulodda raqamlar (barchasi bepul):<br>🚒 <b>101</b> — Yong'in xavfsizligi<br>🚓 <b>102</b> — Politsiya<br>🚑 <b>103</b> — Tez tibbiy yordam<br>🔥 <b>104</b> — Gaz xizmati<br>🆘 <b>112</b> — Yagona qutqaruv xizmati<br>🧒 <b>1115</b> — Bolalar ishonch raqami",
                visa: "Ko'p davlatlar fuqarolari uchun O'zbekistonga 30 kungacha viza talab qilinmaydi. Elektron viza: <a href=\"https://e-visa.gov.uz\" target=\"_blank\" rel=\"noopener\">e-visa.gov.uz</a>. Migratsiya bo'limi: <a href=\"https://mvd.uz\" target=\"_blank\" rel=\"noopener\">mvd.uz</a>",
                sim: "SIM kartani pasport bilan har qanday operator do'konida bir necha daqiqada rasmiylashtirasiz: <b>Beeline</b>, <b>Ucell</b>, <b>Mobiuz</b>, <b>Humans</b>.",
                transport: "Shahar ichida taksi — <b>Yandex Go</b> ilovasi. Toshkent metrosi va avtobuslarda <b>ATTO kartasi</b> ishlatiladi. Poyezd chiptalari: <a href=\"https://railway.uz\" target=\"_blank\" rel=\"noopener\">railway.uz</a>",
                payments: "To'lovlar asosan <b>Payme</b> va <b>Click</b> orqali: kommunal xizmatlar, taksi, onlayn xaridlar. Naqd pul ham keng qo'llanadi.",
                housing: "Ijara kvartiralar <a href=\"https://www.olx.uz\" target=\"_blank\" rel=\"noopener\">OLX.uz</a> va Telegram kanallarida e'lon qilinadi. Yozma shartnoma tuzishni unutmang.",
                shopping: "Supermarketlar: <b>Makro</b>, <b>Korzinka</b>, <b>Uzum Market</b>. Eng arzon sabzavot-mevalar bozorlarda.",
                phrases: "Foydali iboralar:<br>• <b>Assalomu alaykum</b> — Hello<br>• <b>Rahmat</b> — Thank you<br>• <b>Narxi qancha?</b> — How much is it?<br>• <b>Bu qayerda?</b> — Where is it?<br>• <b>Yordam bering!</b> — Help me!<br>• <b>Tushunmadim</b> — I don't understand<br>To'liq ro'yxat «Yangi kelganlar» sahifasida.",
                holidays: "Asosiy bayramlar: 1-yanvar (Yangi yil), 8-mart, 21-mart (Navro'z), 9-may, 1-sentabr (Mustaqillik kuni), 1-oktabr, 8-dekabr. To'liq ro'yxat — «Ma'lumotlar» bo'limida.",
                map: "Bosh sahifadagi xaritada shaharni bosing — ob-havo va namoz vaqtlari shu shaharga o'tadi.",
                time: "Hozir O'zbekistonda soat <b>{t}</b> (Toshkent vaqti, UTC+5).",
                thanks: "Arzimaydi! 😊 Yana savollaringiz bormi?",
                bye: "Ko'rishgacha! 😊",
                about: "Men sayt yordamchisiman. Quyidagi mavzularda savol bering: ob-havo, valyuta kursi, namoz vaqtlari, favqulodda raqamlar, viza, SIM karta, transport, to'lovlar, turar joy, xaridlar, bayramlar, foydali iboralar.",
                guide: "«Yangi kelganlar uchun» qo'llanmasida: viza, SIM karta, to'lovlar, transport, turar joy, xaridlar va foydali iboralar — hammasi qadam-baqadam. {l}"
            }
        },
        en: {
            name: 'FoydaliBot',
            status: 'AI assistant · online',
            placeholder: 'Type your question...',
            fabAria: 'Open AI assistant',
            greeting: "Hello! 👋 I'm <b>FoydaliBot</b> — the AI assistant of the Foydali Oyna portal. Ask me about the weather, exchange rates, prayer times, emergency numbers and life in Uzbekistan.",
            fallback: "Sorry, I didn't understand that. 😔 I can help with these topics:",
            chips: ['Weather', 'Exchange rates', 'Prayer times', 'Emergency numbers', 'For newcomers', 'Useful phrases'],
            a: {
                hello: 'Hello! 👋 Type a question or pick one of the topics below.',
                weatherLive: 'Current weather: <b>{t}</b> ({d}). Full details and a 4-day forecast are in the weather block.',
                weatherNone: 'Weather data is not loaded yet. Check the weather block on the home page.',
                ratesLive: 'Central Bank rates: {r}. The full list and a converter are in the exchange-rate block.',
                ratesNone: 'Exchange rates are not loaded yet. Check the exchange-rate block on the home page.',
                prayer: 'Today\'s prayer times are in the "Prayer times" block — Fajr, Sunrise, Dhuhr, Asr, Maghrib and Isha, with a city selector. Go back to the home page.',
                emergency: 'Emergency numbers (all free):<br>🚒 <b>101</b> — Fire service<br>🚓 <b>102</b> — Police<br>🚑 <b>103</b> — Ambulance<br>🔥 <b>104</b> — Gas service<br>🆘 <b>112</b> — Unified emergency<br>🧒 <b>1115</b> — Children\'s helpline',
                visa: 'Citizens of many countries can enter Uzbekistan visa-free for up to 30 days. E-visa: <a href="https://e-visa.gov.uz" target="_blank" rel="noopener">e-visa.gov.uz</a>. Migration service: <a href="https://mvd.uz" target="_blank" rel="noopener">mvd.uz</a>',
                sim: 'A SIM card is issued in minutes with your passport at any operator store: <b>Beeline</b>, <b>Ucell</b>, <b>Mobiuz</b>, <b>Humans</b>.',
                transport: 'City taxis run on the <b>Yandex Go</b> app. The Tashkent metro and buses use the <b>ATTO card</b>. Train tickets: <a href="https://railway.uz" target="_blank" rel="noopener">railway.uz</a>',
                payments: 'Payments mostly go through <b>Payme</b> and <b>Click</b>: utilities, taxis, online shopping. Cash is widely accepted too.',
                housing: 'Rental listings are posted on <a href="https://www.olx.uz" target="_blank" rel="noopener">OLX.uz</a> and Telegram channels. Always sign a written contract.',
                shopping: 'Supermarkets: <b>Makro</b>, <b>Korzinka</b>, <b>Uzum Market</b>. The cheapest fresh produce is at bazaars.',
                phrases: 'Useful phrases:<br>• <b>Assalomu alaykum</b> — Hello<br>• <b>Rahmat</b> — Thank you<br>• <b>Narxi qancha?</b> — How much is it?<br>• <b>Bu qayerda?</b> — Where is it?<br>• <b>Yordam bering!</b> — Help me!<br>• <b>Tushunmadim</b> — I don\'t understand<br>The full list is on the "For newcomers" page.',
                holidays: 'Main holidays: January 1 (New Year), March 8, March 21 (Navruz), May 9, September 1 (Independence Day), October 1, December 8. Full list in the Info section.',
                map: 'Click a city on the map on the home page — weather and prayer times switch to it.',
                time: 'It is currently <b>{t}</b> in Uzbekistan (Tashkent time, UTC+5).',
                thanks: 'You are welcome! 😊 Anything else?',
                bye: 'Goodbye! 😊',
                about: 'I am the site assistant. Ask about: weather, exchange rates, prayer times, emergency numbers, visa, SIM card, transport, payments, housing, shopping, holidays or useful phrases.',
                guide: 'The "For newcomers" guide covers visa, SIM card, payments, transport, housing, shopping and useful phrases — step by step. {l}'
            }
        }
    };

    /* ---------- 2. Holat ---------- */
    let lang = localStorage.getItem('fo-lang') || 'uz';
    const L = () => STR[lang];

    function onGuidePage() {
        return location.pathname.indexOf('yangi-kelganlar') !== -1;
    }

    function guideLink() {
        if (onGuidePage()) return lang === 'uz' ? 'Siz allaqachon bu sahifadasiz — yuqoridagi qadamlarni ko\'ring.' : 'You are already on this page — see the steps above.';
        return lang === 'uz'
            ? '<a href="yangi-kelganlar.html">Qo\'llanmani ochish →</a>'
            : '<a href="yangi-kelganlar.html">Open the guide →</a>';
    }

    /* ---------- 3. Jonli ma'lumotlar ---------- */
    function liveWeather() {
        const temp = document.querySelector('.weather-temp');
        const desc = document.querySelector('.weather-desc');
        if (temp && temp.textContent.trim()) {
            return L().a.weatherLive
                .replace('{t}', temp.textContent.trim())
                .replace('{d}', desc ? desc.textContent.trim() : '');
        }
        return L().a.weatherNone;
    }

    function liveRates() {
        const rows = Array.from(document.querySelectorAll('#currencyBody .rate-row'));
        if (!rows.length) return L().a.ratesNone;
        const unit = lang === 'uz' ? "so'm" : 'UZS';
        const parts = rows.slice(0, 4).map((r) => {
            const code = (r.querySelector('.rate-code') ? r.querySelector('.rate-code').textContent : '').replace('1', '').trim();
            const val = r.querySelector('.rate-val') ? r.querySelector('.rate-val').textContent.trim() : '';
            return code && val ? `1 ${code} = ${val} ${unit}` : '';
        }).filter(Boolean);
        if (!parts.length) return L().a.ratesNone;
        return L().a.ratesLive.replace('{r}', parts.join(' · '));
    }

    function uzbTime() {
        try {
            return new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Tashkent', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());
        } catch (e) {
            return new Date().toTimeString().slice(0, 5);
        }
    }

    /* ---------- 4. Intents (kalit so'zlar) ---------- */
    const INTENTS = [
        { kw: ['salom', 'assalomu', 'hello', 'hi ', ' hey', 'hey!', 'privet', 'alom'], answer: () => L().a.hello },
        { kw: ['ob-havo', 'obhavo', 'havo', 'weather', 'temperatura', 'temperature', 'issiq', 'sovuq', "yomg'ir", 'yomgir', 'rain', 'snow', 'qor'], answer: liveWeather },
        { kw: ['kurs', 'valyuta', 'currency', 'dollar', 'usd', 'yevro', 'eur', 'rubl', 'rub', "so'm", 'som', 'rate', 'exchange', 'ayirbosh'], answer: liveRates },
        { kw: ['namoz', 'prayer', 'bomdod', 'fajr', 'peshin', 'dhuhr', 'asr', 'shom', 'maghrib', 'hufton', 'isha'], answer: () => L().a.prayer },
        { kw: ['favqulodda', 'emergency', 'yong', 'politsiya', 'police', 'tez yordam', 'ambulance', '101', '102', '103', '104', '112', 'qutqaruv', 'fire'], answer: () => L().a.emergency },
        { kw: ['viza', 'visa', 'pasport', 'passport', 'migratsiya', 'migration', 'chegara', 'border'], answer: () => L().a.visa },
        { kw: ['sim', 'operator', 'beeline', 'ucell', 'mobiuz', 'humans', 'telefon karta'], answer: () => L().a.sim },
        { kw: ['taksi', 'taxi', 'metro', 'avtobus', 'bus', 'poyezd', 'train', 'yandex', 'transport', 'atto'], answer: () => L().a.transport },
        { kw: ["to'lov", 'tolov', 'payme', 'click', 'payment', 'bankomat', 'atm', 'bank'], answer: () => L().a.payments },
        { kw: ['ijara', 'kvartira', 'apartment', 'rent', 'turar joy', 'housing', 'olx', 'uy '], answer: () => L().a.housing },
        { kw: ['bozor', 'market', 'supermarket', 'korzinka', 'makro', 'uzum', 'xarid', 'shopping', 'savat'], answer: () => L().a.shopping },
        { kw: ['ibora', 'iboralar', 'phrase', 'fraza', 'tarjima', 'translate', "o'zbek til", 'ozbek til', 'learn uzbek'], answer: () => L().a.phrases },
        { kw: ['bayram', 'holiday', "navro'z", 'navroz', 'mustaqillik', 'independence', 'yangi yil', 'new year'], answer: () => L().a.holidays },
        { kw: ['xarita', 'map', 'shahar', 'city'], answer: () => L().a.map },
        { kw: ['soat', 'vaqt', 'time', 'hozir', 'now', 'sana', 'date'], answer: () => L().a.time.replace('{t}', uzbTime()) },
        { kw: ['rahmat', 'thanks', 'thank you', 'tashakkur'], answer: () => L().a.thanks },
        { kw: ['xayr', 'bye', 'goodbye', "ko'rishgacha", 'korishgacha'], answer: () => L().a.bye },
        { kw: ['yangi kelgan', 'kelganman', 'newcomer', 'new here', 'just arrived', "qo'llanma", 'qollanma', 'guide'], answer: () => L().a.guide.replace('{l}', guideLink()) },
        { kw: ['kim siz', 'who are you', 'bot', 'yordamchi', 'assistant', 'help', 'yordam', 'nima qila'], answer: () => L().a.about }
    ];

    function getAnswer(text) {
        const q = ' ' + String(text).toLowerCase().replace(/[’ʻ`´]/g, "'").replace(/\s+/g, ' ').trim() + ' ';
        let best = null;
        let bestScore = 0;
        INTENTS.forEach((it) => {
            let score = 0;
            it.kw.forEach((k) => { if (q.indexOf(k) !== -1) score += k.length > 4 ? 2 : 1; });
            if (score > bestScore) { bestScore = score; best = it; }
        });
        return best ? best.answer() : L().fallback;
    }

    /* ---------- 5. Suhbat oynasi ---------- */
    let panel, bodyEl, inputEl;

    function esc(str) {
        return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    function scrollDown() {
        bodyEl.scrollTop = bodyEl.scrollHeight;
    }

    function addUserMsg(text) {
        const div = document.createElement('div');
        div.className = 'ai-msg user';
        div.textContent = text;
        bodyEl.appendChild(div);
        scrollDown();
    }

    function addBotMsg(html, withChips) {
        const div = document.createElement('div');
        div.className = 'ai-msg bot';
        div.innerHTML = html;
        bodyEl.appendChild(div);
        if (withChips) addChips();
        scrollDown();
    }

    function addChips() {
        const wrap = document.createElement('div');
        wrap.className = 'ai-chips';
        L().chips.forEach((c) => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'ai-chip';
            b.textContent = c;
            b.addEventListener('click', () => send(c));
            wrap.appendChild(b);
        });
        bodyEl.appendChild(wrap);
        scrollDown();
    }

    let typingEl = null;
    function showTyping() {
        hideTyping();
        typingEl = document.createElement('div');
        typingEl.className = 'ai-typing';
        typingEl.innerHTML = '<span></span><span></span><span></span>';
        bodyEl.appendChild(typingEl);
        scrollDown();
    }
    function hideTyping() {
        document.querySelectorAll('.ai-typing').forEach((el) => {
            if (el.parentNode) el.parentNode.removeChild(el);
        });
        typingEl = null;
    }

    function send(text) {
        const val = String(text || '').trim();
        if (!val) return;
        addUserMsg(val);
        showTyping();
        setTimeout(() => {
            hideTyping();
            const answer = getAnswer(val);
            addBotMsg(answer, answer === L().fallback);
        }, 500 + Math.random() * 500);
    }

    /* ---------- 6. Interfeys ---------- */
    function refreshLabels() {
        if (!panel) return;
        panel.querySelector('.ai-name').textContent = L().name;
        panel.querySelector('.ai-status').textContent = L().status;
        inputEl.placeholder = L().placeholder;
    }

    function resetChat() {
        bodyEl.innerHTML = '';
        addBotMsg(L().greeting, true);
    }

    function buildWidget() {
        const fab = document.createElement('button');
        fab.type = 'button';
        fab.className = 'ai-fab';
        fab.setAttribute('aria-label', L().fabAria);
        fab.innerHTML = '🤖<span class="ai-dot" aria-hidden="true"></span>';

        panel = document.createElement('div');
        panel.className = 'ai-panel';
        panel.setAttribute('role', 'dialog');
        panel.innerHTML = `
            <div class="ai-head">
                <span class="ai-avatar" aria-hidden="true">🤖</span>
                <div>
                    <div class="ai-name">${esc(L().name)}</div>
                    <div class="ai-status">${esc(L().status)}</div>
                </div>
                <button type="button" class="ai-close" aria-label="✕">✕</button>
            </div>
            <div class="ai-body"></div>
            <form class="ai-input">
                <input type="text" autocomplete="off">
                <button type="submit" aria-label="➤">➤</button>
            </form>`;

        document.body.appendChild(fab);
        document.body.appendChild(panel);

        bodyEl = panel.querySelector('.ai-body');
        inputEl = panel.querySelector('.ai-input input');

        fab.addEventListener('click', () => {
            const open = panel.classList.toggle('open');
            fab.setAttribute('aria-expanded', String(open));
            if (open) {
                if (!bodyEl.children.length) resetChat();
                setTimeout(() => inputEl.focus(), 50);
            }
        });
        panel.querySelector('.ai-close').addEventListener('click', () => {
            panel.classList.remove('open');
            fab.setAttribute('aria-expanded', 'false');
        });
        panel.querySelector('.ai-input').addEventListener('submit', (e) => {
            e.preventDefault();
            send(inputEl.value);
            inputEl.value = '';
        });

        resetChat();
    }

    /* ---------- 7. Til sinxronizatsiyasi ---------- */
    const langBtn = document.getElementById('langToggle');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            setTimeout(() => {
                const nl = localStorage.getItem('fo-lang') || 'uz';
                if (nl !== lang) {
                    lang = nl;
                    refreshLabels();
                    resetChat();
                }
            }, 0);
        });
    }

    /* ---------- 8. Ishga tushirish ---------- */
    document.addEventListener('DOMContentLoaded', buildWidget);
})();
