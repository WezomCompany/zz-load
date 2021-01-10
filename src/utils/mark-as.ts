import createEvent from './create-event';

export default function (
	element: Element,
	attr: string,
	event: string,
	detail?: { [p: string]: any },
	unMark?: boolean
) {
	if (unMark) {
		element.removeAttribute(attr);
	} else {
		element.setAttribute(attr, '');
	}
	element.dispatchEvent(
		createEvent(event, detail ? { ...detail, element } : { element })
	);
}
