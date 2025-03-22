# User Management API

A RESTful API built with Node.js, Express, and MongoDB for managing users and their images.

## Features

- User CRUD operations
- Secure password handling with bcrypt
- Image upload with format validation
- Swagger documentation
- Input validation

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/user-management
   JWT_SECRET=your-secret-key-here
   ```

## Running the Application

1. Start MongoDB
2. Start the server:
   ```bash
   npm start
   ```
   For development with auto-reload:
   ```bash
   npm run dev
   ```

## API Documentation

The API documentation is available at `http://localhost:3000/api-docs` when the server is running.

## API Endpoints

### User Management

1. Create User

   - POST `/user/create`
   - Body: `{ "fullName": "First Last", "email": "example@example.com", "password": "Password123!" }`

2. Update User

   - PUT `/user/edit`
   - Body: `{ "email": "example@example.com", "fullName": "First Last", "password": "NewPassword123!" }`

3. Delete User

   - DELETE `/user/delete`
   - Body: `{ "email": "example@example.com" }`

4. Get All Users

   - GET `/user/getAll`

5. Upload Image
   - POST `/user/uploadImage`
   - Form Data:
     - email: "example@example.com"
     - image: [file]

## Testing with Postman

1. Import the Postman collection from the `postman` directory
2. Set up your environment variables in Postman
3. Test each endpoint using the provided requests

## Validation Rules

- Full Name: Only alphabetic characters
- Email: Valid email format
- Password: Minimum 8 characters, at least one uppercase letter, one lowercase letter, one digit, and one special character
- Image: Only JPEG, PNG, and GIF formats allowed

## Error Handling

The API returns appropriate HTTP status codes and error messages for various scenarios:

- 400: Bad Request (validation errors)
- 404: Not Found
- 500: Server Error
