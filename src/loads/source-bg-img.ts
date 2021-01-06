import { Options } from '../types';

export default function (
	element: HTMLElement,
	resource: string,
	{ setSourcesOnlyOnLoad }: Options,
	loadActions: (loadEvent: Event, resource?: string | undefined) => void,
	errorActions: (errorEvent: ErrorEvent, resource?: string | undefined) => void
): void {
	const setSourceImmediately = setSourcesOnlyOnLoad !== true;
	const img = document.createElement('img');
	img.addEventListener('error', (event) => errorActions(event, resource));
	img.addEventListener('load', (event) => {
		if (setSourcesOnlyOnLoad) {
			element.style.backgroundImage = `url(${resource})`;
		}
		loadActions(event, resource);
	});
	img.src = resource;
	if (setSourceImmediately) {
		element.style.backgroundImage = `url(${resource})`;
	}
}
