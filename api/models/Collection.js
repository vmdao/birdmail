/**
 * Category.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  tableName: 'collections',
  attributes: {

    name: {
      type: 'string'
    },

    slug: {
      type: 'string'
    },
    code: {
      type: 'string'
    },
    status: {
      type: 'boolean'
    },
    products: {
      collection: 'product',
      via: 'collection'
    }
  }
};