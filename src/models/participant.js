const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Participant = sequelize.define('Participant', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 255]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    qrCodeContent: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'participants',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
        afterCreate: async (participant) => {
            await participant.update({ qrCodeContent: participant.id.toString() });
        }
    }
});

Participant.prototype.toJSON = function() {
    const values = { ...this.get() };
    return values;
};

Participant.findByEmail = function(email) {
    return this.findOne({
        where: { email }
    });
};

Participant.findByQrCode = function(qrCodeContent) {
    return this.findByPk(parseInt(qrCodeContent));
};

Participant.generateQrCodeContent = function(participantId) {
    return `PARTICIPANT_${participantId}`;
};

module.exports = Participant;