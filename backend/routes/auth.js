const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/register', upload.single('avatar'), authController.register);

router.post('/login', authController.login);

router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
