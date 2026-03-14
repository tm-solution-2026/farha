// User Roles
const ROLES = {
  PLATFORM_ADMIN: 'platform_admin',
  SERVICE_PROVIDER: 'service_provider',
  VISITOR: 'visitor',
  BLOG_ADMIN: 'blog_admin'
};

// Booking Status
const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  REJECTED: 'rejected'
};

// Supplier Booking Status
const SUPPLIER_BOOKING_STATUS = {
  INITIAL_UNCONFIRMED: 'initial_unconfirmed',
  FINAL_CONFIRMED: 'final_confirmed'
};

// Event Status
const EVENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  COMPLETED: 'completed'
};

// Report Status
const REPORT_STATUS = {
  PENDING: 'pending',
  REVIEWED: 'reviewed',
  RESOLVED: 'resolved',
  REJECTED: 'rejected'
};

// Subscription Status
const SUBSCRIPTION_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled'
};

// Delivery Request Status
const DELIVERY_STATUS = {
  PENDING: 'pending',
  IN_TRANSIT: 'in_transit',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

// Order Status
const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// Gender
const GENDER = {
  MALE: 'male',
  FEMALE: 'female'
};

// Event Type
const EVENT_TYPE = {
  HAPPY: 'happy',
  SAD: 'sad'
};

// Attachment Types
const ATTACHMENT_TYPE = {
  IMAGE: 'image',
  VIDEO: 'video',
  YOUTUBE_LINK: 'youtube_link',
  LINK: 'link'
};

module.exports = {
  ROLES,
  BOOKING_STATUS,
  SUPPLIER_BOOKING_STATUS,
  EVENT_STATUS,
  REPORT_STATUS,
  SUBSCRIPTION_STATUS,
  DELIVERY_STATUS,
  ORDER_STATUS,
  GENDER,
  EVENT_TYPE,
  ATTACHMENT_TYPE
};
