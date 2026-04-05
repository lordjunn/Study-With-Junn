function ensureThemeToggle(scriptPath) {
  if (typeof window.initThemeToggle === 'function') {
    window.initThemeToggle();
    return;
  }

  if (document.querySelector('script[data-theme-toggle="true"]')) {
    return;
  }

  const script = document.createElement('script');
  script.src = scriptPath;
  script.dataset.themeToggle = 'true';
  document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", function() {
    const configElement = document.getElementById('header-config');
  
    const config = {
      title: configElement.getAttribute('data-title'),
      navLinks: JSON.parse(configElement.getAttribute('data-menu-links'))
    };
  
    function generateHeader(config) {
      return `
        <header id="top">
          <nav>
            <div class="logo-holder">
              <a href="index.html">Study with Lord Junn</a>
            </div>
            <div class="title">${config.title}</div>
            <button class="menu-toggle" aria-label="Toggle menu">
              ☰
            </button>
            <ul class="dropdown">
              ${config.navLinks.map(link => {
                if (link.href) {
                  return `<li class="${link.text === 'Back to home' ? 'show-on-mobile' : ''}">
                            <a href="${link.href}">${link.text}</a>
                          </li>`;
                } else {
                  return `<li>${link.text}</li>`;
                }
              }).join('')}
            </ul>
          </nav>
        </header>
      `;
    }
  
    // Inject header
    document.getElementById('header-container').innerHTML = generateHeader(config);
  
    // Now that header is injected, safely bind event listeners
    const menuToggle = document.querySelector('.menu-toggle');
    const dropdownMenu = document.querySelector('.dropdown');
  
    menuToggle.addEventListener('click', function() {
      dropdownMenu.classList.toggle('show');
    });

    ensureThemeToggle('js/theme.js');

  });
  