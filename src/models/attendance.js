const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Attendance = sequelize.define('Attendance', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    participantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'participant_id',
        references: {
            model: 'participants',
            key: 'id'
        }
    },
    activityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'activity_id',
        references: {
            model: 'activities',
            key: 'id'
        }
    },
    registeredAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'registered_at'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'attendance',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        {
            unique: true,
            fields: ['participant_id', 'activity_id']
        }
    ]
});

// Métodos de instância
Attendance.prototype.toJSON = function() {
    const values = { ...this.get() };
    return values;
};

// Métodos estáticos
Attendance.findByParticipant = function(participantId) {
    return this.findAll({
        where: { participantId, isActive: true },
        order: [['registered_at', 'DESC']]
    });
};

Attendance.findByActivity = function(activityId) {
    return this.findAll({
        where: { activityId, isActive: true },
        order: [['registered_at', 'ASC']]
    });
};

Attendance.findByParticipantAndActivity = function(participantId, activityId) {
    return this.findOne({
        where: { participantId, activityId }
    });
};

module.exports = Attendance;