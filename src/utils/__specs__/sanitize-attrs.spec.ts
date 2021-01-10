import sanitizeAttrs from '../sanitize-attrs';
import attrs from '../../config/attrs';

describe('Should clean element', () => {
	const picture = document.createElement('picture');
	picture.setAttribute(attrs.sourceImg, 'xxx');
	picture.setAttribute(attrs.sourceSrcSet, 'xxx');
	picture.setAttribute(attrs.sourceBgImg, 'xxx');
	picture.setAttribute(attrs.sourceImage, 'xxx');
	picture.setAttribute(attrs.sourceIframe, 'xxx');
	picture.setAttribute(attrs.sourceContainer, 'xxx');

	const img = document.createElement('img');
	img.setAttribute(attrs.sourceImg, 'yyy');
	picture.appendChild(img);

	sanitizeAttrs(picture);

	test('Should not have attrs', () => {
		expect(picture.hasAttribute(attrs.sourceImg)).toBeFalsy();
		expect(picture.hasAttribute(attrs.sourceSrcSet)).toBeFalsy();
		expect(picture.hasAttribute(attrs.sourceBgImg)).toBeFalsy();
		expect(picture.hasAttribute(attrs.sourceImage)).toBeFalsy();
		expect(picture.hasAttribute(attrs.sourceIframe)).toBeFalsy();
		expect(picture.hasAttribute(attrs.sourceContainer)).toBeFalsy();
	});

	test('Inner <img> element also should not have attrs', () => {
		const img = picture.querySelector('img');
		if (img !== null) {
			expect(img.hasAttribute(attrs.sourceImg)).toBeFalsy();
			expect(img.hasAttribute(attrs.sourceSrcSet)).toBeFalsy();
			expect(img.hasAttribute(attrs.sourceBgImg)).toBeFalsy();
			expect(img.hasAttribute(attrs.sourceImage)).toBeFalsy();
			expect(img.hasAttribute(attrs.sourceIframe)).toBeFalsy();
			expect(img.hasAttribute(attrs.sourceContainer)).toBeFalsy();
		}
	});
});
