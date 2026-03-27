const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amenities: [{
        type: String
    }],
    description: {
        type: String,
        required: true
    },
    images: [{
        type: String
    }],
    available: {
        type: Boolean,
        default: true
    },
    rating: {
        type: Number,
        default: 0
    },
    totalBookings: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Hostel', hostelSchema);
