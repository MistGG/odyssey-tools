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
        document.getElementById('newsArticleImage').src = imgSrc;
        document.getElementById('newsArticleImage').onerror = function() { this.onerror = null; this.src = cardImg; };
        document.getElementById('newsArticleDate').textContent = it.date || '';
        document.getElementById('newsArticleTitle').textContent = it.title || '';
        var bodyEl = document.getElementById('newsArticleBody');
        if (it.body) {
            bodyEl.innerHTML = it.body;
            bodyEl.classList.add('has-html');
        } else {
            bodyEl.textContent = it.excerpt || '';
            bodyEl.classList.remove('has-html');
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

    fetch('json/news.json')
        .then(function(r) { return r.json(); })
        .then(function(data) {
            var items = data.items || [];
            newsItems = items;
            cardImgDefault = data.defaultCardImage || cardImgDefault;
            if (items.length === 0) {
                empty.style.display = 'block';
                if (content) content.style.display = 'none';
                revealNewsMain();
                return;
            }
            checkHash();
            items.forEach(function(it, i) {
                var imgSrc = it.image || cardImgDefault;
                var a = document.createElement('a');
                a.className = 'news-card';
                a.href = 'news.html#article-' + i;
                a.setAttribute('data-index', i);
                a.innerHTML = '<img class="news-card-image" src="' + imgSrc + '" alt="" onerror="this.onerror=null;this.src=\'' + cardImgDefault + '\'">' +
                    '<div class="news-card-body">' +
                    '<div class="news-card-date">' + (it.date || '') + '</div>' +
                    '<div class="news-card-title">' + (it.title || '') + '</div>' +
                    '<div class="news-card-desc">' + (it.excerpt || '') + '</div>' +
                    '</div>';
                a.addEventListener('click', function(e) {
                    if (window.location.pathname.indexOf('news.html') !== -1 || window.location.href.indexOf('news.html') !== -1) {
                        e.preventDefault();
                        history.pushState(null, '', window.location.pathname + window.location.search + '#article-' + i);
                        showArticle(i);
                    }
                });
                list.appendChild(a);
            });
            revealNewsMain();
        })
        .catch(function() {
            empty.style.display = 'block';
            revealNewsMain();
        });
})();
