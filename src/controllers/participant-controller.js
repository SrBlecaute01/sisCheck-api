const ParticipantService = require('../services/participant-service');
const QRCode = require('qrcode')

const participantController = {
    createParticipant: async (req, res) => {
        try {
            const { fullName, email } = req.body;

            if (!fullName) {
                return res.status(400).json({
                    success: false,
                    error: 'Nome completo é obrigatório'
                });
            }

            const participant = await ParticipantService.createParticipant({
                fullName,
                email
            });

            res.status(201).json({
                success: true,
                data: participant,
                message: 'Participante criado com sucesso'
            });
        } catch (error) {
            console.error('Erro ao criar participante:', error);
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    },

    getAllParticipants: async (req, res) => {
        try {
            const participants = await ParticipantService.getAllParticipants();

            res.json({
                success: true,
                data: participants,
                count: participants.length
            });
        } catch (error) {
            console.error('Erro ao buscar participantes:', error);
            res.status(500).json({
                success: false,
                error: 'Erro interno do servidor'
            });
        }
    },

    getParticipantById: async (req, res) => {
        try {
            const { id } = req.params;
            const participant = await ParticipantService.getParticipantById(id);

            if (!participant) {
                return res.status(404).json({
                    success: false,
                    error: 'Participante não encontrado'
                });
            }

            res.json({
                success: true,
                data: participant
            });
        } catch (error) {
            console.error('Erro ao buscar participante:', error);
            res.status(500).json({
                success: false,
                error: 'Erro interno do servidor'
            });
        }
    },

    updateParticipant: async (req, res) => {
        try {
            const { id } = req.params;
            const participantData = req.body;

            const participant = await ParticipantService.updateParticipant(id, participantData);

            res.json({
                success: true,
                data: participant,
                message: 'Participante atualizado com sucesso'
            });
        } catch (error) {
            console.error('Erro ao atualizar participante:', error);
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    },

    deleteParticipant: async (req, res) => {
        try {
            const { id } = req.params;

            await ParticipantService.deleteParticipant(id);

            res.json({
                success: true,
                message: 'Participante desativado com sucesso'
            });
        } catch (error) {
            console.error('Erro ao deletar participante:', error);
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    },

    getParticipantByQrCode: async (req, res) => {
        try {
            const { qrCode } = req.params;
            const participant = await ParticipantService.getParticipantByQrCode(qrCode);

            if (!participant) {
                return res.status(404).json({
                    success: false,
                    error: 'Participante não encontrado'
                });
            }

            res.json({
                success: true,
                data: participant,
                message: 'Participante encontrado via QR Code'
            });
        } catch (error) {
            console.error('Erro ao buscar participante por QR Code:', error);
            res.status(500).json({
                success: false,
                error: 'Erro interno do servidor'
            });
        }
    },

    generateQrCodeImage: async (req, res) => {
        try {
            const { id } = req.params;
            console.log("ID PARAMS:", id)
            const userParticipant = await ParticipantService.getParticipantById(id);

            if (!userParticipant) {
                return res.status(404).json({
                    success: false,
                    error: 'Participante não encontrado'
                });
            }

            const qrCodeBuffer = await QRCode.toBuffer(userParticipant.qrCodeContent, {
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
                'Content-Disposition': `inline; filename="qrcode-participant-${id}.png"`
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

module.exports = participantController;