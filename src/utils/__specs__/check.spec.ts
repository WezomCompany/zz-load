import check from '../check';
import markAs from '../mark-as';
import { attrs, events } from '../../index';

describe('Should clean element', () => {
	const element = document.createElement('img');

	test('Should check as positive', () => {
		markAs(element, attrs.loaded, events.loaded);
		const result = check(element, attrs.loaded);
		expect(result).toBeTruthy();
	});

	test('Should check as negative', () => {
		markAs(element, attrs.loaded, events.loaded, undefined, true);
		const result = check(element, attrs.loaded);
		expect(result).toBeFalsy();
	});
});
