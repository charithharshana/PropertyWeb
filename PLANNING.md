# PropertyWeb - Planning Document

## 1. Overview

This document outlines the technical plan and architecture for the PropertyWeb application, a web platform guiding homeowners through online property sales using a structured workflow and AI assistance.

## 2. Technology Stack

*   **Framework:** Next.js (v14+ recommended)
*   **Language:** TypeScript
*   **Backend Logic:** Node.js (handled within Next.js API routes)
*   **Frontend UI:** React (handled within Next.js pages/components)
*   **Database:** PostgreSQL
*   **ORM:** Prisma
*   **AI Integration:** OpenAI API
*   **Listing Integration:** Initial focus on generating exportable data. Direct platform integration (City23.ee, KV.ee, OLX.ua) can be explored later.

## 3. Project Setup

*   Initialize a Next.js project using `create-next-app` with TypeScript.
*   Set up a PostgreSQL database instance.
*   Integrate Prisma:
    *   Install Prisma CLI and Client.
    *   Initialize Prisma (`npx prisma init --datasource-provider postgresql`).
    *   Define initial schema in `prisma/schema.prisma`.
    *   Configure database connection URL in `.env`.
    *   Run initial migration (`npx prisma migrate dev --name init`).
*   Configure ESLint and Prettier for code consistency.
*   Create initial project management files: `README.md`, `PLANNING.md` (this file), `TASKS.md`.

## 4. Core Architecture: Vertical Slice with Next.js

*   **Approach:** Structure the application using a vertical slice architecture. Each major feature (e.g., Evaluation, Ad Creation, CRM) will group its related frontend pages/components, API routes, database interactions, types, and utility functions logically.
*   **Next.js Structure:** Leverage Next.js's file-based routing for both pages (`/pages`) and API endpoints (`/pages/api`).
*   **Shared Code:** Utilize top-level directories for shared elements:
    *   `/components`: Reusable React components (common, layout, feature-specific).
    *   `/lib`: Shared utilities, API clients (Prisma, OpenAI), helper functions.
    *   `/hooks`: Custom React hooks.
    *   `/contexts`: React Context API providers.
    *   `/constants`: Global constants.
    *   `/types`: Shared TypeScript type definitions.
    *   `/styles`: Global CSS, themes.

## 5. High-Level Project Directory Structure

```
PropertyWeb/
├── .github/             # (Optional) CI/CD workflows
├── .vscode/             # VSCode settings (launch.json, settings.json)
├── components/          # Shared UI components
│   ├── common/          # General reusable components (Button, Input, Modal)
│   ├── layout/          # Page layouts, Sidebar, Header, Footer
│   └── featureX/        # Components specific to a feature (e.g., EvaluationStepper)
├── constants/           # Global constants (e.g., routes, enums)
├── contexts/            # React Context API providers (e.g., AuthContext, AppStateContext)
├── hooks/               # Custom React hooks (e.g., useAuth, useApi)
├── lib/                 # Shared utilities, API clients, helpers
│   ├── prisma.ts        # Prisma client instance
│   ├── openai.ts        # OpenAI API client setup
│   └── utils.ts         # General utility functions
├── pages/               # Next.js routing (frontend pages and backend API)
│   ├── api/             # API endpoints (handled by Next.js)
│   │   ├── auth/        # Authentication endpoints (login, signup, logout)
│   │   ├── evaluation/  # Property evaluation API (save answers, get results)
│   │   ├── properties/  # Property data CRUD API
│   │   ├── ad-text/     # AI Ad text generation API
│   │   ├── photos/      # Photo upload/management API
│   │   ├── notary/      # Notary related API (if needed for booking/status)
│   │   └── crm/         # CRM API (contacts CRUD, notes, status)
│   ├── _app.tsx         # Global App component (wraps all pages)
│   ├── _document.tsx    # Custom HTML Document structure
│   ├── index.tsx        # Landing page / Login / Initial redirect logic
│   ├── dashboard.tsx    # Main user dashboard page
│   ├── evaluation/      # Property Evaluation flow pages/steps (e.g., [step].tsx)
│   ├── prepare.tsx      # Property Preparation Guide page
│   ├── ad-creation.tsx  # Ad Text Generation page
│   ├── listing/         # Listing & Photos page (e.g., index.tsx, photos.tsx)
│   ├── notary.tsx       # Notary Information page
│   ├── after-sale.tsx   # After Sale Guidance page
│   ├── publish.tsx      # Final Summary & Publish page
│   ├── crm.tsx          # CRM page
│   ├── knowledge-base/  # Knowledge Base pages (e.g., [slug].tsx)
│   └── settings.tsx     # User settings page
├── prisma/              # Prisma ORM schema and migrations
│   ├── schema.prisma    # Database schema definition
│   └── migrations/      # Database migration history
├── public/              # Static assets (images, fonts, favicons)
├── styles/              # Global styles, theme configuration (e.g., globals.css, theme.ts)
├── types/               # Shared TypeScript type definitions (interfaces, enums)
├── .env.local           # Environment variables (local, gitignored)
├── .eslintrc.json       # ESLint configuration
├── .gitignore           # Git ignore rules
├── next.config.js       # Next.js configuration
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── README.md            # Project overview, setup instructions
├── PLANNING.md          # This planning document
└── TASKS.md             # Breakdown of development tasks

```

## 6. Key Modules/Features (Iterative Development)

Development will proceed iteratively, focusing on vertical slices:

1.  **Foundation:** Project setup, Auth (User model, signup/login), Basic Layout/Dashboard.
2.  **Property Evaluation:** Multi-step form UI, state management, API to save data.
3.  **Ad Creation:** UI, API route calling OpenAI, saving description to Property model.
4.  **Listing/Photos:** Photo upload UI, API (consider cloud storage), Gallery display.
5.  **CRM:** Basic contact list UI, API for CRUD.
6.  **Static Content Pages:** Prepare, Notary, After Sale, Knowledge Base structure.
7.  **Publish Flow:** Summary page, data aggregation, export generation.
8.  **Refinements:** Dashboard updates, CRM features (status, notes), Knowledge Base content integration.

## 7. Golden Rules Reminder

*   **Documentation:** Maintain `README.md`, `PLANNING.md`, `TASKS.md`.
*   **File Size:** Keep files concise (<500 lines). Refactor complex components/logic into smaller, reusable modules.
*   **Comments:** Write clear JSDoc/TSDoc comments for functions, components, and complex logic.

## 8. High-Level System Diagram

```mermaid
graph TD
    User[User Browser] --> NextApp[Next.js Application (Frontend + Backend API)];

    subgraph NextApp
        direction LR
        Frontend[React Frontend (Pages & Components)]
        Backend[API Routes (/pages/api)]
    end

    Backend --> Prisma[Prisma ORM] --> DB[(PostgreSQL Database)];
    Backend --> OpenAI[OpenAI API];
    Backend --> Export[Data Export Logic];
    Backend --> Storage[(Optional: Cloud Storage for Photos)];

    NextApp --> User;

    style User fill:#f9f,stroke:#333,stroke-width:2px
    style DB fill:#ccf,stroke:#333,stroke-width:2px
    style OpenAI fill:#cfc,stroke:#333,stroke-width:2px
    style Export fill:#ffc,stroke:#333,stroke-width:2px
    style Storage fill:#fcc,stroke:#333,stroke-width:2px