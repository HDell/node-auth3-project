//set up
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//additional imports
const router = express.Router(); //routes
const UsersModel = require('../models/users.js'); //model import
const {jwtSecret} = require('../config/secrets.js'); //secret string
//CRUD
router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;
    UsersModel.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});
router.post('/login', (req, res) => {
    const {username, password} = req.body;
    UsersModel.findBy(username)
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({
                    message: `Welcome ${user.username}!`,
                    token,
                });
            } else {
                res.status(401).json({message: 'Invalid Credentials'});
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});
router.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(err => {
            if(err) {
                res.json({message: 'failed logout'});
            } else {
                res.status(200).json({message: 'you have successfully logged out'});
            }
        })
    } else {
        res.status(200).json({message: 'you were not logged in to begin with'});
    }
});
function generateToken(user) {
    const payload = {
        subject: user.id, // sub
        username: user.username
    };
    const options = {
        expiresIn: '1h'
    };
    return jwt.sign(payload, jwtSecret, options);
}
module.exports = router;