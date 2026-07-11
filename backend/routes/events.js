import express from 'express';
import { getEvents, createEvent, updateEvent, rsvpEvent, deleteEvent } from '../controllers/eventController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/',           protect, getEvents);
router.post('/',          protect, adminOnly, createEvent);
router.put('/:id',        protect, adminOnly, updateEvent);
router.put('/:id/rsvp',   protect, rsvpEvent);
router.delete('/:id',     protect, adminOnly, deleteEvent);

export default router;
