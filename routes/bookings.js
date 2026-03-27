const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Hostel = require('../models/Hostel');

// Create booking
router.post('/', async (req, res) => {
    try {
        const { studentId, hostelId, checkIn, checkOut, guests } = req.body;
        
        const hostel = await Hostel.findById(hostelId);
        if (!hostel) {
            return res.status(404).json({ message: 'Hostel not found' });
        }
        
        const booking = new Booking({
            student: studentId,
            hostel: hostelId,
            checkIn,
            checkOut,
            guests,
            totalAmount: hostel.price
        });
        
        await booking.save();
        
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get all bookings (optionally filter by student)
router.get('/', async (req, res) => {
    try {
        const query = {};
        if (req.query.student) query.student = req.query.student;
        const bookings = await Booking.find(query)
            .populate('student', 'fullName email')
            .populate('hostel', 'name city price');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get booking by ID
router.get('/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('student', 'fullName email phone')
            .populate('hostel', 'name city address price');
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update booking status
router.put('/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
