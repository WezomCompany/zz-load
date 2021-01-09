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
	const eventDetail = detail ? { ...detail, element } : { element };
	element.dispatchEvent(createEvent(event, eventDetail));
}
