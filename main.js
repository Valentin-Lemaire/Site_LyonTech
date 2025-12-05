// ===== Menu Burger Toggle =====
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');

            // Animation du bouton burger
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Fermer le menu quand on clique sur un lien
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });

        // Fermer le menu quand on clique en dehors
        document.addEventListener('click', function (event) {
            const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // ===== Dark Mode Logic =====
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');

    // Default to LIGHT mode if nothing saved (ignore system preference as requested)
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    // Setup toggle button
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        // Set initial icon
        updateThemeIcon();

        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            // Apply new theme
            document.documentElement.setAttribute('data-theme', newTheme);
            // Save to localStorage so it applies to ALL pages
            localStorage.setItem('theme', newTheme);
            updateThemeIcon();
        });
    }

    function updateThemeIcon() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (themeBtn) {
            themeBtn.innerHTML = isDark
                ? '<svg viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.25 1.25c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.25 1.25c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-1.25-1.25zm1.41-10.96a.996.996 0 000 1.41l-1.25 1.25c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.25-1.25c.39-.39.39-1.02 0-1.41a.996.996 0 00-1.41 0zM7.25 18.21a.996.996 0 00-1.41 0l-1.25 1.25c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.25-1.25c.39-.39.39-1.02 0-1.41z"/></svg>' // Sun
                : '<svg viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>'; // Moon
        }
    }

    // ===== Navigation Active Link =====
    // Déterminer la page actuelle basée sur l'URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        // Retirer le chemin et garder seulement le nom du fichier
        const linkPage = linkHref.split('/').pop();

        // Marquer le lien comme actif si c'est la page actuelle
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ===== Smooth Scroll pour les ancres =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Ne pas appliquer le smooth scroll si c'est juste "#"
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===== Formulaire de contact (démonstration) =====
    // ===== Formulaire de contact (Firebase) =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Envoi en cours...';
            btn.disabled = true;

            // Récupérer les valeurs
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                timestamp: new Date()
            };

            try {
                // Import dynamique pour ne pas charger Firebase sur toutes les pages
                const { db, collection, addDoc } = await import('./js/firebase-config.js');

                await addDoc(collection(db, "contacts"), formData);

                alert('Merci ! Votre message a bien été envoyé à notre équipe.');
                contactForm.reset();
            } catch (error) {
                console.error("Erreur d'envoi", error);
                alert("Oups, une erreur s'est produite. Veuillez réessayer.");
            } finally {
                btn.textContent = originalText;
                btn.disabled = false;
            }
        });
    }
});

