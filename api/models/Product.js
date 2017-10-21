/**
 * Product.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var async = require('async');

module.exports = {

  tableName: 'products',

  attributes: {

    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    slug: {
      type: 'string',
      unique: true
    },
    ref: {
      type: 'string'
    },
    stock: {
      type: 'int'
    },
    sku: {
      type: 'string'
    },
    price: {
      type: 'float'
    },
    shipping: {
      type: 'float'
    },
    status: {
      type: 'boolean'
    },
    images: {
      type: 'array'
    },
    category: {
      model: 'Category'
    },
    collection: {
      model: 'Collection'
    },
    options: {
      type: 'array'
    },
    start: {
      type: 'string'
    },
    end: {
      type: 'string'
    }

  },

  findCart: function (condition, cb) {
    Product.findOne(condition, function (err, productWithStock) {
      if (err) {
        cb(err, null);
      } else {
        Product.checkStockReservations(productWithStock, function (err, product) {
          if (err) {
            cb(err, null);
          } else {
            //Load Images
            //Image is empty, return empty array
            cb(null, product);
          }
        });
      }
    });
  },

  checkStockReservations: function (product, cb) {
    Reservation.find({
      product: product.id,
      purchased: false,
      expiry: {
        '>=': new Date()
      }
    }, function (err, reservations) {
      async.reduce(reservations, 0, function (memo, reservation, rcb) {
        rcb(null, memo + parseInt(reservation.qty));
      }, function (err, result) {
        product.stock = product.stock - result;
        cb(err, product);
      });
    });
  },

  getSoldItem: async function (productId) {

    var totalSold = 0;
    var now = new Date();
    var limitData = new Date(now.getTime() - sails.config.settings.cartExpires * 60000);
    sails.controllers.cart.clearOldItems();

    const product = await Product.findOne({
      id: productId
    });

    if (!product) return false;

    const items = await Cart.find({
      product: productId,
      updatedAt: {
        '>=': limitData
      }
    })

    items.forEach(item => {
      totalSold += parseInt(item.qty, 2);
    })

    return totalSold;
  },

  getProduct: async function (criteria) {

    const product = await Product.findOne(criteria);

    if (!product) return null;

    const sold = Product.getSoldItem(product.id);
    if (typeof sold === 'number') {
      product.realStock -= sold;
    }

    return product;
  }

};