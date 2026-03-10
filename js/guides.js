(function() {
    var container = document.getElementById('guidesContainer');
    var empty = document.getElementById('guidesEmpty');
    if (!container) return;

    fetch('json/guides.json')
        .then(function(r) { return r.json(); })
        .then(function(data) {
            var items = data.items || [];
            var categories = data.categories || ['Roles', 'Digimon', 'Dungeons'];
            var defaultImg = data.defaultImage || 'images/oddysey_logo.png';

            var byCategory = {};
            categories.forEach(function(cat) { byCategory[cat] = []; });
            items.forEach(function(it, idx) {
                if ((it.title || '').trim().toUpperCase() === 'WIP') return;
                it._idx = idx;
                var cat = it.category || 'Other';
                if (!byCategory[cat]) byCategory[cat] = [];
                byCategory[cat].push(it);
            });
            var visibleCount = items.reduce(function(n, it) { return n + ((it.title || '').trim().toUpperCase() === 'WIP' ? 0 : 1); }, 0);
            if (visibleCount === 0) {
                empty.style.display = 'block';
                return;
            }

            categories.forEach(function(cat) {
                var list = byCategory[cat];
                if (!list || list.length === 0) return;

                var section = document.createElement('section');
                section.className = 'guide-section';
                section.innerHTML = '<h2 class="guide-section-title">' + cat + '</h2><div class="guide-cards"></div>';
                var cardsEl = section.querySelector('.guide-cards');

                list.forEach(function(it) {
                    var imgSrc = it.image || defaultImg;
                    var a = document.createElement('a');
                    a.className = 'guide-card';
                    a.href = 'guide.html#' + it._idx;
                    a.innerHTML = '<img class="guide-card-image" src="' + imgSrc + '" alt="" onerror="this.onerror=null;this.src=\'' + defaultImg + '\'">' +
                        '<div class="guide-card-body">' +
                        '<div class="guide-card-title">' + (it.title || '') + '</div>' +
                        '<div class="guide-card-desc">' + (it.excerpt || '') + '</div>' +
                        '</div>';
                    cardsEl.appendChild(a);
                });

                container.appendChild(section);
            });
        })
        .catch(function() { empty.style.display = 'block'; });
})();
