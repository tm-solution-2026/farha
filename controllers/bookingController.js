const { UserBooking, SupplierElement, UserEventItem, UserEvent, Supplier } = require('../models');
const { sendSuccess, sendNotFound } = require('../utils/response');
const { NotFoundError, ForbiddenError } = require('../utils/errors');
const { BOOKING_STATUS } = require('../config/constants');

/**
 * Create a new booking
 */
const createBooking = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const {
      user_event_items_id,
      supplier_element_id,
      start_date_time,
      end_date_time,
      deliver_date_time,
      price,
      count,
      note,
      with_delivery
    } = req.body;

    // Verify user event item belongs to user
    const userEventItem = await UserEventItem.findByPk(user_event_items_id, {
      include: [{
        model: UserEvent,
        as: 'userEvent'
      }]
    });

    if (!userEventItem) {
      throw new NotFoundError('User event item not found');
    }

    if (userEventItem.userEvent.user_id !== userId) {
      throw new ForbiddenError('You can only create bookings for your own events');
    }

    // Verify supplier element exists
    const supplierElement = await SupplierElement.findByPk(supplier_element_id);
    if (!supplierElement) {
      throw new NotFoundError('Supplier element not found');
    }

    // Create booking
    const booking = await UserBooking.create({
      user_event_items_id,
      supplier_element_id,
      user_id: userId,
      start_date_time,
      end_date_time,
      deliver_date_time,
      booking_status: BOOKING_STATUS.PENDING,
      price,
      count,
      note,
      with_delivery
    });

    // Load relations
    await booking.reload({
      include: [
        {
          model: SupplierElement,
          as: 'supplierElement',
          include: [{
            model: Supplier,
            as: 'supplier'
          }]
        },
        {
          model: UserEventItem,
          as: 'userEventItem'
        }
      ]
    });

    return sendSuccess(res, 'Booking created successfully', booking, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Get user's bookings
 */
const getMyBookings = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const bookings = await UserBooking.findAll({
      where: { user_id: userId },
      include: [
        {
          model: SupplierElement,
          as: 'supplierElement',
          include: [{
            model: Supplier,
            as: 'supplier'
          }]
        },
        {
          model: UserEventItem,
          as: 'userEventItem',
          include: [{
            model: UserEvent,
            as: 'userEvent'
          }]
        }
      ],
      order: [['created_at', 'DESC']]
    });

    return sendSuccess(res, 'Bookings retrieved successfully', bookings);
  } catch (error) {
    next(error);
  }
};

/**
 * Get booking by ID
 */
const getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const booking = await UserBooking.findByPk(id, {
      include: [
        {
          model: SupplierElement,
          as: 'supplierElement',
          include: [{
            model: Supplier,
            as: 'supplier'
          }]
        },
        {
          model: UserEventItem,
          as: 'userEventItem',
          include: [{
            model: UserEvent,
            as: 'userEvent'
          }]
        }
      ]
    });

    if (!booking) {
      throw new NotFoundError('Booking not found');
    }

    // Check if user owns the booking or is admin
    if (booking.user_id !== userId && req.user.role !== 'platform_admin') {
      throw new ForbiddenError('You do not have permission to view this booking');
    }

    return sendSuccess(res, 'Booking retrieved successfully', booking);
  } catch (error) {
    next(error);
  }
};

/**
 * Update booking status
 */
const updateBookingStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { booking_status } = req.body;
    const userId = req.user.id;

    const booking = await UserBooking.findByPk(id);

    if (!booking) {
      throw new NotFoundError('Booking not found');
    }

    // Check permissions
    if (booking.user_id !== userId && req.user.role !== 'platform_admin') {
      throw new ForbiddenError('You do not have permission to update this booking');
    }

    // Validate status
    if (!Object.values(BOOKING_STATUS).includes(booking_status)) {
      throw new Error('Invalid booking status');
    }

    await booking.update({ booking_status });

    return sendSuccess(res, 'Booking status updated successfully', booking);
  } catch (error) {
    next(error);
  }
};

/**
 * Cancel booking
 */
const cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const booking = await UserBooking.findByPk(id);

    if (!booking) {
      throw new NotFoundError('Booking not found');
    }

    // Check permissions
    if (booking.user_id !== userId && req.user.role !== 'platform_admin') {
      throw new ForbiddenError('You do not have permission to cancel this booking');
    }

    await booking.update({ booking_status: BOOKING_STATUS.CANCELLED });

    return sendSuccess(res, 'Booking cancelled successfully', booking);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking
};
