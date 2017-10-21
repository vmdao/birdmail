module.exports = {
    send: function (text, subject, emailTo, nameTo, cb) {
        const Mailgun = MailgunService.getInstant();
        const data = {
            text: "",
            from: 'MinhVu <info@vuminhdao.info>',
            to: "aleximong@gmail.com",
            subject: "Welcom you to Nhinnaha Colacha",
            html: "<h2>Hi Aleximong</h2></br>Chung toi ra vui mung vi da gap ban",
        };

        Mailgun.messages().send(data, function (error, body) {
            console.log(error, body);
            cb(error, body);
        });
    }

}