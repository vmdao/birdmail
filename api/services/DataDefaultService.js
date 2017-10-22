module.exports = {
    getData: function (type) {
        switch (type) {
            case 'message':
                return {
                    subject: sails.config.mailgun.subject,
                    to: sails.config.mailgun.to,
                    from: sails.config.mailgun.from,
                    html: sails.config.mailgun.html,
                    'o:tag': sails.config.mailgun['o:tag'],
                    'o:campaign': null,
                    'o:deliverytime': null,
                    'o:tracking': sails.config.mailgun['o:tracking'],
                    'o:tracking-clicks': sails.config.mailgun['o:tracking-clicks'],
                    'o:tracking-opens': sails.config.mailgun['o:tracking-opens'],
                    'recipient-variables': sails.config.mailgun['v:my-var'],
                }
            case 'mailList':
                return {
                    address: sails.config.mailgun.address,
                    name: sails.config.mailgun.name,
                    description: sails.config.mailgun.description,
                    access_level: sails.config.mailgun.access_level
                }
            case 'mailListMember':
                return {

                }
            case 'campaign':
                return {
                    id: 'hey@vuminhdao.info',
                    name: sails.config.mailgun.name
                }
        }
    },

    getField: function (object) {
        const fields = [];

        for (let field in object) {
            if (object.hasOwnProperty(field)) {
                fields.push(field);
            }
        }
        return fields;
    }
}