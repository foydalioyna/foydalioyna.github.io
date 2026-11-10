/* =====================================================
   Foydali Oyna — newcomers.js
   "Yangi kelganlar uchun" alohida sahifasi (uz / en)
   ===================================================== */

'use strict';

(function () {
    /* ---------- 1. Tillar (i18n) ---------- */
    const I18N = {
        uz: {
            'meta.title': "Yangi kelganlar uchun — Foydali Oyna",
            'meta.desc': "O'zbekistonga yangi kelganlar uchun boshlang'ich qo'llanma: viza, SIM karta, to'lovlar, transport, turar joy, xaridlar va foydali iboralar.",
            'lang.aria': 'Tilni almashtirish',
            'theme.aria': 'Rejimni almashtirish',
            'top.aria': 'Yuqoriga',
            'back.home': '← Bosh sahifa',
            'nc.title': 'Yangi kelganlar uchun',
            'nc.subtitle': "O'zbekistonga yangi kelganlar uchun boshlang'ich qo'llanma",
            'nc.phrasesTitle': 'Foydali iboralar',
            'nc.phrasesNote': "O'zbekcha asosiy iboralar — inglizcha tarjimasi bilan",
            'footer.tagline': "O'zbekiston uchun foydali sayt",
            'footer.note': "Ma'lumotlar ochiq manbalardan olinadi. Rasmiy xizmatlar uchun tegishli davlat saytlariga murojaat qiling."
        },
        en: {
            'meta.title': 'For newcomers — Foydali Oyna',
            'meta.desc': 'A starter guide for anyone newly arrived in Uzbekistan: visa, SIM card, payments, transport, housing, shopping and useful phrases.',
            'lang.aria': 'Switch language',
            'theme.aria': 'Toggle theme',
            'top.aria': 'Back to top',
            'back.home': '← Home',
            'nc.title': 'For newcomers',
            'nc.subtitle': 'A starter guide for anyone newly arrived in Uzbekistan',
            'nc.phrasesTitle': 'Useful phrases',
            'nc.phrasesNote': 'Essential Uzbek phrases with English translations',
            'footer.tagline': 'A useful site for Uzbekistan',
            'footer.note': 'Data is fetched from open sources. For official services please visit the relevant government websites.'
        }
    };

    const state = {
        lang: localStorage.getItem('fo-lang') || 'uz'
    };

    const t = (key) => (I18N[state.lang][key] ?? I18N.uz[key] ?? key);

    /* ---------- 2. Qo'llanma qadamlari ---------- */
    const NEWCOMER_STEPS = [
        {
            ico: '🛂',
            title: { uz: 'Viza va migratsiya', en: 'Visa & migration' },
            text: {
                uz: "Ko'p davlatlar fuqarolari uchun 30 kun viza talab qilinmaydi. Elektron viza va rasmiy qoidalar portalda.",
                en: 'Citizens of many countries can enter visa-free for up to 30 days. E-visas and official rules are on the portal.'
            },
            links: [
                { label: 'e-visa.gov.uz', url: 'https://e-visa.gov.uz' },
                { label: 'mvd.uz', url: 'https://mvd.uz' }
            ]
        },
        {
            ico: '📱',
            title: { uz: 'SIM karta', en: 'SIM card' },
            text: {
                uz: "Pasport bilan har qanday operator do'konida bir necha daqiqada rasmiylashtiriladi.",
                en: 'Bring your passport to any operator store — a SIM card is issued within minutes.'
            },
            links: [
                { label: 'beeline.uz', url: 'https://beeline.uz' },
                { label: 'ucell.uz', url: 'https://ucell.uz' },
                { label: 'mobi.uz', url: 'https://mobi.uz' },
                { label: 'humans.uz', url: 'https://humans.uz' }
            ]
        },
        {
            ico: '💳',
            title: { uz: "To'lovlar", en: 'Payments' },
            text: {
                uz: "Kommunal xizmatlar, taksi va onlayn xaridlar asosan Payme va Click orqali. Naqd pul ham keng qo'llanadi.",
                en: 'Utilities, taxis and online shopping mostly run through Payme and Click. Cash is still widely accepted.'
            },
            links: [
                { label: 'payme.uz', url: 'https://payme.uz' },
                { label: 'click.uz', url: 'https://click.uz' }
            ]
        },
        {
            ico: '🚕',
            title: { uz: 'Transport', en: 'Transport' },
            text: {
                uz: "Shahar ichida taksi — Yandex Go ilovasi. Toshkent metrosi va avtobuslarda ATTO kartasi ishlatiladi.",
                en: 'Yandex Go covers city taxis. The Tashkent metro and buses use the ATTO card.'
            },
            links: [
                { label: 'Yandex Go', url: 'https://yandex.uz' },
                { label: 'railway.uz', url: 'https://railway.uz' }
            ]
        },
        {
            ico: '🏠',
            title: { uz: 'Turar joy', en: 'Housing' },
            text: {
                uz: "Ijara kvartiralar OLX va Telegram kanallarida e'lon qilinadi; yozma shartnoma odatdagidek.",
                en: 'Rental listings are posted on OLX and Telegram channels; a written contract is standard.'
            },
            links: [
                { label: 'olx.uz', url: 'https://www.olx.uz' }
            ]
        },
        {
            ico: '🛒',
            title: { uz: 'Xaridlar', en: 'Shopping' },
            text: {
                uz: "Supermarketlar: Makro, Korzinka, Uzum Market. Eng arzon sabzavot-mevalar bozorlarda.",
                en: 'Supermarkets: Makro, Korzinka, Uzum Market. Bazaars have the cheapest fresh produce.'
            },
            links: [
                { label: 'makro.uz', url: 'https://makro.uz' },
                { label: 'korzinka.uz', url: 'https://korzinka.uz' },
                { label: 'uzum.uz', url: 'https://uzum.uz' }
            ]
        },
        {
            ico: '💱',
            title: { uz: 'Pul ayirboshlash', en: 'Money exchange' },
            text: {
                uz: "Banklar va rasmiy ayirboshlash punktlaridan foydalaning; joriy kurs — bosh sahifadagi kurslar blokida.",
                en: 'Use banks and official exchange points; current rates are shown on the home page.'
            },
            links: [
                { label: 'cbu.uz', url: 'https://cbu.uz' }
            ]
        },
        {
            ico: '🏥',
            title: { uz: "Sog'liqni saqlash", en: 'Healthcare' },
            text: {
                uz: "Tez yordam — 103 yoki 112 (bepul). Xususiy klinikalar va dorixonalar ko'p; sug'urta foydali.",
                en: 'Ambulance: 103 or 112 (free). Private clinics and pharmacies are everywhere; insurance helps.'
            },
            links: [
                { label: 'ssv.uz', url: 'https://ssv.uz' }
            ]
        }
    ];

    /* ---------- 3. Foydali iboralar ---------- */
    const PHRASES = [
        { uz: 'Assalomu alaykum', en: 'Hello' },
        { uz: 'Rahmat', en: 'Thank you' },
        { uz: "Ha / Yo'q", en: 'Yes / No' },
        { uz: 'Narxi qancha?', en: 'How much is it?' },
        { uz: 'Bu qayerda?', en: 'Where is it?' },
        { uz: 'Yordam bering!', en: 'Help me!' },
        { uz: 'Tushunmadim', en: "I don't understand" },
        { uz: 'Inglizcha gapirasizmi?', en: 'Do you speak English?' },
        { uz: 'Boshqacha aytib bering', en: 'Could you say it differently?' },
        { uz: 'Bemorman', en: 'I feel sick' }
    ];

    /* ---------- 4. Yordamchilar ---------- */
    const $ = (sel) => document.querySelector(sel);

    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    /* ---------- 5. Statik matnlar ---------- */
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
    }

    /* ---------- 6. Kontent ---------- */
    function renderNewcomers() {
        const grid = $('#newcomerGrid');
        if (grid) {
            grid.innerHTML = NEWCOMER_STEPS.map((s, i) => `
                <article class="card nc-step">
                    <div class="nc-head">
                        <span class="nc-ico" aria-hidden="true">${s.ico}</span>
                        <span class="nc-num">${i + 1}</span>
                    </div>
                    <h3>${escapeHtml(s.title[state.lang])}</h3>
                    <p>${escapeHtml(s.text[state.lang])}</p>
                    <div class="nc-links">
                        ${(s.links || []).map((l) => `<a class="nc-link" href="${l.url}" target="_blank" rel="noopener">${escapeHtml(l.label)}</a>`).join('')}
                    </div>
                </article>`).join('');
        }
        const ph = $('#phraseList');
        if (ph) {
            ph.innerHTML = PHRASES.map((p) => `
                <div class="phrase-row">
                    <span class="p-uz">${escapeHtml(p.uz)}</span>
                    <span class="p-en">${escapeHtml(p.en)}</span>
                </div>`).join('');
        }
    }

    /* ---------- 7. Boshqaruv ---------- */
    function syncThemeIcon() {
        $('#themeIcon').textContent = document.body.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
    }

    function setupControls() {
        $('#langToggle').addEventListener('click', () => {
            state.lang = state.lang === 'uz' ? 'en' : 'uz';
            localStorage.setItem('fo-lang', state.lang);
            applyStaticTexts();
            renderNewcomers();
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

        const toTop = $('#toTop');
        window.addEventListener('scroll', () => {
            toTop.classList.toggle('show', window.scrollY > 500);
        });
        toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    /* ---------- 8. Ishga tushirish ---------- */
    function init() {
        setupControls();
        applyStaticTexts();
        renderNewcomers();
    }

    document.addEventListener('DOMContentLoaded', init);
})();
