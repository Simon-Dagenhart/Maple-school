// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('navToggle');
    var navList = document.getElementById('navList');
    if (toggle && navList) {
        toggle.addEventListener('click', function () {
            navList.classList.toggle('open');
        });
        navList.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navList.classList.remove('open');
            });
        });
    }

    // Footer year
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Language toggle (English/Arabic). Every translatable element carries
    // a data-ar="..." attribute holding its Arabic text right next to the
    // English text already in the HTML — applyLang() swaps between them
    // and caches the original English on first switch so it can restore it.
    // Elements with nested tags (e.g. a paragraph with a link inside) use
    // data-ar-html instead, which swaps innerHTML rather than textContent
    // so the nested markup survives the translation.
    var langToggle = document.getElementById('langToggle');
    if (langToggle) {
        var applyLang = function (lang) {
            document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';
            document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
            document.querySelectorAll('[data-ar]').forEach(function (el) {
                if (el.dataset.en === undefined) el.dataset.en = el.textContent;
                el.textContent = lang === 'ar' ? el.dataset.ar : el.dataset.en;
            });
            document.querySelectorAll('[data-ar-html]').forEach(function (el) {
                if (el.dataset.enHtml === undefined) el.dataset.enHtml = el.innerHTML;
                el.innerHTML = lang === 'ar' ? el.dataset.arHtml : el.dataset.enHtml;
            });
            document.querySelectorAll('[data-ar-placeholder]').forEach(function (el) {
                if (el.dataset.enPlaceholder === undefined) el.dataset.enPlaceholder = el.getAttribute('placeholder') || '';
                el.setAttribute('placeholder', lang === 'ar' ? el.dataset.arPlaceholder : el.dataset.enPlaceholder);
            });
            langToggle.textContent = lang === 'ar' ? 'English' : 'العربية';
            localStorage.setItem('learnittwisted-lang', lang);
        };

        applyLang(localStorage.getItem('learnittwisted-lang') || 'en');

        langToggle.addEventListener('click', function () {
            var current = document.documentElement.lang === 'ar' ? 'ar' : 'en';
            applyLang(current === 'ar' ? 'en' : 'ar');
        });
    }

    // Contact form -> mailto (static hosting has no server to receive submissions)
    var form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = form.querySelector('#cf-name').value.trim();
            var email = form.querySelector('#cf-email').value.trim();
            var childGrade = form.querySelector('#cf-grade').value;
            var message = form.querySelector('#cf-message').value.trim();
            var status = document.getElementById('formStatus');

            var subject = 'Website inquiry from ' + (name || 'a parent/guardian');
            var body = 'Name: ' + name + '\nEmail: ' + email + '\nGrade of interest: ' + childGrade + '\n\nMessage:\n' + message;
            var mailto = 'mailto:simonkazage007@gmail.com'
                + '?subject=' + encodeURIComponent(subject)
                + '&body=' + encodeURIComponent(body);

            window.location.href = mailto;
            if (status) {
                var lang = document.documentElement.lang === 'ar' ? 'ar' : 'en';
                status.textContent = lang === 'ar'
                    ? 'يتم فتح تطبيق البريد الإلكتروني لإرسال هذه الرسالة...'
                    : 'Opening your email app to send this message...';
                status.classList.add('ok');
            }
        });
    }
});
