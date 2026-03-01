# Project Context: Angular Micro Frontends (MFE)

This workspace consists of multiple Angular applications using **Native Federation** (`@angular-architects/native-federation`) to implement a micro-frontend architecture.

## Project Overview

- **Architecture:** Shell-based Micro Frontend using Native Federation.
- **Technologies:** 
  - **Framework:** Angular 18 (TypeScript)
  - **Build Engine:** esbuild (configured via `@angular-architects/native-federation`)
  - **Inter-app Communication:** Native Federation (shared libraries, dynamic loading)
  - **Styling:** SCSS
  - **Testing:** Karma / Jasmine

## Applications

### 1. Shell App (`/shell-app`)
- **Port:** 4200
- **Role:** Host application that orchestrates the loading of remote modules.
- **Key Files:**
  - `public/federation.manifest.json`: Configuration mapping remote apps.
  - `src/main.ts`: Initializes federation before bootstrapping the app.
  - `src/app/app-routing.module.ts`: Uses `loadRemoteModule` for lazy-loading MFE routes.

### 2. Remote 1 (`/remote-1`)
- **Port:** 4201
- **Role:** Remote application exposing specific components for consumption by the shell.
- **Key Files:**
  - `federation.config.js`: Defines exposed components (e.g., `./Component`, `./Flights`).
  - `src/app/flights/`: Main feature area exposed by this remote.

## Building and Running

Commands should be run from within the respective application directories:

### Shell App
- **Development Server:** `cd shell-app && npm start` (Runs on http://localhost:4200)
- **Build:** `cd shell-app && npm run build`
- **Test:** `cd shell-app && npm run test`

### Remote 1
- **Development Server:** `cd remote-1 && npm start` (Runs on http://localhost:4201)
- **Build:** `cd remote-1 && npm run build`
- **Test:** `cd remote-1 && npm run test`

## Development Conventions

### Native Federation
- Always check `federation.config.js` in remotes to see what is exposed.
- Ensure the `shell-app/public/federation.manifest.json` is updated if remote URLs change.
- Native Federation relies on `es-module-shims` for browser support.

### Code Quality & Reviews
- **Review Policy:** Refer to `REVIEW_POLICY.md` in the root directory for formal review standards. 
  - *Note:* While `REVIEW_POLICY.md` contains some references to SQL and .NET (`ValueTask`, etc.), apply its general principles (P0 blockers, TDD enforcement, security invariants) to this Angular project.
- **TDD:** New features and bug fixes require unit tests.

## Key Integration Points
- **Routing:** Remote modules are loaded dynamically in `app-routing.module.ts` via `loadRemoteModule`.
- **Shared Libraries:** Shared dependencies are configured in `federation.config.js` to avoid duplicate loads.
