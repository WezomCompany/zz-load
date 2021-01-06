const typescript = require('rollup-plugin-typescript2');
const { terser } = require('rollup-plugin-terser');

module.exports = {
	input: './src/core.ts',
	output: [
		{
			file: 'docs/assets/js/global-zz-load-example.min.js',
			format: 'iife',
			name: 'globalZzLoadExample'
		}
	],
	plugins: [
		terser(),
		typescript({
			tsconfigOverride: {
				compilerOptions: { declaration: false, target: 'es5' }
			}
		})
	]
};
