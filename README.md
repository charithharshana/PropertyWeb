# PropertyWeb

A comprehensive web platform for homeowners selling properties online.

## Overview

PropertyWeb (also referred to as "HomeFlow" in the UI) is a web-based platform designed to guide homeowners through the entire process of selling their property online. It leverages modern technology and AI to streamline steps like property evaluation, ad creation, and listing, while providing resources for preparation, legal aspects, and post-sale activities.

## Core Features

- **Property Evaluation**: Multi-step questionnaire for property valuation
- **Process Overview & Initial Setup**: Selling journey explanation and preliminary information gathering
- **Property Preparation**: Guides, checklists, and AI-assisted ad text generation
- **Listing & Photos**: Photo management and listing review
- **Notary Information**: Resources about the notary process (Estonia-focused)
- **After Sale Guidance**: Post-sale checklists and moving guidance
- **Dashboard**: Central hub for monitoring progress
- **CRM**: Management of buyer inquiries
- **Knowledge Base**: Detailed help articles and guides

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **UI Framework**: React
- **Database**: PostgreSQL
- **ORM**: Prisma
- **AI Integration**: OpenAI
- **Listing Integration**: Exportable data for listing platforms

## Project Structure

The project follows a vertical slice architecture where features are organized into cohesive units.

- See [PLANNING.md](./PLANNING.md) for the detailed project structure and architecture decisions.
- See [DATABASE.md](./DATABASE.md) for comprehensive database configuration and management.

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Access to a PostgreSQL database (local or remote)

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd PropertyWeb
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Copy environment variables template and configure
```bash
cp .env.example .env.local
```

4. Set up the database

You have two options for database configuration:

**Option 1: Connect to a local PostgreSQL database**
```bash
# In your .env file:
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/propertyweb?schema=public"

# Then run migrations:
npx prisma migrate dev
```

**Option 2: Connect to a remote PostgreSQL database (e.g., on a VPS)**
```bash
# In your .env file:
DATABASE_URL="postgresql://username:password@your-server-address:5432/propertyweb?schema=public"

# Then run migrations:
npx prisma migrate dev
```

To check your database connection:
```bash
node scripts/db-test.js
```

5. Run the development server
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development Guidelines

- Follow the Golden Rules:
  - Keep files under 500 lines
  - Write documentation and comments alongside code
  - Use markdown files for project management (README.md, PLANNING.md, TASKS.md)

- Implement new features as vertical slices
- Write tests for critical functionality
- Follow the TypeScript best practices

## Deployment

This project is configured for easy deployment to Vercel. We provide multiple methods for deployment:

### Method 1: Using the Vercel MCP Integration (Recommended)

```bash
node deploy-with-mcp.js
```

This interactive script uses the Vercel MCP integration to deploy your application and connect to your existing database. It provides a streamlined deployment experience with enhanced features.

### Method 2: Using the Standard Deployment Helper Script

```bash
node deploy.js
```

This interactive script will guide you through the standard deployment process, including setting up your database connection and deploying to Vercel.

### Method 3: Manual Deployment

For detailed instructions on manually deploying to Vercel, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Deployment Steps

1. Create a PostgreSQL database (or use your existing one from DATABASE.md)
2. Get a Vercel API token from [Vercel Account Settings](https://vercel.com/account/tokens)
3. Run the MCP deployment script: `node deploy-with-mcp.js`
4. Follow the prompts to complete the deployment

## License

[Specify the license here]