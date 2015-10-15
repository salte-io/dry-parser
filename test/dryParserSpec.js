var expect = require('chai').expect;
var dry = require('../index');

describe('dryParser', function () {
    var config;
    var object;

    beforeEach(function () {
        config = {
            'dir': {
                'assets': 'assets',
                'less': '{dir.assets}/less',
                'bower': '{dir.assets}/bower_components'
            },
            'lib': {
                'jquery': '{dir.bower}/jquery/jquery.js'
            }
        };

        object = {
            'jquery': '{dir.bower}/jquery/jquery.js'
        };
    });

    describe('#parse()', function () {
        it('should parse bindings of a single object', function () {
            var results = dry.parse(config);

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
            var results = dry.parse(object, config);

            expect(results).to.deep.equal({
                'jquery': 'assets/bower_components/jquery/jquery.js'
            });
        });

        it('should retain booleans and integers', function () {
            var testObject = {
                someBool: true,
                someInt: 1
            };

            var results = dry.parse(testObject);

            expect(results).to.deep.equal(testObject);
        });
    });
});
