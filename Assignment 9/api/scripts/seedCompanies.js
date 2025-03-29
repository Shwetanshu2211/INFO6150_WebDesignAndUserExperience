import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Company from '../models/company.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../configure.env') });

const sampleCompanies = [
  {
    name: 'Apple Inc.',
    description: 'Apple Inc. is a global technology company that designs, manufactures, and sells smartphones, personal computers, tablets, wearables, and accessories. Known for innovative products like the iPhone, iPad, Mac, and Apple Watch.',
    industry: 'Technology',
    location: 'Cupertino, CA',
    website: 'https://www.apple.com',
    imagePath: '/images/companies/apple.jpg'
  },
  {
    name: 'Dell Technologies',
    description: 'Dell Technologies is a leading provider of digital transformation solutions, offering a comprehensive portfolio of IT hardware, software, and services. Specializes in PCs, servers, networking, and cloud solutions.',
    industry: 'Technology',
    location: 'Round Rock, TX',
    website: 'https://www.dell.com',
    imagePath: '/images/companies/dell.jpg'
  },
  {
    name: 'HP Inc.',
    description: 'HP Inc. develops personal computing devices, printers, and related supplies. A pioneer in innovation and technology, offering a wide range of products for both consumers and businesses.',
    industry: 'Technology',
    location: 'Palo Alto, CA',
    website: 'https://www.hp.com',
    imagePath: '/images/companies/hp.jpg'
  },
  {
    name: 'Amazon',
    description: 'Amazon is a global e-commerce and technology company, leading in online retail, cloud computing (AWS), digital streaming, and artificial intelligence. Known for innovation and customer-centric approach.',
    industry: 'Technology & E-commerce',
    location: 'Seattle, WA',
    website: 'https://www.amazon.com',
    imagePath: '/images/companies/amazon.jpg'
  },
  {
    name: 'Oracle Corporation',
    description: 'Oracle Corporation is a multinational technology company specializing in database software, cloud computing systems, and enterprise software products. Pioneer in database management systems.',
    industry: 'Technology',
    location: 'Austin, TX',
    website: 'https://www.oracle.com',
    imagePath: '/images/companies/oracle.jpg'
  },
  {
    name: 'Netflix',
    description: 'Netflix is a streaming technology company providing subscription-based video on demand services. Known for original content production and revolutionary streaming technology.',
    industry: 'Technology & Entertainment',
    location: 'Los Gatos, CA',
    website: 'https://www.netflix.com',
    imagePath: '/images/companies/netflix.jpg'
  }
];

const seedCompanies = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing companies
    await Company.deleteMany({});
    console.log('Cleared existing companies');

    // Insert sample companies
    const companies = await Company.insertMany(sampleCompanies);
    console.log(`Successfully seeded ${companies.length} companies`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding companies:', error);
    process.exit(1);
  }
};

seedCompanies(); 