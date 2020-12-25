const express = require('express');

const profileController = require('../controllers/user-controller');

const router = express.Router();

// Create profile
// Route: POST 'register/'
router.post('/user/', function (req, res) {
    profileController.createUser(req, res);
});

// Delete profile
// Route: DELETE 'login/:id'
router.delete('/user/:id', function (req, res) {
    profileController.deleteUser(req, res);
});

// Get profile
// Route: GET 'login/:username'
router.get('/user/:username', function (req, res) {
    profileController.getUser(req, res);
});

// Update profile
// Route: POST 'login/:id'
router.post('/user/:id', function (req, res) {
    profileController.updateUser(req, res);
});

// Pagination characters
// Route: GET 'login/paginate/?:page'
router.get('/user/paginate/:page?', function (req, res) {
    profileController.getUsers(req, res);
});

module.exports = router;
