const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activity-controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth-middleware');

router.post('/', authMiddleware, activityController.createActivity);
router.get('/', authMiddleware, activityController.getAllActivities);
router.get('/:id', authMiddleware, activityController.getActivityById);
router.put('/:id', authMiddleware, activityController.updateActivity);
router.delete('/:id', authMiddleware, adminMiddleware, activityController.deleteActivity);

module.exports = router;