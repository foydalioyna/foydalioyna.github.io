/* =====================================================
   Foydali Oyna — admin.js
   Statik sayt uchun admin panel (GitHub API orqali).
   data.json ni tahrirlab, to'g'ridan-to'g'ri repoga yuklaydi.
   ===================================================== */

'use strict';

(function () {
    const $ = (s) => document.querySelector(s);

    /* ---------- Bo'limlar sxemasi ---------- */
    const SCHEMA = {
        services: {
            label: 'Xizmatlar',
            fields: [
                ['ico', 'Ikonka (emoji)'],
                ['name.uz', 'Nomi (uz)'],
                ['name.en', 'Name (en)'],
                ['cat.uz', 'Kategoriya (uz)'],
                ['cat.en', 'Category (en)'],
                ['url', 'Havola (https://...)']
            ],
            blank: () => ({ ico: '🔗', name: { uz: '', en: '' }, cat: { uz: '', en: '' }, url: '' }),
            title: (it) => ((it.name && (it.name.uz || it.name.en)) || '')
        },
        emergency: {
            label: 'Favqulodda raqamlar',
            fields: [
                ['ico', 'Ikonka (emoji)'],
                ['num', 'Raqam'],
                ['name.uz', 'Nomi (uz)'],
                ['name.en', 'Name (en)']
            ],
            blank: () => ({ ico: '🆘', num: '', name: { uz: '', en: '' } }),
            title: (it) => ((it.num || '') + ' — ' + ((it.name && it.name.uz) || ''))
        },
        facts: {
            label: 'Faktlar',
            fields: [
                ['ico', 'Ikonka (emoji)'],
                ['label.uz', 'Nom (uz)'],
                ['label.en', 'Label (en)'],
                ['value.uz', 'Qiymat (uz)'],
                ['value.en', 'Value (en)']
            ],
            blank: () => ({ ico: '⭐', label: { uz: '', en: '' }, value: { uz: '', en: '' } }),
            title: (it) => ((it.label && it.label.uz) || '')
        },
        holidays: {
            label: 'Bayramlar',
            fields: [
                ['d.uz', 'Sana (uz)'],
                ['d.en', 'Date (en)'],
                ['n.uz', 'Nomi (uz)'],
                ['n.en', 'Name (en)']
            ],
            blank: () => ({ d: { uz: '', en: '' }, n: { uz: '', en: '' } }),
            title: (it) => ((it.d && it.d.uz) || '')
        },
        newcomerSteps: {
            label: 'Yangi kelganlar (qadamlar)',
            fields: [
                ['ico', 'Ikonka (emoji)'],
                ['title.uz', 'Sarlavha (uz)'],
                ['title.en', 'Title (en)'],
                ['text.uz', 'Matn (uz)'],
                ['text.en', 'Text (en)'],
                ['__links', 'Havolalar — har satr bitta: nom | havola']
            ],
            blank: () => ({ ico: '🧭', title: { uz: '', en: '' }, text: { uz: '', en: '' }, links: [] }),
            title: (it) => ((it.title && it.title.uz) || '')
        },
        phrases: {
            label: 'Iboralar',
            fields: [
                ['uz', "O'zbekcha"],
                ['en', 'English']
            ],
            blank: () => ({ uz: '', en: '' }),
            title: (it) => (it.uz || '')
        }
    };

    const state = {
        owner: '',
        repo: '',
        token: '',
        data: null,
        sha: null,
        current: 'services'
    };

    /* ---------- Yordamchilar ---------- */
    function api(path, opts) {
        opts = opts || {};
        opts.headers = Object.assign(
            { Authorization: 'Bearer ' + state.token, Accept: 'application/vnd.github+json' },
            opts.headers || {}
        );
        return fetch('https://api.github.com' + path, opts);
    }

    function b64e(str) { return btoa(unescape(encodeURIComponent(str))); }
    function b64d(b64) { return decodeURIComponent(escape(atob(String(b64).replace(/\s/g, '')))); }

    function getPath(obj, path) {
        return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
    }
    function setPath(obj, path, val) {
        const keys = path.split('.');
        let o = obj;
        for (let i = 0; i < keys.length - 1; i++) {
            if (o[keys[i]] == null) o[keys[i]] = {};
            o = o[keys[i]];
        }
        o[keys[keys.length - 1]] = val;
    }

    function esc(str) {
        return String(str == null ? '' : str).replace(/[&<>"']/g, (c) => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[c]));
    }

    function setLoginStatus(msg, cls) {
        const el = $('#loginStatus');
        el.textContent = msg || '';
        el.className = 'adm-status' + (cls ? ' ' + cls : '');
    }
    function setSaveStatus(msg, cls) {
        const el = $('#saveStatus');
        el.textContent = msg || '';
        el.className = 'st adm-status' + (cls ? ' ' + cls : '');
    }

    /* ---------- Qulf (nik + parol) ---------- */
    const LOCK_HASH = '59c5d385';

    function lockHash(s) {
        let h = 5381;
        for (let r = 0; r < 64; r++) {
            for (let i = 0; i < s.length; i++) {
                h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
            }
            h = (h ^ (r * 0x9E3779B1)) >>> 0;
        }
        return h.toString(16);
    }

    function setLockStatus(msg, cls) {
        const el = $('#lockStatus');
        el.textContent = msg || '';
        el.className = 'adm-status' + (cls ? ' ' + cls : '');
    }

    function unlock() {
        const nick = $('#nickInput').value.trim();
        const pass = $('#passInput').value;
        if (lockHash(nick + ':' + pass) === LOCK_HASH) {
            sessionStorage.setItem('fo-lock', '1');
            $('#lockCard').style.display = 'none';
            $('#loginCard').style.display = '';
            setLockStatus('');
        } else {
            setLockStatus('Nik yoki parol xato', 'err');
        }
    }

    /* ---------- Kirish ---------- */
    async function login() {
        state.owner = $('#ownerInput').value.trim() || 'foydalioyna';
        state.repo = $('#repoInput').value.trim() || 'foydalioyna.github.io';
        state.token = $('#tokenInput').value.trim();
        if (!state.token) { setLoginStatus('Token kiritilishi shart', 'err'); return; }
        setLoginStatus('Tekshirilmoqda...');
        $('#loginBtn').disabled = true;
        try {
            const res = await api('/repos/' + state.owner + '/' + state.repo);
            if (res.status === 401) throw new Error('Token xato yoki muddati tugagan');
            if (res.status === 403) throw new Error("Token'da 'repo' ruxsati yo'q");
            if (!res.ok) throw new Error('Repo topilmadi (' + res.status + ')');
            localStorage.setItem('fo-admin', JSON.stringify({ owner: state.owner, repo: state.repo, token: state.token }));
            await load();
        } catch (e) {
            setLoginStatus(e.message || 'Xatolik', 'err');
        }
        $('#loginBtn').disabled = false;
    }

    /* ---------- Yuklash ---------- */
    async function load() {
        setLoginStatus("Ma'lumotlar yuklanmoqda...");
        try {
            const res = await api('/repos/' + state.owner + '/' + state.repo + '/contents/data.json');
            if (res.status === 404) {
                // data.json repoda yo'q — saytdan o'qib olamiz
                const local = await fetch('data.json', { cache: 'no-store' });
                state.data = local.ok ? await local.json() : {};
                state.sha = null;
            } else if (!res.ok) {
                throw new Error('data.json yuklanmadi (' + res.status + ')');
            } else {
                const j = await res.json();
                state.sha = j.sha;
                state.data = JSON.parse(b64d(j.content));
            }
            if (!state.data || typeof state.data !== 'object') state.data = {};
            $('#loginCard').style.display = 'none';
            $('#panel').style.display = '';
            $('#repoBadge').textContent = state.owner + '/' + state.repo;
            render();
            setLoginStatus('');
        } catch (e) {
            setLoginStatus(e.message || 'Xatolik', 'err');
        }
    }

    /* ---------- Chizish ---------- */
    function render() {
        // Tablar
        const tabs = $('#tabs');
        tabs.innerHTML = '';
        Object.keys(SCHEMA).forEach((key) => {
            const b = document.createElement('button');
            b.className = 'adm-tab' + (state.current === key ? ' active' : '');
            b.textContent = SCHEMA[key].label + ' (' + ((state.data[key] || []).length) + ')';
            b.addEventListener('click', () => { state.current = key; render(); });
            tabs.appendChild(b);
        });

        // Bo'lim ro'yxati
        const sch = SCHEMA[state.current];
        if (!Array.isArray(state.data[state.current])) state.data[state.current] = [];
        const arr = state.data[state.current];
        const items = $('#items');
        items.innerHTML = '';

        arr.forEach((item, idx) => {
            const card = document.createElement('div');
            card.className = 'adm-item';

            const head = document.createElement('div');
            head.className = 'adm-item-head';
            const ttl = document.createElement('span');
            ttl.className = 'ttl';
            ttl.textContent = (idx + 1) + '. ' + (sch.title(item) || '—');
            head.appendChild(ttl);

            const up = document.createElement('button');
            up.textContent = '↑';
            up.title = 'Yuqoriga';
            up.addEventListener('click', () => { if (idx > 0) { arr.splice(idx - 1, 0, arr.splice(idx, 1)[0]); render(); } });
            head.appendChild(up);

            const down = document.createElement('button');
            down.textContent = '↓';
            down.title = 'Pastga';
            down.addEventListener('click', () => { if (idx < arr.length - 1) { arr.splice(idx + 1, 0, arr.splice(idx, 1)[0]); render(); } });
            head.appendChild(down);

            const del = document.createElement('button');
            del.textContent = '🗑';
            del.className = 'del';
            del.title = "O'chirish";
            del.addEventListener('click', () => { arr.splice(idx, 1); render(); });
            head.appendChild(del);

            card.appendChild(head);

            const grid = document.createElement('div');
            grid.className = 'adm-grid';

            sch.fields.forEach(([fpath, flabel]) => {
                const wrap = document.createElement('label');
                wrap.className = 'adm-field';
                const span = document.createElement('span');
                span.textContent = flabel;
                wrap.appendChild(span);

                if (fpath === '__links') {
                    const ta = document.createElement('textarea');
                    ta.className = 'adm-input full';
                    const links = Array.isArray(item.links) ? item.links : [];
                    ta.value = links.map((l) => (l.label || '') + ' | ' + (l.url || '')).join('\n');
                    ta.addEventListener('input', () => {
                        item.links = ta.value.split('\n')
                            .map((line) => line.trim())
                            .filter(Boolean)
                            .map((line) => {
                                const i = line.indexOf('|');
                                if (i < 0) return { label: line, url: line };
                                return { label: line.slice(0, i).trim(), url: line.slice(i + 1).trim() };
                            });
                        ttl.textContent = (idx + 1) + '. ' + (sch.title(item) || '—');
                    });
                    wrap.classList.add('full');
                    wrap.appendChild(ta);
                } else {
                    const inp = document.createElement('input');
                    inp.className = 'adm-input';
                    inp.value = getPath(item, fpath) == null ? '' : getPath(item, fpath);
                    inp.addEventListener('input', () => {
                        setPath(item, fpath, inp.value);
                        ttl.textContent = (idx + 1) + '. ' + (sch.title(item) || '—');
                    });
                    if (fpath === 'url' || fpath.indexOf('text.') === 0) wrap.classList.add('full');
                    wrap.appendChild(inp);
                }
                grid.appendChild(wrap);
            });

            card.appendChild(grid);
            items.appendChild(card);
        });

        $('#addBtn').textContent = '+ ' + sch.label + " ga yangi qator qo'shish";
    }

    /* ---------- Saqlash ---------- */
    async function save() {
        const btn = $('#saveBtn');
        btn.disabled = true;
        setSaveStatus('Saqlanmoqda...');
        try {
            const json = JSON.stringify(state.data, null, 4) + '\n';
            const body = { message: 'Admin panel: ma\'lumotlar yangilandi', content: b64e(json) };
            if (state.sha) body.sha = state.sha;
            const res = await api('/repos/' + state.owner + '/' + state.repo + '/contents/data.json', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if (res.status === 401) throw new Error('Token xato yoki muddati tugagan');
            if (res.status === 403) throw new Error("Token'da 'repo' ruxsati yo'q yoki limit tugagan");
            if (res.status === 409) throw new Error('Konflikt — boshqa o\'zgarish bor, sahifani yangilab qayta urinib ko\'ring');
            if (!res.ok) throw new Error('Saqlanmadi (' + res.status + ')');
            const j = await res.json();
            state.sha = j.content.sha;
            setSaveStatus("Saqlandi! Sayt 1-2 daqiqada yangilanadi.", 'ok');
        } catch (e) {
            setSaveStatus(e.message || 'Xatolik', 'err');
        }
        btn.disabled = false;
    }

    /* ---------- Chiqish ---------- */
    function logout() {
        localStorage.removeItem('fo-admin');
        sessionStorage.removeItem('fo-lock');
        state.token = '';
        state.data = null;
        state.sha = null;
        $('#panel').style.display = 'none';
        $('#loginCard').style.display = 'none';
        $('#lockCard').style.display = '';
        $('#tokenInput').value = '';
        setLoginStatus('');
    }

    /* ---------- Hodisalar ---------- */
    $('#unlockBtn').addEventListener('click', unlock);
    $('#passInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') unlock(); });
    $('#nickInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') $('#passInput').focus(); });
    $('#loginBtn').addEventListener('click', login);
    $('#tokenInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') login(); });
    $('#saveBtn').addEventListener('click', save);
    $('#logoutBtn').addEventListener('click', logout);
    $('#addBtn').addEventListener('click', () => {
        const sch = SCHEMA[state.current];
        if (!Array.isArray(state.data[state.current])) state.data[state.current] = [];
        state.data[state.current].push(sch.blank());
        render();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });

    /* ---------- Avtokirish ---------- */
    (function () {
        if (sessionStorage.getItem('fo-lock') !== '1') return;
        $('#lockCard').style.display = 'none';
        $('#loginCard').style.display = '';
        try {
            const saved = JSON.parse(localStorage.getItem('fo-admin') || 'null');
            if (saved && saved.token) {
                $('#ownerInput').value = saved.owner || 'foydalioyna';
                $('#repoInput').value = saved.repo || 'foydalioyna.github.io';
                $('#tokenInput').value = saved.token;
                login();
            }
        } catch (e) { /* ignore */ }
    })();
})();
