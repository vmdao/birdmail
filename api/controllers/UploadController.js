/**
 * CategoryController
 *
 * @description :: Server-side logic for managing Categories
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
const Mailgun = MailgunService.getInstant();

module.exports = {
    upload: function (req, res) {
        const params = req.allParams()
        const {
            mailListId
        } = params;
        console.log(mailListId, 'mailListId')
        UploadService.upload(req, function (err, contactsAdd) {
            if (err) {
                return res.json({
                    status: 400,
                    message: err
                });
            }
            const contactsLength = contactsAdd.length;
            if (contactsLength > 1000 && contactsLength <= 0) {
                return res.json({
                    status: 400,
                    message: 'Data must have contacts > 0 and data < 1000'
                });
            }
            const dataAdd = {
                members: contactsAdd,
                upsert: true // update contact exsiting
            }

            Mailgun.lists(mailListId).members().add(dataAdd)
                .then(function (data) {
                    console.log('data', data)
                    res.json({
                        status: 200,
                        message: 'Add ' + +' new contacts'
                    });
                }, function (err) {
                    res.json({
                        err
                    })
                });

        });
    }
};