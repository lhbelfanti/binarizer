const merge = require('webpack-merge');
const createFileTypesMapping = require('./createFileTypesMapping.js');
const defaultFileTypes = require('./defaultFileTypes.js');

const fileType = createFileTypesMapping(defaultFileTypes);
const isFunction = (value) => typeof value === 'function';

const filterDuplicates = (array) => {
    return array.filter((item, index) => array.indexOf(item) === index);
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


module.exports = createConfig;