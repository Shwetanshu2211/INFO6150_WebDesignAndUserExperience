import express from 'express';
import { authenticateToken, isAdmin } from '../middleware/auth.js';
import Job from '../models/Job.js';

const router = express.Router();

// Apply authentication middleware to all job routes
router.use(authenticateToken);

/**
 * @swagger
 * /api/job/create:
 *   post:
 *     summary: Create a new job (admin only)
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - companyName
 *               - jobTitle
 *               - description
 *               - salary
 *             properties:
 *               companyName:
 *                 type: string
 *                 description: Name of the company
 *               jobTitle:
 *                 type: string
 *                 description: Title of the job
 *               description:
 *                 type: string
 *                 description: Job description
 *               salary:
 *                 type: number
 *                 description: Job salary
 *     responses:
 *       201:
 *         description: Job created successfully
 *       403:
 *         description: Access denied. Admin privileges required.
 */
router.post('/create', isAdmin, async (req, res) => {
    try {
        const { companyName, jobTitle, description, salary } = req.body;
        
        const job = new Job({
            companyName,
            jobTitle,
            description,
            salary
        });
        
        await job.save();
        res.status(201).json({ message: 'Job created successfully', job });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * @swagger
 * /api/job/all:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jobs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       companyName:
 *                         type: string
 *                       jobTitle:
 *                         type: string
 *                       description:
 *                         type: string
 *                       salary:
 *                         type: number
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 */
router.get('/all', async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.status(200).json({ jobs });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router; 