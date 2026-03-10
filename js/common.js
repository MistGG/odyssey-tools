(function() {
    function toggleTheme() {
        var b = document.body;
        var n = b.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        b.setAttribute('data-theme', n);
        try { localStorage.setItem('dmo_tour_theme', n); } catch (e) {}
        updateThemeIcon(n);
    }
    function updateThemeIcon(t) {
        var i = document.getElementById('themeIcon');
        if (!i) return;
        i.innerHTML = t === 'light'
            ? '<path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>'
            : '<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>';
    }
    function toggleSidebar() {
        var sidebar = document.getElementById('sidebar');
        var main = document.querySelector('.main-wrapper');
        if (!sidebar || !main) return;
        var isCollapsed = sidebar.classList.toggle('collapsed');
        main.classList.toggle('sidebar-collapsed', isCollapsed);
        try { localStorage.setItem('dmo_sidebar_collapsed', isCollapsed ? '1' : '0'); } catch (e) {}
    }
    function openSidebar() {
        var sidebar = document.getElementById('sidebar');
        var main = document.querySelector('.main-wrapper');
        if (sidebar) sidebar.classList.remove('collapsed');
        if (main) main.classList.remove('sidebar-collapsed');
        try { localStorage.setItem('dmo_sidebar_collapsed', '0'); } catch (e) {}
    }
    window.toggleTheme = toggleTheme;
    window.updateThemeIcon = updateThemeIcon;
    window.toggleSidebar = toggleSidebar;
    window.openSidebar = openSidebar;

    function applySavedState() {
        try {
            var theme = localStorage.getItem('dmo_tour_theme') || 'dark';
            document.body.setAttribute('data-theme', theme);
            updateThemeIcon(theme);
            if (localStorage.getItem('dmo_sidebar_collapsed') === '1') {
                var sidebar = document.getElementById('sidebar');
                var main = document.querySelector('.main-wrapper');
                if (sidebar) sidebar.classList.add('collapsed');
                if (main) main.classList.add('sidebar-collapsed');
            }
        } catch (e) {}
    }
    document.addEventListener('DOMContentLoaded', function() {
        var toggleBtn = document.getElementById('sidebarToggle');
        var openFab = document.getElementById('sidebarOpenFab');
        if (toggleBtn) toggleBtn.addEventListener('click', toggleSidebar);
        if (openFab) openFab.addEventListener('click', openSidebar);
        applySavedState();
    });
})();
