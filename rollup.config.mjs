import { swc, minify } from 'rollup-plugin-swc3'

/** @type {import('rollup').RollupOptions} */
const full = {
    input: './src/index.ts',
    output: outputMatrix('index'),
    plugins: [swc({ sourceMaps: true })],
}
export default [full]

/**
 * @param {string} name
 * @param {('es' | 'umd')[]} format
 * @returns {import('rollup').OutputOptions[]}
 */
function outputMatrix(name, format = ['es', 'umd']) {
    return format.flatMap((f) => {
        /** @returns {import('rollup').OutputOptions} */
        const base = (compress = false) => {
            const baseName = getBaseName(name, compress)
            return {
                file: `./dist/${baseName}.${f === 'es' ? 'm' : ''}js`,
                name: 'AsyncCall',
                sourcemap: true,
                format: f,
                banner: `/// <reference types="./${baseName}.d.ts" />`,
                plugins: [
                    compress &&
                        minify({
                            sourceMap: true,
                            compress: {
                                unsafe: true,
                                ecma: 2018,
                                // unsafe_arrows: true,
                                unsafe_symbols: true,
                                unsafe_undefined: true,
                                drop_debugger: false,
                                pure_getters: true,
                                keep_fargs: false,
                                module: f === 'es',
                            },
                            ecma: 2018,
                            module: f === 'es',
                        }),
                ],
            }
        }
        return [base(false), base(true)]
    })
}

/**
 * @param {string} name
 * @param {boolean} compress
 */
function getBaseName(name, compress) {
    if (!compress) return name
    return `${name}.min`
}
