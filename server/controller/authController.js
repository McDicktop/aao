const User = require('../models/User');

const { validationResult } = require('express-validator');

const { generateToken, hashPassword, comparePassword } = require('../utils/auth.js');

class authController {

    async signup(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Errors while registration',
                    error: errors
                });
            }

            const { email, password } = req.body;

            const candidate = await User.findOne({ email });

            if (candidate) {
                return res.status(409).json({
                    message: "User already exist",
                    error: "USER_EXISTS",
                });
            }

            const hashedPassword = await hashPassword(password);

            const user = new User({ email, password: hashedPassword, role: 'admin' });

            await user.save();
            return res.status(201).json({ message: 'Admin was created.' })
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                message: "Internal server error",
                error: "SERVER_ERROR",
            });
        }
    }

    async signin(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({
                    message: `User ${email} couldnt be found`,
                    error: "USER_MISSING",
                });
            }

            const isValidPassword = await comparePassword(password, user.password);

            if (!isValidPassword) {
                return res.status(400).json({
                    message: "Invalid password",
                    error: "INVALID_PASSWORD",
                });
            }

            const token = generateToken(user._id, user.role);

            return res.status(201).json({ token, userId: user._id });
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                message: "Internal server error",
                error: "SERVER_ERROR",
            });
        }
    }
}


module.exports = new authController();