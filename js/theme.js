(function () {
    const THEME_STORAGE_KEY = 'theme';
    const DARK_THEME = 'dark';

    function isDarkThemeEnabled() {
        return document.documentElement.getAttribute('data-theme') === DARK_THEME;
    }

    function applySavedTheme() {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme === DARK_THEME) {
            document.documentElement.setAttribute('data-theme', DARK_THEME);
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        return savedTheme === DARK_THEME;
    }

    function updateButtonState(button, isDark) {
        button.innerHTML = isDark ? '☀️' : '🌙';
        button.classList.toggle('is-dark', isDark);
        button.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    }

    function createOrGetToggleButton() {
        let button = document.getElementById('dark-mode-toggle');
        if (button) {
            return button;
        }

        button = document.createElement('button');
        button.id = 'dark-mode-toggle';
        button.className = 'theme-toggle';
        button.setAttribute('aria-label', 'Toggle dark mode');
        button.type = 'button';
        document.body.appendChild(button);
        return button;
    }

    function initThemeToggle() {
        const button = createOrGetToggleButton();
        const darkEnabled = applySavedTheme();
        updateButtonState(button, darkEnabled);

        if (button.dataset.themeBound === 'true') {
            return;
        }

        button.addEventListener('click', function () {
            const darkModeActive = isDarkThemeEnabled();
            const nextDarkModeState = !darkModeActive;

            if (nextDarkModeState) {
                document.documentElement.setAttribute('data-theme', DARK_THEME);
                localStorage.setItem(THEME_STORAGE_KEY, DARK_THEME);
            } else {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem(THEME_STORAGE_KEY, 'light');
            }

            updateButtonState(button, nextDarkModeState);
        });

        button.dataset.themeBound = 'true';
    }

    window.initThemeToggle = initThemeToggle;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initThemeToggle, { once: true });
    } else {
        initThemeToggle();
    }
})();