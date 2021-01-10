import markAs from '../utils/mark-as';
import attrs from '../config/attrs';
import events from '../config/events';
import check from '../utils/check';
import sanitizeAttrs from '../utils/sanitize-attrs';
import loadSourceImg from './source-img';
import loadSourceBgImg from './source-bg-img';
import loadSourceIframe from './source-iframe';
import loadSourcePicture from './source-picture';
import { Options } from '../types';

export default function (element: Element, options: Options, asPromise?: boolean) {
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
			if (options.onFail !== undefined) {
				options.onFail(element, resource);
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
}
