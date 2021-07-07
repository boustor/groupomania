const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../app/models');
const users = db.users;


exports.signup = (req, res, next) => {
    const { name, email, password, admin } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            users.findOrCreate({
                where: { email: email },
                defaults: {
                name: name,
                email: email,
                admin: admin,
                password: hash
                }
                
            }).then(function (users) {
                if (users[1] == false) {
                    res.status(400).send('Compte courriel déjà existant');
                } else {
                    if (users) {
                        //res.send(users);
                        res.status(200).json({message:'créé'});
                    } else {
                        res.status(400).send('Error in insert new record');
                    }
                }
            })
        })
        .catch(error => res.status(500).json({ message: 'Problème de bcrypt' }));
};

exports.login = (req, res, next) => {
    console.log(process.env.TOKEN_KEY)
    users.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({

                        id_usr: user.id_usr,
                        token: jwt.sign({ id_usr: user.id_usr },
                            process.env.TOKEN_KEY, { expiresIn: '24h' }
                        )

                    });
                })
                .catch(error => res.status(500).json({ message: 'Problème find' }));
        })
        .catch(error => res.status(500).json({ message: 'problème dans la recherche' }));
};