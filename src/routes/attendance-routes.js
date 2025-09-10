const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance-controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth-middleware');

// Registrar presença
router.post('/', authMiddleware, attendanceController.registerAttendance);
router.post('/qr', attendanceController.registerAttendanceByQr); // Rota pública para QR

// Consultar presenças
router.get('/', authMiddleware, attendanceController.getAllAttendances);
router.get('/participant/:participantId', authMiddleware, attendanceController.getAttendanceByParticipant);
router.get('/activity/:activityId', authMiddleware, attendanceController.getAttendanceByActivity);

// Relatórios
router.get('/report/activity/:activityId', authMiddleware, attendanceController.getActivityReport);
router.get('/report/participant/:participantId', authMiddleware, attendanceController.getParticipantReport);

// Remover presença (apenas admin)
router.delete('/:participantId/:activityId', authMiddleware, adminMiddleware, attendanceController.deleteAttendance);

module.exports = router;