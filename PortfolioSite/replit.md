# Overview

This is a modern portfolio website built as a full-stack web application featuring a unique two-panel design. The left panel displays the portfolio owner's profile information and dynamic content cards, while the right panel hosts an AI-powered chatbot that acts as a portfolio narrator. The chatbot can dynamically update the left panel content based on user interactions, creating an engaging and interactive portfolio experience.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The application uses a **React + Vite** setup with TypeScript for the frontend, structured as a single-page application (SPA). The UI is built with **shadcn/ui** components and styled using **Tailwind CSS** for consistent design patterns. The frontend implements:

- **Component-based architecture** with reusable UI components
- **Two-panel layout design** - left panel for portfolio content, right panel for chat interface
- **Theme system** supporting light/dark mode with persistent preferences
- **State management** using React Query for server state and React hooks for local state
- **Type-safe development** with comprehensive TypeScript definitions

## Backend Architecture

The backend follows a **REST API architecture** built with **Express.js** and TypeScript:

- **Modular routing system** with centralized route registration
- **Middleware pipeline** for request logging, JSON parsing, and error handling
- **Memory-based storage** implementation with interface abstraction for future database integration
- **Environment-based configuration** for API keys and deployment settings

## Data Storage Solutions

The application currently uses **in-memory storage** with a well-defined interface (`IStorage`) that abstracts data operations:

- **User management** for potential authentication features
- **Chat message persistence** for conversation history
- **Portfolio data modeling** with structured schemas for projects, skills, and certificates
- **Database migration support** configured for PostgreSQL using Drizzle ORM (ready for future implementation)

The storage layer is designed to easily transition from memory storage to PostgreSQL when needed, with migration scripts and schema definitions already in place.

## External Dependencies

### AI Integration
- **Groq API** integration for LLaMA/Mixtral language models
- **System prompt engineering** to create a specialized portfolio AI assistant
- **Structured response handling** for dynamic content updates

### UI Component Libraries
- **Radix UI primitives** for accessible, unstyled component foundations
- **Framer Motion** for smooth animations and transitions
- **Lucide React** for consistent iconography

### Development Tools
- **Vite** for fast development and optimized production builds
- **ESBuild** for efficient server-side bundling
- **Tailwind CSS** with PostCSS for utility-first styling
- **TypeScript** for type safety across the entire stack

### Database & ORM
- **Drizzle ORM** configured for PostgreSQL with type-safe database operations
- **Neon Database** serverless PostgreSQL integration ready for deployment
- **Migration system** with schema versioning support

The architecture prioritizes developer experience with hot reloading, type safety, and modular design while maintaining production readiness with optimized builds and deployment configurations.