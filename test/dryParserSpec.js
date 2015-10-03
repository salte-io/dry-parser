var expect = require('chai').expect;
var dry = require('../index');
var _ = require('lodash');

var config = {
    'dir': {
        'assets': 'assets',
        'less': '{dir.assets}/less',
        'bower': '{dir.assets}/bower_components'
    },
    'lib': {
        'jquery': '{dir.bower}/jquery/jquery.js'
    }
};

var object = {
    'jquery': '{dir.bower}/jquery/jquery.js'
};

describe('dryParser', function () {
    describe('#parse()', function () {
        it('should parse bindings of a single object', function () {
            var results = dry.parse(_.cloneDeep(config));

            expect(results).to.deep.equal({
                'dir': {
                    'assets': 'assets',
                    'less': 'assets/less',
                    'bower': 'assets/bower_components'
                },
                'lib': {
                    'jquery': 'assets/bower_components/jquery/jquery.js'
                }
            });
        });

        it('should parse bindings between two objects', function () {
            var results = dry.parse(_.cloneDeep(object), _.cloneDeep(config));

            expect(results).to.deep.equal({
                'jquery': 'assets/bower_components/jquery/jquery.js'
            });
        });
    });
});
