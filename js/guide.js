(function() {
    var layout = document.getElementById('guideDetailLayout');
    var notFound = document.getElementById('guideNotFound');
    var imgEl = document.getElementById('guideDetailImage');
    var titleEl = document.getElementById('guideDetailTitle');
    var bodyEl = document.getElementById('guideDetailBody');

    function getIndex() {
        var hash = window.location.hash || '';
        var m = hash.match(/^#(\d+)$/);
        return m ? parseInt(m[1], 10) : -1;
    }

    function revealGuide() {
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                document.body.classList.remove('guide-loading');
            });
        });
    }

    function render() {
        var idx = getIndex();
        if (idx < 0) {
            layout.style.display = 'none';
            notFound.style.display = 'block';
            revealGuide();
            return;
        }
        fetch('json/guides.json')
            .then(function(r) { return r.json(); })
            .then(function(data) {
                var items = data.items || [];
                var defaultImg = data.defaultImage || 'images/oddysey_logo.png';
                if (idx >= items.length) {
                    layout.style.display = 'none';
                    notFound.style.display = 'block';
                    revealGuide();
                    return;
                }
                var g = items[idx];
                if ((g.title || '').trim().toUpperCase() === 'WIP') {
                    layout.style.display = 'none';
                    notFound.style.display = 'block';
                    revealGuide();
                    return;
                }
                layout.style.display = 'flex';
                notFound.style.display = 'none';
                var imgSrc = g.image || defaultImg;
                imgEl.src = imgSrc;
                imgEl.onerror = function() { this.onerror = null; this.src = defaultImg; };
                document.title = (g.title || 'Guide') + ' | DM:Odyssey Tools';
                titleEl.textContent = g.title || '';
                if (g.body) {
                    bodyEl.innerHTML = typeof marked !== 'undefined' ? marked.parse(g.body) : g.body.replace(/\n/g, '<br>');
                    bodyEl.classList.add('has-markdown');
                } else {
                    bodyEl.textContent = g.excerpt || 'No content yet.';
                    bodyEl.classList.remove('has-markdown');
                }
                revealGuide();
            })
            .catch(function() {
                layout.style.display = 'none';
                notFound.style.display = 'block';
                revealGuide();
            });
    }

    window.addEventListener('hashchange', render);
    render();
})();
