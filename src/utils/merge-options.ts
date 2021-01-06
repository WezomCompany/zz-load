import { Options } from '../types';

export default function (options1: Options = {}, options2: Options = {}) {
	const options: Options = {};
	for (const option in options1) {
		if (options1.hasOwnProperty(option)) {
			options[option] = options2.hasOwnProperty(option)
				? options2[option]
				: options1[option];
		}
	}
	return options;
}
