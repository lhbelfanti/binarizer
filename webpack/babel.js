/**
 * Babel webpack block.
 *
 * @see https://github.com/babel/babel-loader
 */

function postConfig(context) {
  const { exclude } = context.babel;
  const { include } = context.babel;

  const babelOptions = { ...context.babel };
  delete babelOptions.exclude;
  delete babelOptions.include;

  const tsOptions = { ...context.tsLoader };

  const loaderConfigCommon = {
    ...exclude && {
      exclude: Array.isArray(exclude) ? exclude : [exclude],
    },
    ...include && {
      include: Array.isArray(include) ? include : [include],
    },
  };

  const loaderConfigJS = {
    test: context.fileType('application/javascript'),
    use: { loader: 'babel-loader', options: babelOptions },
    ...loaderConfigCommon,
  };

  const loaderConfigTS = {
    test: context.fileType('application/typescript'),
    use: [
      { loader: 'babel-loader', options: babelOptions },
      { loader: 'ts-loader', options: tsOptions },
    ],
    ...loaderConfigCommon,
  };

  return {
    module: {
      rules: [loaderConfigJS, loaderConfigTS],
    },
  };
}

/**
 * @param {object} [options]
 * @param {RegExp|Function|string}  [options.exclude]   Directories to exclude.
 * @param {RegExp|Function|string}  [options.include]   Directories to include.
 * @param {string[]}                [options.plugins]   Babel plugins to use.
 * @param {string[]}                [options.presets]   Babel presets to use.
 * @param {boolean|string}          [options.babelrc]   Should babel lookup the additional config in .babelrc or .babelrc.js files.
 * @param {object} [tsOptions]  Additional settings for tsLoader in https://www.npmjs.com/package/ts-loader#loader-options
 * @return {Function}
 */
function babel(options = {}, tsOptions = {}) {
  const babelDefaultConfig = {
    cacheDirectory: true,
    exclude: /\/node_modules\//,
    babelrc: false,
  };

  return Object.assign((context) => {
    // Write babel config into the context
    context.babel = context.babel || babelDefaultConfig;
    context.tsLoader = context.tsLoader || tsOptions;

    if ('cacheDirectory' in options) {
      context.babel.cacheDirectory = options.cacheDirectory;
    }
    if ('exclude' in options) {
      context.babel.exclude = options.exclude;
    }
    if ('include' in options) {
      context.babel.include = options.include;
    }
    if ('plugins' in options) {
      context.babel.plugins = (context.babel.plugins || []).concat(options.plugins);
    }
    if ('presets' in options) {
      context.babel.presets = (context.babel.presets || []).concat(options.presets);
    }
    if ('babelrc' in options) {
      context.babel.babelrc = JSON.parse(options.babelrc);
    }
    if ('sourceType' in options) {
      context.babel.sourceType = options.sourceType;
    }
    // Return empty config snippet (configuration will be created by the post hook)
    return {};
  }, { post: postConfig });
}

module.exports = babel;
