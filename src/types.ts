export interface Options {
	rootMargin?: string;
	threshold?: number;
	clearSourceAttrs?: boolean;
	setSourcesOnlyOnLoad?: boolean;
	onProcess?(element: Element, resource?: string): void;
	onLoad?(element: Element, resource?: string): void;
	onFail?(element: Element, resource?: string): void;
}

export interface JQueryDuckTyping {
	jquery: string;
	toArray(): (HTMLElement | any)[];
}

export type RootElement = string | Element | Element[] | NodeList | JQueryDuckTyping;

export interface Observer {
	observe(): void;
	triggerLoad(triggerElements: RootElement, triggerOptions?: Options): void;
}
