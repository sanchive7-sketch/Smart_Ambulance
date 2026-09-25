# Smart Emergency Response Platform

A hackathon demo for coordinating people in need, ambulance drivers, and hospitals. The core rule is simple: select a **medically capable available ambulance**, not just the nearest ambulance.

This repository starts as a real full-stack foundation, not only a UI mockup:

- `apps/web`: redesigned React sign-in and separate workspaces for People, Ambulance Driver, and Hospital.
- `apps/api`: Express API, role-checked cookie sessions, Socket.IO server, validation, and health endpoint.
- Mock mode: three visible fictional accounts, sample maps, and a browser-local case scenario, with no database required.
- Optional PostgreSQL and Prisma path for continuing development after the demo.

## Quick start

1. Install Node.js LTS. Full details: [SETUP.md](SETUP.md).
2. Copy `.env.example` to `.env` if it does not already exist.
3. Run `npx pnpm@11.16.0 install` in this folder.
4. Run `npx pnpm@11.16.0 db:generate` and `npx pnpm@11.16.0 dev`.
5. Open `http://localhost:5173`.

The app works locally without Docker, payment details, or API keys. The demo password is `SerpDemo2026!`; the sign-in page shows the email for each workspace. Read [DEMO_GUIDE.md](DEMO_GUIDE.md) for a short jury walkthrough and [ARCHITECTURE.md](ARCHITECTURE.md) for the technical design.

The dashboard content is fictional preview data. A mock SOS, driver response, and hospital decision stay in this browser so the jury can see the three screens progress. This is not an operational emergency service.

## Important safety boundary

No real SOS, GPS tracking, hospital booking, or traffic-signal control occurs in this demo.

