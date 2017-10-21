module.exports = {
    bum: function (req, res) {
        EmailService.send('text', 'subject', 'emailTo', 'nameTo', function (error, done) {
            res.json({
                error,
                done
            })
        })
    }
}