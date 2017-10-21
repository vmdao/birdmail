import {
    expect
} from 'chai';
describe('#Upload Service', () => {

    describe('parse()', () => {

        it('expect false', done => {
            const rootApp = process.cwd();

            UploadService.parse({
                type: 1,
                path: rootApp + '/test/data/test.csv'
            }, (data) => {
                expect(data.length).to.be.a('number')
                done()
            })
        })
    })


})