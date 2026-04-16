# ESAORA Consortium Website

This repository contains the source code for the ESAORA Consortium website and its supporting services. The project is structured as a monorepo using `pnpm` workspaces.

## Project Structure

- `artifacts/esaora-website`: The main frontend application built with React, Vite, and TailwindCSS.
- `artifacts/api-server`: The backend API service built with Express.
- `lib/`: Shared libraries and utilities used across the workspace.
- `scripts/`: Development and maintenance scripts.

## Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [pnpm](https://pnpm.io/) (Installed via `npm install -g pnpm`)

## Getting Started

### 1. Install Dependencies

From the root of the project, run:

```bash
pnpm install
```

### 2. Start Development Servers

You can start the frontend and backend services separately using the following commands from the root:

#### Start Website (Frontend)
Accessible at http://localhost:5000

```bash
pnpm --filter @workspace/esaora-website run dev
```

#### Start API Server (Backend)
Accessible at http://localhost:5001

```bash
pnpm --filter @workspace/api-server run dev
```

#### Start Mockup Sandbox
Accessible at http://localhost:5002

```bash
pnpm --filter @workspace/mockup-sandbox run dev
```


### 3. Build for Production

To build all packages in the workspace:

```bash
pnpm run build
```

## Technologies Used

- **Frontend:** React, TypeScript, Vite, TailwindCSS, Framer Motion, GSAP, Radix UI.
- **Backend:** Node.js, Express, TypeScript, Drizzle ORM.
- **Package Management:** pnpm workspaces.
