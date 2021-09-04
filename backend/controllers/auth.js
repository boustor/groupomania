const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../app/models');
const { Op } = require("sequelize");

const Users = db.users;
const Messages = db.messages;
const Commentaires = db.commentaires;

exports.allUsers = (req, res, next) => {
    Users.findAll({
        where: {
            admin: {
                [Op.ne]: 1,
            }
        }
    })
        .then((listeUsers) => res.status(200).json(listeUsers))
        .catch(() => res.status(400).json({ messErr: 'rien' }));
};

/*
exports.allUsers = (req, res, next) => {
    Users.findAll()
        .then((listeUsers) => res.status(200).json(listeUsers))
        .catch(() => res.status(400).json({ messErr: 'rien' }));
};
*/
exports.signup = (req, res, next) => {
    const { name, email, password, admin } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            Users.findOrCreate({
                where: { email: email },
                defaults: {
                    name: name,
                    email: email,
                    admin: '0',
                    password: hash
                }
            }).then(function ([user, created]) {
                if (!created) {
                    res.status(400).send('Compte courriel déjà existant');
                } else {
                    if (user) {
                        //res.send(users);
                        res.status(200).json({ message: 'créé' });
                    } else {
                        res.status(400).send('Problème de création de l\'utilisateur');
                    }
                }
            })
        })
        .catch(error => res.status(500).json({ messErr: 'Erreur dans le module de création utilisateur' }));
};

exports.login = (req, res, next) => {
    Users.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ messErr: 'impossible' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ messErr: 'Erreur crypt' });
                    }
                    res.status(200).json({
                        usrId: user.id,
                        admin: user.admin,
                        token: jwt.sign({ userId: user.id },
                            process.env.TOKEN_KEY, { expiresIn: '2h' }
                        )

                    });
                })
                .catch(error => res.status(500).json({ messErr: 'Problème sur le retour utilisateur' }));
        })
        .catch(error => res.status(500).json({ messErr: 'problème dans la recherche' }));
};

exports.ctrlToken = (req, res, next) => {
    return res.status(200).json({ messErr: 'okToken' });
};

exports.supprimer = (req, res, next) => {
    // supprimer utilisateur
    Users.destroy({ where: { id: req.params.id } })
    // suppression code utilisateur dans message et commentaire
    Messages.update(
        {
            id_usr: null
        },
        {
            where: {
                id_usr: req.params.id
            }
        })
    Commentaires.update(
        {
            id_usr: null
        },
        {
            where: {
                id_usr: req.params.id
            }
        })
        return res.status(200).json({ messErr: 'okSuppression' });;
};