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

    // Dark mode toggle
    (function() {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
        const btn = document.createElement('button');
        btn.id = 'dark-mode-toggle';
        btn.setAttribute('aria-label', 'Toggle dark mode');
        btn.innerHTML = saved === 'dark' ? '☀️' : '🌙';
        Object.assign(btn.style, { position:'fixed', bottom:'20px', right:'20px', width:'45px', height:'45px', borderRadius:'50%', border:'2px solid #8c00ff', background: saved === 'dark' ? '#1e293b' : '#fff', fontSize:'20px', cursor:'pointer', zIndex:'99999', boxShadow:'0 2px 10px rgba(0,0,0,0.2)', transition:'background 0.3s ease', display:'flex', alignItems:'center', justifyContent:'center' });
        btn.addEventListener('click', function() {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) { document.documentElement.removeAttribute('data-theme'); localStorage.setItem('theme','light'); btn.innerHTML='🌙'; btn.style.background='#fff'; }
            else { document.documentElement.setAttribute('data-theme','dark'); localStorage.setItem('theme','dark'); btn.innerHTML='☀️'; btn.style.background='#1e293b'; }
        });
        document.body.appendChild(btn);
    })();

  });
  