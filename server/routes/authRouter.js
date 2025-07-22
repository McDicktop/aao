const Router = require('express');
const authController = require('../controller/authController.js');

const router = new Router();

router.get('/', authController.login);

module.exports = router;