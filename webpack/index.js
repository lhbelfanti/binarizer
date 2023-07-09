/**
 * Webpack base config block.
 */

const webpack = require('webpack');
const common = require('./common');
const core = require('./core');

/**
 * Takes an array of webpack blocks and creates a webpack config out of them.
 * Each webpack block is a callback function which will be invoked to return a
 * partial webpack config. These partial configs are merged to create the
 * final, complete webpack config that will be returned.
 *
 * Wraps @webpack-blocks/core's `createConfig` without `createConfig()`'s usual
 * default config.
 *
 * @param {Function[]} configSetters  Array of functions as returned by webpack blocks.
 * @return {object}                   Webpack config object.
 */
function createVanillaConfig(configSetters) {
  return core.createConfig(webpack, configSetters);
}

function createBaseConfig(context) {
  return {
    mode: process.env.NODE_ENV,
    module: {
      rules: [
        {
          test: context.fileType('text/css'),
          use: ['css-loader'],
        },
        {
          test: context.fileType('text/x-sass'),
          use: ['css-loader'],
        },
        {
          test: context.fileType('image'),
          type: 'asset/resource',
        }, {
          test: context.fileType('application/font'),
          type: 'asset/resource',
        }, {
          test: context.fileType('audio'),
          type: 'asset/inline',
        }, {
          test: context.fileType('video'),
          type: 'asset/inline',
        },
      ],
    },

    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
  };
}

/**
 * Takes an array of webpack blocks and creates a webpack config out of them.
 * Each webpack block is a callback function which will be invoked to return a
 * partial webpack config. These partial configs are merged to create the
 * final, complete webpack config that will be returned.
 *
 * Wraps @webpack-blocks/core's `createConfig` to provide some sane default
 * configuration first.
 *
 * @param {Function[]} configSetters  Array of functions as returned by webpack blocks.
 * @return {object}                   Webpack config object.
 */
function createConfig(configSetters) {
  return core.createConfig(webpack, [createBaseConfig].concat(configSetters));
}

exports.env = core.env;
exports.group = core.group;
exports.fileType = core.fileType;
exports.webpack = webpack;

exports.createConfig = createConfig;
exports.createConfig.vanilla = createVanillaConfig;

exports.addPlugins = common.addPlugins;
exports.customConfig = common.customConfig;
exports.defineConstants = common.defineConstants;
exports.entryPoint = common.entryPoint;
exports.resolveAliases = common.resolveAliases;
exports.setOutput = common.setOutput;
exports.sourceMaps = common.sourceMaps;
exports.setStats = common.setStats;
exports.setTarget = common.setTarget;
