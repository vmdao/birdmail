var passport = require('passport');

module.exports = {

    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

    pageLogin: function (req, res) {
        res.view('pages/login', {
            layout: 'layouts/authLayout'
        });
    },

    printSignUp: function (req, res) {
        res.view('pages/signup', {
            layout: 'layouts/authLayout'
        });
    },

    login: function (req, res) {

        passport.authenticate('local', function (err, user, info) {
        
            if ((err) || (!user)) {
                return res.view('pages/login', {
                    layout: 'layouts/authLayout',
                    message: info.message
                });
            }

            req.logIn(user, function (err) {

                if (err) return res.send(err);

                if (req.session.backurl) {
                    return res.redirect(req.session.backurl);
                } else if (req.param('url')) {
                    return res.redirect(req.param('url'));
                } else {
                    return res.redirect('/go');
                }
            });

        })(req, res);
    },

    logout: function (req, res) {
        req.logout();
        res.redirect('/');
    }
};
