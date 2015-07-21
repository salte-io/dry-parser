var _ = require('lodash');
var dry = this;

/**
 * Contains a group of frequently used regular expressions.
 * @type {Object}
 */
dry.regex = {
	binding: /{([\w\.-]+)}/g
};

/**
 * Parse the object into a usable form.
 * @param  {object} object The object to parse.
 * @param  {object} otherObject The object to parse the first object against.
 * @return {object}        The parsed representation of the object.
 */
dry.parse = function (object, otherObject) {
	if (otherObject) {
		otherObject = dry.parse(otherObject);
		dry.setConfig(otherObject);
	} else {
		dry.setConfig(object);
	}

	return dry.convert(object);
};

/**
 * Sets the configuration object to the designated value.
 * @param {object} object The configuration object.
 * @return {undefined}       Returns undefined.
 */
dry.setConfig = function (object) {
	dry.config = object;
};

/**
 * Convert the configuration object into its parsed counterpart.
 * @param  {object} object   The current object layer that's being parsed.
 * @param  {array} parentKey The key path to the layer's parent.
 * @param  {array} key       The key path to the layer.
 * @return {undefined}       Returns undefined.
 */
dry.convert = function (object) {
	/* Set layer to the object if its set, otherwise set it to the config. */
	var layer = object ? object : dry.config;

	/* Loop through each key. */
	_.forEach(layer, function (subLayer, subKey) {
		/* If there's another layer, then recursively call convert. */
		if (_.isObject(subLayer) || _.isArray(subLayer)) {
			layer[subKey] = dry.convert(subLayer);
		/* Otherwise Parse the layer into its final form. */
		} else if (_.isString(subLayer)) {
			layer[subKey] = dry.replace(subLayer);
		}
	});

	return object;
};

/**
 * Replace the object's bindings with a usable value.
 * @param  {object} value   The object to parse.
 * @return {string}         The parsed value of the object.
 */
dry.replace = function (value) {
	var result = value;

	// Replace each binding occurance with its real value.
	result = result.replace(dry.regex.binding, function (match, g1) {
		// Get the binding's value.
		var groupValue = _.get(dry.config, g1);
		// If the binding's value is a binding itself.
		if (_.isString(groupValue) && groupValue.match(dry.regex.binding)) {
			// Then set the binding's value to its parsed value.
			_.set(dry.config, g1, dry.replace(groupValue));
		}

		// Replace the binding with a real value.
		return _.get(dry.config, g1);
	});

	// Return the parsed value.
	return result;
};

module.exports = dry;
