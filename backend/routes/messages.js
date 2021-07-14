const express = require('express');
const router = express.Router();


const messagesCtrl = require('../controllers/messages');
const auth = require('../middleware/auth');

router.get('/',auth, messagesCtrl.getAllMessages);

module.exports = router;