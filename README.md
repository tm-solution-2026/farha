# Farha Platform - Backend API

A complete, production-ready RESTful API backend for Farha - an events and occasions management platform (weddings, birthdays, etc.).

## 🏗️ Architecture

- **Framework**: Express.js
- **ORM**: Sequelize
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: Joi
- **Architecture Pattern**: MVC (Model-View-Controller)

## 📁 Project Structure

```
back-end/
├── config/              # Configuration files
│   ├── database.js      # Database connection
│   └── constants.js     # Application constants
├── controllers/         # Request handlers
│   ├── authController.js
│   ├── eventController.js
│   ├── bookingController.js
│   └── supplierController.js
├── middleware/          # Custom middleware
│   ├── auth.js          # JWT authentication
│   ├── rbac.js          # Role-based access control
│   ├── errorHandler.js  # Global error handler
│   └── rateLimiter.js   # Rate limiting
├── models/              # Sequelize models
│   ├── User.js
│   ├── Supplier.js
│   ├── Event.js
│   └── ... (all database models)
├── routes/              # API routes
│   ├── authRoutes.js
│   ├── eventRoutes.js
│   ├── bookingRoutes.js
│   └── supplierRoutes.js
├── services/            # Business logic
│   └── authService.js
├── utils/               # Utility functions
│   ├── jwt.js
│   ├── otp.js
│   ├── response.js
│   └── errors.js
├── validations/          # Validation schemas
│   └── authValidation.js
├── server.js            # Main server file
├── package.json
└── .env                 # Environment variables (create from .env.example)
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Installation

1. **Clone the repository and navigate to the backend directory**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env` (if available) or create a `.env` file
   - Configure the following variables:
     ```env
     NODE_ENV=development
     PORT=3000
     
     DB_HOST=localhost
     DB_PORT=3306
     DB_NAME=farha
     DB_USER=root
     DB_PASSWORD=your_password
     
     JWT_SECRET=your-super-secret-jwt-key
     JWT_EXPIRE=7d
     ```

4. **Set up the database**
   - Import the SQL file: `farha (2).sql` into your MySQL database
   - Or run the migrations if available

5. **Start the server**
   ```bash
   # Development mode (with nodemon)
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Test the API**
   - The server will run on `http://localhost:3000`
   - Health check: `GET http://localhost:3000/health`
   - Import the Postman collection: `farha-api-postman-collection.json`

## 🔐 Authentication & Authorization

### User Roles

1. **Platform Admin** (`platform_admin`) - Full system access
2. **Service Provider** (`service_provider`) - Can manage their services
3. **Visitor** (`visitor`) - Regular users/customers
4. **Blog Admin** (`blog_admin`) - Manages blog content

### Authentication Flow

1. **Register**: `POST /api/auth/register`
2. **Login**: `POST /api/auth/login` - Returns JWT token
3. **Use Token**: Include in header: `Authorization: Bearer <token>`

### Protected Routes

Most routes require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/send-otp` - Send OTP for password reset
- `POST /api/auth/reset-password` - Reset password with OTP
- `GET /api/auth/profile` - Get current user profile (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)
- `POST /api/auth/change-password` - Change password (Protected)

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `GET /api/events/:id/members` - Get event members
- `POST /api/events` - Create event (Platform Admin only)
- `PUT /api/events/:id` - Update event (Platform Admin only)
- `DELETE /api/events/:id` - Delete event (Platform Admin only)

### Suppliers
- `GET /api/suppliers` - Get all suppliers
- `GET /api/suppliers/:id` - Get supplier by ID
- `GET /api/suppliers/:id/elements` - Get supplier services/elements
- `POST /api/suppliers` - Create supplier (Platform Admin only)
- `PUT /api/suppliers/:id` - Update supplier (Platform Admin only)

### Bookings
- `POST /api/bookings` - Create booking (Protected)
- `GET /api/bookings/my-bookings` - Get user's bookings (Protected)
- `GET /api/bookings/:id` - Get booking by ID (Protected)
- `PATCH /api/bookings/:id/status` - Update booking status (Protected)
- `POST /api/bookings/:id/cancel` - Cancel booking (Protected)

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: Joi schema validation
- **CORS**: Configurable cross-origin resource sharing
- **Helmet**: Security headers
- **Error Handling**: Centralized error handling with proper status codes

## 📝 Database Schema

The database schema is defined in `farha (2).sql`. Key tables include:

- `users` - User accounts
- `suppliers` - Service providers
- `events` - Event types (weddings, birthdays, etc.)
- `user_events` - User's personal events
- `user_bookings` - User bookings
- `supplier_elements` - Services offered by suppliers
- And many more...

## 🧪 Testing

Import the Postman collection (`farha-api-postman-collection.json`) to test all endpoints.

### Postman Collection Variables

- `base_url`: `http://localhost:3000`
- `auth_token`: Your JWT token (set after login)

## 📦 Dependencies

### Production
- `express` - Web framework
- `sequelize` - ORM
- `mysql2` - MySQL driver
- `jsonwebtoken` - JWT handling
- `bcryptjs` - Password hashing
- `joi` - Validation
- `express-rate-limit` - Rate limiting
- `cors` - CORS middleware
- `helmet` - Security headers
- `dotenv` - Environment variables

### Development
- `nodemon` - Auto-restart on file changes

## 🔧 Configuration

All configuration is done through environment variables. See `.env.example` for reference.

## 📄 License

ISC

## 👥 Author

Farha Platform Development Team

---

**Note**: This is a production-ready backend API. Make sure to:
- Change default JWT secrets in production
- Configure proper CORS origins
- Set up proper database backups
- Use HTTPS in production
- Monitor and log errors
- Set up proper rate limiting thresholds
