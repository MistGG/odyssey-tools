(function() {
    var newsItems = [];
    var cardImgDefault = 'images/oddysey_logo.png';

    function showArticle(index) {
        var content = document.getElementById('newsContent');
        var view = document.getElementById('newsArticleView');
        if (!content || !view || index < 0 || index >= newsItems.length) return;
        var it = newsItems[index];
        var cardImg = cardImgDefault;
        var imgSrc = it.image || cardImg;
        if (imgSrc && !imgSrc.startsWith('/') && !imgSrc.startsWith('http')) imgSrc = (window.DMO_BASE || '') + imgSrc.replace(/^\//, '');
        document.getElementById('newsArticleImage').src = imgSrc;
        document.getElementById('newsArticleImage').onerror = function() { this.onerror = null; this.src = cardImg; };
        document.getElementById('newsArticleDate').textContent = it.date || '';
        document.getElementById('newsArticleTitle').textContent = it.title || '';
        var bodyEl = document.getElementById('newsArticleBody');
        function setBody(html, isMarkdown) {
            bodyEl.innerHTML = html || it.excerpt || '';
            bodyEl.classList.toggle('has-html', !!html);
            bodyEl.classList.toggle('has-markdown', isMarkdown);
        }
        if (it.bodyFile) {
            fetch((window.DMO_BASE || '') + it.bodyFile)
                .then(function(r) { return r.text(); })
                .then(function(md) {
                    setBody(typeof marked !== 'undefined' ? marked.parse(md) : md.replace(/\n/g, '<br>'), true);
                })
                .catch(function() { setBody(it.excerpt || '', false); });
        } else if (it.body) {
            setBody(it.body, false);
        } else {
            setBody(it.excerpt || '', false);
        }
        content.classList.add('news-article-visible');
        view.setAttribute('aria-hidden', 'false');
    }

    function hideArticle() {
        var content = document.getElementById('newsContent');
        var view = document.getElementById('newsArticleView');
        if (content) content.classList.remove('news-article-visible');
        if (view) view.setAttribute('aria-hidden', 'true');
        if (window.location.hash) history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    function checkHash() {
        var hash = window.location.hash || '';
        var m = hash.match(/^#article-(\d+)$/);
        if (m && newsItems.length > 0) {
            var idx = parseInt(m[1], 10);
            if (idx >= 0 && idx < newsItems.length) showArticle(idx);
            else hideArticle();
        } else {
            hideArticle();
        }
    }

    var list = document.getElementById('newsList');
    var empty = document.getElementById('newsEmpty');
    var content = document.getElementById('newsContent');
    var main = document.getElementById('newsMain');
    if (!list) return;

    function revealNewsMain() {
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                document.body.classList.remove('news-loading');
            });
        });
    }

    document.getElementById('newsArticleBack').addEventListener('click', function(e) {
        e.preventDefault();
        hideArticle();
    });

    window.addEventListener('hashchange', checkHash);
    window.addEventListener('popstate', checkHash);

    fetch((window.DMO_BASE || '') + 'json/news.json')
        .then(function(r) { return r.json(); })
        .then(function(data) {
            var items = data.items || [];
            newsItems = items;
            cardImgDefault = data.defaultCardImage || cardImgDefault;
            var base = window.DMO_BASE || '';
            if (cardImgDefault && !cardImgDefault.startsWith('/') && !cardImgDefault.startsWith('http')) cardImgDefault = base + cardImgDefault.replace(/^\//, '');
            if (items.length === 0) {
                empty.style.display = 'block';
                if (content) content.style.display = 'none';
                revealNewsMain();
                return;
            }
            checkHash();
            list.innerHTML = '';
            var base = window.DMO_BASE || '';

            if (items.length >= 1) {
                var hero = items[0];
                var heroImg = hero.image || cardImgDefault;
                if (heroImg && !heroImg.startsWith('/') && !heroImg.startsWith('http')) heroImg = base + heroImg.replace(/^\//, '');
                var heroEl = document.createElement('a');
                heroEl.className = 'news-hero';
                heroEl.href = '#article-0';
                heroEl.setAttribute('data-index', 0);
                heroEl.innerHTML = '<div class="news-hero-inner">' +
                    '<div class="news-hero-img-wrap"><img src="' + heroImg + '" alt="" onerror="this.onerror=null;this.src=\'' + cardImgDefault + '\'"></div>' +
                    '<div class="news-hero-body">' +
                    '<div class="news-hero-date">' + (hero.date || '') + '</div>' +
                    '<h2 class="news-hero-title">' + (hero.title || '') + '</h2>' +
                    '<p class="news-hero-excerpt">' + (hero.excerpt || '') + '</p>' +
                    '</div></div>';
                heroEl.addEventListener('click', function(e) {
                    if (window.location.pathname.indexOf('/news') !== -1) {
                        e.preventDefault();
                        history.pushState(null, '', window.location.pathname + window.location.search + '#article-0');
                        showArticle(0);
                    }
                });
                list.appendChild(heroEl);
            }

            if (items.length > 1) {
                var restWrap = document.createElement('div');
                restWrap.className = 'news-list-rest';
                for (var i = 1; i < items.length; i++) {
                    var it = items[i];
                    var imgSrc = it.image || cardImgDefault;
                    if (imgSrc && !imgSrc.startsWith('/') && !imgSrc.startsWith('http')) imgSrc = base + imgSrc.replace(/^\//, '');
                    var a = document.createElement('a');
                    a.className = 'news-list-item';
                    a.href = '#article-' + i;
                    a.setAttribute('data-index', i);
                    a.innerHTML = '<div class="news-list-thumb"><img src="' + imgSrc + '" alt="" onerror="this.onerror=null;this.src=\'' + cardImgDefault + '\'"></div>' +
                        '<div class="news-list-body">' +
                        '<div class="news-list-date">' + (it.date || '') + '</div>' +
                        '<div class="news-list-title">' + (it.title || '') + '</div>' +
                        '<p class="news-list-excerpt">' + (it.excerpt || '') + '</p>' +
                        '</div>' +
                        '<span class="news-list-arrow">→</span>';
                    (function(idx) {
                        a.addEventListener('click', function(e) {
                            if (window.location.pathname.indexOf('/news') !== -1) {
                                e.preventDefault();
                                history.pushState(null, '', window.location.pathname + window.location.search + '#article-' + idx);
                                showArticle(idx);
                            }
                        });
                    })(i);
                    restWrap.appendChild(a);
                }
                list.appendChild(restWrap);
            }
            revealNewsMain();
        })
        .catch(function() {
            empty.style.display = 'block';
            revealNewsMain();
        });
})();
