const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authenticate } = require('../middleware/auth');
const { isPlatformAdmin, isVisitorOrProvider } = require('../middleware/rbac');
const { uploadEventCover } = require('../middleware/upload');

// Public routes
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.get('/:id/members', eventController.getEventMembers);

// Protected routes - Platform Admin only
router.post('/', authenticate, isPlatformAdmin, uploadEventCover, eventController.createEvent);
router.put('/:id', authenticate, isPlatformAdmin, uploadEventCover, eventController.updateEvent);
router.delete('/:id', authenticate, isPlatformAdmin, eventController.deleteEvent);

module.exports = router;
