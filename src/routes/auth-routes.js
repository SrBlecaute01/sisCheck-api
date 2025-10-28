const express = require('express');
const router = express.Router();
const authController = require('../controllers/user-controller');
const { authMiddleware } = require('../middlewares/auth-middleware');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/getUsers', authMiddleware, authController.getAllUsers)
router.put('/:id/deactivate-user', authMiddleware, authController.deactivateUser)

router.get('/me', authMiddleware, authController.me);

module.exports = router;