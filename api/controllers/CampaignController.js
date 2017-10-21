/**
 * CampaignController
 *
 * @description :: Server-side logic for managing Campaigns
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const Mailgun = MailgunService.getInstant();

module.exports = {
    find: function (req, res) {
        console.log('Start find Campaign')

        Mailgun.campaigns().list().then(function (data) {
            res.json(data)
        }, function (err) {
            res.json({
                err
            })
        });
    },

    findOne: function (req, res) {
        console.log('Start findOne Campaign');

        const params = req.allParams(),
            {
                id
            } = params;

        Mailgun.campaigns(id).info().then(function (data) {
            console.log(data);
            res.json(data)
        }, function (err) {
            res.json({
                err
            })
        });
    },

    create: function (req, res) {
        console.log('Start Create Campaign');

        const params = req.allParams(),
            attributesDefault = DataDefaultService.getData('campaign'),
            fields = DataDefaultService.getField(attributesDefault);

        Object.assign(attributesDefault, params);
        const attributes = _.pick(attributesDefault, fields);

        Mailgun.campaigns().create(attributes).then(function (data) {
            console.log(data);
            res.json(data)
        }, function (err) {
            res.json({
                err
            })
        });

    },

    update: function (req, res) {
        console.log('Start Update Campaign');

        const params = req.allParams(),
            attributesDefault = DataDefaultService.getData('campaign'),
            fields = DataDefaultService.getField(attributesDefault),
            {
                id
            } = params;

        const attributes = _.pick(params, fields);

        Mailgun.campaigns(id).update(attributes).then(function (data) {
            console.log(data);
            res.json(
                data
            )
        }, function (err) {
            res.json({
                err
            })
        });
    },

    destroy: function (req, res) {
        console.log('Start Destroy Campaign');

        const params = req.allParams(),
            {
                id
            } = params;

        Mailgun.campaigns(id).destroy().then(function (data) {
            console.log(data);
            res.json(
                data
            )
        }, function (err) {
            res.json({
                err
            })
        });
    }

};