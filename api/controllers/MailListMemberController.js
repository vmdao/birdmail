/**
 * MailListMemberController
 *
 * @description :: Server-side logic for managing Maillistmembers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const Mailgun = MailgunService.getInstant();

module.exports = {
    find: function (req, res) {
        console.log('Start find MailListMember');
       
        const params = req.allParams(),
        {
            mailListId
        } = params;
        Mailgun.lists(mailListId).members().list().then(function (data) {
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

    findOne: function (req, res) {
        console.log('Start findOne MailListMember');

        const params = req.allParams(),
            {
                id,
                mailListId
            } = params;

        Mailgun.lists(mailListId).members(id).info().then(function (data) {
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

    create: function (req, res) {
        console.log('Start Create MailListMember');

        const params = req.allParams(),
            attributesDefault = DataDefaultService.getData('mailListMember'),
            fields = DataDefaultService.getField(attributesDefault),
            {
                mailListId
            } = params;

        Object.assign(attributesDefault, params);
        const attributes = _.pick(attributesDefault, fields);

        Mailgun.lists(mailListId).members().create(attributes).then(function (data) {
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

    update: function (req, res) {
        console.log('Start Update mailListMember');

        const params = req.allParams(),
            attributesDefault = DataDefaultService.getData('mailListMember'),
            fields = DataDefaultService.getField(attributesDefault),
            {
                id,
                mailListId
            } = params;

        const attributes = _.pick(params, fields);

        Mailgun.lists(mailListId).members(id).update(attributes).then(function (data) {
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
        console.log('Start Destroy mailListMember');

        const params = req.allParams(),
            {
                id,
                mailListId
            } = params;

        Mailgun.lists(id).members(id).delete().then(function (data) {
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

    createBatch: function(req, res){
        
    }

};