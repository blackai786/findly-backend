# Findly Backend

Backend API for **Findly – Smart Lost Item Recovery Platform**, a MERN-based application for reporting, tracking, and recovering lost items.

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- Multer
- REST APIs

## Features

- User authentication and authorization
- Lost/found item management
- Admin routes and controls
- Image upload support
- MongoDB data persistence
- JWT-based protected routes

## Project Structure

```text
config/          Database configuration
controllers/     Request/business logic
middleware/      Authentication and middleware
models/          MongoDB models
routes/          API routes
uploads/         Uploaded item images
server.js        Application entry point
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file using `.env.example` as a reference.

### 3. Run the server

```bash
npm run dev
```

The API runs on `http://localhost:5000` by default.

## Related Project

- [Findly Frontend](https://github.com/blackai786/findly-frontend)

## Author

**Sahil Shaikh** – B.E. Information Technology | MERN Stack Developer

[GitHub](https://github.com/blackai786) · [LinkedIn](https://www.linkedin.com/in/sahil12038/)
