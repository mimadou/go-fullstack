const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const stuffRoutes = require('./routes/stuff')
const userRoutes = require('./routes/User')

mongoose.connect('mongodb+srv://mamadou:mamadou1@cluster0.aoyawau.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  
const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(express.json());

   app.use('/api/stuff', stuffRoutes)
   app.use('/api/auth', userRoutes)
   app.use('/images', express.static(path.join(__dirname, 'images')));




module.exports = app;