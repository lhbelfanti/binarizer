const common = require('./common');

/**
 * PostCSS webpack block.
 *
 * @see https://github.com/postcss/postcss-loader
 * @param {PostCSSPlugin[]} [plugins]                     Will read `postcss.config.js` file if not supplied.
 * @param {object}          [options]
 * @param {RegExp|Function|string}  [options.exclude]     Directories to exclude.
 * @param {string}                  [options.parser]      Package name of custom PostCSS parser to use.
 * @param {string}                  [options.stringifier] Package name of custom PostCSS stringifier to use.
 * @param {string}                  [options.syntax]      Package name of custom PostCSS parser/stringifier to use.
 * @return {Function}
 */
function postcss(fileType, plugins = [], options = {}) {
  // https://github.com/postcss/postcss-loader#options
  const postcssOptions = {
    ...options.parser && { parser: options.parser },
    ...options.stringifier && { stringifier: options.stringifier },
    ...options.syntax && { syntax: options.syntax },
    ident: options.ident || 'postcss',
    ...plugins && { plugins },
  };

  const baseLoaders = [
    { loader: 'css-loader', options: {} },
  ];

  return (context, webpackConfig) => {
    let typeLoaders = baseLoaders;

    try {
      const currentConfig = common.getLoaderConfigByType(context, webpackConfig, fileType);
      if (Array.isArray(currentConfig.use)) {
        typeLoaders = currentConfig.use;
      }
    } catch (e) {
      throw new Error('Loader config is required to enable css modules');
    }

    return {
      module: {
        rules: [
          {
            test: context.fileType(fileType),
            use: typeLoaders.concat([{ loader: 'postcss-loader', options: { postcssOptions } }]),
            ...(options.exclude ? {
              exclude: Array.isArray(options.exclude) ? options.exclude : [options.exclude],
            } : {}),
          },
        ],
      },
    };
  };
}

module.exports = postcss;
