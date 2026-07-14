const express = require('express');
const router = express.Router();
const { checkLogin, generateToken } = require('./../utils/authUtils');

router.post('/login', function(req, res, next) {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return res.status(400).json({ error: 'userName and password are required' });
    }
    checkLogin(userName, password).then(user => {
        if (user) {
            const token = generateToken(user);
            res.json({ token, userName: user.userName });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    }).catch(err => {
        res.status(500).json({ error: 'Server error' });
    });
});

module.exports = router;
