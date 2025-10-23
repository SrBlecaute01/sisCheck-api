const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activity-controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth-middleware');

router.post('/', authMiddleware, activityController.createActivity);
router.get('/', authMiddleware, activityController.getAllActivities);
router.get('/:id', authMiddleware, activityController.getActivityById);
router.get('/:id/myActivities', authMiddleware, activityController.getAllActivityByUser)
router.put('/:id', authMiddleware, activityController.updateActivity);
router.delete('/:id', authMiddleware, adminMiddleware, activityController.deleteActivity);
router.delete('/:id/deletePermanently', authMiddleware, adminMiddleware, activityController.deletePermanentlyActivity);

router.get('/:id/qrEntryImage', authMiddleware, activityController.generateQrCodeKeyWordEntryImage);
router.get('/:id/qrExitImage', authMiddleware, activityController.generateQrCodeKeyWordExitImage);

module.exports = router;