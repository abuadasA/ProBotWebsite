# replit.md

## Overview

ProBot is a robotics company website showcasing industrial robotics products. It's a full-stack TypeScript application with a React frontend and Express backend, using PostgreSQL for data storage. The site features a product catalog, individual product detail pages, a contact form, an about page with co-founder profiles, and a dark-themed UI with neon green accents. The application serves as a marketing/portfolio site for a Jordan-based robotics startup.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript, bundled by Vite
- **Routing**: Wouter (lightweight client-side router) with routes: `/`, `/products`, `/product/:id`, `/about`, `/contact`
- **State/Data Fetching**: TanStack React Query for server state management
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives with Tailwind CSS
- **Animations**: Framer Motion for page transitions and hover effects
- **Forms**: React Hook Form with Zod validation via `@hookform/resolvers`
- **Styling**: Tailwind CSS with CSS variables for theming. Dark theme with neon green (`#0cf35d`) as primary color. Font: Poppins
- **Icons**: Lucide React and react-icons (for social media icons)
- **Path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`, `@assets/` maps to `attached_assets/`

### Backend
- **Framework**: Express 5 on Node.js with TypeScript (run via tsx)
- **API Pattern**: RESTful JSON API under `/api/` prefix. Routes defined in `shared/routes.ts` as a typed contract object used by both client and server
- **Database**: PostgreSQL via `node-postgres` (pg) pool, with Drizzle ORM for queries
- **Schema**: Defined in `shared/schema.ts` using Drizzle's `pgTable`. Two tables: `products` and `messages`
- **Validation**: Zod schemas generated from Drizzle schemas via `drizzle-zod`
- **Storage Layer**: `server/storage.ts` provides a `DatabaseStorage` class implementing `IStorage` interface

### Shared Code (`shared/` directory)
- `schema.ts` — Drizzle table definitions, Zod insert schemas, and TypeScript types for `Product`, `Message`, `InsertProduct`, `InsertMessage`
- `routes.ts` — API route contract with paths, methods, input schemas, and response schemas. Used by both frontend hooks and backend route handlers to ensure type consistency

### Database Schema
- **products**: `id` (serial PK), `name` (text), `description` (text), `imageUrl` (text), `features` (jsonb string array)
- **messages**: `id` (serial PK), `name` (text), `email` (text), `message` (text)

### API Endpoints
- `GET /api/products` — List all products
- `GET /api/products/:id` — Get single product by ID
- `POST /api/contact` — Create a contact message (validated with Zod)

### Build System
- **Development**: `tsx server/index.ts` runs the server with Vite dev middleware for HMR
- **Production Build**: Custom `script/build.ts` that runs Vite build for client and esbuild for server, outputting to `dist/`
- **Database Migrations**: `drizzle-kit push` for schema sync (configured in `drizzle.config.ts`)

### Key Design Decisions
- **Shared route contracts**: The `shared/routes.ts` file acts as a single source of truth for API structure, enabling type-safe API calls on the client and validated handlers on the server
- **No authentication**: This is a public-facing marketing site with no user auth
- **Data seeding**: Products are seeded on server start if the database is empty (in `server/routes.ts`)
- **SPA with server fallback**: In production, Express serves static files and falls back to `index.html` for client-side routing

## External Dependencies

- **PostgreSQL**: Required database, connected via `DATABASE_URL` environment variable. Used with `node-postgres` pool and Drizzle ORM
- **Drizzle Kit**: Used for database schema management (`db:push` command)
- **Google Fonts**: Poppins font loaded via CSS import, plus additional fonts linked in `index.html` (DM Sans, Fira Code, Geist Mono, Architects Daughter)
- **Replit Plugins**: `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner` for development experience on Replit
- **No external API integrations**: The app is self-contained with no third-party API calls (social links are placeholder `#` hrefs)