const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Activity = sequelize.define('Activity', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    activityName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 255]
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'activities',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Activity.prototype.toJSON = function() {
    const values = { ...this.get() };
    return values;
};

Activity.findByName = function(activityName) {
    return this.findOne({
        where: { activityName }
    });
};

Activity.findActiveActivities = function() {
    return this.findAll({
        where: { isActive: true },
        order: [['created_at', 'DESC']]
    });
};

module.exports = Activity;