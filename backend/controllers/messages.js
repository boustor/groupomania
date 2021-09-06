const bcrypt = require('bcrypt');
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const db = require('../app/models');
const fs = require('fs');
const Messages = db.messages;
const Commentaires = db.commentaires;
const User = db.users;
/*
exports.getAllMessages = (req, res, next) => {
    Messages.findAll({
        attributes: {
            include: [
                [
                    sequelize.literal(`(select count(*) from commentaires as c where c.id_mess = 2)`),'nbCom'
                ]
            ]
        }
    })
        .then((messages) => res.status(200).json(messages))
        .catch(() => res.status(400).json({ messErr: 'rien' }));
};
*/
// ---------- recherche des messages ----------

exports.getAllMessages = (req, res, next) => {
    Messages.findAll()
        .then((messages) => res.status(200).json(messages))
        .catch(() => res.status(400).json({ messErr: 'rien' }));
};

exports.getOneMessages = (req, res, next) => {
    Messages.findOne({ where: { id: req.params.id } })
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
    console.log(req.body)
    return
    const { id, objet, message } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const idUser = decodedToken.userId;
    User.findOne({
        where: { id: idUser }
    }).then(user => {
        if (user) {
            Messages.findOrCreate({
                where: { id: id },
                defaults: {
                    id_usr: user.id,
                    nom: user.name,
                    objet: objet,
                    message: message,
                }
            }).then(function ([lemessage, created]) {
                if (!created) {
                    Messages.update(
                        {
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
                        Messages.findOne().then(
                            function(result) {
                                console.log(result.id)
                            }
                        )
                        res.status(200).json({ messErr: 'créer' });
                    } else {
                        res.status(400).send('Problème de création du message');
                    }
                }
            });
        }
    });
}

exports.image = (req, res, next) => {
    //const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    //console.log(req.file.filename)
/*
    if (req.file) {
        console.log("file");
        console.log(req.body);
    } else {
        console.log("no file");

        console.log(req.body);
    }
    res.json({ message: "post envoyé" });
    */
}

exports.supprimerMessage = (req, res, next) => {
    Messages.destroy({ where: { id: req.params.id } })
        .then((message) => {
            return res.status(200).json(message);
        })
        .catch(() => {
            return res.status(404).json({
                messErr: 'eRetour'
            });
        });
    Commentaires.destroy({ where: { id_mess: req.params.id } })
        .then((message) => {
            return res.status(200).json(message);
        })
        .catch(() => {
            return res.status(404).json({
                messErr: 'eRetour'
            });
        });
};


