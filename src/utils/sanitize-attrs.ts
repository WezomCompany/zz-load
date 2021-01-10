import attrs from '../config/attrs';

export default function sanitizeAttrs(element: Element) {
	element.removeAttribute(attrs.sourceImg);
	element.removeAttribute(attrs.sourceSrcSet);
	element.removeAttribute(attrs.sourceSources);
	element.removeAttribute(attrs.sourceBgImg);
	element.removeAttribute(attrs.sourceImage);
	element.removeAttribute(attrs.sourceIframe);
	element.removeAttribute(attrs.sourceContainer);
	if (element instanceof HTMLPictureElement) {
		element.querySelectorAll('img').forEach((img) => {
			sanitizeAttrs(img);
		});
	}
}
