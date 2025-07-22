const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshTokens: [{ token: String, expiresAt: Date }], // Храним refresh токены
    role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Роли (админ/юзер)
});

// Хеширование пароля перед сохранением
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);

    console.log(this.password)
    next();
});

// Метод для проверки пароля
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);