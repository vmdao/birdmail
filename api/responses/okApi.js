module.exports = function (data, code, message, root) {
    var response = _.assign({
        code: code || 'OK',
        message: message || 'Operation is successfully executed',
        data: data || {}
    }, root);

    //this.req._sails.log.silly('Sent (200 OK)\n', response);

    this.res.status(200);
    this.res.jsonx(response);
};