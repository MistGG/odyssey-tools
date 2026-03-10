(function renderUpdatesOnHome() {
    var list = document.getElementById('updatesList');
    if (!list) return;
    var thumbNews = 'images/oddysey_logo.png';
    var thumbGuides = 'images/oddysey_logo.png';
    Promise.all([fetch('json/news.json').then(function(r) { return r.json(); }), fetch('json/guides.json').then(function(r) { return r.json(); })])
        .then(function(results) {
            var newsData = results[0];
            var guidesData = results[1];
            thumbNews = newsData.defaultThumbnail || thumbNews;
            thumbGuides = guidesData.defaultImage || thumbGuides;
            var newsItems = newsData.items || [];
            var guideItems = guidesData.items || [];
            var combined = [];
            newsItems.forEach(function(it, i) {
                combined.push({
                    type: 'news',
                    dateSort: it.dateSort || '0000-01-01',
                    dateDisplay: it.date || '',
                    title: it.title || '',
                    excerpt: it.excerpt || '',
                    image: it.image || thumbNews,
                    href: 'news.html#article-' + i
                });
            });
            guideItems.forEach(function(g, j) {
                if ((g.title || '').trim().toUpperCase() === 'WIP') return;
                combined.push({
                    type: 'guide',
                    dateSort: g.date || '0000-01-01',
                    dateDisplay: g.date ? new Date(g.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
                    title: g.title || '',
                    excerpt: g.excerpt || '',
                    image: g.image || thumbGuides,
                    href: 'guide.html#' + j
                });
            });
            combined.sort(function(a, b) { return b.dateSort.localeCompare(a.dateSort); });
            var showCount = Math.min(10, combined.length);
            for (var k = 0; k < showCount; k++) {
                var u = combined[k];
                var imgSrc = u.image;
                var thumb = u.type === 'news' ? thumbNews : thumbGuides;
                var a = document.createElement('a');
                a.className = 'news-item updates-item';
                a.href = u.href;
                a.innerHTML = '<img class="news-item-thumb" src="' + imgSrc + '" alt="" onerror="this.onerror=null;this.src=\'' + thumb + '\'">' +
                    '<div class="news-item-body">' +
                    '<div class="news-item-meta">' +
                    '<span class="updates-type updates-type--' + u.type + '">' + (u.type === 'news' ? 'News' : 'Guide') + '</span>' +
                    (u.dateDisplay ? '<span class="news-item-date">' + u.dateDisplay + '</span>' : '') +
                    '</div>' +
                    '<div class="news-item-title">' + (u.title || '') + '</div>' +
                    '<div class="news-item-desc">' + (u.excerpt || '') + '</div>' +
                    '</div>';
                list.appendChild(a);
            }
        })
        .catch(function() {});
})();
