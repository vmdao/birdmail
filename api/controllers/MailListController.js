/**
 * MailListController
 *
 * @description :: Server-side logic for managing Maillists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const Mailgun = MailgunService.getInstant();

module.exports = {
    find: function (req, res) {
        console.log('Start find MailList');

        Mailgun.lists().list().then(function (data) {
            console.log(data);
            res.json(data)
        }, function (err) {
            res.json(err)
        });
    },

    findOne: function (req, res) {
        console.log('Start findOne MailList')

        const params = req.allParams(),
            {
                id
            } = params;

        Mailgun.lists(id).info().then(function (data) {
            console.log(data);
            res.json(data)
        }, function (err) {
            res.json(err)
        });
    },

    create: function (req, res) {
        console.log('Start Create MailList');

        const params = req.allParams(),
            attributesDefault = DataDefaultService.getData('mailList'),
            fields = DataDefaultService.getField(attributesDefault);

        Object.assign(attributesDefault, params);
        const attributes = _.pick(attributesDefault, fields);

        Mailgun.lists().create(attributes).then(function (data) {
            console.log(data);
            res.json(data)
        }, function (err) {
            res.json(err)
        });

    },

    update: function (req, res) {
        console.log('Start Update MailList');

        const params = req.allParams(),
            attributesDefault = DataDefaultService.getData('mailList'),
            fields = DataDefaultService.getField(attributesDefault),
            {
                id
            } = params;

        const attributes = _.pick(params, fields);

        Mailgun.lists(id).update(attributes).then(function (data) {
            console.log(data);
            res.json(data)
        }, function (err) {
            res.json(err)
        });
    },

    destroy: function (req, res) {
        console.log('Start Destroy MailList');

        const params = req.allParams(),
            {
                id
            } = params;

        Mailgun.lists(id).delete().then(function (data) {
            console.log(data);
            res.json(data)
        }, function (err) {
            res.json(err)
        });
    }

};