# Hostello - Full Stack Application

A complete hostel booking platform with MongoDB backend, built with Node.js, Express, and vanilla JavaScript.

## Features

- Student registration and login with authentication
- Browse and search hostels by city and price
- Detailed hostel information with amenities and images
- Complete booking flow
- Multiple payment methods (Card, UPI, QR Code)
- Admin dashboard to track payments, students, and hostels
- MongoDB database integration
- Responsive design with icons and images

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Compass (already installed)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Make sure MongoDB is running on your system (default: localhost:27017)

3. Seed the database with sample data:
```bash
node seed.js
```

4. Start the server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

5. Open your browser and navigate to:
```
http://localhost:3000
```

## Default Admin Credentials

- Username: `admin`
- Password: `admin123`

## API Endpoints

### Students
- POST `/api/students/register` - Register new student
- POST `/api/students/login` - Student login
- GET `/api/students` - Get all students (admin)

### Hostels
- GET `/api/hostels` - Get all hostels (with filters)
- GET `/api/hostels/:id` - Get hostel by ID
- GET `/api/hostels/search/:query` - Search hostels
- POST `/api/hostels` - Create hostel (admin)
- PUT `/api/hostels/:id` - Update hostel (admin)
- DELETE `/api/hostels/:id` - Delete hostel (admin)

### Bookings
- POST `/api/bookings` - Create booking
- GET `/api/bookings` - Get all bookings
- GET `/api/bookings/:id` - Get booking by ID
- PUT `/api/bookings/:id` - Update booking status

### Payments
- POST `/api/payments` - Process payment
- GET `/api/payments` - Get all payments
- GET `/api/payments/:id` - Get payment by ID

### Admin
- POST `/api/admin/login` - Admin login
- GET `/api/admin/dashboard` - Get dashboard data

## Database Schema

### Student
- fullName, email, password, phone, college
- idProof, paymentMethods
- Timestamps

### Hostel
- name, city, address, price
- amenities, description, images
- available, rating, totalBookings
- Timestamps

### Booking
- student (ref), hostel (ref)
- checkIn, checkOut, guests
- totalAmount, status
- Timestamps

### Payment
- booking (ref), student (ref), hostel (ref)
- amount, paymentMethod, status
- transactionId
- Timestamps

### Admin
- username, password, email
- Timestamps

## MongoDB Connection

The application connects to MongoDB at:
```
mongodb://localhost:27017/hostello
```

You can view and manage the database using MongoDB Compass.

## Project Structure

```
hostello/
├── models/          # Mongoose schemas
├── routes/          # API routes
├── js/              # Frontend JavaScript
├── css/             # Stylesheets
├── images/          # Logos, icons, hostel images
├── *.html           # HTML pages
├── server.js        # Express server
├── seed.js          # Database seeder
├── package.json     # Dependencies
└── .env             # Environment variables
```

## Technologies Used

- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Authentication: JWT, bcryptjs
- Frontend: HTML, CSS, Vanilla JavaScript
- CORS enabled for API access

## Notes

- All passwords are hashed using bcrypt
- JWT tokens are used for authentication
- The application uses localStorage for client-side token storage
- Sample data includes 6 hostels across 4 cities
