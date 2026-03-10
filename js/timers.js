/* Requires js/common.js for toggleSidebar, openSidebar */

var tours = [
    { id: 'shellmon', name: "Shellmon", map: "Forest of Beginning", buff: "SK Buff", type: "hourly", offset: 0, liveDuration: 360, label: "Spiral Tour", lClass: "label-spiral", category: "spiral" },
    { id: 'gerbemon', name: "Gerbemon", map: "Forest of Marionette", buff: "TA Buff", type: "hourly", offset: 6, liveDuration: 360, label: "Spiral Tour", lClass: "label-spiral", category: "spiral" },
    { id: 'megadramon', name: "Megadramon", map: "Metal Empire", buff: "AA Buff", type: "hourly", offset: 12, liveDuration: 360, label: "Spiral Tour", lClass: "label-spiral", category: "spiral" },
    { id: 'ladydevimon', name: "LadyDevimon", map: "Nightmare Top", buff: "SUP Buff", type: "hourly", offset: 18, liveDuration: 360, label: "Spiral Tour", lClass: "label-spiral", category: "spiral" },
    { id: 'orochimon', name: "Orochimon", map: "Forest", buff: "Goggle farming", type: "interval", interval: 90, refMinute: 1175, liveDuration: 100, label: "Forest Tour", lClass: "label-forest", category: "forest" },
    { id: 'mugendramon', name: "Mugendramon", map: "Forest", buff: "Goggle farming", type: "interval", interval: 90, refMinute: 1177, liveDuration: 100, label: "Forest Tour", lClass: "label-forest", category: "forest" },
    { id: 'chaosdramon', name: "Chaosdramon", map: "Forest", buff: "Goggle farming", type: "interval", interval: 90, refMinute: 1178.6667, liveDuration: 100, label: "Forest Tour", lClass: "label-forest", category: "forest" },
    { id: 'banchouleomon', name: "BanchouLeomon", map: "Forest", buff: "Goggle farming", type: "interval", interval: 90, refMinute: 1181, liveDuration: 100, label: "Forest Tour", lClass: "label-forest", category: "forest" },
    { id: 'beelzebumon_1', name: "Beelzebumon", map: "Forest", buff: "Goggle farming", type: "interval", interval: 90, refMinute: 1183, liveDuration: 100, label: "Forest Tour", lClass: "label-forest", category: "forest" },
    { id: 'megidramon', name: "Megidramon", map: "Forest", buff: "Goggle farming", type: "interval", interval: 90, refMinute: 1184.6667, liveDuration: 100, label: "Forest Tour", lClass: "label-forest", category: "forest" },
    { id: 'beelzebumon_2', name: "Beelzebumon", map: "Forest", buff: "Goggle farming", type: "interval", interval: 90, refMinute: 1187, liveDuration: 100, label: "Forest Tour", lClass: "label-forest", category: "forest" },
    { id: 'zhuqiaomon', name: "Zhuqiaomon", map: "Forest", buff: "Goggle farming", type: "interval", interval: 90, refMinute: 1189, liveDuration: 100, label: "Forest Tour", lClass: "label-forest", category: "forest" },
    { id: 'tokyo_myotismon_1', name: "Myotismon", map: "Big Sight", buff: "Digivice Farming", type: "interval", interval: 90, refMinute: 1376, liveDuration: 180, label: "Tokyo Tour", lClass: "label-tokyo", rotation: 'standard', category: "tokyo", timing: 'special' },
    { id: 'tokyo_darktyrannomon', name: "DarkTyrannomon", map: "Big Sight", buff: "Digivice Farming", type: "interval", interval: 90, refMinute: 1381, liveDuration: 180, label: "Tokyo Tour", lClass: "label-tokyo", rotation: 'reverse', category: "tokyo", timing: 'special' },
    { id: 'tokyo_groundramon', name: "Groundramon and Okuwamon", map: "Odaiba", buff: "Digivice Farming", type: "interval", interval: 90, refMinute: 1386, liveDuration: 180, label: "Tokyo Tour", lClass: "label-tokyo", rotation: 'standard', category: "tokyo", timing: 'standard' },
    { id: 'tokyo_myotismon_2', name: "Myotismon", map: "Minato City", buff: "Digivice Farming", type: "interval", interval: 90, refMinute: 1391, liveDuration: 180, label: "Tokyo Tour", lClass: "label-tokyo", rotation: 'standard', category: "tokyo", timing: 'standard' },
    { id: 'tokyo_myotismon_3', name: "Myotismon", map: "Shibuya", buff: "Digivice Farming", type: "interval", interval: 90, refMinute: 1396, liveDuration: 180, label: "Tokyo Tour", lClass: "label-tokyo", rotation: 'standard', category: "tokyo", timing: 'standard' },
    { id: 'tokyo_phantomon', name: "Phantomon", map: "Shibuya", buff: "Digivice Farming", type: "interval", interval: 90, refMinute: 1401, liveDuration: 180, label: "Tokyo Tour", lClass: "label-tokyo", rotation: 'reverse', category: "tokyo", timing: 'standard' },
    { id: 'tokyo_raremon', name: "Raremon", map: "Shibuya", buff: "Digivice Farming", type: "interval", interval: 90, refMinute: 1406, liveDuration: 180, label: "Tokyo Tour", lClass: "label-tokyo", rotation: 'standard', category: "tokyo", timing: 'standard' },
    { id: 'tokyo_mammothmon', name: "Mammothmon", map: "Valley of Light", buff: "Digivice Farming", type: "interval", interval: 90, refMinute: 1411, liveDuration: 180, label: "Tokyo Tour", lClass: "label-tokyo", rotation: 'standard', category: "tokyo", timing: 'standard' },
    { id: 'tokyo_aquilamon', name: "Aquilamon", map: "Valley of Light", buff: "Digivice Farming", type: "interval", interval: 90, refMinute: 1416, liveDuration: 180, label: "Tokyo Tour", lClass: "label-tokyo", rotation: 'reverse', category: "tokyo", timing: 'standard' }
];

var specialEvents = [];

var lastToursData = [];
var lastEventData = [];
var wakeLock = null;
var effectInterval = null;

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
document.addEventListener('click', function() { if (audioCtx.state === 'suspended') audioCtx.resume(); }, false);

setInterval(function() {
    if (audioCtx.state === 'running') {
        var buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.1, audioCtx.sampleRate);
        var data = buffer.getChannelData(0);
        for (var i = 0; i < data.length; i++) data[i] = Math.random() * 0.01;
        var source = audioCtx.createBufferSource();
        source.buffer = buffer;
        var gain = audioCtx.createGain();
        gain.gain.value = 0.00001;
        source.connect(gain); gain.connect(audioCtx.destination);
        source.start();
    }
}, 15000);

var workerCode = 'var timer = null; self.onmessage = function(e) { if (e.data === "start") { timer = setInterval(function() { self.postMessage("tick"); }, 1000); } };';
var blob = new Blob([workerCode], { type: 'application/javascript' });
var worker = new Worker(URL.createObjectURL(blob));
worker.onmessage = function() { update(); };
worker.postMessage('start');

function playBeep() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    var startTime = audioCtx.currentTime;
    [0, 0.25, 0.5].forEach(function(delay) {
        var osc = audioCtx.createOscillator();
        var gain = audioCtx.createGain();
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, startTime + delay);
        gain.gain.setValueAtTime(0.5, startTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + delay + 0.2);
        osc.start(startTime + delay);
        osc.stop(startTime + delay + 0.2);
    });
}

function openSettings() { document.getElementById('settingsOverlay').style.display = 'flex'; }
function closeSettings(e) { if (e.target.id === 'settingsOverlay') e.target.style.display = 'none'; }

function saveSettings() {
    var s = {
        spiral: document.getElementById('notifySpiral').checked,
        forest: document.getElementById('notifyForest').checked,
        tokyo: document.getElementById('notifyTokyo').checked,
        event: document.getElementById('notifyEvent').checked,
        leadTime: parseInt(document.getElementById('leadTime').value, 10) || 1,
        wakeLock: document.getElementById('wakeLock').checked,
        showSpiral: document.getElementById('showSpiral').checked,
        showForest: document.getElementById('showForest').checked,
        showTokyo: document.getElementById('showTokyo').checked,
        showEvent: document.getElementById('showEvent').checked,
        enableEffects: document.getElementById('enableEffects').checked
    };
    localStorage.setItem('dmo_tour_settings', JSON.stringify(s));
    update();
}

function loadData() {
    var s = JSON.parse(localStorage.getItem('dmo_tour_settings') || '{}');
    document.getElementById('notifySpiral').checked = s.spiral !== false;
    document.getElementById('notifyForest').checked = s.forest !== false;
    document.getElementById('notifyTokyo').checked = s.tokyo !== false;
    document.getElementById('notifyEvent').checked = s.event !== false;
    document.getElementById('leadTime').value = s.leadTime || 1;
    document.getElementById('wakeLock').checked = !!s.wakeLock;
    document.getElementById('showSpiral').checked = s.showSpiral !== false;
    document.getElementById('showForest').checked = s.showForest !== false;
    document.getElementById('showTokyo').checked = s.showTokyo !== false;
    document.getElementById('showEvent').checked = s.showEvent !== false;
    document.getElementById('enableEffects').checked = s.enableEffects !== false;
    document.body.setAttribute('data-theme', 'dark');
}

function getNextSpawn(tour) {
    var now = new Date();
    var nowTotalSec = (now.getUTCHours() * 3600) + (now.getUTCMinutes() * 60) + now.getUTCSeconds();
    if (tour.type === "hourly") {
        var offsetSec = tour.offset * 60;
        var targetSec = (now.getUTCHours() * 3600) + offsetSec;
        if (nowTotalSec >= targetSec) targetSec += 3600;
        return (targetSec - nowTotalSec + 86400) % 86400;
    }
    var intervalSec = tour.interval * 60;
    var refSec = (tour.refMinute * 60) % 86400;
    var diff = nowTotalSec - refSec;
    var intervalsCount = Math.ceil(diff / intervalSec);
    var nextSec = refSec + (intervalsCount * intervalSec);
    while (nextSec <= nowTotalSec) nextSec += intervalSec;
    return (nextSec - nowTotalSec + 86400) % 86400;
}

function formatTime(seconds) {
    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);
    return (h > 0 ? h + ":" : "") + String(m).padStart(2, '0') + ":" + String(s).padStart(2, '0');
}

function renderCard(t, extraClass) {
    extraClass = extraClass || "";
    var buffText = t.isLive && t.label === 'Special Event' ? 'Collect your pass!' : (t.buff && t.buff !== "No Buff" ? t.buff : "");
    return '<div class="boss-card ' + (t.isLive ? 'active ' + extraClass : (t.timeLeft < 900 ? 'upcoming' : '')) + '"><div class="boss-info"><span class="tour-label ' + t.lClass + '">' + t.label + '</span><div class="boss-name">' + t.name + '</div><div class="boss-map">' + t.map + '</div>' + (buffText ? '<div class="boss-buff">' + buffText + '</div>' : '') + '</div><div class="timer-container"><div class="timer">' + formatTime(t.isLive ? t.liveRemaining : t.timeLeft) + '</div>' + (t.isLive && t.channel ? '<div class="channel-indicator">' + t.channel + '</div>' : '') + '</div></div>';
}

function update() {
    var now = new Date();
    var sTime = document.getElementById('serverTime');
    if (sTime) sTime.innerText = now.toUTCString().split(' ')[4];
    var leadSec = (parseInt(document.getElementById('leadTime').value, 10) || 1) * 60;
    var vis = {
        spiral: document.getElementById('showSpiral').checked,
        forest: document.getElementById('showForest').checked,
        tokyo: document.getElementById('showTokyo').checked,
        event: document.getElementById('showEvent').checked
    };
    var effectsEnabled = document.getElementById('enableEffects').checked;

    function processItems(itemList) {
        return itemList.filter(function(item) { return vis[item.category]; }).map(function(t) {
            var timeLeft = getNextSpawn(t);
            var interval = t.type === 'hourly' ? 3600 : t.interval * 60;
            var offsetAdjustment = (t.category === 'tokyo' && t.timing === 'special') ? 10 : 0;
            var elapsed = (interval - timeLeft + offsetAdjustment) % interval;
            var isLive = elapsed < t.liveDuration;
            var channel = null;
            if (isLive) {
                if (t.label === 'Spiral Tour') {
                    if (elapsed < 90) channel = "ch 0";
                    else if (elapsed < 120) channel = "Swap to Ch 1";
                    else if (elapsed < 210) channel = "ch 1";
                    else if (elapsed < 240) channel = "Swap to Ch 2";
                    else if (elapsed < 330) channel = "ch 2";
                    else channel = "Finished";
                } else if (t.label === 'Tokyo Tour') {
                    var seq = t.rotation === 'reverse' ? ["ch 2", "ch 1", "ch 0"] : ["ch 0", "ch 1", "ch 2"];
                    var cycleIndex = Math.floor(elapsed / 60);
                    var innerElapsed = elapsed % 60;
                    if (t.timing === 'special') {
                        if (innerElapsed < 35) channel = seq[cycleIndex];
                        else if (cycleIndex < 2) channel = "Swap to " + seq[cycleIndex + 1];
                        else channel = "Finished";
                    } else {
                        if (cycleIndex < 3) channel = seq[cycleIndex];
                        else channel = "Finished";
                    }
                }
            }
            return Object.assign({}, t, { timeLeft: timeLeft, isLive: isLive, liveRemaining: isLive ? (t.liveDuration - elapsed) : 0, channel: channel });
        });
    }

    var tourData = processItems(tours);
    var eventData = processItems(specialEvents);

    var ogPassLive = eventData.some(function(e) { return e.id === 'ogpass' && e.isLive; });
    var rain = document.getElementById('eventRainContainer');
    var shine = document.getElementById('eventShineOverlay');
    if (ogPassLive && effectsEnabled) {
        rain.style.display = 'block'; shine.style.opacity = '1';
        if (!effectInterval) effectInterval = setInterval(function() {
            var p = document.createElement('img'); p.src = 'images/pass.png'; p.className = 'falling-pass';
            p.style.left = (Math.random() * 100) + 'vw'; p.style.animationDuration = (5 + Math.random() * 10) + 's';
            p.style.width = (20 + Math.random() * 20) + 'px'; rain.appendChild(p);
            setTimeout(function() { if (p.parentNode) rain.removeChild(p); }, 15000);
        }, 800);
    } else {
        if (rain) { rain.style.display = 'none'; rain.innerHTML = ''; }
        if (shine) shine.style.opacity = '0';
        if (effectInterval) { clearInterval(effectInterval); effectInterval = null; }
    }

    function checkNotify(current, previousList, settingKey, onlyBossId) {
        var el = document.getElementById(settingKey);
        if (!el || !el.checked) return;
        var prev = previousList.find(function(p) { return p.id === current.id; });
        if (prev && prev.timeLeft > leadSec && current.timeLeft <= leadSec && current.timeLeft > 0) {
            if (!onlyBossId || current.id === onlyBossId) playBeep();
        }
    }
    tourData.forEach(function(t) {
        if (t.category === 'spiral') checkNotify(t, lastToursData, 'notifySpiral', 'shellmon');
        if (t.category === 'forest') checkNotify(t, lastToursData, 'notifyForest', 'orochimon');
        if (t.category === 'tokyo') checkNotify(t, lastToursData, 'notifyTokyo', 'tokyo_myotismon_1');
    });
    eventData.forEach(function(e) { checkNotify(e, lastEventData, 'notifyEvent'); });
    lastToursData = tourData; lastEventData = eventData;

    var liveItems = tourData.filter(function(t) { return t.isLive; });
    var upcomingItems = tourData.filter(function(t) { return !t.isLive && t.timeLeft < 900; }).sort(function(a, b) { return a.timeLeft - b.timeLeft; });
    var spiralSched = tourData.filter(function(t) { return t.category === 'spiral' && !t.isLive; }).sort(function(a, b) { return a.timeLeft - b.timeLeft; });
    var forestSched = tourData.filter(function(t) { return t.category === 'forest' && !t.isLive; }).sort(function(a, b) { return a.timeLeft - b.timeLeft; });
    var tokyoSched = tourData.filter(function(t) { return t.category === 'tokyo' && !t.isLive; }).sort(function(a, b) { return a.timeLeft - b.timeLeft; });

    document.getElementById('liveList').innerHTML = liveItems.map(function(t) { return renderCard(t); }).join('') || '<div class="empty-msg">None Active</div>';
    document.getElementById('upcomingList').innerHTML = upcomingItems.map(function(t) { return renderCard(t); }).join('') || '<div class="empty-msg">Clear</div>';
    document.getElementById('eventList').innerHTML = eventData.map(function(e) { return renderCard(e, 'event-active'); }).join('') || '<div class="empty-msg">None Active</div>';
    document.getElementById('spiralScheduleList').innerHTML = spiralSched.map(function(t) { return renderCard(t); }).join('');
    document.getElementById('forestScheduleList').innerHTML = forestSched.map(function(t) { return renderCard(t); }).join('');
    document.getElementById('tokyoScheduleList').innerHTML = tokyoSched.map(function(t) { return renderCard(t); }).join('');
    document.getElementById('spiralScheduleSection').style.display = vis.spiral ? 'block' : 'none';
    document.getElementById('forestScheduleSection').style.display = vis.forest ? 'block' : 'none';
    document.getElementById('tokyoScheduleSection').style.display = vis.tokyo ? 'block' : 'none';
    document.getElementById('eventSection').style.display = (eventData.length > 0 && vis.event) ? 'block' : 'none';
    document.getElementById('liveSection').style.display = (vis.spiral || vis.forest || vis.tokyo) ? 'block' : 'none';
}

document.querySelectorAll('input').forEach(function(input) { input.addEventListener('change', saveSettings); });
window.onload = function() { loadData(); update(); };
