import express from 'express';
import { validateUserCreate, validateUserUpdate, validateUserDelete } from '../middleware/validation.js';
import { createUser, updateUser, deleteUser, getAllUsers, getUserByEmail } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/create', validateUserCreate, createUser);

// Protected routes
router.get('/getAll', authenticateToken, getAllUsers);
router.get('/get/:email', authenticateToken, getUserByEmail);
router.put('/update', authenticateToken, validateUserUpdate, updateUser);
router.delete('/delete', authenticateToken, validateUserDelete, deleteUser);

export default router; 