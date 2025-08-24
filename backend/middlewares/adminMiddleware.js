const { verifyToken } = require('../utils/auth.js');
const User = require('../models/User.js');

module.exports = async function (req, res, next) {

    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(403).json({ message: 'Token missing' });
        }

        let userId;

        try {
            const { id, role } = verifyToken(token);

            if (!id || !role || role !== 'admin') {
                return res.status(403).json({
                    message: "Invalid user",
                    error: "USER_ERROR",
                });
            }

            userId = id;

        } catch (verifyError) {
            return res.status(400).json({
                message: "Invalid token",
                error: verifyError,
            });
        }

        req.user = await User.findById(userId).select('-password');
        next();
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Internal server error",
            error: "SERVER_ERROR",
        });
    }
}


