# Cookie Baking Hub

A beginner-friendly web application that teaches cookie baking through step-by-step visual instructions. Designed as a personal learning hub featuring 5 classic cookie recipes with stock photography, measurement guides, and baking fundamentals for complete beginners.

## Live Demo

🍪 [View Live Site](https://cookie-baking-hub.netlify.app)

## Features

- **5 Cookie Recipes**: Chocolate chip, sugar cookies, oatmeal raisin, peanut butter, and snickerdoodles
- **Visual Step-by-Step Instructions**: High-quality stock photos for each baking step
- **Beginner-Friendly Guides**: Measurement conversions, baking terminology, and oven temperature tips
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Navigation**: Easy step-by-step progression through each recipe
- **Troubleshooting Tips**: Common baking problems and solutions for each recipe type

## Tech Stack

**Backend:**
- Node.js with Express.js
- MongoDB with Mongoose ODM
- RESTful API architecture

**Frontend:**
- Vanilla HTML, CSS, and JavaScript
- Responsive CSS Grid and Flexbox
- Fetch API for backend communication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cookie-baking-hub
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Variables**
   
   Copy `backend/.env.example` to `backend/.env` and configure:
   ```
   MONGO_URI=mongodb://localhost:27017/cookie-baking-hub
   PORT=5000
   NODE_ENV=development
   ```

4. **Seed the Database**
   ```bash
   npm run seed
   ```

5. **Start the Backend Server**
   ```bash
   npm start
   ```

6. **Serve the Frontend**
   
   Open `frontend/index.html` in your browser, or serve the frontend directory through your preferred local server.

## Project Structure

```
cookie-baking-hub/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Express middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API route definitions
│   ├── scripts/         # Database seed scripts
│   └── server.js        # Application entry point
├── frontend/
│   ├── css/            # Stylesheets
│   ├── js/             # Client-side JavaScript
│   ├── index.html      # Recipe listing page
│   ├── recipe.html     # Recipe detail page
│   └── beginner.html   # Beginner tips page
└── netlify.toml        # Deployment configuration
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/recipes` | Get all cookie recipes |
| GET | `/api/recipes/:id` | Get a specific recipe by ID |

## License

MIT