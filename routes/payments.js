const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const Hostel = require('../models/Hostel');

// Create payment
router.post('/', async (req, res) => {
    try {
        const { bookingId, studentId, hostelId, amount, paymentMethod } = req.body;
        
        const payment = new Payment({
            booking: bookingId,
            student: studentId,
            hostel: hostelId,
            amount,
            paymentMethod,
            status: 'completed',
            transactionId: 'TXN' + Date.now()
        });
        
        await payment.save();
        
        // Update booking status
        await Booking.findByIdAndUpdate(bookingId, { status: 'confirmed' });
        
        // Update hostel booking count
        await Hostel.findByIdAndUpdate(hostelId, { $inc: { totalBookings: 1 } });
        
        res.status(201).json({
            message: 'Payment successful',
            payment
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get all payments
router.get('/', async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate('student', 'fullName email')
            .populate('hostel', 'name city')
            .populate('booking');
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get payment by ID
router.get('/:id', async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id)
            .populate('student', 'fullName email phone')
            .populate('hostel', 'name city address')
            .populate('booking');
        
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        
        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
