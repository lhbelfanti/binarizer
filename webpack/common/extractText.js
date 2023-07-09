/**
 * Extract-text webpack block.
 *
 * @see https://github.com/webpack/extract-text-webpack-plugin
 */

/**
 * @param {object}  context
 * @param {object}  webpackConfig
 * @param {string}  fileType
 * @return {object}
 * @throws {Error}
 */
function getLoaderConfigByType(context, webpackConfig, fileType) {
  const loaderConfig = webpackConfig.module.rules.find(
    // using string-based comparison here, since webpack-merge tends to deep-cloning things
    (rules) => String(rules.test) === String(context.fileType(fileType)),
  );

  if (loaderConfig) {
    return loaderConfig;
  } else { // eslint-disable-line
    throw new Error(`${fileType} loader could not be found in webpack config.`);
  }
}

module.exports = {
  getLoaderConfigByType,
};
