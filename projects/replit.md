# Overview

This is a personal portfolio and blog application built with a retro terminal/DOS aesthetic that can be deployed as a static site to GitHub Pages. The application serves as Jake Grigorian's professional showcase, featuring blog posts, project portfolios, work experience, and contact functionality. The design mimics a vintage computer terminal interface with CRT screen effects, boot sequences, and DOS-style navigation commands.

## Recent Changes (Dec 2024)

- Converted from full-stack to static site architecture for GitHub Pages deployment
- Replaced API calls with static data files for blog posts and projects  
- Updated contact form to use mailto links instead of server-side processing
- Added GitHub Actions workflow for automatic deployment
- Created build configuration for static hosting

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built using React with TypeScript, utilizing a modern component-based architecture:

- **UI Framework**: React 18 with TypeScript for type safety
- **Styling**: Tailwind CSS with custom terminal-themed design system using CSS variables for theming
- **Component Library**: Shadcn/ui components built on top of Radix UI primitives
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Build Tool**: Vite for fast development and optimized builds

The application features a unique terminal/retro aesthetic with:
- Boot screen animation sequence
- CRT screen effects with scanlines
- DOS-style command line interface
- Keyboard navigation shortcuts
- Terminal-themed color scheme (green on black)

## Backend Architecture
The backend follows a RESTful API pattern using Express.js:

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js with middleware for JSON parsing, URL encoding, and request logging
- **API Design**: RESTful endpoints for blog posts, projects, and contact messages
- **Validation**: Zod schemas for request/response validation
- **Error Handling**: Centralized error middleware with proper status codes

The application uses a storage abstraction pattern with an interface (`IStorage`) that currently implements in-memory storage (`MemStorage`) with sample data, making it easy to swap to a database implementation later.

## Data Storage Solutions
Currently implements static data files for GitHub Pages deployment:

- **Current**: Static TypeScript data files in `client/src/data/`
- **Blog Posts**: Hardcoded blog posts with metadata in `blogPosts.ts`
- **Projects**: Hardcoded project information in `projects.ts`
- **Contact**: Uses mailto links for direct email client integration
- **Previous**: Original schema definitions for PostgreSQL remain available but unused in static build

The data structure includes three main entities:
- Blog posts with tags, publishing status, and metadata
- Projects with tech stack and portfolio links  
- Contact form that generates mailto links

## Authentication and Authorization
No authentication system is currently implemented. The application is designed as a public portfolio site with read-only access to blog posts and projects, and public contact form submission.

## External Dependencies
The application uses several key external libraries and services:

- **UI Components**: Extensive use of Radix UI primitives for accessibility
- **Database**: Neon Database serverless PostgreSQL (configured but not yet connected)
- **Styling**: Tailwind CSS with PostCSS processing
- **Development**: Vite with React plugin and runtime error overlay
- **Deployment**: Configured for Replit with cartographer plugin for development
- **Forms**: React Hook Form with Zod resolvers for validation
- **Date Handling**: date-fns for date formatting and manipulation
- **Icons**: Lucide React for consistent iconography

The application is structured as a monorepo with shared TypeScript schemas between client and server, promoting type safety across the full stack.