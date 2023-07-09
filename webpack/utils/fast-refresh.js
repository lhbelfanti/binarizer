const { NODE_ENV } = process.env;
const nodeEnv = NODE_ENV || 'development';

const fastRefreshEnabled = nodeEnv === 'development';

const fastRefreshBabelPlugin = (preset) => {
  let plugin = [];

  if (fastRefreshEnabled) {
    plugin = ['react-refresh/babel'];
  }

  return plugin;
};

function addFastRefreshClientEntryIfApply(entries) {
  if (fastRefreshEnabled) {
    const hotMiddlewareEntry = 'webpack-hot-middleware/client';
    const entriesWithFastRefresh = Object
      .entries(entries)
      .reduce((reducedEntries, [chunkName, filePath]) => ({
        ...reducedEntries,
        [chunkName]: /\bpolyfills?\b/.test(chunkName) ? filePath : [hotMiddlewareEntry].concat(filePath),
      }), {});

    return entriesWithFastRefresh;
  }

  return entries;
}

module.exports = {
  fastRefreshEnabled,
  fastRefreshBabelPlugin,
  addFastRefreshClientEntryIfApply,
};
