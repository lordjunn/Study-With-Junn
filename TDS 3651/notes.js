document.addEventListener("DOMContentLoaded", () => {

    const config = document.getElementById("header-config");

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