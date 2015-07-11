var _ = require('lodash');
var dryParser = this;

/**
 * Contains a group of frequently used regular expressions.
 * @type {Object}
 */
dryParser.regex = {
	binding: /{([\w\.-]+)}/g
};

/**
 * Sets the configuration object to the designated value.
 * @param {object} object The configuration object.
 * @return {undefined}       Returns undefined.
 */
dryParser.setConfig = function (object) {
	dryParser.config = object;
};

/**
 * Convert the configuration object into its parsed counterpart.
 * @param  {object} object   The current object layer that's being parsed.
 * @param  {array} parentKey The key path to the layer's parent.
 * @param  {array} key       The key path to the layer.
 * @return {undefined}       Returns undefined.
 */
dryParser.convert = function (object, parentKey, key) {
	/* Concatenate Key to the FullKey if it isn't null. */
	var fullKey = key ? key : [];

	/* Set layer to the object if its set, otherwise set it to the config. */
	var layer = object ? object : dryParser.config;

	/* Loop through each key. */
	_.forEach(layer, function (subLayer, subKey) {
		/* If there's another layer, then recursively call convert. */
		if (_.isObject(subLayer) || _.isArray(subLayer)) {
			dryParser.convert(subLayer, fullKey, fullKey.concat(subKey));
			/* Otherwise Parse the layer into its final form. */
		} else if (_.isString(subLayer)) {
			// Does stuff
			_.set(dryParser.config, fullKey.concat(subKey), dryParser.parse(subLayer));
		}
	});
};

/**
 * Parse the object into a usable value.
 * @param  {object} value   The object to parse.
 * @return {string}         The parsed value of the object.
 */
dryParser.parse = function (value) {
	var result = value;

	// Replace each binding occurance with its real value.
	result = result.replace(dryParser.regex.binding, function (match, g1) {
		// Get the binding's value.
		var groupValue = _.get(dryParser.config, g1);
		// If the binding's value is a binding itself.
		if (_.isString(groupValue) && groupValue.match(dryParser.regex.binding)) {
			// Then set the binding's value to its parsed value.
			_.set(dryParser.config, g1, dryParser.parse(groupValue));
		}

		// Replace the binding with a real value.
		return _.get(dryParser.config, g1);
	});

	// Return the parsed value.
	return result;
};

module.exports = dryParser;
