# Warex Assignment

### Features

- > User Authentication (Signup, Login)

- > JWT-based Authorization

- >Create and Fetch Orders

- >Role-based Access Control

- >MongoDB Integration with Mongoose

### Post Man API reference
```
https://www.postman.com/telecoms-geoscientist-96301949/assignment/overview
```
### .env
```
PORT=5000
MONGO_URI= <YOUR Connection Stiring>
JWT_SECRET=3f8e92c5b0d7492fb60ea9b03b13f24d8b42e55f0e376e0eaa6c9c92f9e65a4b
JWT_EXPIRES_IN=7d
CRON_SCHEDULE=* * * * *

```
### Folder Structure
```
src/
├── config/
│   ├── db.js                 # Database connection setup
├── controllers/
│   ├── auth.Controller.js     # Handles user authentication
│   ├── customer.Controller.js # Handles customer-related operations
│   ├── order.Controller.js    # Manages order operations
│   ├── sku.Controller.js      # Manages SKU (Stock Keeping Unit) operations
├── cron/
│   ├── orderSummaryJob.js     # Cron job to generate hourly order summaries
├── middleware/
│   ├── auth.middleware.js     # Middleware for authentication & authorization
├── models/
│   ├── Customer.model.js      # Mongoose model for customers
│   ├── Order.model.js         # Mongoose model for orders
│   ├── Sku.model.js           # Mongoose model for SKUs
│   ├── User.model.js          # Mongoose model for users
├── routes/
│   ├── auth.route.js          # Authentication routes
│   ├── customer.route.js      # Customer-related routes
│   ├── order.route.js         # Order-related routes
│   ├── sku.route.js           # SKU-related routes
├── utils/
│   ├── websocket.util.js      # WebSocket setup for real-time updates
├── .gitignore                  # Files to ignore in Git
├── Adminsocket.js              # Admin-specific WebSocket functionality
├── app.js                      # Entry point of the application
├── package.json                # Dependencies and scripts
├── package-lock.json           # Auto-generated dependency tree
```
### Note : Use Adminsocket.js File for testing instant notification funtionality and Order Summary