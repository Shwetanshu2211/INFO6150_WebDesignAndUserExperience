import express from 'express';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { validateUserCreate, validateUserUpdate } from '../middleware/validation.js';

const router = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'images';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
        }
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        console.log('Login attempt:', req.body);
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        console.log('User found:', user ? 'Yes' : 'No');
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch ? 'Yes' : 'No');
        
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        // Return user data and token
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                fullName: user.fullName,
                email: user.email,
                imagePath: user.imagePath
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create user route
router.post('/create', validateUserCreate, async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            fullName,
            email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all users route
router.get('/getAll', async (req, res) => {
    try {
        const users = await User.find({}, 'fullName email');
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Update user route
router.put('/update/:id', validateUserUpdate, async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, email } = req.body;

        // Check if user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user
        user.fullName = fullName || user.fullName;
        user.email = email || user.email;

        await user.save();
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete user route
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Delete user
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get single user route
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id, 'fullName email');
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router; 