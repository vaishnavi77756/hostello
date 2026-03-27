# Hostello - Technologies Used

---

## Frontend

### HTML5
- Structure of all 11 pages (index, home, explore, hostel-details, search, booking, payment, search-by-city, about, student-login, admin-login, admin-dashboard)
- Semantic elements, forms, tables

### CSS3
- Custom styling in `css/style.css`
- Flexbox and CSS Grid for layouts
- CSS gradients for hero sections and city cards
- CSS transitions and hover effects
- Responsive design with media queries
- CSS pseudo-elements (`::before`) for city card background images

### Vanilla JavaScript
- All frontend logic in `js/main.js` and `js/admin.js`
- `fetch()` API for all HTTP requests to the backend
- `localStorage` for storing JWT tokens, student ID, booking data between pages
- DOM manipulation to dynamically render hostel cards, search results, booking summaries
- Form validation and event listeners

### SVG
- Custom-built logo (`images/logo.svg`, `images/logo-white.svg`)
- QR code graphic (`images/qr-code.svg`) — all hand-coded, no external tools

---

## Backend

### Node.js
- JavaScript runtime that powers the server
- Version: v24 (installed via winget)

### Express.js v4.18
- Web framework for Node.js
- Handles routing, middleware, static file serving
- `express.static('.')` serves all HTML/CSS/JS files directly

### Mongoose v7.5
- ODM (Object Data Modeling) library for MongoDB
- Defines schemas and models
- Handles all database queries with methods like `.find()`, `.findById()`, `.save()`, `.populate()`

### bcryptjs v2.4
- Hashes passwords before saving to database
- Used in both Student and Admin models via `pre('save')` hook
- `comparePassword()` method for login verification

### jsonwebtoken (JWT) v9.0
- Generates tokens on login for both students and admin
- Tokens stored in `localStorage` on the frontend
- Sent via `Authorization: Bearer <token>` header on protected requests

### dotenv v16.3
- Loads environment variables from `.env` file
- Used for `MONGODB_URI`, `PORT`, `JWT_SECRET`

### cors v2.8
- Enables Cross-Origin Resource Sharing
- Allows the frontend to talk to the backend API

### multer v1.4
- Middleware for handling file uploads
- Used for student ID proof upload during registration

---

## Database

### MongoDB v8.2
- NoSQL document database
- Installed via winget, runs as a Windows service
- Database name: `hostello`

### MongoDB Compass
- GUI tool to visually browse and manage the database

### Collections in MongoDB
| Collection | Description |
|------------|-------------|
| `students` | Registered student accounts |
| `hostels` | Hostel listings with amenities |
| `bookings` | Booking records linking students and hostels |
| `
payments` | Payment transactions |
| `admins` | Admin accounts |

---

## Architecture

```
Browser (HTML/CSS/JS)
        ↕ fetch() API calls
Express Server (Node.js) — port 3000
        ↕ Mongoose ODM
MongoDB Database — port 27017
```

### Pattern: MVC-like
- `models/` — data schemas (Mongoose)
- `routes/` — API controllers (Express)
- `*.html + js/` — views (frontend)

---

## Dev Tools

### nodemon v3.0
- Auto-restarts server on file changes during development (`npm run dev`)

### winget
- Windows package manager used to install Node.js and MongoDB

### npm v11.9
- Node package manager, manages all dependencies via `package.json`

---

## Summary Table

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | HTML5 | - |
| Frontend | CSS3 | - |
| Frontend | Vanilla JavaScript | - |
| Frontend | SVG | - |
| Backend | Node.js | v24 |
| Backend | Express.js | v4.18 |
| Backend | Mongoose | v7.5 |
| Backend | bcryptjs | v2.4 |
| Backend | jsonwebtoken | v9.0 |
| Backend | dotenv | v16.3 |
| Backend | cors | v2.8 |
| Backend | multer | v1.4 |
| Database | MongoDB | v8.2 |
| Database | MongoDB Compass | latest |
| Dev Tool | nodemon | v3.0 |
| Dev Tool | npm | v11.9 |
| Dev Tool | winget | v1.12 |
