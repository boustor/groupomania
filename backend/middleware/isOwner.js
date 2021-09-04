const db = require('../app/models');
const jwt = require('jsonwebtoken');
const User = db.users;

module.exports = (req, res, next) => {
    const idUser = findUser(req);
    User.findOne({
        _id: req.params.id
    }).then(
        (sauces) => {
            if (idUser !== sauces.userId) {
                res.status(404).json({
                    "message": "Not a valid user"
                    });         
            } else {
                next();
            }
        }
    ).catch(
        () => {
            return res.status(404).json({
                "message": "Sauce not found"
                });
        }
    );
};

function findUser(req) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    return decodedToken.userId;
}
