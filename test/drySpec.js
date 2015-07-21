var expect = require('chai').expect;
var dry = require('../dry-parser');

var object = {
	"dir": {
		"assets": "assets",
		"less": "{dir.assets}/less",
		"bower": "{dir.assets}/bower_components"
	},
	"lib": {
		"jquery": "{dir.bower}/jquery/jquery.js"
	}
};

describe('dry', function () {
	describe('#parse()', function () {
		it('should parse bindings linking to string values', function () {
			var results = dry.parse({
				"dir": {
					"assets": "assets",
					"less": "{dir.assets}/less",
					"bower": "{dir.assets}/bower_components"
				},
				"lib": {
					"jquery": "{dir.bower}/jquery/jquery.js"
				}
			});

			expect(results).to.deep.equal({
				"dir": {
					"assets": "assets",
					"less": "assets/less",
					"bower": "assets/bower_components"
				},
				"lib": {
					"jquery": "assets/bower_components/jquery/jquery.js"
				}
			});
		});

		it('should parse bindings between two objects', function () {
			var dir = {
				"assets": "assets",
				"less": "{assets}/less",
				"bower": "{assets}/bower_components"
			};

			var lib = {
				"jquery": "{bower}/jquery/jquery.js"
			};

			var results = dry.parse(lib, dir);

			expect(results).to.deep.equal({
				"jquery": "assets/bower_components/jquery/jquery.js"
			});
		});
	});
});
