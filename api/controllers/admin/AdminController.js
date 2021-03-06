/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  pageIndex: function (req, res) {
    return res.view('pages/admin/index', {
      layout: 'layouts/adminLayout'
    });
  }
};

