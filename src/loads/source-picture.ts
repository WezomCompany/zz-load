import { Options } from '../types';
// import attrs from '../config/attrs';
import generateSources from '../utils/generate-sources';

export default function (
	picture: HTMLPictureElement,
	img: HTMLImageElement,
	resource: string,
	{ setSourcesOnlyOnLoad }: Options,
	loadActions: (loadEvent: Event, resource?: string | undefined) => void,
	errorActions: (errorEvent: ErrorEvent, resource?: string | undefined) => void
): void {
	const sources = generateSources(picture);
	if (setSourcesOnlyOnLoad) {
		const _picture = document.createElement('picture');
		const _img = document.createElement('img');
		_img.addEventListener('error', (event) => errorActions(event, resource));
		_img.addEventListener('load', (event) => {
			sources.forEach((source) => {
				picture.appendChild(source);
			});
			picture.appendChild(img);
			img.src = resource;
			loadActions(event, resource);
		});
		sources.forEach((source) => {
			_picture.appendChild(source.cloneNode());
		});
		_picture.appendChild(_img);
		_img.src = resource;
	} else {
		img.addEventListener('error', (event) => errorActions(event, resource));
		img.addEventListener(
			'load',
			(event) => {
				loadActions(event, resource);
			},
			{ once: true }
		);
		sources.forEach((source) => {
			picture.appendChild(source.cloneNode());
		});
		picture.appendChild(img);
		img.src = resource;
	}
}
