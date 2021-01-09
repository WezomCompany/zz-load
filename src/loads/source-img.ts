import attrs from '../config/attrs';
import { Options } from '../types';

export default function (
	element: HTMLImageElement,
	resource: string,
	{ setSourcesOnlyOnLoad }: Options,
	loadActions: (loadEvent: Event, resource?: string | undefined) => void,
	errorActions: (errorEvent: ErrorEvent, resource?: string | undefined) => void
): void {
	const srcset = element.getAttribute(attrs.sourceSrcSet);
	if (setSourcesOnlyOnLoad) {
		const img = document.createElement('img');
		img.addEventListener('error', (event) => errorActions(event, resource));
		img.addEventListener('load', (event) => {
			if (srcset) {
				element.srcset = srcset;
			}
			element.src = resource;
			loadActions(event, resource);
		});
		if (srcset) {
			img.srcset = srcset;
		}
		img.src = resource;
	} else {
		element.addEventListener('error', (event) => errorActions(event, resource));
		element.addEventListener(
			'load',
			(event) => {
				loadActions(event, resource);
			},
			{
				once: true
			}
		);
		if (srcset) {
			element.srcset = srcset;
		}
		element.src = resource;
	}
}
