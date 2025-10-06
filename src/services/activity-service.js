const { Op } = require('sequelize');
const Activity = require('../models/activity');

class ActivityService {
    static async createActivity(activityData) {
        try {
            const existing = await Activity.findOne({
                where: {
                    [Op.or]: [
                        { keyword_entry: activityData.keyword_entry },
                        { keyword_exit: activityData.keyword_exit }
                    ]
                }
            });

            if (existing) {
                throw new Error('Já existe uma atividade com essa palavra-chave de entrada ou saída.');
            }

            const activity = await Activity.create(activityData);
            return activity;
        } catch (error) {
            throw new Error(`Erro ao criar atividade: ${error.message}`);
        }
    }

    static async getAllActivities() {
        return await Activity.findActiveActivities();
    }

    static async getActivityById(id) {
        return await Activity.findByPk(id);
    }

    static async getActivityByName(activityName) {
        return await Activity.findByName(activityName);
    }

    static async updateActivity(id, activityData) {
        const [updatedRowsCount] = await Activity.update(activityData, {
            where: { id }
        });

        if (updatedRowsCount === 0) {
            throw new Error('Atividade não encontrada');
        }

        return await Activity.findByPk(id);
    }

    static async deleteActivity(id) {
        const activity = await Activity.findByPk(id);

        if (!activity) {
            throw new Error('Atividade não encontrada');
        }

        // Soft delete - apenas marca como inativo
        await activity.update({ isActive: false });
        return true;
    }

    static async hardDeleteActivity(id) {
        const deletedRowsCount = await Activity.destroy({
            where: { id }
        });

        return deletedRowsCount > 0;
    }

    static async validateActivityKeyword(activityId, keyword) {
        const activity = await Activity.findByPk(activityId);
        if (!activity) {
            throw new Error('Atividade não encontrada');
        }

        const palavra = keyword.trim().toUpperCase();
        if (palavra === activity.keyword_entry.trim().toUpperCase()) {
            return 'ENTRADA';
        }
        if (palavra === activity.keyword_exit.trim().toUpperCase()) {
            return 'SAIDA';
        }
        return false;
    }
}

module.exports = ActivityService;