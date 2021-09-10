const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const messagesCtrl = require('../controllers/messages');
const owner = require('../middleware/isOwner');
const ownerdel = require('../middleware/isOwnerdel');
const auth = require('../middleware/auth');

router.get('/', auth, messagesCtrl.getAllMessages);
router.get('/:id', auth, messagesCtrl.getOneMessages);
router.post('/message', auth, owner, messagesCtrl.createOrUpdate);
router.post('/image', multer, messagesCtrl.image);
router.delete('/supprimer/:id',auth, ownerdel, messagesCtrl.supprimerMessage);

module.exports = router;