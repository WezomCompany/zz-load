import attrs from './config/attrs';
import events from './config/events';
import check from './utils/check';
import getElements from './utils/get-elements';
import markAs from './utils/mark-as';
import sanitizeAttrs from './utils/sanitize-attrs';
import { Options, RootElement } from './types';
import loadSourceImg from './loads/source-img';
import loadSourceBgImg from './loads/source-bg-img';
import loadSourceIframe from './loads/source-iframe';
import loadSourcePicture from './loads/source-picture';

// -----------------------------------------------------------------------------
// Private
// -----------------------------------------------------------------------------

const _defaultOptions: Options = {
	rootMargin: '0px',
	threshold: 0,
	clearSourceAttrs: false,
	setSourcesOnlyOnLoad: true,
	onProcess: () => undefined,
	onLoad: () => undefined,
	onError: () => undefined
};

const _load = (element: Element, options: Options, asPromise?: boolean) => {
	const load = (
		resolve: (element: Element, resource?: string) => void,
		reject: (reason?: any) => void
	) => {
		markAs(element, attrs.processed, events.processed);
		if (options.onProcess !== undefined) {
			options.onProcess(element);
		}

		function loadActions(loadEvent?: Event, resource?: string): void {
			if (options.clearSourceAttrs && !check(element, 'inView')) {
				sanitizeAttrs(element);
			}
			markAs(element, attrs.loaded, events.loaded, { loadEvent, resource });
			if (options.onLoad !== undefined) {
				options.onLoad(element, resource);
			}
			resolve(element, resource);
		}

		function errorActions(errorEvent: ErrorEvent, resource?: string): void {
			markAs(element, attrs.failed, events.failed, { errorEvent, resource });
			if (options.onError !== undefined) {
				options.onError(element, resource);
			}
			reject(element);
		}

		// img
		const sourceImg = element.getAttribute(attrs.sourceImg);
		if (typeof sourceImg === 'string' && element instanceof HTMLImageElement) {
			loadSourceImg(element, sourceImg, options, loadActions, errorActions);
			return;
		}

		// style="background-image: url(...)"
		const sourceBgImg = element.getAttribute(attrs.sourceBgImg);
		if (typeof sourceBgImg === 'string' && element instanceof HTMLElement) {
			loadSourceBgImg(element, sourceBgImg, options, loadActions, errorActions);
			return;
		}

		// iframe
		const sourceIframe = element.getAttribute(attrs.sourceIframe);
		if (typeof sourceIframe === 'string' && element instanceof HTMLPictureElement) {
			loadSourceIframe(element, sourceIframe, options, loadActions, errorActions);
			return;
		}

		// picture
		if (element instanceof HTMLPictureElement) {
			const img = element.querySelector('img');
			if (img instanceof HTMLImageElement) {
				const sourceImg = img.getAttribute(attrs.sourceImg);
				if (typeof sourceImg === 'string') {
					loadSourcePicture(
						element,
						img,
						sourceImg,
						options,
						loadActions,
						errorActions
					);
					return;
				}
			}
		}

		// container
		if (element.hasAttribute(attrs.sourceContainer)) {
			loadActions();
			return;
		}

		console.log(element);
		console.log('▲ element has no zz-load source');
	};

	if (asPromise && window.Promise) {
		return new Promise((resolve, reject) => load(resolve, reject));
	} else {
		return load(
			() => undefined,
			() => undefined
		);
	}
};

// -----------------------------------------------------------------------------
// Public
// -----------------------------------------------------------------------------

export default function (elements: RootElement, userOptions: Options = {}) {
	const options = {
		..._defaultOptions,
		...userOptions
	};
	let observer: IntersectionObserver | null = null;

	if (window.IntersectionObserver) {
		observer = new window.IntersectionObserver(
			(
				entries: IntersectionObserverEntry[],
				observer: IntersectionObserver
			): void => {
				entries.forEach((entry) => {
					const element = entry.target;
					const inViewType = element.hasAttribute(attrs.sourceInview);

					if (entry.intersectionRatio > 0 || entry.isIntersecting) {
						if (inViewType) {
							markAs(element, attrs.inView, events.inView, {
								visible: true
							});
							_load(element, options);
						} else {
							observer.unobserve(element);
							_load(element, options);
						}
					} else {
						if (inViewType && check(element, 'inView')) {
							markAs(
								element,
								attrs.inView,
								events.inView,
								{ visible: false },
								true
							);
						}
					}
				});
			},
			{
				rootMargin: options.rootMargin,
				threshold: options.threshold
			}
		);
	}

	return {
		observe(): void {
			const list = getElements(elements);
			for (let i = 0; i < list.length; i++) {
				const element = list[i];
				if (check(element, 'observed')) {
					continue;
				}
				markAs(element, attrs.observed, events.observed);
				if (observer === null) {
					_load(element, options);
				} else {
					observer.observe(element);
				}
			}
		},
		triggerLoad(triggerElements: RootElement, triggerOptions: Options = {}): void {
			const list = getElements(elements);
			const loadOptions = {
				...options,
				...triggerOptions
			};
			for (let i = 0; i < list.length; i++) {
				const element = list[i];
				if (check(element, 'processed')) {
					continue;
				}
				markAs(element, attrs.observed, events.observed);
				_load(element, loadOptions);
			}
		}
	};
}
