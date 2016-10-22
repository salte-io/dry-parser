var expect = require('chai').expect;
var sinon = require('sinon');
var dry = require('../src/dry-parser.js');

describe('dry-parser', function() {
    var sandbox;

    beforeEach(function() {
        sandbox = sinon.sandbox.create();
        sandbox.stub(console, 'warn');
    });

    afterEach(function() {
        sandbox.restore();
    });

    describe('function(parse)', function() {
        describe('single-object', function() {
            it('should parse bindings of a single object', function() {
                var results = dry.parse({
                    assets: 'assets',
                    sass: '{assets}/sass'
                });

                expect(results).to.deep.equal({
                    assets: 'assets',
                    sass: 'assets/sass'
                });
            });

            it('should parse nested bindings of a single object', function() {
                var results = dry.parse({
                    dir: {
                        node: 'node_modules'
                    },
                    lib: {
                        angular: '{dir.node}/angular/angular.js'
                    }
                });

                expect(results).to.deep.equal({
                    dir: {
                        node: 'node_modules'
                    },
                    lib: {
                        angular: 'node_modules/angular/angular.js'
                    }
                });
            });

            it('should support whatever ordering is provided', function() {
                var results = dry.parse({
                    lodash: '{node}/lodash',
                    object: '{lodash}/object',
                    node: 'node_modules'
                });

                expect(results).to.deep.equal({
                    lodash: 'node_modules/lodash',
                    object: 'node_modules/lodash/object',
                    node: 'node_modules'
                });
            });

            it('should parse bindings within an array', function() {
                var results = dry.parse({
                    libraries: [
                        'angular'
                    ],
                    someValue: '{libraries.0}'
                });

                expect(results).to.deep.equal({
                    libraries: [
                        'angular'
                    ],
                    someValue: 'angular'
                });
            });

            it('should retain non-string types', function() {
                var results = dry.parse({
                    bool: true,
                    int: 1
                });

                expect(results).to.deep.equal({
                    bool: true,
                    int: 1
                });
            });

            it('should log a warning when passed an invalid config', function() {
                var results = dry.parse({
                    invalid: '{dir.invalidKey}/less'
                });

                expect(results).to.deep.equal({
                    invalid: '{dir.invalidKey}/less'
                });
                expect(console.warn.callCount).to.equal(1);
                expect(console.warn.calledWith('The following key doesn\'t map to any values; ', 'dir.invalidKey')).to.equal(true);
            });
        });

        describe('bi-parsing', function() {
            it('should parse bindings between two objects', function() {
                var results = dry.parse({
                    sass: '{assets}/sass'
                }, {
                    assets: 'assets'
                });

                expect(results).to.deep.equal({
                    sass: 'assets/sass'
                });
            });
        });
    });
});
