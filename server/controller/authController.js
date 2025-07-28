const User = require('../models/User');
const {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} = require('../utils/tokens');

// Регистрация
exports.register = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ email, password, role });
        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Логин
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // console.log(email, password)

        const user = await User.findOne({ email });


        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log(user._id, user.role)

        const accessToken = generateAccessToken(user._id, user.role);
        const refreshToken = generateRefreshToken(user._id);

        console.log(accessToken, refreshToken)

        // Сохраняем refresh token в базу
        user.refreshTokens.push({
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 дней
        });
        await user.save();

        // Устанавливаем refresh token в httpOnly cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',          ////
            sameSite: 'strict',                                     ////
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 дней
        });

        return res.status(200).json({
            accessToken,
            role: user.role,
            userId: user._id
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Обновление токена
exports.refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            return res.status(401).json({ message: 'No refresh token' });
        }

        const decoded = verifyRefreshToken(refreshToken);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        // Проверяем, что токен есть в базе
        const tokenExists = user.refreshTokens.some(
            tokenObj => tokenObj.token === refreshToken
        );

        if (!tokenExists) {
            return res.status(401).json({ message: 'Token revoked' });
        }

        const newAccessToken = generateAccessToken(user._id, user.role);
        return res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(401).json({ message: 'Invalid refresh token' });
    }
};

// Выход
exports.logout = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        // console.log(req)
        if (!refreshToken) {
            return res.sendStatus(204);
        }

        const decoded = verifyRefreshToken(refreshToken);
        const user = await User.findById(decoded.userId);

        if (user) {
            // Удаляем refresh token из базы
            user.refreshTokens = user.refreshTokens.filter(
                tokenObj => tokenObj.token !== refreshToken
            );
            await user.save();
        }

        // Очищаем куки
        res.clearCookie('refreshToken');
        return res.status(204).json({ messgae: 'User log out success' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Защищенный роут
exports.protectedRoute = (req, res) => {
    return res.status(200).json({ message: 'Protected data', user: req.user });
};