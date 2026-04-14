# Cookie Baking Hub

## Project Overview

Cookie Baking Hub is a beginner-friendly web application that teaches cookie baking through visual step-by-step instructions. The app features 5 different cookie recipes (chocolate chip, sugar cookies, oatmeal raisin, peanut butter, and snickerdoodles) with detailed photography and comprehensive instructions covering all baking fundamentals. It serves as a personal learning platform for novice bakers who need guidance from ingredient measurement to final baking techniques.

## Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- CORS middleware
- dotenv for environment variables

**Frontend:**
- Vanilla HTML5
- CSS3 (responsive design)
- Vanilla JavaScript (ES6+)
- Fetch API for backend communication

**Deployment:**
- Netlify (frontend hosting)

## Architecture

The system follows a traditional client-server architecture with clear separation between backend API and frontend presentation.

```
cookie-baking-hub/
├── backend/
│   ├── models/
│   │   └── Recipe.js          # Mongoose recipe schema
│   ├── routes/
│   │   └── recipes.js         # Recipe API endpoints
│   ├── data/
│   │   └── seedRecipes.js     # Database seed data with stock photos
│   ├── server.js              # Express server setup
│   └── package.json
├── frontend/
│   ├── index.html             # Recipe listing page
│   ├── recipe.html            # Individual recipe detail page
│   ├── css/
│   │   └── styles.css         # All styling and responsive design
│   ├── js/
│   │   ├── main.js           # Recipe listing functionality
│   │   └── recipe.js         # Recipe detail page logic
│   └── package.json
└── README.md
```

**Communication:** REST API using JSON over HTTP. Frontend makes GET requests to backend endpoints and renders data dynamically.

## Build & Development Commands

**Backend:**
```bash
cd backend
npm install
npm run dev          # Starts nodemon development server
npm start           # Production server
npm run seed        # Seeds database with recipe data
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev         # Starts local development server
npm run build       # Builds for production
```

## Environment Variables

```env
# Backend (.env)
MONGODB_URI=mongodb://localhost:27017/cookie-baking-hub
PORT=3000
NODE_ENV=development

# Frontend (optional)
API_BASE_URL=http://localhost:3000
```

## API Endpoints

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| GET | `/api/recipes` | List all recipes with basic info (name, difficulty, times, preview image) | No |
| GET | `/api/recipes/:id` | Get full recipe details including all steps with photos and instructions | No |
| GET | `/health` | Health check endpoint | No |

## Database Schema

**Recipe Model:**
- `_id`: ObjectId (auto-generated)
- `name`: String (recipe title, e.g., "Classic Chocolate Chip Cookies")
- `description`: String (brief overview of the recipe)
- `difficulty`: String (enum: "Beginner", "Intermediate", "Advanced")
- `prep_time`: Number (preparation time in minutes)
- `bake_time`: Number (baking time in minutes)
- `ingredients`: Array of Objects
  - `item`: String (ingredient name)
  - `amount`: String (quantity and measurement)
- `steps`: Array of Objects
  - `step_number`: Number (sequential order)
  - `instruction`: String (detailed step instructions)
  - `image_url`: String (stock photo URL showing the technique)
- `tips`: Array of Strings (beginner-friendly baking tips)

**Relationships:** Self-contained recipe documents with no foreign key relationships.

## Key Algorithms & Patterns

**Recipe Loading Pattern:** Frontend uses async/await with fetch API to load recipe data. Implements loading states and graceful error handling for network failures.

**Step Navigation:** JavaScript manages step-by-step progression with visual indicators and photo preloading to ensure smooth user experience.

**Responsive Image Loading:** CSS implements responsive images with fallback sizing, and JavaScript handles image load error states.

**Mobile-First Design:** CSS follows mobile-first responsive design principles with progressive enhancement for larger screens.

## What Was Built (Tickets)

### Phase 1: Foundation
- **BE-1**: Set up Node.js project with Express and MongoDB — Established backend infrastructure with Express server, Mongoose connection, and environment variable configuration
- **BE-2**: Create Recipe data model and seed database — Implemented Recipe schema with all required fields and created seed data for 5 cookie recipes
- **FE-1**: Create HTML structure and basic CSS styling — Built responsive HTML foundation with clean beginner-friendly design and typography system

### Phase 2: Core Functionality
- **BE-3**: Build API endpoints for recipes — Created REST endpoints for recipe listing and individual recipe retrieval with error handling
- **FE-2**: Build recipe listing page — Implemented recipe grid with cards showing name, difficulty, time, and preview images
- **FE-3**: Build individual recipe page structure — Created detailed recipe layout with header, ingredients, and step-by-step instruction areas
- **FE-4**: Implement step-by-step photo display — Built visual step interface with numbered steps, large photos, and readable instructions

### Phase 3: Integration
- **BE-4**: Integrate stock photo URLs for recipe steps — Added comprehensive stock photography URLs for all baking techniques and steps
- **FE-5**: Connect frontend to backend APIs — Implemented JavaScript API integration with loading states and error handling

### Phase 4: Polish
- **FE-6**: Add beginner-friendly features and tips — Enhanced interface with measurement conversions, terminology explanations, and baking guidance
- **FE-7**: Final styling and user experience improvements — Polished design with improved spacing, transitions, mobile navigation, and print-friendly styles

## Known Constraints & Notes

**Stock Photo Dependencies:** All step images rely on external stock photo URLs. If URLs break, fallback handling is implemented but manual URL updates may be required.

**Database Seeding:** The seed script must be run manually after initial setup. Recipe data is static and managed through the seed file rather than a CMS.

**No User Authentication:** Built as a single-user learning platform. No user accounts, favorites, or progress tracking implemented.

**Static Recipe Content:** All recipe content is pre-defined in seed data. No admin interface for adding/editing recipes dynamically.

**Mobile Optimization:** Design prioritizes mobile-first approach since many users bake while referencing their phones in the kitchen.

**Print Considerations:** CSS includes print-friendly styles for users who prefer printed recipe cards while baking.