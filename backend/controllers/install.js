const db = require('../app/models');
const User = db.users;

exports.init = () => {
    User.findOne()
        .then((present) => {
        })
        .catch(() => {
            db.sequelize.sync();
        });
}     