var expect = require('chai').expect;
var utils = require('../src/utils.js');

describe('utils', function() {
    describe('function(deepFind)', function() {
        it('should find values from a path', function() {
            var results = utils.deepFind({
                assets: 'assets'
            }, 'assets');

            expect(results).to.equal('assets');
        });

        it('should find values from a deep path', function() {
            var results = utils.deepFind({
                dir: {
                    assets: 'assets'
                }
            }, 'dir.assets');

            expect(results).to.equal('assets');
        });

        it('should be undefined if a path does not exist', function() {
            var results = utils.deepFind({}, 'assets');

            expect(results).to.equal(undefined);
        });

        it('should be undefined if the object is falsy', function() {
            var results = utils.deepFind(null, 'assets');

            expect(results).to.equal(undefined);
        });
    });
});
