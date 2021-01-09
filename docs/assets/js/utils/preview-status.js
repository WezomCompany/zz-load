'use strict';

(function () {
	var elements = document.querySelectorAll('.js-lazy-load');
	for (var i = 0; i < elements.length; i++) {
		each(elements[i]);
	}

	function each (element) {
		var parent = element.closest('.js-preview-status');
		if (parent === null) {
			return false;
		}
		var statusObserved = parent.querySelector('[data-status="observed"]');
		var statusProcessed = parent.querySelector('[data-status="processed"]');
		var statusLoaded = parent.querySelector('[data-status="loaded"]');
		var statusFailed = parent.querySelector('[data-status="failed"]');

		element.addEventListener('zzload:observed', function () {
			activate(statusObserved);
		});
		element.addEventListener('zzload:processed', function () {
			activate(statusProcessed);
		});
		element.addEventListener('zzload:loaded', function () {
			activate(statusLoaded);
		});
		element.addEventListener('zzload:failed', function () {
			activate(statusFailed);
		});
		element.addEventListener('zzload:in-view', function (event) {
			console.warn(element, 'INVIEW', event.detail.visible);
		});
	}

	function activate (statusElement) {
		if (statusElement !== null) {
			statusElement.classList.add('is-active');
		}
	}
})();
