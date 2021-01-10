import attrs from './config/attrs';
import events from './config/events';
import check from './utils/check';
import getElements from './utils/get-elements';
import markAs from './utils/mark-as';
import load from './loads';
import { Options, RootElement } from './types';

// -----------------------------------------------------------------------------
// Private
// -----------------------------------------------------------------------------

const _defaultOptions: Options = {
	rootMargin: '0px',
	threshold: 0,
	clearSourceAttrs: false,
	setSourcesOnlyOnLoad: true
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
							load(element, options);
						} else {
							observer.unobserve(element);
							load(element, options);
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
					load(element, options);
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
				load(element, loadOptions);
			}
		}
	};
}
