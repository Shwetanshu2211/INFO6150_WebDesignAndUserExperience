import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Company from '../models/company.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../public/images/companies');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
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

// Get all companies
router.get('/', async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get single company
router.get('/:id', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Create company with image
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, description, website, industry, location } = req.body;
        const imagePath = req.file ? `/images/companies/${req.file.filename}` : null;

        const company = new Company({
            name,
            description,
            imagePath,
            website,
            industry,
            location
        });

        await company.save();
        res.status(201).json(company);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Update company
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { name, description, website, industry, location } = req.body;
        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        // Update fields
        company.name = name || company.name;
        company.description = description || company.description;
        company.website = website || company.website;
        company.industry = industry || company.industry;
        company.location = location || company.location;

        // Update image if new one is uploaded
        if (req.file) {
            // Delete old image if exists
            if (company.imagePath) {
                const oldImagePath = path.join(__dirname, '../public', company.imagePath);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            company.imagePath = `/images/companies/${req.file.filename}`;
        }

        await company.save();
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete company
router.delete('/:id', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        // Delete image if exists
        if (company.imagePath) {
            const imagePath = path.join(__dirname, '../public', company.imagePath);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Company.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router; 