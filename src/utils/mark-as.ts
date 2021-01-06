import createEvent from './create-event';

export default function (
	element: Element,
	attr: string,
	event: string,
	detail: { [p: string]: any } = {}
) {
	element.setAttribute(attr, 'true');
	element.dispatchEvent(createEvent(event, { ...detail, element }));
}
