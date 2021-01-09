import sanitize from '../sanitize';
import attrs from '../../config/attrs';

describe('Should clean element', () => {
	const element = document.createElement('img');
	element.setAttribute(attrs.sourceImg, 'xxx');
	element.setAttribute(attrs.sourceSrcSet, 'xxx');
	element.setAttribute(attrs.sourceBgImg, 'xxx');
	element.setAttribute(attrs.sourceImage, 'xxx');
	element.setAttribute(attrs.sourceIframe, 'xxx');
	element.setAttribute(attrs.sourceContainer, 'xxx');

	test('By selector', () => {
		sanitize(element);
		expect(element.hasAttribute(attrs.sourceImg)).toBeFalsy();
		expect(element.hasAttribute(attrs.sourceSrcSet)).toBeFalsy();
		expect(element.hasAttribute(attrs.sourceBgImg)).toBeFalsy();
		expect(element.hasAttribute(attrs.sourceImage)).toBeFalsy();
		expect(element.hasAttribute(attrs.sourceIframe)).toBeFalsy();
		expect(element.hasAttribute(attrs.sourceContainer)).toBeFalsy();
	});
});
