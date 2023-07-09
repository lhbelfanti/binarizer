const common = require('./common');

/**
 * SASS webpack block.
 *
 * @see https://github.com/jtangelder/sass-loader
 */

/**
 * @param {object}   [options] See https://github.com/sass/node-sass#options
 * @param {string[]} [options.includePaths]
 * @param {bool}     [options.indentedSyntax]
 * @param {string}   [options.outputStyle]
 * @param {bool}     [options.sourceMap]
 * @return {Function}
 */
function sass(options = {}) {
  const loaderType = 'text/x-sass';
  const baseLoaders = [
    { loader: 'css-loader', options: {} },
  ];

  return (context, webpackConfig) => {
    let typeLoaders = baseLoaders;

    try {
      const currentConfig = common.getLoaderConfigByType(context, webpackConfig, loaderType);
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
            test: context.fileType(loaderType),
            use: typeLoaders.concat([{ loader: 'sass-loader', options }]),
          },
        ],
      },
    };
  };
}

module.exports = sass;
