const express = require('express');
const router = express.Router();
const authController = require('../controllers/user-controller');
const { authMiddleware } = require('../middlewares/auth-middleware');

// Rotas públicas
router.post('/login', authController.login);
router.post('/register', authController.register);

// Rotas protegidas
router.get('/me', authMiddleware, authController.me);

module.exports = router;