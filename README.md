# Dino Discovery Camp - Roster App

A full-stack camper roster management application built for a dinosaur-themed summer camp. Campers can be viewed and have their usernames edited inline, with all changes persisted to a PostgreSQL database.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Database](#database)

---

## Overview

**What it does:**
- Displays a roster of enrolled campers as interactive cards
- Allows inline username editing with a live preview
- Persists username changes to a PostgreSQL database via a REST API
- Shows toast notifications on successful saves
- 404 page with redirect for unknown routes

**Key design decisions:**
- Frontend and backend are fully separated — each has its own `package.json`
- CORS is enabled on the backend to support local cross-origin development
- shadcn/ui provides accessible, pre-built UI components styled with Tailwind CSS

---

## Tech Stack

### Frontend
| Tool | Purpose |
|------|---------|
| React 18 + TypeScript | UI framework and type safety |
| Vite | Dev server and build tool |
| React Router DOM | Client-side routing |
| TanStack Query | Server state management (configured, available for use) |
| Tailwind CSS | Utility-first styling |
| shadcn/ui (Radix UI) | Accessible component library |
| React Hook Form + Zod | Form handling and validation |
| Sonner | Toast notifications |
| Vitest | Unit testing |

### Backend
| Tool | Purpose |
|------|---------|
| Node.js + Express | REST API server |
| pg (node-postgres) | PostgreSQL client |
| CORS | Cross-origin request middleware |
| dotenv | Environment variable management |

### Database
- **PostgreSQL** — Single `campers` table with `id`, `name`, `username`, and `emoji` columns

---

## Project Structure

```
dino-camp-roster-frontend-only/
├── frontend/                  # React + TypeScript app
│   ├── src/
│   │   ├── components/
│   │   │   ├── CamperCard.tsx     # Camper card with inline username editing
│   │   │   ├── NavLink.tsx        # Router-aware nav link wrapper
│   │   │   └── ui/                # 48 shadcn/ui components
│   │   ├── pages/
│   │   │   ├── Index.tsx          # Main roster page — fetches and displays campers
│   │   │   └── NotFound.tsx       # 404 page
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── lib/                   # Utility functions
│   │   ├── test/                  # Vitest test files
│   │   └── App.tsx                # Root component with routing and providers
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── package.json
│
├── backend/                   # Express API server
│   ├── server.js              # Entry point — all routes defined here
│   ├── .env.example           # Template for required environment variables
│   └── package.json
│
└── db/                        # PostgreSQL setup
    ├── schema.sql             # Table definitions
    └── seed.sql               # Sample camper data
```

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL running locally

### 1. Database Setup

```bash
# Create the database
createdb dino_camp

# Run schema and seed files
psql dino_camp < db/schema.sql
psql dino_camp < db/seed.sql
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create your .env file from the template
cp .env.example .env
# Edit .env with your database credentials

# Start the development server (auto-restarts on changes)
npm run dev
```

The backend runs on `http://localhost:3001` by default.

**Required environment variables** (`backend/.env`):
```
DATABASE_URL=postgres://your_user:your_password@localhost:5432/dino_camp
PORT=3001
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The frontend runs on `http://localhost:8080`.

> **Note:** The API base URL is currently hardcoded to `http://localhost:3001` in `src/pages/Index.tsx`. Both servers must be running for the app to function.

### Available Frontend Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server on port 8080 |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest once |
| `npm run test:watch` | Run Vitest in watch mode |

---

## API Reference

All endpoints are prefixed with `/api`.

### `GET /api/campers`
Returns all campers ordered by ID.

**Response:**
```json
[
  { "id": 1, "name": "Maya", "username": "VelociMaya", "emoji": "🦕" },
  ...
]
```

### `GET /api/campers/:id`
Returns a single camper by ID, or `404` if not found.

### `PUT /api/campers/:id`
Updates a camper's username.

**Request body:**
```json
{ "username": "NewUsername" }
```

**Response:** The updated camper object.

---

## Database

**Schema** (`db/schema.sql`):
```sql
CREATE TABLE campers (
  id       SERIAL PRIMARY KEY,
  name     VARCHAR(100),
  username VARCHAR(100),
  emoji    VARCHAR(10)
);
```

**Seed data** (`db/seed.sql`):
- Inserts 4 dinosaur-themed campers
- Uses `ON CONFLICT DO NOTHING` to prevent duplicate inserts on re-runs
