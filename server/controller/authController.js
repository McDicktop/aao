const User = require('../models/User');

const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret } = require('../config.js');

const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role
    }

    return jwt.sign(payload, secret, { expiresIn: '10h' });
}

class authController {

    async signup(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Errors while registration: ', errors });
            }

            const { email, password } = req.body;
            const candidate = await User.findOne({ email });
            if (candidate) {
                return res.status(400).json({ message: 'User already exist!' })
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({ email, password: hashPassword, role: 'admin' });
            await user.save();
            return res.json({ message: 'Admin was created.' })
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Registration error' });
        }
    }

    async signin(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: `User ${email} couldnt be found` })
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: `Invalid password` })
            }
            const token = generateAccessToken(user._id, user.role);
            // return res.json({ token, values: { _id: user._id, email: user.email } });
            return res.json({ token });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Login error' });
        }
    }
}


module.exports = new authController();