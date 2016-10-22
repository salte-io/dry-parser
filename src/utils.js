var utils = this;

utils.deepFind = function(object, path) {
    if (!object) {
        return undefined;
    }
    var paths = path.split('.');
    var current = object;

    for (var i = 0; i < paths.length; i++) {
        if (current[paths[i]] === undefined) {
            return undefined;
        } else {
            current = current[paths[i]];
        }
    }
    return current;
};

module.exports = utils;
