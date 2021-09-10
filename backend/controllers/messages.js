const bcrypt = require('bcrypt');
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const db = require('../app/models');
const fs = require('fs');
const Messages = db.messages;
const Commentaires = db.commentaires;
const User = db.users;

// ---------- recherche des messages ----------

exports.getAllMessages = (req, res, next) => {
    Messages.findAll({
        order: [
            ['id', 'DESC']
        ]
    })
        .then((messages) => res.status(200).json(messages))
        .catch(() => res.status(400).json({ messErr: 'rien' }));
};
// ---------- recherche d'un message ----------
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
    const { id, objet, message, imageurl, image } = req.body;
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
                if (image && imageurl) {
                    if (image.indexOf(imageurl) == -1) {
                        fs.unlink(imageurl, () => { })
                    }
                }
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
                    .then(() => res.status(200).json({ messErr: 'okCreation', code: id }))
                    .catch(() => { return res.status(404).json({ messErr: 'BadMessage' }) })
            }
        }
    });
}

exports.image = (req, res, next) => {
    console.log(req.file.filename)
    const imageUrl = `images/${req.file.filename}`
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
exports.supprimerMessage = (req, res, next) => {
    Messages.findOne({ where: { id: req.params.id } })
        .then(message => {
            if (message.imageurl) {
                fs.unlink(message.imageurl, () => { })
            }
            Messages.destroy({ where: { id: req.params.id } })
            Commentaires.destroy({ where: { id_mess: req.params.id } })
        })
        .then(() => { return res.status(200).json({ messErr: 'okSuppression' }) })
        .catch(() => { return res.status(404).json({ messErr: 'eRetour' }) });
};


