var expect = require('chai').expect;
var sinon = require('sinon');
var dry = require('../index');

describe('dryParser', function () {
    var sandbox;
    var config;
    var object;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(console, 'warn');
        sandbox.stub(console, 'error');

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

    afterEach(function () {
        sandbox.restore();
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

        it('should log a warning when passed an invalid config', function () {
            config.dir.less = '{dir.invalidKey}/less';

            dry.parse(config);

            sinon.assert.calledOnce(console.warn);
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
