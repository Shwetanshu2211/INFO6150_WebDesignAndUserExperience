# Job Portal Application

A full-stack job portal application built with React, Node.js, Express, and MongoDB. This application allows users to browse job listings, view company profiles, and manage their job search process.

## Project Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd job-portal
```

2. Install frontend dependencies:

```bash
npm install
```

3. Install backend dependencies:

```bash
cd api
npm install
```

4. Set up environment variables:

   - Create a `.env` file in the `api` directory with the following variables:

   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. Start the backend server:

```bash
cd api
npm start
```

6. Start the frontend development server:

```bash
# In a new terminal, from the root directory
npm start
```

The application will be available at `http://localhost:3000`

## Folder Structure

```
job-portal/
├── api/                    # Backend server
│   ├── config/            # Database configuration
│   ├── middleware/        # Custom middleware
│   ├── models/           # MongoDB models
│   ├── public/           # Static files
│   ├── routes/           # API routes
│   ├── scripts/          # Database seeding scripts
│   └── server.js         # Main server file
├── public/               # Frontend static files
│   └── images/          # Image assets
├── src/                 # Frontend source code
│   ├── components/      # Reusable components
│   │   └── layout/     # Layout components
│   ├── context/        # React context
│   ├── pages/          # Page components
│   ├── App.js          # Main App component
│   └── index.js        # Entry point
└── package.json        # Frontend dependencies
```

## Navigation

The application includes the following main sections:

1. **Home Page** (`/`)

   - Welcome message
   - Featured job listings
   - Quick access to main features

2. **About Page** (`/about`)

   - Company information
   - Mission and values
   - Team members

3. **Job Listings** (`/jobs`)

   - Protected route (requires login)
   - List of available jobs
   - Job details and requirements
   - Apply Now functionality

4. **Company Showcase** (`/companies`)

   - Protected route (requires login)
   - Featured companies
   - Company profiles and details
   - Company information cards

5. **Contact Page** (`/contact`)

   - Contact information
   - Contact form
   - Business hours

6. **Login Page** (`/login`)
   - User authentication
   - Login form
   - Error handling

## Key Functionalities

### User Authentication

- User registration and login
- JWT-based authentication
- Protected routes
- Session management

### Job Listings

- Browse available jobs
- View job details
- Filter jobs by category
- Apply for positions

### Company Showcase

- View featured companies
- Company profiles
- Company information
- Visual company cards

### Contact System

- Contact form
- Business information
- Office location
- Communication channels

### Responsive Design

- Mobile-friendly interface
- Material UI components
- Consistent styling
- Modern user experience

## Technologies Used

### Frontend

- React.js
- Material UI
- React Router
- Context API
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (file uploads)

## Development

### Running Tests

```bash
# Frontend tests
npm test

# Backend tests
cd api
npm test
```

### Database Seeding

```bash
# Seed companies
cd api
npm run seed:companies
```

### Code Style

- ESLint for code linting
- Prettier for code formatting
- Consistent naming conventions
- Component-based architecture

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
