document.addEventListener("DOMContentLoaded", () => {

    const config = document.getElementById("header-config");
    if (!config) return;

    const prev = config.dataset.prev;
    const next = config.dataset.next;
    const baseName = config.dataset.name || "Notes ";

    const navContainer = document.getElementById("lecture-nav");

    let html = "";

    if (prev && prev.toLowerCase() !== "x") {
        html += `
            <a class="nav-btn" href="${baseName}${prev}.html">
                ← Previous (${baseName}${prev})
            </a>
        `;
    }

    if (next && next.toLowerCase() !== "x") {
        html += `
            <a class="nav-btn" href="${baseName}${next}.html">
                Next (${baseName}${next}) →
            </a>
        `;
    }

    navContainer.innerHTML = html;
});

async function loadAllLectures() {
    const root = document.getElementById("lectures");

    const config = document.getElementById("lecture-config");

    const files = config
        .dataset.files
        .split(",")
        .map(f => f.trim());

    for (const file of files) {

        const response = await fetch(file);
        if (!response.ok) continue;

        const html = await response.text();

        const doc = new DOMParser().parseFromString(html, "text/html");

        const container = doc.querySelector(".container");

        if (container) {
            root.appendChild(container);
        }
    }
}

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

loadAllLectures();
ensureThemeToggle('../js/theme.js');