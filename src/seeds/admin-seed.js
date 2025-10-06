// seedAdmin.js

const sequelize = require('../config/database');
const User = require('../models/user');
require('../models/associations');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_CPF = '086.739.870-16';

const seedAdmin = async () => {
    try {
        await sequelize.sync();
        console.log('Conexão estabelecida e modelos sincronizados.');

        const existingAdmin = await User.findOne({ where: { email: ADMIN_EMAIL } });

        if (existingAdmin) {
            console.log('Usuário admin já foi cadastrado.');
            return;
        }

        console.log('Criando usuário administrador padrão...');
        await User.create({
            name: 'Administrador',
            cpf: ADMIN_CPF,
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
            role: 'ADMIN',
            qrCodeContent: `temp_admin_${Date.now()}`
        });

        console.log('Usuário administrador criado com sucesso!');
    } catch (error) {
        console.error('Erro ao executar o seed do administrador:', error);
        process.exit(1);
    } finally {
        await sequelize.close();
        console.log('Conexão com o banco de dados fechada.');
    }
};

seedAdmin();