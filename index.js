var _ = require('lodash');
var dry = this;

/**
 * Contains a group of frequently used regular expressions.
 * @type {Object}
 */
dry.regex = /\{([\w\d.-]+)\}/g;

dry.parse = function(object, baseObject) {
    var result = object;
    if (_.isArray(object) || _.isObject(object)) {
        _.forEach(object, function(value, key) {
            result[key] = dry.parse(result[key], baseObject || object);
        });
    } else if (_.isString(object)) {
        result = object.replace(dry.regex, function(match, g1) {
            var parsedValue = dry.parse(_.get(baseObject, g1), baseObject);

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
