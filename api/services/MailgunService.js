var apiKey = sails.config.mailgun.apiKey;
var domain = sails.config.mailgun.domain;
var mailgun = require('mailgun-js')({
    apiKey: apiKey,
    domain: domain
});

module.exports = {
    getInstant: function () {
        return mailgun;
    }
}