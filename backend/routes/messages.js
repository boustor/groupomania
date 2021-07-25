const express = require('express');
const router = express.Router();


const messagesCtrl = require('../controllers/messages');
const auth = require('../middleware/auth');

router.get('/', auth, messagesCtrl.getAllMessages);
router.get('/:id', auth, messagesCtrl.getOneMessages);
router.post('/update/:id', auth, messagesCtrl.updateMessages);

module.exports = router;