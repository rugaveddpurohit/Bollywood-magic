// js/script.js
(() => {
    'use strict';

    // Theme toggle (simple)
    const themeToggleButtons = document.querySelectorAll('#theme-toggle');
    const root = document.documentElement;
    const saved = localStorage.getItem('theme');
    if (saved) root.setAttribute('data-theme', saved);

    function setTheme(name) {
        if (name) {
            root.setAttribute('data-theme', name);
            localStorage.setItem('theme', name);
        } else {
            root.removeAttribute('data-theme');
            localStorage.removeItem('theme');
        }
    }

    themeToggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            setTheme(current === 'dark' ? 'dark' : null);
            btn.setAttribute('aria-pressed', current === 'dark');
            btn.textContent = current === 'dark' ? 'Vaalea' : 'Tumma';
        });
    });

    document.getElementById("search").addEventListener("input", function() {
        const searchTerm = this.value.toLowerCase();
        const movieCards = document.querySelectorAll(".movie-card");
        movieCards.forEach(card => {
            const title = card.querySelector(".movie-title").textContent.toLowerCase();
            card.style.display = title.includes(searchTerm) ? "block" : "none";
        });
    });

    document.getElementById("perPage").addEventListener("change", function() {
        const perPageValue = parseInt(this.value);
        const movieCards = document.querySelectorAll(".movie-card");
        movieCards.forEach((card, index) => {
            card.style.display = index < perPageValue ? "block" : "none";
        });
    });

    // Simple client-side search for pages that include lists
    function wireSearch(inputId, gridId, itemSelector, textSelector) {
        const input = document.getElementById(inputId);
        const grid = document.getElementById(gridId);
        if (!input || !grid) return;
        input.addEventListener('input', () => {
            const q = input.value.trim().toLowerCase();
            const items = Array.from(grid.querySelectorAll(itemSelector));
            items.forEach(it => {
                const textElem = it.querySelector(textSelector);
                const txt = textElem ? textElem.textContent.toLowerCase() : it.textContent.toLowerCase();
                it.style.display = txt.includes(q) ? '' : 'none';
            });
        });
    }

    // Wire common searches
    wireSearch('movie-search', 'movies-grid', '.movie-card', '.movie-title');
    wireSearch('star-search', 'stars-grid', '.star-card', 'h3');

    // Per-page select (only hides/shows existing items)
    const perPage = document.getElementById('movies-per-page');
    if (perPage) {
        perPage.addEventListener('change', () => {
            const n = parseInt(perPage.value, 10) || 12;
            const grid = document.getElementById('movies-grid');
            if (!grid) return;
            const items = Array.from(grid.querySelectorAll('.movie-card'));
            items.forEach((it, idx) => it.style.display = idx < n ? '' : 'none');
        });
        // trigger initial
        perPage.dispatchEvent(new Event('change'));
    }

})();

