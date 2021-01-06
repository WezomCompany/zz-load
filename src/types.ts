export interface Options {
	rootMargin?: string;
	threshold?: number;
	clearSourceAttrs?: boolean;
	setSourcesOnlyOnLoad?: boolean;
	onProcess?(element: Element, resource?: string): void;
	onLoad?(element: Element, resource?: string): void;
	onError?(element: Element, resource?: string): void;
}

export type RootElement = string | Element | NodeList | JQuery;
