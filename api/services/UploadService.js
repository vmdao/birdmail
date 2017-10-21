module.exports = {
    upload: function (req, callback) {
        let rootPath = sails.config.appPath + '/assets/' + sails.config.views.theme + '/images/upload';
        req.file('file').upload({
                dirname: rootPath
            },
            function whenDone(err, uploadedFiles) {
                if (err) {
                    sails.log.error(err);
                    return callback(err, null);
                }
                if (uploadedFiles.length <= 0) {
                    sails.log.error({
                        message: 'no tfile'
                    });
                    return callback({
                        message: 'no tfile'
                    }, null);
                }

                let uploadedFile = uploadedFiles[0];
                let filePath = uploadedFile.fd.split('/');
                let filename = filePath[filePath.length - 1].split('.');
                let name = filename[0];
                let ext = filename[1];
                let file = name + "." + ext;

                const data = {
                    type: '1',
                    path: rootPath + '/' + file
                }
                FileService.parseCSV(data, callback);
            });
    },

    parse: function (data, next) {
        const {
            type,
            path
        } = data;
        const arrayCSV = []
        var stream = fs.createReadStream(path);
        var csvStream = CSV({
                objectMode: true,
                headers: true,
            })

            .on("data", function (data) {
                arrayCSV.push(data);
            })
            .on("end", function () {
                next(arrayCSV)
            });

        stream.pipe(csvStream);
    }

}