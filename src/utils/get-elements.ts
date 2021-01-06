import { RootElement } from '../types';

const isJQuery = (element: any): element is JQuery => !!(element && element.jquery);

export default function (element: RootElement) {
	if (element instanceof window.Element) {
		return [element];
	} else if (isJQuery(element)) {
		return element.toArray().filter((element) => element instanceof Element);
	} else {
		const nodeList =
			typeof element === 'string' ? document.querySelectorAll(element) : element;
		const elements: Element[] = [];
		nodeList.forEach((node) => {
			if (node instanceof Element) {
				elements.push(node);
			}
		});
		return elements;
	}
}
