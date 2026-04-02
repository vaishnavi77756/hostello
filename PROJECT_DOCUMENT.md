# Hostello — Project Documentation

**Project Name:** Hostello — Student Hostel Finder & Booking Platform
**Type:** Full Stack Web Application
**GitHub:** https://github.com/vaishnavi77756/hostello
**Frontend (Live):** https://hostello-psi.vercel.app
**Backend (Live):** https://hostello.onrender.com

---

## Project Overview

Hostello is a full-stack web application designed to help students find, explore, and book hostels across major cities in India. The platform provides a seamless experience from searching hostels by city to completing a secure payment — all in one place.

The project was built as a team of 4 members, each responsible for specific parts of the application.

---

## Team Members & Contributions

### 1. Vaishnavi Kakade — Project Lead & Backend Developer

**Role:** Backend Development, Database Design, Deployment

**Responsibilities:**
- Set up the Node.js and Express.js server
- Designed and implemented all MongoDB database schemas (Student, Hostel, Booking, Payment, Admin)
- Built all REST API routes:
  - `POST /api/students/register` — Student registration
  - `POST /api/students/login` — Student login with JWT
  - `GET/PUT /api/students/:id` — Profile management
  - `GET /api/hostels` — Fetch all hostels with filters
  - `GET /api/hostels/search/:query` — Search hostels
  - `POST /api/bookings` — Create booking
  - `POST /api/payments` — Process payment
  - `GET /api/admin/dashboard` — Admin data
- Implemented JWT authentication and bcrypt password hashing
- Deployed backend to Render
- Connected MongoDB Atlas cloud database
- Managed GitHub repository and version control
- Seeded database with 29 hostels across 10 cities

---

### 2. Shruti Kadam — Frontend Developer (Core Pages)

**Role:** Frontend Development — Main Pages UI

**Responsibilities:**
- Designed and built the Introduction page (`index.html`) with animated welcome screen
- Built the Home page (`home.html`) with hero section and search bar
- Built the Explore Hostels page (`explore.html`) with filter options (city, price, sort)
- Built the Hostel Details page (`hostel-details.html`) with gallery, amenities, and booking button
- Designed the hostel card component used across all listing pages
- Implemented the city filter and price filter functionality
- Connected frontend hostel listing to the backend API using `fetch()`
- Ensured responsive design for mobile and desktop screens

---

### 3. Radha Londhe — Frontend Developer (Booking & Payment)

**Role:** Frontend Development — Booking Flow & Payment Pages

**Responsibilities:**
- Built the Booking page (`booking.html`) with labeled form fields and hostel summary
- Built the Payment page (`payment.html`) with three payment methods:
  - Credit/Debit Card with card number, name, expiry, CVV fields
  - BHIM UPI with UPI ID input
  - QR Code scan-and-pay option
- Built the Search page (`search.html`) with live search results
- Built the Search by City page (`search-by-city.html`) with 10 city cards
- Implemented the complete booking flow — from hostel selection to payment confirmation
- Added toast notification system for user feedback
- Handled form validation and error messages across all forms

---

### 4. Rutuja Solanke — Frontend Developer (Auth, Profile & Admin)

**Role:** Frontend Development — Authentication, User Profile & Admin Dashboard

**Responsibilities:**
- Built the Student Login & Registration page (`student-login.html`) with:
  - Login form with email and password
  - Registration form with full name, phone, college, ID proof upload
  - Optional payment method setup (card and UPI) with skip option
- Built the User Profile page (`profile.html`) with:
  - View and edit personal information
  - Change password functionality
  - Save payment methods
  - View booking history
- Built the Admin Login page (`admin-login.html`)
- Built the Admin Dashboard (`admin-dashboard.html`) with:
  - Overview stats (total students, hostels, bookings, revenue)
  - Payments table with transaction details
  - Students table with registration details
  - Hostels table with listing details
- Built the About page (`about.html`) with mission, how it works, and features
- Managed navigation state (show/hide login, logout, profile links based on session)

---

## Project Features

### Student Features
| Feature | Description |
|---------|-------------|
| Registration | Sign up with name, email, phone, college, ID proof |
| Login | Secure login with JWT token authentication |
| Browse Hostels | View all hostels with photos, amenities, pricing |
| Filter Hostels | Filter by city, price range, and sort by rating or price |
| Search | Search hostels by name, city, or address |
| Search by City | Browse 10 major Indian cities |
| Hostel Details | Full details — description, amenities, address, rating |
| Book Hostel | Select dates, number of guests, personal info |
| Payment | Pay via Card, BHIM UPI, or QR Code |
| Profile | View and edit profile, change password, save payment methods |
| Booking History | View all past and current bookings |

### Admin Features
| Feature | Description |
|---------|-------------|
| Admin Login | Secure admin authentication |
| Dashboard Overview | Total students, hostels, bookings, revenue stats |
| Payment Records | View all transactions with student and hostel details |
| Student Records | View all registered students |
| Hostel Records | View all hostel listings with booking counts |

---

## Technologies Used

### Frontend
| Technology | Purpose |
|-----------|---------|
| HTML5 | Page structure for all 12 pages |
| CSS3 | Styling — Flexbox, Grid, animations, responsive design |
| Vanilla JavaScript | API calls, DOM manipulation, form handling |
| SVG | Custom logo and QR code graphics |
| Google Fonts (Inter) | Typography |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | v24 | JavaScript runtime |
| Express.js | v4.18 | Web framework and API routing |
| Mongoose | v7.5 | MongoDB ODM — schemas and queries |
| bcryptjs | v2.4 | Password hashing |
| jsonwebtoken | v9.0 | JWT authentication tokens |
| dotenv | v16.3 | Environment variable management |
| cors | v2.8 | Cross-origin resource sharing |
| multer | v1.4 | File upload handling (ID proof) |

### Database
| Technology | Purpose |
|-----------|---------|
| MongoDB Atlas | Cloud NoSQL database |
| MongoDB Compass | Local GUI for database management |

### Deployment
| Service | Purpose |
|---------|---------|
| Vercel | Frontend hosting — auto-deploys from GitHub |
| Render | Backend hosting — Node.js server |
| GitHub | Version control and source code repository |

---

## Database Collections

| Collection | Fields | Description |
|-----------|--------|-------------|
| `students` | fullName, email, password, phone, college, idProof, paymentMethods | Registered student accounts |
| `hostels` | name, city, address, price, amenities, description, rating, available | Hostel listings |
| `bookings` | student, hostel, checkIn, checkOut, guests, totalAmount, status | Booking records |
| `payments` | booking, student, hostel, amount, paymentMethod, status, transactionId | Payment transactions |
| `admins` | username, password, email | Admin accounts |

---

## Application Architecture

```
┌─────────────────────────────────────────────────────┐
│              FRONTEND (Vercel)                      │
│         https://hostello-psi.vercel.app             │
│                                                     │
│  HTML + CSS + Vanilla JS                            │
│  12 Pages: index, home, explore, hostel-details,   │
│  search, search-by-city, booking, payment,          │
│  student-login, profile, admin-login, admin-dash    │
└──────────────────┬──────────────────────────────────┘
                   │ fetch() API calls
                   ▼
┌─────────────────────────────────────────────────────┐
│              BACKEND (Render)                       │
│          https://hostello.onrender.com              │
│                                                     │
│  Node.js + Express.js                               │
│  REST API: /api/students, /api/hostels,             │
│  /api/bookings, /api/payments, /api/admin           │
└──────────────────┬──────────────────────────────────┘
                   │ Mongoose ODM
                   ▼
┌─────────────────────────────────────────────────────┐
│              DATABASE (MongoDB Atlas)               │
│  cluster0.agg1t4r.mongodb.net                       │
│                                                     │
│  Collections: students, hostels, bookings,          │
│  payments, admins                                   │
└─────────────────────────────────────────────────────┘
```

---

## Pages Summary

| Page | File | Description |
|------|------|-------------|
| Introduction | `index.html` | Welcome screen with Get Started button |
| Home | `home.html` | Hero section, search bar, features |
| Explore | `explore.html` | All hostels with filters |
| Hostel Details | `hostel-details.html` | Full hostel info and Book Now |
| Search | `search.html` | Search results page |
| Search by City | `search-by-city.html` | 10 city cards |
| Booking | `booking.html` | Booking form with hostel summary |
| Payment | `payment.html` | Card, UPI, QR Code payment |
| Student Login | `student-login.html` | Login and registration |
| Profile | `profile.html` | View/edit profile, bookings |
| Admin Login | `admin-login.html` | Admin authentication |
| Admin Dashboard | `admin-dashboard.html` | Full admin control panel |
| About | `about.html` | Project info and how it works |

---

## Admin Credentials

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `admin123` |

---

*Document prepared by Team Hostello — Vaishnavi Kakade, Shruti Kadam, Radha Londhe, Rutuja Solanke*
