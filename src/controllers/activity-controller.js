const ActivityService = require('../services/activity-service');
const QRCode = require('qrcode')

const activityController = {
    createActivity: async (req, res) => {
        try {
            const {
                activityName,
                description,
                startDate,
                endDate,
                keyword_entry,
                keyword_exit
            } = req.body;

            if (!activityName) {
                return res.status(400).json({
                    success: false,
                    error: 'Nome da atividade é obrigatório'
                });
            }

            if (!keyword_entry || !keyword_exit) {
                return res.status(400).json({
                    success: false,
                    error: 'Palavra chave de entrada e saída são obrigatórias.'
                });
            }

            const activity = await ActivityService.createActivity({
                activityName,
                description,
                startDate,
                endDate,
                keyword_entry,
                keyword_exit
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

    getAllActivityByUser: async (req, res) => {
        try {
            const { id } = req.params;
            const activities = await ActivityService.getActivityByUser(id);

            if (!activities) {
                return res.status(404).json({
                    success: false,
                    error: 'Atividade não encontrada'
                });
            }

            res.json({
                success: true,
                data: activities
            });
        } catch (error) {
            console.error('Erro ao buscar atividades:', error);
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
    },

    deletePermanentlyActivity: async (req, res) => {
        try {
            const { id } = req.params;

            await ActivityService.hardDeleteActivity(id);

            res.json({
                success: true,
                message: 'Atividade deletada com sucesso'
            });
        } catch (error) {
            console.error('Erro ao deletar atividade:', error);
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    },

    generateQrCodeKeyWordEntryImage: async (req, res) => {
        try {
            const { id } = req.params;
            console.log("ID PARAMS:", id)
            const activity = await ActivityService.getActivityById(id);

            if (!activity) {
                return res.status(404).json({
                    success: false,
                    error: 'Atividade não encontrada'
                });
            }

            const qrContent = `${activity.id};${activity.keyword_entry}`

            const qrCodeBuffer = await QRCode.toBuffer(qrContent, {
                type: 'png',
                width: 300,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });

            res.set({
                'Content-Type': 'image/png',
                'Content-Length': qrCodeBuffer.length,
                'Content-Disposition': `inline; filename="qrcode-activity-entry-${id}.png"`
            });

            res.send(qrCodeBuffer);
        } catch (error) {
            console.error('Erro ao gerar QR Code:', error);
            res.status(500).json({
                success: false,
                error: 'Erro interno do servidor'
            });
        }
    },

    generateQrCodeKeyWordExitImage: async (req, res) => {
        try {
            const { id } = req.params;
            console.log("ID PARAMS:", id)
            const activity = await ActivityService.getActivityById(id);

            if (!activity) {
                return res.status(404).json({
                    success: false,
                    error: 'Atividade não encontrada'
                });
            }

            const qrContent = `${activity.id};${activity.keyword_exit}`

            const qrCodeBuffer = await QRCode.toBuffer(qrContent, {
                type: 'png',
                width: 300,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });

            res.set({
                'Content-Type': 'image/png',
                'Content-Length': qrCodeBuffer.length,
                'Content-Disposition': `inline; filename="qrcode-activity-exit-${id}.png"`
            });

            res.send(qrCodeBuffer);
        } catch (error) {
            console.error('Erro ao gerar QR Code:', error);
            res.status(500).json({
                success: false,
                error: 'Erro interno do servidor'
            });
        }
    },

    generateQrCodeBase64: async (req, res) => {
        try {
            const { id } = req.params;
            const userParticipant = await ParticipantService.getParticipantById(id);

            if (!userParticipant) {
                return res.status(404).json({
                    success: false,
                    error: 'Participante não encontrado'
                });
            }

            const qrCodeDataURL = await QRCode.toDataURL(participant.qrCodeContent, {
                type: 'image/png',
                width: 300,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });

            res.json({
                success: true,
                data: {
                    userId: userParticipant.id,
                    participantName: userParticipant.fullName,
                    qrCodeContent: userParticipant.qrCodeContent,
                    qrCodeImage: qrCodeDataURL
                }
            });
        } catch (error) {
            console.error('Erro ao gerar QR Code base64:', error);
            res.status(500).json({
                success: false,
                error: 'Erro interno do servidor'
            });
        }
    }
};

module.exports = activityController;