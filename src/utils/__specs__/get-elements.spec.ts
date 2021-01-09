import getElements from '../get-elements';
import $ from 'jquery';

describe('Should return elements list', () => {
	const LENGTH = 5;
	const container = document.createElement('div');
	container.classList.add('container');
	container.innerHTML = `
		<div class="container">
			<div class="gallery">
				<img class="js-lazy-load">
				<img class="js-lazy-load">
				<img class="js-lazy-load">
				<img class="js-lazy-load">
				<img class="js-lazy-load">
			</div>
		</div>
	`;
	document.body.appendChild(container);

	test('Directly passed Element', () => {
		const element = document.createElement('img');
		const elements = getElements(element);
		expect(elements).toHaveLength(1);
		expect(elements[0]).toStrictEqual(element);
	});

	test('Directly passed Elements list', () => {
		const element1 = document.createElement('img');
		const element2 = document.createElement('img');
		const elements = getElements([element1, element2]);
		expect(elements).toHaveLength(2);
	});

	test('From jQuery collection', () => {
		const $img = $(container).find('.js-lazy-load');
		const elements = getElements($img);
		expect(elements).toHaveLength(LENGTH);
	});

	test('By selector', () => {
		const elements = getElements('.js-lazy-load');
		expect(elements).toHaveLength(LENGTH);
	});
});
