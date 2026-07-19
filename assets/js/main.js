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
                status.textContent = 'Opening your email app to send this message to the school office...';
                status.classList.add('ok');
            }
        });
    }
});
