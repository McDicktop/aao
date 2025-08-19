const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const { check } = require("express-validator");

router.post('/signup',
    [
        check("email", "Email is invalid").trim().isEmail(),
        check("password", "Password must be between 3 and 12 characters long").isLength({ min: 3, max: 12 }),
    ],
    authController.signup);

router.post('/signin', authController.signin);

module.exports = router;