const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');


const messagesCtrl = require('../controllers/messages');
const auth = require('../middleware/auth');

router.get('/', auth, messagesCtrl.getAllMessages);
router.get('/:id', auth, messagesCtrl.getOneMessages);
router.post('/message', auth, multer, messagesCtrl.createOrUpdate);
router.get('/supprimer/:id',auth,messagesCtrl.supprimerMessage);

module.exports = router;