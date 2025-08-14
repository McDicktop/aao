const jwt = require('jsonwebtoken');
const { secret } = require('../config.js');

module.exports = function (req, res, next) {

    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'User is not authorized' })
        }

        const { id, role } = jwt.verify(token, secret);

        if (!id || !role || role !== 'admin') {
            return res.status(403).json({ message: `Invalid user's role` })
        }

        req.user = {
            id,         ////////////////////////////
        };
        next();
    } catch (e) {
        console.log(e);
        return res.status(403).json({ message: 'User is not authorized' })
    }
}


