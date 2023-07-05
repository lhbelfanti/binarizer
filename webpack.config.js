/**
 * Module dependencies
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const glob = require('glob');

const { NODE_ENV } = process.env;
if (NODE_ENV !== 'production') {
  console.log('USING DOTENV');
  require('dotenv').config();
}

console.log('Building webpack config');

/**
 * Build entrypoints paths
 */
const entryPointPath = path.resolve('src', 'app', 'client');
const entrypoints = glob.sync(`${entryPointPath}/**/*.tsx`).reduce((res, filePath) => {
  const fileName = path.basename(filePath, '.tsx');
  res[fileName] = filePath;
  return res;
}, {});

const generateLegacyBundles = (entryPoints) =>
  Object.keys(entryPoints).reduce(
    (accumulator, entrypointName) => {
      const { extname } = path;
      const filePath = entryPoints[entrypointName];

      const fileExtension = extname(filePath);

      if (['.ts', '.js', '.tsx', '.jsx'].some((ext) => ext === fileExtension)) {
        // Create entrypoints without polyfills for modern browsers
        accumulator.nonPolyfilled[entrypointName] = ['regenerator-runtime/runtime', filePath];
      } else {
        accumulator.nonJsAssets[entrypointName] = [filePath];
      }
      return accumulator;
    },
    { polyfilled: {}, nonPolyfilled: {}, nonJsAssets: {} }
  );

const entryPointsFamilies = generateLegacyBundles(entrypoints);

/** 
 * Function createConfig to set a webpack configuration
 */

const createFileTypesMapping = (initialMapping) => {
  let currentMapping = initialMapping;

  function addOne(type, condition) {
    if (!condition) {
      throw new Error('FileTypes:add(): Expected a "condition" as 2nd param if 1st param is a string.');
    }
    return { ...currentMapping, [type]: condition };
  }

  function addMultiple(types) {
    return { ...currentMapping, ...types };
  }

  const mapperMethods = {
    all() {
      return currentMapping;
    },

    /**
     * @param {string} type   MIME type.
     * @return {RegExp|Function|string|array}
     */
    get(type) {
      if (type instanceof RegExp) {
        return type;
      }

      if (!(type in currentMapping)) {
        throw new Error(`FileTypes:get(): Type is not registered: ${type}`);
      }
      return currentMapping[type];
    },

    /**
     * @param {string|object} type
     * @param {RegExp|Function|string|array} [condition]  Only used if param `type` is a string.
     * @return {FileTypesMapping} this
     * @see https://webpack.github.io/docs/configuration.html#module-loaders
     * @example `fileType.add('application/javascript', /\.jsx?$/)`
     * @example `fileType.add({ 'application/javascript': [ /\.js$/, /\.jsx$/ ] })`
     */
    add(type, condition) {
      if (typeof type === 'string') {
        currentMapping = addOne(type, condition);
      } else if (typeof type === 'object') {
        currentMapping = addMultiple(type);
      } else {
        throw new Error(`FileTypes:add(): Expected 1st param to be a string or object, but got: ${typeof type}`);
      }
      return mapper; // eslint-disable-line
    },
  };

  function FileTypeMapping(type) {
    return mapper.get(type); // eslint-disable-line
  }

  const mapper = Object.assign(FileTypeMapping, mapperMethods);

  return mapper;
}

const defaultFileTypes = {
  'application/font': /\.(eot|ttf|woff|woff2)(\?.*)?$/,
  'application/javascript': /\.(js|jsx)$/,
  'application/typescript': /\.(ts|tsx)$/,
  'application/json': /\.json$/,
  audio: /\.(aac|m4a|mp3|oga|ogg|wav)$/,
  image: /\.(gif|ico|jpg|jpeg|png|svg|webp)$/i,
  'text/css': /\.css$/,
  'text/x-less': /\.less$/,
  'text/x-sass': /\.(sass|scss)$/,
  video: /\.(mp4|webm)$/,
};
const fileType = createFileTypesMapping(defaultFileTypes);
const isFunction = (value) => typeof value === 'function';

const createConfig = (webpack, configSetters) => {
  if (!webpack) {
    throw new Error('No webpack instance passed.');
  }
  if (!Array.isArray(configSetters) || !configSetters.every(isFunction)) {
    throw new Error('Expected parameter "configSetters" to be an array of functions.');
  }

  const context = { fileType, webpack };

  invokePreHooks(configSetters, context);
  const config = invokeConfigSetters(configSetters, context);
  const postProcessedConfig = invokePostHooks(configSetters, context, config);

  return postProcessedConfig;
}

const invokePreHooks = (configSetters, context) => {
  const preHooks = getHooks(configSetters, 'pre');
  preHooks.forEach((hook) => hook(context));
}

const invokeConfigSetters = (configSetters, context, baseConfig = {}, getCompleteConfig = (config) => config) => {
  return configSetters.reduce(
    (mergedConfig, setter) => {
      const configPartial = setter(context, getCompleteConfig(mergedConfig));
      return merge.smart(mergedConfig, configPartial);
    },
    baseConfig,
  );
}

const invokePostHooks = (configSetters, context, config) => {
  const postHooks = getHooks(configSetters, 'post');
  return invokeConfigSetters(postHooks, context, config);
}

const getHooks = (configSetters, type) => {
  // Get all the blocks' pre/post hooks
  const hooks = configSetters
    .filter((setter) => Boolean(setter[type]))
    .map((setter) => setter[type]);

  // Flatten the array (since each item might be an array as well)
  const flattenedHooks = hooks
    .map((hook) => (Array.isArray(hook) ? hook : [hook]))
    .reduce((allHooks, someHooks) => allHooks.concat(someHooks), []);

  return filterDuplicates(flattenedHooks);
}

const filterDuplicates = (array) => {
  return array.filter((item, index) => array.indexOf(item) === index);
}

/**
 * Function entryPoint
 */

const entryPoint = (entry) => {
  const normalizedEntry = normalizeEntry(entry);
  const entries = addFastRefreshClientEntryIfApply(normalizedEntry);

  return () => ({
    entry: entries,
  });
}

const addFastRefreshClientEntryIfApply = (entries) => {
  const fastRefreshEnabled = NODE_ENV == "development"
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


/**
 * Create webpack config
 */
const config = createConfig(webpack, [
  entryPoint({
    ...entryPointsFamilies.polyfilled,
    ...entryPointsFamilies.nonPolyfilled,
    ...entryPointsFamilies.nonJsAssets,
  }),
]);


/**
 * Expose config
 */
module.exports = config;
