(function() {
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
    window.toggleSidebar = toggleSidebar;
    window.openSidebar = openSidebar;

    function applySavedState() {
        try {
            document.body.setAttribute('data-theme', 'dark');
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
