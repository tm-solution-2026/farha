const { Event, EventMember, EventElement, Element, ElementCategory } = require('../models');
const { sendSuccess, sendNotFound } = require('../utils/response');
const { NotFoundError } = require('../utils/errors');

/**
 * Get all events
 */
const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.findAll({
      order: [['display_order', 'ASC']],
      include: [
        {
          model: EventMember,
          as: 'eventMembers',
          required: false
        }
      ]
    });

    return sendSuccess(res, 'Events retrieved successfully', events);
  } catch (error) {
    next(error);
  }
};

/**
 * Get event by ID
 */
const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const event = await Event.findByPk(id, {
      include: [
        {
          model: EventMember,
          as: 'eventMembers',
          required: false
        },
        {
          model: EventElement,
          as: 'eventElements',
          include: [
            {
              model: Element,
              as: 'element',
              include: [
                {
                  model: ElementCategory,
                  as: 'elementCategory'
                }
              ]
            }
          ],
          required: false
        }
      ]
    });

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    return sendSuccess(res, 'Event retrieved successfully', event);
  } catch (error) {
    next(error);
  }
};

/**
 * Create new event (Platform Admin only)
 * Supports optional cover image upload (stored in Event.picture)
 */
const createEvent = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (req.file) {
      payload.picture = `/uploads/events/${req.file.filename}`;
    }
    const event = await Event.create(payload);
    return sendSuccess(res, 'Event created successfully', event, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Update event (Platform Admin only)
 * Supports optional cover image upload (stored in Event.picture)
 */
const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    const updates = { ...req.body };
    if (req.file) {
      updates.picture = `/uploads/events/${req.file.filename}`;
    }

    await event.update(updates);
    return sendSuccess(res, 'Event updated successfully', event);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete event (Platform Admin only)
 */
const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    await event.destroy();
    return sendSuccess(res, 'Event deleted successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Get event members
 */
const getEventMembers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const members = await EventMember.findAll({
      where: { event_id: id },
      order: [['importance', 'DESC']]
    });

    return sendSuccess(res, 'Event members retrieved successfully', members);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventMembers
};
