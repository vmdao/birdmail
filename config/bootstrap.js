/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function (cb) {
    // It's very important to trigger this callback method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)


    function readDBSettings(next) {

        if (sails.config.settings == undefined) {
            sails.config.settings = {};
        }

        Settings.find({}).exec(function (err, items) {
            items.forEach(function (item) {
                sails.config.settings[item.key] = item.value;
            })
        });

        const users = User.count().exec(function countCB(error, found) {
            if (found > 0) return;

            console.log('User Empty');
            var userModel = {
                name: 'Admin',
                surname: 'admin',
                email: 'aleximong@gmail.com',
                password: '123456789',
                is_admin: true,
            }
            User.create(userModel).exec(function (err, records) {
                if (err) return console.log('Create User defalt Error');

                console.log('User created:', userModel);

            });
        });


    }

    readDBSettings();
    cb();

};
