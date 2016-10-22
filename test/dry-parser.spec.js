var expect = require('chai').expect;
var sinon = require('sinon');
var dry = require('../index');

describe('dryParser', function() {
    var sandbox;
    var data;
    var expected;

    beforeEach(function() {
        sandbox = sinon.sandbox.create();
        sandbox.stub(console, 'warn');
        sandbox.stub(console, 'error');

        data = {
            single: require('../test/single/data.json'),
            biParse: require('../test/bi-parse/data.json'),
            array: require('../test/array/data.json'),
            retainNonStringTypes: require('../test/retain-non-string-types/data.json'),
            invalid: require('../test/invalid/data.json')
        };

        expected = {
            single: require('../test/single/expected.json'),
            biParse: require('../test/bi-parse/expected.json'),
            array: require('../test/array/expected.json'),
            retainNonStringTypes: require('../test/retain-non-string-types/data.json'),
            invalid: require('../test/invalid/data.json')
        };
    });

    afterEach(function() {
        sandbox.restore();
    });

    describe('#parse()', function() {
        it('should parse bindings of a single object', function() {
            var results = dry.parse(data.single);

            expect(results).to.deep.equal(expected.single);
        });

        it('should parse bindings between two objects', function() {
            var results = dry.parse(data.biParse, data.single);

            expect(results).to.deep.equal(expected.biParse);
        });

        it('should parse bindings within an array', function() {
            var results = dry.parse(data.array);

            expect(results).to.deep.equal(expected.array);
        });

        it('should retain non-string types', function() {
            var results = dry.parse(data.retainNonStringTypes);

            expect(results).to.deep.equal(expected.retainNonStringTypes);
        });

        it('should log a warning when passed an invalid config', function() {
            var results = dry.parse(data.invalid);

            expect(results).to.deep.equal(expected.invalid);
            sinon.assert.calledOnce(console.warn);
        });
    });
});
