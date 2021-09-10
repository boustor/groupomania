const db = require('../app/models');
const Message = db.messages;
const User = db.users;
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const idUser = findUser(req);
    User.findOne({
        where: { id: idUser }
    }).then(user => {
        if (user) {
            if (user.admin == true) {
                next()
            } else {
                Message.findOne({
                    where: { id: req.parmas.id }
                }).then(
                    (retour) => {
                        if (idUser !== retour.id_usr) {
                            res.status(404).json({
                                "messErr": "Utilisateur invalid"
                            });
                        } else {
                            next();
                        }
                    }
                ).catch(() => { next() })
            }
        }
    }).catch(() => { console.log('beurk'); res.status(404).json({ "messErr": "Utilisateur invalid" }) })
}


function findUser(req) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    return decodedToken.userId;
}
