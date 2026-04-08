const express = require('express');
const router = express.Router();
const Hostel = require('../models/Hostel');

// GET all hostels (with optional city/price filters)
router.get('/', async (req, res) => {
    try {
        const { city, minPrice, maxPrice } = req.query;
        let query = {};
        if (city) query.city = city.toLowerCase();
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        const hostels = await Hostel.find(query);
        res.json(hostels);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// GET search — MUST be before /:id to avoid conflict
router.get('/search/:query', async (req, res) => {
    try {
        const q = req.params.query;
        const hostels = await Hostel.find({
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { city: { $regex: q, $options: 'i' } },
                { address: { $regex: q, $options: 'i' } }
            ]
        });
        res.json(hostels);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// GET hostel by ID
router.get('/:id', async (req, res) => {
    try {
        const hostel = await Hostel.findById(req.params.id);
        if (!hostel) return res.status(404).json({ message: 'Hostel not found' });
        res.json(hostel);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// GET room availability for a hostel
router.get('/:id/availability', async (req, res) => {
    try {
        const hostel = await Hostel.findById(req.params.id);
        if (!hostel) return res.status(404).json({ message: 'Hostel not found' });
        const bookedRooms = hostel.totalBookings || 0;
        const totalRooms = hostel.totalRooms || 20;
        const availableRooms = Math.max(0, totalRooms - bookedRooms);
        res.json({
            hostelId: hostel._id,
            hostelName: hostel.name,
            totalRooms,
            bookedRooms,
            availableRooms,
            occupancyPercent: Math.round((bookedRooms / totalRooms) * 100),
            available: availableRooms > 0
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// POST create hostel
router.post('/', async (req, res) => {
    try {
        const hostel = new Hostel(req.body);
        await hostel.save();
        res.status(201).json(hostel);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// PUT update hostel
router.put('/:id', async (req, res) => {
    try {
        const hostel = await Hostel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!hostel) return res.status(404).json({ message: 'Hostel not found' });
        res.json(hostel);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// DELETE hostel
router.delete('/:id', async (req, res) => {
    try {
        const hostel = await Hostel.findByIdAndDelete(req.params.id);
        if (!hostel) return res.status(404).json({ message: 'Hostel not found' });
        res.json({ message: 'Hostel deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
