const { Attendance, Participant, Activity } = require('../models/associations');

class AttendanceService {
    static async registerAttendance(participantId, activityId) {
        try {
            const participant = await Participant.findByPk(participantId);
            if (!participant || !participant.isActive) {
                throw new Error('Participante não encontrado ou inativo');
            }

            const activity = await Activity.findByPk(activityId);
            if (!activity || !activity.isActive) {
                throw new Error('Atividade não encontrada ou inativa');
            }

            const existingAttendance = await Attendance.findByParticipantAndActivity(participantId, activityId);
            if (existingAttendance) {
                throw new Error('Presença já registrada para esta atividade');
            }

            const attendance = await Attendance.create({
                participantId,
                activityId,
                registeredAt: new Date()
            });

            return await Attendance.findByPk(attendance.id, {
                include: [
                    { model: Participant, as: 'participant' },
                    { model: Activity, as: 'activity' }
                ]
            });
        } catch (error) {
            throw new Error(`Erro ao registrar presença: ${error.message}`);
        }
    }

    static async getAttendanceByParticipant(participantId) {
        return await Attendance.findByParticipant(participantId);
    }

    static async getAttendanceByActivity(activityId) {
        return await Attendance.findByActivity(activityId);
    }

    static async getAllAttendances() {
        return await Attendance.findAll({
            where: { isActive: true },
            include: [
                { model: Participant, as: 'participant' },
                { model: Activity, as: 'activity' }
            ],
            order: [['registered_at', 'DESC']]
        });
    }

    static async deleteAttendance(participantId, activityId) {
        const attendance = await Attendance.findByParticipantAndActivity(participantId, activityId);

        if (!attendance) {
            throw new Error('Registro de presença não encontrado');
        }

        await attendance.update({ isActive: false });
        return true;
    }

    static async getActivityReport(activityId) {
        const attendances = await Attendance.findAll({
            where: { activityId, isActive: true },
            include: [
                { model: Participant, as: 'participant' }
            ],
            order: [['registered_at', 'ASC']]
        });

        return {
            activityId,
            totalAttendances: attendances.length,
            attendances: attendances.map(att => ({
                participantId: att.participantId,
                participantName: att.participant.fullName,
                participantEmail: att.participant.email,
                registeredAt: att.registeredAt
            }))
        };
    }

    static async getParticipantReport(participantId) {
        const attendances = await Attendance.findAll({
            where: { participantId, isActive: true },
            include: [
                { model: Activity, as: 'activity' }
            ],
            order: [['registered_at', 'DESC']]
        });

        return {
            participantId,
            totalActivities: attendances.length,
            attendances: attendances.map(att => ({
                activityId: att.activityId,
                activityName: att.activity.activityName,
                registeredAt: att.registeredAt
            }))
        };
    }
}

module.exports = AttendanceService;