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

    // ===== Dark Mode Logic (File Protocol Support) =====

    function getThemeFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('theme');
    }

    // 1. Check URL first (priority for file:// navigation), then LocalStorage
    const urlTheme = getThemeFromUrl();
    const localTheme = localStorage.getItem('theme');
    let currentTheme = urlTheme || localTheme || 'light';

    // Apply correctly
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); // Sync local storage for this file
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }

    // 2. Propagate Theme to Context (Links)
    function propagateThemeToLinks(theme) {
        // Update all internal links to carry the theme param
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            try {
                const href = link.getAttribute('href');
                if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.includes('http')) return;

                // Construct new URL logic
                // Remove existing query params to avoid accumulation ?theme=dark&theme=dark
                const urlParts = href.split('?');
                const baseUrl = urlParts[0];

                // If it's just an anchor link on same page, skip
                if (baseUrl === '') return;

                link.setAttribute('href', `${baseUrl}?theme=${theme}`);
            } catch (e) {
                console.warn('Error updating link:', e);
            }
        });
    }

    // Setup toggle button
    const themeBtn = document.getElementById('theme-toggle');

    // Init Visuals
    if (themeBtn) updateThemeIcon(currentTheme === 'dark');
    propagateThemeToLinks(currentTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isNowDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const newTheme = isNowDark ? 'light' : 'dark';

            // Apply
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // UI
            updateThemeIcon(newTheme === 'dark');

            // Propagate
            propagateThemeToLinks(newTheme);

            // Update current URL without reload (for UX)
            const newUrl = new URL(window.location);
            newUrl.searchParams.set('theme', newTheme);
            window.history.replaceState({}, '', newUrl);
        });
    }

    function updateThemeIcon(isDark) {
        if (!themeBtn) return;
        themeBtn.innerHTML = isDark
            ? '<svg viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.25 1.25c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.25 1.25c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-1.25-1.25zm1.41-10.96a.996.996 0 000 1.41l-1.25 1.25c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.25-1.25c.39-.39.39-1.02 0-1.41a.996.996 0 00-1.41 0zM7.25 18.21a.996.996 0 00-1.41 0l-1.25 1.25c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.25-1.25c.39-.39.39-1.02 0-1.41z"/></svg>' // Sun
            : '<svg viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>'; // Moon
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

    // ===== Fin Main JS =====
});

