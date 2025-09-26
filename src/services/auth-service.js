const jwt = require('jsonwebtoken');
const User = require('../models/user');

class AuthService {
    static generateToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || '7d'
        });
    }

    static verifyToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }

    static async login(email, password) {
        const user = await User.findByEmail(email);

        if (!user || !user.isActive) {
            throw new Error('Credenciais inválidas');
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            throw new Error('Credenciais inválidas');
        }

        const token = this.generateToken({
            id: user.id,
            email: user.email,
            role: user.role
        });

        return {
            token,
            user: user.toJSON()
        };
    }

    static async register(userData) {
        const existingUser = await User.findByEmail(userData.email);

        if (existingUser) {
            throw new Error('Email já cadastrado');
        }

        const user = await User.create({
            ...userData,
             qrCodeContent: 'temp'
        });

        const token = this.generateToken({
            id: user.id,
            email: user.email,
            role: user.role
        });

        return {
            token,
            user: user.toJSON()
        };
    }
}

module.exports = AuthService;