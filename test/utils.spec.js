const expect = require('chai').expect;
const utils = require('../src/utils.js');

describe('utils', () => {
    describe('function(deepFind)', () => {
        it('should find values from a path', () => {
            const results = utils.deepFind({
                assets: 'assets'
            }, 'assets');

            expect(results).to.equal('assets');
        });

        it('should find values from a deep path', () => {
            const results = utils.deepFind({
                dir: {
                    assets: 'assets'
                }
            }, 'dir.assets');

            expect(results).to.equal('assets');
        });

        it('should be undefined if a path does not exist', () => {
            const results = utils.deepFind({}, 'assets');

            expect(results).to.equal(undefined);
        });

        it('should be undefined if the object is falsy', () => {
            const results = utils.deepFind(null, 'assets');

            expect(results).to.equal(undefined);
        });
    });
});
