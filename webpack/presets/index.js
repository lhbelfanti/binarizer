const path = require('path');
const merge = require('lodash/merge');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const { customConfig, group, fileType, addPlugins, defineConstants, env, setOutput, sourceMaps, setStats, setTarget} = require('../index');
const lazyBlock = require('../lazy');
const extractText = require('../extract-text');
const babel = require('../babel');
const postcss = require('../postcss');
const sass = require('../sass');
const { fastRefreshEnabled, fastRefreshBabelPlugin } = require('../utils/fast-refresh');
const browsersList = require('../core/browsersList');

const { NODE_ENV } = process.env;

const nodeEnv = NODE_ENV || 'development';

function classicPreset({buildPath, publicPath, babelrc, lodash, imagesPath, tsLoader, lazy, target} = {}) {
  const actualBuildPath = buildPath || './build';
  const actualPublicPath = nodeEnv === 'production' ? publicPath : '/';

  const babelConfig = {
    sourceType: 'unambiguous',
    presets: [
      '@babel/preset-react',
      ['@babel/preset-env', {
        targets: { browsers: browsersList },
      }],
    ],
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
      ...fastRefreshBabelPlugin('classic'),
    ].concat(nodeEnv === 'production' ? [
      '@babel/plugin-transform-react-constant-elements',
      '@babel/plugin-transform-react-inline-elements',
      'babel-plugin-transform-react-remove-prop-types',
      [
        '@babel/plugin-transform-runtime',
        {
          absoluteRuntime: false,
          corejs: false,
          helpers: true,
          regenerator: false,
          useESModules: false,
        },
      ],
    ] : []),
    ...babelrc,
  };

  const tsConfig = merge({
    compilerOptions: { module: 'ES2020', moduleResolution: 'node' },
  }, tsLoader);

  const postCssPlugins = [
    autoprefixer({
      overrideBrowserslist: browsersList,
      flexbox: 'no-2009',
    }),
  ].concat(nodeEnv === 'production' ? [cssnano({
    preset: ['default', { normalizeUrl: false }],
  })] : []);

  let copyImagesConfig = [];

  if (typeof imagesPath === 'string') {
    copyImagesConfig.push({ from: imagesPath });
  } else if (Array.isArray(imagesPath)) {
    copyImagesConfig = imagesPath;
  }

  return group([
    setTarget(target),
    babel(babelConfig, tsConfig),
    postcss(fileType('text/css'), postCssPlugins),
    postcss(fileType('text/x-sass'), postCssPlugins),
    sass(),
    defineConstants({
      'process.env.NODE_ENV': nodeEnv,
    }),
    setStats('adaptive'),
    addPlugins([
      new WebpackManifestPlugin({
        publicPath: '',
        ...(fastRefreshEnabled && { writeToFileEmit: true }),
      }),
    ]),
    lazyBlock(lazy),
    env('development', [
      setOutput({
        filename: '[name].js',
        path: path.join(path.resolve('.'), actualBuildPath),
        publicPath: actualPublicPath,
      }),
      sourceMaps(),
      extractText('[name].css', ['text/x-sass', 'text/css']),
      addPlugins([
        copyImagesConfig.length && new CopyWebpackPlugin({ patterns: [...copyImagesConfig] }),
        fastRefreshEnabled && new webpack.HotModuleReplacementPlugin(),
        fastRefreshEnabled && new ReactRefreshWebpackPlugin({ overlay: false }),
      ].filter(Boolean)),
    ]),
    env('production', [
      setOutput({
        filename: '[name].[chunkhash:8].js',
        path: path.join(path.resolve('.'), actualBuildPath),
        publicPath: actualPublicPath,
        clean: true,
      }),
      customConfig({
        optimization: {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              parallel: true,
              // @see https://github.com/terser-js/terser#minify-options
              terserOptions: {
                ecma: undefined,
                warnings: false,
              },
            }),
          ],
        },
      }),
      sourceMaps('source-map'),
      extractText('[name].[contenthash:8].css', ['text/x-sass', 'text/css']),
      addPlugins([
        new LodashModuleReplacementPlugin(lodash),
        copyImagesConfig.length && new CopyWebpackPlugin({ patterns: [...copyImagesConfig] }),
      ].filter(Boolean)),
    ]),
  ]);
}

module.exports = classicPreset;
