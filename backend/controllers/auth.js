const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../app/models');
const Users = db.users;


exports.signup = (req, res, next) => {
    const { name, email, password, admin } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            Users.findOrCreate({
                where: { email: email },
                defaults: {
                name: name,
                email: email,
                admin: admin,
                password: hash
                }
            }).then(function ([user,created]) {
                if (!created) {
                    res.status(400).send('Compte courriel déjà existant');
                } else {
                    if (user) {
                        //res.send(users);
                        res.status(200).json({message:'créé'});
                    } else {
                        res.status(400).send('Problème de création de l\'utilisateur');
                    }
                }
            })
        })
        .catch(error => res.status(500).json({ message: 'Erreur dans le module de création utilisateur' }));
};

exports.login = (req, res, next) => {
       Users.findOne({ email: req.body.email })
        .then(user => { 
            if (!user) {
                return res.status(401).json({ message: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Email ou mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        usrId: user.id,
                        token: jwt.sign({ userId: user.id},
                            process.env.TOKEN_KEY, { expiresIn: '24h' }
                        )

                    });
                })
                .catch(error => res.status(500).json({ message: 'Problème sur le retour utilisateur' }));
        })
        .catch(error => res.status(500).json({ message: 'problème dans la recherche' }));
};