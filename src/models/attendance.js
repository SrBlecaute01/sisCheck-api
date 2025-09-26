const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Attendance = sequelize.define('Attendance', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
        references: {
            model: 'users',
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
    entryTime: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'entry_time'
    },
    exitTime: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'exit_time'
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
            fields: ['user_id', 'activity_id']
        }
    ]
});

Attendance.prototype.toJSON = function() {
    const values = { ...this.get() };
    return values;
};

Attendance.findByParticipant = function(userId) {
    return this.findAll({
        where: { userId, isActive: true },
        order: [['registered_at', 'DESC']]
    });
};

Attendance.findByActivity = function(activityId) {
    return this.findAll({
        where: { activityId, isActive: true },
        order: [['registered_at', 'ASC']]
    });
};

Attendance.findByParticipantAndActivity = function(userId, activityId) {
    return this.findOne({
        where: { userId, activityId }
    });
};

module.exports = Attendance;