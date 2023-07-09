/*
 * Common Functions to use with webpack
 */
const path = require('path');
const browserslist = require('../core/browsersList');
const { addFastRefreshClientEntryIfApply } = require('../utils/fast-refresh');

function addPlugins(plugins) {
  return plugins.length > 0
    ? () => ({ plugins })
    : () => ({}); // since webpack-merge would otherwise clear the plugins array
}

function customConfig(wpConfig) {
  return () => wpConfig;
}

function normalizeEntry(entry) {
  if (Array.isArray(entry)) {
    return {
      main: entry,
    };
  } else if (typeof entry === 'string') { // eslint-disable-line
    return {
      main: [entry],
    };
  } else if (typeof entry === 'object') {
    const actualEntry = entry;
    Object.keys(entry).forEach((entryName) => {
      if (!Array.isArray(entry[entryName])) {
        actualEntry[entryName] = [entry[entryName]];
      }
    });
    return actualEntry;
  } else {
    throw new Error(`Expected entry point to be object, array or string. Instead got: ${entry}`);
  }
}

/**
 * Adds one or multiple entry points. If the parameter is not an object the
 * entry point(s) will be added to the default chunk named `main`.
 *
 * @param {object|string[]|string} entry
 */
function entryPoint(entry) {
  const normalizedEntry = normalizeEntry(entry);
  const entries = addFastRefreshClientEntryIfApply(normalizedEntry);

  return () => ({
    entry: entries,
  });
}

/**
 * Enable webpack build stats
 *
 * @see https://webpack.js.org/configuration/stats/#stats
 * @param {string} preset One of 'errors-only', 'minimal', 'none', 'normal', 'verbose' or 'adaptive'
 * @return {function}
 */
function setStats(preset) {
  const isProduction = process.env.NODE_ENV === 'production';

  // Preset 'adaptive' provides less messy output for production but adds some useful info for development
  if (preset === 'adaptive') {
    return () => ({
      stats: {
        all: false,
        assets: true,
        builtAt: true,
        modules: !isProduction,
        moduleTrace: !isProduction,
        reasons: !isProduction,
        children: false,
        chunks: true,
        chunkOrigins: !isProduction,
        entrypoints: true,
        performance: true,
        publicPath: isProduction,
        errors: true,
        errorDetails: true,
        warnings: true,
        timings: true,
        version: true,
      },
    });
  }

  if (!['errors-only', 'minimal', 'none', 'normal', 'verbose'].includes(preset)) {
    return () => ({
      stats: 'normal',
    });
  }

  return () => ({
    stats: preset,
  });
}

function resolveAliases(aliases) {
  return () => ({
    resolve: {
      alias: aliases,
    },
  });
}

function setOutput(output) {
  if (typeof output === 'string') {
    return () => ({
      output: {
        filename: path.basename(output) || 'bundle.js',
        path: path.resolve(path.dirname(output) || './build'),
        clean: true,
      },
    });
  }

  return () => ({ output });
}

/**
 * Just a convenience wrapper to enable sourcemaps in an easier-to-read fashion
 * than `setDevTool()`.
 * @param {string} [devtool]
 * @return {Function}
 */
function sourceMaps(devtool = 'cheap-module-source-map') {
  return (context) => {
    context.sourceMaps = true;
    return { devtool };
  };
}

/**
 * Wrapper to set the webpack compilation target.
 * https://webpack.js.org/configuration/target/
 *
 * @param string [string] false
 * @return {Function}
 */
function setTarget(target) {
  return () => ({ target: target || `browserslist:${browserslist.join(', ')}` });
}

module.exports = {
  addPlugins,
  customConfig,
  entryPoint,
  resolveAliases,
  setOutput,
  sourceMaps,
  setStats,
  setTarget,
};
