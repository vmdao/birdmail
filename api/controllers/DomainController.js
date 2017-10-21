/**
 * DomainController
 *
 * @description :: Server-side logic for managing Domains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const Mailgun = MailgunService.getInstant();

module.exports = {
    find: function (req, res) {
        console.log('Start Find Domains')
        Mailgun.domains().list().then(function (data) {
            console.log(data);
            res.json({
                data
            })
        }, function (err) {
            res.json({
                err
            })
        });
    }
};