const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.get('/', async (req, res) => {
    try {
        const { sub } = req.user;
        const foundUser = await Log.find({
            id: sub
        });
        res.send(foundUser);
    } catch (err) {
        console.log(err);
    }
});






module.exports = router;