const express = require('express');
const router = express.Router();
const Auth = require('../controllers/auth.controller');
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');

router.post('/register', imageUpload.single('avatar'), Auth.register);

router.post('/login', Auth.login);

router.get('/user',  authMiddleware, Auth.getUser);

router.delete('/logout', authMiddleware, Auth.logout);

module.exports = router;