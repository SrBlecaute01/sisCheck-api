const Participant = require('../models/participant');
const User = require('../models/user');

class ParticipantService {
    static async createParticipant(participantData) {
        try {
            const participant = await Participant.create({
                ...participantData,
                qrCodeContent: 'temp'
            });

            return await Participant.findByPk(participant.id);
        } catch (error) {
            throw new Error(`Erro ao criar participante: ${error.message}`);
        }
    }

    static async getAllParticipants() {
        return await Participant.findAll({
            where: { isActive: true },
            order: [['created_at', 'DESC']]
        });
    }

    static async getParticipantById(id) {
        return await User.findByPk(id);
    }

    static async getParticipantByQrCode(qrCodeContent) {
        return await User.findByQrCode(qrCodeContent)
    }

    static async updateParticipant(id, participantData) {
        const [updatedRowsCount] = await Participant.update(participantData, {
            where: { id }
        });

        if (updatedRowsCount === 0) {
            throw new Error('Participante não encontrado');
        }

        return await Participant.findByPk(id);
    }

    static async deleteParticipant(id) {
        const participant = await Participant.findByPk(id);

        if (!participant) {
            throw new Error('Participante não encontrado');
        }

        await participant.update({ isActive: false });
        return true;
    }
}

module.exports = ParticipantService;