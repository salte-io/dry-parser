const utils = require('./utils.js');
const dry = {};

/**
 * Contains a group of frequently used regular expressions.
 * @type {Object}
 */
dry.regex = /\{([\w\d.-]+)\}/g;

dry.parse = (object, baseObject) => {
    let result = object;
    if (Array.isArray(object) || typeof object === 'object') {
        Object.keys(object).forEach((key) => {
            result[key] = dry.parse(result[key], baseObject || object);
        });
    } else if (typeof object === 'string') {
        result = object.replace(dry.regex, (match, g1) => {
            const parsedValue = dry.parse(utils.deepFind(baseObject, g1), baseObject);

            if (parsedValue) {
                return parsedValue;
            }

            console.warn('The following key doesn\'t map to any values; ', g1);
            return match;
        });
    }

    return result;
};

module.exports = dry;
