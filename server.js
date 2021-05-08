require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('express-jwt');
const csrf = require('csurf');

const publicRoutes = require('./server/routes/public.routes');
const privateRoutes = require('./server/routes/private.routes');

const csrfProtection = csrf({ cookie: true });

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


app.use('/api/', publicRoutes);
  
  const checkJwt = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    issuer: 'api.jpeterson',
    audience: 'api.jpeterson',
    getToken: req => req.cookies.token
  });
  
  app.use(csrfProtection);
  
  app.get('/api/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() })
  });
  
  app.use('/api/private/', checkJwt, privateRoutes);

mongoose
  .connect(process.env.MONGODB_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false,
  })
  .then(() => console.log('mongoDB connected...'));

module.exports = app;
