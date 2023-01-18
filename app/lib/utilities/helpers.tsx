/**
 * getProp utility - an alternative to lodash.get
 * @param {Object} object
 * @param {String|Array} path
 * @param {*} defaultVal
 */
export const getPropByPath = (object, path, defaultValue) => {
  const myPath = Array.isArray(path) ? path : path.split(".");
  if (object && myPath.length)
    return getPropByPath(object[myPath.shift()], myPath, defaultValue);
  return object === undefined ? defaultValue : object;
};
