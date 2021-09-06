require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const messages = require('./routes/messages');
const commentaires = require('./routes/commentaires');
// mysql


app.use(cors());


  app.use(express.json());
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

 
  app.use('/api/auth', authRoutes);
  app.use('/api/messages',messages);
  app.use('/api/commentaires',commentaires);
 

  module.exports = app;