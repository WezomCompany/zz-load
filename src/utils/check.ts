import attrs from '../config/attrs';

export default function (element: Element, is: keyof typeof attrs) {
	return element.hasAttribute(attrs[is]);
}
