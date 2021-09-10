const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../app/models');
const fs = require('fs');
const Commentaires = db.commentaires;
const User = db.users;

exports.getAllCommentaires = (req, res, next) => {
    Commentaires.findAll({where: { id_mess: req.params.id_mess }})
        .then((messages) => res.status(200).json(messages))
        .catch(() => res.status(400).json({ messErr: 'rien' }));
};

exports.getOneCommentaires = (req, res, next) => {
    Commentaires.findOne({ where: { id: req.params.id } })
        .then((message) => {
            return res.status(200).json(message);
        })
        .catch(() => {
            return res.status(404).json({
                messErr: 'eRetour'
            });
        });
};

exports.createOrUpdate = (req, res, next) => {
    const { id, id_mess, objet, message } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const idUser = decodedToken.userId;
    User.findOne({
        where: { id: idUser }
    }).then(user => {
        if (user) {
            Commentaires.findOrCreate({
                where: { id: id },
                defaults: {
                    id_usr: user.id,
                    id_mess:id_mess,
                    nom: user.name,
                    objet: objet,
                    message: message,
                }
            }).then(function ([lemessage, created]) {
                if (!created) {
                    Commentaires.update(
                        {
                            id_mess:id_mess,
                            id_usr: user.id_usr,
                            nom: user.nom,
                            objet: objet,
                            message: message
                        },
                        {
                            where: {
                                id: id
                            }
                        })
                        res.status(200).json({ messErr: 'créer' });
                } else {
                    if (lemessage) {
                        res.status(200).json({ messErr: 'créer' });
                    } else {
                        res.status(400).send('Problème de création du message');
                    }
                }
            });
        }
    });
}

exports.supprimerCommentaire = (req, res, next) => {
    Commentaires.destroy({ where: { id: req.params.id } })
        .then((message) => {
            return res.status(200).json(message);
        })
        .catch(() => {
            return res.status(404).json({
                messErr: 'eRetour'
            });
        });
};


