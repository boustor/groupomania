const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../app/models');
const fs = require('fs');
const Messages = db.messages;
const User = db.users;

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
                messErr: 'Problème recherche'
            });
        });
};

exports.createOrUpdate = (req, res, next) => {
    const { id, objet, message } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const idUser = decodedToken.userId;
    User.findOne({
        where: {id:idUser}
      }).then(user => {
          if (user) {
              console.log(user)
            Messages.findOrCreate({
                where: { id: id },
                defaults: {
                    id_usr: user.id,
                    nom: user.name,
                    objet: objet,
                    message: message
                }
            }).then(function ([message, created]) {
                if (!created) {
                    Messages.update(
                        {
                            id_usr: infoUser.id_usr,
                            nom: infoUser.nom,
                            objet: objet,
                            message: message
                        },
                        {
                            where: {
                                id: id
                            }
                        })
                } else {
                    if (message) {
                        res.status(200).json({ message: 'créé' });
                    } else {
                        res.status(400).send('Problème de création du message');
                    }
                }
            });
          }
      });
    /*
    Messages.findOrCreate({
        where: { id: id },
        defaults: {
            id_usr: infoUser.id_usr,
            nom: infoUser.nom,
            objet: objet,
            message: message
        }
    }).then(function ([message, created]) {
        if (!created) {
            Messages.update(
                {
                    id_usr: infoUser.id_usr,
                    nom: infoUser.nom,
                    objet: objet,
                    message: message
                },
                {
                    where: {
                        id: id
                    }
                })
        } else {
            if (message) {
                res.status(200).json({ message: 'créé' });
            } else {
                res.status(400).send('Problème de création du message');
            }
        }
    });
    */
}
/*
findUser = (req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const id = decodedToken.userId;
    /*
     User.findOne({ where: { id } })
        .then(user => {
            done(null, res)
        });

 User.findOne({ where: { id: id } })
.then((retour) => {res.retour})
}
*/
/*
exports.createSauces = (req, res, next) => {

    const saucesObject = JSON.parse(req.body.sauce);
    delete saucesObject._id;
    const sauces = new Sauces({
        ...saucesObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

    });

    sauces.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.modifySauces = (req, res, next) => {
    let saucesObject;
    if (req.file) {

        Sauces.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink('images/'+filename, () => {})
        });
        console.log("nom sauce : "+req.file.filename)
        saucesObject = {...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
    } else{
        saucesObject = {...req.body}
    }

    const saucesObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body }

    Sauces.updateOne({ _id: req.params.id }, {...saucesObject }).then(
        () => {
            res.status(201).json({
                message: 'Sauce updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.deleteSauces = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauces.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};


exports.likeSauces = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
        .then(
            sauces => {
                if (sauces) {
                    // on va voir si like ou dislike
                    const lastLike = lastVote(sauces, req.body);
                    let treat = false;
                    // il aime la sauce
                    if (req.body.like == 1 && lastLike == '') {
                        treat = likes(sauces, res, req.body)
                    } else
                        // il aime pas la sauce
                        if (req.body.like == -1 && lastLike == '') {
                            treat = dislikes(sauces, res, req.body)
                        } else
                            // il annule sont vote
                            if (req.body.like == 0 && lastLike != '') {
                                treat = clearLike(sauces, res, req.body, lastLike)
                            }

                    if (treat === true) {
                        return res.status(201).json({
                            "message": "Vote well recorded"
                        })
                    } else {
                        return res.status(201).json({
                            "message": "Problem with your vote"
                        })
                    }

                } else {
                    return res.status(404).json({
                        "message": "Sauce not found"
                    })
                }
            }
        ).catch(
            (error) => {
                return res.status(404).json({
                    error: error
                });
            }
        );
};

// recherche dernier vote
function lastVote(sauces, body) {
    let lastLike = '';

    if (sauces.usersLiked && sauces.usersLiked.includes(body.userId)) {
        return lastLike = 'L';
    }
    if (sauces.usersDisliked && sauces.usersDisliked.includes(body.userId)) {
        return lastLike = 'D';
    }
    return lastLike;

}


// il aime la sauce
function likes(sauces, res, body) {
    Sauces.updateOne({ "_id": sauces._id }, { $inc: { "likes": 1 }, $push: { "usersLiked": body.userId } }).then(
        () => { return true }
    )
}

// il aime pas la sauce
function dislikes(sauces, res, body) {
    Sauces.updateOne({ "_id": sauces._id }, { $inc: { "dislikes": 1 }, $push: { "usersDisliked": body.userId } }).then(
        () => { return true }
    )
}
//  on annule le dernier si l'utilisateur à voté
function clearLike(sauces, res, body, lastLike) {
    if (lastLike == 'L') {
        var nLike = 'likes';
        var ntLike = 'usersLiked';
    } else {
        var nLike = 'dislikes';
        var ntLike = 'usersDisliked';
    }

    var lQuery = {};
    var tQuery = {};
    lQuery[nLike] = '-1';
    tQuery[ntLike] = body.userId;

    Sauces.updateOne({ "_id": sauces._id }, { $inc: lQuery, $pull: tQuery }).then(
        () => { return true}
    ).catch(() => {return false});
}
*/
