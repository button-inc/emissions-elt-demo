/**
 * getProp utility - an alternative to lodash.get
 * @param {Object} object
 * @param {String|Array} path
 * @param {*} defaultVal
 */
export const getPropByPath = (object, path, defaultValue) => {
  const _path = Array.isArray(path) ? path : path.split('.');
  if (object && _path.length)
    return getPropByPath(object[_path.shift()], _path, defaultValue);
  return object === undefined ? defaultValue : object;
};
