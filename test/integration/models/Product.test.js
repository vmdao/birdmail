import { expect } from 'chai';

describe('#Product Model', () => {
    
    describe('getSoldItem()', () => {

        it('expect false', async () => {
            const productsSold = await Product.getSoldItem(0);
            expect(productsSold).to.be.false;
        })

        it('expect 1', async () => {

            const productsSold = await Product.getSoldItem(1);
            expect(productsSold).to.be.equal(0);
        })

    })

    describe('getProduct()', () => {
        it('expect object', async () => {
            const product = await Product.getProduct({ slug: 'tshirt' });
            console.log(product)
            expect(typeof product).to.be.a('object');
        })
    })

})