import { JQueryDuckTyping, RootElement } from '../types';

const isJQuery = (element: any): element is JQueryDuckTyping =>
	!!(element && element.jquery);

export default function (element: RootElement): Element[] {
	if (element instanceof Element) {
		return [element];
	} else if (isJQuery(element)) {
		return element.toArray().filter((element) => element instanceof Element);
	} else {
		const nodeList =
			typeof element === 'string' ? document.querySelectorAll(element) : element;
		return Array.from(nodeList).filter(
			(node): node is Element => node instanceof Element
		);
	}
}
