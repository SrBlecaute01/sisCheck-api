const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participant-controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth-middleware');

// CRUD de participantes
router.post('/', authMiddleware, participantController.createParticipant);
router.get('/', authMiddleware, participantController.getAllParticipants);
router.get('/:id', authMiddleware, participantController.getParticipantById);
router.put('/:id', authMiddleware, participantController.updateParticipant);
router.delete('/:id', authMiddleware, adminMiddleware, participantController.deleteParticipant);

router.get('/:id/qrcode', authMiddleware, participantController.generateQrCodeImage);

// Rota pública para leitura de QR Code (para registrar presença)
router.get('/qr/:qrCode', participantController.getParticipantByQrCode);


module.exports = router;