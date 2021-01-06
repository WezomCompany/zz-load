import { Options } from '../types';

export default function (
	picture: HTMLPictureElement,
	img: HTMLImageElement,
	resource: string,
	{ setSourcesOnlyOnLoad }: Options,
	loadActions: (loadEvent: Event, resource?: string | undefined) => void,
	errorActions: (errorEvent: ErrorEvent, resource?: string | undefined) => void
): void {
	console.log(picture, img);
}
