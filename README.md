# Smart Emergency Response Platform

A learning project for coordinating emergency requests, ambulances, hospitals, and green-corridor approvals. The core rule is simple: select the **nearest medically capable available ambulance**, not just the nearest ambulance.

This repository starts as a real full-stack foundation, not only a UI mockup:

- `apps/web`: React dashboard for users, drivers, hospitals, traffic controllers, and admins.
- `apps/api`: Express API, Socket.IO server, validation, and health endpoint.
- PostgreSQL: local database run through Docker.
- Prisma: database schema and migrations.

## Quick start

1. Install Node.js LTS, Docker Desktop, Git, and VS Code. Full details: [SETUP.md](SETUP.md).
2. Copy `.env.example` to `.env`.
3. Run `npm install` in this folder.
4. Start PostgreSQL with `docker compose up -d`.
5. Run `npm run db:generate` and `npm run db:migrate`.
6. Run `npm run dev`.
7. Open `http://localhost:5173`.

The app works locally without payment details or API keys. Read [ARCHITECTURE.md](ARCHITECTURE.md) before building additional features and [ROADMAP.md](ROADMAP.md) for the implementation order.

## Important safety boundary

The green-corridor module records and routes a request for traffic-authority approval. It must never directly operate public traffic signals without a formal authorized integration.
