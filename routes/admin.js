const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Student = require('../models/Student');
const Hostel = require('../models/Hostel');
const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

// Admin login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        let admin = await Admin.findOne({ username });
        
        // Create default admin if doesn't exist
        if (!admin) {
            admin = new Admin({
                username: 'admin',
                password: 'admin123',
                email: 'admin@hostello.com'
            });
            await admin.save();
            admin = await Admin.findOne({ username });
        }
        
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });
        
        res.json({
            message: 'Login successful',
            token,
            admin: {
                id: admin._id,
                username: admin.username
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get dashboard stats
router.get('/dashboard', async (req, res) => {
    try {
        const students = await Student.find().select('-password');
        const hostels = await Hostel.find();
        const payments = await Payment.find()
            .populate('student', 'fullName email')
            .populate('hostel', 'name city');
        const bookings = await Booking.find()
            .populate('student', 'fullName')
            .populate('hostel', 'name');
        
        res.json({
            students,
            hostels,
            payments,
            bookings,
            stats: {
                totalStudents: students.length,
                totalHostels: hostels.length,
                totalPayments: payments.length,
                totalBookings: bookings.length,
                totalRevenue: payments.reduce((sum, p) => sum + p.amount, 0)
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
