var fs = require('fs');
var CSV = require('fast-csv');

module.exports = {
    parseCSV: function (data, next) {
        console.log('start parseCSV', data)
        let headers = ["name", "mobile", "email"];
        const {
            mailgun
        } = sails.config;

        if (mailgun && mailgun.headers) {
            headers = mailgun.headers;
        }

        const {
            type,
            path
        } = data;
        const arrayCSV = [];
        console.log('headers', headers)
        fs
            .createReadStream(path)
            .pipe(CSV({
                objectMode: true,
                headers: true,
            }))
            .on('error', function (error) {
                console.log(error);
                next(error, null)
            })
            .on('data', function (data) {
                console.log('data', data)
                arrayCSV.push(data);
            })
            .on('end', function () {
                next(null, arrayCSV)
            });
    }

}