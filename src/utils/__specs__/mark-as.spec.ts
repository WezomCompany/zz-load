import markAs from '../mark-as';
import { attrs, events } from '../../index';

describe('Should mark elements', () => {
	const cases: {
		name: string;
		tagName: keyof HTMLElementTagNameMap;
		attr: string;
		event: string;
		detail?: { [p: string]: string };
		unMark?: boolean;
	}[] = [
		{
			name: 'Mark <picture /> as "observed"',
			tagName: 'picture',
			attr: attrs.observed,
			event: events.observed
		},
		{
			name: 'Mark <iframe /> as "processed"',
			tagName: 'iframe',
			attr: attrs.processed,
			event: events.processed
		},
		{
			name: 'Mark <img /> as "loaded"',
			tagName: 'img',
			attr: attrs.loaded,
			event: events.loaded,
			detail: {
				key: 'value'
			}
		},
		{
			name: 'Mark <div /> as "failed"',
			tagName: 'div',
			attr: attrs.failed,
			event: events.failed,
			detail: {
				key: 'value'
			}
		},
		{
			name: 'Mark <div /> as "inView"',
			tagName: 'div',
			attr: attrs.inView,
			event: events.inView,
			detail: {
				key: 'value'
			}
		},
		{
			name: 'Unmark <div /> as "inView"',
			tagName: 'div',
			attr: attrs.inView,
			event: events.inView,
			detail: {
				key: 'value'
			},
			unMark: true
		}
	];

	cases.forEach(({ name, tagName, attr, event, detail, unMark }) => {
		describe(name, () => {
			const element = document.createElement(tagName);
			if (unMark) {
				element.setAttribute(attr, '');
			}

			const expectedDetail = {
				element,
				...(detail || {})
			};
			let receivedDetail: any;
			element.addEventListener(event, (({ detail }: CustomEvent): void => {
				receivedDetail = detail;
			}) as EventListener);

			markAs(element, attr, event, detail, unMark);

			if (unMark) {
				test('Remove special attr if unMark argument is `true`', () => {
					expect(element.hasAttribute(attr)).toBeFalsy();
				});
			} else {
				test('Should add special attr', () => {
					expect(element.hasAttribute(attr)).toBeTruthy();
				});

				test('Added special attr must not have value', () => {
					expect(element.getAttribute(attr)).toStrictEqual('');
				});
			}

			test('Should emit CustomEvent with current element and other custom data in event "detail" prop', () => {
				expect(receivedDetail).toStrictEqual(expectedDetail);
			});
		});
	});
});
