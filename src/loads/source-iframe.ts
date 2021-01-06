import { Options } from '../types';

export default function (
	element: HTMLElement,
	resource: string,
	{ setSourcesOnlyOnLoad }: Options,
	loadActions: (loadEvent: Event, resource?: string | undefined) => void,
	errorActions: (errorEvent: ErrorEvent, resource?: string | undefined) => void
): void {
	if (setSourcesOnlyOnLoad) {
		const iframe = document.createElement('iframe');
		iframe.addEventListener('error', (event) => errorActions(event, resource));
		iframe.addEventListener('load', (event) => {
			if (element instanceof HTMLIFrameElement) {
				element.src = resource;
				element.removeAttribute('srcdoc');
			} else {
				element.appendChild(iframe);
			}
			loadActions(event, resource);
		});
		iframe.src = resource;
	} else {
		if (element instanceof HTMLIFrameElement) {
			element.addEventListener('error', (event) => errorActions(event, resource));
			element.addEventListener('load', (event) => loadActions(event, resource), {
				once: true
			});
			element.src = resource;
			element.removeAttribute('srcdoc');
		} else {
			const iframe = document.createElement('iframe');
			iframe.addEventListener('error', (event) => errorActions(event, resource));
			iframe.addEventListener(
				'load',
				(event) => {
					element.appendChild(iframe);
					loadActions(event, resource);
				},
				{ once: true }
			);
			iframe.src = resource;
		}
	}
}
