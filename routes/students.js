const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

// Register student
router.post('/register', async (req, res) => {
    try {
        const { fullName, email, password, phone, college, paymentMethods } = req.body;
        
        // Check if student already exists
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        
        const student = new Student({
            fullName,
            email,
            password,
            phone,
            college,
            paymentMethods
        });
        
        await student.save();
        
        const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        
        res.status(201).json({
            message: 'Registration successful',
            token,
            student: {
                id: student._id,
                fullName: student.fullName,
                email: student.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Login student
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        const isMatch = await student.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        
        res.json({
            message: 'Login successful',
            token,
            student: {
                id: student._id,
                fullName: student.fullName,
                email: student.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get all students (for admin)
router.get('/', async (req, res) => {
    try {
        const students = await Student.find().select('-password');
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get student by ID
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).select('-password');
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update student profile
router.put('/:id', async (req, res) => {
    try {
        const { fullName, phone, college, paymentMethods } = req.body;
        const update = {};
        if (fullName) update.fullName = fullName;
        if (phone) update.phone = phone;
        if (college) update.college = college;
        if (paymentMethods) update.paymentMethods = paymentMethods;
        const student = await Student.findByIdAndUpdate(req.params.id, update, { new: true }).select('-password');
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json({ message: 'Profile updated', student });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Change password
router.put('/:id/password', async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });
        const isMatch = await student.comparePassword(currentPassword);
        if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });
        student.password = newPassword;
        await student.save();
        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
