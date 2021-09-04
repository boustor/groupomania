const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');


const messagesCtrl = require('../controllers/commentaires');
const auth = require('../middleware/auth');

router.get('/all/:id_mess', messagesCtrl.getAllCommentaires);
router.get('/:id', auth, messagesCtrl.getOneCommentaires);
router.post('/commentaire', auth, multer, messagesCtrl.createOrUpdate);
router.get('/supprimer/:id',auth,messagesCtrl.supprimerCommentaire);

module.exports = router;