const AttendanceService = require('../services/attendance-service');

const attendanceController = {
    // POST / - Registrar presença
    registerAttendance: async (req, res) => {
        try {
            const { participantId, activityId } = req.body;

            if (!participantId || !activityId) {
                return res.status(400).json({
                    success: false,
                    error: 'ID do participante e ID da atividade são obrigatórios'
                });
            }

            const attendance = await AttendanceService.registerAttendance(participantId, activityId);

            res.status(201).json({
                success: true,
                data: attendance,
                message: 'Presença registrada com sucesso'
            });
        } catch (error) {
            console.error('Erro ao registrar presença:', error);
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    },

    // POST /qr - Registrar presença via QR Code
    registerAttendanceByQr: async (req, res) => {
        try {
            const { qrCode, activityId } = req.body;

            if (!qrCode || !activityId) {
                return res.status(400).json({
                    success: false,
                    error: 'QR Code e ID da atividade são obrigatórios'
                });
            }

            // O qrCode é o próprio participantId
            const participantId = parseInt(qrCode);

            const attendance = await AttendanceService.registerAttendance(participantId, activityId);

            res.status(201).json({
                success: true,
                data: attendance,
                message: 'Presença registrada via QR Code com sucesso'
            });
        } catch (error) {
            console.error('Erro ao registrar presença via QR:', error);
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    },

    // GET / - Buscar todas as presenças
    getAllAttendances: async (req, res) => {
        try {
            const attendances = await AttendanceService.getAllAttendances();

            res.json({
                success: true,
                data: attendances,
                count: attendances.length
            });
        } catch (error) {
            console.error('Erro ao buscar presenças:', error);
            res.status(500).json({
                success: false,
                error: 'Erro interno do servidor'
            });
        }
    },

    // GET /participant/:participantId - Buscar presenças por participante
    getAttendanceByParticipant: async (req, res) => {
        try {
            const { participantId } = req.params;
            const attendances = await AttendanceService.getAttendanceByParticipant(participantId);

            res.json({
                success: true,
                data: attendances,
                count: attendances.length
            });
        } catch (error) {
            console.error('Erro ao buscar presenças do participante:', error);
            res.status(500).json({
                success: false,
                error: 'Erro interno do servidor'
            });
        }
    },

    // GET /activity/:activityId - Buscar presenças por atividade
    getAttendanceByActivity: async (req, res) => {
        try {
            const { activityId } = req.params;
            const attendances = await AttendanceService.getAttendanceByActivity(activityId);

            res.json({
                success: true,
                data: attendances,
                count: attendances.length
            });
        } catch (error) {
            console.error('Erro ao buscar presenças da atividade:', error);
            res.status(500).json({
                success: false,
                error: 'Erro interno do servidor'
            });
        }
    },

    // GET /report/activity/:activityId - Relatório de atividade
    getActivityReport: async (req, res) => {
        try {
            const { activityId } = req.params;
            const report = await AttendanceService.getActivityReport(activityId);

            res.json({
                success: true,
                data: report
            });
        } catch (error) {
            console.error('Erro ao gerar relatório da atividade:', error);
            res.status(500).json({
                success: false,
                error: 'Erro interno do servidor'
            });
        }
    },

    // GET /report/participant/:participantId - Relatório de participante
    getParticipantReport: async (req, res) => {
        try {
            const { participantId } = req.params;
            const report = await AttendanceService.getParticipantReport(participantId);

            res.json({
                success: true,
                data: report
            });
        } catch (error) {
            console.error('Erro ao gerar relatório do participante:', error);
            res.status(500).json({
                success: false,
                error: 'Erro interno do servidor'
            });
        }
    },

    // DELETE /:participantId/:activityId - Remover presença
    deleteAttendance: async (req, res) => {
        try {
            const { participantId, activityId } = req.params;

            await AttendanceService.deleteAttendance(participantId, activityId);

            res.json({
                success: true,
                message: 'Registro de presença removido com sucesso'
            });
        } catch (error) {
            console.error('Erro ao remover presença:', error);
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    }
};

module.exports = attendanceController;