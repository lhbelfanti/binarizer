/**
 * Extract-text webpack block.
 *
 * @see https://github.com/webpack-contrib/mini-css-extract-plugin
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./common');

/**
 * @param {string}    outputFilePattern
 * @param {string|Array}  [fileType]          A MIME type used for file matching. Defaults to `text/css`.
 * @return {Function}
 */
function extractText(outputFilePattern = '[name].[contenthash:8].css', fileType = 'text/css') {
  const actualFileType = typeof fileType === 'string' ? [fileType] : fileType;

  const plugin = new MiniCssExtractPlugin({
    filename: outputFilePattern,
    chunkFilename: '[id].[contenthash].css',
  });

  const config = {
    module: {
      rules: [],
    },
    plugins: [plugin],
  };

  return (context, webpackConfig) => {
    actualFileType.forEach((type) => {
      const loaderConfig = common.getLoaderConfigByType(context, webpackConfig, type);
      const loaders = [].concat(loaderConfig.use);
      loaders.unshift({
        loader: MiniCssExtractPlugin.loader,
        options: {
          esModule: false,
        },
      });

      config.module.rules.push({
        test: context.fileType(type),
        exclude: loaderConfig.exclude,
        use: loaders,
      });
    });

    return config;
  };
}

module.exports = extractText;
