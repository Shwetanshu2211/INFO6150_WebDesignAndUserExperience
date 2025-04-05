import dotenv from 'dotenv';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import connectDB from './config/db.js';
import userRoutes from './routes/user.js';
import companyRoutes from './routes/company.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
// Configure CORS with specific options
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User Management API',
            version: '1.0.0',
            description: 'A RESTful API for managing users and their profile images',
            contact: {
                name: 'API Support',
                email: 'support@example.com'
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    required: ['fullName', 'email', 'password', 'type'],
                    properties: {
                        fullName: {
                            type: 'string',
                            description: 'User\'s full name (alphabetic characters only)'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User\'s email address'
                        },
                        password: {
                            type: 'string',
                            description: 'User\'s password (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)'
                        },
                        type: {
                            type: 'string',
                            enum: ['admin', 'employee'],
                            description: 'User type (admin or employee)'
                        },
                        imagePath: {
                            type: 'string',
                            description: 'Path to user\'s profile image'
                        }
                    }
                },
                UserUpdate: {
                    type: 'object',
                    properties: {
                        fullName: {
                            type: 'string',
                            description: 'User\'s full name (alphabetic characters only)'
                        },
                        password: {
                            type: 'string',
                            description: 'User\'s password (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)'
                        },
                        type: {
                            type: 'string',
                            enum: ['admin', 'employee'],
                            description: 'User type (admin or employee)'
                        }
                    }
                },
                UserResponse: {
                    type: 'object',
                    properties: {
                        fullName: {
                            type: 'string'
                        },
                        email: {
                            type: 'string'
                        },
                        type: {
                            type: 'string',
                            enum: ['admin', 'employee']
                        },
                        imagePath: {
                            type: 'string'
                        }
                    }
                },
                ImageUpload: {
                    type: 'object',
                    required: ['email', 'image'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User\'s email address'
                        },
                        image: {
                            type: 'string',
                            format: 'binary',
                            description: 'Image file (JPEG, PNG, or GIF)'
                        }
                    }
                },
                LoginRequest: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User\'s email address'
                        },
                        password: {
                            type: 'string',
                            description: 'User\'s password'
                        }
                    }
                },
                LoginResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Login successful'
                        },
                        token: {
                            type: 'string',
                            description: 'JWT token for authentication'
                        },
                        user: {
                            type: 'object',
                            properties: {
                                fullName: {
                                    type: 'string'
                                },
                                email: {
                                    type: 'string'
                                },
                                type: {
                                    type: 'string',
                                    enum: ['admin', 'employee']
                                },
                                imagePath: {
                                    type: 'string'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "User Management API Documentation"
}));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/company', companyRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
}); 