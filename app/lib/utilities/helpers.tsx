/**
 * get Prop by path utility - an alternative to lodash.get
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

/**
 * flatten a nested JSON object
 * @param {Object} object
 */
export const flattenJSON = (object) => {
  let simpleObj = {};
  for (let key in object) {
    const value = object[key];
    const type = typeof value;
    if (
      ["string", "boolean"].includes(type) ||
      (type === "number" && !isNaN(value))
    ) {
      simpleObj[key] = value;
    } else if (type === "object") {
      //recursive loop
      Object.assign(simpleObj, flattenJSON(value));
    }
  }
  return simpleObj;
};
