/**
 * MessageController
 *
 * @description :: Server-side logic for managing Messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const Mailgun = MailgunService.getInstant();

module.exports = {
    getCount: function (req, res) {
        Message.count().exec((error, found) => {
            res.okApi(found)
        })
    },

    findOne: function (req, res) {
        console.log('Start findOne Message')
        const params = req.allParams();
        const {
            id
        } = params;
        Mailgun.messages(id).info().then(function (data) {
            console.log(data);
            res.json({
                data
            })
        }, function (err) {
            res.json({
                err
            })
        });
    },

    create1: function (req, res) {
        console.log('Start Create Message');

        const params = req.allParams();
        const attributes = Object.assign(attributesDefault, params);

        Mailgun.messages().send(attributes).then(function (data) {
            console.log(data);
            res.json({
                data
            })
        }, function (err) {
            res.json({
                err
            })
        });

    },

    create: function (req, res) {
        console.log('Start CreateBatch Messages');

        const params = req.allParams(),
            attributesDefault = DataDefaultService.getData('message'),
            fields = DataDefaultService.getField(attributesDefault),
            {
                from,
                deliveryTime,
                campaigns,
                contacts,
                maillists,
            } = params;
        if (!from || !maillists) {
            return res.json({
                error: {
                    statusCode: 400,
                    message: 'From Address, To Address is wrong'
                }
            })
        }
        Object.assign(attributesDefault, params);

        if (Array.isArray(contacts)) {
            const to = [],
                variables = {};

            contacts.forEach(contact => {
                if (typeof contact.email === 'string') {
                    to.push(contact.email)
                    variables[contact.email] = _.omit(contact, 'email')
                }
            })

            if (to.length > 0) {
                attributesDefault.to = to;
                attributesDefault['recipient-variables'] = variables;
            }

        }

        if (Array.isArray(maillists)) {
            const to = [],
                variables = {};

            maillists.forEach(contact => {
                if (typeof contact.address === 'string') {
                    to.push(contact.address)
                    variables[contact.address] = _.omit(contact, 'address')
                }
            })

            if (to.length > 0) {
                attributesDefault.to = to;
                attributesDefault['recipient-variables'] = variables;
            }

        }

        if (campaigns && campaigns.name) {
            attributesDefault['o:campaign'] = campaigns.id;
        }

        if (deliveryTime) {
            const date = new Date(deliveryTime).toGMTString();
            console.log('date', date)
            attributesDefault['o:deliverytime'] = date;
        }
        if (attributesDefault['o:deliverytime'] === null || attributesDefault['o:deliverytime'] === '') {
            delete attributesDefault['o:deliverytime'];
        }

        const attributes = _.pick(attributesDefault, fields);

        console.log('attributes', attributes);
        Message.create(attributes).then(message => {
            Mailgun.messages().send(attributes).then(function (data) {
                console.log(data);
                return res.json(data)
            }, function (error) {
                return res.json({
                    error
                })
            });
        }).catch(error => {
            return res.json({
                error
            })
        })


    },

    update: function (req, res) {
        return res.json({
            data: {
                status: 200
            }
        })
    },

    destroy: function (req, res) {
        return res.json({
            data: {
                status: 200
            }
        })
    }

};