(function() {
    var p = typeof location !== 'undefined' && location.pathname;
    if (p) {
        var path = p.replace(/\/$/, '') || '/';
        var parts = path.split('/').filter(Boolean);
        var pageNames = ['news', 'guides', 'guide', 'timers'];
        var inSubfolder = parts.length > 1 || (parts.length === 1 && pageNames.indexOf(parts[0]) !== -1);
        window.DMO_BASE = inSubfolder ? '../' : '';
    } else {
        window.DMO_BASE = '';
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
    function isEditorAllowed() {
        try {
            if (typeof location === 'undefined') return false;
            var host = location.hostname || '';
            if (host === 'localhost' || host === '127.0.0.1') return true;
            if (localStorage.getItem('dmo_editor_access') === '1') return true;
        } catch (e) {}
        return false;
    }
    function applyEditorVisibility() {
        try {
            if (location.hash === '#editor-access') {
                localStorage.setItem('dmo_editor_access', '1');
                location.hash = '';
            }
            if (isEditorAllowed()) document.body.classList.add('dmo-editor-visible');
        } catch (e) {}
    }
    window.isEditorAllowed = isEditorAllowed;

    document.addEventListener('DOMContentLoaded', function() {
        var toggleBtn = document.getElementById('sidebarToggle');
        var openFab = document.getElementById('sidebarOpenFab');
        if (toggleBtn) toggleBtn.addEventListener('click', toggleSidebar);
        if (openFab) openFab.addEventListener('click', openSidebar);
        applySavedState();
        applyEditorVisibility();
    });
})();
