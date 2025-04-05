import express from 'express';
import { authenticateToken, isAdmin } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Apply authentication middleware to all admin routes
router.use(authenticateToken, isAdmin);

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Get admin dashboard data
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin dashboard data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: number
 *                 totalEmployees:
 *                   type: number
 *                 totalAdmins:
 *                   type: number
 *       403:
 *         description: Access denied. Admin privileges required.
 */
router.get('/dashboard', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalEmployees = await User.countDocuments({ type: 'employee' });
        const totalAdmins = await User.countDocuments({ type: 'admin' });

        res.status(200).json({
            totalUsers,
            totalEmployees,
            totalAdmins
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router; 