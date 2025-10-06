// seedUsers.js

const { Op } = require('sequelize');
const sequelize = require('../config/database');
const User = require('../models/user');
require('../models/associations');

const commonUsers = [
    {
        name: 'Everson Soares',
        cpf: '937.822.370-21',
        email: 'everson@email.com',
        password: 'senha123'
    },
    {
        name: 'Teste User',
        cpf: '807.664.590-55',
        email: 'teste@teste.com',
        password: 'teste123'
    }
];

const seedUsers = async () => {
    try {
        await sequelize.sync();
        console.log('Conexão estabelecida e modelos sincronizados.');

        const userEmails = commonUsers.map(user => user.email);

        const existingUsers = await User.findAll({
            where: {
                email: {
                    [Op.in]: userEmails
                }
            }
        });
        const existingEmails = new Set(existingUsers.map(u => u.email));

        const newUsersToCreate = commonUsers.filter(user => !existingEmails.has(user.email));

        if (newUsersToCreate.length === 0) {
            console.log('Todos os usuários comuns da lista já existem.');
            return;
        }

        const usersForDb = newUsersToCreate.map(user => ({
            ...user,
            role: 'USER',
            qrCodeContent: `temp_user_${user.email}_${Date.now()}`
        }));

        await User.bulkCreate(usersForDb, { individualHooks: true });

        console.log(`${newUsersToCreate.length} usuários criados com sucesso!`);

    } catch (error) {
        console.error('Erro ao executar o seed de usuários comuns:', error);
        process.exit(1);
    } finally {
        await sequelize.close();
        console.log('Conexão com o banco de dados fechada.');
    }
};

seedUsers();