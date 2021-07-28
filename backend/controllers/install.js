const db = require('../app/models');
const bcrypt = require('bcrypt');
const User = db.users;

exports.init = () => {
    User.findOne()
        .then((present) => {
        })
        .catch(() => {
            db.sequelize.sync();
            //
         
            bcrypt.hash("Super&2User", 10)
            .then(hash => {
                console.log("password : "+hash)
                User.create({
                    name: "Admin",
                    email: "admin@groupo.com",
                    admin: '1',
                    password: hash
                })
    
            });
            /*
            */
            //
        });
}