import dataset from '../config/data-set';

export default function (element: HTMLPictureElement): HTMLSourceElement[] {
	try {
		const sourcesAttrs = JSON.parse(element.dataset[dataset.sourceSources] || '');
		if (Array.isArray(sourcesAttrs)) {
			return sourcesAttrs
				.filter(
					(attrs): attrs is Record<string, any> =>
						typeof attrs === 'object' &&
						attrs !== null &&
						!Array.isArray(attrs)
				)
				.map((attrs) => {
					const source = document.createElement('source');
					for (const attr in attrs) {
						if (attrs.hasOwnProperty(attr)) {
							source.setAttribute(attr, attrs[attr]);
						}
					}
					return source;
				});
		}
		return [];
	} catch (err) {
		console.log(err);
		return [];
	}
}
