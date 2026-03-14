const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

// Import all models
const User = require('./User')(sequelize, DataTypes);
const Supplier = require('./Supplier')(sequelize, DataTypes);
const Event = require('./Event')(sequelize, DataTypes);
const EventMember = require('./EventMember')(sequelize, DataTypes);
const ElementCategory = require('./ElementCategory')(sequelize, DataTypes);
const Element = require('./Element')(sequelize, DataTypes);
const Category = require('./Category')(sequelize, DataTypes);
const Subcategory = require('./Subcategory')(sequelize, DataTypes);
const EventElement = require('./EventElement')(sequelize, DataTypes);
const SupplierCat = require('./SupplierCat')(sequelize, DataTypes);
const SupplierElement = require('./SupplierElement')(sequelize, DataTypes);
const SupplierElementAttachment = require('./SupplierElementAttachment')(sequelize, DataTypes);
const SupplierElementCategory = require('./SupplierElementCategory')(sequelize, DataTypes);
const SupplierBooking = require('./SupplierBooking')(sequelize, DataTypes);
const SupplierOffer = require('./SupplierOffer')(sequelize, DataTypes);
const SupplierOfferItem = require('./SupplierOfferItem')(sequelize, DataTypes);
const WinnerOfOffer = require('./WinnerOfOffer')(sequelize, DataTypes);
const PlatformService = require('./PlatformService')(sequelize, DataTypes);
const Order = require('./Order')(sequelize, DataTypes);
const OrderDetail = require('./OrderDetail')(sequelize, DataTypes);
const UserEvent = require('./UserEvent')(sequelize, DataTypes);
const UserEventItem = require('./UserEventItem')(sequelize, DataTypes);
const UserBooking = require('./UserBooking')(sequelize, DataTypes);
const PeopleOfEvent = require('./PeopleOfEvent')(sequelize, DataTypes);
const Trend = require('./Trend')(sequelize, DataTypes);
const TrendOfEvent = require('./TrendOfEvent')(sequelize, DataTypes);
const Ahazige = require('./Ahazige')(sequelize, DataTypes);
const AhazigeOfEvent = require('./AhazigeOfEvent')(sequelize, DataTypes);
const EventList = require('./EventList')(sequelize, DataTypes);
const Report = require('./Report')(sequelize, DataTypes);
const DeliveryRequest = require('./DeliveryRequest')(sequelize, DataTypes);
const SubscribePolicy = require('./SubscribePolicy')(sequelize, DataTypes);
const SubscribePolicyItem = require('./SubscribePolicyItem')(sequelize, DataTypes);
const Subscriber = require('./Subscriber')(sequelize, DataTypes);
const OtpCode = require('./OtpCode')(sequelize, DataTypes);

// Define associations
const defineAssociations = () => {
  // User associations
  User.hasMany(UserEvent, { foreignKey: 'user_id', as: 'userEvents' });
  User.hasMany(UserBooking, { foreignKey: 'user_id', as: 'userBookings' });
  User.hasMany(Trend, { foreignKey: 'user_id', as: 'trends' });
  User.hasMany(Ahazige, { foreignKey: 'user_id', as: 'ahaziges' });
  User.hasMany(PeopleOfEvent, { foreignKey: 'user_id', as: 'peopleOfEvents' });
  User.belongsTo(User, { foreignKey: 'addtion_user_id', as: 'additionalUser' });

  // Supplier associations
  Supplier.hasMany(SupplierCat, { foreignKey: 'supplier_id', as: 'supplierCats' });
  Supplier.hasMany(SupplierElement, { foreignKey: 'supplier_id', as: 'supplierElements' });
  Supplier.hasMany(Subscriber, { foreignKey: 'supplier_id', as: 'subscriptions' });

  // Event associations
  Event.hasMany(EventMember, { foreignKey: 'event_id', as: 'eventMembers' });
  Event.hasMany(EventElement, { foreignKey: 'event_id', as: 'eventElements' });
  Event.hasMany(UserEvent, { foreignKey: 'event_id', as: 'userEvents' });
  Event.hasMany(Trend, { foreignKey: 'event_id', as: 'trends' });
  Event.hasMany(Ahazige, { foreignKey: 'event_id', as: 'ahaziges' });

  // EventMember associations
  EventMember.hasMany(EventElement, { foreignKey: 'event_member_id', as: 'eventElements' });
  EventMember.hasMany(PeopleOfEvent, { foreignKey: 'event_member_id', as: 'peopleOfEvents' });

  // ElementCategory associations
  ElementCategory.hasMany(Element, { foreignKey: 'element_category_id', as: 'elements' });
  ElementCategory.hasMany(SupplierCat, { foreignKey: 'element_category_id', as: 'supplierCats' });

  // Element associations
  Element.belongsTo(ElementCategory, { foreignKey: 'element_category_id', as: 'elementCategory' });
  Element.hasMany(Category, { foreignKey: 'element_id', as: 'categories' });
  Element.hasMany(EventElement, { foreignKey: 'element_id', as: 'eventElements' });
  Element.hasMany(SupplierElement, { foreignKey: 'element_id', as: 'supplierElements' });

  // Category associations
  Category.hasMany(Subcategory, { foreignKey: 'category_id', as: 'subcategories' });
  Category.hasMany(SupplierElementCategory, { foreignKey: 'category_id', as: 'supplierElementCategories' });

  // Subcategory associations
  Subcategory.hasMany(SupplierElementCategory, { foreignKey: 'subcategory_id', as: 'supplierElementCategories' });

  // EventElement associations
  EventElement.hasMany(UserEventItem, { foreignKey: 'event_element_id', as: 'userEventItems' });
  EventElement.belongsTo(Event, { foreignKey: 'event_id', as: 'event' });
  EventElement.belongsTo(Element, { foreignKey: 'element_id', as: 'element' });
  EventElement.belongsTo(EventMember, { foreignKey: 'event_member_id', as: 'eventMember' });

  // SupplierElement associations
  SupplierElement.belongsTo(Supplier, { foreignKey: 'supplier_id', as: 'supplier' });
  SupplierElement.belongsTo(Element, { foreignKey: 'element_id', as: 'element' });
  SupplierElement.hasMany(SupplierElementAttachment, { foreignKey: 'supplier_element_id', as: 'attachments' });
  SupplierElement.hasMany(SupplierElementCategory, { foreignKey: 'supplier_element_id', as: 'categories' });
  SupplierElement.hasMany(SupplierBooking, { foreignKey: 'supplier_element_id', as: 'bookings' });
  SupplierElement.hasMany(SupplierOfferItem, { foreignKey: 'supplier_element_id', as: 'offerItems' });
  SupplierElement.hasMany(UserBooking, { foreignKey: 'supplier_element_id', as: 'userBookings' });

  // SupplierBooking associations
  SupplierBooking.belongsTo(SupplierElement, { foreignKey: 'supplier_element_id', as: 'supplierElement' });

  // SupplierOffer associations
  SupplierOffer.hasMany(SupplierOfferItem, { foreignKey: 'supplier_offers_id', as: 'offerItems' });

  // SupplierOfferItem associations
  SupplierOfferItem.belongsTo(SupplierElement, { foreignKey: 'supplier_element_id', as: 'supplierElement' });
  SupplierOfferItem.hasMany(WinnerOfOffer, { foreignKey: 'supplier_offers_items_id', as: 'winners' });

  // WinnerOfOffer associations
  WinnerOfOffer.belongsTo(SupplierOfferItem, { foreignKey: 'supplier_offers_items_id', as: 'offerItem' });
  WinnerOfOffer.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

  // PlatformService associations
  PlatformService.hasMany(OrderDetail, { foreignKey: 'platform_service_id', as: 'orderDetails' });

  // Order associations
  Order.hasMany(OrderDetail, { foreignKey: 'order_id', as: 'orderDetails' });

  // UserEvent associations
  UserEvent.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
  UserEvent.belongsTo(Event, { foreignKey: 'event_id', as: 'event' });
  UserEvent.hasMany(UserEventItem, { foreignKey: 'user_event_id', as: 'userEventItems' });
  UserEvent.hasMany(PeopleOfEvent, { foreignKey: 'user_event_id', as: 'peopleOfEvents' });
  UserEvent.hasMany(EventList, { foreignKey: 'user_event_id', as: 'eventLists' });
  UserEvent.hasMany(TrendOfEvent, { foreignKey: 'user_event_id', as: 'trendsOfEvents' });
  UserEvent.hasMany(AhazigeOfEvent, { foreignKey: 'user_event_id', as: 'ahazigesOfEvents' });

  // UserEventItem associations
  UserEventItem.belongsTo(UserEvent, { foreignKey: 'user_event_id', as: 'userEvent' });
  UserEventItem.belongsTo(EventElement, { foreignKey: 'event_element_id', as: 'eventElement' });
  UserEventItem.hasMany(UserBooking, { foreignKey: 'user_event_items_id', as: 'userBookings' });

  // UserBooking associations
  UserBooking.belongsTo(UserEventItem, { foreignKey: 'user_event_items_id', as: 'userEventItem' });
  UserBooking.belongsTo(SupplierElement, { foreignKey: 'supplier_element_id', as: 'supplierElement' });
  UserBooking.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
  UserBooking.hasMany(DeliveryRequest, { foreignKey: 'user_booking_id', as: 'deliveryRequests' });

  // PeopleOfEvent associations
  PeopleOfEvent.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
  PeopleOfEvent.belongsTo(UserEvent, { foreignKey: 'user_event_id', as: 'userEvent' });
  PeopleOfEvent.belongsTo(EventMember, { foreignKey: 'event_member_id', as: 'eventMember' });
  PeopleOfEvent.hasMany(EventList, { foreignKey: 'people_of_event_id', as: 'eventLists' });

  // Trend associations
  Trend.belongsTo(Event, { foreignKey: 'event_id', as: 'event' });
  Trend.belongsTo(EventMember, { foreignKey: 'event_member_id', as: 'eventMember' });
  Trend.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
  Trend.hasMany(TrendOfEvent, { foreignKey: 'trends_id', as: 'trendsOfEvents' });

  // TrendOfEvent associations
  TrendOfEvent.belongsTo(Trend, { foreignKey: 'trends_id', as: 'trend' });
  TrendOfEvent.belongsTo(UserEvent, { foreignKey: 'user_event_id', as: 'userEvent' });

  // Ahazige associations
  Ahazige.belongsTo(Event, { foreignKey: 'event_id', as: 'event' });
  Ahazige.belongsTo(EventMember, { foreignKey: 'event_member_id', as: 'eventMember' });
  Ahazige.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
  Ahazige.hasMany(AhazigeOfEvent, { foreignKey: 'ahazige_id', as: 'ahazigesOfEvents' });

  // AhazigeOfEvent associations
  AhazigeOfEvent.belongsTo(Ahazige, { foreignKey: 'ahazige_id', as: 'ahazige' });
  AhazigeOfEvent.belongsTo(UserEvent, { foreignKey: 'user_event_id', as: 'userEvent' });

  // EventList associations
  EventList.belongsTo(UserEvent, { foreignKey: 'user_event_id', as: 'userEvent' });
  EventList.belongsTo(PeopleOfEvent, { foreignKey: 'people_of_event_id', as: 'peopleOfEvent' });

  // DeliveryRequest associations
  DeliveryRequest.belongsTo(UserBooking, { foreignKey: 'user_booking_id', as: 'userBooking' });

  // SubscribePolicy associations
  SubscribePolicy.hasMany(SubscribePolicyItem, { foreignKey: 'subscribe_policy_id', as: 'policyItems' });
  SubscribePolicy.hasMany(Subscriber, { foreignKey: 'subscribe_policy_id', as: 'subscribers' });

  // SubscribePolicyItem associations
  SubscribePolicyItem.belongsTo(SubscribePolicy, { foreignKey: 'subscribe_policy_id', as: 'subscribePolicy' });

  // Subscriber associations
  Subscriber.belongsTo(SubscribePolicy, { foreignKey: 'subscribe_policy_id', as: 'subscribePolicy' });
  Subscriber.belongsTo(Supplier, { foreignKey: 'supplier_id', as: 'supplier' });

  // SupplierCat associations
  SupplierCat.belongsTo(Supplier, { foreignKey: 'supplier_id', as: 'supplier' });
  SupplierCat.belongsTo(ElementCategory, { foreignKey: 'element_category_id', as: 'elementCategory' });
};

// Initialize associations
defineAssociations();

module.exports = {
  sequelize,
  User,
  Supplier,
  Event,
  EventMember,
  ElementCategory,
  Element,
  Category,
  Subcategory,
  EventElement,
  SupplierCat,
  SupplierElement,
  SupplierElementAttachment,
  SupplierElementCategory,
  SupplierBooking,
  SupplierOffer,
  SupplierOfferItem,
  WinnerOfOffer,
  PlatformService,
  Order,
  OrderDetail,
  UserEvent,
  UserEventItem,
  UserBooking,
  PeopleOfEvent,
  Trend,
  TrendOfEvent,
  Ahazige,
  AhazigeOfEvent,
  EventList,
  Report,
  DeliveryRequest,
  SubscribePolicy,
  SubscribePolicyItem,
  Subscriber,
  OtpCode
};
