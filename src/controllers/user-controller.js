const User = require('../models/user');
const AuthService = require('../services/auth-service')

const userController = {

    login: async (req, res) => {
        try {
            const { cpf, password } = req.body;

            if (!cpf || !password) {
                return res.status(400).json({
                    success: false,
                    error: 'CPF e senha são obrigatórios'
                });
            }

            const result = await AuthService.login(cpf, password);

            res.json({
                success: true,
                data: result,
                message: 'Login realizado com sucesso'
            });
        } catch (error) {
            console.error('Erro no login:', error);
            res.status(401).json({
                success: false,
                error: error.message
            });
        }
    },

    register: async (req, res) => {
        try {
            const { name, cpf, email, password } = req.body;

            if (!name || !email || !password || !cpf) {
                return res.status(400).json({
                    success: false,
                    error: 'Nome, cpf, email e senha são obrigatórios'
                });
            }

            const result = await AuthService.register({ name, email, password, cpf });

            res.status(201).json({
                success: true,
                data: result,
                message: 'Usuário criado com sucesso'
            });
        } catch (error) {
            console.error('Erro no registro:', error);
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    },

    me: async (req, res) => {
        res.json({
            success: true,
            data: req.user
        });
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll({
                order: [['created_at', 'DESC']]
            });

            res.json({
                success: true,
                data: users,
                count: users.length
            });
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            res.status(500).json({
                success: false,
                error: 'Erro interno do servidor'
            });
        }
    },

    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    error: 'Usuário não encontrado'
                });
            }

            res.json({
                success: true,
                data: user.toJSON()
            });
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            res.status(500).json({
                success: false,
                error: 'Erro interno do servidor'
            });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const userData = req.body;

            const [updatedRowsCount] = await User.update(userData, {
                where: { id }
            });

            if (updatedRowsCount === 0) {
                return res.status(404).json({
                    success: false,
                    error: 'Usuário não encontrado'
                });
            }

            const updatedUser = await User.findByPk(id);

            res.json({
                success: true,
                data: updatedUser.toJSON(),
                message: 'Usuário atualizado com sucesso'
            });
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            res.status(500).json({
                success: false,
                error: 'Erro interno do servidor'
            });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;

            const deletedRowsCount = await User.destroy({
                where: { id }
            });

            if (deletedRowsCount === 0) {
                return res.status(404).json({
                    success: false,
                    error: 'Usuário não encontrado'
                });
            }

            res.json({
                success: true,
                message: 'Usuário deletado com sucesso'
            });
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            res.status(500).json({
                success: false,
                error: 'Erro interno do servidor'
            });
        }
    }
};

module.exports = userController;