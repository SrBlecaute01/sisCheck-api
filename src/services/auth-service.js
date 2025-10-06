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

    static async login(cpf, password) {
        const cleanCpf = cpf.replace(/[.\-]/g, '');

        const user = await User.findOne({ where: { cpf: cleanCpf } });

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
        const cleanCpf = userData.cpf.replace(/[.\-]/g, '');

        const existingUser = await User.findOne({ where: { cpf: cleanCpf } });

        if (existingUser) {
            throw new Error('CPF já cadastrado');
        }

        const user = await User.create({
            ...userData,
            cpf: cleanCpf,
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