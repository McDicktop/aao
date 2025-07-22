const User = require('../models/User');
const { generateAccessToken, generateRefreshToken } = require('../utils/auth');

exports.login = async (req, res) => {

    console.log(req.body)

    const { email, password } = req.body;



    // 1. Проверяем пользователя

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    // 2. Проверяем пароль

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    // 3. Генерируем токены
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);

    // 4. Сохраняем refresh token в БД (можно добавить expiresAt)
    user.refreshTokens.push({ token: refreshToken });
    await user.save();

    // 5. Отправляем токены (accessToken в ответе, refreshToken в httpOnly куки)
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true, // HTTPS only
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
    });

    res.json({ accessToken, role: user.role });
};











































// const User = require('../models/User.js')
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { secret } = require('../config.js');


// const generateAccessToken = (id, role) => {
//     const payload = {
//         id,
//         role
//     }

//     return jwt.sign(payload, secret, { expiresIn: '10h' });
// }


// class authController {

//     async login(req, res) {
//         try {
//             // const hashPassword = await bcrypt.hash("123", 10);
//             // console.log(hashPassword)
//             const { username, password, role } = req.body;
//             const user = await User.findOne({ username });
//             if (!user) {
//                 return res.status(400).json({ message: `User ${username} couldnt be found` })
//             }

//             if (role !== "admin") {
//                 return res.status(400).json({ message: `User is not administartor` })
//             }

//             const validPassword = bcrypt.compareSync(password, user.password);
//             if (!validPassword) {
//                 return res.status(400).json({ message: `Invalid password` })
//             }

//             const token = generateAccessToken(user._id, user.role);
//             return res.json({ token, values: { _id: user._id, name: user.username } })
//         } catch (e) {
//             console.log(e);
//             res.status(400).json({ message: 'Login error' });
//         }
//     }

// }

// module.exports = new authController();