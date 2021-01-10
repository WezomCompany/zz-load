import generateSources from '../generate-sources';
import attrs from '../../config/attrs';

describe('Should generate sources for <picture />', () => {
	const sourcesData = [
		{
			media: '(min-width: 1280px)',
			srcset: 'https://via.placeholder.com/1280x720/0000FF/000000'
		},
		{
			media: '(min-width: 750px)',
			srcset: 'https://via.placeholder.com/800x450/7878ff/000000'
		}
	];

	test(`Should generate ${sourcesData.length} <source /> element`, () => {
		const picture = document.createElement('picture');
		picture.setAttribute(attrs.sourceSources, JSON.stringify(sourcesData));
		const sources = generateSources(picture);
		expect(sources).toHaveLength(sourcesData.length);
	});

	test(`Should not generate elements when no data exist`, () => {
		const picture = document.createElement('picture');
		const sources = generateSources(picture);
		expect(sources).toHaveLength(0);
	});

	test(`Should not generate elements with incorrect data`, () => {
		const picture = document.createElement('picture');
		picture.setAttribute(attrs.sourceSources, 'true');
		const sources = generateSources(picture);
		expect(sources).toHaveLength(0);
	});

	test(`Should throw SyntaxError with bad JSON string in data`, () => {
		const picture = document.createElement('picture');
		picture.setAttribute(attrs.sourceSources, '[{]');
		expect(() => generateSources(picture)).toThrow(SyntaxError);
	});
});
