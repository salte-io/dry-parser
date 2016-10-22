var utils = require('./utils.js');
var dry = this;

/**
 * Contains a group of frequently used regular expressions.
 * @type {Object}
 */
dry.regex = /\{([\w\d.-]+)\}/g;

dry.parse = function(object, baseObject) {
    var result = object;
    if (Array.isArray(object) || typeof object === 'object') {
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                result[key] = dry.parse(result[key], baseObject || object);
            }
        }
    } else if (typeof object === 'string') {
        result = object.replace(dry.regex, function(match, g1) {
            var parsedValue = dry.parse(utils.deepFind(baseObject, g1), baseObject);

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
