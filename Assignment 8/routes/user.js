const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/user');
const { validateUserCreate, validateUserUpdate } = require('../middleware/validation');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *           description: User's full name (alphabetic characters only)
 *           example: "John Doe"
 *         email:
 *           type: string
 *           description: User's email address
 *           example: "john@example.com"
 *         password:
 *           type: string
 *           description: User's password (min 8 chars, must contain uppercase, lowercase, number, special char)
 *           example: "Password123!"
 *         imagePath:
 *           type: string
 *           description: Path to user's profile image
 *           example: "images/1234567890-profile.jpg"
 *       required:
 *         - fullName
 *         - email
 *         - password
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 *           example: "User with this email already exists"
 *     Success:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Success message
 *           example: "User created successfully"
 */

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

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "Password123!"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Invalid input or user already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /user/edit:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               fullName:
 *                 type: string
 *                 example: "John Smith"
 *               password:
 *                 type: string
 *                 example: "NewPassword123!"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 */
router.put('/edit', validateUserUpdate, async (req, res) => {
    try {
        const { email, fullName, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Update fields if provided
        if (fullName) user.fullName = fullName;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
        res.status(200).json({ message: 'User updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * @swagger
 * /user/delete:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 */
router.delete('/delete', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Delete user's image if exists
        if (user.imagePath) {
            fs.unlinkSync(user.imagePath);
        }

        await User.deleteOne({ email });
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * @swagger
 * /user/getAll:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       fullName:
 *                         type: string
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         example: "john@example.com"
 *       500:
 *         description: Server error
 */
router.get('/getAll', async (req, res) => {
    try {
        const users = await User.find({}, 'fullName email');
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * @swagger
 * /user/uploadImage:
 *   post:
 *     summary: Upload a profile image for a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - image
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file (JPEG, PNG, or GIF)
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Image uploaded successfully"
 *                 filePath:
 *                   type: string
 *                   example: "images/1234567890-profile.jpg"
 *       400:
 *         description: Invalid input or image already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 */
router.post('/uploadImage', upload.single('image'), async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        if (user.imagePath) {
            return res.status(400).json({ error: 'Image already exists for this user.' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided.' });
        }

        user.imagePath = req.file.path;
        await user.save();

        res.status(201).json({
            message: 'Image uploaded successfully.',
            filePath: req.file.path
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router; 