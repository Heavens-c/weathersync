var isRDR = false;
var selectedWeather = "sunny";
var weatherGridReady = false;
var lastDay = 0;

var ICONS = {
	sunny: '<circle cx="12" cy="12" r="5" fill="#f0d49a"/><g stroke="#f0d49a" stroke-width="2" fill="none"><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.8 4.8l1.4 1.4M17.8 17.8l1.4 1.4M4.8 19.2l1.4-1.4M17.8 6.2l1.4-1.4"/></g>',
	highpressure: '<circle cx="12" cy="12" r="5" fill="#f0d49a"/><path d="M12 3v2M12 19v2M4 12H2M22 12h-2" stroke="#f0d49a" stroke-width="2" fill="none"/>',
	clouds: '<path d="M7 18h11a4 4 0 0 0 0-8 5.2 5.2 0 0 0-10.1-1.4A3.6 3.6 0 0 0 7 18z" fill="#d8dde4"/>',
	overcast: '<path d="M5 19h14a4 4 0 0 0 .2-8 5.5 5.5 0 0 0-10.4-1.6A4.2 4.2 0 0 0 5 19z" fill="#b7bfc8"/>',
	overcastdark: '<path d="M4 19h16a4 4 0 0 0 .1-8 6 6 0 0 0-11.2-1.7A4.4 4.4 0 0 0 4 19z" fill="#7d8793"/>',
	fog: '<path d="M4 8h16M3 12h18M5 16h14M6 20h12" stroke="#cbb7a0" stroke-width="2" fill="none" stroke-linecap="round"/>',
	misty: '<path d="M4 9h16M3 13h18M5 17h14" stroke="#cbb7a0" stroke-width="2" fill="none" stroke-linecap="round"/>',
	drizzle: '<path d="M6 13h11a3.6 3.6 0 0 0 0-7.2 4.8 4.8 0 0 0-9-1.3A3.2 3.2 0 0 0 6 13z" fill="#d8dde4"/><path d="M8 16v2M12 16v3M16 16v2" stroke="#8ec8ff" stroke-width="2" fill="none"/>',
	rain: '<path d="M6 13h11a3.6 3.6 0 0 0 0-7.2 4.8 4.8 0 0 0-9-1.3A3.2 3.2 0 0 0 6 13z" fill="#b7bfc8"/><path d="M8 16v3M12 16v3M16 16v3" stroke="#6aa7e8" stroke-width="2" fill="none"/>',
	shower: '<path d="M6 12h11a3.6 3.6 0 0 0 0-7.2 4.8 4.8 0 0 0-9-1.3A3.2 3.2 0 0 0 6 12z" fill="#b7bfc8"/><path d="M7 15v3M10 15v3M13 15v3M16 15v3" stroke="#6aa7e8" stroke-width="2" fill="none"/>',
	thunder: '<path d="M6 13h11a3.6 3.6 0 0 0 0-7.2 4.8 4.8 0 0 0-9-1.3A3.2 3.2 0 0 0 6 13z" fill="#7d8793"/><path d="M11 13l-1.4 4h3.2L11.4 21" fill="#f0d49a"/>',
	thunderstorm: '<path d="M5 13h13a3.8 3.8 0 0 0 0-7.5 5.2 5.2 0 0 0-9.8-1.5A3.6 3.6 0 0 0 5 13z" fill="#5f6772"/><path d="M11 13l-1.6 4.2h3.4L11.2 21" fill="#e08a3c"/>',
	snow: '<path d="M12 4v16M6 7.5l12 9M6 16.5l12-9" stroke="#e8eef6" stroke-width="1.8" fill="none"/><circle cx="12" cy="12" r="2" fill="#e8eef6"/>',
	snowlight: '<path d="M12 5v14M7 8l10 8M7 16l10-8" stroke="#d8dde4" stroke-width="1.6" fill="none"/>',
	hail: '<path d="M6 12h11a3.6 3.6 0 0 0 0-7.2 4.8 4.8 0 0 0-9-1.3A3.2 3.2 0 0 0 6 12z" fill="#b7bfc8"/><circle cx="8" cy="17" r="1.3" fill="#e8eef6"/><circle cx="12" cy="18" r="1.3" fill="#e8eef6"/><circle cx="16" cy="17" r="1.3" fill="#e8eef6"/>',
	sleet: '<path d="M6 12h11a3.6 3.6 0 0 0 0-7.2 4.8 4.8 0 0 0-9-1.3A3.2 3.2 0 0 0 6 12z" fill="#b7bfc8"/><path d="M9 16v3M14 15v3" stroke="#8ec8ff" stroke-width="2"/><circle cx="11.5" cy="19" r="1.1" fill="#e8eef6"/>',
	blizzard: '<path d="M3 8h18M2 12h20M4 16h16" stroke="#e8eef6" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M7 5l2 3M17 5l-2 3" stroke="#e8eef6" stroke-width="2"/>',
	groundblizzard: '<path d="M3 11h18M4 15h16M6 19h12" stroke="#cbb7a0" stroke-width="2" fill="none" stroke-linecap="round"/>',
	whiteout: '<circle cx="12" cy="12" r="8" fill="#e8eef6"/><path d="M5 12h14" stroke="#b7bfc8" stroke-width="2"/>',
	sandstorm: '<path d="M3 9c4 0 4 3 8 3s4-3 8-3M3 15c4 0 4-3 8-3s4 3 8 3" stroke="#d4af6a" stroke-width="2" fill="none" stroke-linecap="round"/>',
	hurricane: '<circle cx="12" cy="12" r="2.2" fill="#8ec8ff"/><path d="M12 4c5 1 8 4 7 8M12 20c-5-1-8-4-7-8" stroke="#8ec8ff" stroke-width="2" fill="none"/>'
};

var LABELS = {
	blizzard: 'Blizzard',
	clouds: 'Clouds',
	drizzle: 'Drizzle',
	fog: 'Fog',
	groundblizzard: 'Ground Blizzard',
	hail: 'Hail',
	highpressure: 'High Pressure',
	hurricane: 'Hurricane',
	misty: 'Misty',
	overcast: 'Overcast',
	overcastdark: 'Dark Overcast',
	rain: 'Rain',
	sandstorm: 'Sandstorm',
	shower: 'Shower',
	sleet: 'Sleet',
	snow: 'Snow',
	snowlight: 'Light Snow',
	sunny: 'Sunny',
	thunder: 'Thunder',
	thunderstorm: 'Thunderstorm',
	whiteout: 'Whiteout'
};

function iconSvg(type) {
	return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[type] || ICONS.clouds) + '</svg>';
}

function weatherLabel(type) {
	return LABELS[type] || type;
}

function pad2(n) {
	return String(n).padStart(2, '0');
}

function dayOfWeek(day) {
	return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day];
}

function minutesToClock(total) {
	var h = Math.floor(total / 60) % 24;
	var m = total % 60;
	return { h: h, m: m, text: pad2(h) + ':' + pad2(m) };
}

function updateSky(hour) {
	var sky = document.getElementById('vs-sky');
	var sun = document.getElementById('vs-sun');
	if (!sky || !sun) return;
	sky.classList.remove('is-night', 'is-dusk');
	if (hour < 6 || hour >= 21) sky.classList.add('is-night');
	else if (hour < 8 || hour >= 18) sky.classList.add('is-dusk');
	var t = hour / 24;
	sun.style.left = (8 + t * 76) + '%';
	sun.style.top = (8 + Math.abs(0.5 - t) * 50) + '%';
}

function toggleDisplay(e, display) {
	e.style.display = (e.style.display == display) ? 'none' : display;
}

function toggleForecast() {
	toggleDisplay(document.querySelector('#forecast'), 'table');
	toggleDisplay(document.querySelector('#sync'), 'block');
	toggleDisplay(document.querySelector('#altimeter'), 'block');
	toggleDisplay(document.querySelector('#wind'), 'block');
	if (isRDR) toggleDisplay(document.querySelector('#temperature'), 'block');
}

function updateForecast(data) {
	var f = document.querySelector('#forecast');
	var forecastData = JSON.parse(data.forecast);
	f.innerHTML = '';
	var prevDay;
	for (var i = 0; i < forecastData.length; ++i) {
		var hour = document.createElement('div');
		hour.className = 'forecast-hour';
		var day = document.createElement('div');
		day.className = 'forecast-day';
		if (forecastData[i].day != prevDay) {
			day.textContent = dayOfWeek(forecastData[i].day);
			prevDay = forecastData[i].day;
		}
		var time = document.createElement('div');
		time.className = 'forecast-time';
		time.textContent = forecastData[i].time;
		var weather = document.createElement('div');
		weather.className = 'forecast-weather';
		weather.textContent = forecastData[i].weather;
		var wind = document.createElement('div');
		wind.className = 'forecast-wind';
		wind.textContent = forecastData[i].wind;
		hour.appendChild(day);
		hour.appendChild(time);
		hour.appendChild(weather);
		hour.appendChild(wind);
		f.appendChild(hour);
	}
	document.querySelector('#temperature').textContent = data.temperature;
	document.querySelector('#wind').textContent = data.wind;
	document.getElementById('altitude-sea').textContent = data.altitudeSea;
	document.getElementById('altitude-terrain').textContent = data.altitudeTerrain;
	document.getElementById('sync-status').textContent = data.syncEnabled ? 'on' : 'off';
}

function buildWeatherGrid(types) {
	var grid = document.getElementById('weather-grid');
	if (!grid || weatherGridReady) return;
	types.forEach(function (type) {
		var label = document.createElement('label');
		label.className = 'desk-weather';
		label.title = weatherLabel(type);
		label.innerHTML = '<input type="checkbox" data-weather="' + type + '"><span class="desk-tile"><span class="desk-ico">' + iconSvg(type) + '</span><span class="desk-wname">' + weatherLabel(type) + '</span></span>';
		label.querySelector('input').addEventListener('change', function () {
			selectedWeather = type;
			markWeather(type);
		});
		grid.appendChild(label);
	});
	weatherGridReady = true;
}

function markWeather(type) {
	selectedWeather = type;
	document.querySelectorAll('#weather-grid input').forEach(function (box) {
		box.checked = box.dataset.weather === type;
	});
	var meta = document.getElementById('desk-meta');
	if (meta && type) meta.textContent = weatherLabel(type);
}

function currentTime() {
	var slider = document.getElementById('time-slider');
	return minutesToClock(parseInt(slider.value, 10) || 0);
}

function applyAll() {
	var clock = currentTime();
	var instantTime = document.getElementById('instant-time').checked;
	var instantWeather = document.getElementById('instant-weather').checked;
	fetch('https://' + GetParentResourceName() + '/setTime', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			day: lastDay,
			hour: clock.h,
			min: clock.m,
			sec: 0,
			transition: instantTime ? 0 : 5000,
			freeze: document.getElementById('time-freeze').checked
		})
	});
	fetch('https://' + GetParentResourceName() + '/setWeather', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			weather: selectedWeather,
			transition: instantWeather ? 0 : 5,
			freeze: document.getElementById('weather-freeze').checked,
			permanentSnow: document.getElementById('weather-permanent-snow').checked
		})
	});
	fetch('https://' + GetParentResourceName() + '/setWind', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			windSpeed: parseFloat(document.getElementById('wind-speed-slider').value),
			windDirection: parseFloat(document.getElementById('wind-dir-slider').value),
			freeze: document.getElementById('wind-freeze').checked
		})
	});
	fetch('https://' + GetParentResourceName() + '/setTimescale', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			timescale: parseFloat(document.getElementById('timescale-slider').value)
		})
	});
	fetch('https://' + GetParentResourceName() + '/setSyncDelay', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			syncDelay: parseInt(document.getElementById('sync-slider').value, 10)
		})
	});
	var save = document.getElementById('save-btn');
	var change = document.getElementById('change-btn');
	save.classList.add('is-busy');
	change.classList.add('is-busy');
	save.textContent = 'Applied';
	window.setTimeout(function () {
		save.classList.remove('is-busy');
		change.classList.remove('is-busy');
		save.textContent = 'Save Settings';
	}, 700);
}

function setTab(name) {
	document.querySelectorAll('.desk-tab').forEach(function (tab) {
		var on = tab.dataset.tab === name;
		tab.classList.toggle('is-on', on);
		tab.setAttribute('aria-selected', on ? 'true' : 'false');
	});
	document.querySelectorAll('.desk-page').forEach(function (page) {
		page.classList.toggle('is-on', page.dataset.page === name);
	});
	window.requestAnimationFrame(fitShell);
}

function formatSlider(id, value) {
	if (id === 'wind-dir-slider') return String(value) + '°';
	if (id === 'timescale-slider') return String(value) + 'x';
	if (id === 'sync-slider') return String(value) + ' ms';
	return String(value);
}

function paintNeedle(deg) {
	var needle = document.getElementById('wind-needle');
	if (needle) needle.style.transform = 'rotate(' + deg + 'deg)';
}

function bindSlider(id, labelId) {
	var el = document.getElementById(id);
	var label = document.getElementById(labelId);
	if (!el || !label) return;
	var paint = function () {
		label.textContent = formatSlider(id, el.value);
		if (id === 'wind-dir-slider') paintNeedle(parseInt(el.value, 10) || 0);
	};
	el.addEventListener('input', paint);
	paint();
}

function setSlider(id, labelId, value) {
	var el = document.getElementById(id);
	var label = document.getElementById(labelId);
	if (!el) return;
	if (document.activeElement !== el) el.value = String(value);
	if (label) label.textContent = formatSlider(id, el.value);
	if (id === 'wind-dir-slider') paintNeedle(parseInt(el.value, 10) || 0);
}

function fitShell() {
	var shell = document.querySelector('.shell');
	if (!shell) return;
	shell.style.zoom = 1;
	var pad = 24;
	var scale = Math.min(1, (window.innerWidth - pad) / shell.offsetWidth, (window.innerHeight - pad) / shell.offsetHeight);
	if (scale < 0.995) shell.style.zoom = String(Math.max(0.55, scale));
}

function openAdminUi() {
	var ui = document.querySelector('#admin-ui');
	ui.style.display = 'flex';
	ui.classList.add('is-open');
	ui.setAttribute('aria-hidden', 'false');
	window.requestAnimationFrame(fitShell);
}

function closeAdminUi() {
	var ui = document.querySelector('#admin-ui');
	ui.classList.remove('is-open');
	ui.style.display = 'none';
	ui.setAttribute('aria-hidden', 'true');
	fetch('https://' + GetParentResourceName() + '/closeAdminUi', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: '{}'
	});
}

function updateAdminUi(data) {
	var types = JSON.parse(data.weatherTypes);
	buildWeatherGrid(types);
	lastDay = parseInt(data.day, 10) || 0;
	var total = (parseInt(data.hour, 10) || 0) * 60 + (parseInt(data.min, 10) || 0);
	var slider = document.getElementById('time-slider');
	if (document.activeElement !== slider) slider.value = String(total);
	var clock = minutesToClock(parseInt(slider.value, 10));
	document.getElementById('vs-clock').textContent = clock.text;
	updateSky(clock.h);
	if (data.weather) {
		markWeather(data.weather);
		var meta = document.getElementById('desk-meta');
		if (meta) meta.textContent = weatherLabel(data.weather);
	}
	setSlider('wind-dir-slider', 'wind-dir-label', Math.round(data.windDirection || 0));
	setSlider('wind-speed-slider', 'wind-speed-label', Math.round(data.windSpeed || 0));
	setSlider('timescale-slider', 'timescale-label', Math.round(data.timescale || 30));
	setSlider('sync-slider', 'sync-label', Math.round(data.syncDelay || 5000));
	fitShell();
}

window.addEventListener('message', function (event) {
	switch (event.data.action) {
		case 'toggleForecast':
			toggleForecast();
			break;
		case 'updateForecast':
			updateForecast(event.data);
			break;
		case 'openAdminUi':
			openAdminUi();
			break;
		case 'updateAdminUi':
			updateAdminUi(event.data);
			break;
	}
});

window.addEventListener('load', function () {
	fetch('https://' + GetParentResourceName() + '/getGameName').then(function (r) { return r.json(); }).then(function (r) {
		isRDR = r.gameName == 'rdr3';
	});

	var slider = document.getElementById('time-slider');
	slider.addEventListener('input', function () {
		var clock = minutesToClock(parseInt(slider.value, 10));
		document.getElementById('vs-clock').textContent = clock.text;
		updateSky(clock.h);
	});

	document.querySelectorAll('.desk-tab').forEach(function (tab) {
		tab.addEventListener('click', function () { setTab(tab.dataset.tab); });
	});
	bindSlider('wind-dir-slider', 'wind-dir-label');
	bindSlider('wind-speed-slider', 'wind-speed-label');
	bindSlider('timescale-slider', 'timescale-label');
	bindSlider('sync-slider', 'sync-label');
	document.getElementById('save-btn').addEventListener('click', applyAll);
	document.getElementById('change-btn').addEventListener('click', applyAll);
	document.getElementById('admin-ui-close-btn').addEventListener('click', closeAdminUi);
	window.addEventListener('resize', fitShell);
});

window.addEventListener('keydown', function (event) {
	if (event.key === 'Escape') {
		var ui = document.querySelector('#admin-ui');
		if (ui && ui.classList.contains('is-open')) closeAdminUi();
	}
});
