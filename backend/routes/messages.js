const express = require('express');
const router = express.Router();


const messagesCtrl = require('../controllers/messages');

router.get('/', messagesCtrl.getAllMessages);

module.exports = router;