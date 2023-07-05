const entryPoint = (entry, nodeEnv) => {
    const normalizedEntry = normalizeEntry(entry);
    const entries = addFastRefreshClientEntryIfApply(normalizedEntry, nodeEnv);
  
    return () => ({
      entry: entries,
    });
}

const addFastRefreshClientEntryIfApply = (entries, nodeEnv) => {
    const fastRefreshEnabled = nodeEnv == "development"
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

const normalizeEntry = (entry) => {
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

module.exports = entryPoint;