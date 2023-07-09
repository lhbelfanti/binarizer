/**
 * Module dependencies
 */
const { createConfig, entryPoint, resolveAliases } = require('./webpack');
const classicPreset = require('./webpack/presets');
const path = require('path');
const glob = require('glob');

const { NODE_ENV } = process.env;
if (NODE_ENV !== 'production') {
  console.log('USING DOTENV');
  require('dotenv').config();
}

console.log('Building webpack config');

/**
 * Build entrypoints paths
 */
const entryPointPath = path.resolve('src', 'app', 'client');
const entrypoints = glob.sync(`${entryPointPath}/**/*.tsx`).reduce((res, filePath) => {
  const fileName = path.basename(filePath, '.tsx');
  res[fileName] = filePath;
  return res;
}, {});

const generateLegacyBundles = (entryPoints) =>
  Object.keys(entryPoints).reduce(
    (accumulator, entrypointName) => {
      const { extname } = path;
      const filePath = entryPoints[entrypointName];

      const fileExtension = extname(filePath);

      if (['.ts', '.js', '.tsx', '.jsx'].some((ext) => ext === fileExtension)) {
        // Create entrypoints without polyfills for modern browsers
        accumulator.nonPolyfilled[entrypointName] = ['regenerator-runtime/runtime', filePath];
      } else {
        accumulator.nonJsAssets[entrypointName] = [filePath];
      }
      return accumulator;
    },
    { polyfilled: {}, nonPolyfilled: {}, nonJsAssets: {} }
  );

const entryPointsFamilies = generateLegacyBundles(entrypoints);

/**
 * Create webpack config
 */
const config = createConfig([
  entryPoint({
    ...entryPointsFamilies.polyfilled,
    ...entryPointsFamilies.nonPolyfilled,
    ...entryPointsFamilies.nonJsAssets,
  }, NODE_ENV),
  classicPreset({
    buildPath: 'build',
    publicPath: `https://myAssetsURL`,
    imagesPath: 'src/app/assets/images',
  }),
  resolveAliases({
    '@components': path.resolve(__dirname, 'src/app/components'),
    '@app': path.resolve(__dirname, 'src/app'),
    '@pages': path.resolve(__dirname, 'src/app/pages'),
    '@app-types': path.resolve(__dirname, 'src/types'),
  }),
]);


/**
 * Expose config
 */
module.exports = config;
