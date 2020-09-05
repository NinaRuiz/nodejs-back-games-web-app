const express = require('express');

const profileController = require('../controllers/profiles-controller');

const router = express.Router();

// Create profile
// Route: POST 'register/'
router.post('/register/', function (req, res) {
    profileController.createProfile(req, res);
});

// Delete profile
// Route: DELETE 'login/:id'
router.delete('/login/:id', function (req, res) {
    profileController.deleteProfile(req, res);
});

// Get profile
// Route: GET 'login/:username'
router.get('/login/:username', function (req, res) {
    profileController.getProfile(req, res);
});

// Update profile
// Route: POST 'login/:id'
router.post('/login/:id', function (req, res) {
    profileController.updateProfile(req, res);
});

// Pagination characters
// Route: GET 'login/paginate/?:page'
router.get('/login/paginate/:page?', function (req, res) {
    profileController.getProfiles(req, res);
});

module.exports = router;
