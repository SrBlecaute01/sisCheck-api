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
    keyword_entry: {
        type: DataTypes.STRING,
        allowNull: false
    },
    keyword_exit: {
        type: DataTypes.STRING,
        allowNull: false
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
    updatedAt: 'updated_at',
    hooks: {
        beforeCreate: (activity) => {
            if (activity.keyword_entry) activity.keyword_entry = activity.keyword_entry.toUpperCase();
            if (activity.keyword_exit) activity.keyword_exit = activity.keyword_exit.toUpperCase();
        },
        beforeUpdate: (activity) => {
            if (activity.keyword_entry) activity.keyword_entry = activity.keyword_entry.toUpperCase();
            if (activity.keyword_exit) activity.keyword_exit = activity.keyword_exit.toUpperCase();
        }
    }
});

Activity.prototype.toJSON = function () {
    const values = { ...this.get() };
    return values;
};

Activity.findByName = function (activityName) {
    return this.findOne({
        where: { activityName }
    });
};

Activity.findActiveActivities = function () {
    return this.findAll({
        where: { isActive: true },
        order: [['created_at', 'DESC']]
    });
};

module.exports = Activity;