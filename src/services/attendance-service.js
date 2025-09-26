const { Attendance, Participant, Activity, User } = require('../models/associations');
const ActivityService = require('./activity-service')

class AttendanceService {
    static async registerAttendance(userId, activityId, keyword) {
        try {
            const participant = await User.findByPk(userId);
            if (!participant || !participant.isActive) {
                throw new Error('Participante não encontrado ou inativo');
            }

            const activity = await Activity.findByPk(activityId);
            if (!activity || !activity.isActive) {
                throw new Error('Atividade não encontrada ou inativa');
            }

            const keyType = await ActivityService.validateActivityKeyword(activityId, keyword);
            let attendance;

            if (keyType === 'ENTRADA') {
                attendance = await Attendance.findOne({ where: { userId, activityId, isActive: true } });
                if (attendance && attendance.entryTime) {
                    throw new Error('Entrada já registrada para este usuário nesta atividade');
                }

                if (attendance) {
                    await attendance.update({ entryTime: new Date() });
                } else {
                    attendance = await Attendance.create({
                        userId,
                        activityId,
                        entryTime: new Date()
                    });
                }
            } else if (keyType === 'SAIDA') {
                attendance = await Attendance.findOne({ where: { userId, activityId, isActive: true } });
                if (!attendance || !attendance.entryTime) {
                    throw new Error('Não é possível registrar saída sem entrada');
                }
                if (attendance.exitTime) {
                    throw new Error('Saída já registrada para este usuário nesta atividade');
                }
                await attendance.update({ exitTime: new Date() });
            } else {
                throw new Error('Palavra-chave não encontrada na atividade.');
            }

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

    static async getAttendanceByParticipant(userId) {
        return await Attendance.findByParticipant(userId);
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

    static async deleteAttendance(userId, activityId) {
        const attendance = await Attendance.findByParticipantAndActivity(userId, activityId);

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
                userId: att.userId,
                participantName: att.participant.fullName,
                participantEmail: att.participant.email,
                registeredAt: att.registeredAt
            }))
        };
    }

    static async getParticipantReport(userId) {
        const attendances = await Attendance.findAll({
            where: { userId, isActive: true },
            include: [
                { model: Activity, as: 'activity' }
            ],
            order: [['registered_at', 'DESC']]
        });

        return {
            userId,
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