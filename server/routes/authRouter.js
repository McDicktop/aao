// const Router = require('express');
// const authController = require('../controller/authController.js');

// const router = new Router();

// // router.post('/', authController.login);
// // router.post('/logout', authController.logout);

// module.exports = router;

const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

// Регистрация
router.post('/register', authController.register);

// Логин
router.post('/login', authController.login);

// Обновление токена
router.post('/refresh', authController.refreshToken);

// Выход
router.post('/logout', authController.logout);

// Защищенный роут (требует access token)
router.get('/protected', authenticate, authController.protectedRoute);

// Админ роут (требует access token и роль admin)
router.get('/admin', authenticate, isAdmin, (req, res) => {
    res.json({ message: 'Admin dashboard', user: req.user });
});

module.exports = router;