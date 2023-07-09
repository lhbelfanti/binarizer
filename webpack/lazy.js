const { default: LoadablePlugin } = require('@loadable/webpack-plugin');
const { addPlugins } = require('./index');
const babel = require('./babel');

function postConfig(context, webpackConfig) {
  if (context.strategy) {
    // Remove 'defaultVendors' key since setting off or editing it, granual stratey won't work with webpack 5 defaults
    delete webpackConfig.optimization.splitChunks.cacheGroups.defaultVendors;
  }
}

function lazy(options = {}) {
  return Object.assign((context, webpackConfig) => {
    return {
      ...addPlugins([new LoadablePlugin(options.plugin || {})])(),
      ...babel({
        plugins: '@loadable/babel-plugin',
      })(context),
    };
  }, { post: postConfig });
}

module.exports = lazy;
