import request from 'supertest';
import ProductController from '../../../api/controllers/ProductController';

describe('ProductController', function () {
    return
    describe('network', function () {
        it('/product/:slug', () => {
            request(sails.hooks.http.app)
                .get('/product/hey')
                .expect(200)
            // .expect('location', '/mypage', done);
        });
    });

    describe('function', () => {
        it('should check find function', async (done) => {
            // console.log(ProductController);
            Product.getSoldItem('1', done);
            // console.log(User)

        })
    })
});