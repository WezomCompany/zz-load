import attrs from '../config/attrs';

export default function (element: Element) {
	element.removeAttribute(attrs.sourceImg);
	element.removeAttribute(attrs.sourceSrcSet);
	element.removeAttribute(attrs.sourceBgImg);
	element.removeAttribute(attrs.sourceImage);
	element.removeAttribute(attrs.sourceIframe);
	element.removeAttribute(attrs.sourceContainer);
}
