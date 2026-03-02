// Dark mode toggle - shared across all pages
(function() {
  // Apply saved theme immediately to prevent flash
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  document.addEventListener('DOMContentLoaded', function() {
    // Create toggle button
    const btn = document.createElement('button');
    btn.id = 'dark-mode-toggle';
    btn.setAttribute('aria-label', 'Toggle dark mode');
    btn.innerHTML = saved === 'dark' ? '☀️' : '🌙';
    
    // Style the button
    Object.assign(btn.style, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      border: '2px solid #8c00ff',
      background: saved === 'dark' ? '#1e293b' : '#fff',
      fontSize: '20px',
      cursor: 'pointer',
      zIndex: '99999',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      transition: 'background 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    });

    btn.addEventListener('click', function() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        btn.innerHTML = '🌙';
        btn.style.background = '#fff';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        btn.innerHTML = '☀️';
        btn.style.background = '#1e293b';
      }
    });

    document.body.appendChild(btn);
  });
})();
