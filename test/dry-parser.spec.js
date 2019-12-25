const expect = require('chai').expect;
const sinon = require('sinon');
const dry = require('../src/dry-parser.js');

describe('dry-parser', () => {
    beforeEach(() => {
        sinon.stub(console, 'warn');
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('function(parse)', () => {
        describe('single-object', () => {
            it('should parse bindings of a single object', () => {
                const results = dry.parse({
                    assets: 'assets',
                    sass: '{assets}/sass'
                });

                expect(results).to.deep.equal({
                    assets: 'assets',
                    sass: 'assets/sass'
                });
            });

            it('should parse nested bindings of a single object', () => {
                const results = dry.parse({
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

            it('should support whatever ordering is provided', () => {
                const results = dry.parse({
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

            it('should parse bindings within an array', () => {
                const results = dry.parse({
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

            it('should retain non-string types', () => {
                const results = dry.parse({
                    bool: true,
                    int: 1
                });

                expect(results).to.deep.equal({
                    bool: true,
                    int: 1
                });
            });

            it('should log a warning when passed an invalid config', () => {
                const results = dry.parse({
                    invalid: '{dir.invalidKey}/less'
                });

                expect(results).to.deep.equal({
                    invalid: '{dir.invalidKey}/less'
                });
                expect(console.warn.callCount).to.equal(1);
                expect(console.warn.calledWith('The following key doesn\'t map to any values; ', 'dir.invalidKey')).to.equal(true);
            });
        });

        describe('bi-parsing', () => {
            it('should parse bindings between two objects', () => {
                const results = dry.parse({
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
