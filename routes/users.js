//set up
const express = require('express');
//routes
const router = express.Router();
//model import
const UsersModel = require('../models/users.js');
//CRUD
router.get('/', (req, res) => {
    UsersModel.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json(error);
        })
});
module.exports = router;