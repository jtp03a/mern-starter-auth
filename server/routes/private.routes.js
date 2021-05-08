const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.get('/', async (req, res) => {
    res.send('You have hit the private api')
});






module.exports = router;