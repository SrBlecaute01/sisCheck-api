const ActivityService = require('../services/activity-service');

const activityController = {
    // POST / - Criar atividade
    createActivity: async (req, res) => {
        try {
            const { activityName, description, startDate, endDate } = req.body;

            if (!activityName) {
                return res.status(400).json({
                    success: false,
                    error: 'Nome da atividade é obrigatório'
                });
            }

            const activity = await ActivityService.createActivity({
                activityName,
                description,
                startDate,
                endDate
            });

            res.status(201).json({
                success: true,
                data: activity,
                message: 'Atividade criada com sucesso'
            });
        } catch (error) {
            console.error('Erro ao criar atividade:', error);
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    },

    getAllActivities: async (req, res) => {
        try {
            const activities = await ActivityService.getAllActivities();

            res.json({
                success: true,
                data: activities,
                count: activities.length
            });
        } catch (error) {
            console.error('Erro ao buscar atividades:', error);
            res.status(500).json({
                success: false,
                error: 'Erro interno do servidor'
            });
        }
    },

    getActivityById: async (req, res) => {
        try {
            const { id } = req.params;
            const activity = await ActivityService.getActivityById(id);

            if (!activity) {
                return res.status(404).json({
                    success: false,
                    error: 'Atividade não encontrada'
                });
            }

            res.json({
                success: true,
                data: activity
            });
        } catch (error) {
            console.error('Erro ao buscar atividade:', error);
            res.status(500).json({
                success: false,
                error: 'Erro interno do servidor'
            });
        }
    },

    updateActivity: async (req, res) => {
        try {
            const { id } = req.params;
            const activityData = req.body;

            const activity = await ActivityService.updateActivity(id, activityData);

            res.json({
                success: true,
                data: activity,
                message: 'Atividade atualizada com sucesso'
            });
        } catch (error) {
            console.error('Erro ao atualizar atividade:', error);
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    },

    deleteActivity: async (req, res) => {
        try {
            const { id } = req.params;

            await ActivityService.deleteActivity(id);

            res.json({
                success: true,
                message: 'Atividade desativada com sucesso'
            });
        } catch (error) {
            console.error('Erro ao deletar atividade:', error);
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    }
};

module.exports = activityController;