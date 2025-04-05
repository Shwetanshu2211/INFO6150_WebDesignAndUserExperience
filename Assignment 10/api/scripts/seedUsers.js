import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const seedUsers = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Check if test user already exists
        let testUser = await User.findOne({ email: 'test@example.com' });
        
        if (testUser) {
            // Update existing test user
            testUser.type = 'admin';
            await testUser.save();
            console.log('Test user updated successfully');
        } else {
            // Create a new test user
            const hashedPassword = await bcrypt.hash('Test@123', 10);
            testUser = new User({
                fullName: 'Test User',
                email: 'test@example.com',
                password: hashedPassword,
                type: 'admin',
                imagePath: null
            });
            await testUser.save();
            console.log('Test user created successfully');
        }
        
        console.log('Email: test@example.com');
        console.log('Password: Test@123');
        console.log('Type: admin');

        // Close the connection
        await mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
};

seedUsers(); 