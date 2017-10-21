/**
 * MainController
 *
 * @description :: Server-side logic for managing main functions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /**
   * `MainController.index()`
   */
  index: async function (req, res) {
    const products = await Product.find({});
    const categories = await Category.find({});
   
    res.view('pages/homepage', {
      products: products,
      categories: categories
    });
  },
}