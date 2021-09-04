const express = require('express');
const router = express.Router();


const authCtrl = require('../controllers/auth');
const ctrlPassword = require('../middleware/ctrlPassword');
const auth = require('../middleware/auth');

router.get('/',auth, authCtrl.allUsers);
router.post('/signup', ctrlPassword, authCtrl.signup);
router.post('/login', authCtrl.login);
router.get('/ctrlToken',auth, authCtrl.ctrlToken)
router.get('/supprimer/:id',auth,authCtrl.supprimer)

module.exports = router;