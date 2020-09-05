const express = require('express');

const loginController = require('../controllers/login-controller');

const router = express.Router();

// Login profile
// Route: POST 'login/'
router.post('/login/', function (req, res) {
    loginController.login(req, res)
});

module.exports = router;
