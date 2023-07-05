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

module.exports = createFileTypesMapping;
