module.exports = function (req, res, next) {
    console.log(req.user)
    if (req.user.is_admin) {
        req.session.backurl = null;
        return next();
    }
    else {
        return res.redirect('/');
    }
};