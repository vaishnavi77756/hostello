const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    price: { type: Number, required: true },
    amenities: [{ type: String }],
    description: { type: String, required: true },
    images: [{ type: String }],
    available: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    totalRooms: { type: Number, default: 20 },
    totalBookings: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

// Virtual: booked rooms = confirmed bookings count (passed in via populate or aggregation)
// availableRooms = totalRooms - totalBookings
hostelSchema.virtual('availableRooms').get(function() {
    return Math.max(0, this.totalRooms - this.totalBookings);
});

hostelSchema.set('toJSON', { virtuals: true });
hostelSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Hostel', hostelSchema);
