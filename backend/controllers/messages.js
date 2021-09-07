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
    const { id, objet, message } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const idUser = decodedToken.userId;
    User.findOne({
        where: { id: idUser }
    }).then(user => {
        if (user) {
            if (id == 0) {
                Messages.create({
                    id_usr: user.id,
                    nom: user.name,
                    objet: objet,
                    message: message,
                })
                    .then(creation => res.status(200).json({ messErr: 'okCreation', code: creation.id }))
                    .catch(() => { return res.status(404).json({ messErr: 'BadMessage' }) })
            } else {
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
                    }).then(() => res.status(200).json({ messErr: 'okCreation', code: id }))
                    .catch(() => { return res.status(404).json({ messErr: 'BadMessage' }) })
            }
            /*
            Messages.findOrCreate({
                where: { id: id },
                defaults: {
                    id_usr: user.id,
                    nom: user.name,
                    objet: objet,
                    message: message,
                }

            })
            .then(function ([lemessage, created]) {
                console.log(lemessage)
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
                        res.status(200).json({ messErr: 'créer' });
                    } else {
                        res.status(400).send('Problème de création du message');
                    }
                }
            });
            */
        }
    });
}

exports.image = (req, res, next) => {
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    console.log(imageUrl)
    console.log("LE id : " + req.body.id)

    Messages.update(
        {
            imageurl: imageUrl
        },
        {
            where: {
                id: req.body.id
            }
        })
}
//{messErr : 'okSupprimer'  }
exports.supprimerMessage = (req, res, next) => {
    Messages.findOne({ where: { id: req.params.id } })
        .then(message => {
            if (message.imageurl) {
                const filename = message.imageurl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => { })
            }
            Messages.destroy({ where: { id: req.params.id } })
            Commentaires.destroy({ where: { id_mess: req.params.id } })
        })
        .then(() => {return res.status(200).json({messErr:'okSuppression'})})
        .catch(() => {return res.status(404).json({messErr: 'eRetour'})});
};


