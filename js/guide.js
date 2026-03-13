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
        fetch((window.DMO_BASE || '') + 'json/guides.json')
            .then(function(r) { return r.json(); })
            .then(function(data) {
                var items = data.items || [];
                var defaultImg = data.defaultImage || 'images/oddysey_logo.png';
                if (defaultImg && !defaultImg.startsWith('/') && !defaultImg.startsWith('http')) defaultImg = (window.DMO_BASE || '') + defaultImg.replace(/^\//, '');
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
                if (imgSrc && !imgSrc.startsWith('/') && !imgSrc.startsWith('http')) imgSrc = (window.DMO_BASE || '') + imgSrc.replace(/^\//, '');
                imgEl.src = imgSrc;
                imgEl.onerror = function() { this.onerror = null; this.src = defaultImg; };
                document.title = (g.title || 'Guide') + ' | DM:Odyssey Tools';
                titleEl.textContent = g.title || '';
                function setBody(html) {
                    bodyEl.innerHTML = html || g.excerpt || 'No content yet.';
                    bodyEl.classList.toggle('has-markdown', !!html);
                }
                if (g.bodyFile) {
                    fetch((window.DMO_BASE || '') + g.bodyFile)
                        .then(function(r) { return r.text(); })
                        .then(function(md) {
                            setBody(typeof marked !== 'undefined' ? marked.parse(md) : md.replace(/\n/g, '<br>'));
                        })
                        .catch(function() { setBody(g.excerpt || 'No content yet.'); });
                } else if (g.body) {
                    setBody(typeof marked !== 'undefined' ? marked.parse(g.body) : g.body.replace(/\n/g, '<br>'));
                } else {
                    setBody(g.excerpt || 'No content yet.');
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
