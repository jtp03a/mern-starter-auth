const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const jwtDecode = require('jwt-decode');
const { createToken, hashPassword, verifyPassword } = require('./../utilities');

router.get('/', (req, res) => {
  res.send('You have hit the app api')
})

router.post('/auth/login', async (req, res) => {
  console.log(req.body)
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      username
    }).lean();

    if (!user) {
      console.log('Username not found');
      return res.status(403).json({
        message: 'Wrong username or password.'
      });
    }

    const passwordIsValid = await verifyPassword(
      password,
      user.password
    );

    if (passwordIsValid) {

      if (user.changepassword) {
        return res.status(403).json({
          message: 'You need to change your password',
          passwordstatus: user.changepassword
        })
      }  
      
      const { password, ...rest } = user;

      const userInfo = Object.assign({}, { ...rest });

      const token = createToken(userInfo);

      const tokenDecoded = jwtDecode(token);
      const tokenExpiration = tokenDecoded.exp;

      res.cookie('token', token, {
        httpOnly: true
      });
      
      console.log('User logged in')
      res.json({
        message: 'Authentication successful',
        token,
        userInfo,
        tokenExpiration
      });
    } else {
      res.status(403).json({ message: 'Wrong username or password' });
      console.log('Wrong username or password');
    }
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
    console.log(err);
  }
});

router.post('/auth/changepassword', async (req, res) => {
  try {
    const { username, password, newpass } = req.body;
    const user = await User.findOne({
      username
    }).lean();

    if (!user) {
      console.log('Username not found');
      return res.status(403).json({
        message: 'Wrong username or password.'
      });
    }

    const passwordIsValid = await verifyPassword(
      password,
      user.password
    );

    if (passwordIsValid) {
      const hashedPassword = await hashPassword(newpass);

      const foundUser = await User.findOneAndUpdate({
        username: user.username
      }, { $set: { password: hashedPassword, changepassword: false } }
      );
      return res.json({message: 'Your password has been updated'})
    } else {
      res.status(403).json({ message: 'Wrong username or password' });
      console.log('Wrong username or password');
    }

  } catch (err) {
    console.log(err)
  }
})


router.post('/auth/signup', async (req, res) => {
  console.log(req.body)
  try {
    const { firstname, lastname, email, username } = req.body

    const hashedPassword = await hashPassword(req.body.password);

    const userData = {
      email: email.toLowerCase(),
      firstname,
      lastname,
      username,
      password: hashedPassword,
      role: 'user',
      changepassword: false
    };

    const existingUsername = await User.findOne({
      username: userData.username
    }).lean();

    if (existingUsername) {
      console.log('Username already exists')
      return res.status(400).json({ message: 'Username already exists' });
    }

    const existingEmail = await User.findOne({
      email: userData.email
    }).lean();

    if (existingEmail) {
      console.log('Email already exists')
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new User(userData);
    const savedUser = await newUser.save();

    if (savedUser) {
      const token = createToken(savedUser);
      const tokenDecoded = jwtDecode(token);
      const tokenExpiration = tokenDecoded.exp;

      const {
        firstname,
        lastname,
        email,
        role,
        username
      } = savedUser;

      const userInfo = {
        firstname,
        lastname,
        email,
        role,
        username
      };

      res.cookie('token', token, { httpOnly: true });
      console.log('User created')
      return res.json({
        message: 'User created',
        token,
        userInfo,
        tokenExpiration
      })
    } else {
      return res.status(400).json({ message: 'There was a problem creating your account' })
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'There was a problem creating your account' });
  }
})

module.exports = router;
